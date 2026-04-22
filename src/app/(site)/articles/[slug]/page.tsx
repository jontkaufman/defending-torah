import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import { TagBadge } from "@/components/tag-badge";
import { RelatedContent } from "@/components/related-content";
import { ShareButtons } from "@/components/share-buttons";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedSidebar } from "@/components/related-sidebar";
import Link from "next/link";

export const revalidate = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.meta.title,
    description: article.meta.excerpt,
    openGraph: {
      type: "article",
      title: article.meta.title,
      description: article.meta.excerpt,
      url: `https://defendingtorah.com/articles/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.excerpt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <div className="px-10 py-[70px] max-md:px-6 max-md:py-10">
        <div className="max-w-[1600px] mx-auto xl:grid xl:grid-cols-[280px_1fr_320px] xl:gap-16">
          <TableOfContents content={article.content} />

          <article>
            <header className="mb-12">
              <Link
                href="/articles"
                className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted no-underline hover:text-ink transition-colors mb-8 inline-block"
              >
                <span className="inline-block w-6 h-px bg-muted mr-2 align-middle" />
                ← Back to Library
              </Link>
              <h1 className="font-heading font-light text-[clamp(36px,5vw,58px)] leading-[1.05] tracking-tight text-ink mb-4">
                {article.meta.title}
              </h1>
              <div className="flex items-center gap-4 mb-2">
                {article.meta.date && (
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
                    {article.meta.date}
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {article.meta.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </header>
            <div className="ornamental-rule my-8" aria-hidden="true">
              <span className="ornament">✦</span>
            </div>
            <MarkdownBody content={article.content} className="drop-cap" />

            <div className="xl:hidden">
              <RelatedContent
                relatedSlugs={article.meta.relatedSlugs}
                contentType="article"
              />
            </div>
          </article>

          <RelatedSidebar relatedSlugs={article.meta.relatedSlugs} />
        </div>
      </div>

      <ShareButtons
        url={`https://defendingtorah.com/articles/${slug}`}
        title={article.meta.title}
      />
    </>
  );
}
