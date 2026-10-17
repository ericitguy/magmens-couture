/**
 * Renders structured data as a JSON-LD script tag.
 *
 * Data is generated from typed content modules only — never from user input —
 * so serialising it inline is safe.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
