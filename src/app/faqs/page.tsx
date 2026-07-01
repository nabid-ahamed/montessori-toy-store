import type { Metadata } from "next";
import { FaqView } from "@/components/faq/faq-view";
import { BRAND_NAME } from "@/lib/config";

export function generateMetadata(): Metadata {
  return {
    title: `FAQs — ${BRAND_NAME}`,
    description:
      "Answers to common questions about our handmade Montessori wooden toys — shipping, orders, returns, payments, product safety, and more.",
  };
}

export default function Page() {
  return <FaqView />;
}
