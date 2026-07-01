import type { Metadata } from "next";
import { BulkView } from "@/components/bulk/bulk-view";
import { BRAND_NAME } from "@/lib/config";

export function generateMetadata(): Metadata {
  return {
    title: `Wholesale & Bulk Orders — ${BRAND_NAME}`,
    description:
      "Wholesale and bulk ordering for preschools, retailers, and international distributors — safe, natural neem-wood Montessori toys.",
  };
}

export default function Page() {
  return <BulkView />;
}
