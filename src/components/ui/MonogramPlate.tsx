import Image from "next/image";

type MonogramPlateProps = {
  caption?: string;
  className?: string;
};

/**
 * The studio's brand plate, shown where a photograph has not been supplied.
 *
 * It uses the studio's own monogram artwork as an intentional part of the
 * design — a printed calling card on espresso — rather than a placeholder that
 * reads as a missing image. It is replaced automatically as soon as a portrait
 * is added to the founder content.
 */
export function MonogramPlate({
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
        <Image
          src="/brand/magmens-monogram.png"
          alt=""
          width={640}
          height={640}
          sizes="(min-width: 1024px) 30vw, 70vw"
          className="relative w-[68%] max-w-72 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)]"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[0.75rem] leading-relaxed text-taupe">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
