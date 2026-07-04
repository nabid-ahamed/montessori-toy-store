"use client";

import { useEffect, useState } from "react";
import { Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartAddedPopup } from "@/components/cart/cart-added-popup";
import { useCart } from "@/lib/cart/cart-context";
import { giftCardAmounts } from "@/lib/mock/gifts";
import { formatTk } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Gift card block: pick a preset amount, add the matching denomination product
 * (gift-card-<amount>) to the real cart. The add locks per denomination via the
 * existing cart membership check; picking another amount re-enables it.
 */
export function GiftCardBlock() {
  const { items, addItem } = useCart();
  const [selected, setSelected] = useState<number>(1000);
  const [showAdded, setShowAdded] = useState(false);
  const slug = `gift-card-${selected}`;
  const inCart = items.some((it) => it.product.slug === slug);

  // Auto-dismiss the "Added to Cart" confirmation, matching the product cards.
  useEffect(() => {
    if (!showAdded) return;
    const timeout = window.setTimeout(() => setShowAdded(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [showAdded]);

  const onAdd = () => {
    if (inCart) return; // locked once this denomination is in the cart
    addItem(slug);
    setShowAdded(true);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-cream-300 bg-card">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        {/* copy */}
        <div className="max-w-sm">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-neem-deep">
            <Gift className="size-4" />
            Gift Card
          </span>
          <h2 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">
            Not sure what to pick?
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Send a gift card and let them choose. Delivered by email.
          </p>
        </div>

        {/* amount + add */}
        <div className="sm:text-right">
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {giftCardAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelected(amount)}
                aria-pressed={selected === amount}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  selected === amount
                    ? "border-neem bg-neem text-paper"
                    : "border-cream-300 text-ink hover:border-neem",
                )}
              >
                {formatTk(amount)}
              </button>
            ))}
          </div>
          <Button
            onClick={onAdd}
            disabled={inCart}
            className={cn(
              "mt-4 w-full sm:w-auto",
              inCart && "bg-neem-deep disabled:opacity-100",
            )}
          >
            {inCart ? <Check className="size-4" /> : null}
            {inCart ? "Added" : "Add to cart"}
          </Button>
        </div>
      </div>

      {showAdded ? (
        <CartAddedPopup
          title={`Gift Card — ${formatTk(selected)}`}
          onClose={() => setShowAdded(false)}
        />
      ) : null}
    </section>
  );
}
