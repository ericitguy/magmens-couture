import type { NewEnquiry } from "@/lib/enquiries";
import { buildCalendar, calendarEvents } from "@/lib/calendar";

/**
 * Studio notifications.
 *
 * When RESEND_API_KEY and ENQUIRY_NOTIFICATION_EMAIL are configured, a plain
 * notification email is sent to the studio through Resend. When either is
 * missing the enquiry is still stored and the site tells the client the truth:
 * the request has been received and the studio will confirm directly.
 *
 * Nothing here claims a notification was delivered unless the provider
 * accepted it.
 */

export type NotifyResult = {
  sent: boolean;
  reason?: string;
};

function config() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ENQUIRY_NOTIFICATION_EMAIL?.trim();
  const from =
    process.env.ENQUIRY_FROM_EMAIL?.trim() ??
    "Magmens Couture Website <onboarding@resend.dev>";
  return { apiKey, to, from };
}

export function notificationsConfigured(): boolean {
  const { apiKey, to } = config();
  return Boolean(apiKey && to);
}

function summarise(enquiry: NewEnquiry): string {
  const lines: Array<[string, string | undefined]> = [
    ["Type", enquiry.kind === "consultation" ? "Consultation request" : "Contact message"],
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone / WhatsApp", enquiry.phone],
    ["Country", enquiry.country],
    ["Occasion", enquiry.occasion],
    ["Collection", enquiry.service],
    ["Event date", enquiry.eventDate],
    ["Preferred date", enquiry.preferredDate],
    ["Preferred time", enquiry.preferredTime],
    ["Consultation method", enquiry.method],
    ["Budget", enquiry.budget],
    ["Subject", enquiry.subject],
    ["Inspiration", enquiry.inspiration],
    ["Message", enquiry.message],
    ["Inspiration image", enquiry.image?.filename],
  ];

  return lines
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export async function notifyStudio(
  enquiry: NewEnquiry,
  enquiryId: string,
): Promise<NotifyResult> {
  const { apiKey, to, from } = config();

  if (!apiKey || !to) {
    console.info(
      `[enquiry ${enquiryId}] stored. Email notification not configured — set RESEND_API_KEY and ENQUIRY_NOTIFICATION_EMAIL to enable it.`,
    );
    return { sent: false, reason: "not-configured" };
  }

  const subject =
    enquiry.kind === "consultation"
      ? `New consultation request — ${enquiry.name}`
      : `New website enquiry — ${enquiry.name}`;

  const attachments: Array<{ filename: string; content: string }> = [];

  if (enquiry.image?.data && enquiry.image.bytes <= 4 * 1024 * 1024) {
    attachments.push({
      filename: enquiry.image.filename,
      content: enquiry.image.data,
    });
  }

  // A calendar invitation travels with the alert, so the studio can add the
  // requested slot to its calendar straight from the email — and the client
  // gets the same file from their confirmation screen.
  const events = calendarEvents({ ...enquiry, id: enquiryId });
  if (events.length > 0) {
    attachments.push({
      filename: "magmens-consultation.ics",
      content: Buffer.from(
        buildCalendar(events, {
          calendarName: `Consultation request — ${enquiry.name}`,
        }),
      ).toString("base64"),
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject,
        text: `Reference: ${enquiryId}\n\n${summarise(enquiry)}\n\nSubmitted through the Magmens Couture website.`,
        ...(attachments.length > 0 ? { attachments } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(
        `[enquiry ${enquiryId}] Resend rejected the notification (${response.status}): ${detail}`,
      );
      return { sent: false, reason: `provider-${response.status}` };
    }

    return { sent: true };
  } catch (error) {
    console.error(`[enquiry ${enquiryId}] notification failed`, error);
    return { sent: false, reason: "network" };
  }
}
