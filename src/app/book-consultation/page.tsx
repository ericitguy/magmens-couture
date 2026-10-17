import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { BespokeJourney } from "@/components/sections/BespokeJourney";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contact, whatsappLink } from "@/content/site";
import { socialImage } from "@/lib/social-image";

export const metadata: Metadata = {
  title: "Book a Private Consultation",
  description:
    "Request a private bridal or couture consultation with Magmens Couture in Obuasi, Ghana, in person or virtually. Tell us about your occasion, event date and vision.",
  alternates: { canonical: "/book-consultation" },
  openGraph: {
    title: "Book a Private Consultation | Magmens Couture",
    description:
      "Request a private consultation with Magmens Couture in Obuasi, Ghana — in person or by video call.",
    url: "/book-consultation",
    images: [socialImage("atelier-mermaid-mannequin")],
  },
};

type BookingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const occasions = new Set([
  "wedding-bridal",
  "reception",
  "traditional-kente",
  "thanksgiving",
  "other-occasion",
]);

const services = new Set([
  "bridal",
  "kente-traditional",
  "reception-gowns",
  "occasion-wear",
  "not-sure",
]);

export default async function BookConsultationPage({
  searchParams,
}: BookingPageProps) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const occasionParam = first(params.occasion);
  const serviceParam = first(params.service);

  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Book a Private Consultation"
        intro="Tell us about your occasion, your vision and your timeline. Every consultation is confirmed personally by the studio before it is held."
        imageSlug="atelier-mermaid-mannequin"
        imageAlt="A beaded mermaid gown on the stand in the Magmens Couture atelier, beside a member of the couture team."
        frameLabel="By appointment"
      />

      <Section tone="ivory" labelledBy="booking-form-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">The Request</p>
              <h2 id="booking-form-heading" className="display-1 mt-5">
                Begin here.
              </h2>
              <hr className="hairline my-8 w-20" />
              <p className="body-copy text-[0.9375rem]">
                Complete the form and the studio will come back to you with
                availability and the next steps. Fields marked with an asterisk
                are required.
              </p>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="eyebrow">The atelier</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-espresso/85">
                    {contact.address.lines.join(", ")}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Telephone &amp; WhatsApp</dt>
                  <dd className="mt-2 text-[0.9375rem] text-espresso/85">
                    <a
                      href={`tel:${contact.phoneE164}`}
                      className="link-editorial"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Consultation fee</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-espresso/85">
                    GHS 500, non-refundable, deducted from the final cost of your
                    commission. Up to two guests may accompany you.
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">International clients</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-espresso/85">
                    Virtual consultations and guided measurement calls are
                    available for clients outside Ghana.
                  </dd>
                </div>
              </dl>

              <div className="mt-10 border-t border-gold/25 pt-8">
                <p className="text-[0.875rem] leading-relaxed text-espresso/85">
                  Prefer to talk first?{" "}
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial"
                  >
                    Message the studio on WhatsApp
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-8">
              <ConsultationForm
                defaultOccasion={
                  occasionParam && occasions.has(occasionParam)
                    ? occasionParam
                    : undefined
                }
                defaultService={
                  serviceParam && services.has(serviceParam)
                    ? serviceParam
                    : undefined
                }
              />

              <p className="mt-10 text-[0.8125rem] leading-relaxed text-taupe">
                A non-refundable consultation fee of GHS 500 secures a session.
                It is separate from the cost of production but forms part of the
                total, and is deducted from the final amount. Read the{" "}
                <Link href="/policies" className="link-editorial text-espresso">
                  booking, consultation and payment policies
                </Link>{" "}
                before you submit, or see the{" "}
                <Link href="/faq" className="link-editorial text-espresso">
                  frequently asked questions
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <BespokeJourney headingId="booking-journey" />
    </>
  );
}
