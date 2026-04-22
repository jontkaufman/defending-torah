# Jesus New Commandments Objection Post Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write objection post showing Jesus' "new" commandments are Torah explanations, not replacements

**Architecture:** Single markdown file with frontmatter, smoking gun opening, 10 rapid-fire examples (each 50-100 words), brief conclusion

**Tech Stack:** Markdown, YAML frontmatter (Next.js gray-matter compatible)

---

## File Structure

**Create:**
- `content/objections/jesus-new-commandments.md` — The objection post (complete markdown with frontmatter + body)

**Reference (no modifications):**
- `content/objections/mark-7-19-all-foods-clean.md` — Consistency check for Example 9 (food laws context)
- `content/articles/matthew-5-17-19-foundation.md` — Related article link
- `docs/superpowers/specs/2026-04-22-jesus-new-commandments-design.md` — Design spec

---

### Task 1: Create Frontmatter and Opening

**Files:**
- Create: `content/objections/jesus-new-commandments.md`

- [ ] **Step 1: Write frontmatter**

Create file with YAML frontmatter:

```yaml
---
title: "\"Jesus Gave Us New Commandments That Replaced the Torah\""
excerpt: "Jesus' greatest commandments are just Torah quotes. So are his 'new' teachings about anger, lust, enemies, and the Sabbath. He was a Torah teacher, not a Torah replacer."
objection: "Jesus gave us new commandments that replaced the Old Testament law. When he said 'love God and love your neighbor,' he was summarizing everything we need—we don't need the detailed Torah anymore. His Sermon on the Mount teachings show he was giving us something new and better than what Moses gave."
quick_answer: "The 'new' commandments are direct Torah quotes. Jesus quotes Deuteronomy 6:5 and Leviticus 19:18 verbatim. And every teaching in the Sermon on the Mount that sounds innovative—anger, lust, loving enemies—has Torah roots. Jesus was explaining Torah, not replacing it."
key_points:
  - "The Greatest Commandment is two direct Torah quotes (Deut 6:5 + Lev 19:18) presented as if they're new—revealing the pattern."
  - "Jesus' 'You have heard... but I say' formula is standard rabbinic teaching style—explicating Torah's full meaning, not overriding it."
  - "Internal righteousness (anger, lust, hatred) is commanded throughout Torah (Lev 19:17-18, Exod 20:17). Jesus intensifies, doesn't invent."
  - "Jesus himself said: 'Do not think I came to abolish the Law' (Matt 5:17). His teachings prove it—every 'new' command traces back."
category: arguments
tags: [yeshua, sermon-on-mount, commandments, torah, matthew, teaching]
difficulty: entry
date: 2026-04-22
related: [matthew-5-17-19-foundation, moral-ceremonial-civil-division, galatians-paul-abolished-law]
article_slug: matthew-5-17-19-foundation
---
```

- [ ] **Step 2: Write smoking gun opening**

Add opening paragraph after frontmatter:

```markdown
When asked which commandment is greatest, Yeshua answered: "Love the Lord your God with all your heart, soul, and mind" (Deuteronomy 6:5) and "Love your neighbor as yourself" (Leviticus 19:18). These are often taught as Yeshua's new summary of everything—a fresh, revolutionary ethic that replaces the detailed Torah. But they're not new at all. They're verbatim Torah quotes.

This isn't an exception. It's the pattern. Here are 10 examples showing Yeshua taught Torah, not a replacement for it.
```

- [ ] **Step 3: Verify file syntax**

Check:
- YAML frontmatter closed with `---`
- Opening uses "Yeshua" consistently
- Tone: firm, non-antagonistic
- Pattern established clearly

- [ ] **Step 4: Commit**

```bash
git add content/objections/jesus-new-commandments.md
git commit -m "feat: add Jesus new commandments objection - frontmatter and opening"
```

---

### Task 2: Write Slam-Dunk Examples (1-3)

**Files:**
- Modify: `content/objections/jesus-new-commandments.md`

- [ ] **Step 1: Write Example 1 - Greatest Commandment**

Add to file:

```markdown
## 1. The Greatest Commandment

**Yeshua said:** "Love the Lord your God with all your heart and with all your soul and with all your mind... Love your neighbor as yourself." (Matthew 22:37-39)

**Why it sounds new:** This is presented as Yeshua's innovative summary that replaces the need for detailed Torah.

**Torah source:** Deuteronomy 6:5 + Leviticus 19:18 (verbatim quotes)

**The connection:** These are not a summary replacing Torah. They are two Torah commands Yeshua identifies as foundational—the whole Torah hangs on them, but it still hangs. He's not condensing 613 commands into 2. He's pointing to the center of gravity.
```

