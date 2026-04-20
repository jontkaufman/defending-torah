# Handoff: Course 3 — Yeshua, Paul, and the Torah Question

## Overview
This is the design handoff for Course 3 of the Defending Torah course platform. It slots into the same Next.js codebase and shared course shell as Courses 1 & 2 — no new UI components needed.

## Files in This Bundle

| File | Purpose |
|------|---------|
| `Defending Torah Course 3.html` | Hi-fi prototype — open in browser to see the full course |
| `course3-data.jsx` | All course data — extract `COURSE_3_DATA` verbatim into a `.ts` file |
| `course-components.jsx` | Shared course shell (already in codebase — provided for reference) |
| `auth-dashboard-components.jsx` | Dashboard with Course 3 card added (already in codebase — provided for reference) |

## What to Build

### 1. Data file
Extract `COURSE_3_DATA` from `course3-data.jsx` verbatim into:
```
/content/courses/yeshua-paul-torah-question.ts
```
Use the same `Course` TypeScript type from Courses 1 & 2. No new types needed.

### 2. Route
The existing `/course/[courseId]` route handles Course 3 automatically — just pass `courseId = 'yeshua-paul-torah-question'` and `getCourse()` returns the right data.

### 3. Dashboard
In `DashboardCourses`, Course 3 card is already wired. Ensure:
- Status reads from `course_progress` for `course_id = 'yeshua-paul-torah-question'`
- Card unlocks only when **both** Course 1 AND Course 2 `status === 'finished'`

## Memory Verses (one per week)
| Week | Reference | Text |
|------|-----------|------|
| 1 | Matthew 5:19 | Whoever relaxes one of the least of these commandments… |
| 2 | Romans 3:31 | Do we then overthrow the law by this faith? By no means! |
| 3 | Romans 7:12 | So the law is holy, and the commandment is holy and righteous and good. |
| 4 | Romans 6:15 | Are we to sin because we are not under law but under grace? By no means! |
| 5 | 1 John 2:6 | Whoever says he abides in him ought to walk in the same way in which he walked. |

## Prerequisite Logic
Course 3 is locked until **both** Course 1 AND Course 2 `status === 'finished'` in `course_progress`.

## Hero Identity
- Hebrew figure: שָׁאוּל (Sha'ul — Paul)
- Key quote: Romans 7:12
- Watermark: אֱמֶת (truth)
- Scroll plate tagline: "apostle · often misread"
