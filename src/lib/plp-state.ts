import type { Filters, SortKey } from "@/lib/collection";

/**
 * Remembered product-listing state (sort / filters / view / pagination), kept so
 * navigating away from a PLP and back restores exactly what the shopper set.
 * Keyed by collection identity, so different categories never share filters.
 *
 * In-memory (module scope) on purpose: it survives client-side navigation but
 * resets on a full page reload, and is never read during SSR (empty on the
 * server), so it can't cause a hydration mismatch.
 */
export type PlpSnapshot = {
  sort: SortKey;
  filters: Filters;
  pageSize: number;
  view: "grid" | "list";
  visibleCount: number;
};

const cache = new Map<string, PlpSnapshot>();

export function getPlpState(key: string): PlpSnapshot | undefined {
  return cache.get(key);
}

export function setPlpState(key: string, snapshot: PlpSnapshot): void {
  cache.set(key, snapshot);
}

/** Forget every collection's remembered state — used by the logo "reset all". */
export function clearPlpState(): void {
  cache.clear();
}
