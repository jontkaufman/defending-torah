# Design: Sidebar Navigation with TOC and Related Content

**Date:** 2026-04-22
**Type:** Feature addition
**Files:** New components + layout modifications for articles, objections, and blog posts

## Purpose

Add persistent sidebar navigation to improve content discoverability and reading experience:
- **Left sidebar:** Notion-style Table of Contents with current section highlighting
- **Right sidebar:** Related content categorized by type (Articles, Objections, Blogs)
- **Mobile:** Collapsible TOC button, related content moves to bottom

## Requirements

### Left Sidebar: Table of Contents

1. **Auto-generate from headings**
   - Extract all H2 and H3 headings from article content
   - H2 = main sections, H3 = subsections (nested under parent H2)
   - Generate slugified IDs for smooth scrolling

2. **Notion-style interactions**
   - Default: Compact, subtle text
   - Hover: Expand with background highlight, darker text
   - Active: Bold text, colored left border (ochre), darker background
   - Click: Smooth scroll to section, update URL hash

3. **Current section tracking**
   - Use Intersection Observer to detect heading in viewport
   - Highlight heading in top ~20% of screen
   - Smooth transitions between active states

4. **Sticky positioning**
   - `position: sticky; top: 100px;` (accounts for header)
   - Max height: `calc(100vh - 120px)`
   - Scrollable if TOC exceeds viewport
   - Fade gradient at bottom when scrollable

### Right Sidebar: Related Content

1. **Smart content mix**
   - Show top 5-6 related items regardless of type
   - Categorize as Article, Objection, or Blog
   - Sort by: frontmatter order, then type priority

2. **Type labeling**
   - Small badge on each item (mono font, uppercase)
   - Colors: Objections (crimson), Articles (ochre), Blogs (olive)

3. **Visual design**
   - Minimal card style
   - Hover: Subtle ochre border, light background tint
   - Title: Heading font (18px)
   - Excerpt: Body font (14px), 2 lines max

4. **Sticky positioning**
   - Same as TOC: `position: sticky; top: 100px;`
   - Max height: `calc(100vh - 120px)`
   - Scrollable if content exceeds viewport

### Responsive Behavior

**Desktop (1280px+):**
- Three-column layout: TOC (280px) | Content (max 800px) | Related (320px)
- Both sidebars sticky
- 60px gap between columns

**Tablet (768px - 1279px):**
- Hide both sidebars
- Center article content (max-width 800px)
- TOC: Floating button at top-right
- Related: Show at bottom using existing `RelatedContent` component

**Mobile (<768px):**
- Hide both sidebars
- Full-width article content
- TOC: Semi-transparent floating button when scrolled
- Related: Show at bottom in single-column grid

### Content Types

Show sidebars on all three content types:
- Articles (`/articles/[slug]`)
- Objections (`/objection-finder/[slug]`)
- Blog posts (`/blog/[slug]`)

## Implementation Approach

### Component Architecture

**New Components:**

1. **`TableOfContents` component**
   ```typescript
   interface TableOfContentsProps {
     content: string; // Article HTML/markdown
   }
   ```
   - Auto-generates TOC from H2/H3 headings
   - Tracks scroll position with Intersection Observer
   - Handles smooth scroll on click
   - Client component ('use client')

2. **`RelatedSidebar` component**
   ```typescript
   interface RelatedSidebarProps {
     relatedSlugs: string[];
     currentSlug: string;
     contentType: 'article' | 'objection' | 'blog';
   }
   ```
   - Fetches and categorizes related content
   - Shows top 5-6 items with type badges
   - Server component (data fetched on server)

**Modified Components:**

3. **Article/Objection/Blog page layouts**
   - Add three-column CSS Grid
   - Integrate TOC and RelatedSidebar components
   - Keep existing `RelatedContent` component for mobile bottom placement

### File Structure

**Create:**
- `src/components/table-of-contents.tsx` (~250 lines)
- `src/components/related-sidebar.tsx` (~150 lines)

**Modify:**
- `src/app/(site)/articles/[slug]/page.tsx` (add three-column layout)
- `src/app/(site)/objection-finder/[slug]/page.tsx` (add three-column layout)
- `src/app/(site)/blog/[slug]/page.tsx` (add three-column layout)

**Keep:**
- `src/components/related-content.tsx` (used for mobile bottom placement)

### Layout Implementation

**Desktop CSS Grid:**
```css
.article-layout {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 60px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
}

.sidebar-left,
.sidebar-right {
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
```

