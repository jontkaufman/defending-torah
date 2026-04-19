import { getArticles, getObjections, getDeepDives, getAllTags } from "@/lib/content";
import { ArticlesPageClient } from "@/components/articles-page-client";

export default function ArticlesPage() {
  const articles = [
    ...getArticles().map((a) => ({ meta: a.meta, type: "article" as const })),
    ...getObjections().map((o) => ({ meta: o.meta, type: "objection" as const })),
    ...getDeepDives().map((d) => ({ meta: d.meta, type: "deep-dive" as const })),
  ];
  const allTags = getAllTags();

  return <ArticlesPageClient articles={articles} allTags={allTags} />;
}
