/** A single JSON-LD node (a schema.org object with @context/@type). */
export type JsonLdData = Record<string, unknown>;

/**
 * Renders a JSON-LD <script> for structured data. Server-safe. The `<` escape
 * prevents a `</script>` sequence inside the data from breaking out of the tag.
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
