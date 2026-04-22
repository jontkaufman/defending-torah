# Sidebar Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Notion-style table of contents sidebar (left) and related content sidebar (right) to articles, objections, and blog posts with responsive mobile behavior.

**Architecture:** Two client/server hybrid components (TableOfContents extracts headings client-side with Intersection Observer, RelatedSidebar fetches content server-side). Three-column CSS Grid layout on desktop (1280px+), collapsible mobile TOC button with drawer, related content repositioned to bottom on mobile/tablet.

**Tech Stack:** Next.js 16 App Router, React Server Components, Intersection Observer API, Tailwind CSS, TypeScript

---

## File Structure

**Create:**
- `src/components/table-of-contents.tsx` - Client component for TOC with Intersection Observer
- `src/components/related-sidebar.tsx` - Server component for related content with type badges
- `src/lib/content-helpers.ts` - Utility to fetch mixed content types (articles/objections/blogs)

**Modify:**
- `src/app/(site)/articles/[slug]/page.tsx` - Add three-column grid layout
- `src/app/(site)/objection-finder/[slug]/page.tsx` - Add three-column grid layout
- `src/app/(site)/blog/[slug]/page.tsx` - Add three-column grid layout

**Keep:**
- `src/components/related-content.tsx` - Used for mobile bottom placement (unchanged)

---

### Task 1: Create content fetching utilities

**Files:**
- Create: `src/lib/content-helpers.ts`

- [ ] **Step 1: Write test for fetching mixed content types**

```typescript
// This is a utility library without complex logic, so we'll skip formal tests
// and verify through integration in components. No test file needed.
```

- [ ] **Step 2: Create content-helpers utility**

Create `src/lib/content-helpers.ts`:

```typescript
import { getArticleBySlug, getObjectionBySlug } from "./content";
import { getPostBySlug } from "./posts";

export interface RelatedItem {
  slug: string;
  type: "article" | "objection" | "blog";
  title: string;
  excerpt: string;
  href: string;
}

/**
 * Fetch related content from mixed types (articles, objections, blogs)
 * Returns up to limit items with type categorization
 */
export function getRelatedItems(
  slugs: string[],
  limit: number = 6
): RelatedItem[] {
  const items: RelatedItem[] = [];

  for (const slug of slugs) {
    if (items.length >= limit) break;

    // Try article first
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

    // Try objection
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

    // Try blog post
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
```

- [ ] **Step 3: Verify file compiles**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/content-helpers.ts
git commit -m "feat: add content-helpers utility for mixed content fetching

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Create TableOfContents component

**Files:**
- Create: `src/components/table-of-contents.tsx`

- [ ] **Step 1: Create TableOfContents component structure**

Create `src/components/table-of-contents.tsx`:

```typescript
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from DOM on mount
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = [];

    headingElements.forEach((heading) => {
      const level = parseInt(heading.tagName[1]) as 2 | 3;
      const text = heading.textContent || "";
      let id = heading.id;

      // Generate ID if missing
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        heading.id = id;
      }

      items.push({ id, text, level });
    });

    setHeadings(items);
  }, [content]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className="hidden xl:block sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pr-4"
        aria-label="Table of contents"
      >
        <div className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`
                w-full text-left px-3 py-2 text-sm rounded transition-all duration-150
                ${level === 3 ? "pl-7 text-[13px]" : ""}
                ${
                  activeId === id
                    ? "bg-ochre/10 text-ink font-semibold border-l-3 border-ochre"
                    : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                }
              `}
            >
              {text}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile TOC Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden fixed top-4 right-4 z-40 w-12 h-12 bg-parchment/80 backdrop-blur border border-ink/20 rounded shadow-lg flex items-center justify-center hover:bg-parchment transition-colors"
        aria-label="Open table of contents"
      >
        <svg
          className="w-5 h-5 text-ink"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-50 bg-ink/40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-parchment shadow-2xl overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg text-ink">Contents</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-ink/5"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5 text-ink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={`
                    w-full text-left px-3 py-2 text-sm rounded transition-all duration-150
                    ${level === 3 ? "pl-7 text-[13px]" : ""}
                    ${
                      activeId === id
                        ? "bg-ochre/10 text-ink font-semibold border-l-3 border-ochre"
                        : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                    }
                  `}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify component compiles**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/table-of-contents.tsx
git commit -m "feat: add TableOfContents component with Intersection Observer

- Auto-extracts H2/H3 headings from article
- Tracks active section with Intersection Observer
- Notion-style hover/active states
- Mobile drawer with floating button
- Smooth scroll to sections

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Create RelatedSidebar component

**Files:**
- Create: `src/components/related-sidebar.tsx`

- [ ] **Step 1: Create RelatedSidebar component**

Create `src/components/related-sidebar.tsx`:

```typescript
import Link from "next/link";
import { getRelatedItems } from "@/lib/content-helpers";

