# Defending Torah — Content Generation Standards

Condensed from the canonical [Research & Publication Standards](../Torah/wiki/topics/research-publication-standards.md). When in doubt, consult the full document.

---

## Identity

Torah apologetics site. Messianic/Hebrew Roots framework. Core thesis: Torah and grace are not in opposition; the covenant is continuous; Yeshua is understood within his Second Temple Jewish context.

---

## Hermeneutical Commitments

1. **OT-First Reading** — NT is commentary on Tanakh, not replacement. OT context governs ambiguous NT passages.
2. **Hebrew Primacy** — Start with Hebrew terms, not translations. Flag translation bias ("law" for Torah, "Old Testament" framing).
3. **Second Temple Context** — Default interpretive lens. Ask: what would a 1st-century Torah-observant Jew understand?
4. **Covenantal Continuity** — Assume continuity unless text explicitly signals discontinuity. "Fulfill" = completion, not annulment.
5. **Disclosed Framework** — Never hide the Messianic/Hebrew Roots lens. Arguments must stand on evidence independent of framework.

---

## Steelman Requirement

Every essay on a contested topic must:
- State the **strongest** opposing argument (scholarly form, not straw man)
- Acknowledge mainstream scholarly consensus when it cuts against our thesis
- Never pretend a hard question is easy

---

## Confidence Levels

Use in research notes; condense in published content:

- **[Established]** — broad consensus, strong textual support
- **[Probable]** — strong evidence, minority dissent
- **[Working hypothesis]** — reasoned position, evidence contested
- **[Open question]** — genuinely uncertain
- **[Disputed]** — active scholarly debate

---

## Inconvenient Evidence

If evidence complicates the thesis: **include it**. Note it, respond to it, or mark it open. Never bury it. This is the single most important credibility behavior.

---

## Language & Terminology

### Preferred Terms

| Use | Avoid | Reason |
|-----|-------|--------|
| Yeshua | Jesus (in theological contexts) | Restores 1st-century Jewish identity |
| Torah | The Law | "Law" implies legal code; Torah = instruction |
| Apostolic writings | New Testament (where possible) | Continuation, not replacement |
| Tanakh | Old Testament (where possible) | Avoids supersessionist framing |
| YHWH or HaShem | LORD (in analysis) | Awareness of divine name |
| Chen | Grace (when treating Hebrew concept) | Preserves Hebrew semantic range |
| Brit | Covenant (in word study contexts) | Keeps Hebrew primary |
| Mitzvot | Commandments / laws | Covenantal register |

### Rules
- Introduce Hebrew on first use with transliteration + definition; use consistently after
- Hebrew terms only when they carry semantic weight English loses — not decoration
- Quote Hebrew/Greek with working translation; name published translations explicitly
- Flag interpretive translation choices that affect arguments

### Tone
- Scholarly but accessible (no seminary jargon required to follow)
- Intellectually confident, not combative
- Never condescending toward critiqued traditions
- Investigating, not prosecuting

---

## Content Structure Templates

### Article (Full-Length)
1. The question stated plainly — what and why it matters
2. The common answer — what most readers have been taught
3. The textual/historical evidence — primary sources
4. Engagement with best objection — steelmanned and answered
5. Conclusion — with confidence level
6. Footnotes — inline, SBL-adjacent
7. Further reading — 3–5 sources (essential / recommended / worth engaging)

### Objection-Response
1. The objection — strongest scholarly form, cited
2. What makes it serious — genuine force acknowledged
3. The response — textual, historical, logical
4. What remains uncertain
5. Confidence level

### Word Study
1. Hebrew/Greek term, root, semantic range
2. Lexical sources (BDB, HALOT, TDNT, TDOT)
3. Representative canonical usage survey
4. Function in key passage(s)
5. Where English translation distorts
6. Cross-links to related content

### Notes (Short-Form)
- 300–700 words
- Single observation, text, or term
- Minimal apparatus (a source or two)

---

## Intellectual Honesty Commitments

Never produce content that violates these:

- Correct errors publicly with visible revision notes
- Never pretend certainty we do not have
- Cite scholars we disagree with — critique requires engagement
- Disclose the framework upfront
- Never oversimplify for persuasion — hard passages stay hard

---

## Site Architecture

### Tech Stack
- Next.js (App Router), Tailwind CSS, gray-matter + next-mdx-remote
- Deployed on Cloudflare via @opennextjs/cloudflare

### Directory Structure

```
defend/
├── content/
│   ├── articles/          # Full-length argumentative essays (.md)
│   ├── objections/        # Quick objection responses (.md)
│   └── deep-dives/        # Extended analyses (.md)
├── posts/                 # Blog posts (.md)
├── public/
│   └── laws-data.json     # Torah laws database
└── src/
    ├── app/               # Next.js routes
    │   ├── articles/      # /articles, /articles/[slug]
    │   ├── blog/          # /blog, /blog/[slug]
    │   ├── objection-finder/  # /objection-finder, /objection-finder/[slug]
    │   └── torah-laws/    # /torah-laws
    ├── components/
    └── lib/
        ├── content.ts     # Article/objection loading
        ├── posts.ts       # Blog post loading
        └── laws.ts        # Torah laws logic
```

### Frontmatter Schemas

#### Articles (`content/articles/*.md`)
```yaml
---
title: "Article Title"
excerpt: "Brief summary for cards/previews"
category: arguments
tags: [tag1, tag2]
difficulty: entry | intermediate | deep-dive
date: YYYY-MM-DD
related: []              # Slugs of related content
---
```

#### Objections (`content/objections/*.md`)
```yaml
---
title: "Objection Title"
excerpt: "Brief preview text"
objection: "The full objection as commonly stated"
quick_answer: "30-second response"
key_points:
  - "First key point"
  - "Second key point"
  - "Third key point"
category: arguments
tags: [tag1, tag2]
difficulty: entry | intermediate | deep-dive
date: YYYY-MM-DD
related: []
article_slug: slug       # Optional: link to full article
deep_dive_slug: slug      # Optional: link to deep-dive
---
```

#### Blog Posts (`posts/*.md`)
```yaml
---
title: "Post Title"
excerpt: "Brief summary"
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```

### Content Conventions
- Slugs derived from filename (minus `.md`)
- Dates in ISO format (YYYY-MM-DD)
- Tags lowercase
- Difficulty: "entry", "intermediate", "deep-dive"
- Related content linked via slug arrays
- Markdown body rendered with MDX
