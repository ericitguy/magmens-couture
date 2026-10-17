/**
 * Prints recent enquiry submissions from the local file store.
 *
 *   npm run enquiries            (20 most recent)
 *   npm run enquiries -- 50      (50 most recent)
 *
 * When DATABASE_URL is set, records live in the database instead — read them
 * through the studio admin view at /admin/enquiries?token=...
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "enquiries.jsonl");
const limit = Number(process.argv[2] ?? 20);

if (process.env.DATABASE_URL) {
  console.log(
    "DATABASE_URL is set, so enquiries are stored in the database.\n" +
      "Open the studio admin view instead: /admin/enquiries?token=ADMIN_ACCESS_TOKEN",
  );
  process.exit(0);
}

try {
  const contents = await readFile(FILE, "utf8");
  const records = contents
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line))
    .slice(-limit)
    .reverse();

  if (records.length === 0) {
    console.log("No enquiries have been recorded yet.");
    process.exit(0);
  }

  for (const record of records) {
    console.log("─".repeat(72));
    console.log(
      `${record.kind === "consultation" ? "CONSULTATION" : "CONTACT"}  ·  ${record.createdAt}  ·  ${record.id}`,
    );
    console.log(`${record.name} <${record.email}>${record.phone ? `  ${record.phone}` : ""}`);
    const details = [
      ["Country", record.country],
      ["Occasion", record.occasion],
      ["Collection", record.service],
      ["Event date", record.eventDate],
      ["Preferred", [record.preferredDate, record.preferredTime].filter(Boolean).join(" ")],
      ["Method", record.method],
      ["Budget", record.budget],
      ["Subject", record.subject],
      ["Image", record.image?.path],
    ].filter(([, value]) => Boolean(value));
    for (const [label, value] of details) console.log(`  ${label}: ${value}`);
    if (record.message) console.log(`  Message: ${record.message}`);
    if (record.inspiration) console.log(`  Inspiration: ${record.inspiration}`);
  }

  console.log("─".repeat(72));
  console.log(`${records.length} shown of the most recent ${limit}.`);
} catch (error) {
  if (error.code === "ENOENT") {
    console.log("No enquiries have been recorded yet.");
    process.exit(0);
  }
  throw error;
}
