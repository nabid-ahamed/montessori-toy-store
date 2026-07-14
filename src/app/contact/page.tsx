import type { Metadata } from "next";
import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Questions about our Montessori wooden toys, your order, or anything else? Get in touch with the Toytuni team.",
};

export default function Page() {
  return <ContactView />;
}
