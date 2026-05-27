# TikTok Launch Campaign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 10 TikTok videos over 10 consecutive days from a new account, plus the production scaffold, content gap-fills, measurement system, and pivot framework to inform batch 2.

**Architecture:** Content/marketing campaign — not a software build. Work splits across three lanes: (1) **content scaffold + gap-fill** (markdown, defend-site articles — agent-doable), (2) **video production** (scripts, AI voice, AI b-roll, assembly — human-led with agent assist), (3) **launch + measurement** (scheduling, daily moderation, analytics rollup, pivot decision — human-led with agent assist on analytics).

**Tech Stack:**
- Content: markdown in `defend/content/tiktok/`, follows existing `defend/content/articles/` patterns
- Articles: Next.js routes under `defend/src/app/` (existing site)
- Voiceover: ElevenLabs (single locked voice ID, batch render)
- B-roll: one of Sora / Veo / Kling (locked at task 1)
- Assembly: CapCut or Premiere
- Music: Epidemic Sound (single licensed track for all 10)
- Link tracking: Bitly or Dub.co (one short link per video)
- Scheduling: TikTok native scheduler

**Spec reference:** `defend/docs/superpowers/specs/2026-05-26-tiktok-launch-campaign-design.md`

---

## File Structure

### Files this plan creates

```
defend/
├── content/tiktok/campaigns/launch-10/
│   ├── brief.md                                ← campaign brief
│   ├── 01-constantine-sunday/
│   │   ├── script.md          ← human-authored
│   │   ├── caption.md         ← human-authored
│   │   ├── prompts.md         ← human-authored
│   │   ├── notes.md           ← agent pre-fills source links
│   │   └── analytics.md       ← human fills post-launch
│   ├── 02-matthew-5-17/   (same 5 files)
│   ├── 03-romans-6-14/    (same 5 files)
│   ├── 04-mark-7-foods/   (same 5 files)
│   ├── 05-sabbath-before-sinai/   (same 5 files)
│   ├── 06-early-church-saturday/  (same 5 files)
│   ├── 07-galatians-circumcision/ (same 5 files)
│   ├── 08-fulfill-greek/  (same 5 files)
│   ├── 09-acts-10-people-not-food/ (same 5 files)
│   └── 10-hebrews-8-13-marriage/   (same 5 files)
│
├── content/articles/
│   ├── romans-6-14-not-under-law.md           ← Gap A fill
│   └── galatians-not-about-the-law.md         ← Gap B fill
│
└── src/app/articles/
    ├── romans-6-14-not-under-law/page.tsx     ← Gap A route
    └── galatians-not-about-the-law/page.tsx   ← Gap B route
```

### Files this plan modifies

- `defend/content/tiktok/analytics.md` — global rollup (populated as posts go live)
- `defend/content/tiktok/ideas.md` — backlog (any new ideas discovered during scripting)

### Boundaries

- `campaigns/launch-10/brief.md` is the single source of truth for the campaign itself and references the spec doc. Do not duplicate spec content.
- Each post folder is self-contained. Anyone opening `04-mark-7-foods/` should have everything to produce that video without reading sibling folders.
- The two new articles (Gap A, Gap B) follow existing defend-site article conventions exactly — do not invent new patterns.

---

## Task 1: Lock pre-launch tool decisions

**Goal:** Commit the four tool choices the spec flagged as pre-launch unknowns, so scripts/VO/b-roll can be produced consistently.

**Files:**
- Modify: `defend/content/tiktok/campaigns/launch-10/brief.md` (created in Task 2 — if doing tasks out of order, do Task 2 first)

**Decisions to make (human, in this order):**

- [ ] **Step 1: Pick ElevenLabs voice.** Sign up if needed. Listen to "Adam", "Brian", "Antoni", "Daniel". Pick one male, mid-30s, American, slightly authoritative. Note the voice_id from the ElevenLabs dashboard (format: `pNInz6obpgDQGcFmaJgB` style).

- [ ] **Step 2: Pick AI b-roll tool.** Decision matrix:

| Tool | Strength | Weakness | Best for |
|------|----------|----------|----------|
| Sora | Cinematic, long clips | Wait times, prompt-finicky | Hero shots |
| Veo (Google) | Realism, motion | Access gated | Realistic biblical |
| Kling | Fast, cheap | Less photoreal | Iterative |

Pick one. Open an account, confirm you can render at least one 9:16 clip.

- [ ] **Step 3: License music bed.** Open Epidemic Sound. Filter: "Cinematic" / "Documentary" / "Reflective" / Mood: contemplative / Tempo: 70-90 BPM / Length: 60s+. Pick ONE track. Download. Note the track name + license ID.

- [ ] **Step 4: Set up link tracker.** Sign up for Dub.co (recommended — free tier, click analytics). Or use Bitly. Create a project/workspace named "tiktok-launch-10". You'll create one short link per video in Task 9.

- [ ] **Step 5: Record decisions in `brief.md`.** After Task 2 creates the file, fill the "Tools Locked" section with: voice_id, b-roll tool, music track + license ID, link tracker workspace URL.

