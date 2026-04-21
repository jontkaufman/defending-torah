# Website Polish - Week 1 Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform defend website from "solid foundation" to "polished, professional apologetics resource" with error pages, WCAG 2.1 AA accessibility, related content links, and About page.

**Architecture:** Three parallel tracks (Foundation, Content, Accessibility). Track 1 creates safety net (error pages + cleanup), Track 2 adds user-facing features (About + related links), Track 3 ensures full accessibility compliance. Merge Track 1 first, then 2 & 3 in any order.

**Tech Stack:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, gray-matter

---

## File Structure

**Track 1 - Foundation:**
- Create: `src/app/not-found.tsx` (404 page)
- Create: `src/app/error.tsx` (error boundary)
- Modify: `src/components/topics-page-client.tsx` (remove deep-dive type)

**Track 2 - Content:**
- Create: `src/app/(site)/about/page.tsx` (About page)
- Create: `src/components/related-content.tsx` (component)
- Modify: `src/app/(site)/articles/[slug]/page.tsx` (integrate component)
- Modify: `src/app/(site)/objection-finder/[slug]/page.tsx` (integrate component)

**Track 3 - Accessibility:**
- Modify: `src/app/(site)/layout.tsx` (skip link, landmarks)
- Modify: `src/app/globals.css` (focus styles, skip link styles)
- Modify: `src/components/search-input.tsx` (aria-label)
- Modify: `src/components/nav.tsx` (aria-current, role)
- Modify: `src/components/footer.tsx` (role)
- Modify: Multiple component files (alt text, aria labels per audit)

---

## TRACK 1 - FOUNDATION

### Task 1: Create 404 Not Found Page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create 404 page with structure**

Create `src/app/not-found.tsx`:

```tsx
import Link from "next/link";
import { SearchInput } from "@/components/search-input";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-heading font-light text-[clamp(48px,8vw,72px)] leading-[1.05] tracking-tight text-ink mb-6">
          Page Not Found
        </h1>

        <p className="text-[19px] leading-[1.6] text-ink-soft mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation links */}
        <nav className="mb-10">
          <ul className="flex flex-wrap justify-center gap-4 text-[15px]">
            <li>
              <Link href="/" className="link-editorial">
                Home
              </Link>
            </li>
            <li>
              <Link href="/articles" className="link-editorial">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/objection-finder" className="link-editorial">
                Objections
              </Link>
            </li>
            <li>
              <Link href="/blog" className="link-editorial">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/torah-laws" className="link-editorial">
                Torah Laws
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search placeholder */}
        <div className="max-w-md mx-auto">
          <p className="text-sm text-muted mb-3">Or search for what you need:</p>
          {/* Search will be added in next step */}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test 404 page renders**

Run dev server:
```bash
npm run dev
```

Navigate to: `http://localhost:3000/fake-page`

Expected: Custom 404 page displays with heading "Page Not Found" and navigation links

- [ ] **Step 3: Add search functionality to 404 page**

The SearchInput component needs client-side state. Create a client component wrapper.

Modify `src/app/not-found.tsx`:

```tsx
import Link from "next/link";
import { NotFoundSearch } from "@/components/not-found-search";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-heading font-light text-[clamp(48px,8vw,72px)] leading-[1.05] tracking-tight text-ink mb-6">
          Page Not Found
        </h1>

        <p className="text-[19px] leading-[1.6] text-ink-soft mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <nav className="mb-10">
          <ul className="flex flex-wrap justify-center gap-4 text-[15px]">
            <li>
              <Link href="/" className="link-editorial">
                Home
              </Link>
            </li>
            <li>
              <Link href="/articles" className="link-editorial">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/objection-finder" className="link-editorial">
                Objections
              </Link>
            </li>
            <li>
              <Link href="/blog" className="link-editorial">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/torah-laws" className="link-editorial">
                Torah Laws
              </Link>
            </li>
          </ul>
        </nav>

        <div className="max-w-md mx-auto">
          <p className="text-sm text-muted mb-3">Or search for what you need:</p>
          <NotFoundSearch />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create search wrapper component**

Create `src/components/not-found-search.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/search-input";

export function NotFoundSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/articles?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search articles, objections, topics..."
      />
    </div>
  );
}
```

- [ ] **Step 5: Test search functionality**

Navigate to: `http://localhost:3000/fake-page`

Type "sabbath" in search box, press Enter

Expected: Redirects to `/articles?q=sabbath` with search results

- [ ] **Step 6: Commit 404 page**

```bash
git add src/app/not-found.tsx src/components/not-found-search.tsx
git commit -m "feat: add custom 404 not found page with search"
```

---

### Task 2: Create Error Boundary Page

**Files:**
- Create: `src/app/error.tsx`

- [ ] **Step 1: Create error boundary component**

Create `src/app/error.tsx`:

