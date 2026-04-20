import { getCourseProgress } from "@/lib/course-progress";
import { courseRegistry, getSessionMetadata, getSessionForCourse, COURSE_3_PREREQUISITES } from "@/content/courses";
import { CoursesPageClient } from "./courses-page-client";

export type CourseProgressData = {
  courseId: string;
  title: string;
  subtitle: string;
  edition: string;
  level: string;
  weeks: number;
  totalSessions: number;
  prerequisite: string | null;
  status: "not-started" | "in-progress" | "finished";
  completedSessions: number[];
  currentSessionId: number | null;
  currentSessionTitle: string | null;
  sessionMetadata: Array<{ id: number; title: string; week: number }>;
  locked: boolean;
};

export default async function CoursesPage() {
  // Fetch progress for all courses in parallel
  const progressPromises = courseRegistry.map((c) => getCourseProgress(c.id));
  const progressResults = await Promise.all(progressPromises);

  // Build progress map for prerequisite checks
  const progressMap = new Map<string, typeof progressResults[0]>();
  courseRegistry.forEach((c, i) => {
    progressMap.set(c.id, progressResults[i]);
  });

  const coursesData: CourseProgressData[] = courseRegistry.map((course, i) => {
    const progress = progressResults[i];
    const completedSessions = progress?.completed_sessions ?? [];
    const currentSessionId = progress?.current_session_id ?? null;
    const status = progress?.status ?? "not-started";
    const currentSessionData = currentSessionId
      ? getSessionForCourse(course.id, currentSessionId)
      : null;

    // Prerequisite logic
    let locked = false;
    if (course.id === COURSE_3_PREREQUISITES[0]) {
      // Course 1 — never locked
      locked = false;
    } else if (course.prerequisite) {
      // Course 2 — requires course 1 finished
      const prereqProgress = progressMap.get(course.prerequisite);
      locked = prereqProgress?.status !== "finished";
    } else if (course.id === "yeshua-paul-torah-question") {
      // Course 3 — requires BOTH courses 1 and 2 finished
      locked = COURSE_3_PREREQUISITES.some((prereqId) => {
        const prereqProgress = progressMap.get(prereqId);
        return prereqProgress?.status !== "finished";
      });
    }

    return {
      courseId: course.id,
      title: course.title,
      subtitle: course.subtitle,
      edition: course.edition,
      level: course.level,
      weeks: course.weeks,
      totalSessions: course.total_sessions,
      prerequisite: course.prerequisite,
      status,
      completedSessions,
      currentSessionId,
      currentSessionTitle: currentSessionData?.session.title ?? null,
      sessionMetadata: getSessionMetadata(course.id),
      locked,
    };
  });

  return <CoursesPageClient courses={coursesData} />;
}
