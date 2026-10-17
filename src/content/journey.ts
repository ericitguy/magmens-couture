/**
 * The bespoke experience and client testimonials.
 */

export type JourneyStep = {
  index: string;
  title: string;
  body: string;
  /** Optional photograph illustrating the step. */
  imageSlug?: string;
};

export const journey: JourneyStep[] = [
  {
    index: "01",
    title: "Consultation",
    body: "We discuss your occasion, preferred style, inspiration, budget and design expectations — in person at the Obuasi atelier, or virtually if you are abroad.",
  },
  {
    index: "02",
    title: "Design & Approval",
    body: "A design concept is developed for you and the details are confirmed with you before any production begins.",
  },
  {
    index: "03",
    title: "Craftsmanship & Fittings",
    body: "Your garment is created by hand and refined across scheduled fittings until the fit, the line and the finish are right.",
    imageSlug: "atelier-mermaid-mannequin",
  },
  {
    index: "04",
    title: "Final Reveal",
    body: "Final checks are completed and the finished outfit is prepared for collection at the atelier or delivery to you.",
  },
];

/**
 * Client testimonials.
 *
 * Deliberately empty. Genuine, approved client reviews have not been supplied
 * by the studio, so the site presents an honest placeholder rather than
 * invented praise. Add approved testimonials here and the section renders
 * them automatically.
 */
export type Testimonial = {
  quote: string;
  attribution: string;
  /** e.g. "Bride, Accra — March 2026" */
  context: string;
};

export const testimonials: Testimonial[] = [];

/** Shown while `testimonials` is empty. */
export const testimonialsPlaceholder = {
  eyebrow: "Client Experience",
  headline: "Words from our clients",
  body: "Approved client testimonials will be published here. In the meantime, recent bridal and couture work, along with client stories, is shared on the studio's Instagram.",
  ctaLabel: "View studio work",
} as const;
