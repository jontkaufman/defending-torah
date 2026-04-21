# Website Polish - Week 1 Sprint Design

**Created:** 2026-04-20
**Status:** Approved
**Scope:** Critical UX gaps - error pages, accessibility, content features

---

## Goal

Transform defend website from "solid foundation" to "polished, professional apologetics resource" by addressing critical user experience gaps in a focused Week 1 sprint.

## Scope

**In Scope:**
1. Error handling (404 page, error boundary)
2. Full WCAG 2.1 AA accessibility compliance
3. Related content links component
4. About page (semi-anonymous, mission-focused)
5. Remove deep-dive content type from UI

**Out of Scope (Future Sprints):**
- SEO improvements (sitemap, robots.txt, OG images)
- Content expansion (missing articles, blog posts)
- Advanced features (search highlighting, print styles, analytics)

## Architecture

**Three independent parallel tracks:**

### Track 1 - Foundation
- Error pages provide safety net
- UI cleanup (remove unused content type)
- Can merge immediately
- No dependencies

### Track 2 - Content
- User-facing features (About, related links)
- Builds engagement and credibility
- Independent of other tracks
- Can start immediately

### Track 3 - Polish
- Accessibility audit and fixes
- Incremental improvements
- Depends on Track 1 (error pages must exist to test error states accessibly)
- Can proceed in parallel with Track 2

**Merge Order:** Track 1 first, then Track 2 & 3 in any order.

---

## Track 1 - Foundation

### 1.1 Error Pages

**File:** `src/app/not-found.tsx` (404 page)

**Requirements:**
- Match parchment/ink aesthetic (consistent with site layout)
- Heading: "Page Not Found"
- Body: "The page you're looking for doesn't exist or has been moved."
- Navigation helpers:
  - Search bar (reuse existing `SearchInput` component)
  - Links to main sections: Home, Articles, Objections, Blog, Torah Laws
- Tone: Serious, helpful, professional (no humor)
- Use existing site components (header/footer from layout, typography from globals.css)

**File:** `src/app/error.tsx` (Global error boundary)

**Requirements:**
- "use client" directive (required for React error boundaries)
- Props: `error: Error`, `reset: () => void`
- Heading: "Something Went Wrong"
- Body: "An unexpected error occurred. Please try again."
- Error details:
  - Show `error.message` in development only (check `process.env.NODE_ENV`)
  - Hide in production (security concern)
- Actions:
  - "Try Again" button → calls `reset()` function
  - "Return Home" link → `href="/"`
- Match site aesthetic (parchment bg, ink text, ochre accents)

### 1.2 Remove Deep-Dive Content Type

**File:** `src/components/topics-page-client.tsx`

**Changes:**
- Line 49: Remove `"deep-dive"` from `ContentType` union type
- `getHref()` function: Remove `case "deep-dive"` (would return `/deep-dives/[slug]`)
- `getTypeLabel()` function: Remove `case "deep-dive"` (returns "Deep Dive")
- `getTypeColor()` function: Remove `case "deep-dive"` (returns color class)

**Result:** UI only shows three content types: Article, Objection, Blog.

**Rationale:** Deep-dives folder is empty (only `.gitkeep`). Honest about what exists. Can re-add later if content created.

---

## Track 2 - Content

### 2.1 About Page

**File:** `src/app/(site)/about/page.tsx`

**Content Structure:**

1. **Hero Section**
   - Heading (h1): "About Defending Torah"
   - No subtitle

2. **Mission Statement** (2-3 paragraphs)
   - **Problem:** Torah often dismissed as "fulfilled," "for Israel only," or obsolete in modern Christianity
   - **Need:** Careful exegesis, primary sources, honest engagement with hard questions
   - **Solution:** This resource provides biblical answers from Scripture itself

3. **Theological Position** (1 paragraph)
   - **Avoid movement labels:** No "Messianic," "Hebrew Roots," or other tribal markers
   - **Frame biblically:**
     - "We read the New Testament as commentary on the Hebrew Scriptures, not replacement"
     - "Yeshua (Jesus) lived Torah perfectly and calls us to follow Him"
     - "Grace and Torah are not opposed—grace empowers obedience"
     - Emphasis on covenantal continuity and Second Temple context

