import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { getArticleBySlug, getObjectionBySlug } from "@/lib/content";

interface RelatedContentProps {
  relatedSlugs: string[];
  contentType: "article" | "objection";
}

interface RelatedItem {
  slug: string;
  type: "article" | "objection";
  meta: ContentMeta;
}

export function RelatedContent({
  relatedSlugs,
  contentType,
}: RelatedContentProps) {
  // Graceful degradation: return null if empty
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null;
  }

  const items: RelatedItem[] = [];

  relatedSlugs.forEach((slug) => {
    // Use contentType prop to determine which loader to call
    if (contentType === "article") {
      const article = getArticleBySlug(slug);
      if (article) {
        items.push({
          slug,
          type: "article",
          meta: article.meta,
        });
      }
    } else {
      const objection = getObjectionBySlug(slug);
      if (objection) {
        items.push({
          slug,
          type: "objection",
          meta: objection.meta,
        });
      }
    }
  });

  // Graceful degradation: return null if no items loaded
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-ink/20 mt-16 pt-12">
      <h2 className="font-heading font-medium text-[28px] text-ink mb-6">
        Related Reading
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ slug, type, meta }) => {
          const href =
            type === "objection"
              ? `/objection-finder/${slug}`
              : `/articles/${slug}`;

          const typeLabel = type === "objection" ? "Objection" : "Article";
          const typeColor = type === "objection" ? "text-crimson" : "text-ochre";

          return (
            <Link
              key={slug}
              href={href}
              className={`border border-ink/20 rounded p-6 no-underline transition-all duration-300 hover:border-ochre hover:bg-ochre/5 group max-md:p-4`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`font-mono text-[10px] tracking-[0.2em] uppercase ${typeColor}`}
                  >
                    {typeLabel}
                  </span>
                  {meta.difficulty && (
                    <span className="inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1 bg-ink/5 text-ink-soft rounded">
                      {meta.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-medium text-lg text-ink group-hover:text-ochre-deep transition-colors">
                  {meta.title}
                </h3>
                <p className="text-[14px] text-ink-soft line-clamp-2">
                  {meta.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