**Acceptance:** Four decisions made, credentials/IDs recorded in `brief.md`.

**No commit yet** — `brief.md` is created in Task 2; tool decisions are appended there.

---

## Task 2: Scaffold the campaign folder

**Goal:** Create `campaigns/launch-10/` with `brief.md` and 10 pre-stubbed post folders so production has somewhere to land.

**Files:**
- Create: `defend/content/tiktok/campaigns/launch-10/brief.md`
- Create: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/{script,caption,prompts,notes,analytics}.md` (50 files total — 5 per video × 10 videos)

**Slugs (locked from spec lineup table):**
1. `01-constantine-sunday`
2. `02-matthew-5-17`
3. `03-romans-6-14`
4. `04-mark-7-foods`
5. `05-sabbath-before-sinai`
6. `06-early-church-saturday`
7. `07-galatians-circumcision`
8. `08-fulfill-greek`
9. `09-acts-10-people-not-food`
10. `10-hebrews-8-13-marriage`

- [ ] **Step 1: Create `brief.md`.** Write the campaign brief at `defend/content/tiktok/campaigns/launch-10/brief.md` with this content:

```markdown
---
title: Launch 10 — TikTok Broad Sampler
type: tiktok-campaign
created: 2026-05-26
status: planning
post_count: 10
tags: [launch, sampler]
spec: defend/docs/superpowers/specs/2026-05-26-tiktok-launch-campaign-design.md
---

## Goal

Build a Torah-apologetics TikTok audience from zero. Target: 1,000+ followers at +4 weeks. Identify which topic bucket pulls hardest on the FYP to inform batch 2.

## Target viewer

Mainstream Christians (Protestant/Evangelical/non-denom) who have never questioned "the Law was abolished" or "the Sabbath moved to Sunday." Scripture-first receipts, not preachy, not angry.

## Arc

Broad sampler. 10 videos across 5 buckets, 2 per bucket:
- Church history (videos 1, 6)
- Foundation/Hermeneutic (videos 2, 8)
- Paul (videos 3, 7)
- Dietary (videos 4, 9)
- Sabbath foundation + Hebrews (videos 5, 10)

## CTA

Single CTA across all 10: "Full breakdown — link in bio." No follow-asks.

## Post plan

| # | Slug | Hook | CTA target | Status |
|---|------|------|------------|--------|
| 01 | 01-constantine-sunday | "Constantine invented Sunday." | /sabbath-creation-to-eternity | planning |
| 02 | 02-matthew-5-17 | "Pastors skip Matthew 5:17." | /matthew-5-17-19-foundation | planning |
| 03 | 03-romans-6-14 | "Romans 6:14 doesn't say what you think." | /romans-6-14-not-under-law | planning |
| 04 | 04-mark-7-foods | "Mark 7 doesn't say all foods clean." | /dietary-laws-what-scripture-says | planning |
| 05 | 05-sabbath-before-sinai | "The Sabbath existed before Sinai." | /sabbath-creation-to-eternity | planning |
| 06 | 06-early-church-saturday | "The early church kept Saturday." | /sabbath-creation-to-eternity | planning |
| 07 | 07-galatians-circumcision | "Galatians isn't about the Law." | /galatians-not-about-the-law | planning |
| 08 | 08-fulfill-greek | "'Fulfill' doesn't mean 'abolish' in Greek." | /matthew-5-17-19-foundation | planning |
| 09 | 09-acts-10-people-not-food | "Acts 10 wasn't about food." | /acts-10-koinos-and-akathartos | planning |
| 10 | 10-hebrews-8-13-marriage | "Hebrews 8:13 isn't about the Law." | /god-and-israel-the-marriage | planning |

## Tools Locked

- ElevenLabs voice_id: <FILL FROM TASK 1>
- B-roll tool: <FILL FROM TASK 1>
- Music track: <FILL FROM TASK 1>
- Music license ID: <FILL FROM TASK 1>
- Link tracker workspace: <FILL FROM TASK 1>

## Sources

Full design doc: `defend/docs/superpowers/specs/2026-05-26-tiktok-launch-campaign-design.md`
```

- [ ] **Step 2: Create 10 post folders by copying the template.** Run:

```bash
cd /home/jonathan/torah/defend/content/tiktok/campaigns/launch-10
for slug in 01-constantine-sunday 02-matthew-5-17 03-romans-6-14 04-mark-7-foods 05-sabbath-before-sinai 06-early-church-saturday 07-galatians-circumcision 08-fulfill-greek 09-acts-10-people-not-food 10-hebrews-8-13-marriage; do
  cp -r ../../_templates/post "$slug"
done
ls
```

Expected: 10 folder names listed, each containing script.md, caption.md, prompts.md, notes.md, analytics.md.

- [ ] **Step 3: Pre-fill each post folder's `notes.md` with hook + sources + CTA.** For each post, replace the template's `notes.md` with content that pulls the row from `brief.md` and the wiki source paths from the spec.

Use this template body (substitute per video):

```markdown
# Notes — <video number and slug>

## Hook (on-screen, 0–1.5s)

> <verbatim hook from lineup>

## Receipt (4–25s key beat)

