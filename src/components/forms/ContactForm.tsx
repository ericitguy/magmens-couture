"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CheckboxField,
  Field,
  Honeypot,
  TextArea,
  TextInput,
} from "@/components/forms/Fields";
import { contact, whatsappLink } from "@/content/site";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const renderedAt = useRef<string>("");
  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    renderedAt.current = String(Date.now());
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    const data = new FormData(form);
    if (renderedAt.current) data.set("renderedAt", renderedAt.current);

    const { contactSchema, fieldErrors } = await import("@/lib/validation");
    const check = contactSchema.safeParse(Object.fromEntries(data));
    if (!check.success) {
      setErrors(fieldErrors(check.error));
      setSubmitting(false);
      summaryRef.current?.focus();
      return;
    }

    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      const body = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !body.ok) {
        setErrors(body.errors ?? {});
        setFormError(
          body.message ??
            "We could not send that message. Please try again, or reach the studio on WhatsApp.",
        );
        summaryRef.current?.focus();
        return;
      }

      setSent(body.message ?? "Thank you — your message has been received.");
      form.reset();
    } catch {
      setFormError(
        "We could not reach the studio just now. Please try again, or message us on WhatsApp.",
      );
      summaryRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-gold/40 bg-porcelain p-7 md:p-9"
      >
        <p className="eyebrow">Message received</p>
        <h3 className="display-2 mt-4">Thank you for writing to us.</h3>
        <p className="body-copy mt-5">{sent}</p>
        <p className="mt-5 text-[0.875rem] leading-relaxed text-taupe">
          The studio replies to messages in the order they arrive. For anything
          urgent, WhatsApp is the fastest way to reach us.
        </p>
        <div className="mt-7 flex flex-col gap-4 sm:flex-row">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-gold bg-gold px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:bg-transparent hover:text-gold"
          >
            WhatsApp {contact.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="inline-flex items-center justify-center gap-3 border border-espresso/30 px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:border-gold"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Boolean(formError);

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
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
            <ul className="list-inside list-disc">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Your name" error={errors.name} required>
          <TextInput
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            error={errors.name}
          />
        </Field>

        <Field id="contact-email" label="Email address" error={errors.email} required>
          <TextInput
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            error={errors.email}
          />
        </Field>

        <Field
          id="contact-phone"
          label="WhatsApp or telephone number (optional)"
          error={errors.phone}
        >
          <TextInput
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={errors.phone}
          />
        </Field>

        <Field
          id="contact-subject"
          label="Subject (optional)"
          error={errors.subject}
        >
          <TextInput
            id="contact-subject"
            name="subject"
            placeholder="Bridal consultation, Kente sourcing, alteration…"
            error={errors.subject}
          />
        </Field>

        <Field
          id="contact-message"
          label="Your message"
          error={errors.message}
          required
          full
        >
          <TextArea
            id="contact-message"
            name="message"
            rows={6}
            required
            error={errors.message}
            maxLength={2000}
          />
        </Field>
      </div>

      <div className="mt-8 border-t border-gold/25 pt-8">
        <CheckboxField
          id="contact-policiesAccepted"
          name="policiesAccepted"
          required
          error={errors.policiesAccepted}
        >
          I agree to the{" "}
          <Link href="/policies" className="link-editorial text-espresso">
            official policies and terms
          </Link>{" "}
          and the{" "}
          <Link href="/privacy" className="link-editorial text-espresso">
            privacy notice
          </Link>
          .
        </CheckboxField>

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 inline-flex items-center justify-center gap-3 whitespace-nowrap border border-espresso bg-espresso px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:bg-[#3a2b29] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
