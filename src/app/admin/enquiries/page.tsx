import type { Metadata } from "next";
import { timingSafeEqual } from "node:crypto";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { listEnquiries, storageBackend } from "@/lib/enquiries";
import { notificationsConfigured } from "@/lib/notify";

export const metadata: Metadata = {
  title: "Enquiries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type AdminProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * A deliberately minimal administrative view of the enquiry records.
 *
 * The whole page is protected by ADMIN_ACCESS_TOKEN: without it (or with the
 * wrong token) the route responds as if it does not exist, so there is nothing
 * to discover. It is a reading view only — enquiries are not edited here.
 */
export default async function EnquiriesAdminPage({ searchParams }: AdminProps) {
  const params = await searchParams;
  const provided = Array.isArray(params.token) ? params.token[0] : params.token;
  const expected = process.env.ADMIN_ACCESS_TOKEN;

  if (!expected || !provided || !safeEqual(provided, expected)) {
    notFound();
  }

  const enquiries = await listEnquiries(100);
  const backend = storageBackend();
  const emailConfigured = notificationsConfigured();

  return (
    <section className="bg-ivory pb-24 pt-32">
      <Container>
        <p className="eyebrow">Studio admin</p>
        <h1 className="display-1 mt-5">Consultation & contact requests</h1>
        <hr className="hairline my-8 w-20" />

        <dl className="grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="eyebrow">Records</dt>
            <dd className="mt-2 font-display text-[1.6rem]">{enquiries.length}</dd>
          </div>
          <div>
            <dt className="eyebrow">Storage</dt>
            <dd className="mt-2 font-display text-[1.6rem]">
              {backend === "postgres" ? "Database" : "Local file"}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Email alerts</dt>
            <dd className="mt-2 font-display text-[1.6rem]">
              {emailConfigured ? "Enabled" : "Not configured"}
            </dd>
          </div>
        </dl>

        {!emailConfigured ? (
          <p className="mt-8 border-l-2 border-gold/60 bg-porcelain p-5 text-[0.875rem] leading-relaxed text-espresso/85">
            Email notifications are not configured, so new enquiries are stored
            but nobody is emailed. Set <code>RESEND_API_KEY</code> and{" "}
            <code>ENQUIRY_NOTIFICATION_EMAIL</code> to enable alerts, and check
            this page regularly in the meantime.
          </p>
        ) : null}

        {backend === "file" ? (
          <p className="mt-4 border-l-2 border-gold/60 bg-porcelain p-5 text-[0.875rem] leading-relaxed text-espresso/85">
            Records are being written to <code>./data/enquiries.jsonl</code> on
            this machine. Set <code>DATABASE_URL</code> before launch so nothing
            is lost when the server restarts. On a serverless host a writable
            disk is not available, so storage will fail without a database.
          </p>
        ) : null}

        {enquiries.length === 0 ? (
          <p className="body-copy mt-10">
            No requests have been received yet.
          </p>
        ) : (
          <ul className="mt-12 space-y-6">
            {enquiries.map((enquiry) => (
              <li
                key={enquiry.id}
                className="border border-gold/25 bg-porcelain p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="display-3">
                    {enquiry.name}
                    <span className="ml-3 font-sans text-[0.625rem] uppercase tracking-[0.2em] text-taupe">
                      {enquiry.kind === "consultation"
                        ? "Consultation"
                        : "Contact"}
                    </span>
                  </h2>
                  <p className="text-[0.75rem] text-taupe">
                    {formatDate(enquiry.createdAt)} · {enquiry.status.replace(/_/g, " ")}
                  </p>
                </div>

                <dl className="mt-5 grid gap-x-8 gap-y-2 text-[0.875rem] sm:grid-cols-2">
                  <Row label="Email" value={enquiry.email} />
                  <Row label="Phone" value={enquiry.phone} />
                  <Row label="Country" value={enquiry.country} />
                  <Row label="Occasion" value={enquiry.occasion} />
                  <Row label="Collection" value={enquiry.service} />
                  <Row label="Event date" value={enquiry.eventDate} />
                  <Row label="Preferred date" value={enquiry.preferredDate} />
                  <Row label="Preferred time" value={enquiry.preferredTime} />
                  <Row label="Method" value={enquiry.method} />
                  <Row label="Budget" value={enquiry.budget} />
                  <Row label="Subject" value={enquiry.subject} />
                  <Row
                    label="Inspiration image"
                    value={enquiry.hasImage ? "Attached" : undefined}
                  />
                </dl>

                {enquiry.message ? (
                  <div className="mt-5 border-t border-gold/20 pt-5">
                    <p className="eyebrow">Message</p>
                    <p className="body-copy mt-2 whitespace-pre-line text-[0.875rem]">
                      {enquiry.message}
                    </p>
                  </div>
                ) : null}

                {enquiry.inspiration ? (
                  <div className="mt-5 border-t border-gold/20 pt-5">
                    <p className="eyebrow">Design inspiration</p>
                    <p className="body-copy mt-2 whitespace-pre-line text-[0.875rem]">
                      {enquiry.inspiration}
                    </p>
                  </div>
                ) : null}

                <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.18em] text-taupe">
                  Reference {enquiry.id}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <dt className="w-32 shrink-0 text-taupe">{label}</dt>
      <dd className="text-espresso/85">{value}</dd>
    </div>
  );
}

function formatDate(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/** Constant-time comparison so the token cannot be probed character by character. */
function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}
