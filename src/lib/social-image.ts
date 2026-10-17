import { getGalleryItem, resolveImage } from "@/content/gallery";

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/**
 * The 1200×630 social card generated from a photograph by `npm run images`.
 * Falls back to the branded card when a photograph has no derivative.
 */
export function socialImage(slug?: string, alt?: string): SocialImage {
  if (!slug) {
    return {
      url: "/og/magmens-couture.jpg",
      width: 1200,
      height: 630,
      alt: alt ?? "Magmens Couture — luxury bridal and bespoke couture",
    };
  }

  // Throws during development if a slug is misspelled, which is what we want.
  resolveImage(slug);

  return {
    url: `/og/${slug}.jpg`,
    width: 1200,
    height: 630,
    alt: alt ?? getGalleryItem(slug)?.alt ?? "Magmens Couture",
  };
}
