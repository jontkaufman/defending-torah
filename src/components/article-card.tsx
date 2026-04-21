import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { TagBadge } from "./tag-badge";

interface ArticleCardProps {
  meta: ContentMeta;
  type: "article" | "objection";
}

export function ArticleCard({ meta, type }: ArticleCardProps) {
  const href =
    type === "objection"
      ? `/objection-finder/${meta.slug}`
      : `/articles/${meta.slug}`;

  const typeLabel = type === "objection" ? "Objection" : "Essay";

  const borderColor = type === "objection" ? "border-crimson" : "border-ochre";

  const typeColor = type === "objection" ? "text-crimson" : "text-ochre";

  return (
    <Link
      href={href}
      className={`block border-b border-ink border-l-3 ${borderColor} pl-6 py-6 no-underline transition-[padding] duration-300 hover:pl-3 group max-md:pl-4 max-md:py-4`}
    >
      <div className="flex items-start gap-5 max-md:gap-3">
        <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${typeColor} whitespace-nowrap pt-1`}>
          {typeLabel}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-xl text-ink mb-1 group-hover:text-ochre-deep transition-colors">
            {meta.title}
          </h3>
          <p className="text-[16px] text-ink-soft mb-3 line-clamp-2">
            {meta.excerpt}
          </p>
          <div className="flex gap-1 flex-wrap">
            {meta.tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-1">
                <TagBadge tag={tag} />
                {i < meta.tags.length - 1 && (
                  <span className="text-ink-light text-[10px]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
