import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  /** Heading level, so document outline stays correct on every page. */
  level?: 2 | 3;
  /** Set when a parent section points at this heading with aria-labelledby. */
  headingId?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  level = 2,
  headingId,
  className = "",
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";

  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <p className={`eyebrow ${onDark ? "eyebrow-on-dark" : ""}`}>{eyebrow}</p>
      ) : null}
      <Heading id={headingId} className="display-1 mt-5">
        {title}
      </Heading>
      {intro ? (
        <div
          className={`lead mt-6 ${onDark ? "lead-on-dark" : ""} ${align === "center" ? "mx-auto measure" : "measure"}`}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
