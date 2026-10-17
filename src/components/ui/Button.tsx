import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "text";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  /** Opens the link in a new tab with a safe rel attribute. */
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "group/btn inline-flex items-center justify-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500 ease-editorial";

const sizes = "px-7 py-4 md:px-9";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso text-ivory hover:bg-[#3a2b29] border border-espresso hover:border-gold",
  outline:
    "border border-espresso/35 text-espresso hover:border-gold hover:text-espresso bg-transparent",
  light:
    "border border-ivory/45 text-ivory hover:border-gold hover:text-ivory bg-transparent on-dark",
  text: "text-espresso p-0 py-1 hover:text-gold",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  external = false,
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variant === "text" ? variants.text : `${variants[variant]} ${sizes}`} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {variant !== "text" ? (
        <span
          aria-hidden="true"
          className="inline-block h-px w-6 bg-current transition-all duration-500 ease-editorial group-hover/btn:w-9"
        />
      ) : (
        <span
          aria-hidden="true"
          className="inline-block h-px w-6 bg-current transition-all duration-500 ease-editorial group-hover/btn:w-9"
        />
      )}
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {content}
    </Link>
  );
}
