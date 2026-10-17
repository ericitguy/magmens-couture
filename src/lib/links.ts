import { contact } from "@/content/site";

/** A human-readable, URL-safe form of the studio address. */
export function studioAddressQuery(): string {
  return [
    "Magmens Couture",
    contact.address.street,
    contact.address.locality,
    contact.address.region,
    contact.address.country,
  ].join(", ");
}

/** Opens the studio location in Google Maps without requiring an API key. */
export function directionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    studioAddressQuery(),
  )}`;
}

/** Keyless embedded map for the contact page. */
export function mapEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    studioAddressQuery(),
  )}&output=embed`;
}

/** Where the contact form sends visitors after a successful enquiry. */
export const contactSuccessPath = "/contact?sent=1";