- [ ] **Step 2: Write Example 2 - Golden Rule**

Add to file:

```markdown
## 2. The Golden Rule

**Yeshua said:** "In everything, do to others what you would have them do to you, for this sums up the Law and the Prophets." (Matthew 7:12)

**Why it sounds new:** Seems like Yeshua's unique ethical principle—a universal moral law independent of Torah.

**Torah source:** Leviticus 19:18 — "Love your neighbor as yourself."

**The connection:** This was already active Torah teaching tradition. Hillel (1st century BCE) gave the negative form: "What is hateful to you, do not do to another." Yeshua gives the positive form. Both are explicating Leviticus 19:18. Not invention—interpretation.
```

- [ ] **Step 3: Write Example 3 - Honor Parents**

Add to file:

```markdown
## 3. Honor Your Father and Mother

**Yeshua said:** "You set aside the commandment of God in order to keep your tradition. For Moses said, 'Honor your father and mother'... but you say a man can declare his assets 'Corban' (devoted to God) and refuse to help his parents." (Mark 7:9-11)

**Why it sounds new:** Yeshua asserting authority over tradition sounds like He's making new law.

**Torah source:** Exodus 20:12, Deuteronomy 5:16 — the Fifth Commandment.

**The connection:** Yeshua is defending Torah against human tradition that was nullifying it. Not creating new law—protecting the original command from being set aside by rabbinic loopholes.
```

- [ ] **Step 4: Verify examples**

Check each:
- 50-100 words
- Steelman present ("Why it sounds new")
- Torah source cited
- Connection explains, not just asserts
- Consistent format

- [ ] **Step 5: Commit**

```bash
git add content/objections/jesus-new-commandments.md
git commit -m "feat: add examples 1-3 (slam-dunks)"
```

---

### Task 3: Write Torah Deepening Examples (4-6)

**Files:**
- Modify: `content/objections/jesus-new-commandments.md`

- [ ] **Step 1: Write Example 4 - Murder Starts in the Heart**

Add to file:

```markdown
## 4. Murder Starts in the Heart

**Yeshua said:** "You have heard it said, 'Do not murder,' but I say to you that everyone who is angry with his brother will be liable to judgment." (Matthew 5:21-22)

**Why it sounds new:** The "You have heard... but I say" formula sounds like Yeshua is overriding Moses with His own authority.

**Torah source:** Leviticus 19:17 — "You shall not hate your brother in your heart."

**The connection:** Torah already prohibited internal hatred. Yeshua is not adding to the commandment against murder—He's teaching what it always included. Anger is the seed; murder is the fruit. This is Torah explication, not innovation.
```

- [ ] **Step 2: Write Example 5 - Adultery Starts with Lust**

Add to file:

```markdown
## 5. Adultery Starts with Lust

**Yeshua said:** "You have heard it said, 'Do not commit adultery,' but I say to you that everyone who looks at a woman with lust has already committed adultery with her in his heart." (Matthew 5:27-28)

**Why it sounds new:** Yeshua seems to be adding internal thought-crime to what was only an external act.

**Torah source:** Exodus 20:17 — "You shall not covet your neighbor's wife."

**The connection:** The Tenth Commandment already addressed internal desire. Yeshua is showing the connection between coveting (Torah) and adultery (Torah). He's explicating what Torah always meant—lust is the root, adultery is the outcome. Not adding—clarifying.
```

- [ ] **Step 3: Write Example 6 - Eye for Eye → Turn the Other Cheek**

Add to file:

```markdown
## 6. Eye for Eye → Turn the Other Cheek

**Yeshua said:** "You have heard it said, 'Eye for eye, tooth for tooth,' but I tell you, do not resist an evil person. If anyone slaps you on the right cheek, turn to them the other cheek also." (Matthew 5:38-39)

**Why it sounds new:** Yeshua appears to be replacing Torah's harsh justice with radical mercy.

**Torah source:** Exodus 21:24, Leviticus 24:20 — the principle of proportional justice.

**The connection:** "Eye for eye" is a judicial standard limiting punishment to proportionality, not a personal vengeance mandate. Torah never commanded individuals to retaliate—it limited courts to fair penalties. Yeshua is teaching personal mercy in relationships, distinct from judicial contexts. Not replacing Torah—applying it rightly.
```

- [ ] **Step 4: Verify examples**

Check:
- "But I say" formula explained (rabbinic teaching style, not override)
- Example 6 notes interpretive move (judicial vs. personal distinction)
- Tone: intellectually confident, not combative
- Word count in range

