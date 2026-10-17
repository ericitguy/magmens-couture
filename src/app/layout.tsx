import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { brand, siteUrl } from "@/content/site";
import {
  businessStructuredData,
  websiteStructuredData,
} from "@/lib/structured-data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brand.name} | Luxury Bridal & Bespoke Couture in Ghana`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Discover luxury bridal gowns, bespoke wedding dresses, Kente couture, reception gowns, and occasion wear by Magmens Couture in Obuasi, Ghana. Book your private consultation.",
  applicationName: brand.name,
  keywords: [
    "luxury bridal gowns in Ghana",
    "bridal designers in Ghana",
    "bridal couture in Obuasi",
    "wedding dresses in Obuasi",
    "custom-made wedding gowns in Ghana",
    "Kente wedding gowns in Ghana",
    "traditional bridal dresses in Ghana",
    "wedding reception gowns in Ghana",
    "bespoke couture in Ghana",
    "occasion wear designers in Ghana",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: brand.name,
    url: siteUrl,
    title: `${brand.name} | Luxury Bridal & Bespoke Couture in Ghana`,
    description:
      "Bespoke bridal couture, Kente and traditional gowns, reception dresses and occasion wear, made by appointment in Obuasi, Ghana.",
    images: [
      {
        url: "/og/magmens-couture.jpg",
        width: 1200,
        height: 630,
        alt: `${brand.name} — ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Luxury Bridal & Bespoke Couture in Ghana`,
    description:
      "Bespoke bridal couture, Kente and traditional gowns, reception dresses and occasion wear, made by appointment in Obuasi, Ghana.",
    images: ["/og/magmens-couture.jpg"],
  },
  category: "fashion",
};

export const viewport: Viewport = {
  themeColor: "#241A19",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-ivory font-sans text-espresso antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:border focus:border-gold focus:bg-espresso focus:px-5 focus:py-3 focus:text-[0.75rem] focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <JsonLd data={businessStructuredData()} />
        <JsonLd data={websiteStructuredData()} />
      </body>
    </html>
  );
}
