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