- [ ] **Step 5: Commit**

```bash
git add content/objections/jesus-new-commandments.md
git commit -m "feat: add examples 4-6 (Torah deepening - anger, lust, eye for eye)"
```

---

### Task 4: Write Torah Deepening Examples (7-8)

**Files:**
- Modify: `content/objections/jesus-new-commandments.md`

- [ ] **Step 1: Write Example 7 - Love Your Enemies**

Add to file:

```markdown
## 7. Love Your Enemies

**Yeshua said:** "You have heard it said, 'Love your neighbor and hate your enemy.' But I tell you, love your enemies and pray for those who persecute you." (Matthew 5:43-44)

**Why it sounds new:** Yeshua appears to transcend Torah's tribal love ethic with universal love.

**Torah source:** Exodus 23:4-5 (help your enemy's animal), Leviticus 19:18 (love your neighbor), Leviticus 19:33-34 (love the foreigner as yourself).

**The connection:** "Hate your enemy" is not in Torah—it's a Pharisaic addition. Yeshua corrects the tradition and points back to what Torah actually says: love extends to enemies (help them) and foreigners (treat as yourself). He's not transcending Torah—He's defending it against a distortion.
```

- [ ] **Step 2: Write Example 8 - Sabbath Made for Man**

Add to file:

```markdown
## 8. The Sabbath Was Made for Man

**Yeshua said:** "The Sabbath was made for man, not man for the Sabbath. So the Son of Man is Lord even of the Sabbath." (Mark 2:27-28)

**Why it sounds new:** Yeshua asserting lordship over the Sabbath sounds like He's loosening or overriding Torah restrictions.

**Torah source:** Exodus 16:29, 20:8-11 — Sabbath commanded as a gift of rest.

**The connection:** Yeshua is defending Torah Sabbath against Pharisaic additions—like their prohibition against plucking grain to eat (considered "harvesting"). Torah never made Sabbath a burden. It was given as gracious rest. Yeshua is not changing the Sabbath command—He's restoring its original intent.
```

- [ ] **Step 3: Verify examples**

Check:
- Example 7 clarifies "hate your enemy" is tradition, not Torah
- Example 8 distinguishes Torah Sabbath from Pharisaic additions
- Both show Yeshua defending Torah against tradition
- Consistent tone and format

- [ ] **Step 4: Commit**

```bash
git add content/objections/jesus-new-commandments.md
git commit -m "feat: add examples 7-8 (love enemies, Sabbath)"
```

---

### Task 5: Write Torah Deepening Examples (9-10)

**Files:**
- Modify: `content/objections/jesus-new-commandments.md`
- Reference: `content/objections/mark-7-19-all-foods-clean.md` (consistency check)

- [ ] **Step 1: Write Example 9 - What Defiles Comes from Within**

Add to file:

```markdown
## 9. What Defiles Comes from Within

**Yeshua said:** "Nothing outside a person can defile them by going into them. Rather, it is what comes out of a person that defiles them." (Mark 7:15)

**Why it sounds new:** Sounds like Yeshua is declaring all foods clean and abolishing dietary laws.

**Torah source:** Leviticus 11 (clean/unclean animals) vs. Pharisaic hand-washing tradition (not in Torah).

**The connection:** The entire dispute in Mark 7 is about hand-washing before eating bread—not about unclean animals. "All foods clean" (v. 19) means kosher foods don't become defiling through unwashed hands. Yeshua's point: internal sin (murder, theft, adultery—listed in v. 21-22) truly defiles, not external ritual additions. He's targeting tradition, not Torah. (See our [detailed treatment of Mark 7:19](/objection-finder/mark-7-19-all-foods-clean).)
```

- [ ] **Step 2: Verify Example 9 consistency with existing content**

Read `content/objections/mark-7-19-all-foods-clean.md` and check:
- Context emphasis (hand-washing, not food categories) matches
- "All foods clean" interpretation (kosher foods + unwashed hands) consistent
- Link to existing objection post included
- No contradictions introduced

- [ ] **Step 3: Write Example 10 - Do Not Judge**

Add to file:

```markdown
## 10. Do Not Judge

**Yeshua said:** "Do not judge, or you too will be judged. For in the same way you judge others, you will be judged, and with the measure you use, it will be measured to you." (Matthew 7:1-2)

**Why it sounds new:** Sounds like Yeshua is forbidding all judgment, promoting radical tolerance.

**Torah source:** Leviticus 19:15 — "Judge your neighbor fairly." Deuteronomy 1:16-17 — righteous judgment is required.

**The connection:** Yeshua is not forbidding all judgment—Torah requires righteous judgment of sin. He's warning against hypocritical judgment (see the very next verses, Matthew 7:3-5, about the speck and the plank). "The measure you use" echoes Torah's principle of honest measures (Leviticus 19:35-36, Deuteronomy 25:13-16). Judge rightly, not hypocritically.
```

