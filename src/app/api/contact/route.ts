import { handleEnquiry } from "@/lib/submit-enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** General website enquiries. */
export async function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "contact",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
}
