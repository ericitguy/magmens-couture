/**
 * Official Policies & Terms.
 *
 * The substance of every policy supplied by the studio is preserved here in
 * full. Copy may be rephrased for clarity of web presentation but nothing is
 * removed, weakened or contradicted. Update `version` and `lastUpdated` when
 * the studio revises its terms.
 */

export const policiesMeta = {
  version: "1.0",
  lastUpdated: "16 October 2026",
  intro:
    "These are the stated terms under which Magmens Couture accepts consultations, orders, production and collection. Please read them before booking, as they set out what the studio requires and what clients can expect.",
  closing:
    "By proceeding with a consultation, payment, or production, clients acknowledge the applicable policies, subject to any mandatory legal requirements.",
} as const;

export type PolicyList = {
  /** A short lead-in such as "Accepted payment methods:". */
  label?: string;
  items: string[];
};

export type PolicySection = {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  lists?: PolicyList[];
  note?: string;
};

export const policySections: PolicySection[] = [
  {
    id: "booking-appointment",
    number: "1",
    title: "Booking & Appointment Policy",
    lists: [
      {
        items: [
          "All consultations and fittings are held strictly by appointment.",
          "Appointments must be booked and confirmed in advance through official Magmens Couture channels.",
          "Walk-ins are not guaranteed service.",
          "Clients are expected to arrive on time. Late arrivals may result in shortened sessions or rescheduling.",
        ],
      },
    ],
  },
  {
    id: "consultation",
    number: "2",
    title: "Consultation Policy",
    lists: [
      {
        items: [
          "Consultations may be conducted in person or virtually.",
          "A non-refundable consultation fee is required to secure a consultation.",
          "The consultation fee is separate from garment production costs.",
          "A maximum of two guests may accompany a client.",
          "The bride and relevant decision-makers are encouraged to attend.",
          "When a client consults solely through a third party, Magmens Couture is not responsible for misunderstandings or discrepancies arising from information communicated by that third party.",
        ],
      },
    ],
    note: "Submitting the enquiry form is a request, not a confirmed appointment. A consultation is confirmed only once the studio has confirmed availability and its requirements have been satisfied.",
  },
  {
    id: "design-approval",
    number: "3",
    title: "Design Approval & Production",
    lists: [
      {
        items: [
          "All outfits are custom-made.",
          "Final designs, sketches and details must be approved before production begins.",
          "Major design changes after approval may attract additional charges.",
          "Once production has commenced, design changes may not be possible.",
        ],
      },
    ],
  },
  {
    id: "payment",
    number: "4",
    title: "Payment Policy",
    lists: [
      {
        items: [
          "A minimum 70% non-refundable deposit is required to commence production.",
          "The outstanding balance must be paid before collection or delivery.",
          "Payments must reference the client's full name.",
          "No outfit will be released without full payment.",
        ],
      },
      {
        label: "Accepted payment methods:",
        items: ["Mobile Money", "Bank transfer"],
      },
    ],
    note: "Account details are issued by the studio to confirmed clients only. Magmens Couture never publishes payment account details online.",
  },
  {
    id: "no-refund",
    number: "5",
    title: "No Refund Policy",
    paragraphs: [
      "Payments, deposits, consultation fees and progress payments are stated by Magmens Couture to be non-refundable.",
      "Once production has commenced, the studio's policy states that refunds will not be issued.",
    ],
    note: "This policy is subject to applicable Ghanaian consumer protection law and other mandatory legal requirements.",
  },
  {
    id: "fittings",
    number: "6",
    title: "Fittings Policy",
    paragraphs: ["Up to three fittings are provided:"],
    lists: [
      {
        items: [
          "Initial fitting.",
          "Mid-production fitting.",
          "Final fitting.",
        ],
      },
      {
        items: [
          "Clients are expected to attend scheduled fittings.",
          "Fittings should be completed 2–4 weeks before the event date.",
          "Clients who cannot attend in person may be offered a test-fit service or additional allowance for future alterations, where applicable.",
        ],
      },
    ],
  },
  {
    id: "measurements",
    number: "7",
    title: "Measurement Policy",
    lists: [
      {
        items: [
          "Measurements must be taken at the atelier or through a guided video call with a Magmens Couture representative.",
          "Clients are responsible for providing accurate measurements.",
          "Changes in body measurements, including pregnancy or weight changes, must be communicated before production begins.",
          "Failure to communicate relevant changes may affect the final fit.",
        ],
      },
      {
        label: "Required measurements may include:",
        items: [
          "Bust and under-bust.",
          "Waist and hips.",
          "Shoulder width and armhole.",
          "Sleeve length.",
          "Height and desired dress length.",
          "Additional measurements required for the selected design.",
        ],
      },
    ],
  },
  {
    id: "fabric",
    number: "8",
    title: "Fabric Policy",
    lists: [
      {
        label: "Bridal gowns:",
        items: [
          "Magmens Couture supplies the fabrics. External fabrics are not accepted for bridal gowns under the studio's stated policy.",
        ],
      },
      {
        label: "Traditional and Kente outfits:",
        items: [
          "Clients may supply their own Kente fabric or request sourcing assistance.",
          "Additional sourcing fees may apply.",
          "Client-supplied fabric must meet the studio's quality requirements.",
        ],
      },
    ],
  },
  {
    id: "delivery",
    number: "9",
    title: "Delivery & Collection",
    lists: [
      {
        items: [
          "Full payment must be completed before collection.",
          "Delivery and shipping costs are borne by the client and are not included in garment pricing.",
          "Local and international shipping fees are separate.",
          "Outfits not collected within 14 days of completion may attract storage fees.",
        ],
      },
    ],
  },
  {
    id: "express",
    number: "10",
    title: "Express & Urgent Orders",
    lists: [
      {
        items: [
          "Express and urgent orders depend on availability.",
          "Additional rush fees apply to expedited services.",
        ],
      },
    ],
  },
  {
    id: "confidentiality",
    number: "11",
    title: "Confidentiality & Data Protection",
    lists: [
      {
        items: [
          "Personal, body measurement and design information is handled confidentially.",
          "Client information is collected, stored, accessed and used only for legitimate business purposes.",
          "Appropriate security measures and a clear privacy notice apply.",
          "Clients may contact the studio at any time regarding their personal information.",
        ],
      },
    ],
    note: "See the Privacy Notice for how enquiry information is collected, used, stored and removed.",
  },
  {
    id: "entire-agreement",
    number: "12",
    title: "Entire Agreement",
    paragraphs: [
      "These policies represent the studio's stated terms for consultations, payments, design approval, production, fittings and collection.",
      "By proceeding with a consultation, payment, or production, clients acknowledge the applicable policies, subject to any mandatory legal requirements.",
    ],
  },
];

/** Table of contents for the policies page. */
export const policyContents = policySections.map((section) => ({
  id: section.id,
  number: section.number,
  title: section.title,
}));
