import type { Metadata } from "next";
import { EditorialImage } from "@/components/media/EditorialImage";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { BespokeJourney } from "@/components/sections/BespokeJourney";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { MonogramPlate } from "@/components/ui/MonogramPlate";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGalleryItem } from "@/content/gallery";
import { brand } from "@/content/site";
import { awards, craftQuotes, founder, milestones } from "@/content/story";
import { socialImage } from "@/lib/social-image";

export const metadata: Metadata = {
  title: "Our Story & Founder",
  description:
    "The story of Magmens Couture and its founder, Mrs. Marian Gifty Mensah-Dossah — from Obuasi to a multiple award-winning Ghanaian house of bridal and high-fashion couture, established in 2015.",
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: "Our Story & Founder | Magmens Couture",
    description:
      "From Obuasi to a Ghanaian house of bridal and high-fashion couture: the story of Magmens Couture and its founder.",
    url: "/our-story",
    images: [socialImage("bridal-ivory-ballgown-portrait")],
  },
};

const ATELIER_SLUG = "atelier-mermaid-mannequin";
const DETAIL_SLUG = "bridal-ivory-ballgown-portrait";

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A house built on make and memory."
        intro={`Founded in ${brand.established} in Obuasi, ${brand.name} designs and hand-finishes bridal and occasion couture for women who want to be remembered.`}
        imageSlug="bridal-ivory-ballgown-portrait"
        imageAlt={
          getGalleryItem("bridal-ivory-ballgown-portrait")?.alt ??
          "Close detail of a sculpted, hand-beaded Magmens Couture bodice."
        }
        frameLabel="Est. 2015"
      />

      {/* The founder */}
      <Section tone="ivory" labelledBy="founder-story-heading">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              {founder.portraitSlug ? (
                <figure className="group">
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-porcelain">
                    <EditorialImage
                      slug={founder.portraitSlug}
                      alt={`${founder.name}, ${founder.role} of ${brand.name}.`}
                      sizes="(min-width: 1024px) 38vw, 92vw"
                      zoom
                    />
                  </div>
                  <figcaption className="mt-4 font-display text-[1.05rem]">
                    {founder.name}
                  </figcaption>
                </figure>
              ) : (
                <figure className="lg:sticky lg:top-32">
                  <MonogramPlate />
                  <figcaption className="mt-4 font-display text-[1.05rem]">
                    {founder.name}
                    <span className="mt-1 block font-sans text-[0.6875rem] uppercase tracking-[0.22em] text-taupe">
                      {founder.role}
                    </span>
                  </figcaption>
                </figure>
              )}
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <p className="eyebrow">{founder.eyebrow}</p>
              <h2 id="founder-story-heading" className="display-1 mt-5">
                {founder.headline}
              </h2>
              <hr className="hairline my-8 w-20" />
              <p className="lead measure">{founder.lead}</p>

              <div className="mt-8 space-y-5">
                {founder.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="body-copy measure">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10">
                <Button href="/book-consultation">
                  Book a Consultation
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Editorial pull quote drawn from the studio's own copy */}
      <section className="on-dark bg-espresso py-20 text-ivory md:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow eyebrow-on-dark">The house</p>
            <blockquote className="display-2 mt-6">
              “{craftQuotes[1]}”
            </blockquote>
            <p className="mt-6 text-[0.75rem] uppercase tracking-[0.24em] text-ivory/55">
              {brand.name} · {brand.tagline}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <Section tone="porcelain" labelledBy="timeline-heading">
        <Container>
          <SectionHeading
            headingId="timeline-heading"
            eyebrow="The Journey"
            title="From a family passion to a couture house."
            intro="A short account of how the studio came to be, and what it is building towards."
          />

          <ol className="mt-16 space-y-0">
            {milestones.map((milestone, index) => (
              <Reveal
                key={milestone.title}
                as="li"
                delay={index * 80}
                className="grid gap-4 border-t border-gold/25 py-8 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-3">
                  <span className="font-display text-[1.15rem] tracking-[0.12em] text-gold">
                    {milestone.year}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="display-3">{milestone.title}</h3>
                  <p className="body-copy measure mt-3 text-[0.9375rem]">
                    {milestone.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Awards and recognitions */}
      <Section tone="ivory" labelledBy="awards-heading">
        <Container>
          <SectionHeading
            headingId="awards-heading"
            eyebrow="Awards & Recognitions"
            title="Recognised in Ghana and beyond."
            intro="A decade of work, acknowledged from Accra to Banjul — for design, for craftsmanship, and for building a fashion business that creates opportunity for others."
          />

          <ol className="mt-14 grid gap-px border border-gold/25 bg-gold/25 sm:grid-cols-2">
            {awards.map((award, index) => (
              <Reveal
                key={`${award.year}-${award.title}`}
                as="li"
                delay={index * 60}
                className="flex flex-col bg-ivory p-6 md:p-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-[1.05rem] tracking-[0.12em] text-gold">
                    {award.year}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[0.75rem] text-gold/60"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display-3 mt-4">{award.title}</h3>
                <p className="mt-3 text-[0.6875rem] uppercase leading-relaxed tracking-[0.18em] text-taupe">
                  {award.organisation}
                </p>
                <p className="body-copy mt-4 text-[0.9375rem]">{award.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* The atelier */}
      <Section tone="porcelain" labelledBy="atelier-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Inside the Atelier</p>
              <h2 id="atelier-heading" className="display-1 mt-5">
                Where the work is done.
              </h2>
              <hr className="hairline my-8 w-20" />
              <p className="body-copy measure">
                Every gown is cut, structured and finished by hand in Obuasi.
                Corsetry is built on the stand, beading is applied motif by
                motif, and each client is fitted against her own pattern rather
                than a house block.
              </p>
              <p className="body-copy measure mt-5">
                It is slower than ready-to-wear, and deliberately so. The
                standard the studio works to is the one the client will
                remember when she looks at her photographs in twenty years.
              </p>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              <Reveal>
                <figure className="group">
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-porcelain">
                    <EditorialImage
                      slug={ATELIER_SLUG}
                      alt={
                        getGalleryItem(ATELIER_SLUG)?.alt ??
                        "A beaded mermaid gown on the stand in the atelier."
                      }
                      sizes="(min-width: 1024px) 28vw, 46vw"
                      zoom
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.75rem] text-taupe">
                    {getGalleryItem(ATELIER_SLUG)?.caption}
                  </figcaption>
                </figure>
              </Reveal>
              <Reveal delay={140} className="sm:mt-16">
                <figure className="group">
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-porcelain">
                    <EditorialImage
                      slug={DETAIL_SLUG}
                      alt={
                        getGalleryItem(DETAIL_SLUG)?.alt ??
                        "Detail of hand-applied lace and beading."
                      }
                      sizes="(min-width: 1024px) 28vw, 46vw"
                      zoom
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.75rem] text-taupe">
                    {getGalleryItem(DETAIL_SLUG)?.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <BespokeJourney headingId="story-journey" />

      <AppointmentCta
        eyebrow="Work with the studio"
        headline="Let us design something that lasts."
        copy="Tell us about your occasion and the woman who will wear the piece. The studio will guide you from the first sketch to the final fitting."
      />
    </>
  );
}
