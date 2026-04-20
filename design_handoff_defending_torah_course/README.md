# Handoff: Defending Torah — Course Platform

## Overview
This handoff covers the full course platform for DefendingTorah.com — a Next.js + Supabase website. It includes:
- **Authentication screens** (Login, Sign Up, Forgot Password) using Supabase Auth
- **Student dashboard** (Home, Courses, Resources, Profile, Settings tabs)
- **Course experience** (Landing, Week view, Session/Lesson view with 10-step format)
- **Resource library** (Session worksheets, Memory verse cards, Key terms glossary, Objections cheat sheet, Capstone submission)
- **Completion certificate** (print-ready, PDF-saveable)

## About the Design Files
The files in this bundle are **high-fidelity HTML prototypes** — not production code. They show intended look, layout, typography, interactions, and content. Your task is to **recreate these designs in the existing Next.js codebase** using its established patterns (App Router, Tailwind CSS, existing components).

The existing site already has a full design system in `src/app/globals.css`. All CSS variables, font imports, button classes, and prose styles from that file apply here too. Do not reinvent — extend.

## Fidelity
**High-fidelity.** The prototypes use the exact same fonts, colours, CSS variables, and visual patterns as the existing site. Recreate pixel-faithfully.

---

## Design Tokens (from existing globals.css)

```css
--ink: #1a1f2e;
--ink-soft: #2d3448;
--parchment: #f4ecdc;
--parchment-deep: #ebdfc5;
--parchment-shadow: #d9c9a4;
--ochre: #b8732a;
--ochre-deep: #8a5420;
--crimson: #7a2e24;
--olive: #5c6b3f;
--muted: #574e40;
```

**Fonts** (already imported in globals.css):
- `Frank Ruhl Libre` — headings (weights 300, 400, 700, 900)
- `Cormorant Garamond` — body / prose (weights 300–600, italic)
- `JetBrains Mono` — labels, buttons, metadata (weights 400, 500)

---

## Routing Structure

```
/login                          → LoginScreen
/signup                         → SignUpScreen
/forgot-password                → ForgotScreen

/account                        → Dashboard (Home tab)
/account/courses                → Dashboard (Courses tab)
/account/resources              → Dashboard (Resources tab)
/account/profile                → Dashboard (Profile tab)
/account/settings               → Dashboard (Settings tab)

/course                         → CourseLanding
/course/week/[weekNum]          → WeekView
/course/session/[sessionId]     → SessionView

/resources/worksheet/[sessionId] → SessionWorksheet (printable)
/resources/verse-cards          → MemoryVerseCards (printable)
/resources/glossary             → KeyTermsGlossary
/resources/objections           → ObjectionsCheatSheet
/resources/capstone             → CaptoneSubmission

/certificate                    → CompletionCertificate (print-ready)
```

Auth pages (`/login`, `/signup`, `/forgot-password`) do **not** use the main site `Nav` or `Footer`. They use a full-viewport split-panel layout (see prototype).

`/account/*`, `/course/*`, `/resources/*` use the **account nav** (dark ink top bar + tab strip) — not the main site nav.

---

## Supabase Schema

### Auth
Use Supabase Auth out of the box. Email + password. Enable email confirmation.

### Tables

**`course_progress`**
```sql
id            uuid primary key default uuid_generate_v4()
user_id       uuid references auth.users(id) on delete cascade
course_id     text not null           -- e.g. 'foundations-of-defending-torah'
status        text not null           -- 'not-started' | 'in-progress' | 'finished'
current_session_id  int               -- 1–10
completed_sessions  int[]             -- array of completed session IDs
started_at    timestamptz
completed_at  timestamptz
created_at    timestamptz default now()
updated_at    timestamptz default now()
```

**`capstone_submissions`**
```sql
id            uuid primary key default uuid_generate_v4()
user_id       uuid references auth.users(id) on delete cascade
course_id     text not null
format        text not null           -- 'written' | 'recorded' | 'statement'
content_url   text                    -- storage URL for recordings
content_text  text                    -- written/statement submissions
submitted_at  timestamptz default now()
reviewed      boolean default false
```

### RLS Policies
- Users can only read/write their own `course_progress` and `capstone_submissions` rows.
- Enable RLS on both tables.

---

## Course Data Structure

Each course is a typed TypeScript file. Create one per course:

```
/content/courses/
  foundations-of-defending-torah.ts
```