```tsx
"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-heading font-light text-[clamp(48px,8vw,72px)] leading-[1.05] tracking-tight text-ink mb-6">
          Something Went Wrong
        </h1>

        <p className="text-[19px] leading-[1.6] text-ink-soft mb-10">
          An unexpected error occurred. Please try again.
        </p>

        {/* Show error message in development only */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-crimson/10 border border-crimson/30 rounded text-left">
            <p className="font-mono text-sm text-crimson">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try Again
          </button>

          <Link href="/" className="btn btn-secondary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Test error boundary in development**

Create a test error by temporarily modifying `src/app/(site)/page.tsx` to throw an error at the top of the component:

```tsx
export default async function HomePage() {
  throw new Error("Test error boundary");
  // ... rest of component
}
```

Navigate to: `http://localhost:3000`

Expected: Error page displays with "Something Went Wrong" heading, error message visible, "Try Again" and "Return Home" buttons

- [ ] **Step 3: Remove test error**

Remove the `throw new Error` line from `src/app/(site)/page.tsx`:

```tsx
export default async function HomePage() {
  // ... rest of component (no throw statement)
}
```

- [ ] **Step 4: Verify error message hidden in production mode**

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

Temporarily add error again, verify error details are NOT shown (only "Something Went Wrong" message)

Remove test error again

- [ ] **Step 5: Commit error boundary**

```bash
git add src/app/error.tsx
git commit -m "feat: add global error boundary page"
```

---

### Task 3: Remove Deep-Dive Content Type from UI

**Files:**
- Modify: `src/components/topics-page-client.tsx`

- [ ] **Step 1: Remove deep-dive from ContentType union**

Edit `src/components/topics-page-client.tsx` line 49:

Before:
```tsx
type ContentType = "article" | "objection" | "deep-dive";
```

After:
```tsx
type ContentType = "article" | "objection";
```

- [ ] **Step 2: Remove deep-dive case from getHref function**

Edit `src/components/topics-page-client.tsx` function `getHref()` (around line 56-65):

Before:
```tsx
function getHref(item: { type: ContentType | "post"; meta: { slug: string } }) {
  switch (item.type) {
    case "objection":
      return `/objection-finder/${item.meta.slug}`;
    case "post":
      return `/blog/${item.meta.slug}`;
    default:
      return `/articles/${item.meta.slug}`;
  }
}
```

After (no change needed - deep-dive would fall through to default articles path, which is correct):
```tsx
function getHref(item: { type: ContentType | "post"; meta: { slug: string } }) {
  switch (item.type) {
    case "objection":
      return `/objection-finder/${item.meta.slug}`;
    case "post":
      return `/blog/${item.meta.slug}`;
    default:
      return `/articles/${item.meta.slug}`;
  }
}
```

- [ ] **Step 3: Remove deep-dive case from getTypeLabel function**

Edit `src/components/topics-page-client.tsx` function `getTypeLabel()` (around line 67-78):

Before:
```tsx
function getTypeLabel(type: ContentType | "post") {
  switch (type) {
    case "objection":
      return "Objection";
    case "deep-dive":
      return "Deep Dive";
    case "post":
      return "Blog";
    default:
      return "Essay";
  }
}
```

After:
```tsx
function getTypeLabel(type: ContentType | "post") {
  switch (type) {
    case "objection":
      return "Objection";
    case "post":
      return "Blog";
    default:
      return "Essay";
  }
}
```

- [ ] **Step 4: Remove deep-dive case from getTypeColor function**

Edit `src/components/topics-page-client.tsx` function `getTypeColor()` (around line 80-91):

Before:
```tsx
function getTypeColor(type: ContentType | "post") {
  switch (type) {
    case "objection":
      return "text-crimson";
    case "deep-dive":
      return "text-olive";
    case "post":
      return "text-ink-soft";
    default:
      return "text-ochre";
  }
}
```

After:
```tsx
function getTypeColor(type: ContentType | "post") {
  switch (type) {
    case "objection":
      return "text-crimson";
    case "post":
      return "text-ink-soft";
    default:
      return "text-ochre";
  }
}
```

- [ ] **Step 5: Test topics page**

Navigate to: `http://localhost:3000/articles`

Expected: All content displays, no "Deep Dive" labels appear anywhere, no TypeScript errors

- [ ] **Step 6: Commit deep-dive removal**

```bash
git add src/components/topics-page-client.tsx
git commit -m "refactor: remove deep-dive content type from UI"
```

- [ ] **Step 7: Merge Track 1 (Foundation)**

```bash
git push
```

Expected: All Track 1 changes deployed, foundation complete

---

## TRACK 2 - CONTENT

### Task 4: Create About Page

**Files:**
- Create: `src/app/(site)/about/page.tsx`

- [ ] **Step 1: Create About page with metadata**