interface RelatedSidebarProps {
  relatedSlugs: string[];
}

export function RelatedSidebar({ relatedSlugs }: RelatedSidebarProps) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  const items = getRelatedItems(relatedSlugs, 6);

  if (items.length === 0) return null;

  const typeConfig = {
    article: { label: "Article", color: "text-ochre", bgColor: "bg-ochre/10" },
    objection: {
      label: "Objection",
      color: "text-crimson",
      bgColor: "bg-crimson/10",
    },
    blog: { label: "Blog", color: "text-olive", bgColor: "bg-olive/10" },
  };

  return (
    <aside
      className="hidden xl:block sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pl-4"
      aria-label="Related content"
    >
      <h2 className="font-heading text-lg text-ink mb-4">Related Reading</h2>
      <div className="space-y-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          return (
            <Link
              key={item.slug}
              href={item.href}
              className="block border border-ink/10 rounded p-4 no-underline transition-all duration-200 hover:border-ochre hover:bg-ochre/5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded ${config.bgColor} ${config.color}`}
                >
                  {config.label}
                </span>
              </div>
              <h3 className="font-heading text-[18px] text-ink mb-2 group-hover:text-ochre-deep transition-colors">
                {item.title}
              </h3>
              <p className="text-[14px] text-ink-soft line-clamp-2">
                {item.excerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Verify component compiles**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/related-sidebar.tsx
git commit -m "feat: add RelatedSidebar component with type badges

- Fetches mixed content types (articles/objections/blogs)
- Type badges with color coding (ochre/crimson/olive)
- Minimal card style with hover states
- Sticky positioning on desktop
- Hidden on mobile/tablet

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 4: Integrate sidebars into articles page

**Files:**
- Modify: `src/app/(site)/articles/[slug]/page.tsx`

- [ ] **Step 1: Read current articles page**

Run: `cat src/app/(site)/articles/[slug]/page.tsx`
Expected: See current structure with max-w-3xl centered layout

- [ ] **Step 2: Add imports and three-column layout**

Modify `src/app/(site)/articles/[slug]/page.tsx`:

```typescript
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
        {/* Three-column grid on desktop (1280px+) */}
        <div className="max-w-[1600px] mx-auto xl:grid xl:grid-cols-[280px_1fr_320px] xl:gap-16">
          {/* Left Sidebar: Table of Contents */}
          <TableOfContents content={article.content} />

          {/* Center: Article Content */}
          <article className="max-w-3xl xl:max-w-none">
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

            {/* Mobile/Tablet: Related content at bottom */}
            <div className="xl:hidden">
              <RelatedContent
                relatedSlugs={article.meta.relatedSlugs}
                contentType="article"
              />
            </div>
          </article>

          {/* Right Sidebar: Related Content */}
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
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds, no errors

- [ ] **Step 4: Test responsive layout**

Run: `npm run dev`
Then open browser: `http://localhost:3000/articles/[any-article-slug]`
Expected:
- Desktop (1280px+): Three columns visible (TOC left, content center, related right)
- Tablet/Mobile (<1280px): TOC button top-right, related at bottom

- [ ] **Step 5: Commit**

```bash
git add src/app/\(site\)/articles/\[slug\]/page.tsx
git commit -m "feat: add sidebar navigation to articles page

- Three-column grid layout on desktop
- TableOfContents on left
- RelatedSidebar on right
- Mobile: TOC button + related at bottom

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 5: Integrate sidebars into objections page

**Files:**
- Modify: `src/app/(site)/objection-finder/[slug]/page.tsx`

- [ ] **Step 1: Add imports and three-column layout**

Modify `src/app/(site)/objection-finder/[slug]/page.tsx`:

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getObjections, getObjectionBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import { RelatedContent } from "@/components/related-content";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedSidebar } from "@/components/related-sidebar";
import Link from "next/link";
import { ShareButtons } from "@/components/share-buttons";

export const revalidate = false;

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
    openGraph: {
      type: "article",
      title: page.meta.title,
      description: page.meta.excerpt,
      url: `https://defendingtorah.com/objection-finder/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.meta.title,
      description: page.meta.excerpt,
    },
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
    <>
      <div className="px-10 py-[70px] max-md:px-6 max-md:py-10">
        {/* Three-column grid on desktop (1280px+) */}
        <div className="max-w-[1600px] mx-auto xl:grid xl:grid-cols-[280px_1fr_320px] xl:gap-16">
          {/* Left Sidebar: Table of Contents */}
          <TableOfContents content={page.content} />

          {/* Center: Objection Content */}
          <article className="max-w-3xl xl:max-w-none">
            <header className="mb-12">
              <Link
                href="/objection-finder"
                className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted no-underline hover:text-ink transition-colors mb-8 inline-block"
              >
                <span className="inline-block w-6 h-px bg-muted mr-2 align-middle" />
                ← Back to Objections
              </Link>
              <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-crimson mb-5">
                Objection Response
              </div>
              <h1 className="font-heading font-light text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-tight text-ink mb-6">
                {page.meta.title}
              </h1>
            </header>

            <div className="ornamental-rule my-8" aria-hidden="true">
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
                    <div
                      key={i}
                      className="flex gap-4 items-start border-l border-parchment-shadow pl-6 ml-3 max-md:gap-3 max-md:pl-4 max-md:ml-1"
                    >
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

            {/* Mobile/Tablet: Related content at bottom */}
            <div className="xl:hidden">
              <RelatedContent
                relatedSlugs={page.meta.relatedSlugs}
                contentType="objection"
              />
            </div>
          </article>

          {/* Right Sidebar: Related Content */}
          <RelatedSidebar relatedSlugs={page.meta.relatedSlugs} />
        </div>
      </div>

      <ShareButtons
        url={`https://defendingtorah.com/objection-finder/${slug}`}
        title={page.meta.title}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds, no errors

- [ ] **Step 3: Test responsive layout**

Run: `npm run dev`
Then open: `http://localhost:3000/objection-finder/[any-objection-slug]`
Expected: Same three-column behavior as articles

- [ ] **Step 4: Commit**

```bash
git add src/app/\(site\)/objection-finder/\[slug\]/page.tsx
git commit -m "feat: add sidebar navigation to objections page

- Three-column grid layout on desktop
- TableOfContents on left
- RelatedSidebar on right
- Mobile: TOC button + related at bottom

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 6: Integrate sidebars into blog posts page

**Files:**
- Modify: `src/app/(site)/blog/[slug]/page.tsx`
- Modify: `src/lib/posts.ts` (add relatedSlugs support)

- [ ] **Step 1: Add relatedSlugs to PostMeta interface**

Modify `src/lib/posts.ts`:

```typescript
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
  relatedSlugs: string[];
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
          relatedSlugs: data.related ?? [],
        },
        content,
      };
    })
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPosts().find((p) => p.meta.slug === slug);
}
```

- [ ] **Step 2: Add imports and three-column layout to blog page**

Modify `src/app/(site)/blog/[slug]/page.tsx`:

```typescript
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

  // Strip leading h1 if it duplicates the frontmatter title
  const body = post.content.replace(/^\s*#\s+.+\n+/, "");

  return (
    <div className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      {/* Three-column grid on desktop (1280px+) */}
      <div className="max-w-[1600px] mx-auto xl:grid xl:grid-cols-[280px_1fr_320px] xl:gap-16">
        {/* Left Sidebar: Table of Contents */}
        <TableOfContents content={body} />

        {/* Center: Blog Post Content */}
        <article className="max-w-3xl xl:max-w-none">
          <header className="mb-12">
            <Link
              href="/blog"
              className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted no-underline hover:text-ink transition-colors mb-8 inline-block"
            >
              <span className="inline-block w-6 h-px bg-muted mr-2 align-middle" />
              ← Back to Blog
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

        {/* Right Sidebar: Related Content */}
        <RelatedSidebar relatedSlugs={post.meta.relatedSlugs} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds, no errors

- [ ] **Step 4: Test responsive layout**

Run: `npm run dev`
Then open: `http://localhost:3000/blog/[any-blog-slug]`
Expected: Same three-column behavior

- [ ] **Step 5: Commit**

```bash
git add src/lib/posts.ts src/app/\(site\)/blog/\[slug\]/page.tsx
git commit -m "feat: add sidebar navigation to blog posts page

- Add relatedSlugs support to PostMeta
- Three-column grid layout on desktop
- TableOfContents on left
- RelatedSidebar on right

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Visual polish and performance optimization

**Files:**
- Modify: `src/components/table-of-contents.tsx`

- [ ] **Step 1: Add fade gradient for scrollable TOC**

Update `src/components/table-of-contents.tsx` to add overflow fade effect:

```typescript
"use client";

import { useEffect, useState, useRef } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Extract headings from DOM on mount
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = [];

    headingElements.forEach((heading) => {
      const level = parseInt(heading.tagName[1]) as 2 | 3;
      const text = heading.textContent || "";
      let id = heading.id;

      // Generate ID if missing
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        heading.id = id;
      }

      items.push({ id, text, level });
    });

    setHeadings(items);
  }, [content]);

  // Check if nav is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (navRef.current) {
        setIsScrollable(
          navRef.current.scrollHeight > navRef.current.clientHeight
        );
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [headings]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        ref={navRef}
        className="hidden xl:block sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pr-4 will-change-transform relative"
        aria-label="Table of contents"
        style={{
          maskImage: isScrollable
            ? "linear-gradient(to bottom, black 90%, transparent 100%)"
            : undefined,
          WebkitMaskImage: isScrollable
            ? "linear-gradient(to bottom, black 90%, transparent 100%)"
            : undefined,
        }}
      >
        <div className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`
                w-full text-left px-3 py-2 text-sm rounded transition-all duration-150
                ${level === 3 ? "pl-7 text-[13px]" : ""}
                ${
                  activeId === id
                    ? "bg-ochre/10 text-ink font-semibold border-l-3 border-ochre"
                    : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                }
              `}
            >
              {text}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile TOC Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden fixed top-4 right-4 z-40 w-12 h-12 bg-parchment/80 backdrop-blur border border-ink/20 rounded shadow-lg flex items-center justify-center hover:bg-parchment transition-colors"
        aria-label="Open table of contents"
      >
        <svg
          className="w-5 h-5 text-ink"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-50 bg-ink/40"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-parchment shadow-2xl overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg text-ink">Contents</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-ink/5"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5 text-ink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={`
                    w-full text-left px-3 py-2 text-sm rounded transition-all duration-150
                    ${level === 3 ? "pl-7 text-[13px]" : ""}
                    ${
                      activeId === id
                        ? "bg-ochre/10 text-ink font-semibold border-l-3 border-ochre"
                        : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                    }
                  `}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify build and test**

Run: `npm run build`
Expected: Build succeeds

Run: `npm run dev`
Test: Open article with many headings (scrollable TOC)
Expected: Fade gradient appears at bottom when TOC is scrollable

- [ ] **Step 3: Commit**

```bash
git add src/components/table-of-contents.tsx
git commit -m "feat: add fade gradient and performance optimizations to TOC