**Type definition** (`/types/course.ts`):
```typescript
export type MemoryVerse = {
  ref: string;
  text: string;
};

export type Session = {
  id: number;
  title: string;
  big_idea: string;
  opening_q: string;
  scriptures: string[];
  teaching: string;
  misunderstanding: string;
  response: string;
  application: string;
  discussion: string[];
  homework: string[];
};

export type Week = {
  num: number;
  title: string;
  subtitle: string;
  memory_verse: MemoryVerse;
  sessions: Session[];
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  weeks: number;
  total_sessions: number;
  level: string;
  pillars: { num: string; title: string; body: string }[];
  weeks_data: Week[];
};
```

The full data for Course 1 is in `Defending Torah Course.html` → `course-components.jsx` → `COURSE_DATA`. Extract it verbatim into `foundations-of-defending-torah.ts`. **Do not regenerate the content** — copy it exactly from the prototype.

---

## Screens

### 1. Auth Screens (`/login`, `/signup`, `/forgot-password`)
**Layout:** Full viewport, two-column grid (50/50). Left = parchment form panel. Right = dark ink branding panel.

**Left panel:**
- Logo (shield SVG + "Defending Torah" in Frank Ruhl Libre 900, 22px)
- `MonoLabel` subtitle ("Member Access")
- Page title in Frank Ruhl Libre 300, 38px
- Form fields: bottom-border-only inputs, Cormorant Garamond italic, 19px
- Primary button: full-width, ink background, parchment text, JetBrains Mono 11.5px, tracking 0.22em, uppercase, 14px padding
- Secondary text links in JetBrains Mono 10px, ochre-deep colour

**Right panel (dark):**
- Background: `var(--ink)`
- Large Hebrew letter watermark: absolute positioned, 320px, opacity 0.04, ochre
- Scripture quote: Cormorant Garamond italic, 26px, rgba(244,236,220,0.85)
- 3px ochre rule above quote, 48px wide
- Reference label: JetBrains Mono uppercase, ochre
- Bottom course info strip: mono labels, rgba parchment 0.35 opacity

**Forgot password success state:** replace form with a parchment-deep card showing confirmation message, olive 2px top border, "Return to Sign In" ghost button.

---

### 2. Account Dashboard (`/account/*`)
**Layout:** Full-height. Dark ink sticky top bar (account nav) + scrollable content area (max-width 1200px, padding 52px 48px).

**Account nav — two rows:**
- Row 1: Logo left, "Student Portal" label + "Sign Out" button right. Background ink, border-bottom rgba parchment 0.08.
- Row 2: Tab strip. Tabs: Home, Courses, Resources, Profile, Settings. Active tab: ochre text + 2px ochre bottom border. Inactive: rgba parchment 0.5.

**Home tab:**
- Welcome heading: Frank Ruhl Libre 300, clamp(36px, 4vw, 56px). Italic ochre-deep name.
- Three summary cards side by side (1fr 1fr 1fr): Course Progress (shows % + progress bar + session count), Last Session (title + session/week label + "X days ago"), Current Memory Verse (italic blockquote + crimson reference). Each card: ink border, parchment-deep background, 3px coloured top bar (olive / ochre / crimson).
- Quick Continue CTA: full-width ink background card, ochre session label, parchment heading, ochre "Continue →" button right-aligned.

**Courses tab:**
- Page heading + course card (see Course Card section below)
- Per-session checklist (visible when in-progress or finished): ink header bar, 10 rows. Each row: checkbox (olive filled ✓ if done, ochre ▶ if current, empty if upcoming) + week/session label in mono + session title in Cormorant. "Current" badge in ochre mono on active row.
- "Coming soon" dashed border placeholder below.

**Resources tab:**
- Page heading
- 5 resource rows: icon (44×44, ochre border) + title (Frank Ruhl Libre 500, 22px) + description + "Open →" label. Link to `/resources/[key]`.

**Profile tab:** Name + email display with bottom-border underline. "Update Profile" ghost button.

**Settings tab:** Toggle rows for Email Notifications + Weekly Progress Email. Each row: title + description + pill toggle (olive filled = on). "Delete Account" danger ghost button below divider.

---

### 3. Course Card (used in Courses tab)
Three states — `not-started`, `in-progress`, `finished`:

**Common:** ink border, parchment-deep background, 3px top status bar (parchment-shadow / ochre / olive). Status badge top-right (mono uppercase, coloured border).

