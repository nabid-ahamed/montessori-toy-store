import type { Metadata } from "next";
import { PolicyPageView } from "@/components/policy/policy-page-view";
import { ShippingPolicyView } from "@/components/policy/shipping-policy-view";
import { StubPage } from "@/components/stub-page";
import { BRAND_NAME } from "@/lib/config";
import { getPolicy } from "@/lib/policy";

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
  const policy = getPolicy(slug);
  if (policy) {
    return { title: `${policy.title} — ${BRAND_NAME}`, description: policy.intro };
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
  const policy = getPolicy(slug);
  if (policy) {
    return <PolicyPageView content={policy} />;
  }
  return <StubPage title={`Policy: ${slug}`} />;
}
