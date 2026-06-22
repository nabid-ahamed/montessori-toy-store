"use client";

import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

/**
 * Count bubble for the cart icon. Renders nothing until the cart is hydrated
 * from storage or when the cart is empty, so there's no SSR "0" flash.
 */
export function CartBadge({ className }: { className?: string }) {
  const { count, hydrated } = useCart();
  if (!hydrated || count === 0) return null;

  return (
    <span
      className={cn(
        "flex min-w-4 items-center justify-center rounded-full bg-neem px-1 text-[10px] font-semibold text-paper",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
