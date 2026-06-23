"use client";

import { useWishlist } from "@/lib/wishlist/wishlist-context";
import { cn } from "@/lib/utils";

/**
 * Count bubble for the wishlist icon. Renders nothing until hydrated or when
 * empty, so there's no SSR "0" flash.
 */
export function WishlistBadge({ className }: { className?: string }) {
  const { count, hydrated } = useWishlist();
  if (!hydrated || count === 0) return null;

  return (
    <span
      className={cn(
        "flex min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-paper",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
