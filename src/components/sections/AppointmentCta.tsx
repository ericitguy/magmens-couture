import { EditorialImage } from "@/components/media/EditorialImage";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getGalleryItem } from "@/content/gallery";
import { contact, whatsappEnquiryMessage, whatsappLink } from "@/content/site";

const IMAGE_SLUG = "bridal-ivory-ballgown-train";

type AppointmentCtaProps = {
  /** Allows a collection page to pre-fill the WhatsApp enquiry. */
  occasion?: string;
  eyebrow?: string;
  headline?: string;
  copy?: string;
};

/**
 * The conversion band that closes every page: one photograph, one headline,
 * and the two channels the studio actually answers — the booking form and
 * WhatsApp.
 */
export function AppointmentCta({
  occasion,
  eyebrow = "Appointments",
  headline = "Your Dream Dress Begins with a Conversation.",
  copy = "Tell us about your occasion, your vision, and the look you have always imagined. Let us begin creating something exceptional.",
}: AppointmentCtaProps) {
  const item = getGalleryItem(IMAGE_SLUG);
  const message = occasion
    ? whatsappEnquiryMessage(occasion)
    : undefined;

  return (
    <Section tone="espresso" labelledBy="appointment-cta-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="group relative">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-espresso">
                <EditorialImage
                  slug={IMAGE_SLUG}
                  alt={
                    item?.alt ??
                    "A bride in a bespoke ivory couture gown with a sweeping train."
                  }
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  zoom
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 hidden h-28 w-28 border border-gold/40 lg:block"
              />
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
            <h2 id="appointment-cta-heading" className="display-1 mt-5">
              {headline}
            </h2>
            <hr className="hairline my-8 w-20" />
            <p className="lead lead-on-dark measure">{copy}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/book-consultation">Book a Consultation</Button>
              <Button href={whatsappLink(message)} variant="light">
                Chat with Us on WhatsApp
              </Button>
            </div>

            <p className="mt-6 text-[0.8125rem] text-ivory/60">
              Or call the atelier directly on{" "}
              <a
                href={`tel:${contact.phoneE164}`}
                className="link-editorial text-ivory/85"
              >
                {contact.phoneDisplay}
              </a>
              . Consultations are held at the Obuasi atelier or virtually.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
