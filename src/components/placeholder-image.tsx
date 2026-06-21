import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

// Static class map so Tailwind v4 detects every utility at build time.
// (Dynamic `bg-${tone}` strings would NOT be picked up.)
const toneClass: Record<Tone, string> = {
  cream: "bg-cream-200 text-ink-muted",
  neem: "bg-neem text-paper",
  "neem-soft": "bg-neem-soft text-neem-deep",
  wood: "bg-wood-light text-ink",
  terracotta: "bg-terracotta text-ink",
  mustard: "bg-mustard text-ink",
  "dusty-blue": "bg-dusty-blue text-ink",
  blush: "bg-blush text-ink",
};

type Props = {
  tone?: Tone;
  label?: string;
  className?: string;
};

/**
 * Original placeholder surface — a toned block with an optional label.
 * Stands in for real product/banner photography (no third-party assets).
 */
export function PlaceholderImage({ tone = "cream", label, className }: Props) {
  return (
    <div
      role="img"
      aria-label={label ? `${label} (placeholder)` : "placeholder"}
      className={cn(
        "flex select-none items-center justify-center overflow-hidden",
        toneClass[tone],
        className,
      )}
    >
      {label ? (
        <span className="px-3 text-center font-display text-sm font-semibold opacity-80">
          {label}
        </span>
      ) : null}
    </div>
  );
}
