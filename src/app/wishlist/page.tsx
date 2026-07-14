import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The handmade, non-toxic toys you've saved for later.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <WishlistView />;
}
