"use client";

import { StickyNote } from "lucide-react";

/**
 * Order notes — an optional free-text field for delivery instructions or special
 * requests. Controlled via `value` / `onChange`; UI only (nothing is persisted).
 */
export function OrderNotes({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-card p-5 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
        <StickyNote className="size-5 text-neem-deep" />
        Order Notes
        <span className="ml-1 text-xs font-medium text-ink-soft">Optional</span>
      </h2>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder="Add delivery instructions or any special requests."
        className="mt-4 w-full resize-none rounded-lg border border-cream-300 bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus-visible:border-neem focus-visible:ring-2 focus-visible:ring-neem/25"
      />
    </div>
  );
}
