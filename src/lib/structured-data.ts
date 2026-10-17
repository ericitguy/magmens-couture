import { faqGroups } from "@/content/faq";
import { brand, contact, siteUrl, socials } from "@/content/site";

/**
 * Structured data for search engines.
 *
 * Only verified facts are published: no ratings, review counts, prices,
 * opening hours or coordinates have been supplied by the studio, so those
 * properties are deliberately absent rather than estimated.
 */
export function businessStructuredData() {
  const sameAs = socials
    .map((social) => social.url)
    .filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore"],
    "@id": `${siteUrl}/#business`,
    name: brand.name,
    alternateName: "Magmens Couture Gh",
    description: brand.shortDescription,
    slogan: brand.tagline,
    url: siteUrl,
    telephone: contact.phoneE164,
    email: contact.email,
    foundingDate: String(brand.established),
    founder: {
      "@type": "Person",
      name: brand.founderName,
      jobTitle: brand.founderRole,
    },
    image: `${siteUrl}/og/magmens-couture.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.countryCode,
    },
    areaServed: [
      { "@type": "Country", name: "Ghana" },
      { "@type": "Place", name: "International clients" },
    ],
    sameAs,
  };
}

/**
 * FAQPage markup, built from the same answers the page renders. Search engines
 * require the visible answer to match this text, so both read one source.
 */
export function faqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/faq#questions`,
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: [item.answer, item.note].filter(Boolean).join(" "),
        },
      })),
    ),
  };
}

export function websiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: brand.name,
    description: brand.shortDescription,
    publisher: { "@id": `${siteUrl}/#business` },
    inLanguage: "en",
  };
}
