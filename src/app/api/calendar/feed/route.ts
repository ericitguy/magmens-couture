import { timingSafeEqual } from "node:crypto";
import { buildCalendar, calendarEvents } from "@/lib/calendar";
import { listEnquiries } from "@/lib/enquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A single calendar the studio can subscribe to once, in Google Calendar,
 * Apple Calendar or Outlook. Every consultation request then appears in it
 * automatically — no app, no OAuth consent, no per-booking email.
 *
 * Protected by CALENDAR_FEED_TOKEN. Without a token, or with the wrong one,
 * the route responds as if it does not exist: a calendar of real clients must
 * never be readable by guessing a URL.
 */
export async function GET(request: Request) {
  const expected = process.env.CALENDAR_FEED_TOKEN?.trim();
  if (!expected) return notFound();

  const provided = new URL(request.url).searchParams.get("token")?.trim();
  if (!provided || !safeEqual(provided, expected)) return notFound();

  const enquiries = await listEnquiries(500);
  const events = enquiries.flatMap((enquiry) => calendarEvents(enquiry));

  const body = buildCalendar(events, {
    calendarName: "Magmens Couture — consultation requests",
  });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="magmens-bookings.ics"',
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

/** Constant-time comparison so the feed token cannot be probed. */
function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}
