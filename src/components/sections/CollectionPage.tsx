import Link from "next/link";
import { Gallery } from "@/components/gallery/Gallery";
import { EditorialImage } from "@/components/media/EditorialImage";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { BespokeJourney } from "@/components/sections/BespokeJourney";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { collections, type Collection } from "@/content/collections";
import { galleryByTag, getGalleryItem } from "@/content/gallery";
import { whatsappEnquiryMessage, whatsappLink } from "@/content/site";

type CollectionPageProps = {
  collection: Collection;
};

/**
 * The shared template behind all four collection pages. Each page keeps the
 * same rhythm — hero, statement, detail band, curated gallery, studio note,
 * the bespoke process and a closing enquiry — while the content, imagery and
 * enquiry routing change per collection.
 */
export function CollectionPage({ collection }: CollectionPageProps) {
  const items = galleryByTag(collection.filter);
  const heroItem = getGalleryItem(collection.heroImage);
  const bandSlugs = collection.galleryImages.slice(1, 3);
  const others = collections.filter((entry) => entry.slug !== collection.slug);

  return (
    <>
      <PageHero
        eyebrow={collection.shortName}
        title={collection.name}
        intro={collection.summary}
        imageSlug={collection.heroImage}
        imageAlt={
          heroItem?.alt ?? `${collection.name} by Magmens Couture, Obuasi, Ghana.`
        }
        frameLabel={`Collection ${collection.index}`}
      />

      {/* Statement and characteristics */}
      <Section tone="ivory" labelledBy="collection-statement">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">{collection.shortName}</p>
              <h2 id="collection-statement" className="display-1 mt-5">
                Made to measure, one client at a time.
              </h2>
              <hr className="hairline my-8 w-20" />
              {collection.intro.map((paragraph) => (
                <p key={paragraph} className="body-copy measure mt-5">
                  {paragraph}
                </p>
              ))}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href="/book-consultation">
                  Book a Consultation
                </Button>
                <Button
                  href={whatsappLink(
                    whatsappEnquiryMessage(
                      collection.shortName.toLowerCase(),
                    ),
                  )}
                  variant="outline"
                >
                  Enquire on WhatsApp
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:pt-16">
              <h3 className="eyebrow">What defines this collection</h3>
              <ul className="mt-6">
                {collection.characteristics.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-t border-gold/25 py-4 text-[0.9375rem] leading-relaxed text-espresso/85 first:border-t-0 first:pt-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-5 shrink-0 bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Detail band */}
      {bandSlugs.length > 0 ? (
        <Section tone="porcelain" className="py-0 md:py-0 lg:py-0">
          <Container className="py-16 md:py-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {bandSlugs.map((slug, index) => {
                const item = getGalleryItem(slug);
                return (
                  <Reveal key={slug} delay={index * 120}>
                    <figure className="group">
                      <div className="relative aspect-4/5 w-full overflow-hidden bg-ivory">
                        <EditorialImage
                          slug={slug}
                          alt={item?.alt ?? `${collection.name} detail.`}
                          sizes="(min-width: 640px) 46vw, 92vw"
                          zoom
                        />
                      </div>
                      <figcaption className="mt-3 text-[0.75rem] text-taupe">
                        {item?.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Curated gallery */}
      <Section tone="ivory" labelledBy="collection-gallery">
        <Container>
          <Reveal>
            <p className="eyebrow">The Gallery</p>
            <h2 id="collection-gallery" className="display-1 mt-5">
              {collection.name}, in detail.
            </h2>
            <hr className="hairline my-8 w-20" />
            <p className="body-copy measure">
              Select any photograph to view it full screen. Every piece shown
              here was designed, cut and finished by Magmens Couture.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <Gallery
              items={items}
              showFilters={false}
              idPrefix={collection.slug}
              columnsClass="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6"
            />
          </Reveal>

          {collection.note ? (
            <Reveal className="mt-12">
              <div className="border-l-2 border-gold/60 bg-porcelain p-6 md:p-8">
                <p className="eyebrow">Studio note</p>
                <p className="body-copy mt-3 max-w-3xl text-[0.9375rem]">
                  {collection.note}
                </p>
                <Link
                  href="/policies"
                  className="link-editorial mt-4 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.22em]"
                >
                  Read the policies in full
                </Link>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      <BespokeJourney
        compact
        headingId={`${collection.slug}-journey`}
      />

      {/* Cross-links to the other houses */}
      <Section tone="porcelain" labelledBy="other-collections">
        <Container>
          <Reveal>
            <h2 id="other-collections" className="eyebrow">
              Continue exploring
            </h2>
            <ul className="mt-8 grid gap-px bg-gold/25 sm:grid-cols-3">
              {others.map((entry) => (
                <li key={entry.slug} className="bg-porcelain p-7 md:p-9">
                  <span className="text-[0.5625rem] uppercase tracking-[0.3em] text-gold">
                    {entry.index}
                  </span>
                  <h3 className="display-3 mt-4">
                    <Link
                      href={`/${entry.slug}`}
                      className="transition-colors duration-500 ease-editorial hover:text-gold"
                    >
                      {entry.name}
                    </Link>
                  </h3>
                  <p className="body-copy mt-3 text-[0.875rem]">
                    {entry.summary}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <AppointmentCta occasion={collection.occasion} />
    </>
  );
}
