# Cloudflare Worker Caching — Design Spec

**Date:** 2026-04-21
**Problem:** Defending Torah site hitting Cloudflare Workers free tier daily request limits (100k/day). Every request — including static content pages — invokes the worker fresh because no caching directives exist.
**Solution:** Add Next.js ISR (`revalidate`) to public pages. All changes in code, no Cloudflare dashboard config.

## Context

- **Stack:** Next.js 16 on Cloudflare Workers via OpenNext (`@opennextjs/cloudflare`)
- **Content update frequency:** Only on deploy (articles, blog posts, objections, torah-laws data are all build-time or deploy-time)
- **OpenNext ISR already configured:** `open-next.config.ts` has `staticAssetsIncrementalCache` and `enableCacheInterception: true` — the caching infrastructure exists, it's just not being used by any pages
- **Auth traffic:** Moderate — `/account/*` and `/course/*` pages get real usage

## Design

### 1. Page-Level ISR with `revalidate`

Add `export const revalidate` to public SSR pages to convert them from "render every request" to "render once, serve from edge cache, revalidate in background."

| Page | Current Rendering | Change | Revalidate Value |
|------|------------------|--------|-----------------|
| `/` (home) | SSR | ISR | `3600` (1hr) |
| `/articles` (list) | SSR | ISR | `3600` |
| `/blog` (list) | SSR | ISR | `3600` |
| `/about` | SSR | ISR | `3600` |
| `/torah-laws` | Client-side (shell SSR) | ISR shell | `3600` |
| `/articles/[slug]` | SSG | Confirm static | `false` |
| `/blog/[slug]` | SSG | Confirm static | `false` |
| `/objection-finder/[slug]` | SSG | Confirm static | `false` |
| `/account/*` | SSR + auth | No change | — |
| `/course/*` | Client-side | No change | — |

**Why 1 hour:** Content only changes on deploy, so any revalidation interval works. 1 hour is industry standard for ISR — short enough to pick up changes reasonably fast if the model ever shifts, long enough to eliminate nearly all redundant renders.

**Why `false` for SSG pages:** Signals "cache indefinitely until next deploy." Confirms to OpenNext that these pages should get long-lived edge cache headers.

### 2. Torah Laws Page — Client-Side Reality

The `/torah-laws` page is `"use client"` — it renders an empty shell on the server, then `fetchLaws()` runs in the browser via `useEffect`, calling Supabase directly from the client. This means:

- **Worker only serves the HTML shell** (loading state) — `revalidate = 3600` caches this shell (small win, reduces worker invocations)
- **Supabase calls go browser → Supabase API directly** — they do NOT go through the Cloudflare Worker and do NOT count toward the daily request limit
- **No server-side data caching needed** — the `{ next: { revalidate } }` fetch option doesn't apply to client-side code

The existing JSON fallback (`laws-data.json`) remains as resilience for Supabase outages. No changes to `src/lib/supabase.ts`.

### 3. What We Don't Touch

- **Auth pages** (`/account/*`, `/course/*`) — must render fresh per request for auth middleware
- **`_next/static/*`** — already immutable by Next.js convention, handled by Cloudflare ASSETS binding
- **Cloudflare dashboard** — no cache rules, page rules, or WAF changes
- **`open-next.config.ts`** — ISR infrastructure already configured correctly

## Files Changed

| File | Change |
|------|--------|
| `src/app/(site)/page.tsx` | Add `export const revalidate = 3600` |
| `src/app/(site)/articles/page.tsx` | Add `export const revalidate = 3600` |
| `src/app/(site)/blog/page.tsx` | Add `export const revalidate = 3600` |
| `src/app/(site)/about/page.tsx` | Add `export const revalidate = 3600` |
| `src/app/(site)/torah-laws/page.tsx` | Add `export const revalidate = 3600` (caches shell only — data fetched client-side) |
| `src/app/(site)/articles/[slug]/page.tsx` | Add `export const revalidate = false` |
| `src/app/(site)/blog/[slug]/page.tsx` | Add `export const revalidate = false` |
| `src/app/(site)/objection-finder/[slug]/page.tsx` | Add `export const revalidate = false` |

## Expected Impact

- Public page worker invocations drop ~95%+ (one render per unique page per hour instead of one per request)
- SSG pages served entirely from edge cache between deploys
- Auth pages unaffected — still render fresh per request
- No behavioral changes visible to users (pages serve the same content, just faster)
- Supabase API calls unaffected (torah-laws fetches from browser, not worker)

## Risks

- **Stale content after deploy:** First request after deploy may serve stale cache. Mitigated by OpenNext's ISR revalidation — background revalidation triggers on the first request, subsequent requests get fresh content.