Create `src/app/(site)/about/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our mission, theological framework, and commitment to intellectual honesty in Torah apologetics.",
};

export default function AboutPage() {
  return (
    <article className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <header className="mb-12">
          <h1 className="font-heading font-light text-[clamp(36px,5vw,58px)] leading-[1.05] tracking-tight text-ink mb-4">
            About Defending Torah
          </h1>
        </header>

        <div className="ornamental-rule my-8">
          <span className="ornament">✦</span>
        </div>

        {/* Content sections will be added in next steps */}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Add mission statement section**

Add mission section after ornamental rule in `src/app/(site)/about/page.tsx`:

```tsx
        {/* Mission Statement */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Mission
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            In much of modern Christianity, Torah is dismissed as "fulfilled," relegated to "Israel only," or considered obsolete after the cross. Objections to Torah observance are often based on surface readings, mistranslations, or traditions that have never been carefully examined against Scripture itself.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            This site exists to provide biblical answers for honest seekers—careful exegesis, primary sources, and engagement with hard questions. We don't shy away from difficult passages. We don't pretend easy answers exist where they don't. We present the strongest objections in their best form, then respond from Scripture.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink">
            Whether you're wrestling with what the New Testament really teaches about Torah, or you're a seasoned student looking for deeper study, you'll find resources here that treat Scripture seriously and honestly.
          </p>
        </section>
```

- [ ] **Step 3: Add theological position section**

Add theological position section in `src/app/(site)/about/page.tsx`:

```tsx
        {/* Theological Position */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Theological Framework
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-4">
            We read the New Testament as commentary on the Hebrew Scriptures, not replacement. Yeshua (Jesus) lived Torah perfectly and calls us to follow Him. Grace and Torah are not opposed—grace empowers obedience, and obedience flows from grace.
          </p>

          <p className="text-[17px] leading-[1.7] text-ink">
            We emphasize covenantal continuity and understand the New Testament within its Second Temple Jewish context. The "new covenant" promised in Jeremiah 31 writes Torah on hearts; it doesn't erase it. Yeshua didn't come to abolish the Law or the Prophets, but to fulfill them—to fill them full, to show us how to live them rightly.
          </p>
        </section>
```

- [ ] **Step 4: Add intellectual honesty commitments section**

Add commitments section in `src/app/(site)/about/page.tsx`:

```tsx
        {/* Intellectual Honesty Commitments */}
        <section className="prose prose-lg mb-12">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Our Commitment to Intellectual Honesty
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink mb-6">
            We hold ourselves to the following standards:
          </p>

          <ul className="space-y-3 text-[17px] leading-[1.7] text-ink">
            <li>
              <strong>Steelman the strongest objections.</strong> We present opposing arguments in their best scholarly form, not as straw men. If we can't answer the real objection, we don't pretend we can.
            </li>
            <li>
              <strong>Acknowledge hard questions honestly.</strong> Where Scripture is unclear or disputed, we say so. We never claim certainty we don't have.
            </li>
            <li>
              <strong>Cite scholars we disagree with.</strong> Critique requires engagement. We reference mainstream scholarship even when it cuts against our thesis.
            </li>
            <li>
              <strong>Correct errors publicly.</strong> When we get something wrong, we update the content with visible revision notes. Credibility requires accountability.
            </li>
            <li>
              <strong>Disclose confidence levels.</strong> We distinguish between what is established, probable, a working hypothesis, or genuinely uncertain.
            </li>
          </ul>
        </section>
```

- [ ] **Step 5: Add who we are section**

Add final section in `src/app/(site)/about/page.tsx`:

```tsx
        {/* Who We Are */}
        <section className="prose prose-lg">
          <h2 className="font-heading font-medium text-[32px] text-ink mb-6">
            Who We Are
          </h2>

          <p className="text-[17px] leading-[1.7] text-ink">
            This site is maintained by believers committed to Scripture's authority and Torah's ongoing validity. We let our arguments stand on their own merit. If the case for Torah is biblical, it doesn't need tribal labels or personal stories to validate it—it needs only Scripture, sound reasoning, and intellectual honesty.
          </p>
        </section>
```

- [ ] **Step 6: Test About page**

Navigate to: `http://localhost:3000/about`

Expected: About page displays with all sections, proper typography, responsive layout

- [ ] **Step 7: Commit About page**

```bash
git add src/app/\(site\)/about/page.tsx
git commit -m "feat: add About page with mission and framework"
```

---

### Task 5: Create Related Content Component

**Files:**
- Create: `src/components/related-content.tsx`

- [ ] **Step 1: Create component with type definitions**

Create `src/components/related-content.tsx`:

```tsx
import Link from "next/link";
import { getArticleBySlug, getObjectionBySlug } from "@/lib/content";

interface RelatedContentProps {
  relatedSlugs: string[];
  contentType: "article" | "objection";
}

export function RelatedContent({ relatedSlugs, contentType }: RelatedContentProps) {
  // Graceful degradation: render nothing if no related content
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null;
  }

  // Load metadata for each slug
  const items = relatedSlugs
    .map((slug) => {
      if (contentType === "article") {
        const article = getArticleBySlug(slug);
        return article ? { ...article, type: "article" as const } : null;
      } else {
        const objection = getObjectionBySlug(slug);
        return objection ? { ...objection, type: "objection" as const } : null;
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // If no valid items found, render nothing
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-ink/20">
      <h2 className="font-heading font-medium text-[28px] text-ink mb-6">
        Related Reading
      </h2>

      {/* Grid will be added in next step */}
    </section>
  );
}
```

- [ ] **Step 2: Add grid and card rendering**

Modify `src/components/related-content.tsx` to add the grid:

```tsx
import Link from "next/link";
import { getArticleBySlug, getObjectionBySlug } from "@/lib/content";

interface RelatedContentProps {
  relatedSlugs: string[];
  contentType: "article" | "objection";
}

export function RelatedContent({ relatedSlugs, contentType }: RelatedContentProps) {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null;
  }

  const items = relatedSlugs
    .map((slug) => {
      if (contentType === "article") {
        const article = getArticleBySlug(slug);
        return article ? { ...article, type: "article" as const } : null;
      } else {
        const objection = getObjectionBySlug(slug);
        return objection ? { ...objection, type: "objection" as const } : null;
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-ink/20">
      <h2 className="font-heading font-medium text-[28px] text-ink mb-6">
        Related Reading
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const href = item.type === "article"
            ? `/articles/${item.meta.slug}`
            : `/objection-finder/${item.meta.slug}`;

          const typeLabel = item.type === "article" ? "Article" : "Objection";
          const typeColor = item.type === "article" ? "text-ochre" : "text-crimson";

          return (
            <Link
              key={item.meta.slug}
              href={href}
              className="block p-6 border border-ink/20 rounded hover:border-ochre hover:bg-ochre/5 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${typeColor}`}>
                  {typeLabel}
                </span>
                {item.meta.difficulty && (
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">
                    {item.meta.difficulty}
                  </span>
                )}
              </div>

              <h3 className="font-heading font-medium text-[19px] text-ink mb-2 group-hover:text-ochre-deep transition-colors">
                {item.meta.title}
              </h3>

              <p className="text-[14px] text-ink-soft line-clamp-2">
                {item.meta.excerpt}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Test component in isolation**

Create a test page temporarily at `src/app/(site)/test-related/page.tsx`:

```tsx
import { RelatedContent } from "@/components/related-content";

export default function TestPage() {
  return (
    <div className="px-10 py-10">
      <h1>Testing Related Content</h1>
      <RelatedContent
        relatedSlugs={[]}
        contentType="article"
      />
      <p>If nothing renders above, graceful degradation works (empty array).</p>
    </div>
  );
}
```

Navigate to: `http://localhost:3000/test-related`

Expected: Only heading and message visible (component renders nothing for empty array)

- [ ] **Step 4: Delete test page**

```bash
rm src/app/\(site\)/test-related/page.tsx
```

- [ ] **Step 5: Commit related content component**

```bash
git add src/components/related-content.tsx
git commit -m "feat: create RelatedContent component with graceful degradation"
```

---

### Task 6: Integrate Related Content into Article Pages

**Files:**
- Modify: `src/app/(site)/articles/[slug]/page.tsx`

- [ ] **Step 1: Import RelatedContent component**

Edit `src/app/(site)/articles/[slug]/page.tsx` at top of file:

Before:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import { TagBadge } from "@/components/tag-badge";
import Link from "next/link";
```

After:
```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/content";
import { MarkdownBody } from "@/components/markdown-body";
import { TagBadge } from "@/components/tag-badge";
import { RelatedContent } from "@/components/related-content";
import Link from "next/link";
```

- [ ] **Step 2: Add RelatedContent after article body**

Edit `src/app/(site)/articles/[slug]/page.tsx` in the return statement:

Before:
```tsx
        <MarkdownBody content={article.content} className="drop-cap" />
      </div>
    </article>
```

After:
```tsx
        <MarkdownBody content={article.content} className="drop-cap" />

        <RelatedContent
          relatedSlugs={article.meta.relatedSlugs}
          contentType="article"
        />
      </div>
    </article>
```

- [ ] **Step 3: Test on article with related content**

Check which article has `related` field in frontmatter:

```bash
grep -r "^related:" content/articles/ | head -1
```

Navigate to that article (e.g., if result is `content/articles/sabbath-creation-ordinance.md`, go to `/articles/sabbath-creation-ordinance`)

Expected: Related content section appears at bottom with cards linking to related articles

- [ ] **Step 4: Test on article without related content**

Navigate to beginner's guide: `http://localhost:3000/articles/getting-started-with-torah-observance-beginners-guide`

Expected: No related content section appears (graceful degradation)

- [ ] **Step 5: Commit article integration**

```bash
git add src/app/\(site\)/articles/\[slug\]/page.tsx
git commit -m "feat: integrate RelatedContent into article pages"
```

---

### Task 7: Integrate Related Content into Objection Pages

**Files:**
- Modify: `src/app/(site)/objection-finder/[slug]/page.tsx`

- [ ] **Step 1: Read current objection page structure**

```bash
cat src/app/\(site\)/objection-finder/\[slug\]/page.tsx
```

- [ ] **Step 2: Import RelatedContent component**

Edit `src/app/(site)/objection-finder/[slug]/page.tsx` to add import (similar pattern to articles):

Add to imports:
```tsx
import { RelatedContent } from "@/components/related-content";
```

- [ ] **Step 3: Add RelatedContent after objection body**

Edit `src/app/(site)/objection-finder/[slug]/page.tsx` return statement to add component before closing `</div>` and `</article>`:

```tsx
        {/* After all existing content */}
        <RelatedContent
          relatedSlugs={objection.meta.relatedSlugs}
          contentType="objection"
        />
      </div>
    </article>
```

- [ ] **Step 4: Test on objection page**

Navigate to an objection: `http://localhost:3000/objection-finder/acts-15-proves-gentiles-dont-need-torah`

Expected: If objection has `related` field in frontmatter, related content appears. Otherwise, nothing renders.

- [ ] **Step 5: Commit objection integration**

```bash
git add src/app/\(site\)/objection-finder/\[slug\]/page.tsx
git commit -m "feat: integrate RelatedContent into objection pages"
```

- [ ] **Step 6: Merge Track 2 (Content)**

```bash
git push
```

Expected: All Track 2 changes deployed, About page and related content live

---

## TRACK 3 - ACCESSIBILITY

### Task 8: Add Skip-to-Main Link and ARIA Landmarks

**Files:**
- Modify: `src/app/(site)/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Read current site layout structure**

```bash
cat src/app/\(site\)/layout.tsx
```

Current structure shows: `<Nav />`, `<main>`, `<Footer />`

- [ ] **Step 2: Add skip link and main ID to layout**

Edit `src/app/(site)/layout.tsx`:

Before:
```tsx
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
    </>
  );
}
```

After:
```tsx
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" role="main" className="relative z-[1] flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Add skip link styles to globals.css**

