import { brand, contact } from "@/content/site";

/**
 * Calendar output for appointment requests.
 *
 * Two audiences share this module:
 *  - the client, who can add the date they asked for to their own calendar;
 *  - the studio, whose calendar can subscribe to a single feed of every
 *    request through `/api/calendar/feed`.
 *
 * Both use standard ICS (RFC 5545), so Google Calendar, Apple Calendar and
 * Outlook all understand it without an integration or an OAuth app.
 *
 * Ghana runs on GMT all year (UTC+0, no daylight saving), so studio wall-clock
 * times are written as UTC stamps. That keeps the files portable: no
 * VTIMEZONE block and no ambiguity for a calendar in another country.
 */

const CRLF = "\r\n";
const PRODID = "-//Magmens Couture//Bookings//EN";
/** Studio times are UTC+0 all year, so a local slot is also its UTC slot. */
const STUDIO_UTC_OFFSET_HOURS = 0;

export type CalendarRecord = {
  id?: string;
  kind: "consultation" | "contact";
  name: string;
  email: string;
  phone?: string;
  country?: string;
  occasion?: string;
  service?: string;
  eventDate?: string;
  preferredDate?: string;
  preferredTime?: string;
  method?: string;
  budget?: string;
  inspiration?: string;
};

export type CalendarEvent = {
  uid: string;
  summary: string;
  description: string;
  location?: string;
  /** ISO `YYYY-MM-DD`, or `YYYY-MM-DDTHH:mm` for a timed event. */
  start: string;
  durationMinutes?: number;
  allDay?: boolean;
  /** Only used for all-day events. */
  endDate?: string;
  status: "TENTATIVE" | "CONFIRMED";
  alarmMinutesBefore?: number;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

const atelierLocation = `${brand.name}, ${contact.address.lines.join(", ")}`;

function occasionLabel(value?: string): string | undefined {
  if (!value) return undefined;
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function describe(record: CalendarRecord, reference?: string): string {
  const lines = [
    reference ? `Reference: ${reference}` : undefined,
    record.occasion ? `Occasion: ${occasionLabel(record.occasion)}` : undefined,
    record.service ? `Collection: ${record.service}` : undefined,
    record.method
      ? `Consultation: ${record.method === "virtual" ? "Video call" : "In person at the atelier"}`
      : undefined,
    record.eventDate ? `Event date: ${record.eventDate}` : undefined,
    record.budget ? `Budget: ${record.budget}` : undefined,
    record.inspiration
      ? `Inspiration: ${record.inspiration.slice(0, 600)}`
      : undefined,
    "",
    "This appointment has not been confirmed. Magmens Couture will contact you directly to confirm availability and the next steps.",
    `Studio: ${contact.phoneDisplay} · ${contact.email}`,
  ];

  return lines.filter((line) => line !== undefined).join("\n");
}

/**
 * Every calendar entry a consultation request produces: the requested
 * consultation slot, and the client's event date when they gave one.
 *
 * Nothing is invented. A request without a preferred date produces no
 * consultation entry, and a request without an event date produces no event.
 */
export function calendarEvents(record: CalendarRecord): CalendarEvent[] {
  if (record.kind !== "consultation") return [];

  const reference = record.id;
  const events: CalendarEvent[] = [];

  if (record.preferredDate && DATE.test(record.preferredDate)) {
    const hasTime = Boolean(record.preferredTime && TIME.test(record.preferredTime));
    events.push({
      uid: `consultation-${reference ?? "request"}@magmenscouture.com`,
      summary: `Consultation request — ${record.name}`,
      description: describe(record, reference),
      location:
        record.method === "virtual"
          ? "Virtual consultation — video call link to follow"
          : atelierLocation,
      start: hasTime
        ? `${record.preferredDate}T${record.preferredTime}`
        : record.preferredDate,
      allDay: !hasTime,
      durationMinutes: 60,
      status: "TENTATIVE",
      alarmMinutesBefore: 120,
    });
  }

  if (record.eventDate && DATE.test(record.eventDate)) {
    events.push({
      uid: `event-${reference ?? "request"}@magmenscouture.com`,
      summary: `Event date — ${record.name}`,
      description: describe(record, reference),
      start: record.eventDate,
      allDay: true,
      status: "TENTATIVE",
    });
  }

  return events;
}

/* -------------------------------------------------------------------------- */
/* ICS serialisation                                                          */
/* -------------------------------------------------------------------------- */

/** RFC 5545 requires these characters to be escaped in text values. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Folds a content line at 75 octets, continuation lines starting with a space. */
function fold(line: string): string {
  if (Buffer.byteLength(line, "utf8") <= 75) return line;

  const parts: string[] = [];
  let current = "";
  for (const character of line) {
    if (Buffer.byteLength(current + character, "utf8") > 74) {
      parts.push(current);
      current = ` ${character}`;
    } else {
      current += character;
    }
  }
  parts.push(current);
  return parts.join(CRLF);
}

function stamp(date: Date): string {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

function parseStart(start: string): Date {
  const [datePart, timePart] = start.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  if (timePart) {
    const [hours, minutes] = timePart.split(":").map(Number);
    return new Date(
      Date.UTC(
        year,
        month - 1,
        day,
        hours - STUDIO_UTC_OFFSET_HOURS,
        minutes,
      ),
    );
  }
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDate(date: Date): string {
  return `${date.toISOString().slice(0, 10).replace(/-/g, "")}`;
}

function formatDateTime(date: Date): string {
  return `${formatDate(date)}T${date.toISOString().slice(11, 16).replace(":", "")}00Z`;
}

function eventLines(event: CalendarEvent, now: Date): string[] {
  const start = parseStart(event.start);
  const end = event.allDay
    ? new Date(start.getTime() + 24 * 60 * 60 * 1000)
    : new Date(start.getTime() + (event.durationMinutes ?? 60) * 60 * 1000);

  const lines = [
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${stamp(now)}`,
    event.allDay
      ? `DTSTART;VALUE=DATE:${formatDate(start)}`
      : `DTSTART:${formatDateTime(start)}`,
    event.allDay
      ? `DTEND;VALUE=DATE:${formatDate(end)}`
      : `DTEND:${formatDateTime(end)}`,
    `SUMMARY:${escapeText(event.summary)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    event.location ? `LOCATION:${escapeText(event.location)}` : undefined,
    "CATEGORIES:Consultation",
    `STATUS:${event.status}`,
    "TRANSP:OPAQUE",
    "SEQUENCE:0",
    `ORGANIZER;CN=${escapeText(brand.name)}:mailto:${contact.email}`,
  ].filter((line): line is string => Boolean(line));

  if (event.alarmMinutesBefore) {
    lines.push(
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(event.summary)}`,
      `TRIGGER:-PT${event.alarmMinutesBefore}M`,
      "END:VALARM",
    );
  }

  lines.push("END:VEVENT");
  return lines;
}

/** Serialises events into one subscribable/downloadable calendar. */
export function buildCalendar(
  events: CalendarEvent[],
  { calendarName }: { calendarName: string },
): string {
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${PRODID}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    "X-WR-TIMEZONE:Africa/Accra",
    "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
    "X-PUBLISHED-TTL:PT1H",
    ...events.flatMap((event) => eventLines(event, now)),
    "END:VCALENDAR",
  ];

  return `${lines.map(fold).join(CRLF)}${CRLF}`;
}
