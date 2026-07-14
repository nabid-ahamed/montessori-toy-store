import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { RecentlyViewed } from "@/components/product/recently-viewed";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the handmade, non-toxic toys in your cart.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <CartView />
      <RecentlyViewed title="Recently Viewed" subtitle="Add one more before you check out." />
    </>
  );
}
