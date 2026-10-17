import type { Metadata } from "next";
import Link from "next/link";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { Container, Section } from "@/components/ui/Container";
import { PrintButton } from "@/components/ui/PrintButton";
import { Reveal } from "@/components/ui/Reveal";
import {
  policiesMeta,
  policyContents,
  policySections,
} from "@/content/policies";
import { contact, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Official Policies & Terms",
  description:
    "The official terms under which Magmens Couture accepts consultations, orders, production, fittings and collection: booking, consultation, payment, fittings, measurement, fabric and delivery policies.",
  alternates: { canonical: "/policies" },
  openGraph: {
    title: "Official Policies & Terms | Magmens Couture",
    description:
      "Booking, consultation, payment, fitting, measurement, fabric and delivery policies from Magmens Couture, Obuasi.",
    url: "/policies",
  },
};

export default function PoliciesPage() {
  return (
    <>
      {/* A quiet, functional header: this is a document, not an editorial page. */}
      <section
        className="under-header on-dark bg-espresso pt-[calc(var(--header-h)+3.5rem)] text-ivory"
        aria-labelledby="policies-heading"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.24em] text-ivory/60">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gold">
                /
              </li>
              <li className="text-ivory/85">Policies</li>
            </ol>
          </nav>

          <p className="eyebrow eyebrow-on-dark">Legal</p>
          <h1 id="policies-heading" className="display-1 mt-5 max-w-3xl">
            Official Policies &amp; Terms
          </h1>
          <hr className="hairline my-8 w-20" />
          <p className="lead lead-on-dark measure">{policiesMeta.intro}</p>

          <div className="mt-10 flex flex-col gap-6 pb-16 md:flex-row md:items-center md:justify-between">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-ivory/60">
              Version {policiesMeta.version} · Last updated{" "}
              {policiesMeta.lastUpdated}
            </p>
            <PrintButton
              label="Printable policy view"
              onDark
              openAllSections
            />
          </div>
        </Container>
      </section>

      <Section tone="ivory" labelledBy="policy-contents-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <h2 id="policy-contents-heading" className="eyebrow">
                  Contents
                </h2>
                <ol className="mt-6 space-y-3">
                  {policyContents.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="link-editorial text-[0.9375rem] text-espresso/80 transition-colors duration-500 ease-editorial hover:text-espresso"
                      >
                        <span className="mr-3 font-display text-gold">
                          {section.number}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 border-t border-gold/25 pt-8">
                  <p className="text-[0.8125rem] leading-relaxed text-taupe">
                    Questions about these terms? Speak to the studio before you
                    book.
                  </p>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial mt-4 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.2em]"
                  >
                    WhatsApp {contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="divide-y divide-gold/25 border-y border-gold/25">
                {policySections.map((section, index) => (
                  <details
                    key={section.id}
                    id={section.id}
                    open={index === 0}
                    className="group scroll-mt-32 py-6"
                  >
                    <summary className="policy-summary flex items-start justify-between gap-6">
                      <h2 className="display-3 max-w-2xl">
                        <span className="mr-4 font-display text-gold">
                          {section.number}
                        </span>
                        {section.title}
                      </h2>
                      <span
                        aria-hidden="true"
                        className="policy-marker mt-2 shrink-0 text-gold"
                      >
                        →
                      </span>
                    </summary>

                    <div className="mt-6 max-w-2xl">
                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="body-copy mb-5 text-[0.9375rem] last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {section.lists?.map((list, listIndex) => (
                        <div key={listIndex} className="mb-6 last:mb-0">
                          {list.label ? (
                            <p className="mb-3 text-[0.875rem] font-semibold text-espresso">
                              {list.label}
                            </p>
                          ) : null}
                          <ul className="space-y-3">
                            {list.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-4 text-[0.9375rem] leading-relaxed text-espresso/85"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2.5 h-px w-4 shrink-0 bg-gold"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {section.note ? (
                        <div className="mt-6 border-l-2 border-gold/60 bg-porcelain p-5 text-[0.875rem] leading-relaxed text-espresso/85">
                          {section.note}
                          {section.id === "confidentiality" ? (
                            <>
                              {" "}
                              <Link
                                href="/privacy"
                                className="link-editorial text-espresso"
                              >
                                Read the privacy notice
                              </Link>
                              .
                            </>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>

              <Reveal className="mt-12">
                <p className="body-copy measure text-[0.9375rem]">
                  {policiesMeta.closing}
                </p>
                <p className="mt-6 text-[0.75rem] uppercase tracking-[0.2em] text-taupe">
                  Policies version {policiesMeta.version} · Last updated{" "}
                  {policiesMeta.lastUpdated}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <AppointmentCta
        eyebrow="Next step"
        headline="Ready to begin? Let us talk it through."
        copy="Bring your questions as well as your inspiration. The studio will walk you through the process, the requirements and the timeline before anything is agreed."
      />
    </>
  );
}
