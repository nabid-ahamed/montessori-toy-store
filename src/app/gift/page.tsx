import type { Metadata } from "next";
import { GiftView } from "@/components/gift/gift-view";

export const metadata: Metadata = {
  title: "Gifts & Gift Cards",
  alternates: { canonical: "/gift" },
  description:
    "Curated gift kits and gift cards — handmade, non-toxic wooden toys for ages 0–3.",
};

export default function Page() {
  return <GiftView />;
}
