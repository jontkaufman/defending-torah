# Design: Social Share Buttons for Articles and Objections

**Date:** 2026-04-22
**Type:** Feature addition
**Files:** New component + integration into article/objection pages

## Purpose

Add floating social share buttons to article and objection pages, enabling readers to easily share content on Facebook, Twitter/X, email, or copy link.

## Requirements

**Platforms:** Facebook, Twitter/X, Email, Copy Link (core 4)

**Positioning:** Floating bottom-right corner, appears after scrolling past header

**Visual Style:** Standard social media brand colors (Facebook blue, X black, etc.)

**Behavior:** Subtle, non-intrusive, appears on scroll

## Implementation Approach

**URL-based sharing (no external dependencies):**
- Use platform URL schemes (facebook.com/sharer, twitter.com/intent)
- Native clipboard API for copy functionality
- No tracking scripts, privacy-friendly
- Zero bundle impact

## Component Architecture

### New Component: `src/components/share-buttons.tsx`

**Client component** (uses hooks for scroll detection and clipboard)

**Structure:**
```
ShareButtons
├─ useScrollTrigger() - custom hook, detects scroll > 200px
├─ ShareButton - reusable button component
│  ├─ Platform icon (inline SVG)
│  ├─ Click handler (opens share URL or copies)
│  └─ Hover tooltip with platform name
└─ Fixed container with fade animation
```

**Props:**
```typescript
interface ShareButtonsProps {
  url: string;        // Page URL to share
  title: string;      // Page title for Twitter/email
  className?: string; // Optional style override
}
```

**State:**
```typescript
const [isVisible, setIsVisible] = useState(false);     // Scroll trigger
const [showCopied, setShowCopied] = useState(false);   // Copy feedback
```

## Platform URLs

```typescript
const getShareUrl = (platform: string, url: string, title: string) => {
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
      // Uses navigator.clipboard.writeText(url)
      return null;
  }
};
```

## Visual Specifications

**Position:**
- `fixed bottom-6 right-6` (24px from bottom-right corner)
- `z-index: 50` (above content, below modals)

**Layout:**
- Vertical stack of 4 buttons
- 48px × 48px per button
- 12px gap between buttons
- Total height: ~216px (4 × 48 + 3 × 12)

**Colors (brand standard):**
- Facebook: `#1877F2` (blue)
- Twitter/X: `#000000` (black)
- Email: `#666666` (gray)
- Copy: `#10B981` (green - success color)

**Effects:**
- Shadow: `shadow-lg` for depth
- Hover: Scale 1.05, brightness increase
- Transition: `all 200ms ease-in-out`
- Fade animation: `opacity 0 → 1` over 300ms

**Icons:**
- Inline SVG (no icon library dependency)
- 24px × 24px icon size
- White color on colored background
- Standard platform logos (F, X bird, envelope, link)

## Behavior Details

### Scroll Trigger

```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsVisible(window.scrollY > 200);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

- Appears when user scrolls >200px from top
- Fades in smoothly (300ms opacity transition)
- Disappears when scrolled back to top

### Share Actions

**Facebook/Twitter:**
- Open in popup window: `window.open(url, '_blank', 'width=600,height=400')`
- Centered on screen
- Returns focus to original window

**Email:**
- Standard `mailto:` link
- Opens user's default email client
- Subject: page title
- Body: page URL

**Copy Link:**
```typescript
const handleCopy = async () => {
  await navigator.clipboard.writeText(url);
  setShowCopied(true);
  setTimeout(() => setShowCopied(false), 2000);
};
```
- Copies URL to clipboard
- Shows "Copied!" tooltip for 2 seconds
- Green checkmark icon during success state

## Accessibility

**Keyboard navigation:**
- All buttons focusable via Tab
- Enter/Space activates button
- Focus visible ring on keyboard focus

**ARIA labels:**
```tsx
<button aria-label="Share on Facebook">
<button aria-label="Share on Twitter">
<button aria-label="Share via Email">
<button aria-label="Copy link">
```

**Screen reader announcements:**
- Copy success: Announce "Link copied to clipboard"

## Integration Points

### Article Pages: `src/app/(site)/articles/[slug]/page.tsx`

Add after line 75 (after closing `</article>`):

```tsx
<ShareButtons
  url={`https://defending-torah.jontkaufman.workers.dev/articles/${slug}`}
  title={article.meta.title}
/>
```

### Objection Pages: `src/app/(site)/objection-finder/[slug]/page.tsx`

Add after closing `</article>`:

```tsx
<ShareButtons
  url={`https://defending-torah.jontkaufman.workers.dev/objection-finder/${slug}`}
  title={page.meta.title}
/>
```

**Note:** Both pages need to import ShareButtons and be converted to client components OR wrap ShareButtons in a client-boundary component if pages stay server-rendered.

## Mobile Considerations

**Responsive adjustments:**
- Position: `bottom-4 right-4` on mobile (16px from edges)
- Button size: 44px × 44px (touch-friendly minimum)
- Gap: 10px between buttons
- Scale down icons slightly (22px × 22px)

**Mobile share API fallback:**
```typescript
if (navigator.share) {
  await navigator.share({ title, url });
} else {
  // Fall back to URL-based sharing
}
```

Consider using native mobile share sheet where available.

## Browser Compatibility

**Clipboard API:**
- Requires HTTPS (production only)
- Fallback for HTTP (dev): `document.execCommand('copy')`
- Works in all modern browsers (Chrome 66+, Firefox 63+, Safari 13.1+)

**Popup blocking:**
- Some browsers block `window.open()` if not triggered by user action
- Our implementation is user-click triggered, so safe

## Performance

**No external dependencies:**
- Zero bundle size impact
- No network requests for icons (inline SVG)
- No tracking scripts

**Scroll listener optimization:**
- Passive event listener
- Debounce not needed (simple boolean check)
- No layout thrashing

## File Structure

```
src/
├─ components/
│  └─ share-buttons.tsx          # New file (~150 lines)
└─ app/(site)/
   ├─ articles/[slug]/
   │  └─ page.tsx                # Modified: add ShareButtons
   └─ objection-finder/[slug]/
      └─ page.tsx                # Modified: add ShareButtons
```

## Success Criteria

- Share buttons appear after scrolling 200px
- All 4 platforms open correct share dialogs
- Copy link provides visual feedback
- No layout shift or performance degradation
- Works on mobile and desktop
- Accessible via keyboard

## Out of Scope

- Analytics tracking (can be added later)
- Additional platforms (LinkedIn, WhatsApp, Reddit)
- Share counts/metrics
- Customizable positioning
- Admin configuration

## Future Enhancements

- Add LinkedIn for professional sharing
- Add WhatsApp for mobile users
- Share button analytics (track which platforms used most)
- Customizable button order
- Hide/show specific platforms per page type
