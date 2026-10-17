import { EditorialImage } from "@/components/media/EditorialImage";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MonogramPlate } from "@/components/ui/MonogramPlate";
import { founder } from "@/content/story";

const highlights = [
  "Founded in Obuasi in 2015 — a house built on bridal and high-fashion couture",
  "Ghana's Most Respected CEO in Fashion & Lifestyle Services, 2024",
  "Triumph Fashion Icon of the Year, 2026",
  "Global Woman Fashion Entrepreneur of the Year, 2025",
];

/**
 * The founder, given the weight the brand's credibility rests on. Where a
 * portrait has not yet been supplied, an in-house monogram plate stands in —
 * intentional typography rather than a broken image.
 */
export function FounderSpotlight() {
  return (
    <Section id="founder" tone="ivory" labelledBy="founder-heading">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            {founder.portraitSlug ? (
              <figure className="group relative">
                {/* 2:3 matches the supplied portrait, so no part of her is cropped. */}
                <div className="relative aspect-2/3 w-full overflow-hidden bg-porcelain">
                  <EditorialImage
                    slug={founder.portraitSlug}
                    alt={`${founder.name}, ${founder.role} of Magmens Couture.`}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    zoom
                  />
                </div>
                <figcaption className="mt-4 font-display text-[1.05rem]">
                  {founder.name}
                  <span className="mt-1 block font-sans text-[0.6875rem] uppercase tracking-[0.22em] text-taupe">
                    {founder.role}
                  </span>
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
            <p className="eyebrow">Meet the Founder</p>
            <h2 id="founder-heading" className="display-1 mt-5">
              A Vision Rooted in Passion. A Legacy Shaped by Craftsmanship.
            </h2>
            <hr className="hairline my-8 w-20" />
            <p className="lead measure">{founder.lead}</p>

            <div className="mt-8 space-y-5">
              {founder.paragraphs.slice(0, 3).map((paragraph) => (
                <p key={paragraph} className="body-copy measure">
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-espresso/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-px w-5 shrink-0 bg-gold"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/our-story" variant="outline">
                Read Our Story
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
