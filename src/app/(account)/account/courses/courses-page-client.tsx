"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MonoLabel } from "@/components/course/mono-label";
import { ConfirmModal } from "@/components/course/confirm-modal";
import { startCourse, resetCourse } from "@/lib/course-progress";
import type { CourseProgressData } from "./page";

type CoursesPageClientProps = {
  courses: CourseProgressData[];
};

export function CoursesPageClient({ courses }: CoursesPageClientProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<{ type: "start" | "restart"; courseId: string } | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const handleConfirmStart = async () => {
    if (!showModal) return;
    await startCourse(showModal.courseId);
    setShowModal(null);
    router.push(`/course/${showModal.courseId}/session/1`);
  };

  const handleConfirmRestart = async () => {
    if (!showModal) return;
    await resetCourse(showModal.courseId);
    setShowModal(null);
    router.refresh();
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto w-full py-[52px] px-12 max-md:px-5 max-md:py-8">
        {/* Header */}
        <div className="mb-10">
          <MonoLabel color="var(--crimson)" className="mb-3">
            My Courses
          </MonoLabel>
          <h1
            className="font-heading font-light leading-none tracking-tight"
            style={{ fontSize: "clamp(36px, 4vw, 48px)" }}
          >
            Your learning path.
          </h1>
        </div>

        {/* Course Cards */}
        <div className="space-y-6 mb-12">
          {courses.map((course) => {
            const progress =
              course.totalSessions > 0
                ? Math.round((course.completedSessions.length / course.totalSessions) * 100)
                : 0;
            const isExpanded = expandedCourse === course.courseId;

            return (
              <div key={course.courseId}>
                {/* Course Card */}
                <div
                  className="border border-ink overflow-hidden max-w-[840px]"
                  style={{
                    background: course.locked ? "var(--parchment-shadow)" : "var(--parchment-deep)",
                    opacity: course.locked ? 0.7 : 1,
                  }}
                >
                  {/* Status bar */}
                  <div
                    className="h-[3px]"
                    style={{
                      background: course.locked
                        ? "var(--parchment-shadow)"
                        : course.status === "finished"
                          ? "var(--olive)"
                          : course.status === "in-progress"
                            ? "var(--ochre)"
                            : "var(--parchment-shadow)",
                    }}
                  />
                  <div className="p-7 px-8">
                    {/* Header row */}
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <MonoLabel color="var(--crimson)" className="mb-2.5">
                          Course {course.edition}
                        </MonoLabel>
                        <h2 className="font-heading font-light text-[28px] leading-[1.1] tracking-tight">
                          {course.title}
                        </h2>
                      </div>
                      <div
                        className="font-mono text-[9.5px] tracking-[0.18em] uppercase px-3 py-[5px] shrink-0 ml-4"
                        style={{
                          background: course.locked
                            ? "var(--parchment-shadow)"
                            : course.status === "finished"
                              ? "rgba(92,107,63,0.12)"
                              : course.status === "in-progress"
                                ? "rgba(151,94,34,0.1)"
                                : "var(--parchment-shadow)",
                          border: `1px solid ${
                            course.locked
                              ? "#bbb"
                              : course.status === "finished"
                                ? "var(--olive)"
                                : course.status === "in-progress"
                                  ? "var(--ochre)"
                                  : "#bbb"
                          }`,
                          color: course.locked
                            ? "var(--muted)"
                            : course.status === "finished"
                              ? "var(--olive)"
                              : course.status === "in-progress"
                                ? "var(--ochre-deep)"
                                : "var(--muted)",
                        }}
                      >
                        {course.locked
                          ? "Locked"
                          : course.status === "finished"
                            ? "Completed"
                            : course.status === "in-progress"
                              ? "In Progress"
                              : "Not Started"}
                      </div>
                    </div>

                    <p
                      className="font-body text-[16px] leading-[1.55] mb-5"
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {course.subtitle}. {course.weeks} weeks · {course.totalSessions} sessions.
                    </p>

                    {/* Progress bar (only if started and unlocked) */}
                    {!course.locked && course.status !== "not-started" && (
                      <div className="mb-5">
                        <div className="flex justify-between mb-1.5">
                          <span className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-muted">
                            {course.completedSessions.length} of {course.totalSessions} sessions
                          </span>
                          <span
                            className="font-mono text-[9.5px] tracking-[0.15em]"
                            style={{
                              color: course.status === "finished" ? "var(--olive)" : "var(--ochre)",
                            }}
                          >
                            {progress}%
                          </span>
                        </div>
                        <div className="h-1 bg-parchment-shadow rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-[width] duration-500"
                            style={{
                              width: `${progress}%`,
                              background: course.status === "finished" ? "var(--olive)" : "var(--ochre)",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Meta tags */}
                    <div className="flex gap-2 flex-wrap mb-6">
                      {[`${course.weeks} Weeks`, `${course.totalSessions} Sessions`, course.level].map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow px-2.5 py-[3px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="border-t border-parchment-shadow pt-5 flex gap-3 items-center flex-wrap">
                      {course.locked ? (
                        <span
                          className="font-mono text-[10px] tracking-[0.15em] uppercase"
                          style={{ color: "var(--muted)" }}
                        >
                          Complete previous course{course.courseId === "yeshua-paul-torah-question" ? "s" : ""} to unlock
                        </span>
                      ) : (
                        <>
                          {course.status === "not-started" && (
                            <button
                              onClick={() => setShowModal({ type: "start", courseId: course.courseId })}
                              className="btn"
                              style={{
                                background: "var(--ink)",
                                color: "var(--parchment)",
                                border: "none",
                              }}
                            >
                              Begin Course →
                            </button>
                          )}
                          {course.status === "in-progress" && (
                            <>
                              <button
                                onClick={() => router.push(`/course/${course.courseId}/session/${course.currentSessionId}`)}
                                className="btn"
                                style={{
                                  background: "var(--ink)",
                                  color: "var(--parchment)",
                                  border: "none",
                                }}
                              >
                                Continue — Session {course.currentSessionId} →
                              </button>
                              <button
                                onClick={() => setExpandedCourse(isExpanded ? null : course.courseId)}
                                className="btn btn-ghost"
                              >
                                {isExpanded ? "Hide Progress" : "View Progress"}
                              </button>
                            </>
                          )}
                          {course.status === "finished" && (
                            <>
                              <button
                                onClick={() => router.push("/certificate")}
                                className="btn"
                                style={{
                                  background: "var(--olive)",
                                  color: "white",
                                  border: "none",
                                }}
                              >
                                Download Certificate →
                              </button>
                              <button
                                onClick={() => setShowModal({ type: "restart", courseId: course.courseId })}
                                className="btn btn-ghost"
                              >
                                Start Over
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Session checklist (expanded) */}
                {isExpanded && course.status !== "not-started" && (
                  <div className="max-w-[840px] mt-0">
                    {/* Header bar */}
                    <div className="border border-t-0 border-ink bg-ink p-5 px-7 flex justify-between items-center flex-wrap gap-3">
                      <MonoLabel color="var(--ochre)">Session Progress</MonoLabel>
                      <div
                        className="font-mono text-[10px] tracking-[0.15em] uppercase"
                        style={{ color: "rgba(244,236,220,0.4)" }}
                      >
                        {course.completedSessions.length} of {course.totalSessions} complete
                      </div>
                    </div>

                    {/* Session rows */}
                    <div className="border border-t-0 border-ink">
                      {course.sessionMetadata.map((session) => {
                        const isCompleted = course.completedSessions.includes(session.id);
                        const isCurrent = course.currentSessionId === session.id;

                        return (
                          <div
                            key={session.id}
                            className="flex items-center gap-5 p-5 px-7 border-b border-parchment-shadow last:border-b-0 bg-parchment-deep"
                          >
                            <div
                              className="w-5 h-5 shrink-0 flex items-center justify-center font-mono text-[11px] font-bold"
                              style={{
                                color: isCompleted
                                  ? "var(--olive)"
                                  : isCurrent
                                    ? "var(--ochre)"
                                    : "var(--muted)",
                              }}
                            >
                              {isCompleted ? "✓" : isCurrent ? "▶" : "○"}
                            </div>
                            <div className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-muted shrink-0 w-[70px]">
                              Wk {session.week} · S{session.id}
                            </div>
                            <div className="font-body text-[17px] flex-1">
                              {session.title}
                            </div>
                            {isCurrent && (
                              <div
                                className="font-mono text-[9.5px] tracking-[0.18em] uppercase px-2.5 py-[3px] shrink-0"
                                style={{
                                  background: "rgba(151,94,34,0.1)",
                                  border: "1px solid var(--ochre)",
                                  color: "var(--ochre-deep)",
                                }}
                              >
                                Current
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showModal?.type === "start" && (
        <ConfirmModal
          variant="start"
          onConfirm={handleConfirmStart}
          onCancel={() => setShowModal(null)}
        />
      )}
      {showModal?.type === "restart" && (
        <ConfirmModal
          variant="restart"
          onConfirm={handleConfirmRestart}
          onCancel={() => setShowModal(null)}
        />
      )}
    </>
  );
}