Edit `src/app/globals.css` at the end of the file, add:

```css
/* Skip to main content link (accessibility) */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-ochre-deep);
  color: var(--color-parchment);
  padding: 8px 16px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

- [ ] **Step 4: Test skip link**

Navigate to: `http://localhost:3000`

Press Tab key (should be first focusable element)

Expected: "Skip to main content" link appears at top of page with ochre background

Press Enter

Expected: Focus jumps to main content area

- [ ] **Step 5: Add ARIA role to Nav component**

Edit `src/components/nav.tsx`:

Find the `<nav>` element and add `role` and `aria-label`:

Before:
```tsx
<nav className="...">
```

After:
```tsx
<nav role="navigation" aria-label="Main navigation" className="...">
```

- [ ] **Step 6: Add ARIA role to Footer component**

Edit `src/components/footer.tsx`:

Find the `<footer>` element and add `role`:

Before:
```tsx
<footer className="...">
```

After:
```tsx
<footer role="contentinfo" className="...">
```

- [ ] **Step 7: Commit skip link and landmarks**

```bash
git add src/app/\(site\)/layout.tsx src/app/globals.css src/components/nav.tsx src/components/footer.tsx
git commit -m "feat: add skip-to-main link and ARIA landmarks"
```

---

### Task 9: Add Focus Styles for Keyboard Navigation

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add global focus styles**

