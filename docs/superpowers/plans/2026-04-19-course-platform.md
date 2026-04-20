# Defending Torah — Course Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete course platform with auth, student dashboard, course experience, resources, and certificate — faithfully recreating the high-fidelity design handoff prototypes.

**Architecture:** Next.js App Router with route groups to separate public site (existing Nav+Footer) from course platform (AccountNav layout). Supabase Auth for email/password. Course content as static TypeScript data. Client components for interactive UI, server components where possible.

**Tech Stack:** Next.js 16 (App Router), React 19, Supabase Auth + DB, Tailwind CSS 4, TypeScript 6

**Design Reference:** All visual specs come from `design_handoff_defending_torah_course/` — the JSX component files define exact styles, the README defines exact routing/behavior.

---

## File Structure

```
src/
├── app/
│   ├── (site)/                          # Route group for existing site pages
│   │   ├── layout.tsx                   # Existing Nav + Footer
│   │   ├── page.tsx                     # Homepage (existing)
│   │   ├── articles/                    # Existing
│   │   ├── blog/                        # Existing
│   │   ├── objection-finder/            # Existing
│   │   └── torah-laws/                  # Existing
│   │
│   ├── (auth)/                          # Route group — NO Nav/Footer
│   │   ├── layout.tsx                   # Bare layout (no chrome)
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   │
│   ├── (account)/                       # Route group — AccountNav layout
│   │   ├── layout.tsx                   # AccountNav + auth guard
│   │   ├── account/
│   │   │   ├── page.tsx                 # Home tab
│   │   │   ├── courses/page.tsx         # Courses tab
│   │   │   ├── resources/page.tsx       # Resources tab
│   │   │   ├── profile/page.tsx         # Profile tab
│   │   │   └── settings/page.tsx        # Settings tab
│   │   ├── course/
│   │   │   ├── page.tsx                 # Course landing
│   │   │   ├── week/[weekNum]/page.tsx  # Week view
│   │   │   └── session/[sessionId]/page.tsx  # Session view
│   │   ├── resources/
│   │   │   ├── worksheet/[sessionId]/page.tsx
│   │   │   ├── verse-cards/page.tsx
│   │   │   ├── glossary/page.tsx
│   │   │   ├── objections/page.tsx
│   │   │   └── capstone/page.tsx
│   │   └── certificate/page.tsx
│   │
│   ├── layout.tsx                       # Root layout (fonts, globals.css only — NO Nav/Footer)
│   └── globals.css                      # Existing (extend for course pages)
│
├── components/
│   ├── nav.tsx                          # Existing
│   ├── footer.tsx                       # Existing
│   ├── course/
│   │   ├── account-nav.tsx              # Dark ink top bar + tab strip
│   │   ├── auth-layout.tsx              # Split-panel auth layout
│   │   ├── mono-label.tsx               # Reusable MonoLabel component
│   │   ├── course-card.tsx              # 3-state course card
│   │   ├── confirm-modal.tsx            # Start/Restart modals
│   │   ├── session-completion-modal.tsx # Session complete modal
│   │   ├── session-steps.tsx            # 10-step session renderer
│   │   ├── progress-bar.tsx             # Reusable progress bar
│   │   └── print-button.tsx             # window.print() trigger
│   └── ...existing components
│
├── lib/
│   ├── supabase.ts                      # Existing — extend for auth
│   ├── supabase-browser.ts              # Browser client (for auth)
│   ├── supabase-server.ts               # Server client (for SSR auth checks)
│   ├── auth.ts                          # Auth helpers (signIn, signUp, signOut, etc.)
│   ├── course-progress.ts               # CRUD for course_progress table
│   └── ...existing files
│
├── types/
│   └── course.ts                        # Course, Week, Session types
│
└── content/
    └── courses/
        └── foundations-of-defending-torah.ts  # Full course data
```

---

## Task 1: Supabase Schema — Tables + RLS

**Files:**
- Supabase migration (via MCP tool)

- [ ] **Step 1: Create `course_progress` table**

```sql
CREATE TABLE public.course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id text NOT NULL,
  status text NOT NULL DEFAULT 'not-started'
    CHECK (status IN ('not-started', 'in-progress', 'finished')),
  current_session_id int,
  completed_sessions int[] DEFAULT '{}',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON public.course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON public.course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON public.course_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

Apply via Supabase MCP `apply_migration` with name `create_course_progress`.

- [ ] **Step 2: Create `capstone_submissions` table**

```sql
CREATE TABLE public.capstone_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id text NOT NULL,
  format text NOT NULL CHECK (format IN ('written', 'recorded', 'statement')),
  content_url text,
  content_text text,
  submitted_at timestamptz DEFAULT now(),
  reviewed boolean DEFAULT false,
  UNIQUE (user_id, course_id)
);

ALTER TABLE public.capstone_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions"
  ON public.capstone_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions"
  ON public.capstone_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions"
  ON public.capstone_submissions FOR UPDATE
  USING (auth.uid() = user_id);
