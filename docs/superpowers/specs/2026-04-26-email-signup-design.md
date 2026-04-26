# Email Signup — Design Spec

**Date:** 2026-04-26
**Status:** Approved

---

## Overview

First-time visitors see a modal prompting them to sign up for updates. After dismissing without subscribing, a persistent floating action button (FAB) keeps the option visible. Email addresses are stored in a dedicated Supabase project. The site owner receives a Resend notification for every new signup.

---

## User Flows

### First visit (no localStorage flag)
1. Page loads → modal appears immediately
2. User submits email → stored in Supabase, Resend notification sent, modal closes, FAB hidden permanently
3. User dismisses modal → modal closes, FAB appears

### Returning visit (modal already seen)
- Modal does not appear
- FAB is visible unless closed this session (`sessionStorage`) or subscribed (`localStorage`)

### FAB interaction
- Click FAB → opens modal again
- Close FAB (×) → hides for current session only; returns on next visit if not subscribed
- Subscribe via modal → FAB hidden permanently

---

## Architecture

### New files

| File | Purpose |
|------|---------|
| `src/components/email-signup-modal.tsx` | Client component — modal UI + submit logic |
| `src/components/email-signup-fab.tsx` | Client component — floating button, renders modal when clicked |
| `src/app/api/subscribe/route.ts` | API route — validates email, writes to Supabase, sends Resend notification |

### Modified files

| File | Change |
|------|--------|
| `src/app/(site)/layout.tsx` | Mount `<EmailSignupFab />` — handles both FAB and modal |

### Caching
Pages remain fully statically cached. Only `/api/subscribe` is `force-dynamic`. The client components run entirely in the browser and do not affect page cache.

---

## State Management

| State | Storage | Value | Meaning |
|-------|---------|-------|---------|
| `signup_seen` | `localStorage` | `"1"` | User has seen the modal at least once |
| `signup_subscribed` | `localStorage` | `"1"` | User has successfully subscribed — hide FAB permanently |
| `signup_fab_closed` | `sessionStorage` | `"1"` | User closed FAB this session — hide until next visit |

---

## Components

### `EmailSignupModal`
- Props: `open: boolean`, `onClose: () => void`, `onSubscribed: () => void`
- On mount: no side effects (parent controls open state)
- On submit: POST `/api/subscribe`, call `onSubscribed()` on success
- Validates email format client-side before submitting
- Shows inline error on duplicate or server failure
- Matches site design system (parchment background, ink border, crimson accent)

### `EmailSignupFab`
- Owns all localStorage/sessionStorage reads (runs `useEffect` to avoid SSR mismatch)
- On load:
  - If `signup_subscribed` → render nothing
  - If `signup_seen` → show FAB (unless `signup_fab_closed`)
  - If neither → show modal, set `signup_seen`
- FAB: fixed bottom-right, mail icon, opens modal on click
- FAB close (×): sets `signup_fab_closed` in sessionStorage, hides FAB
- On subscribe: sets `signup_subscribed`, hides FAB and modal

---

## API Route — `/api/subscribe`

```
POST /api/subscribe
Body: { email: string }
```

**Steps:**
1. Validate email format (basic regex)
2. Create Supabase client using `SUPABASE_SUBSCRIBERS_URL` + `SUPABASE_SUBSCRIBERS_SERVICE_ROLE_KEY`
3. Insert into `subscribers` table — return 409 on unique constraint violation (duplicate)
4. Send Resend notification to `jontkaufman@gmail.com` from `notifications@defendingtorah.com`
   - Subject: `New subscriber: {email}`
   - Body: plain text, email address + timestamp
5. Return 200 on success

Resend failure does **not** fail the request — subscriber is saved regardless.

**Responses:**
- `200` — subscribed
- `409` — already subscribed (client shows "you're already on the list")
- `400` — invalid email
- `500` — server error

---

## Supabase Table

Run in birdboykaufman Supabase SQL editor:

```sql
create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamptz default now()
);

alter table subscribers enable row level security;
```

No RLS policies needed — all access is via service role key server-side.

---

## Environment Variables

### `.env.local` + Cloudflare

| Variable | Source |
|----------|--------|
| `SUPABASE_SUBSCRIBERS_URL` | birdboykaufman Supabase → Project Settings → API |
| `SUPABASE_SUBSCRIBERS_ANON_KEY` | birdboykaufman Supabase → Project Settings → API |
| `SUPABASE_SUBSCRIBERS_SERVICE_ROLE_KEY` | birdboykaufman Supabase → Project Settings → API |
| `RESEND_API_KEY` | Resend dashboard → API Keys |
| `RESEND_FROM_EMAIL` | `notifications@defendingtorah.com` (domain must be verified in Resend) |

---

## Dependencies to Install

```
npm install resend
```

---

## Out of Scope

- Welcome emails to subscribers (Resend wired up later)
- Unsubscribe flow
- Subscriber management UI
- Double opt-in
