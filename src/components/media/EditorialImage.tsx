import Image from "next/image";
import { resolveImage } from "@/content/gallery";

type EditorialImageProps = {
  /** Slug from src/content/image-manifest.json. */
  slug: string;
  alt: string;
  /** `sizes` hint so the browser downloads the right variant. */
  sizes: string;
  className?: string;
  /** Fill the parent's aspect box (the parent must be positioned). */
  fill?: boolean;
  priority?: boolean;
  /** Slow zoom on hover, for cards wrapped in a `group`. */
  zoom?: boolean;
};

const zoomClasses =
  "transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

/**
 * Renders a prepared photograph with intrinsic dimensions and a blur
 * placeholder, so layout never shifts and images arrive gracefully.
 */
export function EditorialImage({
  slug,
  alt,
  sizes,
  className = "",
  fill = true,
  priority = false,
  zoom = false,
}: EditorialImageProps) {
  const image = resolveImage(slug);
  const classes = `${zoom ? zoomClasses : ""} ${className}`.trim();

  if (fill) {
    return (
      <Image
        src={image.file}
        alt={alt}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className={classes}
        fill
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      src={image.file}
      alt={alt}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      width={image.width}
      height={image.height}
      className={classes}
    />
  );
}
