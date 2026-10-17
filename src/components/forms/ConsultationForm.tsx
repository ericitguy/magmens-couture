"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CheckboxField,
  Field,
  Honeypot,
  RadioGroup,
  Select,
  TextArea,
  TextInput,
} from "@/components/forms/Fields";
import { collections } from "@/content/collections";
import {
  budgetRanges,
  consultationMethods,
  occasions,
  whatsappLink,
  whatsappEnquiryMessage,
} from "@/content/site";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/validation";

type ConsultationFormProps = {
  defaultOccasion?: string;
  defaultService?: string;
};

type SuccessState = {
  id: string;
  message: string;
  occasion?: string;
  eventDate?: string;
  preferredDate?: string;
};

const serviceOptions = [
  ...collections.map((collection) => ({
    value: collection.slug,
    label: collection.name,
  })),
  { value: "not-sure", label: "Not sure yet — please advise" },
];

export function ConsultationForm({
  defaultOccasion,
  defaultService,
}: ConsultationFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const renderedAt = useRef<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  // Records when the form became interactive, for the minimum-fill-time check.
  useEffect(() => {
    renderedAt.current = String(Date.now());
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);
    setImageError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    if (renderedAt.current) data.set("renderedAt", renderedAt.current);

    // Client-side pass of the shared schema, for immediate feedback.
    const { consultationSchema, fieldErrors } = await import("@/lib/validation");
    const check = consultationSchema.safeParse(Object.fromEntries(data));
    if (!check.success) {
      setErrors(fieldErrors(check.error));
      setSubmitting(false);
      summaryRef.current?.focus();
      return;
    }

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        body: data,
      });
      const body = (await response.json()) as {
        ok: boolean;
        id?: string;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !body.ok) {
        setErrors(body.errors ?? {});
        setFormError(
          body.message ??
            "We could not send that request. Please try again, or message the studio on WhatsApp.",
        );
        summaryRef.current?.focus();
        return;
      }

      setSuccess({
        id: body.id ?? "",
        message: body.message ?? "",
        occasion: String(data.get("occasion") ?? ""),
        eventDate: String(data.get("eventDate") ?? ""),
        preferredDate: String(data.get("preferredDate") ?? ""),
      });
      form.reset();
      setImageName(null);
    } catch {
      setFormError(
        "We could not reach the studio just now. Please check your connection and try again, or message us on WhatsApp.",
      );
      summaryRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const occasionLabel =
      occasions.find((option) => option.value === success.occasion)?.label ??
      undefined;

    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-gold/40 bg-porcelain p-7 md:p-10"
      >
        <p className="eyebrow">Request received</p>
        <h2 className="display-2 mt-4">Thank you — your request is with us.</h2>
        <p className="body-copy mt-5 measure">
          {success.message ||
            "The studio will review your request and contact you directly with availability and the next steps."}
        </p>

        {success.id ? (
          <p className="mt-5 text-[0.8125rem] text-taupe">
            Your reference:{" "}
            <span className="font-medium text-espresso">{success.id}</span>
          </p>
        ) : null}

        <div className="mt-8 border-t border-gold/25 pt-8">
          <h3 className="eyebrow">What happens next</h3>
          <ol className="mt-5 space-y-4">
            {[
              "The studio reviews your request and checks availability.",
              "You are contacted directly with confirmation and, where applicable, the consultation fee and payment instructions — only through official Magmens Couture channels.",
              "Your appointment is confirmed once the studio's requirements have been satisfied.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4 text-[0.9375rem] leading-relaxed text-espresso/85">
                <span className="font-display text-[1rem] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-6 text-[0.8125rem] leading-relaxed text-taupe">
          Submitting this form does not by itself confirm an appointment. See the{" "}
          <Link href="/policies" className="link-editorial text-espresso">
            official policies and terms
          </Link>{" "}
          for how consultations are booked and confirmed.
        </p>

        {success.id && success.preferredDate ? (
          <div className="mt-8 border-t border-gold/25 pt-8">
            <h3 className="eyebrow">Keep the date to hand</h3>
            <p className="mt-3 max-w-xl text-[0.875rem] leading-relaxed text-espresso/85">
              Add the date you requested to your own calendar. It is saved as
              tentative until the studio confirms availability.
            </p>
            <a
              href={`/api/booking/${success.id}/calendar`}
              download="magmens-consultation.ics"
              className="mt-5 inline-flex items-center justify-center gap-3 border border-espresso px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:border-gold hover:text-gold"
            >
              Add to my calendar
            </a>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={whatsappLink(
              whatsappEnquiryMessage(
                occasionLabel ?? "my occasion",
                success.eventDate,
              ),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-gold bg-gold px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:bg-transparent hover:text-gold"
          >
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setSuccess(null)}
            className="inline-flex items-center justify-center gap-3 border border-espresso/30 px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:border-gold"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(formError);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
      <Honeypot />

      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className={hasErrors ? "mb-8" : "sr-only"}
      >
        {formError ? (
          <div
            role="alert"
            className="border-l-2 border-[#8f3a2d] bg-porcelain p-5 text-[0.875rem] leading-relaxed text-[#8f3a2d]"
          >
            {formError}
          </div>
        ) : null}
        {Object.keys(errors).length > 0 ? (
          <div
            role="alert"
            className="mt-3 border-l-2 border-[#8f3a2d] bg-porcelain p-5 text-[0.875rem] leading-relaxed text-[#8f3a2d]"
          >
            <p className="font-medium">
              Please check the following before sending:
            </p>
            <ul className="mt-2 list-inside list-disc">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <Field id="fullName" label="Full name" error={errors.fullName} required>
          <TextInput
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            error={errors.fullName}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email} required>
          <TextInput
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            error={errors.email}
          />
        </Field>

        <Field
          id="phone"
          label="WhatsApp or telephone number"
          hint="Include your country code so the studio can reach you."
          error={errors.phone}
          required
        >
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+233 24 000 0000"
            required
            error={errors.phone}
            hint="Include your country code so the studio can reach you."
          />
        </Field>

        <Field
          id="country"
          label="Country of residence"
          error={errors.country}
          required
        >
          <TextInput
            id="country"
            name="country"
            autoComplete="country-name"
            required
            error={errors.country}
          />
        </Field>
      </fieldset>

      <hr className="hairline-faint my-10" />

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="eyebrow mb-4">Your occasion</legend>

        <Field
          id="occasion"
          label="Type of occasion"
          error={errors.occasion}
          required
        >
          <Select
            id="occasion"
            name="occasion"
            options={occasions}
            defaultValue={defaultOccasion}
            placeholder="Please choose"
            required
            error={errors.occasion}
          />
        </Field>

        <Field
          id="service"
          label="Preferred service or collection"
          error={errors.service}
        >
          <Select
            id="service"
            name="service"
            options={serviceOptions}
            defaultValue={defaultService}
            placeholder="Please choose"
            error={errors.service}
          />
        </Field>

        <Field id="eventDate" label="Event date" error={errors.eventDate}>
          <TextInput
            id="eventDate"
            name="eventDate"
            type="date"
            error={errors.eventDate}
          />
        </Field>

        <Field
          id="preferredDate"
          label="Preferred consultation date"
          error={errors.preferredDate}
        >
          <TextInput
            id="preferredDate"
            name="preferredDate"
            type="date"
            error={errors.preferredDate}
          />
        </Field>

        <Field
          id="preferredTime"
          label="Preferred consultation time"
          error={errors.preferredTime}
        >
          <TextInput
            id="preferredTime"
            name="preferredTime"
            type="time"
            error={errors.preferredTime}
          />
        </Field>

        <Field id="budget" label="Estimated budget range" error={errors.budget}>
          <Select
            id="budget"
            name="budget"
            options={budgetRanges}
            error={errors.budget}
          />
        </Field>

        <div className="sm:col-span-2">
          <RadioGroup
            legend="Consultation method"
            hint="Virtual consultations are welcome for clients outside Ghana."
            name="method"
            options={consultationMethods}
            error={errors.method}
          />
        </div>
      </fieldset>

      <hr className="hairline-faint my-10" />

      <fieldset className="grid gap-6">
        <legend className="eyebrow mb-4">Your vision</legend>

        <Field
          id="inspiration"
          label="Design inspiration or special requests"
          hint="Describe the silhouette, fabric, embellishment or cultural elements you have in mind."
          error={errors.inspiration}
        >
          <TextArea
            id="inspiration"
            name="inspiration"
            rows={6}
            placeholder="For example: an off-shoulder ball gown with a beaded bodice and a long train, finished in ivory satin."
            error={errors.inspiration}
            hint="Describe the silhouette, fabric, embellishment or cultural elements you have in mind."
            maxLength={2000}
          />
        </Field>

        <Field
          id="inspirationImage"
          label="Inspiration image (optional)"
          hint={`JPEG, PNG or WebP up to ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB. Anything larger can be sent to the studio on WhatsApp.`}
          error={imageError ?? errors.inspirationImage}
        >
          <input
            id="inspirationImage"
            name="inspirationImage"
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            aria-describedby="inspirationImage-hint"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) {
                setImageName(null);
                setImageError(null);
                return;
              }
              if (file.size > MAX_UPLOAD_BYTES) {
                setImageError(
                  `Please choose an image under ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.`,
                );
                event.currentTarget.value = "";
                setImageName(null);
                return;
              }
              setImageError(null);
              setImageName(file.name);
            }}
            className="field-input file:mr-4 file:border-0 file:bg-espresso file:px-4 file:py-2 file:text-[0.6875rem] file:uppercase file:tracking-[0.18em] file:text-ivory"
          />
          {imageName ? (
            <p className="mt-2 text-[0.75rem] text-taupe">
              Attached: {imageName}
            </p>
          ) : null}
        </Field>
      </fieldset>

      <div className="mt-10 border-t border-gold/25 pt-8">
        <CheckboxField
          id="policiesAccepted"
          name="policiesAccepted"
          required
          error={errors.policiesAccepted}
        >
          I have read and agree to the{" "}
          <Link href="/policies" className="link-editorial text-espresso">
            official policies and terms
          </Link>
          , including the booking, consultation, payment, fitting and
          measurement policies, and the{" "}
          <Link href="/privacy" className="link-editorial text-espresso">
            privacy notice
          </Link>
          .
        </CheckboxField>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-3 whitespace-nowrap border border-espresso bg-espresso px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:bg-[#3a2b29] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send my request"}
          </button>
          <p className="text-[0.8125rem] leading-relaxed text-taupe">
            Your request is stored securely and reviewed by the studio. It is
            confirmed only after the studio replies.
          </p>
        </div>
      </div>
    </form>
  );
}
