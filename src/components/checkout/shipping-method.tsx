import { Check, Truck } from "lucide-react";
import { formatTk } from "@/lib/format";
import { cn } from "@/lib/utils";
import { shippingOptions } from "@/lib/mock/checkout";

/**
 * Shipping-method picker — selectable radio cards. Controlled via `value` /
 * `onChange`; UI only (nothing is persisted).
 */
export function ShippingMethod({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-cream-300 bg-card p-5 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
        <Truck className="size-5 text-neem-deep" />
        Shipping Method
      </h2>

      <div className="mt-4 grid gap-3">
        {shippingOptions.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={selected}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                selected
                  ? "border-neem bg-neem/5 ring-1 ring-neem"
                  : "border-cream-300 hover:border-neem-soft",
              )}
            >
              <span
                className={cn(
                  "flex size-5 flex-none items-center justify-center rounded-full border transition-colors",
                  selected ? "border-neem bg-neem text-paper" : "border-cream-300",
                )}
              >
                {selected ? <Check className="size-3" strokeWidth={3} /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{option.label}</p>
                <p className="text-xs text-ink-soft">
                  {option.desc} · {option.eta}
                </p>
              </div>
              <span className="text-sm font-bold text-ink">
                {option.price === 0 ? "Free" : formatTk(option.price)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
