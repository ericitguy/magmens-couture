import Link from "next/link";
import { EditorialImage } from "@/components/media/EditorialImage";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collections } from "@/content/collections";
import { getGalleryItem } from "@/content/gallery";

/** Alt text and captions come from the gallery so imagery is described once. */
function artwork(slug: string, fallbackAlt: string) {
  const item = getGalleryItem(slug);
  return { alt: item?.alt ?? fallbackAlt, caption: item?.caption };
}

/**
 * Collections as image-led editorial cards. The right-hand column is offset
 * downward on large screens so the grid reads as a spread rather than a
 * four-across product listing.
 */
export function FeaturedCollections() {
  return (
    <Section
      id="collections"
      tone="porcelain"
      labelledBy="collections-heading"
    >
      <Container>
        <SectionHeading
          headingId="collections-heading"
          eyebrow="The Collections"
          title="Four houses of make, one standard of craft."
          intro="Every collection is made to order in the Obuasi atelier. Begin with the occasion you are preparing for."
        />

        <div className="mt-16 grid gap-12 md:gap-16 lg:grid-cols-2 lg:gap-x-14">
          {collections.map((collection, index) => {
            const { alt } = artwork(
              collection.heroImage,
              `${collection.name} by Magmens Couture`,
            );
            return (
              <Reveal
                key={collection.slug}
                delay={(index % 2) * 120}
                className={index % 2 === 1 ? "lg:mt-24" : undefined}
              >
                <article className="group">
                  <Link
                    href={`/${collection.slug}`}
                    className="block overflow-hidden"
                    aria-label={`Explore ${collection.name}`}
                  >
                    <div className="relative aspect-3/4 w-full overflow-hidden bg-ivory">
                      <EditorialImage
                        slug={collection.heroImage}
                        alt={alt}
                        sizes="(min-width: 1024px) 44vw, 92vw"
                        zoom
                      />
                    </div>
                  </Link>

                  <div className="mt-7 flex items-baseline gap-5">
                    <span className="font-display text-[0.9rem] tracking-[0.2em] text-gold">
                      {collection.index}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-gold/30" />
                  </div>

                  <h3 className="display-2 mt-5">
                    <Link
                      href={`/${collection.slug}`}
                      className="transition-colors duration-500 ease-editorial hover:text-gold"
                    >
                      {collection.name}
                    </Link>
                  </h3>

                  <p className="body-copy measure mt-4 text-[0.9375rem]">
                    {collection.summary}
                  </p>

                  <Link
                    href={`/${collection.slug}`}
                    className="link-editorial mt-6 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso"
                  >
                    Explore {collection.shortName}
                    <span className="sr-only"> collection</span>
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
