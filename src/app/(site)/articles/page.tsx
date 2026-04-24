import type { Metadata } from "next";
import { Suspense } from "react";
import { getArticles, getObjections } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { TopicsPageClient } from "@/components/topics-page-client";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Topics — Essays, Objections & Articles by Topic",
  description:
    "Browse all essays and objection responses organized by topic: Sabbath, Dietary Laws, Grace & Law, Covenant, Torah Foundation, and more.",
};

export default function ArticlesPage() {
  const articles = [
    ...getArticles().map((a) => ({ meta: a.meta, type: "article" as const })),
    ...getObjections().map((o) => ({ meta: o.meta, type: "objection" as const })),
  ];

  const posts = getPosts().map((p) => ({
    meta: p.meta,
    type: "post" as const,
  }));

  return (
    <Suspense>
      <TopicsPageClient articles={articles} posts={posts} />
    </Suspense>
  );
}
