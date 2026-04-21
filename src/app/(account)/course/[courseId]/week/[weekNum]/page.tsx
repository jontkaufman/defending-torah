import Link from "next/link";
import { notFound } from "next/navigation";
import { MonoLabel } from "@/components/course/mono-label";
import { getCourseById, getWeekForCourse } from "@/content/courses";
import { getCourseProgress } from "@/lib/course-progress";

type Props = {
  params: Promise<{ courseId: string; weekNum: string }>;
};

export default async function WeekViewPage({ params }: Props) {
  const { courseId, weekNum: weekNumStr } = await params;
  const weekNum = parseInt(weekNumStr, 10);
  const course = getCourseById(courseId);

  if (!course) {
    return notFound();
  }

  const week = getWeekForCourse(courseId, weekNum);

  if (!week) {
    return notFound();
  }

  const progress = await getCourseProgress(courseId);

  // Calculate week progress
  const weekSessionIds = week.sessions.map((s) => s.id);
  const completedInWeek = weekSessionIds.filter((id) =>
    progress?.completed_sessions.includes(id)
  );
  const weekProgress = (completedInWeek.length / week.sessions.length) * 100;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="py-4 px-16 border-b border-parchment-shadow bg-parchment-deep flex items-center gap-2.5">
        <Link
          href={`/course/${courseId}`}
          className="font-mono text-[10px] tracking-[0.18em] uppercase text-ochre no-underline hover:text-ochre-deep transition-colors"
        >
          Course
        </Link>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
          →
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink">
          Week {weekNum}
        </span>
      </div>

      {/* Week Header Section */}
      <section
        className="px-16 pt-[60px] pb-[70px] border-b border-ink"
        style={{ paddingLeft: "64px", paddingRight: "64px" }}
      >
        <div
          className="grid items-end mb-12"
          style={{ gridTemplateColumns: "1fr auto", gap: "40px" }}
        >
          {/* Left */}
          <div>
            <MonoLabel color="var(--crimson)" className="mb-4">
              Week {weekNum} of {course.weeks}
            </MonoLabel>
            <h1
              className="font-heading font-light leading-[0.98] tracking-[-0.03em] mb-[10px]"
              style={{
                fontSize: "clamp(40px, 5vw, 68px)",
              }}
            >
              {week.title}
            </h1>
            <p className="font-body italic text-[22px] text-ochre-deep">
              {week.subtitle}
            </p>
          </div>

          {/* Right */}
          <div className="min-w-[200px] text-right">
            <MonoLabel color="var(--muted)" className="mb-2">
              Week Progress
            </MonoLabel>
            <div className="h-1 bg-parchment-shadow rounded-sm overflow-hidden mb-1.5">
              <div
                className="h-full bg-olive rounded-sm transition-all duration-300"
                style={{ width: `${weekProgress}%` }}
              />
            </div>
            <MonoLabel color="var(--muted)">
              {completedInWeek.length} of {week.sessions.length} sessions complete
            </MonoLabel>
          </div>
        </div>

        {/* Two Session Cards */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {week.sessions.map((session, idx) => {
            const isComplete = progress?.completed_sessions.includes(session.id);
            const stripeColor = idx === 0 ? "var(--ochre)" : "var(--crimson)";

            return (
              <div
                key={session.id}
                className="border border-ink bg-parchment-deep overflow-hidden"
              >
                {/* Top stripe */}
                <div
                  className="h-[3px]"
                  style={{ backgroundColor: stripeColor }}
                />

                {/* Card content */}
                <div className="p-7 pb-6">
                  {/* Header row */}
                  <div className="flex justify-between items-start mb-3">
                    <MonoLabel color={stripeColor}>
                      Session {session.id} of {course.total_sessions}
                    </MonoLabel>
                    {isComplete ? (
                      <span
                        className="font-mono text-[9.5px] tracking-[0.15em] uppercase bg-[rgba(92,107,63,0.12)] border border-olive text-olive py-[3px] px-2.5"
                        style={{ lineHeight: 1 }}
                      >
                        Complete ✓
                      </span>
                    ) : (
                      <span
                        className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow text-muted py-[3px] px-2.5"
                        style={{ lineHeight: 1 }}
                      >
                        Not started
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-heading font-light text-[28px] leading-[1.1] mb-3">
                    {session.title}
                  </h2>

                  {/* Big idea */}
                  <p className="font-body text-[17px] text-ink-soft leading-[1.55] mb-5">
                    <em>Big idea:</em> {session.big_idea}
                  </p>

                  {/* Footer */}
                  <div className="border-t border-parchment-shadow pt-4 flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-[9.5px] border border-parchment-shadow text-muted py-[3px] px-2.5">
                      45 min
                    </span>
                    <span className="font-mono text-[9.5px] border border-parchment-shadow text-muted py-[3px] px-2.5">
                      10 Steps
                    </span>
                    <span className="font-mono text-[9.5px] border border-parchment-shadow text-muted py-[3px] px-2.5">
                      1 hr homework
                    </span>
                    <Link
                      href={`/course/${courseId}/session/${session.id}`}
                      className={`ml-auto font-mono text-[10.5px] tracking-[0.2em] uppercase py-2.5 px-5 no-underline transition-all hover:scale-105 ${
                        isComplete
                          ? "bg-olive text-parchment"
                          : "bg-ink text-parchment"
                      }`}
                    >
                      {isComplete ? "Review →" : "Begin →"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Memory Verse */}
        <div className="border-l-[3px] border-ochre py-5 px-7 bg-[rgba(151,94,34,0.06)] border border-parchment-shadow">
          <MonoLabel color="var(--ochre)" className="mb-3">
            Week {weekNum} Memory Verse
          </MonoLabel>
          <p className="font-body italic text-[22px] leading-[1.6] text-ink-soft mb-2">
            &ldquo;{week.memory_verse.text}&rdquo;
          </p>
          <MonoLabel color="var(--crimson)">
            — {week.memory_verse.ref}
          </MonoLabel>
        </div>
      </section>

      {/* Week Navigation */}
      <div className="py-6 px-16 flex justify-between border-b border-parchment-shadow">
        {/* Left button */}
        {weekNum > 1 ? (
          <Link
            href={`/course/${courseId}/week/${weekNum - 1}`}
            className="btn-ghost py-2.5 px-5 font-mono text-[10.5px] tracking-[0.2em] uppercase no-underline transition-all hover:bg-ink hover:text-parchment"
          >
            ← Week {weekNum - 1}
          </Link>
        ) : (
          <Link
            href={`/course/${courseId}`}
            className="btn-ghost py-2.5 px-5 font-mono text-[10.5px] tracking-[0.2em] uppercase no-underline transition-all hover:bg-ink hover:text-parchment"
          >
            ← Course Overview
          </Link>
        )}

        {/* Right button */}
        {weekNum < course.weeks ? (
          <Link
            href={`/course/${courseId}/week/${weekNum + 1}`}
            className="btn-primary py-2.5 px-5 font-mono text-[10.5px] tracking-[0.2em] uppercase no-underline transition-all"
          >
            Week {weekNum + 1} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
