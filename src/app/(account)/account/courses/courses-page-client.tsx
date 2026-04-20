"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MonoLabel } from "@/components/course/mono-label";
import { CourseCard } from "@/components/course/course-card";
import { ConfirmModal } from "@/components/course/confirm-modal";
import { startCourse, resetCourse } from "@/lib/course-progress";
import { foundationsCourse } from "@/content/courses/foundations-of-defending-torah";

type CoursesPageClientProps = {
  status: "not-started" | "in-progress" | "finished";
  completedSessions: number[];
  totalSessions: number;
  currentSessionId: number | null;
  currentSessionTitle: string | null;
  sessionMetadata: Array<{ id: number; title: string; week: number }>;
};

export function CoursesPageClient({
  status,
  completedSessions,
  totalSessions,
  currentSessionId,
  currentSessionTitle,
  sessionMetadata,
}: CoursesPageClientProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<"start" | "restart" | null>(null);

  const handleBegin = () => setShowModal("start");
  const handleRestart = () => setShowModal("restart");
  const handleContinue = () => {
    if (currentSessionId) {
      router.push(`/course/session/${currentSessionId}`);
    }
  };
  const handleCertificate = () => {
    router.push("/certificate");
  };

  const handleConfirmStart = async () => {
    await startCourse(foundationsCourse.id);
    setShowModal(null);
    router.push("/course/session/1");
  };

  const handleConfirmRestart = async () => {
    await resetCourse(foundationsCourse.id);
    setShowModal(null);
    router.refresh();
  };

  const handleCancel = () => setShowModal(null);

  return (
    <>
      <div className="max-w-[1200px] mx-auto w-full py-[52px] px-12">
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

        {/* Course Card */}
        <div className="mb-12">
          <CourseCard
            status={status}
            completedSessions={completedSessions.length}
            totalSessions={totalSessions}
            currentSessionId={currentSessionId}
            currentSessionTitle={currentSessionTitle}
            onBegin={handleBegin}
            onContinue={handleContinue}
            onCertificate={handleCertificate}
            onRestart={handleRestart}
          />
        </div>

        {/* Session checklist (only if started) */}
        {status !== "not-started" && (
          <div className="mb-12 max-w-[840px]">
            {/* Header bar */}
            <div className="border border-ink bg-ink p-5 px-7 flex justify-between items-center flex-wrap gap-3">
              <MonoLabel color="var(--ochre)">Session Progress</MonoLabel>
              <div
                className="font-mono text-[10px] tracking-[0.15em] uppercase"
                style={{ color: "rgba(244,236,220,0.4)" }}
              >
                {completedSessions.length} of 10 complete
              </div>
            </div>

            {/* Session rows */}
            <div className="border border-t-0 border-ink">
              {sessionMetadata.map((session) => {
                const isCompleted = completedSessions.includes(session.id);
                const isCurrent = currentSessionId === session.id;

                return (
                  <div
                    key={session.id}
                    className="flex items-center gap-5 p-5 px-7 border-b border-parchment-shadow last:border-b-0 bg-parchment-deep"
                  >
                    {/* Status icon */}
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

                    {/* Session label */}
                    <div className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-muted shrink-0 w-[70px]">
                      Wk {session.week} · S{session.id}
                    </div>

                    {/* Session title */}
                    <div className="font-body text-[17px] flex-1">
                      {session.title}
                    </div>

                    {/* Current tag */}
                    {isCurrent && (
                      <div
                        className="font-mono text-[9.5px] tracking-[0.18em] uppercase px-2.5 py-[3px] shrink-0"
                        style={{
                          background: "rgba(184,115,42,0.1)",
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

        {/* Coming soon placeholder */}
        <div className="border-2 border-dashed border-parchment-shadow p-12 text-center max-w-[640px]">
          <MonoLabel color="var(--muted)" className="mb-3">
            Coming Soon
          </MonoLabel>
          <div
            className="font-heading font-light text-[24px] leading-[1.2] mb-2"
            style={{ color: "var(--ink-soft)" }}
          >
            More Courses on the Way
          </div>
          <p
            className="font-body text-[16px] max-w-[400px] mx-auto"
            style={{ color: "var(--muted)" }}
          >
            We are preparing additional courses on biblical feasts, apologetics,
            and deeper theological topics.
          </p>
        </div>
      </div>

      {/* Modals */}
      {showModal === "start" && (
        <ConfirmModal
          variant="start"
          onConfirm={handleConfirmStart}
          onCancel={handleCancel}
        />
      )}
      {showModal === "restart" && (
        <ConfirmModal
          variant="restart"
          onConfirm={handleConfirmRestart}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
