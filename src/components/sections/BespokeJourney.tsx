import { EditorialImage } from "@/components/media/EditorialImage";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getGalleryItem } from "@/content/gallery";
import { journey } from "@/content/journey";

type BespokeJourneyProps = {
  /** Tighter layout for use inside a page that already has an introduction. */
  compact?: boolean;
  headingId?: string;
};

/**
 * The four-step client journey. Rendered on the homepage and again on the
 * booking page, where the same language sets expectations before the form.
 */
export function BespokeJourney({
  compact = false,
  headingId = "journey-heading",
}: BespokeJourneyProps) {
  const withImage = journey.find((step) => step.imageSlug);
  const imageItem = withImage?.imageSlug
    ? getGalleryItem(withImage.imageSlug)
    : undefined;

  return (
    <Section
      id="bespoke-experience"
      tone="espresso"
      labelledBy={headingId}
      className={compact ? "py-16 md:py-20 lg:py-24" : undefined}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow eyebrow-on-dark">The Bespoke Experience</p>
            <h2 id={headingId} className="display-1 mt-5">
              From the first conversation to the final reveal.
            </h2>
            <hr className="hairline my-8 w-20" />
            <p className="body-copy-on-dark measure text-[0.9375rem]">
              Every Magmens Couture piece is made for one client. The process is
              deliberate, documented and personal — you will know exactly where
              your garment stands at every stage.
            </p>

            {imageItem && withImage?.imageSlug ? (
              <figure className="group mt-10 hidden lg:block">
                <div className="relative aspect-3/2 w-full overflow-hidden bg-espresso">
                  <EditorialImage
                    slug={withImage.imageSlug}
                    alt={imageItem.alt}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    zoom
                  />
                </div>
                <figcaption className="mt-3 text-[0.75rem] text-ivory/55">
                  {imageItem.caption}
                </figcaption>
              </figure>
            ) : null}
          </Reveal>

          <div className="lg:col-span-7">
            <ol className="grid gap-px bg-gold/20 sm:grid-cols-2">
              {journey.map((step, index) => (
                <Reveal
                  key={step.index}
                  as="li"
                  delay={index * 90}
                  className="bg-espresso p-7 md:p-9"
                >
                  <span className="font-display text-[1.1rem] tracking-[0.2em] text-gold">
                    {step.index}
                  </span>
                  <h3 className="display-3 mt-4 text-ivory">{step.title}</h3>
                  <p className="body-copy-on-dark mt-3 text-[0.9375rem]">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={200} className="mt-10">
              <Button href="/book-consultation" variant="light">
                Begin Your Couture Journey
              </Button>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-ivory/55">
                Consultation requests are reviewed by the studio and confirmed
                directly — submitting a request does not itself confirm an
                appointment.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
