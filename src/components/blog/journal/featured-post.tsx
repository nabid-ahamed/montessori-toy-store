import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCover } from "@/components/blog/journal/cover-art";
import { categoryName } from "@/lib/mock/blog";
import type { BlogPost } from "@/lib/types";

/** "12 May 2026" — locale-fixed so SSR and client match. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Featured post — the pinned latest story in a large split layout: cover panel
 * beside the copy on desktop, stacked on mobile. Links to the post.
 */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-3xl border border-cream-300 bg-card transition-all duration-300 hover:border-neem/40 hover:shadow-xl hover:shadow-neem/10 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[24rem]">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
          <PostCover post={post} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-neem px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-paper">
            Featured
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--honey)]">
            {categoryName(post.category)}
          </span>
        </div>

        <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-neem-deep sm:text-4xl">
          {post.title}
        </h2>

        <p className="max-w-prose text-base leading-7 text-ink-muted">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <time dateTime={post.dateISO}>{formatDate(post.dateISO)}</time>
          <span aria-hidden>·</span>
          <span>{post.readMins} min read</span>
        </div>

        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-neem-deep">
          Read the story
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