**Not started:** "Begin Course →" ink button.
**In progress:** Progress bar (ochre fill) + session count. "Continue — Session N →" ink button.
**Finished:** Progress bar (olive, 100%). "Download Certificate →" olive button + "Start Over" ghost button.

**Confirm Start modal:** parchment background, 3px ochre top, 12px shadow offset. Explains 5-week commitment + auto-save. "Yes, Begin Course →" ink button + "Not Yet" ghost.

**Restart modal:** Same but crimson top bar. Warns progress resets. "Yes, Restart" crimson button.

---

### 4. Course Landing (`/course`)
**Section 1 — Hero:** Two-column grid (1.2fr 1fr), 70px 64px padding, ink border-bottom.
- Left: crimson MonoLabel kicker, Frank Ruhl Libre 300 h1 (clamp 44–82px), lede paragraph, tag pills (JetBrains Mono 10px, ink borders), "Begin Week 1 →" primary button + "See Full Syllabus" ghost button.
- Right: Parchment-deep "scroll plate" card (3/4 aspect, box-shadow 18px offset ink). Inner double border (opacity 0.3). Hebrew "יֵשׁוּעַ" in Frank Ruhl Libre 300, large, right-aligned RTL. Scripture quote italic + crimson reference.
- Hebrew watermark: absolute, 280px, ink, opacity 0.03.

**Section 2 — Week Timeline:** 80px 64px padding. Heading. Five week tabs (flex, each flex:1): active = ink background, parchment text, large ochre number. Inactive = parchment-deep background. Clicking tab shows that week's sessions below.

**Expanded week panel:** ink border, parchment-deep background, 32px 40px padding. Two-column grid of session cards (ochre/crimson 3px top border, session title, big idea, tags, "Open →" button). Memory verse below (ochre left-border blockquote).

**Section 3 — Pillars:** Ink background, 3-column grid, parchment text. Six numbered pillars (ochre faded number, Cormorant Garamond heading + body in rgba parchment).

---

### 5. Week View (`/course/week/[weekNum]`)
Breadcrumb (Course → Week N) in parchment-deep bar, mono 10px, ochre links.

**Header:** Two-column (heading left, progress right). Frank Ruhl Libre 300 heading. Week N of 5 MonoLabel. Progress bar (olive fill) + "0 of 2 sessions" label.

**Session cards (2-column grid):** Each card shows completion status badge ("Complete ✓" olive / "Not started" muted / current). Title, big idea, tags, "Begin →" (ink) or "Review →" (olive) button. First card ochre top bar, second crimson.

**Memory verse:** ochre left-border blockquote, parchment-deep background.

**Week nav:** Previous week ghost button left, Next week ink button right.

---

### 6. Session View (`/course/session/[sessionId]`)
Breadcrumb: Course → Week N → Session N.

**Session header:** MonoLabel (Session N of 10 · Week N · Week Title), Frank Ruhl Libre 300 title, tag pills. Step pill strip below — 10 pills (JetBrains Mono 9px, active = ink bg, inactive = parchment-shadow border). Clicking a pill scrolls to that step.

**10 steps** (scroll down through them, max-width 820px centred):

| # | Step | Visual Treatment |
|---|------|-----------------|
| 01 | Opening Question | Ochre left-border blockquote, italic Cormorant 22px |
| 02 | Big Idea | Ink-bordered box, Frank Ruhl Libre 300, clamp 24–34px |
| 03 | Key Scriptures | List of reference rows (parchment-deep, "Read →" ochre pill) |
| 04 | Main Teaching | Cormorant 20px, line-height 1.7 |
| 05 | Common Misunderstanding | Crimson left-border, italic crimson text |
| 06 | Scriptural Response | Cormorant 20px prose |
| 07 | Application | Olive left-border blockquote, olive rgba background |
| 08 | Discussion Questions | Numbered list with large ochre numerals |
| 09 | Memory Verse | Centred card, parchment-deep, italic, crimson reference |
| 10 | Homework | Numbered rows (parchment-deep cards, ochre number) |

Each step separated by 50px padding-top, 40px padding-bottom, parchment-shadow border-bottom.

**Mark Complete CTA:** Full-width ink bar at bottom. "Mark Complete ✓" ochre button.

**Session Completion Modal:** Fixed overlay, blur backdrop. Parchment card (500px max, 12px shadow). Olive 3px top. Memory verse reminder (ochre blockquote). Homework list reminder. "Next Session →" ink button + "Stay Here" ghost.

**Resources quick-links:** Below the ink bar — mono "Resources:" label + three anchor links (Worksheet, Glossary, Objections) to `/resources/*`.

