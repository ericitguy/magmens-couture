/**
 * Privacy notice.
 *
 * This notice describes what this website actually does with information —
 * the fields the forms collect, where the data is stored and which providers
 * may process it. If the studio changes its providers or its retention
 * practice, update this file and bump the version. See README.md, "Privacy
 * notice", for the points the studio should confirm before launch.
 */

export const privacyMeta = {
  version: "1.0",
  lastUpdated: "16 October 2026",
  intro:
    "This notice explains what happens to the information you send through this website, why it is needed, where it is kept and how you can have it removed.",
} as const;

export type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  lists?: { label?: string; items: string[] }[];
  note?: string;
};

export const privacySections: PrivacySection[] = [
  {
    id: "what-we-collect",
    title: "Information we collect",
    paragraphs: [
      "We collect only what the studio needs in order to reply to you and to prepare for a consultation or an order. Nothing is collected in the background.",
    ],
    lists: [
      {
        label: "Consultation request form:",
        items: [
          "Your name, email address and WhatsApp or telephone number.",
          "Your country of residence.",
          "The occasion, preferred collection and any dates or times you provide.",
          "Your preferred consultation method and estimated budget range.",
          "Any design notes you type, and an inspiration image if you choose to attach one.",
        ],
      },
      {
        label: "Contact form:",
        items: [
          "Your name and email address.",
          "An optional telephone number and subject, and your message.",
        ],
      },
      {
        label: "Technical information:",
        items: [
          "A privacy-preserving key derived from your network address and browser identifier, together with the browser identification string, recorded with a submission solely to limit automated abuse. The raw network address is not stored.",
        ],
      },
    ],
  },
  {
    id: "why",
    title: "Why we use it",
    lists: [
      {
        items: [
          "To respond to your enquiry and answer your questions.",
          "To check availability and arrange a consultation or fitting.",
          "To prepare a quotation and, if you proceed, to produce your garment under the studio's policies.",
          "To keep a record of what was agreed about design, fabric, measurements and payment.",
          "To protect the studio's forms from automated abuse.",
        ],
      },
    ],
    note: "We do not sell your information, and we do not use it for advertising or add you to a marketing list. No advertising or analytics trackers are loaded on this website.",
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    paragraphs: [
      "This website sets no advertising or analytics cookies. Fonts and images are served from this site itself rather than from third-party networks, so simply reading a page does not disclose your visit to anyone else.",
      "If the studio later adds analytics or advertising, this notice will be updated and a cookie control will be provided before any such tool is loaded.",
    ],
  },
  {
    id: "sharing",
    title: "Who processes it",
    lists: [
      {
        label: "Enquiry records are stored in the studio's own database.",
        items: [
          "Database hosting: Neon, a managed PostgreSQL service.",
          "Email notification (where the studio has enabled it): Resend, so that the studio is alerted to your enquiry. Where you attach an inspiration image, it is attached to that notification email.",
        ],
      },
    ],
    note: "Other than these processors, and where the law requires it, your information is not shared with anyone else.",
  },
  {
    id: "retention",
    title: "How long it is kept",
    paragraphs: [
      "Enquiries are kept for as long as the studio needs them to answer you and to honour the studio's policies on consultations, orders and fittings. If an order is placed, the record forms part of the studio's client records.",
      "You can ask the studio to delete an enquiry that did not lead to an order at any time, and it will be removed.",
    ],
  },
  {
    id: "security",
    title: "How it is protected",
    lists: [
      {
        items: [
          "All information is transmitted over an encrypted connection.",
          "Submissions are validated on the server before they are stored, and stored values are written using bound parameters.",
          "Access to enquiry records is restricted to the studio and is protected by an access token.",
          "Body measurement and design information is treated as confidential under the studio's policies.",
        ],
      },
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    lists: [
      {
        items: [
          "Ask what information the studio holds about you and receive a copy.",
          "Ask for inaccurate details to be corrected.",
          "Ask for an enquiry to be deleted.",
          "Object to a particular use of your information, or withdraw your agreement to be contacted.",
          "Raise a concern about how your information has been handled.",
        ],
      },
    ],
    note: "To make any of these requests, contact the studio by telephone or WhatsApp at +233 24 830 4463, or through the contact form. Please give the name and email address you used so the right record can be found.",
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "This website is intended for adults arranging bridal, traditional, reception or occasion wear. The studio does not knowingly collect information from anyone under 18 through this site.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this notice",
    paragraphs: [
      "If the studio changes how information is handled — for example by adding a payment provider, a booking calendar or analytics — this notice will be updated and the version and date below will change.",
    ],
  },
];
