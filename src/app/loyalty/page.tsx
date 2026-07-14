import type { Metadata } from "next";
import { LoyaltyView } from "@/components/loyalty/loyalty-view";

export function generateMetadata(): Metadata {
  return {
    title: "Loyalty Rewards",
    alternates: { canonical: "/loyalty" },
    description:
      "Join our free loyalty program and earn points on every order — unlock member discounts, birthday rewards, early access, and VIP perks.",
  };
}

export default function Page() {
  return <LoyaltyView />;
}
