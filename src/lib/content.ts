import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ContentMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  topic: string;
  tags: string[];
  difficulty: "entry" | "intermediate" | "deep-dive";
  date: string;
  relatedSlugs: string[];
}

export interface ContentPage {
  meta: ContentMeta;
  content: string;
  rawFrontmatter: Record<string, unknown>;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMarkdownDir(subdir: string): ContentPage[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: {
          slug: filename.replace(/\.md$/, ""),
          title: data.title ?? filename.replace(/\.md$/, ""),
          excerpt: data.excerpt ?? "",
          category: data.category ?? "uncategorized",
          topic: data.topic ?? "",
          tags: data.tags ?? [],
          difficulty: data.difficulty ?? "entry",
          date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : (data.date ?? ""),
          relatedSlugs: data.related ?? [],
        },
        content,
        rawFrontmatter: data,
      };
    })
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getArticles(): ContentPage[] {
  return readMarkdownDir("articles");
}

export function getArticleBySlug(slug: string): ContentPage | undefined {
  return getArticles().find((a) => a.meta.slug === slug);
}

export function getObjections(): ContentPage[] {
  return readMarkdownDir("objections");
}

export function getObjectionBySlug(slug: string): ContentPage | undefined {
  return getObjections().find((o) => o.meta.slug === slug);
}

export function getDeepDives(): ContentPage[] {
  return readMarkdownDir("deep-dives");
}

export function getAllContent(): ContentPage[] {
  return [...getArticles(), ...getObjections(), ...getDeepDives()];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllContent().forEach((page) => page.meta.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
