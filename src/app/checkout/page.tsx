import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";
import { BRAND_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Checkout — ${BRAND_NAME}`,
  description: "Review your details, choose delivery, and place your order.",
};

export default function Page() {
  return <CheckoutView />;
}
