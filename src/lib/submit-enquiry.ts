import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  contactSchema,
  consultationSchema,
  fieldErrors,
} from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { saveEnquiry, type EnquiryKind, type NewEnquiry } from "@/lib/enquiries";
import { notifyStudio } from "@/lib/notify";

/**
 * The single path every enquiry takes: rate limit, spam checks, validation,
 * storage, notification. Shared by the consultation and contact endpoints so
 * neither can drift from the other.
 */

type HandlerOptions = {
  kind: EnquiryKind;
  limit: number;
  windowMs: number;
};

export type EnquiryResponseBody = {
  ok: boolean;
  id?: string;
  /** The client is told the request is pending, never that it is confirmed. */
  status?: "received";
  message?: string;
  errors?: Record<string, string>;
};

const MIN_FILL_MS = 2500;

export async function handleEnquiry(
  request: Request,
  { kind, limit, windowMs }: HandlerOptions,
): Promise<Response> {
  const limitResult = rateLimit(`enquiry:${kind}:${clientKey(request)}`, {
    limit,
    windowMs,
  });

  if (!limitResult.allowed) {
    return json(
      {
        ok: false,
        message:
          "We have received several requests from this device already. Please try again shortly, or message the studio on WhatsApp.",
      },
      429,
      { "Retry-After": String(limitResult.retryAfterSeconds) },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(
      { ok: false, message: "We could not read that submission. Please try again." },
      400,
    );
  }

  const raw = formToObject(form);

  // Anti-spam: a hidden field no human fills in, and a minimum fill time.
  if (typeof raw.reference === "string" && raw.reference.trim().length > 0) {
    return json(
      { ok: false, message: "This submission looked automated and was not sent." },
      400,
    );
  }

  if (typeof raw.renderedAt === "string" && raw.renderedAt) {
    const elapsed = Date.now() - Number(raw.renderedAt);
    if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return json(
        {
          ok: false,
          message:
            "That was submitted a little too quickly for us to store safely. Please try once more.",
        },
        400,
      );
    }
  }

  // Optional inspiration image, read before validation so its errors can be
  // reported alongside the field errors.
  const image = await readImage(form.get("inspirationImage"));
  if (image.error) {
    return json(
      {
        ok: false,
        message: image.error,
        errors: { inspirationImage: image.error },
      },
      422,
    );
  }

  const meta = {
    userAgent: request.headers.get("user-agent") ?? undefined,
    clientKey: clientKey(request),
    image: image.value,
  };

  let record: NewEnquiry;

  if (kind === "consultation") {
    const parsed = consultationSchema.safeParse(raw);
    if (!parsed.success) return invalid(parsed.error);

    const data = parsed.data;
    record = {
      kind,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      occasion: data.occasion,
      service: data.service,
      eventDate: data.eventDate,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      method: data.method,
      budget: data.budget,
      inspiration: data.inspiration,
      ...meta,
    };
  } else {
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) return invalid(parsed.error);

    const data = parsed.data;
    record = {
      kind,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      ...meta,
    };
  }

  try {
    const { id, backend } = await saveEnquiry(record);
    const notified = await notifyStudio(record, id).catch(() => ({ sent: false }));

    console.info(
      `[enquiry ${id}] stored in ${backend}; notification ${notified.sent ? "sent" : "not sent"}.`,
    );

    return json({
      ok: true,
      id,
      status: "received",
      message:
        kind === "consultation"
          ? "Your request has been received. It is not confirmed yet — the studio will review it and contact you directly with availability and the next steps."
          : "Your message has been received and will be answered in the order it arrived. Nothing further is needed from you unless the studio asks.",
    });
  } catch (error) {
    console.error("[enquiry] could not be stored", error);
    return json(
      {
        ok: false,
        message:
          "We could not store your request just now. Please try again, or message the studio directly on WhatsApp so nothing is missed.",
      },
      503,
    );
  }
}

function formToObject(form: FormData): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") result[key] = value;
  }
  return result;
}

type ImageOutcome = {
  value?: {
    filename: string;
    contentType: string;
    bytes: number;
    data: string;
  };
  error?: string;
};

async function readImage(entry: FormDataEntryValue | null): Promise<ImageOutcome> {
  if (!entry || typeof entry === "string") return {};
  if (entry.size === 0) return {};

  if (entry.size > MAX_UPLOAD_BYTES) {
    return {
      error: `Please keep the image under ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.`,
    };
  }

  if (
    entry.type &&
    !(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(entry.type)
  ) {
    return { error: "Please upload a JPEG, PNG or WebP image." };
  }

  const buffer = Buffer.from(await entry.arrayBuffer());

  return {
    value: {
      filename: entry.name || "inspiration",
      contentType: entry.type || "application/octet-stream",
      bytes: buffer.byteLength,
      data: buffer.toString("base64"),
    },
  };
}

function invalid(error: z.ZodError): Response {
  return json(
    {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      errors: fieldErrors(error),
    },
    422,
  );
}

function json(
  body: EnquiryResponseBody,
  status = 200,
  headers: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}
