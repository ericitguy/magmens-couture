import Link from "next/link";
import { ParallaxPhoto } from "@/components/media/ParallaxPhoto";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  imageSlug: string;
  imageAlt: string;
  /** Small label in the lower-right of the frame. */
  frameLabel?: string;
  priority?: boolean;
};

/**
 * Interior hero: a cinematic photograph with a soft warm scrim, carrying only
 * the page title and a single line of orientation. Used by the collection
 * pages so the whole site opens the same way.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  imageSlug,
  imageAlt,
  frameLabel,
  priority = true,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="under-header on-dark relative flex min-h-[78svh] items-end overflow-hidden bg-espresso text-ivory lg:min-h-[86svh]"
    >
      <ParallaxPhoto
        slug={imageSlug}
        alt={imageAlt}
        sizes="100vw"
        priority={priority}
        position="50% 30%"
        strength={0.05}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-espresso/92 via-espresso/45 to-espresso/35"
      />

      <div className="shell relative w-full pb-16 pt-32 md:pb-24">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.24em] text-ivory/60">
            <li>
              <Link
                href="/"
                className="transition-colors duration-500 ease-editorial hover:text-gold"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold">
              /
            </li>
            <li className="text-ivory/85">{eyebrow}</li>
          </ol>
        </nav>

        <h1 id="page-hero-heading" className="display-1 max-w-4xl">
          {title}
        </h1>

        {intro ? (
          <p className="lead lead-on-dark measure mt-6">{intro}</p>
        ) : null}
      </div>

      {frameLabel ? (
        <p className="absolute bottom-6 right-6 hidden text-[0.625rem] uppercase tracking-[0.28em] text-ivory/60 md:block">
          {frameLabel}
        </p>
      ) : null}
    </section>
  );
}
