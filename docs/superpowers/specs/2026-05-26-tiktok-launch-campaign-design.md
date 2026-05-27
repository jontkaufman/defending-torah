# TikTok Launch Campaign — Design

**Date:** 2026-05-26
**Owner:** JK
**Status:** Approved, ready for implementation plan
**Scope:** First 10 TikTok videos posted to a new account, plus the production system to ship them.

---

## 1. Strategy

### Goal
Build a Torah-apologetics TikTok audience from zero. Success at +4 weeks = **1,000+ followers** and identification of which topic bucket(s) pull hardest on the FYP, informing batch 2.

### Target viewer
**Mainstream Christians** (Protestant/Evangelical/non-denom) who have never questioned the standard "the Law was abolished" / "Sabbath moved to Sunday" framing. Algorithmically the largest reachable pool. The hook does the provocation; the body does scripture-first receipts. Tone: confident, not preachy, not angry.

### Arc
**Broad sampler.** 10 videos across 5 topic buckets, 2 per bucket, to give the algorithm parallel signal on which topic carries this account. No themed series in batch 1 — that comes in batch 2, after data.

Buckets and weights:
- Church history / Sunday shift — 2 videos
- Pauline epistle defense — 2 videos
- Dietary laws — 2 videos
- Sabbath foundation — 2 videos
- Hermeneutic / Hebrews — 2 videos

### Format
Voiceover + AI-generated biblical b-roll. 9:16, 30-45s, cinematic look. AI voice (ElevenLabs, single locked voice across all 10). No talking-head AI avatar — avoids "AI face" turn-off pattern.

### Personal posts
**B-track, not part of the launch 10.** A separate parallel stream from your own filmed clips (the existing FB-post material in `Torah/posts/` is reusable source). Drop one personal post around day 5 to humanize, but it doesn't count toward the arc and is judged on its own.

### Cadence
**Daily for 10 consecutive days.** Pre-produce all 10 before posting #1 so daily isn't blocked by production. Use TikTok native scheduler — single posting slot (test 9am ET first, switch if data says otherwise).

### CTA
**Single CTA across all 10:** "Full breakdown → link in bio." Link goes to the article in the lineup table (or a `/start` landing page for videos without a matching article yet). **No "follow me" asks** — depresses algorithm; let retention drive follows.

---

## 2. The Lineup

10 videos, 1 per day, Mon–Wed across two weeks. Day 6 deliberately lands on Saturday (early-church-Sabbath video on actual Sabbath = symbolic anchor + comment-trigger).

| # | Day | Bucket | Hook (on-screen, 0–1.5s) | Receipt | Source wiki | CTA target |
|---|-----|--------|--------------------------|---------|-------------|------------|
| 1 | Mon | Church history | "Constantine invented Sunday." | 321 AD edict text + Council of Laodicea Canon 29 | `Torah/wiki/analyses/constantine-sunday-edict.md`, `Torah/wiki/analyses/council-of-laodicea-canon-29.md` | `/sabbath-creation-to-eternity` |
| 2 | Tue | Foundation | "Pastors skip Matthew 5:17." | Read v.17-19 verbatim; Greek `pleroo` ≠ abolish | `Torah/wiki/analyses/matthew-5-17-19-foundation.md` | `/matthew-5-17-19-foundation` |
| 3 | Wed | Paul | "Romans 6:14 doesn't say what you think." | "Under law" = under penalty/condemnation, not under obligation | `Torah/wiki/analyses/romans-6-14-15-not-under-law-but-under-grace.md` | New article (Gap A) — fallback: `/matthew-5-17-19-foundation` |
| 4 | Thu | Dietary | "Mark 7 doesn't say all foods clean." | KJV vs modern translation diff; parenthetical insertion is editorial | `Torah/wiki/analyses/mark-7-declaring-all-foods-clean.md` | `/dietary-laws-what-scripture-says` |
| 5 | Fri | Sabbath foundation | "The Sabbath existed before Sinai." | Gen 2:3 — God sanctified the seventh day before there was a Jew | `Torah/wiki/analyses/genesis-1-2-sabbath-creation-foundation.md` | `/sabbath-creation-to-eternity` |
| 6 | Sat | Church history | "The early church kept Saturday." | Ignatius; Chrysostom in 386 AD preaching *against* it = proof it persisted | `Torah/wiki/analyses/chrysostom-adversus-judaeos.md`, `Torah/wiki/analyses/bar-kokhba-sabbath-sunday-transition.md` | `/sabbath-creation-to-eternity` |
| 7 | Sun | Paul | "Galatians isn't about the Law." | The letter is about circumcision-for-salvation, not Torah-keeping | `Torah/wiki/analyses/galatians-faith-and-torah.md`, `Torah/wiki/analyses/galatians-2-1-5-titus-not-compelled.md` | New article (Gap B) — fallback: `/matthew-5-17-19-foundation` |
| 8 | Mon | Hermeneutic | "'Fulfill' doesn't mean 'abolish' in Greek." | `pleroo` (fulfill) vs `kataluo` (abolish) — Jesus uses both in one verse | `Torah/wiki/analyses/matthew-5-17-19-foundation.md` | `/matthew-5-17-19-foundation` |
| 9 | Tue | Dietary | "Acts 10 wasn't about food." | Read v.28: Peter explains the vision was about *people*, not food | `Torah/wiki/analyses/acts-10-peters-vision.md` | `/acts-10-koinos-and-akathartos` |
| 10 | Wed | Hebrews | "Hebrews 8:13 isn't about the Law." | "Covenant" = marriage covenant being renewed, not Torah being annulled | `Torah/wiki/analyses/hebrews-8-13-marriage-covenant.md` | `/god-and-israel-the-marriage` |