- Fade gradient at bottom when scrollable
- will-change: transform for smooth sticky
- Scrollable detection with resize listener
- Performance: single observer, cleanup on unmount

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 8: Final verification and testing

**Files:**
- All modified files

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings

- [ ] **Step 2: Test all three content types**

Run: `npm run dev`

Test articles page: `http://localhost:3000/articles/[slug]`
Expected:
- Desktop: TOC left, content center, related right
- Tablet/mobile: TOC button, related at bottom

Test objections page: `http://localhost:3000/objection-finder/[slug]`
Expected: Same layout behavior

Test blog page: `http://localhost:3000/blog/[slug]`
Expected: Same layout behavior

- [ ] **Step 3: Test TOC functionality**

Click TOC items
Expected: Smooth scroll to section, URL hash updates

Scroll article
Expected: Active section highlights in TOC (top 20% of viewport)

Click mobile TOC button
Expected: Drawer slides in from right

- [ ] **Step 4: Test related sidebar**

Desktop: Verify related items show with type badges
Expected: Badges colored correctly (ochre/crimson/olive)

Mobile: Verify related content at bottom
Expected: Uses existing RelatedContent component styling

- [ ] **Step 5: Test responsive breakpoints**

Resize browser from wide to narrow
Expected:
- 1280px+: Three columns
- 768px-1279px: TOC button + content + related bottom
- <768px: TOC button + content + related bottom

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "test: verify sidebar navigation across all content types

All tests passing:
- Three-column layout on desktop
- TOC active section tracking
- Smooth scroll to sections
- Mobile TOC drawer
- Related sidebar with type badges
- Responsive breakpoints

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Self-Review Checklist

**Spec Coverage:**
- ✅ Auto-generate TOC from H2/H3 headings
- ✅ Notion-style TOC interactions (hover/active/click)
- ✅ Intersection Observer for current section tracking
- ✅ Sticky positioning for both sidebars
- ✅ Related content with type badges (article/objection/blog)
- ✅ Smart content mix (top 5-6 items)
- ✅ Three-column layout on desktop (280px | 1fr | 320px)
- ✅ Responsive: TOC button on mobile, related at bottom
- ✅ Show across all content types (articles/objections/blogs)
- ✅ Fade gradient when TOC scrollable
- ✅ Performance optimizations (single observer, debounce, cleanup)

**Placeholders:** None - all code complete with exact implementations

**Type Consistency:**
- ✅ `TOCItem` interface consistent across all uses
- ✅ `RelatedItem` interface matches getRelatedItems return type
- ✅ `relatedSlugs` prop consistent across all page integrations
- ✅ Type badges use consistent color mapping (ochre/crimson/olive)

---
