"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryFilters,
  galleryItems,
  resolveImage,
  type GalleryFilter,
  type GalleryItem,
} from "@/content/gallery";

type GalleryProps = {
  /** Items to show. Defaults to the full curated gallery. */
  items?: GalleryItem[];
  /** Show the category filter row. */
  showFilters?: boolean;
  /** Tailwind column classes controlling the editorial grid. */
  columnsClass?: string;
  /** Hide the opening copy where the gallery is a preview. */
  idPrefix?: string;
};

const IMAGE_SIZES =
  "(min-width: 1280px) 30vw, (min-width: 768px) 44vw, 92vw";

export function Gallery({
  items = galleryItems,
  showFilters = true,
  columnsClass = "columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6",
  idPrefix = "gallery",
}: GalleryProps) {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => item.tags.includes(filter)),
    [filter, items],
  );

  // Only offer filters that actually have work behind them.
  const availableFilters = useMemo(
    () =>
      galleryFilters.filter(
        (option) =>
          option.value === "all" ||
          items.some((item) => item.tags.includes(option.value as never)),
      ),
    [items],
  );

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        const next = (current + direction + visible.length) % visible.length;
        return next;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : visible[openIndex];
  const activeImage = active ? resolveImage(active.slug) : null;

  return (
    <div>
      {showFilters ? (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {availableFilters.map((option) => {
            const selected = filter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFilter(option.value);
                  setOpenIndex(null);
                }}
                className={`border px-4 py-2.5 text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial ${
                  selected
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso/70 hover:border-gold hover:text-espresso"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {`${visible.length} ${visible.length === 1 ? "photograph" : "photographs"} shown`}
      </p>

      <div className={`mt-8 ${columnsClass}`}>
        {visible.map((item, index) => {
          const image = resolveImage(item.slug);
          return (
            <figure
              key={`${idPrefix}-${item.slug}`}
              className="group mb-5 break-inside-avoid lg:mb-6"
            >
              <button
                type="button"
                onClick={(event) => {
                  lastFocused.current = event.currentTarget;
                  setOpenIndex(index);
                }}
                className="block w-full cursor-zoom-in overflow-hidden bg-porcelain text-left"
                aria-label={`View larger: ${item.caption}`}
              >
                <Image
                  src={image.file}
                  alt={item.alt}
                  sizes={IMAGE_SIZES}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </button>
              <figcaption className="mt-3 flex items-start gap-3 text-[0.75rem] leading-relaxed text-taupe">
                <span aria-hidden="true" className="mt-2 h-px w-5 bg-gold/60" />
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {active && activeImage ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="on-dark fixed inset-0 z-70 flex flex-col bg-espresso/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
            <p className="text-[0.625rem] font-medium uppercase tracking-[0.22em] text-ivory/70">
              {`${(openIndex ?? 0) + 1} / ${visible.length}`}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="flex h-11 w-11 items-center justify-center border border-ivory/30 text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:text-gold"
            >
              <span className="sr-only">Close image viewer</span>
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-2 md:px-14">
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:text-gold md:left-4"
            >
              <span className="sr-only">Previous photograph</span>
              <span aria-hidden="true">←</span>
            </button>

            <Image
              key={active.slug}
              src={activeImage.file}
              alt={active.alt}
              sizes="(min-width: 1280px) 70vw, 92vw"
              placeholder="blur"
              blurDataURL={activeImage.blurDataURL}
              width={activeImage.width}
              height={activeImage.height}
              className="max-h-full w-auto max-w-full object-contain"
            />

            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:text-gold md:right-4"
            >
              <span className="sr-only">Next photograph</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="mx-auto w-full max-w-3xl px-5 pb-8 pt-4 text-center md:px-8">
            <p className="font-display text-[1.2rem] text-ivory">
              {active.caption}
            </p>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ivory/65">
              {active.description}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
