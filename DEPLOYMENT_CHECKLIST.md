# Production Deployment Checklist

## Pre-Deployment Verification ✅

### Build Status
- [x] Production build completes without errors
- [x] Cloudflare build completes successfully
- [x] All TypeScript checks pass
- [x] All routes generated successfully (59 total routes)

### Build Output Summary
```
Routes Generated:
- 59 total routes
- 1 homepage
- 16 article pages (SSG)
- 3 blog posts (SSG)
- 17 objection finder pages (SSG)
- 22+ dynamic/static pages

Build Warnings:
- Minor workspace root inference warning (non-critical)
- Middleware deprecation notice (cosmetic, no impact)
```

### Static Site Generation (SSG)
All content pages are pre-rendered:
- Articles: All 16 article pages
- Blog: All 3 blog posts
- Objections: All 17 objection pages

### Build Artifacts
- `.next/` - Next.js build output ✅
- `.open-next/` - Cloudflare worker bundle ✅
- `.open-next/worker.js` - Main worker file ✅
- `.open-next/assets/` - Static assets ✅

## Deployment Configuration

### Cloudflare Settings (wrangler.toml)
```toml
name = "defending-torah"
main = ".open-next/worker.js"
compatibility_date = "2026-04-19"
compatibility_flags = ["nodejs_compat"]
```

### Environment Variables
- NEXT_PUBLIC_SUPABASE_URL: Configured ✅
- NEXT_PUBLIC_SUPABASE_ANON_KEY: Configured ✅

## Deployment Commands

### Option 1: Manual Deployment
```bash
npm run deploy
```
This will:
1. Run `opennextjs-cloudflare build`
2. Run `opennextjs-cloudflare deploy`

### Option 2: Build + Manual Wrangler Deploy
```bash
npm run build:cf
npx wrangler deploy
```

## Post-Deployment Verification (Manual)

### Critical Pages to Test
- [ ] Homepage: `/`
- [ ] About page: `/about`
- [ ] Articles index: `/articles`
- [ ] Sample article: `/articles/getting-started-with-torah-observance-beginners-guide`
- [ ] Blog index: `/blog`
- [ ] Sample blog post: `/blog/peter-never-ate-bacon`
- [ ] Objection Finder: `/objection-finder`
- [ ] Sample objection: `/objection-finder/moral-law-written-on-hearts`
- [ ] Torah Laws: `/torah-laws`
- [ ] 404 page: `/nonexistent-page`

### Functionality to Test
- [ ] Navigation works
- [ ] Search functionality
- [ ] Related content displays on articles
- [ ] Related content displays on objections
- [ ] Skip-to-main link works (Tab key)
- [ ] Keyboard navigation works
- [ ] Dark mode toggle works
- [ ] Mobile menu works
- [ ] All links are functional

### Accessibility Verification
- [ ] Run axe DevTools on homepage
- [ ] Verify 0 Critical/Serious violations
- [ ] Test keyboard navigation
- [ ] Test screen reader landmarks

### Performance Checks
- [ ] Page load times acceptable
- [ ] Images load correctly
- [ ] No console errors
- [ ] No broken links

## Expected Production URL

Based on project name "defending-torah", the production URL should be:
- `https://defending-torah.pages.dev` (Cloudflare default)
- Or custom domain if configured: `https://defendingtorah.com`

## Rollback Procedure

If issues are found post-deployment:

1. Check Cloudflare dashboard for deployment history
2. Rollback to previous deployment if needed
3. Review error logs in Cloudflare dashboard
4. Fix issues locally and redeploy

## Notes

- Build time: ~10-15 seconds
- Total routes: 59
- Static pages: 37
- Dynamic pages: 22
- No build errors
- No critical warnings
- All accessibility features implemented
- All polish tasks completed (Tasks 1-17)
