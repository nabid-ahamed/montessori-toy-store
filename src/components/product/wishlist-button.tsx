"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist/wishlist-context";
import { cn } from "@/lib/utils";

/**
 * Wishlist toggle for a product card. Backed by the WishlistProvider so the
 * saved state is shared with the header badge and the /wishlist page, and
 * persists across reloads. Kept as a tiny client island so ProductCard stays a
 * server component.
 */
export function WishlistButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(slug);

  const onClick = (e: React.MouseEvent) => {
    // The card is wrapped in links — don't navigate when toggling the heart.
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex size-11 items-center justify-center rounded-full bg-paper/90 text-ink-soft shadow-sm backdrop-blur-sm transition-colors hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neem sm:size-10",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-[18px] transition-all",
          active && "fill-terracotta text-terracotta",
        )}
      />
    </button>
  );
}
