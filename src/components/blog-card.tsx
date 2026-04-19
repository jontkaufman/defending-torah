import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function BlogCard({ meta }: { meta: PostMeta }) {
  return (
    <Link
      href={`/blog/${meta.slug}`}
      className="block border-b border-ink border-l-2 border-ink-light pl-6 py-6 no-underline transition-[padding] duration-300 hover:pl-3 group max-md:pl-4 max-md:py-4"
    >
      <div className="flex items-baseline gap-6 max-md:gap-3 max-md:flex-col max-md:items-start">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted whitespace-nowrap">
          {meta.date}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-xl text-ink mb-1 group-hover:text-ochre-deep transition-colors">
            {meta.title}
          </h3>
          {meta.excerpt && (
            <p className="text-[16px] text-ink-soft line-clamp-2">
              {meta.excerpt}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
