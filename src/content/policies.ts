/**
 * Official Policies & Terms.
 *
 * The substance of every policy supplied by the studio is preserved here in
 * full. Copy may be rephrased for clarity of web presentation but nothing is
 * removed, weakened or contradicted. Update `version` and `lastUpdated` when
 * the studio revises its terms.
 */

export const policiesMeta = {
  version: "1.1",
  lastUpdated: "17 October 2026",
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
          "A non-refundable consultation fee of GHS 500 is required to secure any consultation session.",
          "The consultation fee is separate from the cost of production. It forms part of the total cost of the commission and is deductible from the final amount.",
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
          "A minimum deposit of 70% is required to commence production. The deposit is non-refundable.",
          "The full balance must be paid before collection or delivery of any outfit.",
          "Payments may be made by Mobile Money or bank transfer.",
          "All payments must be referenced with the client's full name so they can be tracked.",
          "No outfit will be released without full payment.",
        ],
      },
    ],
    note: "The studio's payment details are published below so that no client is sent invented account numbers by a third party. Pay only into the accounts named there, and confirm on +233 24 830 4463 if you are ever given different details.",
  },
  {
    id: "no-refund",
    number: "5",
    title: "No Refund Policy",
    paragraphs: [
      "All payments made to Magmens Couture are non-refundable.",
      "Once garment production has commenced, no refunds will be issued under any circumstances.",
      "Deposits, consultation fees and progress payments are strictly non-refundable.",
    ],
    note: "This policy is subject to applicable Ghanaian consumer protection law and other mandatory legal requirements.",
  },
  {
    id: "fittings",
    number: "6",
    title: "Fittings Policy",
    paragraphs: ["Magmens Couture provides up to three fittings:"],
    lists: [
      {
        items: [
          "Initial fit.",
          "Mid-production fit.",
          "Final fit.",
        ],
      },
      {
        items: [
          "Clients must attend all scheduled fittings.",
          "Fittings should be completed at least 2–4 weeks before the event date.",
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
          "Delivery costs are borne by the client.",
          "Shipping fees, local or international, are not included in garment pricing.",
          "Outfits not collected within 14 days of completion will attract storage fees.",
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
      "These policies constitute the entire agreement between Magmens Couture and the client.",
      "No verbal or written agreements outside this document shall apply unless officially amended by Magmens Couture.",
      "By proceeding with a consultation, payment, or production, clients confirm acceptance of these policies.",
    ],
  },
];

/** Table of contents for the policies page. */
export const policyContents = policySections.map((section) => ({
  id: section.id,
  number: section.number,
  title: section.title,
}));
