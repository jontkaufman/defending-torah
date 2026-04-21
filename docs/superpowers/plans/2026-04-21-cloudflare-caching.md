# Cloudflare Worker Caching Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `revalidate` exports to all public pages so OpenNext sets proper cache headers, reducing Cloudflare Worker invocations by ~95%.

**Architecture:** Next.js route segment config (`revalidate`) tells OpenNext to set `Cache-Control` / `s-maxage` headers on responses. Cloudflare's CDN caches these at the edge, serving subsequent requests without invoking the worker. Pages that already have `force-static` get `revalidate = false` (cache forever). The one `"use client"` page (torah-laws) gets a layout wrapper since client components can't export route segment config.

**Tech Stack:** Next.js 16 App Router, OpenNext on Cloudflare Workers

**Spec:** `docs/superpowers/specs/2026-04-21-cloudflare-caching-design.md`

---

### File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/app/(site)/page.tsx` | Modify | Add `revalidate = false` (already `force-static`) |
| `src/app/(site)/articles/page.tsx` | Modify | Add `revalidate = false` (already `force-static`) |
| `src/app/(site)/blog/page.tsx` | Modify | Add `revalidate = false` (already `force-static`) |
| `src/app/(site)/about/page.tsx` | Modify | Add `dynamic = "force-static"` + `revalidate = false` |
| `src/app/(site)/torah-laws/layout.tsx` | Create | Wrapper layout with `revalidate = 3600` for client page |
| `src/app/(site)/articles/[slug]/page.tsx` | Modify | Add `revalidate = false` (already SSG) |
| `src/app/(site)/blog/[slug]/page.tsx` | Modify | Add `revalidate = false` (already SSG) |
| `src/app/(site)/objection-finder/[slug]/page.tsx` | Modify | Add `revalidate = false` (already SSG) |

**Note on `revalidate = false` vs `3600`:** The spec called for `3600` on list pages, but those pages already have `export const dynamic = "force-static"` — they're pre-rendered at build time and only change on deploy. `revalidate = false` is the correct pairing: "cache this forever, only invalidate on redeploy." Using `3600` would cause unnecessary hourly revalidation of content that hasn't changed.

---

### Task 1: Add `revalidate` to static list pages

These three pages already have `export const dynamic = "force-static"`. Add `revalidate = false` next to it.

**Files:**
- Modify: `src/app/(site)/page.tsx` (line 5, after `export const dynamic = "force-static"`)
- Modify: `src/app/(site)/articles/page.tsx` (line 7, after `export const dynamic = "force-static"`)
- Modify: `src/app/(site)/blog/page.tsx` (line 5, after `export const dynamic = "force-static"`)

- [ ] **Step 1: Add revalidate to home page**

In `src/app/(site)/page.tsx`, add after `export const dynamic = "force-static";`:

```typescript
export const revalidate = false;
```

- [ ] **Step 2: Add revalidate to articles list page**

In `src/app/(site)/articles/page.tsx`, add after `export const dynamic = "force-static";`:

```typescript
export const revalidate = false;
```

- [ ] **Step 3: Add revalidate to blog list page**

In `src/app/(site)/blog/page.tsx`, add after `export const dynamic = "force-static";`:

```typescript
export const revalidate = false;
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(site\)/page.tsx src/app/\(site\)/articles/page.tsx src/app/\(site\)/blog/page.tsx
git commit -m "feat: add revalidate=false to static list pages for edge caching"
```

---

### Task 2: Add caching to about page

The about page has no `dynamic` or `revalidate` export — it's SSR by default. Add both to make it static and permanently cached.

**Files:**
- Modify: `src/app/(site)/about/page.tsx` (after line 1, before metadata export)

- [ ] **Step 1: Add route segment config to about page**

In `src/app/(site)/about/page.tsx`, add after the `import` line and before the `metadata` export:

```typescript
export const dynamic = "force-static";
export const revalidate = false;
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(site\)/about/page.tsx
git commit -m "feat: make about page static with permanent edge caching"
```

---

### Task 3: Create torah-laws layout for caching

Torah-laws page is `"use client"` — can't export `revalidate` from a client component. Create a minimal layout that sets `revalidate = 3600` for the route segment. Using `3600` (not `false`) because the page shell is minimal and a shorter interval is conservative.

**Files:**
- Create: `src/app/(site)/torah-laws/layout.tsx`

- [ ] **Step 1: Create the layout file**

Create `src/app/(site)/torah-laws/layout.tsx`:

```typescript
export const revalidate = 3600;

export default function TorahLawsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(site\)/torah-laws/layout.tsx
git commit -m "feat: add torah-laws layout with 1hr edge cache for client page shell"
```

---

### Task 4: Add `revalidate = false` to SSG slug pages

These pages already have `generateStaticParams()` (SSG). Adding `revalidate = false` confirms to OpenNext that they should get permanent cache headers.

**Files:**
- Modify: `src/app/(site)/articles/[slug]/page.tsx` (after imports, before `generateStaticParams`)
- Modify: `src/app/(site)/blog/[slug]/page.tsx` (after imports, before `generateStaticParams`)
- Modify: `src/app/(site)/objection-finder/[slug]/page.tsx` (after imports, before `generateStaticParams`)

- [ ] **Step 1: Add revalidate to articles slug page**

In `src/app/(site)/articles/[slug]/page.tsx`, add after the imports (after line 7) and before `generateStaticParams`:

```typescript
export const revalidate = false;
```

- [ ] **Step 2: Add revalidate to blog slug page**

In `src/app/(site)/blog/[slug]/page.tsx`, add after the imports (after line 5) and before `generateStaticParams`:

```typescript
export const revalidate = false;
```

- [ ] **Step 3: Add revalidate to objection-finder slug page**

In `src/app/(site)/objection-finder/[slug]/page.tsx`, add after the imports (after line 6) and before `generateStaticParams`:

```typescript
export const revalidate = false;
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(site\)/articles/\[slug\]/page.tsx src/app/\(site\)/blog/\[slug\]/page.tsx src/app/\(site\)/objection-finder/\[slug\]/page.tsx
git commit -m "feat: add revalidate=false to SSG slug pages for permanent edge caching"
```

---

### Task 5: Verify build

Run the build to confirm no conflicts between `force-static`, `revalidate`, and existing page configs.

- [ ] **Step 1: Run the Cloudflare build**

```bash
cd /home/jonathan/torah/defend && npm run build:cf
```

Expected: Build succeeds. All pages compile without errors. No warnings about conflicting route segment configs.

- [ ] **Step 2: Commit build fix if needed**

If the build fails due to config conflicts, fix and commit. Otherwise skip this step.
