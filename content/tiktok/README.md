# TikTok Content

Torah apologetics content for TikTok. Mostly AI-generated video; some personal.

## Structure

```
tiktok/
├── README.md              this file
├── ideas.md               backlog of hooks/topics
├── analytics.md           global performance log
├── campaigns/             multi-post series (themed runs)
│   └── {campaign-slug}/
│       ├── brief.md       goal, target, arc, CTA
│       └── {NN-post-slug}/ ← individual post (same shape as posts/ai/*)
├── posts/                 one-off posts
│   ├── ai/                AI-generated video
│   │   └── YYYY-MM-DD-{slug}/
│   └── personal/          self-shot video
│       └── YYYY-MM-DD-{slug}/
└── _templates/            copy these to start a new post or campaign
    ├── post/
    └── campaign/
```

## Per-post files

Every post folder (AI or personal, one-off or campaign) contains:

| File | Purpose |
|------|---------|
| `script.md`    | Voiceover/spoken script. Hook → body → CTA. |
| `caption.md`   | TikTok caption, hashtags, on-screen text overlays. |
| `prompts.md`   | AI video gen prompts + shot list (Sora/Runway/HeyGen/Veo/etc). Personal posts may leave this stubbed. |
| `notes.md`     | Source material, talking points, references. Especially useful for personal posts. |
| `analytics.md` | Per-post performance: views, likes, comments, watch time, learnings. |
| `*.mp4`        | Final cut. **Gitignored** — do not commit. |

## Naming

- Post folders: `YYYY-MM-DD-{kebab-slug}` (date = planned publish date).
- Campaign folders: `{kebab-slug}` (no date — campaigns span time).
- Posts inside a campaign: `{NN}-{kebab-slug}` (order matters more than date).

## Workflow

1. Copy `_templates/post/` → `posts/ai/YYYY-MM-DD-{slug}/` (or `personal/`, or under a campaign).
2. Fill `script.md` and `caption.md`.
3. For AI: fill `prompts.md` with generation prompts and shot list.
4. Generate / shoot video, drop `.mp4` in the folder.
5. After publishing, log results in the post's `analytics.md` and roll up totals in the global `analytics.md`.

## Source linking

Wiki content lives at `../../../Torah/wiki/`. Reference analyses/concepts in `notes.md` using relative paths or Obsidian wikilinks so claims trace back to study.