<one-line summary of the scriptural/historical receipt>

## Source material

- [[<wiki page 1>]] — `<full wiki path>`
- [[<wiki page 2>]] — `<full wiki path>` (if applicable)

## CTA target

`<defend site URL path>`

## Key claims

<bullet list — one per claim made in the script; each must trace to a source above>

## Counter-arguments to expect

<top objection a mainstream Christian will raise in comments — and the one-line answer>
```

Concrete fill for each video (copy these notes payloads directly):

**01-constantine-sunday/notes.md** — Hook: "Constantine invented Sunday." Receipt: 321 AD edict text + Council of Laodicea Canon 29. Sources: `Torah/wiki/analyses/constantine-sunday-edict.md`, `Torah/wiki/analyses/council-of-laodicea-canon-29.md`. CTA: `/sabbath-creation-to-eternity`. Counter: "Romans 14 says any day is fine" → Romans 14 is about fast days, not the Sabbath; receipt video 7.

**02-matthew-5-17/notes.md** — Hook: "Pastors skip Matthew 5:17." Receipt: Read v.17-19 verbatim; Greek `pleroo` ≠ abolish. Source: `Torah/wiki/analyses/matthew-5-17-19-foundation.md`. CTA: `/matthew-5-17-19-foundation`. Counter: "Fulfill means complete/end" → that's `teleo`, not `pleroo`; receipt video 8.

**03-romans-6-14/notes.md** — Hook: "Romans 6:14 doesn't say what you think." Receipt: "Under law" = under penalty/condemnation, not under obligation. Source: `Torah/wiki/analyses/romans-6-14-15-not-under-law-but-under-grace.md`. CTA: `/romans-6-14-not-under-law` (new — Task 3). Counter: "Paul says we're free from the law" → free from its condemnation, not its instruction.

**04-mark-7-foods/notes.md** — Hook: "Mark 7 doesn't say all foods clean." Receipt: KJV vs modern translation diff; parenthetical insertion. Source: `Torah/wiki/analyses/mark-7-declaring-all-foods-clean.md`. CTA: `/dietary-laws-what-scripture-says`. Counter: "But Jesus declared all foods clean" → that's a translator's parenthetical, not in the Greek.

**05-sabbath-before-sinai/notes.md** — Hook: "The Sabbath existed before Sinai." Receipt: Gen 2:3 — God sanctified the seventh day before there was a Jew. Source: `Torah/wiki/analyses/genesis-1-2-sabbath-creation-foundation.md`. CTA: `/sabbath-creation-to-eternity`. Counter: "Sabbath is just for Jews" → it was established in creation, before Israel existed.

**06-early-church-saturday/notes.md** — Hook: "The early church kept Saturday." Receipt: Chrysostom in 386 AD preaching against it = proof it persisted. Sources: `Torah/wiki/analyses/chrysostom-adversus-judaeos.md`, `Torah/wiki/analyses/bar-kokhba-sabbath-sunday-transition.md`. CTA: `/sabbath-creation-to-eternity`. Counter: "Apostles met on Sunday" → see video 9 + Acts 20:7 analysis.

**07-galatians-circumcision/notes.md** — Hook: "Galatians isn't about the Law." Receipt: The letter is about circumcision-for-salvation, not Torah-keeping. Sources: `Torah/wiki/analyses/galatians-faith-and-torah.md`, `Torah/wiki/analyses/galatians-2-1-5-titus-not-compelled.md`. CTA: `/galatians-not-about-the-law` (new — Task 4). Counter: "Paul calls the Law a curse" → he calls being under its penalty a curse.

**08-fulfill-greek/notes.md** — Hook: "'Fulfill' doesn't mean 'abolish' in Greek." Receipt: `pleroo` (fulfill) vs `kataluo` (abolish) — Jesus uses both in one verse. Source: `Torah/wiki/analyses/matthew-5-17-19-foundation.md`. CTA: `/matthew-5-17-19-foundation`. Counter: "Fulfilled means it's done" → then `kataluo` would be redundant in the same verse.

**09-acts-10-people-not-food/notes.md** — Hook: "Acts 10 wasn't about food." Receipt: Read v.28 — Peter explains the vision was about people, not food. Source: `Torah/wiki/analyses/acts-10-peters-vision.md`. CTA: `/acts-10-koinos-and-akathartos`. Counter: "Peter ate the animals" → he didn't. He refused three times.

**10-hebrews-8-13-marriage/notes.md** — Hook: "Hebrews 8:13 isn't about the Law." Receipt: "Covenant" = marriage covenant being renewed, not Torah annulled. Source: `Torah/wiki/analyses/hebrews-8-13-marriage-covenant.md`. CTA: `/god-and-israel-the-marriage`. Counter: "The Old Covenant is obsolete" → covenant ≠ Torah; the covenant was the marriage to Israel.

Write each `notes.md` with the structure shown above, filling the substitutions.

- [ ] **Step 4: Commit the scaffold.**

```bash
cd /home/jonathan/torah/defend
git add content/tiktok/campaigns/launch-10/
git commit -m "$(cat <<'EOF'
Scaffold: TikTok launch-10 campaign folders