**Responsive Breakpoints:**
- `@media (min-width: 1280px)` → Three columns
- `@media (768px - 1279px)` → Center only + TOC button + bottom related
- `@media (max-width: 767px)` → Center only + TOC button + bottom related

### Data Flow

**TOC Data Flow:**

1. Client-side heading extraction:
   ```typescript
   interface TOCItem {
     id: string;        // "torah-basics"
     text: string;      // "Torah Basics"
     level: 2 | 3;
     children?: TOCItem[];
   }
   ```

2. Intersection Observer for active section:
   - `rootMargin: "-20% 0px -80% 0px"` (trigger in top 20% of viewport)
   - 100ms debounce on scroll events
   - `useState` tracks active heading ID

3. Smooth scroll on click:
   ```typescript
   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
   ```

**Related Sidebar Data Flow:**

1. Server-side content fetching (in page component):
   ```typescript
   const relatedItems = relatedSlugs.map(slug => {
     const article = getArticleBySlug(slug);
     const objection = getObjectionBySlug(slug);
     const blog = getBlogPostBySlug(slug);
     // Return whichever succeeds
   });
   ```

2. Type categorization:
   ```typescript
   interface RelatedItem {
     slug: string;
     type: 'article' | 'objection' | 'blog';
     title: string;
     excerpt: string;
   }
   ```

3. Sort and limit:
   - Preserve frontmatter order
   - Apply type priority if needed
   - Limit to 5-6 items

### Visual Design Specifications

**TOC Visual States:**

- **Default:**
  - Text: `text-ink-soft` (muted color)
  - Font: Body font, 14px
  - Padding: 8px 12px

- **Hover:**
  - Background: `bg-ochre/5`
  - Text: `text-ink`
  - Transition: 150ms

- **Active:**
  - Background: `bg-ochre/10`
  - Text: `text-ink font-semibold`
  - Left border: 3px solid ochre
  - Transition: 200ms

- **Nested (H3):**
  - Indent: 16px additional left padding
  - Font size: 13px
  - Slightly more muted color

**Related Sidebar Item Design:**

- **Card:**
  - Border: `border border-ink/10`
  - Padding: 16px
  - Border radius: 4px
  - Gap between items: 12px

- **Type Badge:**
  - Font: Mono, 9px, uppercase, tracking wide
  - Padding: 4px 8px
  - Background: `bg-{color}/10` (ochre/crimson/olive)
  - Text: `text-{color}` (ochre/crimson/olive)

- **Hover:**
  - Border: `border-ochre`
  - Background: `bg-ochre/5`
  - Transition: 200ms

**Mobile TOC Button:**

- **Default (scrolled):**
  - Position: Fixed top-right
  - Background: Semi-transparent parchment (`bg-parchment/80 backdrop-blur`)
  - Icon: Menu/list icon
  - Size: 48px × 48px
  - Shadow: `shadow-lg`

- **Drawer/Overlay:**
  - Slide from right or top
  - Full or 80% width overlay
  - Close button or tap-outside to dismiss

### Performance Considerations

1. **Intersection Observer:**
   - Single observer for all headings
   - Debounced state updates (100ms)
   - Cleanup on unmount

2. **Sticky Elements:**
   - CSS `will-change: transform` for smooth sticky
   - Conditional rendering of fade gradients (only when scrollable)

3. **Related Content:**
   - Server-side data fetching (no client waterfalls)
   - Static at build time for published content

4. **Mobile:**
   - Conditional rendering (not just hiding with CSS)
   - TOC drawer lazy-loads when opened

## Success Criteria

After implementation:
- TOC appears on left with auto-generated H2/H3 structure
- Current section highlights as user scrolls
- Click on TOC item smoothly scrolls to section
- Related content shows on right with type badges
- Both sidebars sticky on desktop
- Mobile: TOC button appears, related moves to bottom
- Responsive breakpoints work smoothly
- No layout shift or jank
- Matches existing site styling (parchment, ochre, serif headings)

## Out of Scope

- Manual TOC customization (always auto-generated)
- Collapsible TOC sections
- Related content sorting by tags/relevance score
- Comments section (deferred)
- TOC search/filter

## Future Enhancements

- Add "Back to top" button in TOC
- Collapsible H2 sections in TOC for very long articles
- Reading progress indicator
- Sticky header awareness (adjust top offset dynamically)
- Print styles (hide sidebars in print view)
