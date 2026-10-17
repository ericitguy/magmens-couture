import { buildCalendar, calendarEvents } from "@/lib/calendar";
import { getEnquiry } from "@/lib/enquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * The calendar entry for one request, addressed by the reference the client was
 * given. The id is a random UUID, so it acts as the capability: nothing is
 * listed, and nothing can be read without the reference from that submission.
 *
 * A request with no preferred date has nothing to schedule and returns 404
 * rather than an empty calendar.
 */
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const enquiry = await getEnquiry(id);

  if (!enquiry) {
    return new Response("Not found", { status: 404 });
  }

  const events = calendarEvents(enquiry);

  if (events.length === 0) {
    return new Response("This request has no date to add to a calendar.", {
      status: 404,
    });
  }

  const body = buildCalendar(events, {
    calendarName: "Magmens Couture — consultation request",
  });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="magmens-consultation.ics"',
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
