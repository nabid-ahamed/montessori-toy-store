import type { Metadata } from "next";
import { StubPage } from "@/components/stub-page";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Toytuni's handmade, non-toxic Montessori wooden toys.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <StubPage title="Search" />;
}
