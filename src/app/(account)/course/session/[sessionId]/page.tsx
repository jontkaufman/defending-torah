import { notFound } from "next/navigation";
import Link from "next/link";
import { foundationsCourse, getSession } from "@/content/courses/foundations-of-defending-torah";
import { getCourseProgress } from "@/lib/course-progress";
import { MonoLabel } from "@/components/course/mono-label";
import { SessionSteps } from "@/components/course/session-steps";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const sessionData = getSession(parseInt(sessionId));

  if (!sessionData) {
    return notFound();
  }

  const { session, week } = sessionData;
  const progress = await getCourseProgress(foundationsCourse.id);
  const isCompleted = progress?.completed_sessions?.includes(session.id) ?? false;

  return (
    <div>
      {/* Breadcrumb */}
      <nav
        className="px-16 py-4 border-b"
        style={{ borderColor: "var(--parchment-shadow)" }}
      >
        <div className="flex gap-2.5 items-center font-mono text-[10px] tracking-[0.2em] uppercase">
          <Link
            href="/course"
            className="no-underline hover:underline"
            style={{ color: "var(--muted)" }}
          >
            Course
          </Link>
          <span style={{ color: "var(--parchment-shadow)" }}>→</span>
          <Link
            href={`/course/week/${week.num}`}
            className="no-underline hover:underline"
            style={{ color: "var(--muted)" }}
          >
            Week {week.num}
          </Link>
          <span style={{ color: "var(--parchment-shadow)" }}>→</span>
          <span style={{ color: "var(--ink-soft)" }}>Session {session.id}</span>
        </div>
      </nav>

      {/* Session Header */}
      <section
        className="p-[50px_64px_40px] border-b-2 border-ink"
        style={{ padding: "50px 64px 40px" }}
      >
        <div className="grid gap-32 items-start" style={{ gridTemplateColumns: "1fr auto" }}>
          <div>
            <MonoLabel color="var(--crimson)" className="mb-14">
              Session {session.id} of 10 · Week {week.num} · {week.title}
            </MonoLabel>
            <h1
              className="font-heading font-light leading-none tracking-[-0.025em] mb-16"
              style={{
                fontSize: "clamp(36px, 4.5vw, 62px)",
                color: "var(--ink)",
              }}
            >
              {session.title}
            </h1>
            <div className="flex gap-2.5 flex-wrap">
              <span
                className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow py-1 px-3"
                style={{ color: "var(--muted)" }}
              >
                45 min teaching
              </span>
              <span
                className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow py-1 px-3"
                style={{ color: "var(--muted)" }}
              >
                10–15 min discussion
              </span>
              <span
                className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow py-1 px-3"
                style={{ color: "var(--muted)" }}
              >
                ~1 hr homework
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Session Content */}
      <section className="p-[48px_64px_80px]" style={{ padding: "48px 64px 80px" }}>
        <SessionSteps
          session={session}
          week={week}
          isCompleted={isCompleted}
          courseId={foundationsCourse.id}
        />
      </section>
    </div>
  );
}
