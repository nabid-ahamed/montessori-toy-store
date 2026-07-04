"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Check,
  Gift,
  ShieldCheck,
  StickyNote,
  Ticket,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const GIFT_MESSAGE_MAX = 200;

// Demo-only coupon table (frontend state only — no backend/validation).
const DEMO_COUPONS: Record<string, string> = {
  TOY10: "10% off",
  WELCOME: "৳100 off",
  NEEM15: "15% off",
};

// Shared field styling so textareas match the app's Input component.
const fieldClass =
  "w-full rounded-lg border border-cream-300 bg-paper px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus-visible:border-neem focus-visible:ring-2 focus-visible:ring-neem/25";

/** A titled block inside the Order Options card (icon + heading + content). */
function OptionSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 flex-none items-center justify-center rounded-full bg-neem/10 text-neem-deep">
          <Icon className="size-4" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-ink">{title}</h3>
          {description ? (
            <p className="text-xs text-ink-soft">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Reusable selectable row backed by a native radio input. */
function RadioRow({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  disabled,
  badge,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  badge?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
        disabled
          ? "cursor-not-allowed border-cream-300 bg-cream-100/50 opacity-70"
          : checked
            ? "border-neem bg-neem/5"
            : "border-cream-300 hover:border-neem-soft",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="mt-0.5 size-4 flex-none accent-neem"
      />
      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">{label}</span>
          {badge ? (
            <span className="rounded-full bg-cream-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
              {badge}
            </span>
          ) : null}
        </span>
        {description ? (
          <span className="mt-0.5 block text-xs text-ink-soft">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

/** Reusable checkbox row backed by a native checkbox input. */
function CheckboxRow({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 flex-none accent-neem"
      />
      <span className="text-sm text-ink">{children}</span>
    </label>
  );
}

type CouponStatus = { type: "idle" | "success" | "error"; message: string };

/**
 * Cart "Order Options" — delivery method, gift options, coupon, order notes,
 * reward points and Terms agreement. Frontend only: every value lives in local
 * React state, so it persists while the shopper stays on the Cart page. The
 * Terms checkbox is lifted to the parent (via props) so it can gate Checkout.
 */
export function OrderOptions({
  isLoggedIn = false,
  rewardPoints = 0,
  agreedToTerms,
  onAgreedToTermsChange,
}: {
  /** Mock auth flag — controls the reward-points message. */
  isLoggedIn?: boolean;
  /** Points shown when logged in. */
  rewardPoints?: number;
  /** Terms agreement (owned by the cart so it can disable Checkout). */
  agreedToTerms: boolean;
  onAgreedToTermsChange: (value: boolean) => void;
}) {
  const [delivery, setDelivery] = useState<"home" | "pickup">("home");
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState<CouponStatus>({
    type: "idle",
    message: "",
  });
  const [notes, setNotes] = useState("");

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setCouponStatus({ type: "error", message: "Please enter a coupon code." });
      return;
    }
    if (DEMO_COUPONS[code]) {
      setCouponStatus({
        type: "success",
        message: `Coupon applied — ${DEMO_COUPONS[code]} (demo).`,
      });
    } else {
      setCouponStatus({
        type: "error",
        message: "Invalid or expired coupon code.",
      });
    }
  };

  return (
    <div className="rounded-xl border border-cream-300 bg-card p-5 sm:p-6">
      <h2 className="font-display text-lg font-bold text-ink">Order Options</h2>

      <div className="mt-5 space-y-5">
        {/* 1. Delivery method */}
        <OptionSection icon={Truck} title="Delivery Method">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <RadioRow
              name="delivery"
              value="home"
              checked={delivery === "home"}
              onChange={() => setDelivery("home")}
              label="Home Delivery"
              description="Delivered to your doorstep"
            />
            <RadioRow
              name="delivery"
              value="pickup"
              checked={delivery === "pickup"}
              onChange={() => setDelivery("pickup")}
              label="Store Pickup"
              description="Not available in your area yet"
              badge="Soon"
              disabled
            />
          </div>
        </OptionSection>

        <div className="h-px bg-cream-200" />

        {/* 2. Gift options */}
        <OptionSection icon={Gift} title="Gift Options">
          <CheckboxRow checked={isGift} onChange={setIsGift}>
            This is a gift
          </CheckboxRow>
          {isGift ? (
            <div className="mt-3">
              <textarea
                value={giftMessage}
                onChange={(e) =>
                  setGiftMessage(e.target.value.slice(0, GIFT_MESSAGE_MAX))
                }
                maxLength={GIFT_MESSAGE_MAX}
                rows={3}
                placeholder="Write a short gift message…"
                className={fieldClass}
              />
              <p className="mt-1 text-right text-xs text-ink-soft">
                {giftMessage.length}/{GIFT_MESSAGE_MAX}
              </p>
            </div>
          ) : null}
        </OptionSection>

        <div className="h-px bg-cream-200" />

        {/* 3. Coupon code */}
        <OptionSection icon={Ticket} title="Coupon Code">
          <form onSubmit={applyCoupon} className="flex items-center gap-2">
            <Input
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
                if (couponStatus.type !== "idle") {
                  setCouponStatus({ type: "idle", message: "" });
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
        </OptionSection>

        <div className="h-px bg-cream-200" />

        {/* 4. Order notes */}
        <OptionSection icon={StickyNote} title="Order Notes" description="Optional">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Add delivery instructions or any special requests."
            className={fieldClass}
          />
        </OptionSection>

        <div className="h-px bg-cream-200" />

        {/* 5. Reward points */}
        <OptionSection icon={Award} title="Reward Points">
          {isLoggedIn ? (
            <div className="flex items-center justify-between rounded-lg border border-neem/20 bg-neem/5 p-3">
              <span className="text-sm text-ink">Available reward points</span>
              <span className="font-display text-lg font-bold text-neem-deep">
                {rewardPoints.toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="rounded-lg border border-cream-300 bg-cream-100/60 p-3">
              <p className="text-sm text-ink-muted">
                Sign in to earn and redeem reward points on every order.
              </p>
              <Link
                href="/signin"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-neem-deep hover:underline"
              >
                Sign in to continue →
              </Link>
            </div>
          )}
        </OptionSection>

        <div className="h-px bg-cream-200" />

        {/* 6. Terms & Conditions */}
        <OptionSection icon={ShieldCheck} title="Terms & Conditions">
          <CheckboxRow checked={agreedToTerms} onChange={onAgreedToTermsChange}>
            I agree to the{" "}
            <Link
              href="/policy/terms"
              className="font-medium text-neem-deep hover:underline"
            >
              Terms &amp; Conditions
            </Link>
            .
          </CheckboxRow>
        </OptionSection>
      </div>
    </div>
  );
}
