import { existsSync } from "node:fs";
import { join } from "node:path";

// Server-only (uses node:fs) — import only from Server Components / metadata.
// The product image system probes extensions at runtime; for OG/JSON-LD we need
// a concrete, existing URL, so resolve the first file that actually exists.
const EXTS = ["webp", "png", "jpg", "jpeg", "gif"] as const;

/** Root-relative URL of a product's primary image, or null if none exists. */
export function productImagePath(slug: string): string | null {
  for (const ext of EXTS) {
    const rel = `images/products/${slug}/1.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}
