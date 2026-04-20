import { getUser } from "@/lib/auth";
import { getCourseProgress } from "@/lib/course-progress";
import { courseRegistry, getSessionForCourse } from "@/content/courses";
import { MonoLabel } from "@/components/course/mono-label";

export default async function AccountHomePage() {
  const user = await getUser();

  // Fetch progress for all courses, find the most recent active one
  const allProgress = await Promise.all(
    courseRegistry.map(async (c) => ({
      course: c,
      progress: await getCourseProgress(c.id),
    }))
  );

  // Find active course (in-progress first, then most recent)
  const activeCourse =
    allProgress.find((p) => p.progress?.status === "in-progress") ??
    allProgress.find((p) => p.progress?.status === "finished") ??
    allProgress[0];

  const progress = activeCourse?.progress;
  const courseInfo = activeCourse?.course;

  const completedCount = progress?.completed_sessions?.length ?? 0;
  const totalSessions = courseInfo?.total_sessions ?? 10;
  const pct = Math.round((completedCount / totalSessions) * 100);
  const currentSessionData = progress?.current_session_id && courseInfo
    ? getSessionForCourse(courseInfo.id, progress.current_session_id)
    : null;
  const currentWeek = currentSessionData?.week;

  const displayName = user?.user_metadata?.full_name || "Student";

  return (
    <div className="max-w-[1200px] mx-auto w-full py-[52px] px-12 max-md:px-5 max-md:py-8">
      {/* Welcome */}
      <div className="mb-12 pb-10 border-b border-parchment-shadow">
        <MonoLabel color="var(--muted)" className="mb-3">
          Welcome back
        </MonoLabel>
        <h1
          className="font-heading font-light leading-none tracking-tight mb-2.5"
          style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
        >
          Shalom,{" "}
          <em className="font-body italic text-ochre-deep">{displayName}.</em>
        </h1>
        <p
          className="font-body text-[18px] max-w-[500px]"
          style={{ color: "var(--ink-soft)" }}
        >
          Continue where you left off or explore your course materials below.
        </p>
      </div>

      {/* Summary grid */}
      <div className="grid grid-cols-3 gap-6 mb-12 max-lg:grid-cols-1">
        {/* Progress card */}
        <div className="border border-ink p-7 bg-parchment-deep">
          <div className="h-[3px] bg-olive mb-5" />
          <MonoLabel color="var(--muted)" className="mb-3">
            Course Progress
          </MonoLabel>
          <div className="font-heading font-black text-[52px] leading-none text-ochre mb-2">
            {pct}%
          </div>
          <div className="h-1 bg-parchment-shadow rounded-sm overflow-hidden mb-2.5">
            <div
              className="h-full rounded-sm bg-olive"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
            {completedCount} of {totalSessions} sessions
            complete
          </div>
          {courseInfo && (
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted mt-1">
              {courseInfo.title}
            </div>
          )}
        </div>

        {/* Last session card */}
        <div className="border border-ink p-7 bg-parchment-deep">
          <div className="h-[3px] bg-ochre mb-5" />
          <MonoLabel color="var(--muted)" className="mb-3">
            Last Session
          </MonoLabel>
          {currentSessionData ? (
            <>
              <div className="font-heading font-light text-[22px] leading-[1.15] mb-2">
                {currentSessionData.session.title}
              </div>
              <div className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-muted mb-1">
                Session {currentSessionData.session.id} · Week{" "}
                {currentSessionData.week.num}
              </div>
            </>
          ) : (
            <div
              className="font-body text-[17px] italic"
              style={{ color: "var(--ink-soft)" }}
            >
              No sessions started yet
            </div>
          )}
        </div>

        {/* Memory verse card */}
        <div className="border border-ink p-7 bg-parchment-deep">
          <div className="h-[3px] bg-crimson mb-5" />
          <MonoLabel color="var(--muted)" className="mb-3">
            Current Memory Verse
          </MonoLabel>
          {currentWeek ? (
            <>
              <p
                className="font-body italic text-[17px] leading-[1.6] mb-2 pl-3"
                style={{
                  color: "var(--ink-soft)",
                  borderLeft: "2px solid var(--ochre)",
                }}
              >
                &ldquo;{currentWeek.memory_verse.text}&rdquo;
              </p>
              <MonoLabel color="var(--crimson)" className="text-[9.5px]">
                — {currentWeek.memory_verse.ref}
              </MonoLabel>
            </>
          ) : (
            <p
              className="font-body italic text-[17px]"
              style={{ color: "var(--ink-soft)" }}
            >
              Start a course to see your memory verse
            </p>
          )}
        </div>
      </div>

      {/* Quick continue CTA */}
      {progress?.status === "in-progress" && currentSessionData && courseInfo && (
        <div className="border border-ink p-8 px-9 bg-ink flex items-center justify-between flex-wrap gap-5">
          <div>
            <MonoLabel color="var(--ochre)" className="mb-2">
              Continue Where You Left Off
            </MonoLabel>
            <div className="font-heading font-light text-[26px] text-parchment leading-[1.1] mb-1.5">
              Session {currentSessionData.session.id} —{" "}
              {currentSessionData.session.title}
            </div>
            <div
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: "rgba(244,236,220,0.4)" }}
            >
              Week {currentSessionData.week.num} · {currentSessionData.week.title}
            </div>
          </div>
          <a
            href={`/course/${courseInfo.id}/session/${currentSessionData.session.id}`}
            className="btn shrink-0"
            style={{
              background: "var(--ochre)",
              color: "white",
              border: "none",
            }}
          >
            Continue →
          </a>
        </div>
      )}
    </div>
  );
}
