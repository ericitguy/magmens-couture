import { randomUUID } from "node:crypto";
import { mkdir, appendFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Enquiry storage.
 *
 * When DATABASE_URL is set (Neon serverless Postgres — see README.md) records
 * are written to a single `enquiries` table whose schema is created on first
 * use. When it is not set, records are appended to a local JSON Lines file
 * under ./data so the forms are fully functional on a developer machine or any
 * Node host with a writable disk.
 *
 * Nothing here trusts the client: every field is validated before it reaches
 * this layer, and all SQL values are passed as bound parameters.
 */

export type EnquiryKind = "consultation" | "contact";
export type EnquiryStatus = "pending_confirmation" | "confirmed" | "closed";

export type EnquiryImage = {
  filename: string;
  contentType: string;
  bytes: number;
  /** Base64 payload when stored inline, or a path when stored on disk. */
  data?: string;
  path?: string;
};

export type NewEnquiry = {
  kind: EnquiryKind;
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
  subject?: string;
  message?: string;
  inspiration?: string;
  image?: EnquiryImage;
  userAgent?: string;
  clientKey?: string;
};

export type StoredEnquiry = Omit<NewEnquiry, "image"> & {
  id: string;
  status: EnquiryStatus;
  createdAt: string;
  hasImage: boolean;
};

export type SaveResult = {
  id: string;
  backend: "postgres" | "file";
};

const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRY_FILE = path.join(DATA_DIR, "enquiries.jsonl");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

function databaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL?.trim();
  return url ? url : undefined;
}

export function storageBackend(): "postgres" | "file" {
  return databaseUrl() ? "postgres" : "file";
}

/* -------------------------------------------------------------------------- */
/* Postgres (Neon serverless driver)                                           */
/* -------------------------------------------------------------------------- */

let schemaReady: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(databaseUrl()!);

      await sql`
        create table if not exists enquiries (
          id text primary key,
          kind text not null,
          status text not null default 'pending_confirmation',
          created_at timestamptz not null default now(),
          name text not null,
          email text not null,
          phone text,
          country text,
          occasion text,
          service text,
          event_date text,
          preferred_date text,
          preferred_time text,
          method text,
          budget text,
          subject text,
          message text,
          inspiration text,
          image_filename text,
          image_content_type text,
          image_base64 text,
          user_agent text,
          client_key text
        )
      `;

      await sql`
        create index if not exists enquiries_created_at_idx
        on enquiries (created_at desc)
      `;
    })().catch((error) => {
      // Let the next request try again rather than caching the failure.
      schemaReady = null;
      throw error;
    });
  }

  return schemaReady;
}

/* -------------------------------------------------------------------------- */
/* Public API                                                                  */
/* -------------------------------------------------------------------------- */

export async function saveEnquiry(record: NewEnquiry): Promise<SaveResult> {
  const id = randomUUID();

  if (storageBackend() === "postgres") {
    const { neon } = await import("@neondatabase/serverless");
    await ensureSchema();
    const sql = neon(databaseUrl()!);

    await sql`
      insert into enquiries (
        id, kind, name, email, phone, country, occasion, service, event_date,
        preferred_date, preferred_time, method, budget, subject, message,
        inspiration, image_filename, image_content_type, image_base64,
        user_agent, client_key
      ) values (
        ${id}, ${record.kind}, ${record.name}, ${record.email},
        ${record.phone ?? null}, ${record.country ?? null},
        ${record.occasion ?? null}, ${record.service ?? null},
        ${record.eventDate ?? null}, ${record.preferredDate ?? null},
        ${record.preferredTime ?? null}, ${record.method ?? null},
        ${record.budget ?? null}, ${record.subject ?? null},
        ${record.message ?? null}, ${record.inspiration ?? null},
        ${record.image?.filename ?? null},
        ${record.image?.contentType ?? null},
        ${record.image?.data ?? null},
        ${record.userAgent ?? null}, ${record.clientKey ?? null}
      )
    `;

    return { id, backend: "postgres" };
  }

  await mkdir(DATA_DIR, { recursive: true });

  let imagePath: string | undefined;
  if (record.image?.data) {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const safeName = record.image.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    imagePath = path.join(UPLOAD_DIR, `${id}-${safeName}`);
    await writeFile(imagePath, Buffer.from(record.image.data, "base64"));
  }

  const line = JSON.stringify({
    ...record,
    image: record.image
      ? {
          filename: record.image.filename,
          contentType: record.image.contentType,
          bytes: record.image.bytes,
          path: imagePath,
        }
      : undefined,
    id,
    status: "pending_confirmation" satisfies EnquiryStatus,
    createdAt: new Date().toISOString(),
  });

  await appendFile(ENQUIRY_FILE, `${line}\n`, "utf8");

  return { id, backend: "file" };
}

