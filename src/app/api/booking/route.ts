import { handleEnquiry } from "@/lib/submit-enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Consultation requests. Stored server-side, never treated as a confirmed
 * appointment: the studio reviews each request and confirms directly.
 */
export async function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "consultation",
    limit: 6,
    windowMs: 15 * 60 * 1000,
  });
}
