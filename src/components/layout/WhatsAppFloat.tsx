import { contact, whatsappLink } from "@/content/site";

/**
 * A discreet floating WhatsApp entry point.
 *
 * Positioned clear of mobile browser chrome and sized for touch. The label is
 * visually hidden on small screens and revealed on desktop, so the control
 * never obstructs the interface.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with Magmens Couture on WhatsApp, ${contact.phoneDisplay}`}
      className="no-print group fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full border border-gold/45 bg-espresso/95 py-3 pl-3 pr-4 text-ivory shadow-[0_10px_30px_-12px_rgba(36,26,25,0.55)] backdrop-blur-sm transition-colors duration-500 ease-editorial hover:border-gold hover:bg-espresso md:bottom-8 md:right-8"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-espresso"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.27 4.86L2 22l5.32-1.32a9.9 9.9 0 0 0 4.72 1.2h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.77.83-3.03-.19-.31a8.17 8.17 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.24.85 5.79 2.4a8.14 8.14 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.13-.16.25-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.03-.38-1.96-1.21-.72-.65-1.2-1.45-1.35-1.7-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.71.23 1.35.19 1.86.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.08-.13-.29-.2-.54-.32Z" />
        </svg>
      </span>
      <span className="hidden text-[0.625rem] font-medium uppercase tracking-[0.22em] sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
