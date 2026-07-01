import type { Metadata } from "next";
import { AccountGate } from "@/components/account/account-gate";
import { BRAND_NAME } from "@/lib/config";

export function generateMetadata(): Metadata {
  return {
    title: `My Account — ${BRAND_NAME}`,
    description: "Sign in to view your profile, track orders, and manage your saved items.",
  };
}

export default function Page() {
  return <AccountGate />;
}
