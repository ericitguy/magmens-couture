import type { Metadata } from "next";
import { Gallery } from "@/components/gallery/Gallery";
import { AppointmentCta } from "@/components/sections/AppointmentCta";
import { BespokeJourney } from "@/components/sections/BespokeJourney";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { Craftsmanship } from "@/components/sections/Craftsmanship";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { FounderSpotlight } from "@/components/sections/FounderSpotlight";
import { HomeHero } from "@/components/sections/HomeHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { Container, Section } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: `${brand.name} | Luxury Bridal & Bespoke Couture in Ghana`,
  description:
    "Discover luxury bridal gowns, bespoke wedding dresses, Kente couture, reception gowns, and occasion wear by Magmens Couture in Obuasi, Ghana. Book your private consultation.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandIntro />
      <FeaturedCollections />
      <Craftsmanship />
      <BespokeJourney />
      <FounderSpotlight />

      <Section tone="porcelain" labelledBy="inspiration-heading">
        <Container>
          <SectionHeading
            headingId="inspiration-heading"
            eyebrow="Bridal Inspiration"
            title="The gallery"
            intro="Bridal gowns, Kente couture, reception looks and details from the atelier. Select a photograph to view it full screen."
          />
          <Reveal className="mt-12">
            <Gallery />
          </Reveal>
        </Container>
      </Section>

      <Testimonials />
      <AppointmentCta />
    </>
  );
}
