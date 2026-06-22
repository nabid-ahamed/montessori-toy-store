"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

/**
 * Adds a product to the cart and shows a brief "Added" confirmation. Kept as a
 * tiny client island so the surrounding ProductCard can stay a server component.
 */
export function AddToCartButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = () => {
    addItem(slug);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Button
      size="sm"
      onClick={onClick}
      aria-label="Add to cart"
      className={cn(added && "bg-neem-deep", className)}
    >
      {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
      <span className="sr-only sm:not-sr-only">{added ? "Added" : "Add"}</span>
    </Button>
  );
}