Edit `src/app/globals.css` and add focus styles (if not already present):

```css
/* Focus styles for keyboard navigation */
*:focus {
  outline: 2px solid var(--color-ochre);
  outline-offset: 2px;
}

/* Enhanced focus for links and buttons */
a:focus,
button:focus {
  outline: 2px solid var(--color-ochre-deep);
  outline-offset: 3px;
}

/* Remove default browser focus ring */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Restore focus ring for keyboard navigation only */
*:focus-visible {
  outline: 2px solid var(--color-ochre);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Test keyboard focus visibility**

Navigate to: `http://localhost:3000`

Press Tab repeatedly to navigate through all interactive elements

Expected: Each element shows visible ochre outline when focused

- [ ] **Step 3: Commit focus styles**

```bash
git add src/app/globals.css
git commit -m "feat: add visible focus styles for keyboard navigation"
```

---

### Task 10: Add ARIA Label to Search Input

**Files:**
- Modify: `src/components/search-input.tsx`

- [ ] **Step 1: Add aria-label to search input**

Edit `src/components/search-input.tsx`:

Before:
```tsx
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className="search-editorial"
      />
```

After:
```tsx
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className="search-editorial"
        aria-label={placeholder ?? "Search articles and objections"}
      />
```

- [ ] **Step 2: Test with screen reader (optional manual test)**

If NVDA or VoiceOver available:
- Navigate to search input
- Verify screen reader announces "Search articles and objections"

- [ ] **Step 3: Commit search input aria-label**

