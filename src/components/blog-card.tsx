import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function BlogCard({ meta }: { meta: PostMeta }) {
  return (
    <Link
      href={`/blog/${meta.slug}`}
      className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)] transition-colors"
    >
      <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)] mb-2">
        {meta.title}
      </h3>
      {meta.excerpt && (
        <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-3">
          {meta.excerpt}
        </p>
      )}
      <div className="text-xs text-[var(--text-muted)]">{meta.date}</div>
    </Link>
  );
}
