import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { brand, contact, socials, whatsappLink } from "@/content/site";
import { directionsUrl, mapEmbedUrl } from "@/lib/links";
import { socialImage } from "@/lib/social-image";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Contact Magmens Couture in Obuasi, Ghana: call or WhatsApp +233 24 830 4463, message the studio, find directions to the atelier, or request a consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Magmens Couture | Obuasi, Ghana",
    description:
      "Call or WhatsApp +233 24 830 4463, message the studio or find directions to the Obuasi atelier.",
    url: "/contact",
    images: [socialImage("traditional-amber-lace-train")],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with the studio."
        intro="Whether you are planning a wedding in Ghana or commissioning from abroad, the studio is reachable by telephone, WhatsApp and this form."
        imageSlug="traditional-amber-lace-train"
        imageAlt="Client wearing a bespoke Magmens Couture amber beaded lace gown with a Kente-print train."
        frameLabel="Obuasi, Ghana"
      />

      <Section tone="ivory" labelledBy="contact-details-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">The Atelier</p>
              <h2 id="contact-details-heading" className="display-1 mt-5">
                {brand.name}
              </h2>
              <hr className="hairline my-8 w-20" />

              <dl className="space-y-8">
                <div>
                  <dt className="eyebrow">Location</dt>
                  <dd className="mt-2">
                    <address className="not-italic">
                      {contact.address.lines.map((line) => (
                        <span key={line} className="block text-[0.9375rem] leading-relaxed text-espresso/85">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      href={directionsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-editorial mt-3 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.2em]"
                    >
                      Open in Google Maps
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow">Telephone &amp; WhatsApp</dt>
                  <dd className="mt-2 text-[0.9375rem] text-espresso/85">
                    <a href={`tel:${contact.phoneE164}`} className="link-editorial">
                      {contact.phoneDisplay}
                    </a>
                  </dd>
                </div>

                {contact.hours ? (
                  <div>
                    <dt className="eyebrow">Studio hours</dt>
                    <dd className="mt-2 text-[0.9375rem] text-espresso/85">
                      {contact.hours}
                    </dd>
                  </div>
                ) : null}

                <div>
                  <dt className="eyebrow">Follow the studio</dt>
                  <dd className="mt-3 flex flex-col gap-2">
                    {socials.map((social) =>
                      social.url ? (
                        <a
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-editorial text-[0.9375rem] text-espresso/85"
                        >
                          {social.label} — {social.handle}
                        </a>
                      ) : (
                        <span
                          key={social.label}
                          className="text-[0.9375rem] text-espresso/60"
                        >
                          {social.label} — {social.handle}
                          <span className="sr-only">
                            {" "}
                            (profile link to be confirmed)
                          </span>
                        </span>
                      ),
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-10 border-t border-gold/25 pt-8">
                <p className="body-copy text-[0.9375rem]">
                  {contact.appointmentNote}
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Button href="/book-consultation">Book a Consultation</Button>
                  <Button href={whatsappLink()} variant="outline">
                    WhatsApp the studio
                  </Button>
                </div>
              </div>

              <p className="mt-8 text-[0.8125rem] leading-relaxed text-taupe">
                No studio email address is published. Messages sent with this
                form are delivered to the studio directly and handled under the{" "}
                <Link href="/privacy" className="link-editorial text-espresso">
                  privacy notice
                </Link>
                .
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <p className="eyebrow">Send a message</p>
              <h2 className="display-2 mt-5">How can we help?</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="porcelain" labelledBy="directions-heading">
        <Container>
          <Reveal>
            <p className="eyebrow">Directions</p>
            <h2 id="directions-heading" className="display-1 mt-5">
              Find the atelier.
            </h2>
            <hr className="hairline my-8 w-20" />
            <p className="body-copy measure">
              Magmens Couture is in Obuasi New Estate, opposite the Presbyterian
              Church, in the Ashanti Region of Ghana. Please arrange an
              appointment before travelling — the studio works by appointment
              and walk-ins are not guaranteed service.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <div className="relative aspect-16/10 w-full overflow-hidden border border-gold/30 bg-ivory">
              <iframe
                title={`Map showing ${brand.name} in ${contact.address.locality}, Ghana`}
                src={mapEmbedUrl()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <p className="mt-3 text-[0.75rem] text-taupe">
              Map data provided by Google. Confirm the exact entrance with the
              studio when your appointment is confirmed.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