### Content gaps to close before launch

- **Gap A** — No published defend-site article maps cleanly to video #3 (Romans 6:14). Resolution: write one, or repurpose `Torah/wiki/analyses/romans-6-14-15-not-under-law-but-under-grace.md` into a defend article. Implementation plan will track.
- **Gap B** — No published defend-site article maps cleanly to video #7 (Galatians-as-circumcision-letter). Same resolution path.

If either gap can't be filled in time, fall back: both videos link to a shared `/pauline-epistles` landing page or to `/matthew-5-17-19-foundation` as the foundational scriptural anchor.

---

## 3. Production Pipeline

### Per-video script structure (hard rules)

Every script in `script.md` follows this 5-beat shape, hard-capped at **45 seconds total**:

| Beat | Time | Content |
|------|------|---------|
| Hook | 0–1.5s | One sentence, on-screen + spoken. Pulled verbatim from the lineup table column 4. |
| Pivot | 1.5–4s | The "wait, what" beat. One line. ("That's not in the Bible. Watch.") |
| Receipt | 4–25s | Read scripture verbatim. Show verse on-screen. Name the Greek/Hebrew word if relevant. Two beats maximum. |
| Twist | 25–35s | The contradiction with mainstream teaching. One line. |
| CTA | 35–42s | "Full breakdown — link in bio." Nothing else. No follow ask. |

### Style lock (set once, reuse for all 10)

- **Aspect:** 9:16, 1080×1920
- **Voice:** ElevenLabs, single locked voice ID (recommend male, mid-30s, American, slightly authoritative — "Adam" / "Brian" tier). **Never change voices across the 10.**
- **Color grade:** warm/sepia for historical content, cool/neutral for scripture reading beats
- **Fonts:** Inter Black (hook + overlays), EB Garamond (scripture text cards)
- **Music:** one cinematic-but-quiet music bed across all 10. License once on Epidemic Sound.
- **Outro card:** 1s static — TikTok handle + "link in bio"

### B-roll generation

Per video, generate **4–6 clips**:
1. Hook visual (1 clip, ~1.5s)
2. Receipt visuals (2–3 clips, ~6s each — scrolls/parchment, scripture text card overlay, biblical-era scene)
3. Twist visual (1 clip, ~3s)
4. CTA card (1 static — logo + "link in bio")

Prompts live in each post's `prompts.md`. Tool: Sora / Veo / Kling — pick one and lock it for the batch.

### Batch production order

Do **all 10 of step N** before starting step N+1. This is the single biggest efficiency move.

1. **All 10 scripts** — 1 sitting, ~2 hrs
2. **All 10 voiceovers** — 1 sitting, ~30 min (ElevenLabs batch)
3. **All b-roll for all 10** — 1–2 sittings, ~4 hrs (most time-expensive step)
4. **All 10 assemblies** (CapCut or Premiere) — 1 sitting, ~3 hrs
5. **All 10 captions + hashtag sets** — 1 sitting, ~1 hr
6. **Schedule all 10** in TikTok native scheduler, 1 posting slot/day

**Total pre-launch budget:** ~12 working hours. After scheduling, daily posting is zero work.

### Caption + hashtag conventions

- Caption: 1–2 lines, bait the click. Often a question that mirrors the hook.
- Hashtags: 3–5 max, mix of broad + niche.
  - Broad rotation: `#bible #torah #christian`
  - Niche rotation: `#sabbath #biblicaltruth #torahkeeper #hebrewroots`
- **No more than 5 hashtags.** TikTok 2026 algorithm penalizes hashtag spam.

---

## 4. Measurement + Pivot Rules

### Per-post tracking (in the post's `analytics.md`)

- Views, likes, comments, shares, saves
- Avg watch %, full-watch %
- Follows attributable to this post
- Link-in-bio clicks — use a short link per video (Bitly or Dub.co) for attribution

