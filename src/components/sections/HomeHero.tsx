import Link from "next/link";
import { ParallaxPhoto } from "@/components/media/ParallaxPhoto";
import { contact } from "@/content/site";

const HERO_SLUG = "bridal-ivory-ballgown-blossom";
const HERO_ALT =
  "Bride wearing a custom ivory satin Magmens Couture ball gown with a sculpted off-shoulder floral lace bodice, photographed before an installation of cream blossoms.";

/**
 * A full-viewport editorial hero: a deep espresso panel carrying the campaign
 * typography, and the bridal photograph given the full right-hand frame. The
 * photograph is never overlaid with text.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="under-header on-dark relative grid min-h-[100svh] grid-rows-[56svh_minmax(0,1fr)] overflow-hidden bg-espresso text-ivory lg:grid-cols-[minmax(0,42%)_minmax(0,1fr)] lg:grid-rows-1"
    >
      <div className="relative order-2 flex items-center lg:order-1">
        <div className="shell w-full pb-14 pt-10 lg:max-w-none lg:px-16 lg:pb-16 lg:pt-[calc(var(--header-h)+2.5rem)] xl:px-20">
          <p className="eyebrow eyebrow-on-dark">
            Luxury Bridal Couture · {contact.address.locality}, Ghana
          </p>

          <h1 id="hero-heading" className="display-hero mt-6 text-balance">
            Made for Your Most
            <br className="hidden sm:block" /> Unforgettable Moments.
          </h1>

          <hr className="hairline my-7 w-24" />

          <p className="lead lead-on-dark measure-tight mt-0">
            Exceptional bridal couture and bespoke designs crafted for women who
            desire elegance, confidence and timeless beauty.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:items-start">
            <Link
              href="#collections"
              className="group inline-flex items-center justify-between gap-6 whitespace-nowrap border border-gold bg-gold px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:bg-transparent hover:text-gold sm:justify-start"
            >
              <span>Discover Our Collections</span>
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-current transition-all duration-500 ease-editorial group-hover:w-9"
              />
            </Link>
            <Link
              href="/book-consultation"
              className="group inline-flex items-center justify-between gap-6 whitespace-nowrap border border-ivory/45 px-8 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:text-gold sm:justify-start"
            >
              <span>Book a Private Consultation</span>
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 bg-current transition-all duration-500 ease-editorial group-hover:w-9"
              />
            </Link>
          </div>

          <p className="mt-8 flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.24em] text-ivory/50">
            <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
            By appointment only
          </p>
        </div>
      </div>

      <div className="relative order-1 lg:order-2">
        <ParallaxPhoto
          slug={HERO_SLUG}
          alt={HERO_ALT}
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority
          position="50% 28%"
        />
        {/* Warms the top edge so the transparent navigation stays legible. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/55 to-transparent"
        />
        <p className="absolute bottom-6 right-6 hidden text-[0.625rem] uppercase tracking-[0.28em] text-ivory/70 md:block">
          Bridal Couture · 01
        </p>
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-px bg-gold/35 lg:block"
        />
      </div>

      <a
        href="#introduction"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/60 transition-colors duration-500 ease-editorial hover:text-gold lg:flex"
        aria-label="Scroll to the introduction"
      >
        <span className="text-[0.5625rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span
          aria-hidden="true"
          className="h-10 w-px bg-gradient-to-b from-gold/70 to-transparent"
        />
      </a>
    </section>
  );
}