4. **Intellectual Honesty Commitments** (bulleted list)
   - Steelman the strongest objections (never strawman)
   - Acknowledge hard questions honestly (never pretend certainty we don't have)
   - Cite scholars we disagree with (critique requires engagement)
   - Correct errors publicly (with visible revision notes)
   - Disclose confidence levels (established vs. probable vs. working hypothesis)

5. **Who We Are** (1-2 sentences)
   - Semi-anonymous: "Maintained by believers committed to Scripture's authority and Torah's ongoing validity"
   - No names, no personal stories, no movement affiliation
   - Let arguments stand on their own merit

**Styling:**
- Use site layout (header, footer, navigation)
- Parchment background, ink text, ochre accents
- Standard article typography (matching existing articles)
- Responsive padding/margins (match other pages)

**SEO:**
- Page title: "About | Defending Torah"
- Meta description: "Our mission, theological framework, and commitment to intellectual honesty in Torah apologetics."

### 2.2 Related Content Component

**File:** `src/components/related-content.tsx`

**Component Interface:**
```tsx
interface RelatedContentProps {
  relatedSlugs: string[];
  contentType: "article" | "objection";
}
```

**Behavior:**
1. Accept `relatedSlugs` array from article/objection frontmatter
2. Load metadata for each slug (title, excerpt, difficulty)
3. Render 2-3 cards at bottom of content
4. Each card displays:
   - Type label (Article/Objection) with appropriate color
   - Title (linked to content)
   - Excerpt (1 line, truncated with ellipsis)
   - Difficulty badge (entry/intermediate/deep-dive)
5. Hover state: Ochre highlight on card
6. Graceful degradation: If `relatedSlugs` empty or undefined, render nothing

**Styling:**
- Match existing card components (topics page, homepage)
- Border, padding, hover transitions
- Responsive grid (2-3 columns on desktop, 1 column mobile)

**Integration Points:**
- `src/app/(site)/articles/[slug]/page.tsx` - Add `<RelatedContent>` after article body, before footer
- `src/app/(site)/objection-finder/[slug]/page.tsx` - Add after objection body

**Data Loading:**
- Read related content metadata from filesystem (same pattern as existing content loaders in `lib/content.ts` and `lib/posts.ts`)
- Handle missing slugs gracefully (skip if content not found)

---

## Track 3 - Accessibility (WCAG 2.1 AA Compliance)

### 3.1 Audit Process

**Tool:** axe DevTools browser extension

**Pages to Audit:**
- Homepage (`/`)
- Articles index (`/articles`) + sample article
- Objections index (`/objection-finder`) + sample objection
- Blog index (`/blog`) + sample post
- Torah Laws (`/torah-laws`)
- About page (`/about`) - once built
- Error pages (`/404`, intentional error trigger)

**Process:**
1. Run axe scan on each page
2. Generate violation report (export results)
3. Categorize by severity: Critical → Serious → Moderate → Minor
4. Fix in priority order
5. Re-scan after fixes
6. Goal: 0 violations on automated WCAG 2.1 AA checks

### 3.2 Fix Categories (Priority Order)

**A. Images & Icons**

**Issue:** Missing alt text, unlabeled SVGs

**Fixes:**
- Add `alt` attribute to all `<img>` tags
  - Decorative images: `alt=""`
  - Informative images: Descriptive text (e.g., `alt="Torah scroll illustration"`)
- SVG icons: Wrap in `<span>` with `aria-label` OR add `<title>` element inside SVG
- Emojis that convey meaning: Add `aria-label` (e.g., 🌱 → `<span aria-label="beginner friendly">🌱</span>`)

**Files to Check:**
- All components in `src/components/`
- Article/objection templates
- Homepage hero and sections

**B. Interactive Elements**

**Issue:** Missing labels, unclear button text

**Fixes:**
- Search input: Ensure `<label>` or `aria-label="Search articles and objections"`
- Navigation links: Add `aria-current="page"` to active link
- Buttons: Ensure descriptive text (not just icons)
  - If icon-only button, add `aria-label`
- Form controls: Proper `<label>` elements associated with inputs

**Files to Check:**
- `src/components/search-input.tsx`
- `src/components/nav.tsx` (if exists) or layout navigation
- Any forms (contact, newsletter if present)

**C. Heading Hierarchy**

**Issue:** Skipped levels, multiple h1s, improper nesting

**Fixes:**
- Verify single `<h1>` per page (page title only)
- No skipped levels (h1 → h2 → h3, never h1 → h3)
- Fix violations in:
  - Article templates (ensure article title is h1, sections are h2, subsections h3)
  - Homepage sections (proper heading levels for each section)
  - Component headings (modal titles, card headings)

**Verification:** Use browser inspector or axe to check heading outline

**D. Keyboard Navigation**

**Issue:** Inaccessible via keyboard, unclear focus

**Fixes:**
- Add skip-to-main-content link:
  - Insert `<a href="#main-content">Skip to main content</a>` at top of page
  - Visually hidden by default (CSS: `position: absolute; left: -10000px;`)
  - Visible on focus (`:focus { position: static; }`)
- Ensure logical tab order (matches visual order)
- Focus visible on all interactive elements:
  - Add focus styles if missing (`:focus { outline: 2px solid ochre; }`)
  - Check links, buttons, form inputs
- Test: Navigate entire site using only keyboard (Tab, Shift+Tab, Enter, Space)

**Files to Create/Modify:**
- Add skip link to `src/app/(site)/layout.tsx` (site layout)
- Add focus styles to `src/app/globals.css` if missing

**E. Color Contrast**

**Issue:** Insufficient contrast ratios

**Standard:**
- Normal text: 4.5:1 minimum
- Large text (18pt+ or 14pt+ bold): 3:1 minimum

**Fixes:**
- Verify current colors meet standards:
  - Ink (`#1a1a1a`) on parchment (`#f9f7f4`) - should pass
  - Ochre links on parchment - verify with contrast checker
  - Muted text (`text-muted`) on parchment - likely needs darkening
- Adjust colors if violations found:
  - Darken text or lighten background
  - Document color changes in globals.css

**Tool:** Use axe DevTools contrast analyzer or WebAIM Contrast Checker

**F. ARIA Landmarks**

**Issue:** Missing semantic structure for screen readers

**Fixes:**
- Add landmark roles:
  - `<nav role="navigation" aria-label="Main navigation">`
  - `<main id="main-content" role="main">`
  - `<footer role="contentinfo">`
  - `<aside role="complementary">` (if sidebar exists)
- Helps screen readers navigate page structure
- Pair with skip-to-main link (#main-content anchor)

**Files to Modify:**
- `src/app/(site)/layout.tsx` - Add roles to header, main, footer
- Component layouts where applicable

### 3.3 Verification

**Manual Testing:**
1. **Keyboard navigation:** Tab through entire site, verify focus visible and logical order
2. **Screen reader spot check:** Use NVDA (Windows) or VoiceOver (Mac) to:
   - Navigate homepage
   - Read sample article
   - Verify landmarks work (navigation, main, footer)
3. **Color contrast:** Verify all text meets ratio standards (use browser inspector + axe)

**Automated Testing:**
- Re-run axe DevTools on all pages after fixes
- Goal: 0 violations (or only unavoidable false positives)
- Export final report for documentation

---

## Testing Strategy

### Per-Track Testing

**Track 1 - Foundation:**
- Navigate to `/fake-page` → Verify themed 404 page renders correctly
- Trigger intentional error (modify component to throw) → Verify error boundary catches and displays error page
- Visit `/articles` topics page → Verify no "Deep Dive" labels appear anywhere

**Track 2 - Content:**
- Visit `/about` → Verify content displays correctly, no layout breaks
- Visit article with `relatedSlugs` in frontmatter → Verify related content component renders
- Visit article without `relatedSlugs` → Verify component gracefully renders nothing (no errors)
- Click related link → Verify navigation works

**Track 3 - Accessibility:**
- Run axe DevTools on each page after fixes → Verify 0 violations
- Keyboard test: Tab through entire site → Verify focus visible, skip link works, all interactive elements accessible
- Screen reader spot check: Navigate homepage and article → Verify landmarks announced, headings navigable

### Integration Testing

**After merging all tracks:**
- Full site walkthrough (all pages load without errors)
- 404 page accessible and styled correctly
- About page content accurate, on-brand, responsive
- Related links render on all articles with frontmatter data
- axe DevTools: 0 violations site-wide
- Keyboard navigation works on all pages
- Skip-to-main link appears on focus

### Pre-Push Checklist

- [ ] All pages load without console errors
- [ ] 404 page: Themed, helpful, search works
- [ ] Error boundary: Catches errors, shows Try Again button
- [ ] About page: Content accurate, responsive, no typos
- [ ] Related links: Render correctly, graceful degradation works
- [ ] Deep-dive removed: No labels or references in UI
- [ ] axe DevTools: 0 violations (WCAG 2.1 AA)
- [ ] Keyboard nav: All interactive elements accessible, focus visible
- [ ] Skip link: Visible on focus, jumps to main content
- [ ] Screen reader: Landmarks work, headings navigable

---

## Integration & Merge Plan

### Step 1: Merge Track 1 (Foundation)
- Error pages provide safety net for remaining development
- Deep-dive cleanup is low-risk, no dependencies
- Commit message: "feat: add error pages and remove deep-dive content type"

### Step 2: Merge Track 2 (Content)
- About page is new route, no file conflicts
- Related content integrates into existing templates (minimal changes)
- Commit message: "feat: add About page and related content component"

### Step 3: Merge Track 3 (Accessibility)
- Touches many files (images, components, layouts)
- Merged last to avoid conflicts with Track 2 changes
- Final axe audit after merge
- Commit message: "feat: achieve WCAG 2.1 AA compliance site-wide"

### Final Verification
- Run full test suite (manual + automated)
- Push to production
- Monitor for any issues

---

## Success Criteria

**User Experience:**
- Visitors never see ugly default error pages
- Site navigable entirely by keyboard
- Screen reader users can navigate effectively
- All text readable (sufficient contrast)

**Content:**
- About page builds credibility without revealing identity
- Related content encourages deeper reading
- UI honest about available content (no empty categories)

**Technical:**
- WCAG 2.1 AA compliant (0 axe violations)
- Error boundaries prevent app crashes from breaking entire site
- All images and interactive elements properly labeled

**Professional Polish:**
- Site feels complete, not in-progress
- Error states handled gracefully
- Accessibility signals care and quality
- About page establishes mission and framework clearly

---

## Future Work (Out of Scope)

- SEO improvements (sitemap, robots.txt, OG images, structured data)
- Content expansion (Gentiles & Torah articles, missing objections, blog posts)
- Advanced UX (search highlighting, print styles, loading states)
- Analytics (Google Analytics, Plausible)
- Performance optimizations (image optimization, code splitting)
- RSS feed for blog
- Contact form / newsletter signup

These will be addressed in future sprints after Week 1 critical gaps are resolved.
