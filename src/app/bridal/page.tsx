import type { Metadata } from "next";
import { CollectionPage } from "@/components/sections/CollectionPage";
import { requireCollection } from "@/content/collections";
import { socialImage } from "@/lib/social-image";

const collection = requireCollection("bridal");

export const metadata: Metadata = {
  title: collection.seo.title,
  description: collection.seo.description,
  alternates: { canonical: `/${collection.slug}` },
  openGraph: {
    title: collection.seo.title,
    description: collection.seo.description,
    url: `/${collection.slug}`,
    images: [socialImage(collection.heroImage)],
  },
  twitter: {
    card: "summary_large_image",
    title: collection.seo.title,
    description: collection.seo.description,
    images: [socialImage(collection.heroImage).url],
  },
};

export default function BridalPage() {
  return <CollectionPage collection={collection} />;
}
