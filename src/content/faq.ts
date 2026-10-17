/**
 * Frequently asked questions.
 *
 * Every answer restates something the studio has already published — the
 * policies, the booking process, the founder's story or the payment notice.
 * Nothing here invents a lead time, a price or a service the studio has not
 * offered. When a policy changes, change the answer here too: the same facts
 * appear in `policies.ts` and on the booking page, and they must agree.
 */
import { contact } from "./site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** A quieter follow-up sentence. */
  note?: string;
  link?: { href: string; label: string };
};

export type FaqGroup = {
  id: string;
  title: string;
  intro?: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "bookings",
    title: "Bookings & consultations",
    intro:
      "How appointments work, what a consultation costs and how to arrange one from anywhere in the world.",
    items: [
      {
        id: "appointment-required",
        question: "Do I need an appointment to visit the atelier?",
        answer:
          "Yes. All consultations and fittings are strictly by appointment, booked and confirmed in advance through the studio's official channels. Walk-ins are not guaranteed service, so please arrange a time before travelling to Obuasi.",
      },
      {
        id: "how-to-book",
        question: "How do I book a consultation?",
        answer: `Send the request form on the booking page, message the studio on WhatsApp, or email ${contact.email}. The studio checks availability and confirms directly — submitting the form is a request, not a confirmed appointment.`,
        link: { href: "/book-consultation", label: "Start a consultation request" },
      },
      {
        id: "consultation-fee",
        question: "What does a consultation cost?",
        answer:
          "GHS 500, payable to secure the session. It is non-refundable, separate from the cost of producing the garment, and forms part of the total cost of the commission — it is deducted from the final amount.",
        note: "Ask the studio for the payment details and confirm availability before paying anything.",
      },
      {
        id: "consultation-guests",
        question: "Can I bring someone with me?",
        answer:
          "You may bring up to two guests. The studio strongly advises that the bride and any decision-making third party — family, coordinator or stylist — attend, because it is not responsible for misunderstandings where a client consults solely through someone else.",
      },
      {
        id: "consultation-abroad",
        question: "Can I be fitted from outside Ghana?",
        answer:
          "Yes. Consultations are held in person at the Obuasi atelier or virtually by video call, and measurements can be taken at the atelier or through a guided video call with a studio representative. Delivery and shipping costs are borne by the client.",
      },
    ],
  },
  {
    id: "make",
    title: "Design, fittings & fabric",
    intro:
      "How a piece is designed and built, how many fittings it takes, and what the studio can — and cannot — accept from you.",
    items: [
      {
        id: "made-to-measure",
        question: "Is everything made to measure?",
        answer:
          "Yes. Every outfit is custom-made for one client, and nothing is held in stock. Final designs, sketches and details are approved with you before production begins.",
      },
      {
        id: "design-changes",
        question: "Can I change the design after approving it?",
        answer:
          "Major design changes after approval attract additional charges, and once production has commenced, design changes may not be possible. Agree the details before production starts.",
      },
      {
        id: "fittings",
        question: "How many fittings are there?",
        answer:
          "Up to three: the initial fit, the mid-production fit and the final fit. Clients must attend all scheduled fittings, which should be completed at least 2–4 weeks before the event date. If you cannot attend in person, the studio may offer a test fit or extra allowance for future alterations where applicable.",
      },
      {
        id: "fabric",
        question: "Can I supply my own fabric?",
        answer:
          "For bridal gowns, no — the studio supplies all fabrics and external fabrics are not accepted. For traditional and Kente outfits you may supply your own cloth or ask the studio to source it; additional sourcing fees may apply, and client-supplied fabric must meet the studio's quality requirements.",
      },
      {
        id: "measurements",
        question: "What measurements do you need?",
        answer:
          "Bust and under-bust, waist and hips, shoulder width and armhole, sleeve length, your height and the desired dress length, plus any additional measurement the design requires. You are responsible for telling the studio about changes such as pregnancy or weight gain or loss before production begins.",
        note: "Changes that are not communicated may affect the final fit.",
      },
      {
        id: "urgent-orders",
        question: "Can you make something urgently?",
        answer:
          "Express and urgent orders depend on availability and carry additional rush fees. Confirm both with the studio before committing to a date.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    intro:
      "The deposit, the balance, the accepted methods and what happens if plans change.",
    items: [
      {
        id: "deposit",
        question: "What deposit is required?",
        answer:
          "A minimum 70% non-refundable deposit is required to commence production. The full balance must be paid before collection or delivery, and no outfit is released without full payment.",
      },
      {
        id: "how-to-pay",
        question: "How do I pay?",
        answer:
          "By MTN Mobile Money or bank transfer, using the details published in the payment policy. Reference your full name on every payment so the studio can track it, and add the applicable Mobile Money charges.",
        link: { href: "/policies#payment", label: "Payment policy and account details" },
      },
      {
        id: "refunds",
        question: "Are payments refundable?",
        answer:
          "No. Payments, deposits, consultation fees and progress payments are strictly non-refundable, and once production has commenced no refunds are issued. This applies within Ghanaian consumer protection law.",
      },
      {
        id: "instalments",
        question: "Can I pay in instalments?",
        answer:
          "The stated schedule is a 70% deposit to begin production and the balance before collection or delivery. Any other arrangement is agreed with the studio directly before work starts.",
      },
    ],
  },
  {
    id: "collection",
    title: "Collection, delivery & privacy",
    intro:
      "What happens at the end of the process, and how your information is handled.",
    items: [
      {
        id: "delivery",
        question: "Do you deliver, and who pays?",
        answer:
          "Delivery can be arranged, but delivery and shipping costs — local or international — are borne by the client and are not included in garment pricing. Outfits not collected within 14 days of completion attract storage fees.",
      },
      {
        id: "privacy",
        question: "Who sees my measurements and personal details?",
        answer:
          "Personal, body measurement and design information is handled confidentially and used only for the studio's legitimate business purposes. The privacy notice sets out what is collected, where it is stored and how to have it removed.",
        note: "Consultation requests also appear in the studio's own private calendar, which only the studio can open.",
        link: { href: "/privacy", label: "Read the privacy notice" },
      },
    ],
  },
];

/** Flat list, used for structured data and for counting. */
export const faqItems: FaqItem[] = faqGroups.flatMap((group) => group.items);
