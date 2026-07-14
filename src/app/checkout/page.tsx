import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your details, choose delivery, and place your order.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CheckoutView />;
}