Adds brief.md and 10 pre-stubbed post folders with hook, sources,
CTA targets, and counter-arguments captured in notes.md. Script,
caption, prompts, and analytics templates ready for production.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** `ls content/tiktok/campaigns/launch-10/` shows `brief.md` plus 10 folders, each containing 5 markdown files. Every `notes.md` has the hook, source paths, CTA, and one counter-argument filled in.

---

## Task 3: Close Gap A — Romans 6:14 article

**Goal:** Publish `/romans-6-14-not-under-law` on the defend site so video #3 has a real CTA target. Source content already exists at `Torah/wiki/analyses/romans-6-14-15-not-under-law-but-under-grace.md` — this task adapts it to defend-site article format.

**Files:**
- Create: `defend/content/articles/romans-6-14-not-under-law.md`
- Create: `defend/src/app/articles/romans-6-14-not-under-law/page.tsx`

- [ ] **Step 1: Read an existing article to learn the pattern.** Read `defend/content/articles/matthew-5-17-19-foundation.md` to see the frontmatter, structure, and tone. Read `defend/src/app/articles/matthew-5-17-19-foundation/page.tsx` to see the route pattern.

- [ ] **Step 2: Read the source wiki.** Read `Torah/wiki/analyses/romans-6-14-15-not-under-law-but-under-grace.md` fully.

- [ ] **Step 3: Write the article markdown.** Create `defend/content/articles/romans-6-14-not-under-law.md` adapting the wiki content to defend-site article voice. Match the frontmatter pattern from the matthew-5-17 article exactly (title, description, slug, published date 2026-05-26, tags, related articles). Section structure: (1) The verse as commonly read, (2) The Greek `hypo nomon` and what "under law" means, (3) Romans 6 context — sin's penalty vs. Torah's instruction, (4) Cross-references (Rom 3:19, Rom 7:12, Gal 3:13), (5) What Paul is actually saying, (6) Application. Aim for 1500-2500 words matching defend-site article length.

- [ ] **Step 4: Create the route.** Copy the structure of `defend/src/app/articles/matthew-5-17-19-foundation/page.tsx`, rename to `romans-6-14-not-under-law/page.tsx`, update the slug reference. Do not duplicate any logic — if articles are loaded from markdown by slug (verify by reading the existing route), the only change should be the slug constant.

- [ ] **Step 5: Verify the route renders.** Start the dev server and visit `http://localhost:3000/articles/romans-6-14-not-under-law`.

```bash
cd /home/jonathan/torah/defend
npm run dev
```

Open the URL in a browser. Confirm: title renders, body renders, no console errors, related-articles section populates if the pattern uses one.

- [ ] **Step 6: Commit.**

```bash
git add content/articles/romans-6-14-not-under-law.md src/app/articles/romans-6-14-not-under-law/
git commit -m "$(cat <<'EOF'
Article: Romans 6:14 — not under law (TikTok Gap A)

Adapts wiki analysis to defend-site article format. Provides
the CTA target for TikTok video #3 of the launch-10 campaign.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** Article renders at `/articles/romans-6-14-not-under-law`, content matches defend-site quality bar, no console errors.

---

## Task 4: Close Gap B — Galatians-not-about-the-Law article

**Goal:** Publish `/galatians-not-about-the-law` so video #7 has a real CTA target.

**Files:**
- Create: `defend/content/articles/galatians-not-about-the-law.md`
- Create: `defend/src/app/articles/galatians-not-about-the-law/page.tsx`

- [ ] **Step 1: Read source wikis.** Read fully:
  - `Torah/wiki/analyses/galatians-faith-and-torah.md`
  - `Torah/wiki/analyses/galatians-2-1-5-titus-not-compelled.md`
  - `Torah/wiki/analyses/galatians-4-9-11-weak-beggarly-elements.md`

- [ ] **Step 2: Write the article markdown.** Create `defend/content/articles/galatians-not-about-the-law.md`. Frontmatter matches existing pattern (slug: `galatians-not-about-the-law`, date 2026-05-26). Section structure: (1) What pastors say Galatians is about, (2) The actual occasion (Acts 15, Judaizers demanding circumcision for Gentile salvation), (3) Titus not compelled — the proof, (4) "Works of the law" in context = circumcision boundary markers, (5) The "weak and beggarly elements" question, (6) What Paul affirms about the Law (Rom 7:12, 1 Tim 1:8 — Paul to Galatians' own audience), (7) Application. 1500-2500 words.

- [ ] **Step 3: Create the route.** Same pattern as Task 3 Step 4 — copy an existing article route, update the slug.

- [ ] **Step 4: Verify renders.** Visit `http://localhost:3000/articles/galatians-not-about-the-law` in the dev server. Confirm no console errors.

- [ ] **Step 5: Commit.**

