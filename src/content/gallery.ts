/**
 * Curated gallery.
 *
 * `image-manifest.json` is generated from the studio's original files by
 * `npm run images` and holds the technical data (file, dimensions, blur
 * placeholder). This module holds the editorial meaning: what each photograph
 * shows, its accessible description and where it belongs.
 *
 * To add new photography: drop the file into ./photos, add it to the SOURCES
 * list in scripts/prepare-images.mjs with a descriptive slug, run
 * `npm run images`, then describe it here.
 */
import manifest from "./image-manifest.json";

export type ImageRecord = {
  slug: string;
  file: string;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: "portrait" | "landscape";
  blurDataURL: string;
  removedLetterbox: { top: number; bottom: number } | null;
};

const images = manifest as Record<string, ImageRecord>;

export const galleryFilters = [
  { value: "all", label: "All Work" },
  { value: "bridal", label: "Bridal" },
  { value: "traditional", label: "Kente & Traditional" },
  { value: "reception", label: "Reception" },
  { value: "occasion", label: "Occasion Wear" },
  { value: "atelier", label: "Atelier & Craft" },
] as const;

export type GalleryFilter = (typeof galleryFilters)[number]["value"];
export type GalleryTag = Exclude<GalleryFilter, "all">;

export type GalleryItem = {
  slug: string;
  alt: string;
  caption: string;
  /** Longer description used by the lightbox. */
  description: string;
  tags: GalleryTag[];
};

