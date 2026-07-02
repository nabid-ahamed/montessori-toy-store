import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { BRAND_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Cart — ${BRAND_NAME}`,
  description: "Review the handmade, non-toxic toys in your cart.",
};

export default function Page() {
  return (
    <>
      <CartView />
      <RecentlyViewed title="Recently Viewed" subtitle="Add one more before you check out." />
    </>
  );
}
