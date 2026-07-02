/**
 * Frontend-only "recently viewed" history, stored in the browser's localStorage
 * (no backend, no login). Records product slugs most-recent-first, de-duplicated
 * and capped. All functions are SSR-safe — they no-op / return [] on the server.
 */

const STORAGE_KEY = "recently-viewed";
const MAX_ITEMS = 12;

/** Read the stored slugs, most-recent-first. Returns [] on the server or on error. */
export function readRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === "string");
  } catch {
    return [];
  }
}

/** Record a viewed product: move it to the front, de-dupe, and cap the list. */
export function recordView(slug: string): void {
  if (typeof window === "undefined" || !slug) return;
  try {
    const next = [slug, ...readRecentlyViewed().filter((s) => s !== slug)].slice(
      0,
      MAX_ITEMS,
    );
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full / disabled — history is a nice-to-have, so fail silently.
  }
}