```

Apply via Supabase MCP `apply_migration` with name `create_capstone_submissions`.

- [ ] **Step 3: Verify tables**

Run `list_tables` via Supabase MCP. Confirm both `course_progress` and `capstone_submissions` appear with RLS enabled.

- [ ] **Step 4: Commit**

```bash
# Nothing to commit locally — schema is in Supabase
```

No local files changed in this task.

---

## Task 2: Install Supabase SSR Package + Create Auth Helpers

**Files:**
- Modify: `package.json` (add `@supabase/ssr`)
- Create: `src/lib/supabase-browser.ts`
- Create: `src/lib/supabase-server.ts`
- Create: `src/lib/auth.ts`

- [ ] **Step 1: Install `@supabase/ssr`**

```bash
cd /home/jonathan/torah/defend && npm install @supabase/ssr
```

- [ ] **Step 2: Create browser Supabase client**

Create `src/lib/supabase-browser.ts`:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 3: Create server Supabase client**

Create `src/lib/supabase-server.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored in Server Component context
          }
        },
      },
    }
  );
}
```

- [ ] **Step 4: Create auth helpers**

Create `src/lib/auth.ts`:

```typescript
"use server";

import { createClient } from "./supabase-server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) return { error: error.message };
  redirect("/account");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: { full_name: formData.get("name") as string },
    },
  });
  if (error) return { error: error.message };
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string,
    { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account` }
  );
  if (error) return { error: error.message };
  return { success: true };
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

- [ ] **Step 5: Create Supabase auth middleware**

Create `src/middleware.ts`:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/account", "/course", "/resources", "/certificate"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isProtected = protectedPaths.some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect logged-in users away from auth pages
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(
    request.nextUrl.pathname
  );
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/course/:path*",
    "/resources/:path*",
    "/certificate",
    "/login",
    "/signup",
    "/forgot-password",
  ],
};
```

- [ ] **Step 6: Run dev server to verify no errors**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

Expected: Server starts without errors. Existing pages still work.

- [ ] **Step 7: Commit**

```bash
cd /home/jonathan/torah/defend && git add src/lib/supabase-browser.ts src/lib/supabase-server.ts src/lib/auth.ts src/middleware.ts package.json package-lock.json && git commit -m "feat: add Supabase SSR auth helpers and middleware"
```

---

## Task 3: Route Groups — Restructure Layouts

**Files:**
- Create: `src/app/(site)/layout.tsx`
- Create: `src/app/(auth)/layout.tsx`
- Create: `src/app/(account)/layout.tsx`
- Modify: `src/app/layout.tsx` (remove Nav/Footer — move to site layout)
- Move: existing pages into `(site)/` route group

This task restructures the app into three route groups so auth pages and account pages get their own layouts without the main site Nav/Footer.

- [ ] **Step 1: Modify root layout to remove Nav/Footer**

Edit `src/app/layout.tsx` — remove `<Nav />` and `<Footer />` imports and usage. The root layout becomes a bare shell:

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Defending Torah — Biblical Answers for the Honest Skeptic",
    template: "%s | Defending Torah",
  },
  description:
    "Careful arguments, primary sources, and Hebrew exegesis defending the ongoing validity of God's Torah. Essays, objection responses, and verse-by-verse analysis.",
  metadataBase: new URL("https://defendingtorah.com"),
  openGraph: {
    type: "website",
    siteName: "Defending Torah",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create `(site)` route group with Nav/Footer layout**

Create `src/app/(site)/layout.tsx`:

```typescript
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

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

- [ ] **Step 3: Move existing pages into `(site)/`**

Move:
- `src/app/page.tsx` → `src/app/(site)/page.tsx`
- `src/app/articles/` → `src/app/(site)/articles/`
- `src/app/blog/` → `src/app/(site)/blog/`
- `src/app/objection-finder/` → `src/app/(site)/objection-finder/`
- `src/app/torah-laws/` → `src/app/(site)/torah-laws/`

```bash
cd /home/jonathan/torah/defend/src/app
mkdir -p "(site)"
mv page.tsx "(site)/"
mv articles "(site)/"
mv blog "(site)/"
mv objection-finder "(site)/"
mv torah-laws "(site)/"
```

- [ ] **Step 4: Create `(auth)` route group with bare layout**

Create `src/app/(auth)/layout.tsx`:

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

Create placeholder pages:
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`

Each with a simple placeholder:

```typescript
export default function LoginPage() {
  return <div>Login — coming soon</div>;
}
```

(Similar for signup and forgot-password)

- [ ] **Step 5: Create `(account)` route group with placeholder layout**

Create `src/app/(account)/layout.tsx`:

```typescript
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-parchment flex flex-col">{children}</div>;
}
```

Create placeholder pages:
- `src/app/(account)/account/page.tsx`
- `src/app/(account)/course/page.tsx`
- `src/app/(account)/certificate/page.tsx`

Each with simple placeholder text.

- [ ] **Step 6: Verify all existing routes still work**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

Visit `/`, `/articles`, `/blog`, `/objection-finder`, `/torah-laws` — all should render with Nav + Footer as before.

Visit `/login`, `/account` — should show placeholder text without Nav/Footer.

- [ ] **Step 7: Commit**

```bash
cd /home/jonathan/torah/defend && git add -A && git commit -m "refactor: route groups for site, auth, and account layouts"
```

---

## Task 4: Course Types + Data File

**Files:**
- Create: `src/types/course.ts`
- Create: `src/content/courses/foundations-of-defending-torah.ts`

- [ ] **Step 1: Create course types**

Create `src/types/course.ts`:

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

export type Pillar = {
  num: string;
  title: string;
  body: string;
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  weeks: number;
  total_sessions: number;
  level: string;
  pillars: Pillar[];
  weeks_data: Week[];
};
```

- [ ] **Step 2: Create course data file**

Create `src/content/courses/foundations-of-defending-torah.ts`. Extract `COURSE_DATA` verbatim from `design_handoff_defending_torah_course/course-components.jsx` and type it:

```typescript
import type { Course } from "@/types/course";

export const foundationsCourse: Course = {
  id: "foundations-of-defending-torah",
  title: "Foundations of Defending Torah",
  subtitle: "A beginner course in biblical continuity, obedience, and answering objections",
  weeks: 5,
  total_sessions: 10,
  level: "Beginner",
  pillars: [
    { num: "01", title: "God is consistent.", body: "His character, holiness, and standards do not shift between testaments. One God, one story." },
    { num: "02", title: "Torah is good.", body: "God's instruction reflects His wisdom and love. It is not bondage — it is the path of the righteous." },
    { num: "03", title: "Yeshua did not abolish the Father's commandments.", body: "He upheld, deepened, and lived every word of Torah. His life is the pattern." },
    { num: "04", title: "Paul must be read in context.", body: "Paul opposes misuse of Torah, not Torah itself. Difficult passages must harmonise with the whole." },
    { num: "05", title: "Grace and obedience are not enemies.", body: "Grace frees us from sin's dominion, not from holiness. Love and obedience walk together." },
    { num: "06", title: "Truth should be defended with humility.", body: "We defend doctrine as a patient older brother — never as an internet debater." },
  ],
  weeks_data: [
    // COPY ALL 5 WEEKS VERBATIM FROM course-components.jsx COURSE_DATA.weeks_data
    // The full data is in the design handoff JSX file — extract exactly as written
    // Each week has: num, title, subtitle, memory_verse, sessions[]
    // Each session has: id, title, big_idea, opening_q, scriptures[], teaching, misunderstanding, response, application, discussion[], homework[]
  ],
};
```

**IMPORTANT:** The implementer must copy all 5 weeks with all 10 sessions verbatim from `design_handoff_defending_torah_course/course-components.jsx` lines 18–113. Do not regenerate — copy exactly.

- [ ] **Step 3: Add a helper to look up course, week, session**

Add to `src/content/courses/foundations-of-defending-torah.ts`:

```typescript
export function getWeek(weekNum: number): Week | undefined {
  return foundationsCourse.weeks_data.find((w) => w.num === weekNum);
}

export function getSession(sessionId: number): { session: Session; week: Week } | undefined {
  for (const week of foundationsCourse.weeks_data) {
    const session = week.sessions.find((s) => s.id === sessionId);
    if (session) return { session, week };
  }
  return undefined;
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/jonathan/torah/defend && npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
cd /home/jonathan/torah/defend && git add src/types/course.ts src/content/courses/foundations-of-defending-torah.ts && git commit -m "feat: course type definitions and foundations course data"
```

---

## Task 5: Shared Course Components (MonoLabel, ProgressBar, Modals)

**Files:**
- Create: `src/components/course/mono-label.tsx`
- Create: `src/components/course/progress-bar.tsx`
- Create: `src/components/course/confirm-modal.tsx`
- Create: `src/components/course/session-completion-modal.tsx`
- Create: `src/components/course/print-button.tsx`

- [ ] **Step 1: Create MonoLabel**

Create `src/components/course/mono-label.tsx`:

```tsx
export function MonoLabel({
  children,
  color = "var(--crimson)",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`font-mono text-[10.5px] tracking-[0.28em] uppercase ${className}`}
      style={{ color }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create ProgressBar**

Create `src/components/course/progress-bar.tsx`:

```tsx
export function ProgressBar({
  value,
  color = "var(--olive)",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="h-1 bg-parchment-shadow rounded-sm overflow-hidden">
      <div
        className="h-full rounded-sm transition-[width] duration-500"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Create ConfirmModal (Start + Restart)**

Create `src/components/course/confirm-modal.tsx`:

```tsx
"use client";

export function ConfirmModal({
  variant,
  onConfirm,
  onCancel,
}: {
  variant: "start" | "restart";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isRestart = variant === "restart";
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(26,31,46,0.5)", backdropFilter: "blur(3px)" }}>
      <div className="bg-parchment border border-ink w-[90%]"
        style={{ maxWidth: isRestart ? 440 : 480, boxShadow: "12px 12px 0 var(--ink)" }}>
        <div className="h-[3px]" style={{ background: isRestart ? "var(--crimson)" : "var(--ochre)" }} />
        <div className="p-9 px-10">
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase mb-4"
            style={{ color: "var(--crimson)" }}>
            {isRestart ? "Confirm Reset" : "Before You Begin"}
          </div>
          <h2 className="font-heading font-light text-[30px] leading-[1.1] tracking-tight mb-4">
            {isRestart ? "Start the course again?" : "Start Foundations of Defending Torah?"}
          </h2>
          {isRestart ? (
            <p className="font-body text-[17px] leading-[1.65] mb-7" style={{ color: "var(--ink-soft)" }}>
              Your completion certificate will remain available. Your session progress will reset to Session 1. This cannot be undone.
            </p>
          ) : (
            <>
              <p className="font-body text-[18px] leading-[1.65] mb-3" style={{ color: "var(--ink-soft)" }}>
                This course takes approximately <strong>5 weeks</strong> to complete, with two sessions per week. Each session includes teaching, discussion questions, and homework.
              </p>
              <p className="font-body text-[17px] leading-[1.6] mb-7 italic" style={{ color: "var(--ink-soft)" }}>
                Your progress will be saved automatically. You can return any time and continue where you left off.
              </p>
            </>
          )}
          <div className="flex gap-3 flex-wrap">
            <button onClick={onConfirm} className="btn flex-1"
              style={{
                background: isRestart ? "var(--crimson)" : "var(--ink)",
                color: isRestart ? "white" : "var(--parchment)",
                border: "none",
                justifyContent: "center",
              }}>
              {isRestart ? "Yes, Restart" : "Yes, Begin Course →"}
            </button>
            <button onClick={onCancel} className="btn btn-ghost" style={{ justifyContent: "center" }}>
              {isRestart ? "Cancel" : "Not Yet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create SessionCompletionModal**

Create `src/components/course/session-completion-modal.tsx`:

```tsx
"use client";

import type { Session, Week } from "@/types/course";
import { MonoLabel } from "./mono-label";

export function SessionCompletionModal({
  session,
  week,
  onContinue,
  onStay,
}: {
  session: Session;
  week: Week;
  onContinue: () => void;
  onStay: () => void;
}) {
  const isLast = session.id === 10;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(26,31,46,0.55)", backdropFilter: "blur(3px)" }}>
      <div className="bg-parchment border border-ink w-[90%]"
        style={{ maxWidth: 500, boxShadow: "12px 12px 0 var(--ink)" }}>
        <div className="h-[3px] bg-olive" />
        <div className="p-9 px-10">
          <MonoLabel color="var(--olive)" className="mb-4">Session Complete</MonoLabel>
          <h2 className="font-heading font-light text-[30px] leading-[1.1] tracking-tight mb-3.5">
            Well done — Session {session.id} finished.
          </h2>

          {/* Memory verse reminder */}
          <div className="mb-5 p-3.5 px-[18px]"
            style={{ borderLeft: "2px solid var(--ochre)", background: "rgba(184,115,42,0.06)" }}>
            <MonoLabel color="var(--ochre)" className="mb-2 text-[9.5px]">
              Week {week.num} Memory Verse — Do you know it?
            </MonoLabel>
            <p className="font-body italic text-[17px] leading-[1.6] mb-1.5" style={{ color: "var(--ink-soft)" }}>
              &ldquo;{week.memory_verse.text}&rdquo;
            </p>
            <MonoLabel color="var(--crimson)" className="text-[9.5px]">
              — {week.memory_verse.ref}
            </MonoLabel>
          </div>

          {/* Homework reminder */}
          <div className="border border-parchment-shadow p-3.5 px-[18px] bg-parchment-deep mb-6">
            <MonoLabel color="var(--muted)" className="mb-2.5 text-[9.5px]">
              Before the next session — complete your homework:
            </MonoLabel>
            {session.homework.map((hw, i) => (
              <div key={i} className="flex gap-2.5 items-start mb-1.5">
                <span className="font-mono text-[10px] text-ochre shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-[15px] leading-[1.5]" style={{ color: "var(--ink-soft)" }}>{hw}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button onClick={onContinue} className="btn flex-1"
              style={{
                background: isLast ? "var(--olive)" : "var(--ink)",
                color: isLast ? "white" : "var(--parchment)",
                border: "none",
                justifyContent: "center",
              }}>
              {isLast ? "Go to Capstone →" : "Next Session →"}
            </button>
            <button onClick={onStay} className="btn btn-ghost" style={{ justifyContent: "center" }}>
              Stay Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create PrintButton**

Create `src/components/course/print-button.tsx`:

```tsx
"use client";

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className={`btn font-mono text-[10px] tracking-[0.18em] uppercase bg-ochre text-white border-none px-4 py-2 cursor-pointer ${className}`}
    >
      Print / Save PDF ↓
    </button>
  );
}
```

- [ ] **Step 6: Verify build**

```bash
cd /home/jonathan/torah/defend && npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
cd /home/jonathan/torah/defend && git add src/components/course/ && git commit -m "feat: shared course components (MonoLabel, ProgressBar, modals, PrintButton)"
```

---

## Task 6: Auth Pages (Login, Signup, Forgot Password)

**Files:**
- Create: `src/components/course/auth-layout.tsx`
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/(auth)/signup/page.tsx`
- Modify: `src/app/(auth)/forgot-password/page.tsx`

- [ ] **Step 1: Create AuthLayout component**

Create `src/components/course/auth-layout.tsx`:

Implement the split-panel layout exactly as defined in `auth-dashboard-components.jsx` `AuthLayout` function. Two-column grid (1fr 1fr), left = parchment form panel with logo, right = dark ink branding panel with Hebrew watermark, scripture quote, and course info strip.

Use Tailwind classes matching the existing codebase style. Reference the JSX prototype for exact sizing, spacing, and typography.

Key details from the prototype:
- Logo: shield SVG + "Defending Torah" Frank Ruhl Libre 900 22px
- "Member Access" mono label
- Right panel: `var(--ink)` background, "ת" Hebrew watermark 320px at opacity 0.04
- 3px ochre rule, scripture quote italic 26px, reference mono label
- Bottom course info strip in rgba parchment 0.35

```tsx
"use client";

import Link from "next/link";

export function AuthLayout({
  children,
  title,
  subtitle,
  scripture,
  scriptureRef,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  scripture: string;
  scriptureRef: string;
}) {
  return (
    <div className="grid grid-cols-2 min-h-screen max-md:grid-cols-1">
      {/* Left: form */}
      <div className="bg-parchment flex flex-col justify-center relative"
        style={{ padding: "60px 64px" }}>
        {/* Logo */}
        <div className="mb-[52px]">
          <Link href="/" className="flex items-center gap-2 no-underline mb-1">
            <svg className="w-[22px] h-[22px]" viewBox="0 0 32 32" fill="none">
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
            </svg>
            <span className="font-heading font-black text-[22px] tracking-tight">Defending Torah</span>
          </Link>
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted">Member Access</span>
        </div>
        <div className="max-w-[380px]">
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-crimson mb-3.5">{subtitle}</div>
          <h1 className="font-heading font-light text-[38px] leading-[1.05] tracking-tight mb-9">{title}</h1>
          {children}
        </div>
      </div>

      {/* Right: branding */}
      <div className="flex flex-col justify-center relative overflow-hidden max-md:hidden"
        style={{ background: "var(--ink)", padding: "60px 64px" }}>
        {/* Hebrew watermark */}
        <div className="absolute font-heading font-black leading-none select-none pointer-events-none"
          style={{ top: -20, right: -20, fontSize: 320, opacity: 0.04, color: "var(--ochre)" }}>ת</div>

        {/* Bottom info strip */}
        <div className="absolute left-10 right-10 bottom-10">
          <div className="h-px mb-7" style={{ background: "rgba(244,236,220,0.1)" }} />
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-ochre mb-4">Course Platform</div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase leading-[1.8]"
            style={{ color: "rgba(244,236,220,0.35)" }}>
            <div>Foundations of Defending Torah</div>
            <div>5 Weeks · 10 Sessions</div>
            <div>Beginner Level</div>
          </div>
        </div>

        {/* Scripture quote */}
        <div className="relative z-[1]">
          <div className="h-[3px] w-12 bg-ochre mb-7" />
          <p className="font-body italic text-[26px] leading-[1.55] mb-4"
            style={{ color: "rgba(244,236,220,0.85)" }}>
            &ldquo;{scripture}&rdquo;
          </p>
          <div className="font-mono text-[10.5px] tracking-[0.28em] uppercase text-ochre">
            — {scriptureRef}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build Login page**

Replace `src/app/(auth)/login/page.tsx` with the full login implementation. Use server action for form submission. Reference the prototype for field styling (bottom-border inputs, Cormorant italic 19px).

```tsx
"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/course/auth-layout";
import { signIn } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to your account"
      scripture="Oh how I love your Torah! It is my meditation all the day."
      scriptureRef="Psalm 119:97"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-crimson mb-4 p-3 border border-crimson/30 bg-crimson/5">
            {error}
          </div>
        )}
        <div className="mb-5">
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]">Email address</label>
          <input name="email" type="email" required placeholder="you@example.com"
            className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors" />
        </div>
        <div className="mb-5">
          <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]">Password</label>
          <input name="password" type="password" required placeholder="············"
            className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors" />
        </div>
        <div className="flex justify-end mb-7 -mt-2">
          <Link href="/forgot-password" className="bg-transparent border-none font-mono text-[10px] tracking-[0.15em] uppercase text-ochre-deep underline">
            Forgot password?
          </Link>
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center mb-4">
          {loading ? "Signing in..." : "Sign In →"}
        </button>
        <div className="text-center font-mono text-[10px] tracking-[0.15em] uppercase text-muted mt-5">
          No account?{" "}
          <Link href="/signup" className="text-ochre-deep underline">Create one</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
```

- [ ] **Step 3: Build Signup page**

Replace `src/app/(auth)/signup/page.tsx` following the same pattern. Fields: Full name, Email, Password, Confirm password. Scripture: "Study to show yourself approved..." — 2 Timothy 2:15. Include the terms notice at the bottom.

- [ ] **Step 4: Build Forgot Password page**

Replace `src/app/(auth)/forgot-password/page.tsx` with the two-state component (form + confirmation). Success state shows parchment-deep card with olive top border and "Return to Sign In" ghost button.

- [ ] **Step 5: Verify auth pages render**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

Visit `/login`, `/signup`, `/forgot-password`. Verify split-panel layout matches the prototype.

- [ ] **Step 6: Commit**

```bash
cd /home/jonathan/torah/defend && git add src/components/course/auth-layout.tsx "src/app/(auth)/" && git commit -m "feat: auth pages (login, signup, forgot-password) with split-panel layout"
```

---

## Task 7: Account Nav + Dashboard Layout

**Files:**
- Create: `src/components/course/account-nav.tsx`
- Modify: `src/app/(account)/layout.tsx`

- [ ] **Step 1: Create AccountNav**

Create `src/components/course/account-nav.tsx`:

Two-row dark header. Row 1: logo + "Student Portal" + "Sign Out". Row 2: tab strip with 5 tabs. Active = ochre text + 2px bottom border. Match `auth-dashboard-components.jsx` `AccountLayout` exactly.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth";

const tabs = [
  { key: "home", label: "Home", href: "/account" },
  { key: "courses", label: "Courses", href: "/account/courses" },
  { key: "resources", label: "Resources", href: "/account/resources" },
  { key: "profile", label: "Profile", href: "/account/profile" },
  { key: "settings", label: "Settings", href: "/account/settings" },
];

export function AccountNav() {
  const pathname = usePathname();

  function getActiveTab() {
    if (pathname === "/account") return "home";
    for (const tab of tabs) {
      if (tab.href !== "/account" && pathname.startsWith(tab.href)) return tab.key;
    }
    return null;
  }

  const activeTab = getActiveTab();
  // Show nav on /account/* pages, hide on /course/*, /resources/*, /certificate
  const showTabs = pathname.startsWith("/account");

  return (
    <div className="bg-ink sticky top-0 z-50" style={{ borderBottom: "1px solid rgba(244,236,220,0.12)" }}>
      {/* Top bar */}
      <div className="flex justify-between items-center px-12 py-2.5" style={{ borderBottom: "1px solid rgba(244,236,220,0.08)" }}>
        <Link href="/account" className="flex items-center gap-2 no-underline">
          <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
            <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
            <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
            <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
          </svg>
          <span className="font-heading font-black text-[18px] text-parchment tracking-tight">Defending Torah</span>
        </Link>
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "rgba(244,236,220,0.5)" }}>Student Portal</span>
          <button
            onClick={() => signOut()}
            className="font-mono text-[10px] tracking-[0.15em] uppercase px-3 py-[5px] cursor-pointer bg-transparent"
            style={{ border: "1px solid rgba(244,236,220,0.2)", color: "rgba(244,236,220,0.6)" }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tab bar */}
      {showTabs && (
        <div className="flex px-12">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className="font-mono text-[10.5px] tracking-[0.2em] uppercase px-6 py-4 no-underline transition-all"
              style={{
                borderBottom: activeTab === t.key ? "2px solid var(--ochre)" : "2px solid transparent",
                color: activeTab === t.key ? "var(--ochre)" : "rgba(244,236,220,0.5)",
              }}
            >
              {t.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Update account layout**

Replace `src/app/(account)/layout.tsx`:

```tsx
import { AccountNav } from "@/components/course/account-nav";

export default function AccountGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <AccountNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Verify layout renders**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

Visit `/account`. Verify dark nav appears with logo, Student Portal label, Sign Out button, and 5 tabs.

- [ ] **Step 4: Commit**

```bash
cd /home/jonathan/torah/defend && git add src/components/course/account-nav.tsx "src/app/(account)/layout.tsx" && git commit -m "feat: account nav with tab strip and auth guard layout"
```

---

## Task 8: Course Progress Helpers

**Files:**
- Create: `src/lib/course-progress.ts`

- [ ] **Step 1: Create course progress CRUD**

Create `src/lib/course-progress.ts`:

```typescript
"use server";

import { createClient } from "./supabase-server";
import { getUser } from "./auth";

export type CourseProgress = {
  id: string;
  user_id: string;
  course_id: string;
  status: "not-started" | "in-progress" | "finished";
  current_session_id: number | null;
  completed_sessions: number[];
  started_at: string | null;
  completed_at: string | null;
};

export async function getCourseProgress(courseId: string): Promise<CourseProgress | null> {
  const user = await getUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("course_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();
  return data as CourseProgress | null;
}

export async function startCourse(courseId: string): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  await supabase.from("course_progress").upsert({
    user_id: user.id,
    course_id: courseId,
    status: "in-progress",
    current_session_id: 1,
    completed_sessions: [],
    started_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,course_id" });
}

export async function completeSession(courseId: string, sessionId: number, totalSessions: number): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  const progress = await getCourseProgress(courseId);
  if (!progress) return;

  const completed = [...new Set([...(progress.completed_sessions || []), sessionId])];
  const nextSession = sessionId < totalSessions ? sessionId + 1 : sessionId;
  const isFinished = completed.length >= totalSessions;

  await supabase.from("course_progress").update({
    completed_sessions: completed,
    current_session_id: nextSession,
    status: isFinished ? "finished" : "in-progress",
    completed_at: isFinished ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }).eq("id", progress.id);
}

export async function resetCourse(courseId: string): Promise<void> {
  const user = await getUser();
  if (!user) return;
  const supabase = await createClient();
  await supabase.from("course_progress").update({
    status: "in-progress",
    current_session_id: 1,
    completed_sessions: [],
    started_at: new Date().toISOString(),
    completed_at: null,
    updated_at: new Date().toISOString(),
  }).eq("user_id", user.id).eq("course_id", courseId);
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/jonathan/torah/defend && git add src/lib/course-progress.ts && git commit -m "feat: course progress CRUD helpers"
```

---

## Task 9: Dashboard Pages (Home, Courses, Resources, Profile, Settings)

**Files:**
- Modify: `src/app/(account)/account/page.tsx` (Home tab)
- Create: `src/app/(account)/account/courses/page.tsx`
- Create: `src/app/(account)/account/resources/page.tsx`
- Create: `src/app/(account)/account/profile/page.tsx`
- Create: `src/app/(account)/account/settings/page.tsx`
- Create: `src/components/course/course-card.tsx`
- Create: `src/components/course/dashboard-home.tsx`
- Create: `src/components/course/dashboard-courses.tsx`

Each page is a separate file matching the prototype exactly. Reference `auth-dashboard-components.jsx` for:
- `DashboardHome`: welcome heading, 3 summary cards, quick continue CTA
- `DashboardCourses`: CourseCard (3 states) + session checklist + "Coming soon" placeholder
- `DashboardResources`: 5 resource rows linking to `/resources/*`
- `DashboardProfile`: name + email display
- `DashboardSettings`: toggles + delete account

- [ ] **Step 1: Create CourseCard component**

Create `src/components/course/course-card.tsx`. Implement the 3-state card (not-started, in-progress, finished) exactly as in the prototype. Include status badge, progress bar, meta tags, and action buttons.

- [ ] **Step 2: Create Dashboard Home page**

Create/replace `src/app/(account)/account/page.tsx`. Server component that fetches course progress, renders welcome heading with user name, 3 summary cards, and quick continue CTA. Reference `DashboardHome` in prototype. Content area max-width 1200px, padding 52px 48px.

- [ ] **Step 3: Create Dashboard Courses page**

Create `src/app/(account)/account/courses/page.tsx`. Server component + client interactivity for modals. Shows CourseCard + session checklist (10 rows with checkboxes) + "Coming soon" dashed placeholder.

- [ ] **Step 4: Create Dashboard Resources page**

Create `src/app/(account)/account/resources/page.tsx`. 5 resource rows with icons linking to `/resources/*`.

- [ ] **Step 5: Create Dashboard Profile page**

Create `src/app/(account)/account/profile/page.tsx`. Name + email from auth user. "Update Profile" ghost button.

- [ ] **Step 6: Create Dashboard Settings page**

Create `src/app/(account)/account/settings/page.tsx`. Two toggle rows + delete account danger button.

- [ ] **Step 7: Verify all dashboard tabs render**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

Visit `/account`, `/account/courses`, `/account/resources`, `/account/profile`, `/account/settings`.

- [ ] **Step 8: Commit**

```bash
cd /home/jonathan/torah/defend && git add "src/app/(account)/account/" src/components/course/course-card.tsx && git commit -m "feat: dashboard pages (home, courses, resources, profile, settings)"
```

---

## Task 10: Course Landing Page

**Files:**
- Modify: `src/app/(account)/course/page.tsx`

- [ ] **Step 1: Build course landing page**

Replace `src/app/(account)/course/page.tsx` with the full landing page. Three sections:

1. **Hero** — Two-column grid (1.2fr 1fr). Left: kicker, h1 with "defend" italic, lede paragraph, tag pills, two buttons. Right: scroll plate card with Hebrew, scripture quote. Hebrew watermark absolute.

2. **Week Timeline** — 5 week tabs (clickable, client-side state). Active week shows expanded session cards below in 2-column grid + memory verse. This section needs `"use client"`.

3. **Pillars** — Ink background, 3-column grid, 6 pillars.

Reference `course-components.jsx` `CourseLanding` for exact implementation.

- [ ] **Step 2: Verify page renders**

Visit `/course`. Verify all three sections render correctly.

- [ ] **Step 3: Commit**

```bash
cd /home/jonathan/torah/defend && git add "src/app/(account)/course/page.tsx" && git commit -m "feat: course landing page with hero, week timeline, and pillars"
```

---

## Task 11: Week View Page

**Files:**
- Create: `src/app/(account)/course/week/[weekNum]/page.tsx`

- [ ] **Step 1: Build week view page**

Reference `course-components.jsx` `WeekView`. Breadcrumb, header with progress, 2 session cards, memory verse, week navigation buttons. Read course progress from Supabase to show completion status.

- [ ] **Step 2: Verify page renders**

Visit `/course/week/1`, `/course/week/3`. Verify layout, session cards, nav buttons.

- [ ] **Step 3: Commit**

```bash
cd /home/jonathan/torah/defend && git add "src/app/(account)/course/week/" && git commit -m "feat: week view page with session cards and progress"
```

---

## Task 12: Session View Page

**Files:**
- Create: `src/app/(account)/course/session/[sessionId]/page.tsx`
- Create: `src/components/course/session-steps.tsx`

- [ ] **Step 1: Create SessionSteps component**

Create `src/components/course/session-steps.tsx`. Renders the 10-step format with:
- Step pill strip (clickable, scrolls to step)
- Step refs for scroll targeting
- Each step with its visual treatment per the README table
- Mark Complete CTA bar at bottom
- Resource quick-links below

Reference `course-components.jsx` `SessionView` and `STEPS` array for exact implementation.

- [ ] **Step 2: Build session view page**

Create `src/app/(account)/course/session/[sessionId]/page.tsx`. Breadcrumb + header + SessionSteps component + completion modal. On "Mark Complete" click, call `completeSession()` server action, show `SessionCompletionModal`.

- [ ] **Step 3: Verify page renders**

Visit `/course/session/1`, `/course/session/5`. Verify all 10 steps render, pill strip works, mark complete triggers modal.

- [ ] **Step 4: Commit**

```bash
cd /home/jonathan/torah/defend && git add "src/app/(account)/course/session/" src/components/course/session-steps.tsx && git commit -m "feat: session view with 10-step format and completion flow"
```

---

## Task 13: Resource Pages (Worksheet, Verse Cards, Glossary, Objections, Capstone)

**Files:**
- Create: `src/app/(account)/resources/worksheet/[sessionId]/page.tsx`
- Create: `src/app/(account)/resources/verse-cards/page.tsx`
- Create: `src/app/(account)/resources/glossary/page.tsx`
- Create: `src/app/(account)/resources/objections/page.tsx`
- Create: `src/app/(account)/resources/capstone/page.tsx`

Reference `design_handoff_defending_torah_course/Defending Torah Resources.html` and `README.md` section 7 for exact visual specs.

- [ ] **Step 1: Build Session Worksheet page**

Print-ready layout with student name/date fields, scripture reading sections with writing lines, opening question response area, big idea rewrite, homework checklist, key terms grid, memory verse write-out. Include `@media print` styles. `PrintButton` top-right.

- [ ] **Step 2: Build Memory Verse Cards page**

2-column grid of 5 card pairs (front/back). Front: parchment-deep with verse. Back: ink background with reference. Print button. `@media print` hides chrome.

- [ ] **Step 3: Build Key Terms Glossary page**

14 terms as accordion. Ink top-border per row. Ochre number + Frank Ruhl Libre term. Expand to show definition + root/note box. Client component for accordion state.

NOTE: The glossary terms are not in `COURSE_DATA`. They must be defined in this file or extracted from the HTML prototype. The implementer should read `Defending Torah Resources.html` to get the exact 14 terms and definitions.

- [ ] **Step 4: Build Objections Cheat Sheet page**

12 objection rows. Grid: number + content. Italic crimson objection + plain response + ochre rule + scripture reference. Print button.

NOTE: The 12 objections are not in `COURSE_DATA`. Extract from `Defending Torah Resources.html`.

- [ ] **Step 5: Build Capstone Submission page**

Progress reminder card. Three format option cards (radio-style). File upload area or textarea based on selection. Submit button. Post-submit confirmation. Wire to `capstone_submissions` table.

- [ ] **Step 6: Add print styles to globals.css**

Append `@media print` rules to `src/app/globals.css`:

```css
/* ────────── PRINT STYLES ────────── */
@media print {
  body::before { display: none !important; }
  .no-print, .account-nav, nav, footer { display: none !important; }
  body { background: white !important; }
}
```

- [ ] **Step 7: Verify all resource pages render**

Visit each resource page. Verify print button works (`Ctrl+P` preview shows clean output).

- [ ] **Step 8: Commit**

```bash
cd /home/jonathan/torah/defend && git add "src/app/(account)/resources/" src/app/globals.css && git commit -m "feat: resource pages (worksheet, verse cards, glossary, objections, capstone)"
```

---

## Task 14: Completion Certificate Page

**Files:**
- Create: `src/app/(account)/certificate/page.tsx`

- [ ] **Step 1: Build certificate page**

Reference `auth-dashboard-components.jsx` `CompletionCertificate`. Dark page (#1a1a24), centred white parchment card (max 760px), double inner border, Hebrew "ת" watermark centred 400px opacity 0.025.

Content: logo, ornamental rule, "Certificate of Completion" MonoLabel, student name italic ochre-deep, course title box, completion date, Psalm 119:97 quote.

Gate: check `capstone_submissions` for this user. If no submission, redirect to `/resources/capstone`.

"Back to Dashboard" + "Print / Save PDF" buttons above certificate.

`@media print`: hide dark wrapper, show certificate card full-page.

- [ ] **Step 2: Add certificate print styles**

Add to `globals.css`:

```css
@media print {
  .certificate-wrapper { background: white !important; padding: 0 !important; }
  .certificate-actions { display: none !important; }
  #certificate { box-shadow: none !important; max-width: none !important; }
}
```

- [ ] **Step 3: Verify certificate renders and prints cleanly**

Visit `/certificate`. Verify layout matches prototype. Print preview shows clean certificate.

- [ ] **Step 4: Commit**

```bash
cd /home/jonathan/torah/defend && git add "src/app/(account)/certificate/" src/app/globals.css && git commit -m "feat: completion certificate with print styles and capstone gating"
```

---

## Task 15: Integration Wiring + Final Polish

**Files:**
- Various — fixing connections between systems

- [ ] **Step 1: Wire "Begin Course" flow**

In dashboard courses page, "Begin Course" button → ConfirmModal → `startCourse()` server action → redirect to `/course/session/1`.

- [ ] **Step 2: Wire "Continue" flow**

Dashboard home "Continue" CTA → navigate to `/course/session/[current_session_id]`.

- [ ] **Step 3: Wire session completion → next session**

SessionCompletionModal "Next Session" → `completeSession()` → navigate to next session. "Go to Capstone" (session 10) → navigate to `/resources/capstone`.

- [ ] **Step 4: Wire certificate gating**

Certificate page: server-side check for `capstone_submissions` row. No row → redirect to `/resources/capstone`.

- [ ] **Step 5: localStorage fallback for optimistic navigation**

In session view client component, mirror `current_session_id` to localStorage before Supabase write confirms. Read from localStorage for instant navigation.

- [ ] **Step 6: Full smoke test**

1. Visit `/login` → sign up → redirected to `/account`
2. Dashboard home shows welcome, empty progress
3. `/account/courses` → "Begin Course" → modal → confirm → redirected to session 1
4. Complete session 1 → modal → "Next Session" → session 2
5. `/account` → shows progress card updated
6. `/resources/glossary` → accordion works
7. Complete all 10 sessions → capstone → submit → certificate
8. Print certificate

- [ ] **Step 7: Commit**

```bash
cd /home/jonathan/torah/defend && git add -A && git commit -m "feat: wire course flows — start, continue, complete, certificate gating"
```

---

## Summary

| Task | Description | Est. Complexity |
|------|-------------|-----------------|
| 1 | Supabase schema (tables + RLS) | Low |
| 2 | Supabase SSR + auth helpers + middleware | Medium |
| 3 | Route groups (restructure layouts) | Medium |
| 4 | Course types + data file | Low |
| 5 | Shared course components | Medium |
| 6 | Auth pages (login, signup, forgot-password) | High |
| 7 | Account nav + dashboard layout | Medium |
| 8 | Course progress helpers | Low |
| 9 | Dashboard pages (5 tabs) | High |
| 10 | Course landing page | High |
| 11 | Week view page | Medium |
| 12 | Session view page | High |
| 13 | Resource pages (5 pages) | High |
| 14 | Certificate page | Medium |
| 15 | Integration wiring + polish | Medium |
