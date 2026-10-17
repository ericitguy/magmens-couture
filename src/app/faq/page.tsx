import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { faqGroups } from "@/content/faq";
import { getGalleryItem } from "@/content/gallery";
import { contact, whatsappLink } from "@/content/site";
import { faqStructuredData } from "@/lib/structured-data";
import { socialImage } from "@/lib/social-image";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about booking a consultation with Magmens Couture, the GHS 500 consultation fee, fittings, fabric, measurements, the 70% deposit, payment methods, delivery and privacy.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Magmens Couture",
    description:
      "Consultations, fittings, fabric, measurements, payment and delivery — answered from the studio's official policies.",
    url: "/faq",
    images: [socialImage("bridal-white-beaded-corset")],
  },
};

const HERO_SLUG = "atelier-mermaid-mannequin";

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Everything clients ask before they book."
        intro="Appointments, fittings, fabric, the deposit and delivery — answered here as the studio's official policies state them, so you can decide with the full picture."
        imageSlug={HERO_SLUG}
        imageAlt={
          getGalleryItem(HERO_SLUG)?.alt ??
          "A client in a white beaded corset and draped satin skirt."
        }
        frameLabel="Answers"
      />

      <Section tone="ivory" labelledBy="faq-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* On a phone the page is a straight read, so the jump list and
                contact card are not offered — the footer and the closing call
                to action carry the same details. */}
            <Reveal className="hidden lg:col-span-4 lg:block">
              <div className="lg:sticky lg:top-32">
                <h2 id="faq-heading" className="eyebrow">
                  On this page
                </h2>
                <ol className="mt-6 space-y-3">
                  {faqGroups.map((group, index) => (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="link-editorial text-[0.9375rem] text-espresso/80 transition-colors duration-500 ease-editorial hover:text-espresso"
                      >
                        <span className="mr-3 font-display text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {group.title}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 border-t border-gold/25 pt-8">
                  <p className="text-[0.8125rem] leading-relaxed text-taupe">
                    Still unsure about something? Ask the studio directly — the
                    answer will be the same one you get here, in writing.
                  </p>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial mt-4 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.2em]"
                  >
                    WhatsApp {contact.phoneDisplay}
                  </a>
                  <p className="mt-3">
                    <a
                      href={`mailto:${contact.email}`}
                      className="link-editorial break-all text-[0.8125rem] text-taupe"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              {faqGroups.map((group) => (
                <section
                  key={group.id}
                  id={group.id}
                  aria-labelledby={`${group.id}-heading`}
                  className="scroll-mt-32 border-t border-gold/25 py-10 first:border-t-0 first:pt-0"
                >
                  <h2 id={`${group.id}-heading`} className="display-2">
                    {group.title}
                  </h2>
                  {group.intro ? (
                    <p className="body-copy mt-4 max-w-2xl text-[0.9375rem]">
                      {group.intro}
                    </p>
                  ) : null}

                  <div className="mt-8 divide-y divide-gold/20">
                    {group.items.map((item) => (
                      <details
                        key={item.id}
                        id={item.id}
                        className="group scroll-mt-32 py-5"
                      >
                        <summary className="policy-summary flex items-start justify-between gap-6">
                          <h3 className="font-display text-[1.2rem] leading-snug text-espresso">
                            {item.question}
                          </h3>
                          <span
                            aria-hidden="true"
                            className="policy-marker mt-1 shrink-0 text-gold"
                          >
                            →
                          </span>
                        </summary>

                        <div className="mt-3 max-w-2xl">
                          <p className="body-copy text-[0.9375rem]">
                            {item.answer}
                          </p>
                          {item.note ? (
                            <p className="mt-3 text-[0.875rem] leading-relaxed text-taupe">
                              {item.note}
                            </p>
                          ) : null}
                          {item.link ? (
                            <Link
                              href={item.link.href}
                              className="link-editorial mt-4 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.2em]"
                            >
                              {item.link.label}
                            </Link>
                          ) : null}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <Reveal className="mt-4 border-t border-gold/25 pt-8">
                <p className="text-[0.8125rem] leading-relaxed text-taupe">
                  These answers summarise the studio&rsquo;s official policies,
                  which remain the governing terms. Read the{" "}
                  <Link href="/policies" className="link-editorial text-espresso">
                    full policies and terms
                  </Link>{" "}
                  before booking.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <AppointmentCta
        eyebrow="Next step"
        headline="Ask us in person."
        copy="Bring your questions, your inspiration and anyone whose opinion matters. The studio will walk you through the process, the requirements and the timeline before anything is agreed."
      />

      <JsonLd data={faqStructuredData()} />
    </>
  );
}
