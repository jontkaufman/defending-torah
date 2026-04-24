import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/lib/posts";
import { MarkdownBody } from "@/components/markdown-body";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedSidebar } from "@/components/related-sidebar";
import Link from "next/link";

export const revalidate = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const body = post.content.replace(/^\s*#\s+.+\n+/, "");

  return (
    <div className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      <div className="max-w-[1600px] mx-auto xl:grid xl:grid-cols-[280px_1fr_320px] xl:gap-16">
        <TableOfContents content={body} />

        <article>
          <header className="mb-12">
            <Link
              href="/articles"
              className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted no-underline hover:text-ink transition-colors mb-8 inline-block"
            >
              <span className="inline-block w-6 h-px bg-muted mr-2 align-middle" />
              ← Back to Topics
            </Link>
            <h1 className="font-heading font-light text-[clamp(36px,5vw,58px)] leading-[1.05] tracking-tight text-ink mb-4">
              {post.meta.title}
            </h1>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
              {post.meta.date}
            </div>
          </header>
          <div className="ornamental-rule my-8" aria-hidden="true">
            <span className="ornament">✦</span>
          </div>
          <MarkdownBody content={body} className="drop-cap" />
        </article>

        <RelatedSidebar relatedSlugs={post.meta.relatedSlugs} />
      </div>
    </div>
  );
}