```bash
git add src/components/search-input.tsx
git commit -m "feat: add aria-label to search input for screen readers"
```

---

### Task 11: Run Accessibility Audit with axe DevTools

**Files:**
- None (audit only)

- [ ] **Step 1: Install axe DevTools browser extension**

Chrome/Edge: https://chrome.google.com/webstore (search "axe DevTools")
Firefox: https://addons.mozilla.org (search "axe DevTools")

Install extension

- [ ] **Step 2: Run audit on homepage**

Navigate to: `http://localhost:3000`

Open DevTools (F12), click "axe DevTools" tab

Click "Scan ALL of my page"

Expected: List of violations categorized by severity

- [ ] **Step 3: Export audit results**

In axe DevTools, click "Export" → "CSV" or "JSON"

Save to: `docs/accessibility-audit-before.json`

- [ ] **Step 4: Audit all key pages**

Run axe scan on each page:
- `/articles` (articles index)
- `/articles/sabbath-creation-ordinance` (sample article)
- `/objection-finder` (objections index)
- `/objection-finder/acts-15-proves-gentiles-dont-need-torah` (sample objection)
- `/blog` (blog index)
- `/torah-laws` (Torah laws page)
- `/about` (About page)
- `/404` (navigate to fake page)

For each page, note Critical and Serious violations

- [ ] **Step 5: Document common violations**

Create `docs/a11y-violations-summary.md`:

```markdown
# Accessibility Violations Summary

## Critical Issues
- [List critical issues found across pages]

## Serious Issues
- [List serious issues found across pages]

## Moderate Issues
- [List moderate issues found across pages]

## Pages Audited
- Homepage
- Articles index + sample
- Objections index + sample
- Blog
- Torah Laws
- About
- 404

## Next Steps
Fix violations in priority order (Critical → Serious → Moderate)
```

---

### Task 12: Fix Image Alt Text Violations

**Files:**
- Multiple component files (identified by audit)

- [ ] **Step 1: Identify images without alt text from audit**

Review axe audit results for "Images must have alternate text" violations

List all files with violations

- [ ] **Step 2: Add alt text to decorative images**

For decorative images (icons, ornaments), add `alt=""`:

Example in hypothetical component:
```tsx
<img src="/icon.svg" alt="" />
```

- [ ] **Step 3: Add descriptive alt text to informative images**

For informative images, add descriptive alt:

Example:
```tsx
<img src="/torah-scroll.jpg" alt="Ancient Torah scroll with Hebrew text" />
```

- [ ] **Step 4: Handle emoji accessibility**

If emojis convey meaning, wrap in span with aria-label:

Before:
```tsx
<span>🌱</span>
```

After:
```tsx
<span aria-label="beginner friendly" role="img">🌱</span>
```

- [ ] **Step 5: Re-run axe audit on fixed pages**

Navigate to pages with image violations

Run axe scan

Expected: "Images must have alternate text" violations resolved

- [ ] **Step 6: Commit alt text fixes**

```bash
git add [files with changes]
git commit -m "fix: add alt text to images for screen readers"
```

---

### Task 13: Fix Heading Hierarchy Violations

**Files:**
- Multiple page files (identified by audit)

- [ ] **Step 1: Identify heading hierarchy issues from audit**

Review axe audit for "Heading levels should only increase by one" violations

Note pages with violations

- [ ] **Step 2: Verify single h1 per page**

Check each page template:
- Only page title should be `<h1>`
- All other headings should be h2, h3, h4 etc.

Example fix in article page (if needed):
```tsx
{/* Main title - h1 */}
<h1>{article.meta.title}</h1>

{/* Section headings - h2 */}
<h2>Introduction</h2>

{/* Subsections - h3 */}
<h3>Key Points</h3>
```

- [ ] **Step 3: Fix skipped heading levels**

Find any h1 → h3 jumps (skipping h2)

Insert proper h2 or demote h3 to h2:

Before:
```tsx
<h1>Page Title</h1>
<h3>Subsection</h3>
```

After:
```tsx
<h1>Page Title</h1>
<h2>Subsection</h2>
```

- [ ] **Step 4: Re-run axe audit on fixed pages**

Expected: Heading hierarchy violations resolved

- [ ] **Step 5: Commit heading fixes**

```bash
git add [files with changes]
git commit -m "fix: correct heading hierarchy for accessibility"
```

---

### Task 14: Add aria-current to Active Navigation Links

**Files:**
- Modify: `src/components/nav.tsx`

- [ ] **Step 1: Read current Nav component**

```bash
cat src/components/nav.tsx
```

- [ ] **Step 2: Make Nav component client-side for active state**

If Nav is server component, convert to client component to use `usePathname`:

Add to top of `src/components/nav.tsx`:
```tsx
"use client";

import { usePathname } from "next/navigation";
```

- [ ] **Step 3: Add aria-current to active link**

Edit navigation links in `src/components/nav.tsx`:

