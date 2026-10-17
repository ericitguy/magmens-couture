"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { resolveImage } from "@/content/gallery";

type ParallaxPhotoProps = {
  slug: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Vertical drift as a fraction of the element height. */
  strength?: number;
  /** CSS object-position for crop control. */
  position?: string;
};

/**
 * A very slow, very small vertical drift as the page scrolls — the kind of
 * parallax you notice only if you look for it. Movement is skipped entirely
 * for visitors who prefer reduced motion.
 */
export function ParallaxPhoto({
  slug,
  alt,
  sizes,
  priority = false,
  strength = 0.06,
  position = "50% 35%",
}: ParallaxPhotoProps) {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const image = resolveImage(slug);

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      if (rect.bottom < -80 || rect.top > viewport + 80) return;
      // -1 as the element leaves the bottom of the screen, +1 as it exits the top.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = progress * strength * rect.height;
      node.style.setProperty("--parallax-offset", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={wrapper} className="absolute inset-0 overflow-hidden">
      <Image
        src={image.file}
        alt={alt}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        fill
        style={{
          objectFit: "cover",
          objectPosition: position,
          transform: "translate3d(0, var(--parallax-offset, 0px), 0) scale(1.08)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
