import type { Metadata } from "next";
import { BulkView } from "@/components/bulk/bulk-view";

export function generateMetadata(): Metadata {
  return {
    title: "Wholesale & Bulk Orders",
    alternates: { canonical: "/bulk" },
    description:
      "Wholesale and bulk ordering for preschools, retailers, and international distributors — safe, natural neem-wood Montessori toys.",
  };
}

export default function Page() {
  return <BulkView />;
}
