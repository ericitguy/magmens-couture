import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { PrintButton } from "@/components/ui/PrintButton";
import { Reveal } from "@/components/ui/Reveal";
import { privacyMeta, privacySections } from "@/content/privacy";
import { contact, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Magmens Couture handles the information you send through this website: what the consultation and contact forms collect, why it is needed, who processes it and how to have it removed.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Notice | Magmens Couture",
    description:
      "What this website collects, why, who processes it and how to request deletion.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section
        className="under-header on-dark bg-espresso pt-[calc(var(--header-h)+3.5rem)] text-ivory"
        aria-labelledby="privacy-heading"
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
              <li className="text-ivory/85">Privacy</li>
            </ol>
          </nav>

          <p className="eyebrow eyebrow-on-dark">Data protection</p>
          <h1 id="privacy-heading" className="display-1 mt-5 max-w-3xl">
            Privacy Notice
          </h1>
          <hr className="hairline my-8 w-20" />
          <p className="lead lead-on-dark measure">{privacyMeta.intro}</p>

          <div className="mt-10 flex flex-col gap-6 pb-16 md:flex-row md:items-center md:justify-between">
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-ivory/60">
              Version {privacyMeta.version} · Last updated{" "}
              {privacyMeta.lastUpdated}
            </p>
            <PrintButton label="Printable notice" onDark />
          </div>
        </Container>
      </section>

      <Section tone="ivory" labelledBy="privacy-content-heading">
        <Container width="narrow">
          <h2 id="privacy-content-heading" className="sr-only">
            Privacy notice in detail
          </h2>

          <div className="space-y-14">
            {privacySections.map((section, index) => (
              <Reveal key={section.id} as="section" delay={index * 40}>
                <h2 className="display-2 scroll-mt-32" id={section.id}>
                  <span className="mr-4 font-display text-[1.15rem] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <hr className="hairline-faint my-6" />

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="body-copy measure mb-5 text-[0.9375rem] last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.lists?.map((list, listIndex) => (
                  <div key={listIndex} className="mb-6 last:mb-0">
                    {list.label ? (
                      <p className="mb-3 text-[0.9375rem] font-semibold text-espresso">
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
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="border border-gold/30 bg-porcelain p-7 md:p-9">
              <p className="eyebrow">Contact about your information</p>
              <h2 className="display-3 mt-4">Ask, correct or delete.</h2>
              <p className="body-copy mt-4 text-[0.9375rem]">
                Contact the studio on{" "}
                <a href={`tel:${contact.phoneE164}`} className="link-editorial">
                  {contact.phoneDisplay}
                </a>{" "}
                or through the{" "}
                <Link href="/contact" className="link-editorial">
                  contact form
                </Link>{" "}
                to ask what is held about you, to correct it, or to have your
                enquiry removed.
              </p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <a
                  href={whatsappLink(
                    "Hello Magmens Couture, I would like to ask about the information you hold about me.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-espresso bg-espresso px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:bg-[#3a2b29]"
                >
                  WhatsApp the studio
                </a>
                <Link
                  href="/policies"
                  className="inline-flex items-center justify-center gap-3 border border-espresso/30 px-7 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:border-gold"
                >
                  Official policies &amp; terms
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
