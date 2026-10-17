"use client";

type PrintButtonProps = {
  label?: string;
  /** Light styling for use on espresso backgrounds. */
  onDark?: boolean;
  /** Expand every collapsed section before the print dialogue opens. */
  openAllSections?: boolean;
};

/**
 * Opens the browser's print dialogue.
 *
 * When `openAllSections` is set, every collapsed `<details>` is expanded first,
 * so the printed policy is complete rather than truncated to whatever happened
 * to be open on screen.
 */
export function PrintButton({
  label = "Print this page",
  onDark = false,
  openAllSections = false,
}: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (openAllSections) {
          for (const details of document.querySelectorAll("details")) {
            details.open = true;
          }
        }
        window.print();
      }}
      className={`no-print inline-flex items-center gap-3 whitespace-nowrap border px-6 py-3.5 text-[0.625rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-editorial ${
        onDark
          ? "border-ivory/45 text-ivory hover:border-gold hover:text-gold"
          : "border-espresso/30 text-espresso hover:border-gold"
      }`}
    >
      {label}
      <span aria-hidden="true" className="inline-block h-px w-5 bg-current" />
    </button>
  );
}