/** Most recent enquiries first. Used by the studio's admin view. */
export async function listEnquiries(limit = 100): Promise<StoredEnquiry[]> {
  if (storageBackend() === "postgres") {
    const { neon } = await import("@neondatabase/serverless");
    await ensureSchema();
    const sql = neon(databaseUrl()!);

    const rows = (await sql`
      select id, kind, status, created_at, name, email, phone, country,
             occasion, service, event_date, preferred_date, preferred_time,
             method, budget, subject, message, inspiration,
             image_filename is not null as has_image
      from enquiries
      order by created_at desc
      limit ${limit}
    `) as Record<string, unknown>[];

    return rows.map(mapRow);
  }

  try {
    const contents = await readFile(ENQUIRY_FILE, "utf8");
    return contents
      .split("\n")
      .filter(Boolean)
      .slice(-limit)
      .reverse()
      .map((line) => {
        const parsed = JSON.parse(line) as Record<string, unknown>;
        return mapRow({
          ...parsed,
          created_at: parsed.createdAt,
          has_image: Boolean(parsed.image),
        });
      });
  } catch {
    return [];
  }
}

/**
 * One request by its reference. Used to build a calendar entry for a client
 * who has just submitted a request, so only the id they were given can reach
 * their own record.
 */
export async function getEnquiry(
  id: string,
): Promise<StoredEnquiry | undefined> {
  // Ids are UUIDs; anything else cannot match and is rejected before a lookup.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return undefined;
  }

  if (storageBackend() === "postgres") {
    const { neon } = await import("@neondatabase/serverless");
    await ensureSchema();
    const sql = neon(databaseUrl()!);

    const rows = (await sql`
      select id, kind, status, created_at, name, email, phone, country,
             occasion, service, event_date, preferred_date, preferred_time,
             method, budget, subject, message, inspiration,
             image_filename is not null as has_image
      from enquiries
      where id = ${id}
      limit 1
    `) as Record<string, unknown>[];

    return rows[0] ? mapRow(rows[0]) : undefined;
  }

  try {
    const contents = await readFile(ENQUIRY_FILE, "utf8");
    for (const line of contents.split("\n")) {
      if (!line.includes(id)) continue;
      const parsed = JSON.parse(line) as Record<string, unknown>;
      if (parsed.id === id) {
        return mapRow({
          ...parsed,
          created_at: parsed.createdAt,
          has_image: Boolean(parsed.image),
        });
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function mapRow(row: Record<string, unknown>): StoredEnquiry {
  /**
   * Postgres returns snake_case columns; the file store keeps the camelCase
   * field names it wrote. Both have to read correctly, or a locally stored
   * record silently loses its dates.
   */
  const text = (...keys: string[]): string | undefined => {
    for (const key of keys) {
      const value = row[key];
      if (typeof value === "string" && value.length > 0) return value;
    }
    return undefined;
  };

  const createdAt = row.created_at ?? row.createdAt;
  return {
    id: String(row.id),
    kind: row.kind as EnquiryKind,
    status: (row.status as EnquiryStatus) ?? "pending_confirmation",
    createdAt:
      createdAt instanceof Date
        ? createdAt.toISOString()
        : String(createdAt ?? ""),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    phone: text("phone"),
    country: text("country"),
    occasion: text("occasion"),
    service: text("service"),
    eventDate: text("event_date", "eventDate"),
    preferredDate: text("preferred_date", "preferredDate"),
    preferredTime: text("preferred_time", "preferredTime"),
    method: text("method"),
    budget: text("budget"),
    subject: text("subject"),
    message: text("message"),
    inspiration: text("inspiration"),
    hasImage: Boolean(row.has_image),
  };
}
