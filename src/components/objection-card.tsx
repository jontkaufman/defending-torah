import Link from "next/link";
import type { ContentMeta } from "@/lib/content";

export function ObjectionCard({ meta }: { meta: ContentMeta }) {
  return (
    <Link
      href={`/objection-finder/${meta.slug}`}
      className="block border-b border-ink border-l-3 border-crimson pl-6 py-6 no-underline transition-[padding] duration-300 hover:pl-3 group"
    >
      <div className="flex items-start gap-5">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-crimson whitespace-nowrap pt-1">
          Objection
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-lg text-ink mb-1 group-hover:text-ochre-deep transition-colors">
            {meta.title.split(/("[^"]*")/).map((part, i) =>
              part.startsWith('"') ? <strong key={i}>{part}</strong> : part
            )}
          </h3>
          <p className="text-[16px] text-ink-soft line-clamp-2">
            {meta.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