export const galleryItems: GalleryItem[] = [
  {
    slug: "bridal-ivory-ballgown-blossom",
    alt: "Bride wearing a custom ivory satin ball gown with an off-shoulder bodice appliquéd in three-dimensional floral lace, photographed before an installation of cream and white blossoms.",
    caption: "Ivory satin ball gown with hand-applied floral bodice",
    description:
      "A bespoke bridal gown in ivory satin, built on a sculpted corseted bodice and finished with three-dimensional floral lace appliqué across the off-shoulder neckline.",
    tags: ["bridal"],
  },
  {
    slug: "bridal-ivory-ballgown-full",
    alt: "Full-length view of a bespoke ivory Magmens Couture ball gown with a fitted corseted bodice, worn with a long tulle veil and a white and green bouquet.",
    caption: "Full-length bridal ball gown with tulle veil",
    description:
      "The full silhouette of a couture ball gown: fitted through the corseted bodice, full through the skirt, completed with a floor-length tulle veil.",
    tags: ["bridal"],
  },
  {
    slug: "bridal-ivory-ballgown-portrait",
    alt: "Close bridal portrait of a Magmens Couture gown showing a sculpted off-shoulder bodice of hand-applied floral lace and beaded detailing.",
    caption: "Sculpted bodice, hand-applied lace and beading",
    description:
      "Detail of the sculpted bodice: layered lace motifs and beaded embellishment applied by hand around a structured, off-shoulder neckline.",
    tags: ["bridal", "atelier"],
  },
  {
    slug: "bridal-ivory-ballgown-train",
    alt: "Three-quarter view of a bride in an ivory satin ball gown with a sweeping train and scattered lace appliqué, photographed indoors ahead of her wedding ceremony.",
    caption: "Sweeping train and scattered lace appliqué",
    description:
      "A sweeping skirt and train, with lace motifs scattered across the satin to soften the volume of the silhouette.",
    tags: ["bridal"],
  },
  {
    slug: "bridal-beaded-mermaid-long-sleeve",
    alt: "Bride in a long-sleeved beaded Magmens Couture mermaid gown with an illusion neckline and cathedral train, holding a bouquet of white roses beside a plant-filled window.",
    caption: "Beaded mermaid gown with illusion sleeves",
    description:
      "A fitted mermaid gown in heavily beaded tulle: illusion long sleeves, a sculpted sweetheart bodice and a train that carries the beading to the floor.",
    tags: ["bridal", "reception"],
  },
  {
    slug: "traditional-amber-lace-train",
    alt: "Client wearing a bespoke Magmens Couture amber beaded lace gown with off-shoulder floral appliqué, a ruffled peplum waist and a Kente-print train sweeping the floor.",
    caption: "Amber beaded lace gown with Kente-print train",
    description:
      "Traditional couture: amber lace, hand-beaded throughout, with a peplum waist and a sweeping Kente-print train for ceremonial processions.",
    tags: ["traditional", "reception", "occasion"],
  },
  {
    slug: "traditional-royal-beaded-corset",
    alt: "Client in a hand-beaded Magmens Couture corseted gown with a Kente-panel bust, crystal-embroidered overlay and fitted skirt, photographed at a wedding reception.",
    caption: "Corseted gown with Kente-panel bust",
    description:
      "A corseted gown built around a Kente-panel bust, with crystal embroidered motifs flowing across the skirt — heritage cloth given couture construction.",
    tags: ["traditional"],
  },
  {
    slug: "atelier-mermaid-mannequin",
    alt: "A beaded mauve mermaid gown displayed on a mannequin beneath a pearl-edged veil inside the Magmens Couture atelier, with a member of the couture team beside it.",
    caption: "In the atelier: beaded mermaid gown on the stand",
    description:
      "Mid-production in the atelier. The gown is pinned on the stand for its final fitting, with the pearl-edged veil positioned over the bodice to check the fall of the drape.",
    tags: ["atelier", "reception"],
  },
  {
    slug: "bridal-white-beaded-corset",
    alt: "Client in a white hand-beaded corset with a sheer yoke and cap sleeves, worn with a draped white satin skirt and a silver clutch, photographed in a pale interior.",
    caption: "White beaded corset and draped satin skirt",
    description:
      "A modern alternative to the traditional gown: a hand-beaded white corset beneath a sheer yoke, paired with a satin skirt gathered into soft drape so the line stays long and quiet.",
    tags: ["bridal", "reception"],
  },
  {
    slug: "reception-fuchsia-beaded-lace",
    alt: "Client in a fuchsia beaded lace mermaid gown with sheer embroidered long sleeves, a corseted bodice and a satin train draped from the shoulders, standing between full-height curtains.",
    caption: "Fuchsia beaded lace with a draped satin train",
    description:
      "Beaded lace in fuchsia, with illusion sleeves, a sculpted bodice and a satin train that falls from the shoulder — a second entrance designed to hold the room.",
    tags: ["reception", "bridal"],
  },
  {
    slug: "reception-red-sequin-ruffle",
    alt: "Mrs. Marian Gifty Mensah-Dossah, founder and CEO of Magmens Couture, in a custom red sequin mermaid gown with sculpted ruffle off-shoulder sleeves, a corseted bodice and a sweeping train, photographed in a doorway.",
    caption: "Red sequin mermaid gown with ruffle sleeves",
    description:
      "Worn by the house's founder: a reception silhouette cut in red sequin, with a corseted bodice, exaggerated ruffle sleeves that frame the shoulders, and a fishtail skirt that falls into a train.",
    tags: ["reception", "occasion"],
  },
  {
    slug: "award-gopa-red-gown-2024",
    alt: "Mrs. Marian Gifty Mensah-Dossah in a floor-length red gown accepting the Ghana Outstanding Personality Award for the Fashion & Lifestyle category, with the GOPA stage banner reading Ghana Outstanding Personality Award visible behind her.",
    caption: "Ghana Outstanding Personality Award — Fashion & Lifestyle, 2024",
    description:
      "Mrs. Marian Gifty Mensah-Dossah receiving the Ghana Outstanding Personality Award in the Fashion & Lifestyle category in 2024, in a red crepe dress with crystal embellishment beside an embroidered fan. The GOPA stage banner behind her reads Ghana Outstanding Personality Award.",
    tags: ["traditional", "occasion"],
  },
  {
    slug: "award-seated-portrait-115730",
    alt: "Mrs. Marian Gifty Mensah-Dossah, founder and CEO of Magmens Couture, accepting an award in 2026, holding a gold-and-black award plaque with her name on the base.",
    caption: "Award acceptance portrait, 2026",
    description:
      "Mrs. Marian Gifty Mensah-Dossah, founder and CEO of Magmens Couture, accepting an award in 2026. She holds a gold-and-black award plaque with her name and title engraved on its base.",
    tags: ["atelier", "occasion"],
  },
  {
    slug: "award-seated-portrait-115807",
    alt: "Mrs. Marian Gifty Mensah-Dossah in a red gown accepting an award at a stage ceremony, with a Ghanaian flag visible behind her.",
    caption: "Award acceptance, Ghana stage ceremony",
    description:
      "Mrs. Marian Gifty Mensah-Dossah accepting an award at a Ghanaian stage ceremony in a red gown. A Ghanaian flag is visible behind her.",
    tags: ["traditional", "occasion"],
  },
  {
    slug: "award-seated-portrait-115844",
    alt: "Mrs. Marian Gifty Mensah-Dossah holding a Triumph Fashion Icon trophy, a gold-and-black trophy with a star on top.",
    caption: "Triumph Fashion Icon trophy",
    description:
      "Mrs. Marian Gifty Mensah-Dossah holding the Triumph Fashion Icon trophy: a gold-and-black trophy with a star on top.",
    tags: ["atelier", "occasion"],
  },
  {
    slug: "award-gopa-2026",
    alt: "Two women with trophies and a GOPA banner, Ghana Outstanding Personality Award 2026",
    caption: "Ghana Outstanding Personality Award — 2026",
    description:
      "Two women receiving the Ghana Outstanding Personality Award in 2026, each holding a black and gold star-shaped trophy beside a vertical banner reading Ghana Outstanding Personality Award.",
    tags: ["traditional", "occasion"],
  },
  {
    slug: "award-citation-2026",
    alt: "Three people presenting an award on stage, with a Citation plaque and LED screen background.",
    caption: "Citation Award — 2026",
    description:
      "Three people on stage presenting a citation award. Center: a woman in a silver pleated gown and dark fascinator holding the left side of a framed Citation plaque. Left: an older man in a black kufi and agbada robe. Right: a woman in a pink layered tulle dress.",
    tags: ["occasion", "atelier"],
  },
  {
    slug: "award-collective-2026",
    alt: "Nineteen individuals standing on a stage posing with awards and framed portraits, GOPA stage banner visible.",
    caption: "Collective Award — 2026",
    description:
      "Nineteen individuals (12 men and 7 women) on stage posing with awards and framed portraits beneath a purple stage backdrop with a white circular logo and stars.",
    tags: ["occasion", "atelier"],
  },
  {
    slug: "award-citation-2026-extra",
    alt: "Three people presenting an award on stage, similar to award-citation-2026 but a different photograph from the same WhatsApp share.",
    caption: "Citation Award (extra) — 2026",
    description:
      "Three people on stage presenting a citation award. A different photograph from the same Oct 17, 2026 WhatsApp share: same staging, same Citation plaque, same three figures in identical outfits.",
    tags: ["occasion", "atelier"],
  },
  {
    slug: "traditional-copper-beaded-kente",
    alt: "Client in a copper beaded tulle mermaid gown with a Kente-panel bust, densely beaded bodice and a train edged in red, black and white Kente cloth, photographed against a bronze backdrop.",
    caption: "Copper beaded tulle with a Kente-panel bust",
    description:
      "Traditional couture built on beaded tulle: a Kente-panel bust, dense copper beadwork carried through the bodice, and a train finished in the same cloth.",
    tags: ["traditional", "reception"],
  },
  {
    slug: "traditional-kente-corset-train",
    alt: "Client seen from behind in a hand-beaded Kente corset and matching Kente fishtail skirt tied with a red sash, the train fanned across the studio floor.",
    caption: "Beaded Kente corset and fishtail train",
    description:
      "A two-piece traditional look: a beaded Kente corset and a fishtail skirt cut from the same cloth, gathered with a red sash and arranged so the train reads as one panel.",
    tags: ["traditional"],
  },
  {
    slug: "traditional-green-kente-corset",
    alt: "Client in a green and gold beaded corseted gown with a striped Kente bust, holding a fan of green organdie discs embroidered with gold Adinkra symbols.",
    caption: "Green and gold Kente corset with Adinkra fan",
    description:
      "Green and gold Kente interpreted entirely in beadwork: a corseted bodice, a striped bust panel and an organdie fan appliquéd with Adinkra symbols for the ceremonial photographs.",
    tags: ["traditional", "occasion"],
  },
  {
    slug: "traditional-kente-beaded-fishtail",
    alt: "Client in a beaded multi-colour Kente gown with a coral fishtail train, holding a deep red beaded clutch, photographed against a bronze studio backdrop.",
    caption: "Beaded Kente gown with coral fishtail",
    description:
      "Kente motifs rendered in beadwork across a fitted gown, with a coral fishtail train and a beaded clutch — the studio's ceremonial register, made to be photographed.",
    tags: ["traditional"],
  },
  {
    slug: "atelier-kente-beaded-mannequin",
    alt: "A multi-colour beaded Kente gown on a dress form inside the atelier, its bodice patterned in green, red, blue and gold beadwork above a sheer beaded waist.",
    caption: "In the atelier: Kente beadwork on the stand",
    description:
      "A Kente-pattern gown pinned on the stand mid-production: beaded bodice, sheer corseted waist and a fitted skirt, checked for line and balance before the first fitting.",
    tags: ["atelier", "traditional"],
  },
];

/** Gallery items filtered by a collection tag. */
export function galleryByTag(tag: GalleryTag): GalleryItem[] {
  return galleryItems.filter((item) => item.tags.includes(tag));
}

/** Looks up the technical record plus curatorial copy for one photograph. */
export function getGalleryItem(slug: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.slug === slug);
}

export function getImage(slug: string): ImageRecord | undefined {
  return images[slug];
}

/**
 * Resolves a slug into everything the image components need. Throws during
 * development if a slug is misspelled or its photograph has not been prepared,
 * so a broken image can never reach production unnoticed.
 */
export function resolveImage(slug: string): ImageRecord {
  const record = images[slug];
  if (!record) {
    throw new Error(
      `Unknown photograph "${slug}". Run "npm run images" and check src/content/image-manifest.json.`,
    );
  }
  return record;
}

export const allImageSlugs = Object.keys(images);
