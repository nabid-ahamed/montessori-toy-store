import type { BlogBlock } from "@/lib/types";

/** Stable anchor id for a section heading (used by the table of contents). */
export const headingId = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Render a post body (typed blocks) as readable prose. No markdown library. */
export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="mt-8 space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              id={headingId(block.text)}
              className="scroll-mt-32 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-5 text-ink-muted marker:text-neem"
            >
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="break-words leading-relaxed text-ink-muted">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
