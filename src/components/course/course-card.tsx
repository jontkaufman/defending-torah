"use client";

import { MonoLabel } from "./mono-label";

type CourseCardProps = {
  status: "not-started" | "in-progress" | "finished";
  completedSessions: number;
  totalSessions: number;
  currentSessionId: number | null;
  currentSessionTitle: string | null;
  onBegin: () => void;
  onContinue: () => void;
  onCertificate: () => void;
  onRestart: () => void;
};

export function CourseCard({
  status,
  completedSessions,
  totalSessions,
  currentSessionId,
  currentSessionTitle,
  onBegin,
  onContinue,
  onCertificate,
  onRestart,
}: CourseCardProps) {
  const progress =
    totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  return (
    <div className="border border-ink bg-parchment-deep overflow-hidden max-w-[640px]">
      {/* Status bar - 3px top stripe */}
      <div
        className="h-[3px]"
        style={{
          background:
            status === "finished"
              ? "var(--olive)"
              : status === "in-progress"
                ? "var(--ochre)"
                : "var(--parchment-shadow)",
        }}
      />
      <div className="p-7 px-8">
        {/* Header row with status badge */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <MonoLabel color="var(--crimson)" className="mb-2.5">
              Course No. 001
            </MonoLabel>
            <h2 className="font-heading font-light text-[28px] leading-[1.1] tracking-tight">
              Foundations of Defending Torah
            </h2>
          </div>
          <div
            className="font-mono text-[9.5px] tracking-[0.18em] uppercase px-3 py-[5px] shrink-0 ml-4"
            style={{
              background:
                status === "finished"
                  ? "rgba(92,107,63,0.12)"
                  : status === "in-progress"
                    ? "rgba(184,115,42,0.1)"
                    : "var(--parchment-shadow)",
              border: `1px solid ${status === "finished" ? "var(--olive)" : status === "in-progress" ? "var(--ochre)" : "#bbb"}`,
              color:
                status === "finished"
                  ? "var(--olive)"
                  : status === "in-progress"
                    ? "var(--ochre-deep)"
                    : "var(--muted)",
            }}
          >
            {status === "finished"
              ? "Completed"
              : status === "in-progress"
                ? "In Progress"
                : "Not Started"}
          </div>
        </div>

        <p
          className="font-body text-[16px] leading-[1.55] mb-5"
          style={{ color: "var(--ink-soft)" }}
        >
          A beginner course in biblical continuity, obedience, and answering
          objections. 5 weeks · 10 sessions.
        </p>

        {/* Progress bar (only if started) */}
        {status !== "not-started" && (
          <div className="mb-5">
            <div className="flex justify-between mb-1.5">
              <span className="font-mono text-[9.5px] tracking-[0.15em] uppercase text-muted">
                {completedSessions} of {totalSessions} sessions
              </span>
              <span
                className="font-mono text-[9.5px] tracking-[0.15em]"
                style={{
                  color: status === "finished" ? "var(--olive)" : "var(--ochre)",
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
                  background: status === "finished" ? "var(--olive)" : "var(--ochre)",
                }}
              />
            </div>
          </div>
        )}

        {/* Meta tags */}
        <div className="flex gap-2 flex-wrap mb-6">
          {["5 Weeks", "10 Sessions", "12 Objections", "Beginner"].map((t) => (
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
          {status === "not-started" && (
            <button
              onClick={onBegin}
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
          {status === "in-progress" && (
            <button
              onClick={onContinue}
              className="btn"
              style={{
                background: "var(--ink)",
                color: "var(--parchment)",
                border: "none",
              }}
            >
              Continue — Session {currentSessionId} →
            </button>
          )}
          {status === "finished" && (
            <>
              <button
                onClick={onCertificate}
                className="btn"
                style={{
                  background: "var(--olive)",
                  color: "white",
                  border: "none",
                }}
              >
                Download Certificate →
              </button>
              <button onClick={onRestart} className="btn btn-ghost">
                Start Over
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