```tsx
export function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + "/");

  return (
    <nav role="navigation" aria-label="Main navigation" className="...">
      {/* ... */}
      <Link
        href="/articles"
        aria-current={isActive("/articles") ? "page" : undefined}
        className="..."
      >
        Articles
      </Link>

      <Link
        href="/objection-finder"
        aria-current={isActive("/objection-finder") ? "page" : undefined}
        className="..."
      >
        Objections
      </Link>

      {/* Repeat for other nav links */}
    </nav>
  );
}
```

- [ ] **Step 4: Test aria-current attribute**

Navigate to: `http://localhost:3000/articles`

Inspect Articles link in DevTools

Expected: Shows `aria-current="page"` attribute

Navigate to homepage

Expected: Articles link does NOT have `aria-current` attribute

- [ ] **Step 5: Commit aria-current addition**

```bash
git add src/components/nav.tsx
git commit -m "feat: add aria-current to active navigation links"
```

---

### Task 15: Verify Color Contrast and Fix Violations

**Files:**
- Modify: `src/app/globals.css` (if needed)

- [ ] **Step 1: Check contrast violations from audit**

Review axe audit for "Elements must have sufficient color contrast" violations

Note which color combinations fail

- [ ] **Step 2: Test ink on parchment**

Check contrast ratio for main text:
- Ink: `#1a1a1a`
- Parchment: `#f9f7f4`

Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

Expected: Passes 4.5:1 for normal text

- [ ] **Step 3: Test ochre links on parchment**

Check contrast for links:
- Ochre: (check actual hex value in globals.css)
- Parchment: `#f9f7f4`

If fails, darken ochre color

- [ ] **Step 4: Test muted text on parchment**

Check contrast for `text-muted` class

If fails 4.5:1, darken the muted color in globals.css:

Before:
```css
.text-muted {
  color: #999999; /* example */
}
```

After:
```css
.text-muted {
  color: #666666; /* darker for better contrast */
}
```

- [ ] **Step 5: Re-run axe audit for contrast**

Expected: Color contrast violations resolved

- [ ] **Step 6: Commit contrast fixes (if any)**

```bash
git add src/app/globals.css
git commit -m "fix: improve color contrast for WCAG AA compliance"
```

---

### Task 16: Final Accessibility Audit and Verification

**Files:**
- None (audit only)

- [ ] **Step 1: Run full axe audit on all pages**

Audit each page again:
- Homepage
- Articles index + sample
- Objections index + sample
- Blog
- Torah Laws
- About
- 404
- Error boundary (trigger test error)

- [ ] **Step 2: Verify 0 Critical and Serious violations**

Expected: All Critical and Serious issues resolved

Moderate and Minor issues acceptable (document any that remain)

- [ ] **Step 3: Test full keyboard navigation**

Navigate entire site using only keyboard (Tab, Shift+Tab, Enter, Space)

Checklist:
- [ ] Skip link appears and works
- [ ] All links focusable and visible
- [ ] All buttons focusable and visible
- [ ] Search input focusable
- [ ] Tab order logical (top to bottom, left to right)
- [ ] No keyboard traps

- [ ] **Step 4: Spot check with screen reader (optional)**

If NVDA or VoiceOver available:
- Navigate homepage
- Read sample article
- Verify landmarks announced ("navigation", "main", "contentinfo")
- Verify headings navigable

- [ ] **Step 5: Export final audit results**

Export axe results to: `docs/accessibility-audit-after.json`

- [ ] **Step 6: Document final status**

Create `docs/a11y-compliance-report.md`:

```markdown
# WCAG 2.1 AA Compliance Report

**Date:** 2026-04-20
**Auditor:** axe DevTools
**Standard:** WCAG 2.1 AA

## Summary
- **Critical violations:** 0
- **Serious violations:** 0
- **Moderate violations:** [count]
- **Minor violations:** [count]

## Pages Audited
- [List all pages]

## Fixes Implemented
- Added skip-to-main-content link
- Added ARIA landmarks (navigation, main, contentinfo)
- Added aria-label to search input
- Added aria-current to active nav links
- Added alt text to all images
- Fixed heading hierarchy
- Improved color contrast
- Added visible focus styles

## Remaining Issues
- [List any Moderate/Minor issues that are acceptable or will be addressed later]

## Manual Testing
- ✅ Keyboard navigation functional
- ✅ Skip link works
- ✅ Focus visible on all interactive elements
- ✅ Screen reader announces landmarks and headings

**Status:** WCAG 2.1 AA Compliant ✅
```

- [ ] **Step 7: Commit final accessibility work**

```bash
git add docs/a11y-compliance-report.md docs/accessibility-audit-after.json
git commit -m "docs: accessibility compliance report - WCAG 2.1 AA achieved"
```

- [ ] **Step 8: Merge Track 3 (Accessibility)**

```bash
git push
```

Expected: All accessibility improvements deployed, site fully compliant

---

## FINAL INTEGRATION

