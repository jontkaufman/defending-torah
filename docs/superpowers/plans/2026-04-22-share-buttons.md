# Social Share Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add floating social share buttons (Facebook, Twitter, Email, Copy) to article and objection pages

**Architecture:** Client-side React component with scroll trigger, URL-based sharing (no dependencies), inline SVG icons, fixed positioning bottom-right

**Tech Stack:** React, TypeScript, Tailwind CSS, Next.js 16 App Router, Clipboard API

---

## File Structure

**Create:**
- `src/components/share-buttons.tsx` — Main ShareButtons component (~200 lines)

**Modify:**
- `src/app/(site)/articles/[slug]/page.tsx` — Add ShareButtons integration
- `src/app/(site)/objection-finder/[slug]/page.tsx` — Add ShareButtons integration

---

### Task 1: Create ShareButtons Component

**Files:**
- Create: `src/components/share-buttons.tsx`

- [ ] **Step 1: Create component file with imports and types**

```typescript
'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

type Platform = 'facebook' | 'twitter' | 'email' | 'copy';
```

- [ ] **Step 2: Add platform icon SVGs**

```typescript
const icons = {
  facebook: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  email: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  copy: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
    </svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  ),
};
```

- [ ] **Step 3: Add getShareUrl helper function**

```typescript
function getShareUrl(platform: Platform, url: string, title: string): string | null {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'email':
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
    case 'copy':
      return null; // Handled by clipboard API
    default:
      return null;
  }
}
```

- [ ] **Step 4: Add ShareButtons component with state and scroll hook**

```typescript
export function ShareButtons({ url, title, className = '' }: ShareButtonsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform: Platform) => {
    const shareUrl = getShareUrl(platform, url, title);
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-opacity duration-300 max-md:bottom-4 max-md:right-4 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      {/* Buttons will be added in next step */}
    </div>
  );
}
```

- [ ] **Step 5: Add individual platform buttons**

```typescript
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-opacity duration-300 max-md:bottom-4 max-md:right-4 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      <button
        onClick={() => handleShare('facebook')}
        aria-label="Share on Facebook"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {icons.facebook}
      </button>

      <button
        onClick={() => handleShare('twitter')}
        aria-label="Share on Twitter"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {icons.twitter}
      </button>

      <button
        onClick={() => handleShare('email')}
        aria-label="Share via Email"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#666666] text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#666666] focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {icons.email}
      </button>

      <button
        onClick={handleCopy}
        aria-label={showCopied ? 'Link copied!' : 'Copy link'}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981] text-white shadow-lg transition-all hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 max-md:h-11 max-md:w-11"
      >
        {showCopied ? icons.check : icons.copy}
        {showCopied && (
          <span className="absolute -top-10 right-0 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
```

- [ ] **Step 6: Verify component compiles**

Run: `npm run build`
Expected: No TypeScript errors, build succeeds

- [ ] **Step 7: Commit**

```bash
git add src/components/share-buttons.tsx
git commit -m "feat: add ShareButtons component

- 4 platforms: Facebook, Twitter, Email, Copy
- Floating bottom-right, appears on scroll >200px
- Standard brand colors, inline SVG icons
- Clipboard API with success feedback

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Integrate ShareButtons into Article Pages

**Files:**
- Modify: `src/app/(site)/articles/[slug]/page.tsx`

- [ ] **Step 1: Read current article page implementation**

Read: `src/app/(site)/articles/[slug]/page.tsx`
Note: Current closing `</article>` tag location (around line 75)

- [ ] **Step 2: Add ShareButtons import**

Add to imports section (after line 7):

```typescript
import { ShareButtons } from "@/components/share-buttons";
```

- [ ] **Step 3: Add ShareButtons component after article**

After the closing `</article>` tag (line 76), add:

```typescript
      <ShareButtons
        url={`https://defending-torah.jontkaufman.workers.dev/articles/${slug}`}
        title={article.meta.title}
      />
```

- [ ] **Step 4: Verify page compiles and renders**

Run: `npm run dev`
Visit: `http://localhost:3000/articles/matthew-5-17-19-foundation`
Expected: Page loads, share buttons appear after scrolling

- [ ] **Step 5: Test share functionality**

Manual test checklist:
- [ ] Scroll >200px → buttons appear
- [ ] Click Facebook → popup opens with correct URL
- [ ] Click Twitter → popup opens with title + URL
- [ ] Click Email → mailto opens
- [ ] Click Copy → "Copied!" tooltip appears

- [ ] **Step 6: Commit**

```bash
git add src/app/\(site\)/articles/\[slug\]/page.tsx
git commit -m "feat: add share buttons to article pages

- ShareButtons appear after scroll on all articles
- Uses article title and canonical URL

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Integrate ShareButtons into Objection Pages

**Files:**
- Modify: `src/app/(site)/objection-finder/[slug]/page.tsx`

- [ ] **Step 1: Read current objection page implementation**

Read: `src/app/(site)/objection-finder/[slug]/page.tsx`
Note: Current closing `</article>` tag location

- [ ] **Step 2: Add ShareButtons import**

Add to imports section (after line 6):

```typescript
import { ShareButtons } from "@/components/share-buttons";
```

- [ ] **Step 3: Add ShareButtons component after article**

After the closing `</article>` tag, add:

```typescript
      <ShareButtons
        url={`https://defending-torah.jontkaufman.workers.dev/objection-finder/${slug}`}
        title={page.meta.title}
      />
