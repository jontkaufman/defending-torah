import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import { TagBadge } from "@/components/tag-badge";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.meta.slug }));
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
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-3">
          {article.meta.title}
        </h1>
        <div className="flex gap-2 flex-wrap">
          {article.meta.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>
      <MarkdownBody content={article.content} />
    </article>
  );
}
