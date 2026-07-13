import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Rounded numbered pagination for the blog grid. Hidden entirely when there is
 * only one page. Controlled by the parent (page is 1-based).
 */
export function BlogPagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;

  const btnBase =
    "flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav aria-label="Blog pages" className="flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(btnBase, "border-cream-300 bg-paper text-ink-muted hover:border-neem-soft hover:text-ink")}
      >
        <ChevronLeft className="size-4" />
      </button>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
          onClick={() => onPageChange(n)}
          className={cn(
            btnBase,
            n === page
              ? "border-neem bg-neem font-semibold text-paper"
              : "border-cream-300 bg-paper text-ink-muted hover:border-neem-soft hover:text-ink",
          )}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className={cn(btnBase, "border-cream-300 bg-paper text-ink-muted hover:border-neem-soft hover:text-ink")}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
