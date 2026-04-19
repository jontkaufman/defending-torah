import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { MarkdownBody } from "@/components/markdown-body";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.meta.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">
          {post.meta.title}
        </h1>
        <div className="text-sm text-[var(--text-muted)]">{post.meta.date}</div>
      </header>
      <MarkdownBody content={post.content} />
    </article>
  );
}
