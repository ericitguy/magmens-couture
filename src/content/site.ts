/**
 * Single source of truth for brand, contact and channel information.
 *
 * Everything a studio administrator is likely to change lives in this folder
 * (src/content) — see README.md, "Updating the website".
 *
 * Verified details only. Anything the studio has not yet supplied is left as
 * `null` and the interface degrades gracefully rather than inventing data.
 */

export const brand = {
  name: "Magmens Couture",
  wordmark: { primary: "MAGMENS", secondary: "COUTURE" },
  tagline: "Redefining Elegance Through Craftsmanship",
  positioning: [
    "Luxury African Couture",
    "Timeless Bridal Elegance",
    "Unforgettable Moments",
  ],
  shortDescription:
    "A Ghanaian luxury fashion house creating bespoke bridal couture, Kente and traditional gowns, reception dresses and occasion wear.",
  established: 2015,
  founderName: "Mrs. Marian Gifty Mensah-Dossah",
  founderRole: "Founder & Chief Executive Officer",
} as const;

/**
 * Public site URL. Set NEXT_PUBLIC_SITE_URL in production so canonical URLs,
 * sitemap entries and social previews point at the live domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.magmenscouture.com"
).replace(/\/$/, "");

export const contact = {
  phoneDisplay: "+233 24 830 4463",
  phoneE164: "+233248304463",
  whatsappNumber: "233248304463",
  email: "mariangiftymensah@gmail.com",
  address: {
    lines: [
      "Obuasi New Estate",
      "Opposite the Presbyterian Church",
      "Obuasi, Ashanti Region",
      "Ghana",
    ],
    street: "Obuasi New Estate",
    locality: "Obuasi",
    region: "Ashanti Region",
    country: "Ghana",
    countryCode: "GH",
  },
  /** Business hours are published only once the studio has provided them. */
  hours: null as string | null,
  appointmentNote:
    "Consultations and fittings are held strictly by appointment at the Obuasi atelier and virtually by video call.",
} as const;

export type SocialLink = {
  label: string;
  handle: string;
  /** `null` when the precise profile URL has not been verified yet. */
  url: string | null;
  note: string;
};

/**
 * Social profiles. Where the studio has not confirmed an exact profile URL the
 * link is intentionally left unlinked and clearly labelled, rather than
 * pointing visitors at a guessed destination. Add the verified URL and the
 * link becomes live automatically.
 */
export const socials: SocialLink[] = [
  {
    label: "Instagram",
    handle: "@magmens_couture",
    url: "https://www.instagram.com/magmens_couture",
    note: "Studio work, bridal stories and atelier updates.",
  },
  {
    label: "Facebook",
    handle: "Magmens Couture Gh",
    url: "https://www.facebook.com/Magmenscouture/",
    note: "The studio's Facebook page, “Magmens Couture gh | Obuasi”.",
  },
  {
    label: "TikTok",
    handle: "Magmens Couture Gh",
    url: "https://www.tiktok.com/@magmens_couture2",
    note: "Studio films, runway moments and gown reveals.",
  },
];

/** Values offered in the occasion and collection fields of the enquiry forms. */
export const occasions = [
  { value: "wedding-bridal", label: "Wedding / Bridal" },
  { value: "reception", label: "Reception" },
  { value: "traditional-kente", label: "Traditional / Kente" },
  { value: "thanksgiving", label: "Thanksgiving" },
  { value: "other-occasion", label: "Other occasion wear" },
] as const;

export const budgetRanges = [
  { value: "to-confirm", label: "Prefer to discuss with the studio" },
  { value: "standard", label: "Standard couture range" },
  { value: "premium", label: "Premium couture range" },
  { value: "bespoke-unlimited", label: "Fully bespoke — no fixed range" },
] as const;

export const consultationMethods = [
  { value: "in-person", label: "In person at the Obuasi atelier" },
  { value: "virtual", label: "Virtual consultation by video call" },
] as const;

/** Builds a wa.me deep link with a pre-filled, context-aware enquiry message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  const text = message ?? defaultWhatsappMessage();
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsappMessage(): string {
  return "Hello Magmens Couture, I would like to enquire about your bespoke couture services. Please guide me through your consultation process.";
}

export function whatsappEnquiryMessage(
  occasion: string,
  eventDate?: string,
): string {
  const date = eventDate?.trim() ? eventDate.trim() : "[date]";
  return `Hello Magmens Couture, I would like to enquire about your bespoke couture services. My occasion is ${occasion}, and my event date is ${date}. Please guide me through your consultation process.`;
}

/** Primary navigation, used by the header, the mobile menu and the footer. */
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Bridal", href: "/bridal" },
  { label: "Kente & Traditional", href: "/kente-traditional" },
  { label: "Reception & Occasion Wear", href: "/occasion" },
  { label: "Our Story", href: "/our-story" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
] as const;
