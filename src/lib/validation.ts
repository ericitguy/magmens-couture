import { z } from "zod";
import { collections } from "@/content/collections";
import {
  budgetRanges,
  consultationMethods,
  occasions,
} from "@/content/site";

/**
 * Form validation shared by the browser and the server.
 *
 * The same schema runs on both sides so a client-side check can never be the
 * only thing standing between the studio and a malformed enquiry.
 */

const VALUES = {
  occasion: occasions.map((option) => option.value),
  service: [...collections.map((collection) => collection.slug), "not-sure"],
  budget: budgetRanges.map((option) => option.value),
  method: consultationMethods.map((option) => option.value),
} as const;

/** Treats an empty submitted value as "not provided". */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((value) => (value ? value : undefined));

const isoDate = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date.")
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : undefined));

const isoTime = z
  .string()
  .trim()
  .regex(/^\d{2}:\d{2}$/, "Please choose a time.")
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : undefined));

const singleChoice = <T extends readonly string[]>(values: T) =>
  z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine(
      (value) => value === undefined || (values as readonly string[]).includes(value),
      { message: "Please choose one of the listed options." },
    );

/** A checkbox that must be ticked: browsers submit "on". */
const accepted = z
  .string()
  .optional()
  .transform((value) =>
    value === "on" || value === "true" || value === "1" ? true : false,
  )
  .refine(Boolean, {
    message:
      "Please confirm that you have read and agree to the policies, terms and privacy notice.",
  })
  .transform(() => true as const);

/** Deliberately empty: only automated agents fill a hidden field in. */
const honeypot = z
  .string()
  .max(0, "This submission looked automated.")
  .optional()
  .transform(() => undefined);

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
] as const;

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Please keep your name under 120 characters."),
  email: z
    .email("Please enter a valid email address.")
    .max(180, "Please keep your email address under 180 characters."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a WhatsApp or telephone number we can reach you on.")
    .max(40, "Please keep this under 40 characters."),
  country: z
    .string()
    .trim()
    .min(2, "Please tell us which country you are in.")
    .max(80),
  occasion: singleChoice(VALUES.occasion).refine((value) => Boolean(value), {
    message: "Please choose the type of occasion.",
  }),
  service: singleChoice(VALUES.service),
  eventDate: isoDate,
  preferredDate: isoDate,
  preferredTime: isoTime,
  method: singleChoice(VALUES.method),
  budget: singleChoice(VALUES.budget),
  inspiration: optionalText(2000),
  policiesAccepted: accepted,
  /** Anti-spam: the form records when it was rendered. */
  renderedAt: z.coerce.number().int().optional(),
  reference: honeypot,
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Please keep your name under 120 characters."),
  email: z.email("Please enter a valid email address.").max(180),
  phone: optionalText(40),
  subject: optionalText(140),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more so we can help.")
    .max(2000, "Please keep your message under 2000 characters."),
  policiesAccepted: accepted,
  renderedAt: z.coerce.number().int().optional(),
  reference: honeypot,
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

/** Turns a Zod error into a field → message map for the form. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
