/**
 * Payment details published by the studio.
 *
 * Supplied by Magmens Couture in its payment-methods notice. The details are
 * published so a client can never be sent invented account numbers by a third
 * party — see `paymentSafety` below, which the interface shows alongside them.
 */

export type PaymentField = {
  label: string;
  value: string;
  /** Rendered as a link (a phone number) when present. */
  href?: string;
};

export type PaymentMethod = {
  id: string;
  label: string;
  fields: PaymentField[];
  note?: string;
};

export const paymentRules = [
  "All payments are non-refundable.",
  "Clients paying by Mobile Money must add the applicable MoMo charges to the total amount.",
  "Every payment must be referenced with the client's full name so the studio can track it.",
] as const;

export const paymentMethods: PaymentMethod[] = [
  {
    id: "mtn-mobile-money",
    label: "MTN Mobile Money",
    fields: [
      {
        label: "Number",
        value: "0248 304 463",
        href: "tel:+233248304463",
      },
      { label: "Registered name", value: "Gifty Marian Mensah" },
    ],
    note: "Add the applicable MoMo charges to the amount you send.",
  },
  {
    id: "absa-bank",
    label: "ABSA Bank",
    fields: [
      { label: "Account name", value: "Magmens Couture" },
      { label: "Account number", value: "038 112 9632" },
      { label: "Branch", value: "Obuasi" },
    ],
  },
];

export const paymentSafety =
  "These are the studio's only payment details. If anyone sends you different account or Mobile Money details, call the studio on";
