# Handoff: Course 2 — How to Study Scripture Without Contradiction

## Overview
This is the design handoff for Course 2 of the Defending Torah course platform. It slots into the same Next.js codebase and shared course shell as Course 1 — no new UI components needed.

## Files in This Bundle

| File | Purpose |
|------|---------|
| `Defending Torah Course 2.html` | Hi-fi prototype — open in browser to see the full course |
| `course2-data.jsx` | All course data — extract `COURSE_2_DATA` verbatim into a `.ts` file |
| `course-components.jsx` | Shared course shell (already in codebase from Course 1 handoff — provided here for reference) |
| `auth-dashboard-components.jsx` | Dashboard with Course 2 card added (already in codebase — provided for reference) |

## What to Build

### 1. Data file
Extract `COURSE_2_DATA` from `course2-data.jsx` verbatim into:
```
/content/courses/how-to-study-scripture.ts
```
Use the same `Course` TypeScript type from Course 1. No new types needed.

### 2. Route
The existing `/course/[courseId]` route handles Course 2 automatically — just pass `courseId = 'how-to-study-scripture'` and `getCourse()` returns the right data.

### 3. Dashboard
In `DashboardCourses`, Course 2 card is already wired. Ensure:
- Status reads from `course_progress` for `course_id = 'how-to-study-scripture'`
- Card unlocks (shows Begin button) when Course 1 `status === 'finished'`

## Special: StudyMethodCard (Session 9)
Session 9 has a `study_method` array on its data object. The shared `SessionView` already checks for `session.study_method` and renders `StudyMethodCard` automatically. No extra work needed — just make sure the array is present in the data file.

## Memory Verses (one per week)
| Week | Reference | Text |
|------|-----------|------|
| 1 | 2 Timothy 3:16–17 | All Scripture is breathed out by God… |
| 2 | Psalm 119:18 | Open my eyes, that I may behold… |
| 3 | Acts 17:11 | They received the word with all eagerness… |
| 4 | 2 Timothy 2:15 | Do your best to present yourself to God… |
| 5 | Joshua 1:8 | This Book of the Torah shall not depart… |

## Prerequisite Logic
Course 2 is locked until Course 1 `status === 'finished'` in `course_progress`.
