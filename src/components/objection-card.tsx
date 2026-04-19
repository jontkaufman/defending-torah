import Link from "next/link";
import type { ContentMeta } from "@/lib/content";

export function ObjectionCard({ meta }: { meta: ContentMeta }) {
  return (
    <Link
      href={`/objection-finder/${meta.slug}`}
      className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)] transition-colors"
    >
      <div className="text-xs text-red-400 font-bold uppercase tracking-wide mb-2">
        Objection
      </div>
      <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-2">
        {meta.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
        {meta.excerpt}
      </p>
    </Link>
  );
}
