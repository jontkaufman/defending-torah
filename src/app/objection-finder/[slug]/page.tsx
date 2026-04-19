import { notFound } from "next/navigation";
import { getObjections, getObjectionBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import Link from "next/link";

export function generateStaticParams() {
  return getObjections().map((o) => ({ slug: o.meta.slug }));
}

interface ObjectionFrontmatter {
  objection?: string;
  quick_answer?: string;
  key_points?: string[];
  article_slug?: string;
  deep_dive_slug?: string;
}

export default async function ObjectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getObjectionBySlug(slug);
  if (!page) notFound();

  const fm = page.rawFrontmatter as ObjectionFrontmatter;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-4">
          {page.meta.title}
        </h1>
      </header>

      {/* The Objection */}
      {fm.objection && (
        <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-5 mb-6">
          <div className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">
            The Objection
          </div>
          <p className="text-[var(--text-primary)] italic">{fm.objection}</p>
        </div>
      )}

      {/* Quick Answer */}
      {fm.quick_answer && (
        <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-lg p-5 mb-6">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">
            Quick Answer (30 seconds)
          </div>
          <p className="text-[var(--text-primary)]">{fm.quick_answer}</p>
        </div>
      )}

      {/* Key Points */}
      {fm.key_points && fm.key_points.length > 0 && (
        <div className="mb-6">
          <div className="text-xs text-[var(--accent)] font-bold uppercase tracking-wider mb-3">
            Key Points
          </div>
          <div className="space-y-3">
            {fm.key_points.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="bg-[var(--accent)] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--text-secondary)]">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Article Body */}
      {page.content.trim() && (
        <div className="mt-8 pt-8 border-t border-[var(--border)]">
          <MarkdownBody content={page.content} />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-[var(--border)]">
        {fm.article_slug && (
          <Link
            href={`/articles/${fm.article_slug}`}
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm hover:bg-[var(--accent-hover)] transition-colors"
          >
            Read Full Article
          </Link>
        )}
        {fm.deep_dive_slug && (
          <Link
            href={`/articles/${fm.deep_dive_slug}`}
            className="px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] transition-colors"
          >
            Go Deeper (Greek Analysis)
          </Link>
        )}
      </div>
    </article>
  );
}