```bash
git add content/articles/galatians-not-about-the-law.md src/app/articles/galatians-not-about-the-law/
git commit -m "$(cat <<'EOF'
Article: Galatians not about the Law (TikTok Gap B)

Adapts wiki analyses to defend-site article format. Provides
the CTA target for TikTok video #7 of the launch-10 campaign.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** Article renders at `/articles/galatians-not-about-the-law`. CTA chain for all 10 videos is now live.

---

## Task 5: Verify all 10 CTA URLs resolve

**Goal:** Pre-flight check — every video has a working CTA target before scripts get written.

**Files:** none

- [ ] **Step 1: Start the dev server if not running.**

```bash
cd /home/jonathan/torah/defend && npm run dev
```

- [ ] **Step 2: Visit each CTA URL.** Check each renders without 404 or console error:

| # | URL |
|---|-----|
| 1 | http://localhost:3000/sabbath-creation-to-eternity |
| 2 | http://localhost:3000/matthew-5-17-19-foundation |
| 3 | http://localhost:3000/articles/romans-6-14-not-under-law |
| 4 | http://localhost:3000/dietary-laws-what-scripture-says |
| 5 | http://localhost:3000/sabbath-creation-to-eternity |
| 6 | http://localhost:3000/sabbath-creation-to-eternity |
| 7 | http://localhost:3000/articles/galatians-not-about-the-law |
| 8 | http://localhost:3000/matthew-5-17-19-foundation |
| 9 | http://localhost:3000/acts-10-koinos-and-akathartos |
| 10 | http://localhost:3000/god-and-israel-the-marriage |

If any URL 404s, the corresponding article path in the spec/brief is wrong — find the correct path under `defend/src/app/` and update `brief.md` with the correct URL before continuing.

**Acceptance:** All 10 URLs return 200 and render expected content.

---

## Task 6: Write all 10 scripts

**Goal:** Produce 10 ready-to-record scripts, all following the 5-beat structure. Single sitting recommended (~2 hours).

**Files:**
- Modify: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/script.md` (10 files)

**Structure (hard rules — applies to every script):**

```markdown
---
title: <video title>
type: tiktok-post
medium: ai
campaign: launch-10
created: 2026-05-26
published:
duration_sec: <target 30-45>
tags: []
sources: [<wiki page slugs>]
---

## Hook (0–1.5s) — on-screen + spoken

<verbatim hook line>

## Pivot (1.5–4s)

<one-line "wait, what" beat>

## Receipt (4–25s)

<scripture verbatim — show on screen — name Greek/Hebrew if relevant>

## Twist (25–35s)

<the contradiction with mainstream teaching, one line>

## CTA (35–42s)

Full breakdown — link in bio.
```

- [ ] **Step 1: Open all 10 `notes.md` files side-by-side** (or read them sequentially). Each contains the hook, receipt summary, sources, and one counter-argument. The script is the expansion of that notes payload into the 5-beat structure.

- [ ] **Step 2: Write script 01 (Constantine).** Open `01-constantine-sunday/script.md`, replace template content with the structure above filled in. Sample hook + receipt:

```markdown
## Hook (0–1.5s) — on-screen + spoken

"Constantine invented Sunday."

## Pivot (1.5–4s)

Your pastor won't say this. The Roman emperor did.

## Receipt (4–25s)

321 AD. Constantine's edict — on screen: "Let all judges and people of the city rest, and let all workshops be closed on the venerable day of the Sun."

Sixty years later, Council of Laodicea, Canon 29 — on screen: "Christians must not Judaize by resting on the Sabbath… but if any shall be found to be Judaizers, let them be anathema."

## Twist (25–35s)

The Bible never moved the Sabbath. An emperor did.

## CTA (35–42s)

Full breakdown — link in bio.
```

- [ ] **Step 3: Write the remaining 9 scripts** following the same pattern. Pull receipt content from each video's source wiki page when verbatim scripture or quotes are needed.

- [ ] **Step 4: Read all 10 aloud at natural pace.** Target: 30-45s each. If a script reads >45s, cut. Always cut the receipt first (one beat instead of two), never cut the hook.

- [ ] **Step 5: Commit.**

```bash
cd /home/jonathan/torah/defend
git add content/tiktok/campaigns/launch-10/*/script.md
git commit -m "$(cat <<'EOF'
Scripts: TikTok launch-10 (all 10 drafted)

Scripts follow the locked 5-beat structure (hook, pivot, receipt,
twist, CTA). Each 30-45s, scripture-receipt-first, single CTA.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** 10 scripts written, each fits 30-45s when read aloud, each has all 5 beats present.

---

## Task 7: Render all 10 voiceovers

**Goal:** Produce 10 audio files using the ElevenLabs voice locked in Task 1. Single sitting recommended (~30 min).

**Files:**
- Create: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/voiceover.mp3` (10 files — gitignored)

- [ ] **Step 1: Confirm `*.mp3` is gitignored.** Run:

```bash
cd /home/jonathan/torah/defend
grep mp3 .gitignore
```

Expected: nothing (only `*.mp4`/`*.mov`/`*.webm` ignored). Add `*.mp3` to the tiktok block:

```bash
# Edit .gitignore — add this line to the tiktok block:
# content/tiktok/**/*.mp3
```

- [ ] **Step 2: Open ElevenLabs.** Log in. Set the active voice to the locked `voice_id` from Task 1.

