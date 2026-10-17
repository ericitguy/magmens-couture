import { contact, whatsappLink } from "@/content/site";

/**
 * A slim, non-intrusive announcement strip. Static by design: no timer, no
 * dismissal state to remember and no layout shift when it renders.
 */
export function AnnouncementBar() {
  return (
    <div className="no-print bg-espresso text-ivory on-dark">
      <div className="shell flex items-center justify-center gap-x-4 py-2.5 text-center">
        <p className="text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-ivory/85 sm:text-[0.625rem] sm:tracking-[0.26em]">
          Luxury Bridal Couture
          <span aria-hidden="true" className="mx-2 text-gold sm:mx-3">
            ·
          </span>
          Bespoke Designs
          <span aria-hidden="true" className="mx-2 hidden text-gold sm:mx-3 sm:inline">
            ·
          </span>
          <span className="hidden sm:inline">By Appointment</span>
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-[0.625rem] font-medium uppercase tracking-[0.26em] text-gold transition-colors duration-500 ease-editorial hover:text-ivory md:inline"
        >
          WhatsApp {contact.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
