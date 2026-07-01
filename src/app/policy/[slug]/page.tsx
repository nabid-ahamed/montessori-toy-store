import type { Metadata } from "next";
import { ShippingPolicyView } from "@/components/policy/shipping-policy-view";
import { StubPage } from "@/components/stub-page";
import { BRAND_NAME } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "shipping") {
    return {
      title: `Shipping & Delivery — ${BRAND_NAME}`,
      description:
        "How and how quickly your handmade wooden toys are shipped and delivered — dispatch times, tracking, international orders, and Cash on Delivery.",
    };
  }
  return { title: `Policy: ${slug} — ${BRAND_NAME}` };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "shipping") {
    return <ShippingPolicyView />;
  }
  return <StubPage title={`Policy: ${slug}`} />;
}