- [ ] **Step 4: Verify examples**

Check:
- Example 9 handles Mark 7 carefully (contested passage)
- Example 10 clarifies "do not judge" vs. "judge rightly"
- Both maintain steelman → Torah source → connection format
- Link in Example 9 uses correct path format

- [ ] **Step 5: Commit**

```bash
git add content/objections/jesus-new-commandments.md
git commit -m "feat: add examples 9-10 (internal defilement, judging)"
```

---

### Task 6: Write Conclusion and Final Review

**Files:**
- Modify: `content/objections/jesus-new-commandments.md`

- [ ] **Step 1: Write conclusion**

Add closing section:

```markdown
## The Pattern Is Clear

Yeshua didn't give a different law—He taught Torah with authority. When He said "but I say," He wasn't overriding Moses. He was explaining what Moses always meant. Every "new" commandment traces back to Sinai. Not replacement—explication.

He told you Himself: "Do not think that I came to abolish the Law or the Prophets; I did not come to abolish but to fulfill" (Matthew 5:17). His teachings prove it.

**Confidence level:** [Established] for direct Torah quotes (Greatest Commandment, Golden Rule, Honor Parents). [Probable] overall, since some applications involve interpretive moves standard in Jewish exegesis (judicial vs. personal contexts for "eye for eye," Mark 7's hand-washing vs. food law distinction).
```

- [ ] **Step 2: Full content review**

Read entire file and verify:
- All 10 examples present in correct order
- Each example 50-100 words (check word count)
- Steelman present in every example ("Why it sounds new")
- Torah sources cited accurately
- Connections explain, not just assert
- Tone: firm, non-antagonistic, intellectually confident
- Uses "Yeshua" consistently in theological contexts
- No placeholder language (TBD, TODO, etc.)
- Confidence level marked with honest caveats

- [ ] **Step 3: Verify frontmatter rendering compatibility**

Check:
- YAML frontmatter properly closed with `---`
- All list items in `key_points` and `related` properly formatted
- No YAML syntax errors (quotes escaped, lists use hyphens)
- Date format: YYYY-MM-DD
- Tags lowercase, hyphenated

- [ ] **Step 4: Verify internal consistency**

Check:
- Matthew 5:17 reference in conclusion matches opening thesis
- Mark 7 treatment consistent with linked objection post
- "But I say" explanation consistent across examples 4-7
- Related links all valid slugs

- [ ] **Step 5: Commit**

```bash
git add content/objections/jesus-new-commandments.md
git commit -m "feat: complete Jesus new commandments objection post

- 10 rapid-fire examples showing Torah continuity
- Smoking gun opening with Greatest Commandment
- Steelman approach for each example
- Confidence level with honest caveats
- Links to related content

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Plan Self-Review

**Spec coverage check:**

1. ✓ Frontmatter with all required fields (Task 1)
2. ✓ Smoking gun opening (Task 1)
3. ✓ 10 examples in rapid-fire format (Tasks 2-5)
   - ✓ 3 slam-dunks (Task 2)
   - ✓ 7 Torah deepenings (Tasks 3-5)
4. ✓ Each example: Jesus quote → steelman → Torah source → connection (all tasks)
5. ✓ Brief conclusion (Task 6)
6. ✓ Confidence level (Task 6)
7. ✓ Related links (frontmatter, Task 1)
8. ✓ Tone: firm, non-antagonistic (all tasks)
9. ✓ Mark 7 handled carefully with consistency check (Task 5, step 2)
10. ✓ Eye-for-eye interpretive move noted (Task 3)

**Placeholder scan:** None. All examples include full content.

**Type/reference consistency:**
- Yeshua used consistently
- Torah capitalized consistently
- Scripture references match format (Book chapter:verse)
- Related slugs match existing files

**No gaps found.**

---

## Success Criteria

After implementation, reader should think:
- "I never noticed the Greatest Commandment was a quote, not an invention"
- "The pattern holds—Yeshua kept pointing back to Torah"
- "The 'but I say' formula wasn't replacement, it was explanation"
- "I need to read Matthew 5:17-19 and re-evaluate what I've been taught"

Measurable:
- File passes Next.js gray-matter parsing (valid YAML)
- Word count per example: 50-100 words
- Total body: ~900-1000 words
- All 10 examples present
- Steelman in every example
- No TBD/TODO/placeholder text
