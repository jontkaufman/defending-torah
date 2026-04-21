"use client";

import type { Session, Week } from "@/types/course";
import { MonoLabel } from "./mono-label";

export function SessionCompletionModal({
  session,
  week,
  onContinue,
  onStay,
}: {
  session: Session;
  week: Week;
  onContinue: () => void;
  onStay: () => void;
}) {
  const isLast = session.id === 10;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(26,31,46,0.55)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className="bg-parchment border border-ink w-[90%]"
        style={{
          maxWidth: 500,
          boxShadow: "12px 12px 0 var(--ink)",
        }}
      >
        <div className="h-[3px] bg-olive" />
        <div className="p-9 px-10">
          <MonoLabel color="var(--olive)" className="mb-4">
            Session Complete
          </MonoLabel>
          <h2 className="font-heading font-light text-[30px] leading-[1.1] tracking-tight mb-3.5">
            Well done — Session {session.id} finished.
          </h2>

          {/* Memory verse reminder */}
          <div
            className="mb-5 p-3.5 px-[18px]"
            style={{
              borderLeft: "2px solid var(--ochre)",
              background: "rgba(151,94,34,0.06)",
            }}
          >
            <MonoLabel color="var(--ochre)" className="mb-2 text-[9.5px]">
              Week {week.num} Memory Verse — Do you know it?
            </MonoLabel>
            <p
              className="font-body italic text-[17px] leading-[1.6] mb-1.5"
              style={{ color: "var(--ink-soft)" }}
            >
              &ldquo;{week.memory_verse.text}&rdquo;
            </p>
            <MonoLabel color="var(--crimson)" className="text-[9.5px]">
              — {week.memory_verse.ref}
            </MonoLabel>
          </div>

          {/* Homework reminder */}
          <div className="border border-parchment-shadow p-3.5 px-[18px] bg-parchment-deep mb-6">
            <MonoLabel color="var(--muted)" className="mb-2.5 text-[9.5px]">
              Before the next session — complete your homework:
            </MonoLabel>
            {session.homework.map((hw, i) => (
              <div key={i} className="flex gap-2.5 items-start mb-1.5">
                <span className="font-mono text-[10px] text-ochre shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="font-body text-[15px] leading-[1.5]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {hw}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onContinue}
              className="btn flex-1"
              style={{
                background: isLast ? "var(--olive)" : "var(--ink)",
                color: isLast ? "white" : "var(--parchment)",
                border: "none",
                justifyContent: "center",
              }}
            >
              {isLast ? "Go to Capstone →" : "Next Session →"}
            </button>
            <button
              onClick={onStay}
              className="btn btn-ghost"
              style={{ justifyContent: "center" }}
            >
              Stay Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
