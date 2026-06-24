import type { Metadata } from "next";
import { GiftView } from "@/components/gift/gift-view";
import { BRAND_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Gifts & Gift Cards — ${BRAND_NAME}`,
  description:
    "Curated gift kits and gift cards — handmade, non-toxic wooden toys for ages 0–3.",
};

export default function Page() {
  return <GiftView />;
}
