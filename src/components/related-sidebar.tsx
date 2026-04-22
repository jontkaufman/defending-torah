import Link from "next/link";
import { getRelatedItems } from "@/lib/content-helpers";

interface RelatedSidebarProps {
  relatedSlugs: string[];
}

export function RelatedSidebar({ relatedSlugs }: RelatedSidebarProps) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  const items = getRelatedItems(relatedSlugs, 6);

  if (items.length === 0) return null;

  const typeConfig = {
    article: { label: "Article", color: "text-ochre", bgColor: "bg-ochre/10" },
    objection: { label: "Objection", color: "text-crimson", bgColor: "bg-crimson/10" },
    blog: { label: "Blog", color: "text-olive", bgColor: "bg-olive/10" },
  };

  return (
    <aside
      className="hidden xl:block sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pl-4"
      aria-label="Related content"
    >
      <h2 className="font-heading text-lg text-ink mb-4">Related Reading</h2>
      <div className="space-y-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          return (
            <Link
              key={item.slug}
              href={item.href}
              className="block border border-ink/10 rounded p-4 no-underline transition-all duration-200 hover:border-ochre hover:bg-ochre/5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded ${config.bgColor} ${config.color}`}
                >
                  {config.label}
                </span>
              </div>
              <h3 className="font-heading text-[18px] text-ink mb-2 group-hover:text-ochre transition-colors">
                {item.title}
              </h3>
              <p className="text-[14px] text-ink-soft line-clamp-2">
                {item.excerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
