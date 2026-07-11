"use client";

import { motion, useReducedMotion } from "motion/react";
import { BlogCard } from "@/components/blog/journal/blog-card";
import type { BlogPost } from "@/lib/types";

/**
 * Responsive post grid (3 → 2 → 1) with a staggered scroll-reveal per card
 * (disabled under prefers-reduced-motion). Renders an empty state when a filter
 * matches nothing.
 */
export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const reduce = useReducedMotion();

  if (!posts.length) {
    return (
      <p className="rounded-2xl border border-dashed border-cream-300 py-16 text-center text-sm text-ink-muted">
        No posts in this category yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.4,
            delay: Math.min(i * 0.06, 0.3),
            ease: "easeOut",
          }}
        >
          <BlogCard post={post} />
        </motion.div>
      ))}
    </div>
  );
}
