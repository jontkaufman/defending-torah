import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getObjections, getObjectionBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import Link from "next/link";

export function generateStaticParams() {
  return getObjections().map((o) => ({ slug: o.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getObjectionBySlug(slug);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.excerpt,
  };
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
    <article className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <Link
            href="/objection-finder"
            className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted no-underline hover:text-ink transition-colors mb-8 inline-block"
          >
            <span className="inline-block w-6 h-px bg-muted mr-2 align-middle" />
            ← Back to Objections
          </Link>
          <div className="section-label mb-5">
            <span className="num">—</span>Objection Response
          </div>
          <h1 className="font-heading font-light text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-tight text-ink mb-6">
            {page.meta.title}
          </h1>
        </header>

        <div className="ornamental-rule my-8">
          <span className="ornament">✦</span>
        </div>

        {/* The Objection */}
        {fm.objection && (
          <div className="bg-ink text-parchment border border-ink border-l-3 border-l-ochre p-8 mb-8 max-md:p-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ochre mb-3">
              The Objection
            </div>
            <p className="font-body italic text-xl text-parchment/90">
              {fm.objection}
            </p>
          </div>
        )}

        {/* Quick Answer */}
        {fm.quick_answer && (
          <div className="bg-parchment-deep border border-ink border-l-3 border-l-olive p-8 mb-8 max-md:p-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-olive mb-3">
              Quick Answer (30 seconds)
            </div>
            <p className="font-body text-lg text-ink">
              {fm.quick_answer}
            </p>
          </div>
        )}

        {/* Key Points */}
        {fm.key_points && fm.key_points.length > 0 && (
          <div className="mb-10">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-crimson mb-5">
              Key Points
            </div>
            <div className="space-y-4">
              {fm.key_points.map((point, i) => (
                <div key={i} className="flex gap-4 items-start border-l border-parchment-shadow pl-6 ml-3 max-md:gap-3 max-md:pl-4 max-md:ml-1">
                  <span className="font-heading font-black text-3xl text-ochre leading-none pt-0.5 w-10 shrink-0 max-md:text-2xl max-md:w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-[17px] text-ink-soft leading-relaxed max-md:text-[15px]">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Article Body */}
        {page.content.trim() && (
          <div className="mt-10 pt-10 border-t border-ink">
            <MarkdownBody content={page.content} className="drop-cap" />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-10 pt-8 border-t border-ink max-md:flex-col">
          {fm.article_slug && (
            <Link
              href={`/articles/${fm.article_slug}`}
              className="btn btn-primary"
            >
              Read Full Article <span className="arrow">→</span>
            </Link>
          )}
          {fm.deep_dive_slug && (
            <Link
              href={`/articles/${fm.deep_dive_slug}`}
              className="btn btn-ghost"
            >
              Go Deeper (Greek Analysis)
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
