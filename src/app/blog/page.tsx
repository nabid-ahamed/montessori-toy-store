import type { Metadata } from "next";
import { BlogView } from "@/components/blog/blog-view";

export const metadata: Metadata = {
  title: "Blog — Parenting & Learning",
  description:
    "Play ideas, safety notes and Montessori know-how for raising curious, screen-free little ones.",
};

export default function Page() {
  return <BlogView />;
}