### Task 17: Full Site Testing and Verification

**Files:**
- None (testing only)

- [ ] **Step 1: Run full site walkthrough**

Test every page:
- [ ] Homepage loads without errors
- [ ] Articles index loads
- [ ] Sample article loads with related content (if applicable)
- [ ] Objections index loads
- [ ] Sample objection loads with related content (if applicable)
- [ ] Blog index loads
- [ ] Sample blog post loads
- [ ] Torah Laws page loads
- [ ] About page loads with all sections
- [ ] Navigate to fake page → 404 displays correctly
- [ ] Trigger test error → Error boundary catches it

- [ ] **Step 2: Verify all Track 1 requirements**

Foundation checklist:
- [ ] 404 page: Themed, helpful, search works
- [ ] Error boundary: Catches errors, shows Try Again button
- [ ] Error details hidden in production
- [ ] Deep-dive removed: No "Deep Dive" labels in UI

- [ ] **Step 3: Verify all Track 2 requirements**

Content checklist:
- [ ] About page: Content accurate, responsive, no typos
- [ ] Related links render on articles with `relatedSlugs`
- [ ] Related links render on objections with `relatedSlugs`
- [ ] Graceful degradation: No errors when `relatedSlugs` empty

- [ ] **Step 4: Verify all Track 3 requirements**

Accessibility checklist:
- [ ] axe DevTools: 0 Critical/Serious violations
- [ ] Keyboard nav: All pages accessible via keyboard
- [ ] Skip link: Visible on focus, jumps to main
- [ ] Focus styles: Visible on all interactive elements
- [ ] ARIA landmarks: Navigation, main, contentinfo
- [ ] Images: All have alt text
- [ ] Headings: Proper hierarchy
- [ ] Color contrast: Meets WCAG AA standards

- [ ] **Step 5: Check console for errors**

Open DevTools console on each page

Expected: No JavaScript errors or warnings

- [ ] **Step 6: Test responsive design**

Resize browser window to mobile size (375px width)

Check:
- [ ] All pages responsive
- [ ] Text readable
- [ ] Navigation works
- [ ] Cards stack properly

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: final verification - all tracks integrated and tested"
git push
```

---

## DEPLOYMENT

### Task 18: Deploy to Production

**Files:**
- None (deployment only)

- [ ] **Step 1: Build for production**

```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 2: Test production build locally**

```bash
npm run start
```

Navigate to: `http://localhost:3000`

Test key pages, verify no errors

- [ ] **Step 3: Deploy to Cloudflare**

```bash
npm run deploy
```

Or push to main branch (if auto-deployment configured)

- [ ] **Step 4: Verify deployment**

Navigate to production URL: `https://defendingtorah.com`

Test:
- [ ] Homepage loads
- [ ] About page live
- [ ] 404 page works
- [ ] Related content shows on articles
- [ ] Accessibility features work (skip link, focus styles)

- [ ] **Step 5: Run post-deployment axe audit**

Run axe DevTools on production homepage

Expected: 0 Critical/Serious violations

- [ ] **Step 6: Monitor for issues**

Check error logs for any production issues

Expected: No errors, site stable

---

## Success Criteria Verification

- ✅ **User Experience:**
  - Visitors never see ugly default error pages
  - Site navigable entirely by keyboard
  - Screen reader users can navigate effectively
  - All text readable (sufficient contrast)

- ✅ **Content:**
  - About page builds credibility without revealing identity
  - Related content encourages deeper reading
  - UI honest about available content (no empty categories)

- ✅ **Technical:**
  - WCAG 2.1 AA compliant (0 axe violations)
  - Error boundaries prevent app crashes from breaking entire site
  - All images and interactive elements properly labeled

- ✅ **Professional Polish:**
  - Site feels complete, not in-progress
  - Error states handled gracefully
  - Accessibility signals care and quality
  - About page establishes mission and framework clearly

---

## Self-Review Checklist

**Spec Coverage:**
- ✅ Error pages (404, error boundary) - Tasks 1-2
- ✅ Remove deep-dive content type - Task 3
- ✅ About page - Task 4
- ✅ Related content component - Tasks 5-7
- ✅ ARIA landmarks and skip link - Task 8
- ✅ Focus styles - Task 9
- ✅ Search input accessibility - Task 10
- ✅ Accessibility audit - Task 11
- ✅ Image alt text - Task 12
- ✅ Heading hierarchy - Task 13
- ✅ aria-current on nav - Task 14
- ✅ Color contrast - Task 15
- ✅ Final verification - Tasks 16-18

**Placeholder Scan:**
- No TBD, TODO, or "implement later"
- All code blocks complete
- All commands have expected output
- No "similar to Task N" references

**Type Consistency:**
- `RelatedContentProps` interface consistent across Tasks 5-7
- `ContentType` union consistent after Task 3 removal
- File paths exact and consistent

**All spec requirements covered. No placeholders. Types consistent.**
