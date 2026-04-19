import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  topic: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "posts");

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: {
          slug: filename.replace(/\.md$/, ""),
          title: data.title ?? filename.replace(/\.md$/, ""),
          excerpt: data.excerpt ?? "",
          date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : (data.date ?? ""),
          tags: data.tags ?? [],
          topic: data.topic ?? "",
        },
        content,
      };
    })
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.meta.slug === slug);
}
