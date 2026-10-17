type MonogramPlateProps = {
  initials: string;
  caption?: string;
  className?: string;
};

/**
 * An elegant placeholder shown where a portrait is still to be supplied.
 * Deliberately typographic: it reads as an intentional part of the design
 * rather than as a missing image, and it is replaced automatically as soon as
 * a photograph is added to the content module.
 */
export function MonogramPlate({
  initials,
  caption,
  className = "",
}: MonogramPlateProps) {
  return (
    <figure className={className}>
      <div className="on-dark relative flex aspect-4/5 w-full items-center justify-center overflow-hidden bg-espresso">
        <div
          aria-hidden="true"
          className="absolute inset-4 border border-gold/35 md:inset-6"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(182,154,101,0.16),transparent_65%)]"
        />
        <span className="relative font-display text-[3.25rem] leading-none tracking-[0.24em] text-gold md:text-[4rem]">
          {initials}
        </span>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[0.75rem] leading-relaxed text-taupe">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
