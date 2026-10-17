import { EditorialImage } from "@/components/media/EditorialImage";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getGalleryItem } from "@/content/gallery";
import { craftPillars } from "@/content/story";

const DETAIL_SLUG = "bridal-ivory-ballgown-portrait";
const ATELIER_SLUG = "atelier-mermaid-mannequin";

function altFor(slug: string, fallback: string) {
  return getGalleryItem(slug)?.alt ?? fallback;
}

/**
 * The studio's craft, told through a stacked pair of photographs on the left
 * and a numbered list of working principles on the right.
 */
export function Craftsmanship() {
  return (
    <Section id="craftsmanship" tone="ivory" labelledBy="craftsmanship-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <figure className="group relative">
                <div className="relative aspect-4/5 w-full overflow-hidden bg-porcelain">
                  <EditorialImage
                    slug={ATELIER_SLUG}
                    alt={altFor(
                      ATELIER_SLUG,
                      "A beaded mermaid gown displayed on a mannequin inside the Magmens Couture atelier.",
                    )}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    zoom
                  />
                </div>
                <figcaption className="mt-3 text-[0.75rem] text-taupe">
                  {getGalleryItem(ATELIER_SLUG)?.caption}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={140} className="mt-8 lg:mt-10 lg:pl-24">
              <figure className="group relative">
                <div className="relative aspect-square w-full overflow-hidden bg-porcelain">
                  <EditorialImage
                    slug={DETAIL_SLUG}
                    alt={altFor(
                      DETAIL_SLUG,
                      "Close detail of hand-applied floral lace and beading on a sculpted couture bodice.",
                    )}
                    sizes="(min-width: 1024px) 26vw, 92vw"
                    zoom
                  />
                </div>
                <figcaption className="mt-3 text-[0.75rem] text-taupe">
                  {getGalleryItem(DETAIL_SLUG)?.caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7 lg:pt-6">
            <p className="eyebrow">The Magmens Craftsmanship</p>
            <h2 id="craftsmanship-heading" className="display-1 mt-5">
              Six things we refuse to rush.
            </h2>
            <hr className="hairline my-9 w-20" />

            <ul className="grid gap-x-10 sm:grid-cols-2">
              {craftPillars.map((pillar, index) => (
                <li
                  key={pillar.title}
                  className="border-t border-gold/25 py-6 first:border-t-0 sm:[&:nth-child(2)]:border-t-0"
                >
                  <span className="text-[0.5625rem] uppercase tracking-[0.3em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-3 mt-3">{pillar.title}</h3>
                  <p className="body-copy mt-2 text-[0.9375rem]">{pillar.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
