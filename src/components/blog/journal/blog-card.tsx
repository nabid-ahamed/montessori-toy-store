import Link from "next/link";
import { PostCover } from "@/components/blog/journal/cover-art";
import { categoryName } from "@/lib/mock/blog";
import type { BlogPost } from "@/lib/types";

/** "12 May 2026" — stable, locale-fixed so SSR and client render identically. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Journal post card: cover panel (illustrated fallback or real photo), a category
 * tag, title, excerpt, and a date · read-time footer. Links to the post. Media is
 * a self-contained panel so a `next/image` can be dropped in per post (see
 * PostCover) without touching the card.
 */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-300 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-neem/40 hover:shadow-xl hover:shadow-neem/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
          <PostCover post={post} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-paper/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-neem-deep backdrop-blur-sm">
          {categoryName(post.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-xl font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-neem-deep">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 border-t border-cream-200 pt-3 text-xs text-ink-soft">
          <time dateTime={post.dateISO}>{formatDate(post.dateISO)}</time>
          <span aria-hidden>·</span>
          <span>{post.readMins} min read</span>
        </div>
      </div>
    </Link>
  );
}
