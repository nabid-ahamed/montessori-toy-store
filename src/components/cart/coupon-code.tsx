"use client";

import { useState } from "react";
import { Check, Ticket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Demo coupon table (frontend only — no backend/validation). Each entry knows
// how to compute its discount off the current subtotal, so the Order Summary
// total reflects it. `label` is what we echo back on a successful apply.
type Coupon = { label: string; discount: (subtotal: number) => number };

const DEMO_COUPONS: Record<string, Coupon> = {
  TOYTUNI: { label: "৳150 off", discount: () => 150 },
  WELCOME: { label: "৳100 off", discount: () => 100 },
  TOY10: { label: "10% off", discount: (s) => Math.round(s * 0.1) },
  NEEM15: { label: "15% off", discount: (s) => Math.round(s * 0.15) },
};

type CouponStatus = { type: "idle" | "success" | "error"; message: string };

/**
 * Coupon-code entry. Frontend only: the code lives in local state and is checked
 * against a demo table. Rendered as a compact, borderless block inside the Order
 * Summary (between Shipping and the Total) so shoppers can apply a code right
 * before reviewing their total. A successful apply reports the resolved discount
 * (capped at the subtotal) to the parent via `onDiscountChange`.
 */
export function CouponCode({
  subtotal,
  onDiscountChange,
}: {
  /** Current selected subtotal — percentage coupons compute against it. */
  subtotal: number;
  /** Report the applied discount (0 when cleared/invalid) to the cart. */
  onDiscountChange: (discount: number) => void;
}) {
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<CouponStatus>({
    type: "idle",
    message: "",
  });

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (!code) {
      onDiscountChange(0);
      setCouponStatus({ type: "error", message: "Please enter a coupon code." });
      return;
    }
    const match = DEMO_COUPONS[code];
    if (match) {
      // Never discount below zero.
      const value = Math.min(match.discount(subtotal), subtotal);
      onDiscountChange(value);
      setCouponStatus({
        type: "success",
        message: `Coupon applied — ${match.label}.`,
      });
    } else {
      onDiscountChange(0);
      setCouponStatus({
        type: "error",
        message: "Invalid or expired coupon code.",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1.5 text-ink-muted">
        <Ticket className="size-4 text-neem-deep" />
        <span className="text-sm font-medium">Coupon Code</span>
      </div>

      <form onSubmit={applyCoupon} className="mt-2 flex items-center gap-2">
        <Input
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            if (couponStatus.type !== "idle") {
              setCouponStatus({ type: "idle", message: "" });
              onDiscountChange(0);
            }
          }}
          placeholder="Enter coupon code"
          aria-label="Coupon code"
          className="h-10 flex-1"
        />
        <Button type="submit" className="h-10 shrink-0" disabled={!coupon.trim()}>
          Apply
        </Button>
      </form>
      {couponStatus.type !== "idle" ? (
        <p
          className={cn(
            "mt-2 flex items-center gap-1.5 text-xs font-medium",
            couponStatus.type === "success" ? "text-neem-deep" : "text-danger",
          )}
        >
          {couponStatus.type === "success" ? (
            <Check className="size-3.5" />
          ) : (
            <X className="size-3.5" />
          )}
          {couponStatus.message}
        </p>
      ) : null}
    </div>
  );
}