- [ ] **Step 3: Render script 01.** Paste the spoken-text portions (hook, pivot, receipt, twist, CTA — strip the headers and stage directions). Render. Listen back. If a word is mispronounced (Greek/Hebrew names are common offenders), use ElevenLabs phoneme override or rewrite to a phonetic spelling and re-render. Save as `voiceover.mp3` in `01-constantine-sunday/`.

- [ ] **Step 4: Render scripts 02–10.** Same process. Save each to its video folder.

- [ ] **Step 5: Verify durations.** Each .mp3 should be 30-45s. If any is longer, the script is too long — go back and cut, then re-render.

```bash
for f in content/tiktok/campaigns/launch-10/*/voiceover.mp3; do
  echo "$f: $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")s"
done
```

Expected: all values between 30.0 and 45.0.

- [ ] **Step 6: Commit the gitignore update only.**

```bash
git add .gitignore
git commit -m "$(cat <<'EOF'
Ignore tiktok mp3 voiceover renders

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** 10 voiceover.mp3 files exist, durations in range, audio quality is clean, pronunciations are correct.

---

## Task 8: Write all 10 prompts.md files (b-roll shot lists)

**Goal:** Plan every visual before opening the b-roll tool. This makes Task 9 (the slow generation step) batch-able and avoids context-switching cost.

**Files:**
- Modify: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/prompts.md` (10 files)

**Per-video pattern (every video gets 4-6 clips):**

```markdown
# AI Generation Prompts — <video number and slug>

Tool: <Sora | Veo | Kling — locked in Task 1>
Aspect: 9:16
Style guide: cinematic, biblical-era realism unless noted, warm/sepia for historical, cool/neutral for scripture
Voice: ElevenLabs (rendered separately)

## Shot list

| # | Beat | Duration | Visual | Prompt |
|---|------|---------:|--------|--------|
| 1 | Hook | 1.5s | <visual> | <full generation prompt> |
| 2 | Pivot | 2.5s | <visual> | <full prompt> |
| 3 | Receipt A | 6s | scripture text card | (text card — design in CapCut, no AI gen needed) |
| 4 | Receipt B | 6s | <visual> | <full prompt> |
| 5 | Twist | 3s | <visual> | <full prompt> |
| 6 | CTA | 1s | logo + "link in bio" | (static — design in CapCut, no AI gen needed) |

## Music

Track: <from Task 1>
Mix: -18dB under VO

## On-screen text overlays

(Lives in caption.md — written in Task 9. Reference here.)
```

- [ ] **Step 1: Write prompts for video 01.** Example for `01-constantine-sunday/prompts.md`:

Shot 1 (hook, 1.5s): "Wide shot of Constantine the Great seated on a Roman imperial throne, golden light, cinematic, marble columns, sepia tones, 9:16 aspect, 1.5 seconds, no text overlay"
Shot 2 (pivot, 2.5s): "Empty Christian sanctuary interior, dust motes in shaft of light, contemplative, 9:16, no people, 2.5 seconds"
Shot 4 (receipt B, 6s): "Roman imperial scroll being unrolled on a stone table, candlelight, warm tones, parchment closeup, 9:16, 6 seconds"
Shot 5 (twist, 3s): "Modern church Sunday service overlaid with subtle Roman imperial imagery dissolving, 9:16, 3 seconds, no text"

- [ ] **Step 2: Write prompts for videos 02-10.** Same pattern. Pull visual ideas from each video's `notes.md` Receipt and Twist beats.

- [ ] **Step 3: Commit.**

```bash
git add content/tiktok/campaigns/launch-10/*/prompts.md
git commit -m "$(cat <<'EOF'
Prompts: TikTok launch-10 b-roll shot lists (all 10)

Each video planned to 4-6 clips with locked style guide:
biblical-era realism, sepia for historical, cool/neutral for
scripture. Static cards (scripture readouts, CTA) handled in
CapCut, not AI gen.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** 10 `prompts.md` files with 4-6 shots each, every shot has a complete prompt or a "static — handled in CapCut" note, style guide consistent across all 10.

---

## Task 9: Generate all b-roll

**Goal:** Render every AI clip for all 10 videos. Single 1-2 sitting batch (~4 hours — most time-expensive step).

**Files:**
- Create: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/broll/clip-{1..6}.mp4` (gitignored)

- [ ] **Step 1: Add b-roll directories to gitignore if not already.** `*.mp4` is already ignored — verify the broll/ subdirectory works:

```bash
mkdir -p content/tiktok/campaigns/launch-10/01-constantine-sunday/broll
git status
```

