"use client";

export function ConfirmModal({
  variant,
  onConfirm,
  onCancel,
}: {
  variant: "start" | "restart";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isRestart = variant === "restart";
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(26,31,46,0.5)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className="border border-ink w-[90%]"
        style={{
          maxWidth: isRestart ? 440 : 480,
          boxShadow: "12px 12px 0 var(--ink)",
          background: "#f4ecdc",
        }}
      >
        <div
          className="h-[3px]"
          style={{
            background: isRestart ? "var(--crimson)" : "var(--ochre)",
          }}
        />
        <div className="p-9 px-10">
          <div
            className="font-mono text-[10.5px] tracking-[0.28em] uppercase mb-4"
            style={{ color: "var(--crimson)" }}
          >
            {isRestart ? "Confirm Reset" : "Before You Begin"}
          </div>
          <h2 className="font-heading font-light text-[30px] leading-[1.1] tracking-tight mb-4">
            {isRestart
              ? "Start the course again?"
              : "Start Foundations of Defending Torah?"}
          </h2>
          {isRestart ? (
            <p
              className="font-body text-[17px] leading-[1.65] mb-7"
              style={{ color: "var(--ink-soft)" }}
            >
              Your completion certificate will remain available. Your session
              progress will reset to Session 1. This cannot be undone.
            </p>
          ) : (
            <>
              <p
                className="font-body text-[18px] leading-[1.65] mb-3"
                style={{ color: "var(--ink-soft)" }}
              >
                This course takes approximately <strong>5 weeks</strong> to
                complete, with two sessions per week. Each session includes
                teaching, discussion questions, and homework.
              </p>
              <p
                className="font-body text-[17px] leading-[1.6] mb-7 italic"
                style={{ color: "var(--ink-soft)" }}
              >
                Your progress will be saved automatically. You can return any
                time and continue where you left off.
              </p>
            </>
          )}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onConfirm}
              className="btn flex-1"
              style={{
                background: isRestart ? "var(--crimson)" : "var(--ink)",
                color: isRestart ? "white" : "var(--parchment)",
                border: "none",
                justifyContent: "center",
              }}
            >
              {isRestart ? "Yes, Restart" : "Yes, Begin Course →"}
            </button>
            <button
              onClick={onCancel}
              className="btn btn-ghost"
              style={{ justifyContent: "center" }}
            >
              {isRestart ? "Cancel" : "Not Yet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
