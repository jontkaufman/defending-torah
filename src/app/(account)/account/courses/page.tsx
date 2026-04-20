import { getCourseProgress, startCourse, resetCourse } from "@/lib/course-progress";
import {
  foundationsCourse,
  getSession,
} from "@/content/courses/foundations-of-defending-torah";
import { CoursesPageClient } from "./courses-page-client";

// Session metadata for the checklist
const sessionMetadata = [
  { id: 1, title: "What Is Torah?", week: 1 },
  { id: 2, title: "Does God Change?", week: 1 },
  { id: 3, title: "What Did Yeshua Actually Teach?", week: 2 },
  { id: 4, title: "Did Yeshua Start a New Religion?", week: 2 },
  { id: 5, title: '"Not Under Law"', week: 3 },
  { id: 6, title: "Did Paul Reject Torah?", week: 3 },
  { id: 7, title: '"Nailed to the Cross"', week: 4 },
  { id: 8, title: "Sabbath, Food & Labels", week: 4 },
  { id: 9, title: "Respond Without Pride", week: 5 },
  { id: 10, title: "How to Keep Growing", week: 5 },
];

export default async function CoursesPage() {
  const progress = await getCourseProgress(foundationsCourse.id);

  const completedSessions = progress?.completed_sessions ?? [];
  const currentSessionId = progress?.current_session_id ?? null;
  const status = progress?.status ?? "not-started";
  const currentSessionData = currentSessionId ? getSession(currentSessionId) : null;

  return (
    <CoursesPageClient
      status={status}
      completedSessions={completedSessions}
      totalSessions={foundationsCourse.total_sessions}
      currentSessionId={currentSessionId}
      currentSessionTitle={currentSessionData?.session.title ?? null}
      sessionMetadata={sessionMetadata}
    />
  );
}
