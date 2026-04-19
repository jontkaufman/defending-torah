import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { TagBadge } from "./tag-badge";

const categoryColors: Record<string, string> = {
  topics: "bg-emerald-900/50 text-emerald-300",
  people: "bg-blue-900/50 text-blue-300",
  arguments: "bg-red-900/50 text-red-300",
  history: "bg-amber-900/50 text-amber-300",
  uncategorized: "bg-gray-900/50 text-gray-300",
};

interface ArticleCardProps {
  meta: ContentMeta;
  type: "article" | "objection" | "deep-dive";
}

export function ArticleCard({ meta, type }: ArticleCardProps) {
  const href =
    type === "objection"
      ? `/objection-finder/${meta.slug}`
      : `/articles/${meta.slug}`;

  const typeLabel =
    type === "objection"
      ? "Objection Response"
      : type === "deep-dive"
        ? "Deep Dive"
        : "Article";

  return (
    <Link
      href={href}
      className="block bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex items-start gap-4">
        <span
          className={`px-2 py-1 rounded text-[10px] font-bold uppercase whitespace-nowrap ${categoryColors[meta.category] ?? categoryColors.uncategorized}`}
        >
          {typeLabel}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-1">
            {meta.title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
            {meta.excerpt}
          </p>
          <div className="flex gap-2 flex-wrap">
            {meta.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
