import { EditorialImage } from "@/components/media/EditorialImage";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { philosophy } from "@/content/story";

const IMAGE_SLUG = "bridal-ivory-ballgown-full";
const IMAGE_ALT =
  "Full-length view of a bespoke ivory Magmens Couture ball gown with a fitted corseted bodice, worn with a long tulle veil.";

/**
 * An asymmetric editorial introduction: the photograph keeps the left frame
 * while the typography sits in generous space to its right, offset downward
 * so the composition never reads as a template two-column block.
 */
export function BrandIntro() {
  return (
    <Section id="introduction" tone="ivory" labelledBy="introduction-heading">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <figure className="group relative">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-porcelain">
                <EditorialImage
                  slug={IMAGE_SLUG}
                  alt={IMAGE_ALT}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  zoom
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-5 -right-5 hidden h-32 w-32 border border-gold/40 lg:block"
              />
            </figure>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:pt-16">
            <p className="eyebrow">{philosophy.eyebrow}</p>
            <h2 id="introduction-heading" className="display-1 mt-5">
              {philosophy.headline}
            </h2>
            <hr className="hairline my-8 w-20" />
            {philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-copy measure mt-5">
                {paragraph}
              </p>
            ))}

            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Established</dt>
                <dd className="mt-2 font-display text-[1.4rem]">
                  2015 · <span className="text-taupe">Obuasi, Ghana</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Discipline</dt>
                <dd className="mt-2 font-display text-[1.4rem]">
                  Bridal &amp; couture
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <Button href="/our-story" variant="outline">
                Discover Our Philosophy
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
