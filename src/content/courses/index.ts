import type { Course, Session, Week } from "@/types/course";
import { foundationsCourse } from "./foundations-of-defending-torah";
import { studyScriptureCourse } from "./how-to-study-scripture";
import { yeshuaPaulCourse } from "./yeshua-paul-torah-question";

export type CourseMetadata = {
  id: string;
  title: string;
  subtitle: string;
  weeks: number;
  total_sessions: number;
  level: string;
  edition: string;
  prerequisite: string | null;
};

export const courseRegistry: CourseMetadata[] = [
  {
    id: foundationsCourse.id,
    title: foundationsCourse.title,
    subtitle: foundationsCourse.subtitle,
    weeks: foundationsCourse.weeks,
    total_sessions: foundationsCourse.total_sessions,
    level: foundationsCourse.level,
    edition: "No. 001",
    prerequisite: null,
  },
  {
    id: studyScriptureCourse.id,
    title: studyScriptureCourse.title,
    subtitle: studyScriptureCourse.subtitle,
    weeks: studyScriptureCourse.weeks,
    total_sessions: studyScriptureCourse.total_sessions,
    level: studyScriptureCourse.level,
    edition: "No. 002",
    prerequisite: foundationsCourse.id,
  },
  {
    id: yeshuaPaulCourse.id,
    title: yeshuaPaulCourse.title,
    subtitle: yeshuaPaulCourse.subtitle,
    weeks: yeshuaPaulCourse.weeks,
    total_sessions: yeshuaPaulCourse.total_sessions,
    level: yeshuaPaulCourse.level,
    edition: "No. 003",
    prerequisite: null, // special: requires BOTH courses 1 and 2
  },
];

// Course 3 requires both courses 1 and 2 — handled in UI logic
export const COURSE_3_PREREQUISITES = [foundationsCourse.id, studyScriptureCourse.id];

const coursesMap: Record<string, Course> = {
  [foundationsCourse.id]: foundationsCourse,
  [studyScriptureCourse.id]: studyScriptureCourse,
  [yeshuaPaulCourse.id]: yeshuaPaulCourse,
};

export function getCourseById(courseId: string): Course | undefined {
  return coursesMap[courseId];
}

export function getAllCourses(): Course[] {
  return [foundationsCourse, studyScriptureCourse, yeshuaPaulCourse];
}

export function getSessionForCourse(courseId: string, sessionId: number): { session: Session; week: Week } | undefined {
  const course = coursesMap[courseId];
  if (!course) return undefined;
  for (const week of course.weeks_data) {
    const session = week.sessions.find((s) => s.id === sessionId);
    if (session) return { session, week };
  }
  return undefined;
}

export function getWeekForCourse(courseId: string, weekNum: number): Week | undefined {
  const course = coursesMap[courseId];
  if (!course) return undefined;
  return course.weeks_data.find((w) => w.num === weekNum);
}

export function getSessionMetadata(courseId: string): Array<{ id: number; title: string; week: number }> {
  const course = coursesMap[courseId];
  if (!course) return [];
  const metadata: Array<{ id: number; title: string; week: number }> = [];
  for (const week of course.weeks_data) {
    for (const session of week.sessions) {
      metadata.push({ id: session.id, title: session.title, week: week.num });
    }
  }
  return metadata;
}
