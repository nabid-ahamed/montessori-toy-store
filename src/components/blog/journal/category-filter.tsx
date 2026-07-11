"use client";

import { blogCategories } from "@/lib/mock/blog";
import { cn } from "@/lib/utils";

/**
 * Category chip bar: All + the blog categories. Controlled — the parent owns the
 * active slug and does the filtering, so this stays a pure presentational toggle.
 */
export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  const chips = [{ slug: "all", name: "All" }, ...blogCategories];

  return (
    <div
      role="group"
      aria-label="Filter posts by category"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {chips.map((chip) => {
        const selected = active === chip.slug;
        return (
          <button
            key={chip.slug}
            type="button"
            onClick={() => onChange(chip.slug)}
            aria-pressed={selected}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
              selected
                ? "border-neem bg-neem text-paper"
                : "border-cream-300 text-ink-muted hover:border-neem hover:text-ink",
            )}
          >
            {chip.name}
          </button>
        );
      })}
    </div>
  );
}