---

### 7. Resources (`/resources/*`)

All resource pages share the same dark account-nav header (same as dashboard but with "Resources" subtitle) + tab strip (Worksheet, Verse Cards, Glossary, Objections, Capstone).

**Session Worksheet** (`/resources/worksheet/[sessionId]`):
Print-ready layout. Student name + date fields (underline style) top-right. 
Sections: Scripture readings (with writing lines), Opening Question response (writing lines), Big Idea rewrite (writing lines), Homework checklist (checkbox + writing lines per item), Key Terms (2-column define-in-your-own-words grid), Memory verse write-out. Print button top-right.

**Memory Verse Cards** (`/resources/verse-cards`):
2-column grid of 5 card pairs. Front: parchment-deep, ochre left-border verse, crimson reference. Back: ink background, parchment heading (reference + week title), Hebrew text faint watermark. Print button. `@media print` hides UI chrome.

**Key Terms Glossary** (`/resources/glossary`):
14 terms as accordion list. Ink top-border. Each row: ochre number (opacity 0.4) + Frank Ruhl Libre 300 term (24px) + expand arrow. Expanded: plain definition (Cormorant 18px) + ochre-left-border root/note box (mono label + italic Cormorant).

**Objections Cheat Sheet** (`/resources/objections`):
12 objection rows. Grid: 40px number column + content column. Italic crimson objection quote (19px) + plain response (18px) + ochre 2px rule + mono Scripture reference. Print button.

**Capstone Submission** (`/resources/capstone`):
Progress reminder card (olive 3px left, shows 100% complete). Three format option cards (Written / Recorded / Statement) — selectable, radio-style with ochre border + background tint when active. Icon box (44×44, ochre border). Below selected option: file upload area (dashed border) or textarea (Cormorant italic, 19px). "Submit & Unlock Certificate →" button (ink when option selected, muted when none). Post-submit: confirmation screen with Cormorant quote + crimson reference.

---

### 8. Completion Certificate (`/certificate`)
Dark page (`#1a1a24` background). Centred white parchment card (max 760px). Double inner border (parchment-shadow + rgba ochre). Hebrew "ת" watermark (centred, 400px, opacity 0.025).

Content (centred): Logo + ornamental rule (✦) + "Certificate of Completion" MonoLabel + "This is to certify that" + student name in italic Cormorant ochre-deep + "has successfully completed" + course title box (ink border) + date (mono) + ornamental rule + Psalm 119:97 quote + crimson reference.

**Print / Save PDF button** triggers `window.print()`. Use `@media print` to hide the dark wrapper and show only the certificate card full-page.

---

## Interactions & Behaviour

- **Auth state:** Wrap `/account/*`, `/course/*`, `/resources/*` in a Supabase auth guard. Redirect unauthenticated users to `/login`.
- **Course progress:** On session complete (Mark Complete click → modal → "Next Session"), write `completed_sessions` array + `current_session_id` to Supabase `course_progress`.
- **Week locking:** Optionally lock Session 2 of each week until Session 1 is complete. Show "Not started" badge + disabled "Begin" button if locked.
- **Certificate gating:** Certificate page only accessible after `capstone_submissions` row exists for that user + course.
- **localStorage fallback:** Mirror `current_session_id` in localStorage for optimistic navigation before Supabase write confirms.
- **Print styles:** Worksheets, verse cards, objections sheet, and certificate all need `@media print` rules hiding nav/chrome.

---

## Files in This Bundle

| File | Purpose |
|------|---------|
| `Defending Torah Course.html` | Course landing, week view, session view prototype |
| `Defending Torah Auth & Dashboard.html` | Auth screens + full dashboard prototype |
| `Defending Torah Resources.html` | All 5 resource pages prototype |
| `course-components.jsx` | Course page React components + `COURSE_DATA` (extract this data verbatim) |
| `auth-dashboard-components.jsx` | Auth + dashboard React components |

---

## Implementation Order (Recommended)

1. Supabase: create tables + RLS policies + auth config
2. Auth pages (`/login`, `/signup`, `/forgot-password`) + auth guard middleware
3. Course data type + `foundations-of-defending-torah.ts` data file
4. Course pages (`/course`, `/course/week/[n]`, `/course/session/[n]`)
5. Dashboard (`/account/*`) + progress read/write
6. Resources pages (`/resources/*`)
7. Certificate page + print styles
8. Wire capstone → certificate gating