```

- [ ] **Step 4: Verify page compiles and renders**

Run: `npm run dev`
Visit: `http://localhost:3000/objection-finder/jesus-new-commandments`
Expected: Page loads, share buttons appear after scrolling

- [ ] **Step 5: Test share functionality on objections**

Manual test checklist:
- [ ] Scroll >200px → buttons appear
- [ ] Facebook share includes correct objection URL
- [ ] Twitter share includes objection title
- [ ] Email opens with subject line
- [ ] Copy provides feedback

- [ ] **Step 6: Commit**

```bash
git add src/app/\(site\)/objection-finder/\[slug\]/page.tsx
git commit -m "feat: add share buttons to objection pages

- ShareButtons appear after scroll on all objections
- Uses objection title and canonical URL

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 4: Mobile Testing and Responsive Verification

**Files:**
- No file changes (testing only)

- [ ] **Step 1: Test mobile viewport (375px width)**

Run: `npm run dev`
Open DevTools, set viewport to iPhone SE (375×667)
Visit: Article and objection pages

Check:
- [ ] Buttons appear at `bottom-4 right-4` (16px spacing)
- [ ] Button size is 44px × 44px (touch-friendly)
- [ ] Buttons don't overlap content
- [ ] Scroll trigger works on mobile

- [ ] **Step 2: Test tablet viewport (768px width)**

Set viewport to iPad (768×1024)
Check:
- [ ] Buttons position correctly
- [ ] Hover states work
- [ ] Scroll trigger works

- [ ] **Step 3: Test desktop viewport (1920px width)**

Set viewport to 1920×1080
Check:
- [ ] Buttons at `bottom-6 right-6` (24px spacing)
- [ ] Button size 48px × 48px
- [ ] All hover effects work
- [ ] Popups center correctly

- [ ] **Step 4: Cross-browser testing**

Test in:
- [ ] Chrome/Edge (Chromium) - main testing
- [ ] Firefox - verify clipboard API
- [ ] Safari (if available) - verify scroll events

- [ ] **Step 5: Accessibility testing**

Keyboard navigation:
- [ ] Tab through all 4 buttons
- [ ] Enter/Space activates buttons
- [ ] Focus ring visible
- [ ] Screen reader announces button labels

- [ ] **Step 6: Document any issues found**

If issues found, create follow-up tasks. Otherwise, proceed to final verification.

---

### Task 5: Production Build and Deployment

**Files:**
- No file changes (build and deploy)

- [ ] **Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings

Check build output for:
- [ ] No hydration warnings
- [ ] No layout shift warnings
- [ ] Reasonable bundle size (ShareButtons adds ~2kb)

- [ ] **Step 2: Test production build locally**

Run: `npm run start`
Visit: Article and objection pages
Verify: All share functionality works in production mode

- [ ] **Step 3: Deploy to Cloudflare**

Run: `npm run deploy`
Expected: Successful deployment

- [ ] **Step 4: Verify on production**

Visit live URLs:
- `https://defending-torah.jontkaufman.workers.dev/articles/matthew-5-17-19-foundation`
- `https://defending-torah.jontkaufman.workers.dev/objection-finder/jesus-new-commandments`

Test:
- [ ] Share buttons appear after scroll
- [ ] Facebook share opens with correct URL
- [ ] Twitter share includes title
- [ ] Email opens correctly
- [ ] Copy to clipboard works (HTTPS required)

- [ ] **Step 5: Commit deployment confirmation**

```bash
git add .
git commit -m "deploy: share buttons live on production

- Verified on articles and objections
- All 4 platforms tested
- Mobile and desktop confirmed

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Plan Self-Review

**Spec coverage check:**

1. ✓ ShareButtons component with 4 platforms (Task 1)
2. ✓ Scroll trigger >200px (Task 1, Step 4)
3. ✓ Standard brand colors (Task 1, Step 5)
4. ✓ Inline SVG icons (Task 1, Step 2)
5. ✓ Article page integration (Task 2)
6. ✓ Objection page integration (Task 3)
7. ✓ Mobile responsive (Task 4)
8. ✓ Accessibility (Task 4, Step 5)
9. ✓ Production deployment (Task 5)

**Placeholder scan:** None. All code blocks complete, all URLs specified, all test steps defined.

**Type consistency:**
- `ShareButtonsProps` interface used consistently
- `Platform` type used in helper function
- `url` and `title` props match across all usages

**No gaps found.**

---

## Success Criteria

After implementation:
- Share buttons visible on all article and objection pages
- Buttons appear only after scrolling >200px
- Facebook, Twitter, Email, Copy all functional
- Mobile responsive (44px buttons, 16px spacing)
- Desktop optimized (48px buttons, 24px spacing)
- Accessible via keyboard
- No performance degradation
- Zero external dependencies added