### Global rollup (in `tiktok/analytics.md`)

After each video's first 48 hours, log to global analytics:
- Views @ 24h and @ 48h (first 48h carries most signal)
- Topic bucket (so buckets can be compared, not just individual videos)
- One-line learning

### Signal thresholds (cold-start account, batch 1)

| Metric | Dead | Normal | Hit |
|--------|-----:|-------:|----:|
| Views @ 48h | <500 | 500–5k | >5k |
| Avg watch % | <40% | 40–60% | >60% |
| Comments | <5 | 5–30 | >30 |
| Follows / 1k views | <2 | 2–10 | >10 |

### Decision rules after the 10

1. **One bucket has 2+ hits, others dead** → pivot. Batch 2 is all that bucket, variations on the hook formula that worked.
2. **One video is a runaway hit (>20k views)** → reply-video chain. Make 3–5 follow-ups answering top comments. Algorithm rewards reply-stitches.
3. **Comments outpace views ratio (>1% comment rate)** → controversy is converting. Keep provocation density in batch 2.
4. **High watch %, low follows** → CTA isn't converting. Test "Follow for part 2" CTA in batch 2.
5. **All dead at 48h** → diagnose ONE variable: hook style, length, or topic. Change one across next 5 — never all three at once.

### What changes in batch 2

- Hook formula (locked to whatever style won)
- Topic distribution (weighted toward the winning bucket)

### What does NOT change in batch 2

- Voice, visual style, fonts, music, length. These are brand consistency. Only topic + hook are variables.

---

## 5. Folder Structure

The campaign lives at `defend/content/tiktok/campaigns/launch-10/` with the scaffold already established by `defend/content/tiktok/_templates/`. Structure:

```
defend/content/tiktok/campaigns/launch-10/
├── brief.md                     ← campaign brief (this design summarized)
├── 01-constantine-sunday/       ← one folder per video
│   ├── script.md
│   ├── caption.md
│   ├── prompts.md
│   ├── notes.md
│   └── analytics.md
├── 02-matthew-5-17/
├── 03-romans-6-14/
├── 04-mark-7-foods/
├── 05-sabbath-before-sinai/
├── 06-early-church-saturday/
├── 07-galatians-circumcision/
├── 08-fulfill-greek/
├── 09-acts-10-people-not-food/
└── 10-hebrews-8-13-marriage/
```

`brief.md` references this design doc. Each post folder is created from `_templates/post/` and pre-populated with: hook line, source wiki references, CTA target. The remaining content (full script, prompts, captions) is human-authored during production.

**Personal B-track stays at `defend/content/tiktok/posts/personal/`** — outside this campaign folder. The "drop one around day 5" personal post is filed there, not under `launch-10/`.

**Pre-launch tool decisions (must be locked before script writing):**
- ElevenLabs voice ID
- AI b-roll tool: Sora *or* Veo *or* Kling (one, locked)
- Music bed track (Epidemic Sound license)
- Link tracker (Bitly *or* Dub.co)

---

## 6. Implementation Plan (high-level — full plan to follow)

In rough order:

1. **Close content gaps** — write or repurpose articles for videos #3 (Romans 6:14) and #7 (Galatians-circumcision). Or pick fallback CTA targets.
2. **Scaffold `campaigns/launch-10/`** — `brief.md` + 10 post folders pre-stubbed with hook + sources + CTA from the lineup table.
3. **Set up production tools** — ElevenLabs voice selection (lock voice ID), pick AI b-roll tool, license music bed, set up Bitly/Dub for link tracking.
4. **Write all 10 scripts** following the 5-beat structure.
5. **Render all 10 voiceovers.**
6. **Generate all b-roll.**
7. **Assemble all 10 videos.**
8. **Write all 10 captions + hashtags.**
9. **Schedule all 10 in TikTok scheduler.**
10. **Track per-post analytics for 14 days; apply pivot rules; brief batch 2.**

A full implementation plan with task ordering, owner, and acceptance criteria will be written in the next step via the `writing-plans` skill.

---

## 7. Open Questions / Risks

- **Account safety:** TikTok occasionally restricts religious content. Mitigation: avoid words flagged by the algorithm in captions (no "Jews killed Jesus" type framing); lean into "biblical" / "scripture" rather than "Jews vs Christians."
- **AI voice detection:** A subset of viewers will detect AI voice and dislike it on religious content. Mitigation: test one personal-voice retake of a high-performing video in batch 2.
- **Comment moderation:** Provocative hooks will draw hostile theology debate. Plan to spend ~15 min/day moderating + engaging top comments in the first 24h of each post (engagement is itself algorithmic signal).
- **Gap A/B fallback chain:** If Romans/Galatians articles don't ship in time, fallback CTA is the foundational page — but a 404 or missing page is launch-blocking. Confirm CTA URLs resolve before scheduling.
