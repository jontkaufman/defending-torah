# Email Signup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** First-time visitors see an immediate signup modal; after dismissal a persistent FAB keeps the option visible; emails are stored in Supabase and the site owner gets a Resend notification per signup.

**Architecture:** Three new files (API route, modal component, FAB component) plus one layout modification. Client components own all localStorage/sessionStorage logic so static page caching is unaffected. The API route is the only dynamic endpoint.

**Tech Stack:** Next.js App Router, Supabase (`@supabase/supabase-js`), Resend (`resend`), Tailwind CSS, lucide-react

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/app/api/subscribe/route.ts` | Create | Validate email, insert to Supabase, send Resend notification |
| `src/components/email-signup-modal.tsx` | Create | Modal UI + form submit logic |
| `src/components/email-signup-fab.tsx` | Create | Owns all state logic, renders FAB + modal |
| `src/app/(site)/layout.tsx` | Modify | Mount `<EmailSignupFab />` |

---

## Task 1: Install Resend

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
cd /home/jonathan/torah/defend && npm install resend
```

Expected output: `added 1 package` (or similar), no errors.

- [ ] **Step 2: Verify it appears in package.json**

Check that `"resend"` appears in the `dependencies` section of `package.json`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install resend"
```

---

## Task 2: API Route — `/api/subscribe`

**Files:**
- Create: `src/app/api/subscribe/route.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/app/api/subscribe/route.ts
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSupabase() {
  const url = process.env.SUPABASE_SUBSCRIBERS_URL;
  const key = process.env.SUPABASE_SUBSCRIBERS_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase subscribers env vars");
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  let email: string;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const supabase = getSupabase();

  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      // unique constraint — already subscribed
      return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
    }
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // Fire-and-forget admin notification — never fail the request over this
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: "jontkaufman@gmail.com",
        subject: `New subscriber: ${email}`,
        text: `New subscriber on Defending Torah:\n\n${email}\n\nTime: ${new Date().toISOString()}`,
      });
    }
  } catch (err) {
    console.error("Resend notification failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/jonathan/torah/defend && npx tsc --noEmit
```

Expected: no errors related to `subscribe/route.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/subscribe/route.ts
git commit -m "feat: add /api/subscribe route with Supabase insert and Resend notification"
```

---

## Task 3: EmailSignupModal Component

**Files:**
- Create: `src/components/email-signup-modal.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/email-signup-modal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export function EmailSignupModal({ open, onClose, onSubscribed }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        onSubscribed();
        return;
      }

      const data = await res.json();
      if (res.status === 409) {
        setError("You're already on the list.");
      } else if (data?.error) {
        setError(data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign up for updates"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-parchment border border-ink w-full max-w-md p-10 shadow-[8px_8px_0_0_var(--ink)]">
        {/* Inner border */}
        <div className="absolute inset-2 border border-ink/20 pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Kicker */}
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson mb-4 flex items-center gap-3">
          <span className="w-6 h-px bg-crimson" />
          Stay in the Scroll
        </div>

        <h2 className="font-heading font-light text-[32px] leading-[1.1] tracking-tight text-ink mb-3">
          New essays, objections answered,<br />
          <em className="font-body italic text-ochre-deep">straight to your inbox.</em>
        </h2>

        <p className="text-[15px] text-ink-soft leading-[1.55] mb-7">
          No noise. Just careful arguments and primary sources when new content drops.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-0 border border-ink">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 font-body text-[16px] text-ink placeholder:text-muted outline-none"
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary !py-3 !px-5 shrink-0"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </div>

          {error && (
            <p className="mt-3 font-mono text-[11px] text-crimson tracking-wide">
              {error}
            </p>
          )}
        </form>

        <p className="mt-5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/jonathan/torah/defend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/email-signup-modal.tsx
git commit -m "feat: add EmailSignupModal component"
```

---

## Task 4: EmailSignupFab Component

**Files:**
- Create: `src/components/email-signup-fab.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/email-signup-fab.tsx
"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { EmailSignupModal } from "./email-signup-modal";

const LS_SEEN = "signup_seen";
const LS_SUBSCRIBED = "signup_subscribed";
const SS_FAB_CLOSED = "signup_fab_closed";

type View = "hidden" | "modal" | "fab";

export function EmailSignupFab() {
  const [view, setView] = useState<View>("hidden");

  useEffect(() => {
    if (localStorage.getItem(LS_SUBSCRIBED)) {
      setView("hidden");
      return;
    }
    if (localStorage.getItem(LS_SEEN)) {
      if (sessionStorage.getItem(SS_FAB_CLOSED)) {
        setView("hidden");
      } else {
        setView("fab");
      }
      return;
    }
    // First visit
    localStorage.setItem(LS_SEEN, "1");
    setView("modal");
  }, []);

  function handleModalClose() {
    setView("fab");
  }

  function handleSubscribed() {
    localStorage.setItem(LS_SUBSCRIBED, "1");
    setView("hidden");
  }

  function handleFabClose() {
    sessionStorage.setItem(SS_FAB_CLOSED, "1");
    setView("hidden");
  }

  if (view === "hidden") return null;

  return (
    <>
      <EmailSignupModal
        open={view === "modal"}
        onClose={handleModalClose}
        onSubscribed={handleSubscribed}
      />

      {view === "fab" && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
          <button
            onClick={() => setView("modal")}
            className="flex items-center gap-2.5 bg-ink text-parchment px-4 py-3 font-mono text-[10.5px] tracking-[0.18em] uppercase border border-ink shadow-[4px_4px_0_0_var(--ochre)] hover:bg-ochre hover:border-ochre transition-all duration-200"
            aria-label="Sign up for updates"
          >
            <Mail size={14} />
            Updates
          </button>
          <button
            onClick={handleFabClose}
            className="bg-ink text-parchment p-2 border border-ink hover:bg-ochre hover:border-ochre transition-all duration-200"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/jonathan/torah/defend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/email-signup-fab.tsx
git commit -m "feat: add EmailSignupFab component with localStorage/sessionStorage state"
```

---

## Task 5: Wire Into Site Layout

**Files:**
- Modify: `src/app/(site)/layout.tsx`

- [ ] **Step 1: Add EmailSignupFab to layout**

Replace the entire file content:

```tsx
// src/app/(site)/layout.tsx
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { EmailSignupFab } from "@/components/email-signup-fab";

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
      <EmailSignupFab />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/jonathan/torah/defend && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/(site)/layout.tsx
git commit -m "feat: mount EmailSignupFab in site layout"
```

---

## Task 6: Manual Verification

- [ ] **Step 1: Start dev server**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

- [ ] **Step 2: Test first-visit modal**

1. Open `http://localhost:3000` in an incognito window (clean localStorage)
2. Modal should appear immediately
3. Dismiss it — modal closes, FAB appears bottom-right
4. Reload page — FAB visible, modal does not reappear

- [ ] **Step 3: Test FAB close**

1. Click × on FAB — FAB hides
2. Reload page — FAB visible again (sessionStorage cleared on new tab/reload)
3. Open new tab to `http://localhost:3000` — FAB visible (new session)

- [ ] **Step 4: Test subscription (requires env vars set)**

1. Click FAB to open modal
2. Enter a valid email and submit
3. FAB and modal both disappear permanently
4. Reload — neither appears
5. Check birdboykaufman Supabase dashboard → Table Editor → `subscribers` — email row present
6. Check `jontkaufman@gmail.com` inbox — notification email received

- [ ] **Step 5: Test duplicate**

1. Clear `signup_subscribed` from localStorage (DevTools → Application → Local Storage → delete key)
2. Open modal, submit same email
3. Error "You're already on the list." appears inline

- [ ] **Step 6: Test invalid email**

1. Open modal, enter `notanemail`, submit
2. Error "Please enter a valid email address." appears inline

- [ ] **Step 7: Commit any fixes found during testing**

```bash
git add -p
git commit -m "fix: <describe what was fixed>"
```
