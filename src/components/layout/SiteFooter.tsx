import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { collections } from "@/content/collections";
import { policiesMeta } from "@/content/policies";
import { brand, contact, socials, whatsappLink } from "@/content/site";
import { directionsUrl } from "@/lib/links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print on-dark bg-espresso text-ivory">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Image
              src="/brand/magmens-monogram.png"
              alt=""
              width={640}
              height={640}
              className="mb-6 h-14 w-14"
            />
            <Wordmark onDark />
            <p className="body-copy-on-dark measure-tight mt-6 text-[0.9375rem]">
              {brand.shortDescription} Every garment is designed, cut and
              finished at the atelier in {contact.address.locality}, and by
              appointment only.
            </p>
            <p className="eyebrow eyebrow-on-dark mt-8">Follow the studio</p>
            <ul className="mt-4 flex flex-col gap-2">
              {socials.map((social) =>
                social.url ? (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-editorial text-[0.875rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                    >
                      {social.handle}
                      <span className="sr-only"> on {social.label}</span>
                    </a>
                  </li>
                ) : (
                  <li
                    key={social.label}
                    className="text-[0.875rem] text-ivory/50"
                  >
                    {social.handle}
                    <span className="sr-only">
                      {" "}
                      on {social.label} — profile link to be confirmed
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <nav aria-labelledby="footer-collections" className="lg:col-span-3">
            <h2 id="footer-collections" className="eyebrow eyebrow-on-dark">
              Collections
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/${collection.slug}`}
                    className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/our-story"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow eyebrow-on-dark">The Atelier</h2>
            <address className="mt-5 not-italic">
              <span className="block text-[0.9375rem] leading-relaxed text-ivory/80">
                {contact.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <p className="mt-4 text-[0.9375rem] text-ivory/80">
              <a
                href={`tel:${contact.phoneE164}`}
                className="link-editorial transition-colors duration-500 ease-editorial hover:text-gold"
              >
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-[0.9375rem] text-ivory/80">
              <a
                href={`mailto:${contact.email}`}
                className="link-editorial break-all transition-colors duration-500 ease-editorial hover:text-gold"
              >
                {contact.email}
              </a>
            </p>
            <p className="mt-4">
              <a
                href={directionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial text-[0.875rem] text-ivory/70 transition-colors duration-500 ease-editorial hover:text-gold"
              >
                Get directions
              </a>
            </p>
            <p className="mt-6 text-[0.8125rem] leading-relaxed text-ivory/55">
              {contact.appointmentNote}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow eyebrow-on-dark">Appointments</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link
                  href="/book-consultation"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Book a consultation
                </Link>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  WhatsApp the studio
                </a>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Contact & directions
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Official policies & terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="link-editorial text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-editorial hover:text-gold"
                >
                  Privacy notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline-faint my-12" />

        <div className="flex flex-col gap-4 text-[0.75rem] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.name}. All rights reserved. Founded{" "}
            {brand.established} in {contact.address.locality}, Ghana.
          </p>
          <p>
            Policies version {policiesMeta.version} · Last updated{" "}
            {policiesMeta.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}
