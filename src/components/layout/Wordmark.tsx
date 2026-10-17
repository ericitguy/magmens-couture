import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/site";

type WordmarkProps = {
  /** Light lockup for use over photography or on espresso. */
  onDark?: boolean;
  /** Show the studio's MC emblem beside the name. */
  showMark?: boolean;
  className?: string;
};

/**
 * The MAGMENS COUTURE lockup: the studio's MC emblem beside a serif name over a
 * wide-tracked descriptor. The name is set in type rather than taken from the
 * circular artwork, whose lettering is illegible at header size.
 */
export function Wordmark({
  onDark = false,
  showMark = false,
  className = "",
}: WordmarkProps) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={`group inline-flex items-center ${
        showMark ? "gap-3 md:gap-3.5" : ""
      } leading-none ${className}`}
    >
      {showMark ? (
        <Image
          src={
            onDark
              ? "/brand/magmens-emblem-inverse.png"
              : "/brand/magmens-emblem.png"
          }
          alt=""
          aria-hidden="true"
          width={472}
          height={240}
          priority
          className="h-8 w-auto shrink-0 transition-opacity duration-500 ease-editorial md:h-10"
        />
      ) : null}

      <span className="inline-flex flex-col leading-none">
        <span
          className={`font-display text-[1.3rem] leading-none tracking-[0.3em] ${
            onDark ? "text-ivory" : "text-espresso"
          } transition-colors duration-500 ease-editorial sm:text-[1.45rem]`}
        >
          {brand.wordmark.primary}
        </span>
        <span
          className={`mt-1.5 text-[0.5rem] font-medium uppercase leading-none tracking-[0.52em] ${
            onDark ? "text-ivory/70" : "text-taupe"
          } transition-colors duration-500 ease-editorial`}
        >
          {brand.wordmark.secondary}
        </span>
      </span>
    </Link>
  );
}
