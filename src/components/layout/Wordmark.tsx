import Link from "next/link";
import { brand } from "@/content/site";

type WordmarkProps = {
  /** Light lockup for use over photography or on espresso. */
  onDark?: boolean;
  className?: string;
};

/** The MAGMENS COUTURE lockup: a serif name over a wide-tracked descriptor. */
export function Wordmark({ onDark = false, className = "" }: WordmarkProps) {
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — home`}
      className={`group inline-flex flex-col leading-none ${className}`}
    >
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
    </Link>
  );
}
