import { cn } from "@/lib/utils";

/**
 * The one uniform frame for product imagery across the whole site. It fixes the
 * presentation so every product renders identically regardless of the source
 * photo:
 *   - a fixed 1:1 aspect ratio (via `aspect-square`, never fixed px)
 *   - a single warm off-white surface (`bg-frame`, #F7F4EF) that normalises
 *     mismatched photo backgrounds
 *   - the site card radius (`rounded-xl`)
 *   - one soft, single-direction shadow (`shadow-frame`) that lifts gently on
 *     hover of the nearest `group`
 *
 * Wrap one or more <ProductImage>s (or any overlay) inside it. Sizing is left to
 * the caller via `className` (e.g. width / `rounded-t-xl`).
 */
export function ProductFrame({
  className,
  children,
  interactive = true,
}: {
  className?: string;
  children: React.ReactNode;
  /** Enable the hover shadow-lift (default). Disable for static contexts. */
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-xl bg-frame shadow-frame",
        interactive &&
          "transition-shadow duration-[350ms] ease-out group-hover:shadow-frame-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
