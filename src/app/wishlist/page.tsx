import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";
import { BRAND_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Wishlist — ${BRAND_NAME}`,
  description: "The handmade, non-toxic toys you've saved for later.",
};

export default function Page() {
  return <WishlistView />;
}
