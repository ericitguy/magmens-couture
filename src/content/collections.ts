/**
 * The four couture collections.
 *
 * Each collection drives its own page, its home-page editorial card, the
 * studio's enquiry routing and its metadata. Copy is grounded in the studio's
 * own description of its work; no prices, stock levels or purchase options are
 * published for made-to-measure garments.
 */
import type { GalleryTag } from "./gallery";

export type Collection = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  /** One-line summary used on cards and in metadata. */
  summary: string;
  /** Editorial body copy, rendered as restrained paragraphs. */
  intro: string[];
  /** What the collection is known for, in the studio's own language. */
  characteristics: string[];
  heroImage: string;
  galleryImages: string[];
  /** The gallery tag that matches this collection. */
  filter: GalleryTag;
  /** Occasion value used to pre-fill the booking form. */
  occasion: string;
  /** Optional studio note shown beneath the gallery. */
  note?: string;
  seo: { title: string; description: string };
};

export const collections: Collection[] = [
  {
    slug: "bridal",
    index: "01",
    name: "Bridal Couture",
    shortName: "Bridal",
    summary:
      "Bespoke wedding gowns with refined structure, sculpted corsetry and timeless silhouettes.",
    intro: [
      "A Magmens Couture bridal gown begins with the woman who will wear it — her story, the ceremony she is preparing for, and the way she wants to feel as she walks into the room.",
      "From there the gown is built by hand: a sculpted corseted foundation for support and shape, luxurious fabric selected for the way it moves, and delicate embellishment applied piece by piece until the bodice catches the light exactly as intended.",
    ],
    characteristics: [
      "Sculpted corsetry and structured bodices",
      "Hand-applied lace, pearl and crystal embellishment",
      "Ball gown, mermaid, fit-and-flare and column silhouettes",
      "Long trains, cathedral veils and detachable overskirts",
      "Bespoke design developed around the individual bride",
    ],
    heroImage: "bridal-ivory-ballgown-blossom",
    galleryImages: [
      "bridal-ivory-ballgown-blossom",
      "bridal-ivory-ballgown-full",
      "bridal-ivory-ballgown-portrait",
      "bridal-ivory-ballgown-train",
      "bridal-beaded-mermaid-long-sleeve",
    ],
    filter: "bridal",
    occasion: "wedding-bridal",
    note: "Under the studio's stated fabric policy, Magmens Couture supplies the fabrics for bridal gowns.",
    seo: {
      title: "Bridal Couture | Bespoke Wedding Gowns in Ghana",
      description:
        "Bespoke bridal couture by Magmens Couture in Obuasi, Ghana: sculpted corsetry, hand-applied embellishment and timeless silhouettes, made to measure for each bride. Book a private consultation.",
    },
  },
  {
    slug: "kente-traditional",
    index: "02",
    name: "Kente & Traditional Couture",
    shortName: "Kente & Traditional",
    summary:
      "Contemporary couture celebrating Ghanaian heritage, rich Kente textiles and sophisticated African elegance.",
    intro: [
      "Ghanaian heritage deserves couture. Our traditional collection pairs hand-beaded corsetry and precision tailoring with Kente cloth, lace and embroidered panels.",
      "The result is culturally authentic rather than decorative: silhouettes built to flatter, colour handled with restraint, and heritage cloth given the construction it deserves.",
    ],
    characteristics: [
      "Kente panels paired with beaded corsetry and lace",
      "Engagement, traditional wedding and ceremonial gowns",
      "Clients may supply their own Kente or request sourcing assistance",
      "Beaded peplums, fitted skirts and statement trains",
      "Tailoring refined across up to three fittings",
    ],
    heroImage: "traditional-amber-lace-train",
    galleryImages: [
      "traditional-amber-lace-train",
      "traditional-royal-beaded-corset",
      "atelier-mermaid-mannequin",
    ],
    filter: "traditional",
    occasion: "traditional-kente",
    note: "For traditional and Kente outfits you may supply your own cloth, or ask the studio for sourcing assistance. Client-supplied fabric must meet the studio's quality requirements.",
    seo: {
      title: "Kente Wedding Gowns & Traditional Couture in Ghana",
      description:
        "Kente wedding gowns and contemporary traditional couture by Magmens Couture, Obuasi. Hand-beaded corsetry, Kente panels and refined Ghanaian tailoring. Enquire about fabric sourcing.",
    },
  },
  {
    slug: "reception-gowns",
    index: "03",
    name: "Reception Gowns",
    shortName: "Reception",
    summary:
      "Statement-making second looks designed for the bride's second entrance and every moment that follows.",
    intro: [
      "The ceremony is complete — the reception is where the celebration begins. A reception gown is built to move: fitted through the body, engineered to hold its shape through hours of dancing, and finished so that it photographs as beautifully at midnight as it did on arrival.",
      "Expect dramatic silhouettes, beading that catches the light, and detachable elements that let one gown carry two distinct moments.",
    ],
    characteristics: [
      "Fitted, figure-enhancing silhouettes built for movement",
      "Crystal, sequin and pearl embellishment",
      "Detachable overskirts, capes and sleeves",
      "Second-entrance gowns with dramatic trains",
      "Coordinated with the bridal gown for a continuous story",
    ],
    heroImage: "bridal-beaded-mermaid-long-sleeve",
    galleryImages: [
      "bridal-beaded-mermaid-long-sleeve",
      "traditional-amber-lace-train",
      "bridal-ivory-ballgown-blossom",
    ],
    filter: "reception",
    occasion: "reception",
    seo: {
      title: "Wedding Reception Gowns in Ghana | Second-Look Couture",
      description:
        "Wedding reception gowns by Magmens Couture, Obuasi: fitted, hand-beaded second looks with dramatic silhouettes, detachable overskirts and trains, made to measure. Enquire to begin.",
    },
  },
  {
    slug: "occasion-wear",
    index: "04",
    name: "Thanksgiving & Occasion Wear",
    shortName: "Occasion Wear",
    summary:
      "Beautifully tailored gowns and bespoke outfits for thanksgiving ceremonies, milestone celebrations and formal events.",
    intro: [
      "Not every occasion is a wedding, but every occasion deserves the same standard of make. Thanksgiving ceremonies, anniversaries, milestone birthdays and formal invitations are all made to measure in the atelier.",
      "Each piece is designed around the event, the venue and the client — from restrained day-into-evening tailoring to full evening gowns with beaded bodices.",
    ],
    characteristics: [
      "Thanksgiving and church ceremony outfits",
      "Milestone celebrations and anniversary gowns",
      "Formal evening and black-tie gowns",
      "Mother-of-the-bride and family party tailoring",
      "Bespoke tailoring built from an individual pattern",
    ],
    heroImage: "traditional-amber-lace-train",
    galleryImages: [
      "traditional-amber-lace-train",
      "bridal-beaded-mermaid-long-sleeve",
      "traditional-royal-beaded-corset",
    ],
    filter: "occasion",
    occasion: "thanksgiving",
    note: "Photography from this collection is being prepared with the studio. Recent occasion wear is shared on the studio's Instagram and available to view at the atelier.",
    seo: {
      title: "Thanksgiving & Occasion Wear Designers in Ghana",
      description:
        "Bespoke occasion wear and thanksgiving outfits by Magmens Couture in Obuasi, Ghana. Made-to-measure gowns for milestone celebrations, formal events and family ceremonies.",
    },
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

/** Used by the collection pages, where a bad slug is a build-time error. */
export function requireCollection(slug: string): Collection {
  const collection = getCollection(slug);
  if (!collection) {
    throw new Error(`Unknown collection "${slug}". Check src/content/collections.ts.`);
  }
  return collection;
}
