"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { brand, contact, navigation, whatsappLink } from "@/content/site";

/** Routes that open with a full-bleed photographic hero. */
const OVERLAY_ROUTES = new Set([
  "/",
  "/bridal",
  "/kente-traditional",
  "/reception-gowns",
  "/occasion-wear",
  "/our-story",
]);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const overHero = OVERLAY_ROUTES.has(pathname) && !scrolled;

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape to close, and keep focus inside the open panel.
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      toggleRef.current?.focus();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the panel for keyboard and screen reader users.
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [menuOpen, onKeyDown]);

  return (
    <>
      <header
        className={`no-print sticky top-0 z-50 h-(--header-h) transition-colors duration-700 ease-editorial ${
          overHero
            ? "bg-gradient-to-b from-espresso/85 via-espresso/55 to-espresso/20"
            : "border-b border-gold/20 bg-ivory/95 backdrop-blur-md"
        }`}
      >
        {/* Row one: the lockup, a quiet studio line and the booking action. */}
        <div className="shell flex h-19 items-center justify-between gap-6 md:h-21">
          <Wordmark onDark={overHero} />

          <div className="flex items-center gap-6">
            <p
              className={`hidden whitespace-nowrap text-[0.625rem] uppercase tracking-[0.2em] 2xl:block ${
                overHero ? "text-ivory/60" : "text-taupe"
              }`}
            >
              {contact.address.locality}, {contact.address.region} · By appointment
            </p>

            <Link
              href="/book-consultation"
              className={`hidden whitespace-nowrap px-6 py-3.5 text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial lg:inline-flex ${
                overHero
                  ? "border border-ivory/55 text-ivory hover:border-gold hover:bg-ivory hover:text-espresso"
                  : "border border-espresso bg-espresso text-ivory hover:border-gold hover:bg-[#3a2b29]"
              }`}
            >
              Book a Consultation
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`flex h-11 w-11 items-center justify-center border transition-colors duration-500 ease-editorial xl:hidden ${
                overHero
                  ? "border-ivory/45 text-ivory hover:border-gold"
                  : "border-espresso/25 text-espresso hover:border-gold"
              }`}
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ease-editorial ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ease-editorial ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Row two: the full navigation, given its own line so nothing crowds. */}
        <nav
          aria-label="Primary"
          className={`hidden border-t xl:block ${
            overHero ? "border-ivory/20" : "border-gold/15"
          }`}
        >
          <div className="shell flex items-center justify-center gap-x-9 py-3">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial ${
                    overHero
                      ? "text-ivory/80 hover:text-ivory"
                      : "text-espresso/75 hover:text-espresso"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-editorial ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile slide-out */}
      <div
        className={`no-print fixed inset-0 z-60 xl:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className={`absolute inset-0 h-full w-full cursor-default bg-espresso/50 backdrop-blur-sm transition-opacity duration-500 ease-editorial ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Site menu"
          className={`on-dark absolute inset-y-0 right-0 flex h-full w-[min(22rem,88vw)] flex-col overflow-y-auto bg-espresso px-7 py-6 text-ivory transition-transform duration-700 ease-editorial ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Wordmark onDark />
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setMenuOpen(false);
                toggleRef.current?.focus();
              }}
              className="flex h-11 w-11 items-center justify-center border border-ivory/30 text-ivory transition-colors duration-500 ease-editorial hover:border-gold"
            >
              <span className="sr-only">Close menu</span>
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>

          <hr className="hairline my-7" />

          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={menuOpen ? 0 : -1}
                    className="block py-3 font-display text-[1.6rem] leading-tight text-ivory/90 transition-colors duration-500 ease-editorial hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <hr className="hairline-faint my-7" />

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/book-consultation"
              tabIndex={menuOpen ? 0 : -1}
              className="inline-flex items-center justify-between border border-gold bg-gold px-6 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-espresso transition-colors duration-500 ease-editorial hover:bg-transparent hover:text-gold"
            >
              Book a Consultation
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              className="inline-flex items-center justify-between border border-ivory/40 px-6 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory transition-colors duration-500 ease-editorial hover:border-gold hover:text-gold"
            >
              WhatsApp the studio
              <span aria-hidden="true">→</span>
            </a>
            <p className="mt-2 text-[0.75rem] leading-relaxed text-ivory/60">
              {contact.address.lines.slice(0, 3).join(", ")}
            </p>
            <p className="text-[0.75rem] text-ivory/60">{brand.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
}
