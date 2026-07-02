/**
 * Small, reusable helpers for collection pages (Best Sellers, Neem Wood, …).
 * Frontend only — swap for real product fields when the backend is connected.
 */

import { productDetailBySlug } from "@/lib/mock/products";

/** Short one-line description (first sentence of a product's detail copy). */
export function shortDescription(slug: string): string {
  const desc = productDetailBySlug(slug)?.description ?? "";
  return desc.split(/(?<=\.)\s/)[0] || "A handcrafted neem-wood favourite.";
}

// Stock is mock for now — every product is in stock. A backend flag can replace
// this later. (Kept as a set so out-of-stock demos are one line.)
const OUT_OF_STOCK = new Set<string>();
export function isInStock(slug: string): boolean {
  return !OUT_OF_STOCK.has(slug);
}