Expected: no new tracked files (the directory will only show up once a file is in it, and .mp4s won't be tracked).

- [ ] **Step 2: For each video, render every non-static shot from its prompts.md.** Open the locked b-roll tool. Paste each prompt. Render. Download. Rename to `clip-N.mp4` and place in the video's `broll/` folder.

- [ ] **Step 3: Quality gate per clip.** Reject and re-render if:
  - Aspect is wrong (must be 9:16)
  - Anachronisms (e.g. Constantine in modern clothing)
  - "AI weirdness" (extra fingers, melting faces, etc.) visible at normal playback
  - Watermark from tool's free tier

- [ ] **Step 4: Spot-check audio sync feasibility.** Open each video's voiceover.mp3 and play it next to the clips in a media player. Confirm the b-roll durations sum to ≥ voiceover duration with some slack. If short, add a clip or extend an existing one in CapCut later.

**Acceptance:** Every video has a `broll/` folder with all non-static clips rendered, no quality-gate fails. (No commit — files are gitignored.)

---

## Task 10: Assemble all 10 videos

**Goal:** Combine voiceover + b-roll + on-screen text + music into 10 final exports. Single sitting (~3 hours).

**Files:**
- Create: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/final.mp4` (gitignored)

- [ ] **Step 1: Build a CapCut/Premiere project template.** Once. Use video 01 as the template build. Set:
  - Sequence: 1080×1920, 30fps
  - Audio: VO track + music bed track (music at -18dB)
  - Title overlays: Inter Black 72pt for hook, Inter Bold 48pt for on-screen captions
  - Scripture cards: EB Garamond 56pt centered, sepia background
  - Outro card: 1s static with handle + "link in bio"
  - Save as a project template.

- [ ] **Step 2: Assemble video 01.** Drop VO. Place b-roll clips to the beats (hook clip during hook VO, etc.). Burn the hook text on-screen 0-1.5s. Add scripture text card during the receipt beat. Add twist on-screen text. Outro card. Export to `01-constantine-sunday/final.mp4`.

- [ ] **Step 3: Assemble videos 02-10.** Duplicate the project template. Replace VO + b-roll + on-screen text per video. Export each to its post folder as `final.mp4`.

- [ ] **Step 4: Watch each final.mp4 end-to-end.** Mute test (does the visual + on-screen text tell the story without audio?) and full-audio test. Reject and re-edit if:
  - Hook isn't legible in first 1.5s
  - Scripture text card has typos
  - Music drowns out VO
  - Outro card cuts off

**Acceptance:** 10 final.mp4 files, each 30-45s, each passes mute test + full-audio test.

---

## Task 11: Write captions, hashtags, and short links

**Goal:** Every video has caption + 3-5 hashtags + a tracked short link for attribution.

**Files:**
- Modify: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/caption.md` (10 files)

**Per-video pattern:**

```markdown
# Caption

<1-2 lines, question-form bait>

## Hashtags

#torah #bible #<niche>

## Short link

<dub.co or bitly URL>
→ destination: https://defendingtorah.com<spec CTA path>

## On-screen text overlays (timeline)

- 0:00 — <hook text>
- 0:01.5 — <pivot text or none>
- 0:04 — <receipt scripture reference>
- 0:25 — <twist text>
- 0:35 — "Link in bio"
```

- [ ] **Step 1: For each video, create a short link.** Open the Dub.co / Bitly workspace from Task 1. Create one short link per video pointing at the spec CTA URL. Name format: `tiktok-launch-<NN>-<short-slug>`.

- [ ] **Step 2: Write captions.** For each `caption.md`, write a 1-2 line question caption that mirrors the hook without giving away the receipt. Examples:
  - Video 1: "Sunday's not in the Bible. Look up 321 AD."
  - Video 4: "What if your translator added that comma?"

- [ ] **Step 3: Set hashtags.** Use the rotation from the spec:
  - Broad (always include 2 of these): `#bible #torah #christian #scripture`
  - Niche (1-2 per video, topic-matched): `#sabbath #biblicaltruth #torahkeeper #hebrewroots`
  - Max 5 total per post.

- [ ] **Step 4: Fill the on-screen text timeline.** Pull the timings from the script's beat structure.

- [ ] **Step 5: Commit.**

```bash
git add content/tiktok/campaigns/launch-10/*/caption.md
git commit -m "$(cat <<'EOF'
Captions + hashtags + short links: TikTok launch-10

Each video has a tracked short link for CTA attribution and a
2-line question caption. Hashtag rotation: 2 broad + 1-2 niche
per spec, max 5 total.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** 10 `caption.md` files complete, 10 short links exist in the tracker workspace, hashtag rotation per spec.

---

## Task 12: Schedule all 10 in TikTok

**Goal:** Pre-schedule daily posting so launch is hands-off.

**Files:** none

- [ ] **Step 1: Pick a posting time.** Default: 9am ET. (Test 9am first; switch in batch 2 if data shows another slot wins.)

- [ ] **Step 2: Pick a launch date.** Mondays are conventional for new accounts; whichever Monday is at least 24 hours from now after Task 11 completes.

- [ ] **Step 3: Open TikTok web → Upload.** For each video in order 01 → 10:
  - Upload `final.mp4`
  - Paste caption from `caption.md`
  - Paste hashtags
  - Set the short link as the bio link (TikTok only allows 1 bio link — see Step 4)
  - Toggle "Schedule" → set date (launch date + N days for video N+1) and time
  - Save

- [ ] **Step 4: Bio link rotation strategy.** Since TikTok only allows one bio link, choose one:
  - **Option A:** Set bio to a single `/start` landing page that lists all 10 destinations. (Recommended — one link, multiple destinations.)
  - **Option B:** Update bio link daily to match that day's video. (More attribution accuracy, more manual work.)

If Option A: confirm `defendingtorah.com/start` exists or create it (out of scope for this plan — flag if missing).

- [ ] **Step 5: Confirm schedule in TikTok scheduler view.** All 10 posts visible in the upcoming queue with correct dates and times.

**Acceptance:** 10 scheduled posts visible in TikTok, dates daily-incrementing from launch day, captions/hashtags/links correct.

---

## Task 13: Daily monitoring + analytics rollup (days 1-14)

**Goal:** Capture per-post analytics for 14 days (10 posting days + 4 days of tail). Apply pivot rules at end.

**Files:**
- Modify: `defend/content/tiktok/campaigns/launch-10/{01..10}-<slug>/analytics.md` (per post)
- Modify: `defend/content/tiktok/analytics.md` (global rollup)

- [ ] **Step 1: Each posting day at +24h and +48h** — open the post in TikTok Studio. Record into the post's `analytics.md`:
  - Views, likes, comments, shares, saves
  - Avg watch %, full-watch %
  - Follows attributable
  - Short link clicks (from Dub/Bitly)

- [ ] **Step 2: Each day, spend ~15 min in comments.** Reply to top 3-5 comments per active post. Engagement is algorithm signal. Don't argue — quote scripture and link to the article.

- [ ] **Step 3: After all 10 posts have 48h of data,** populate the global `tiktok/analytics.md` post log table. One row per post.

- [ ] **Step 4: Apply the spec's pivot decision rules.** Read `defend/docs/superpowers/specs/2026-05-26-tiktok-launch-campaign-design.md` §4 "Decision rules after the 10." Write a one-page batch-2 brief at `defend/content/tiktok/campaigns/launch-10/retro.md`:

```markdown
# Launch-10 Retro + Batch-2 Brief

## Headline result

<followers at end of 14 days> followers. <Hit | Normal | Dead> outcome by spec thresholds.

## Per-bucket performance

| Bucket | Avg views @ 48h | Avg watch % | Hits | Verdict |
|--------|----------------:|------------:|-----:|---------|
| Church history | | | | |
| Foundation | | | | |
| Paul | | | | |
| Dietary | | | | |
| Sabbath/Hebrews | | | | |

## Hook formula performance

<which hook style had the highest avg watch %>

## Pivot rule triggered

<which of the 5 decision rules from the spec fires>

## Batch-2 plan (1 paragraph)

<topic mix, hook formula, anything to change>

## What does NOT change

Voice, visual style, fonts, music, length, CTA pattern.
```

- [ ] **Step 5: Commit retro.**

```bash
cd /home/jonathan/torah/defend
git add content/tiktok/campaigns/launch-10/retro.md content/tiktok/campaigns/launch-10/*/analytics.md content/tiktok/analytics.md
git commit -m "$(cat <<'EOF'
Retro: TikTok launch-10 (post 14-day analytics + batch-2 brief)

Captures per-bucket performance, hook formula winner, and the
pivot rule triggered. Batch-2 brief enumerates what changes
(topic mix, hook formula) and what stays locked (brand elements).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

**Acceptance:** All 10 per-post analytics filled, global analytics rollup complete, retro doc identifies the pivot decision and briefs batch 2.

---

## Out of Scope (explicitly)

- **Personal B-track video production.** The single "day 5 humanize" personal post is filed under `defend/content/tiktok/posts/personal/` and produced separately. Not part of this plan.
- **Batch 2.** Briefed at the end of Task 13, but produced as its own plan.
- **`/start` landing page (if Option A in Task 12).** Out of scope unless missing — flag during Task 12.
- **TikTok account setup itself** (creating the account, bio, profile photo). Assumed done before Task 12.

---

## Self-Review Checklist (executed)

**Spec coverage:**
- §1 Strategy → Task 1 (tools), Task 2 (brief.md captures arc/CTA), Task 12 (cadence + bio link)
- §2 Lineup → Task 2 (notes pre-fill), Task 6 (scripts)
- §3 Production pipeline → Tasks 6-10 (scripts → VO → b-roll → assembly)
- §4 Measurement + pivot → Task 13
- §5 Folder structure → Task 2
- §6 Implementation steps → entire plan
- §7 Open questions / risks → Out-of-scope section + Task 12 Step 4 (bio link strategy addresses single-link constraint)

**Placeholder scan:** No "TBD", "implement later", or "similar to Task N" — every step has explicit content. Two placeholders intentionally remain inside template content: `<FILL FROM TASK 1>` in `brief.md` (filled at Task 1 Step 5), and analytics table cells filled at Task 13.

**Type consistency:** Slug names, file paths, and CTA URLs match between Task 2 (folder creation), Tasks 6-11 (per-post artifacts), and Task 5 (URL verification). Spec table → brief.md table → notes.md per-video → caption.md short links — same slugs all the way through.

**Gap A/B fallback:** If Tasks 3 or 4 stall, Task 5 will fail for videos 3 or 7. Fallback per spec: switch those videos' CTA in `brief.md` and `caption.md` to `/matthew-5-17-19-foundation` (foundational page). Add this as the first action if Task 5 fails.
