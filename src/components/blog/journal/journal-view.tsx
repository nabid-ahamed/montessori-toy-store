"use client";

import { useState } from "react";
import { BlogMasthead } from "@/components/blog/journal/blog-masthead";
import { FeaturedPost } from "@/components/blog/journal/featured-post";
import { CategoryFilter } from "@/components/blog/journal/category-filter";
import { BlogGrid } from "@/components/blog/journal/blog-grid";
import { NewsletterCTA } from "@/components/blog/journal/newsletter-cta";
import { blogPosts } from "@/lib/mock/blog";

/**
 * The Neem Journal index. Owns the active-category state and composes the
 * masthead, pinned featured post, filter chips, grid and newsletter band.
 * The featured post is always shown (pinned); the grid holds the remaining
 * posts, filtered client-side by category.
 */
export function JournalView() {
  const [active, setActive] = useState("all");

  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);
  const filtered =
    active === "all" ? rest : rest.filter((p) => p.category === active);

  return (
    <main className="flex-1 pb-16">
      <BlogMasthead />

      <div className="mx-auto w-full max-w-[80rem] space-y-12 px-4 sm:px-6 lg:px-8">
        <FeaturedPost post={featured} />

        <div className="space-y-8">
          <CategoryFilter active={active} onChange={setActive} />
          <BlogGrid posts={filtered} />
        </div>

        <NewsletterCTA />
      </div>
    </main>
  );
}
