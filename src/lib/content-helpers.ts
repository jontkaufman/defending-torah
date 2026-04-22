import { getArticleBySlug, getObjectionBySlug } from "./content";
import { getPostBySlug } from "./posts";

export interface RelatedItem {
  slug: string;
  type: "article" | "objection" | "blog";
  title: string;
  excerpt: string;
  href: string;
}

export function getRelatedItems(
  slugs: string[],
  limit: number = 6
): RelatedItem[] {
  const items: RelatedItem[] = [];

  for (const slug of slugs) {
    if (items.length >= limit) break;

    const article = getArticleBySlug(slug);
    if (article) {
      items.push({
        slug,
        type: "article",
        title: article.meta.title,
        excerpt: article.meta.excerpt,
        href: `/articles/${slug}`,
      });
      continue;
    }

    const objection = getObjectionBySlug(slug);
    if (objection) {
      items.push({
        slug,
        type: "objection",
        title: objection.meta.title,
        excerpt: objection.meta.excerpt,
        href: `/objection-finder/${slug}`,
      });
      continue;
    }

    const blog = getPostBySlug(slug);
    if (blog) {
      items.push({
        slug,
        type: "blog",
        title: blog.meta.title,
        excerpt: blog.meta.excerpt,
        href: `/blog/${slug}`,
      });
    }
  }

  return items;
}
