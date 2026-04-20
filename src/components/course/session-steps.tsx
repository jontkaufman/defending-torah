"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Session, Week } from "@/types/course";
import { MonoLabel } from "./mono-label";
import { SessionCompletionModal } from "./session-completion-modal";
import { completeSession } from "@/lib/course-progress";

const STEPS = [
  { key: "opening", label: "Opening Question" },
  { key: "big_idea", label: "Big Idea" },
  { key: "scriptures", label: "Key Scriptures" },
  { key: "teaching", label: "Teaching" },
  { key: "misunderstanding", label: "Common Misunderstanding" },
  { key: "response", label: "Scriptural Response" },
  { key: "application", label: "Application" },
  { key: "discussion", label: "Discussion Questions" },
  { key: "memory", label: "Memory Verse" },
  { key: "homework", label: "Homework" },
];

export function SessionSteps({
  session,
  week,
  isCompleted,
  courseId,
}: {
  session: Session;
  week: Week;
  isCompleted: boolean;
  courseId: string;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(isCompleted);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  function scrollToStep(i: number) {
    setActiveStep(i);
    const el = stepRefs.current[i];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function handleComplete() {
    if (completed) return;
    // Optimistic localStorage write
    try {
      const key = `course-progress-${courseId}`;
      const stored = JSON.parse(localStorage.getItem(key) || "{}");
      stored.current_session_id = session.id < 10 ? session.id + 1 : session.id;
      stored.completed_sessions = [...new Set([...(stored.completed_sessions || []), session.id])];
      localStorage.setItem(key, JSON.stringify(stored));
    } catch {}
    startTransition(async () => {
      await completeSession(courseId, session.id, 10);
      setCompleted(true);
      setShowModal(true);
    });
  }

  function handleContinue() {
    setShowModal(false);
    if (session.id === 10) {
      router.push("/resources/capstone");
    } else {
      router.push(`/course/session/${session.id + 1}`);
    }
  }

  function handleStay() {
    setShowModal(false);
  }

  return (
    <>
      {/* Step Pill Strip */}
      <div className="flex gap-1.5 flex-wrap mb-0">
        {STEPS.map((step, i) => (
          <button
            key={step.key}
            onClick={() => scrollToStep(i)}
            className="font-mono text-[9px] tracking-[0.15em] uppercase py-[5px] px-3 cursor-pointer transition border"
            style={{
              background: activeStep === i ? "var(--ink)" : "transparent",
              color: activeStep === i ? "var(--parchment)" : "var(--muted)",
              borderColor: activeStep === i ? "var(--ink)" : "var(--parchment-shadow)",
            }}
          >
            <span
              style={{
                color: activeStep === i ? "var(--ochre)" : "var(--parchment-shadow)",
                marginRight: "0.25rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {step.label}
          </button>
        ))}
      </div>

      {/* Step 01: Opening Question */}
      <section
        ref={(el) => { stepRefs.current[0] = el; }}
        className="mt-12"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--ochre)">Opening Question</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--ochre)" }}
          >
            01
          </span>
        </div>
        <div
          className="padding-[20px_24px]"
          style={{
            borderLeft: "2px solid var(--ochre)",
            padding: "20px 24px",
            background: "rgba(184,115,42,0.05)",
          }}
        >
          <p
            className="font-body italic text-[22px] leading-[1.6]"
            style={{ color: "var(--ink-soft)" }}
          >
            {session.opening_q}
          </p>
        </div>
        <p
          className="font-body text-[16px] italic mt-14"
          style={{ color: "var(--muted)" }}
        >
          Take a moment to sit with this before reading on. There are no wrong answers yet.
        </p>
      </section>

      {/* Step 02: Big Idea */}
      <section
        ref={(el) => { stepRefs.current[1] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--ochre)">Session Big Idea</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--ochre)" }}
          >
            02
          </span>
        </div>
        <div
          className="border border-ink p-[28px_32px] bg-parchment-deep"
          style={{ padding: "28px 32px" }}
        >
          <h2
            className="font-heading font-light leading-[1.2] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(24px, 3vw, 34px)",
              color: "var(--ink)",
            }}
          >
            {session.big_idea}
          </h2>
        </div>
      </section>

      {/* Step 03: Key Scriptures */}
      <section
        ref={(el) => { stepRefs.current[2] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--crimson)">Key Scripture Readings</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--crimson)" }}
          >
            03
          </span>
        </div>
        <p
          className="font-body text-[17px] leading-[1.55] mb-20"
          style={{ color: "var(--ink-soft)" }}
        >
          Read these passages carefully in your own Bible before continuing. Let them shape your understanding.
        </p>
        <div className="space-y-3">
          {session.scriptures.map((ref, i) => (
            <div
              key={i}
              className="flex items-center gap-16 p-[14px_20px] border border-parchment-shadow bg-parchment-deep"
              style={{ padding: "14px 20px" }}
            >
              <p
                className="font-body italic text-[19px] flex-1"
                style={{ color: "var(--ink-soft)" }}
              >
                {ref}
              </p>
              <span
                className="font-mono text-[9px] tracking-[0.15em] uppercase border border-ochre py-[3px] px-2.5"
                style={{ color: "var(--ochre)" }}
              >
                Read →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Step 04: Teaching */}
      <section
        ref={(el) => { stepRefs.current[3] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--ochre)">Main Teaching</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--ochre)" }}
          >
            04
          </span>
        </div>
        <p
          className="font-body text-[20px] leading-[1.7]"
          style={{ color: "var(--ink)" }}
        >
          {session.teaching}
        </p>
      </section>

      {/* Step 05: Common Misunderstanding */}
      <section
        ref={(el) => { stepRefs.current[4] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--crimson)">Common Misunderstanding</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--crimson)" }}
          >
            05
          </span>
        </div>
        <div
          style={{
            borderLeft: "3px solid var(--crimson)",
            padding: "16px 20px",
            background: "rgba(122,46,36,0.05)",
          }}
        >
          <p
            className="font-body italic text-[20px] leading-[1.5]"
            style={{ color: "var(--crimson)" }}
          >
            {session.misunderstanding}
          </p>
        </div>
      </section>

      {/* Step 06: Scriptural Response */}
      <section
        ref={(el) => { stepRefs.current[5] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--ochre)">Scriptural Response</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--ochre)" }}
          >
            06
          </span>
        </div>
        <p
          className="font-body text-[20px] leading-[1.7]"
          style={{ color: "var(--ink)" }}
        >
          {session.response}
        </p>
      </section>

      {/* Step 07: Application */}
      <section
        ref={(el) => { stepRefs.current[6] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--olive)">Real-Life Application</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--olive)" }}
          >
            07
          </span>
        </div>
        <div
          style={{
            borderLeft: "2px solid var(--olive)",
            padding: "16px 24px",
            background: "rgba(92,107,63,0.06)",
          }}
        >
          <p
            className="font-body text-[19px] leading-[1.65]"
            style={{ color: "var(--ink-soft)" }}
          >
            {session.application}
          </p>
        </div>
      </section>

      {/* Step 08: Discussion Questions */}
      <section
        ref={(el) => { stepRefs.current[7] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--ink)">Discussion & Reflection Questions</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--ink)" }}
          >
            08
          </span>
        </div>
        <div className="space-y-8">
          {session.discussion.map((question, i) => (
            <div key={i} className="flex gap-16 items-start">
              <span
                className="font-heading font-black text-[28px] leading-none shrink-0 mt-[-2px]"
                style={{ color: "var(--ochre)" }}
              >
                {i + 1}.
              </span>
              <p
                className="font-body text-[19px] leading-[1.6]"
                style={{ color: "var(--ink-soft)" }}
              >
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 09: Memory Verse */}
      <section
        ref={(el) => { stepRefs.current[8] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--olive)">Memory Verse</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--olive)" }}
          >
            09
          </span>
        </div>
        <div className="border border-parchment-shadow p-[28px_32px] bg-parchment-deep text-center" style={{ padding: "28px 32px" }}>
          <p
            className="font-body italic text-[22px] leading-[1.65] mb-12"
            style={{ color: "var(--ink-soft)" }}
          >
            &ldquo;{week.memory_verse.text}&rdquo;
          </p>
          <MonoLabel color="var(--crimson)" className="text-center">
            — {week.memory_verse.ref}
          </MonoLabel>
        </div>
      </section>

      {/* Step 10: Homework */}
      <section
        ref={(el) => { stepRefs.current[9] = el; }}
        className="mt-20"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="flex gap-12 items-center mb-6">
          <MonoLabel color="var(--ochre)">Homework Assignment</MonoLabel>
          <span
            className="font-heading font-black text-[20px]"
            style={{ color: "var(--ochre)" }}
          >
            10
          </span>
        </div>
        <p
          className="font-body text-[17px] italic mb-20"
          style={{ color: "var(--muted)" }}
        >
          Approximately 1 hour. Keep it simple and honest. These are meant to anchor what you learned, not overwhelm you.
        </p>
        <div className="space-y-3">
          {session.homework.map((hw, i) => (
            <div
              key={i}
              className="flex gap-16 items-start p-[16px_20px] border border-parchment-shadow bg-parchment-deep"
              style={{ padding: "16px 20px" }}
            >
              <span
                className="font-mono text-[11px] tracking-[0.15em] font-medium shrink-0 mt-0.5"
                style={{ color: "var(--ochre)", fontWeight: 500 }}
              >
                0{i + 1}
              </span>
              <p
                className="font-body text-[18px] leading-[1.55]"
                style={{ color: "var(--ink-soft)" }}
              >
                {hw}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Complete CTA Bar */}
      <section className="mt-20">
        <div
          className="bg-ink p-[36px_40px] flex items-center justify-between flex-wrap gap-20"
          style={{ padding: "36px 40px" }}
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "var(--ochre)" }}>
              Finished reading?
            </p>
            <p className="font-body text-[19px] italic" style={{ color: "var(--parchment)" }}>
              Mark this session complete to continue.
            </p>
          </div>
          <button
            onClick={handleComplete}
            disabled={completed || isPending}
            className="font-mono text-[11.5px] tracking-[0.2em] uppercase border-none p-[16px_28px]"
            style={{
              background: completed ? "var(--olive)" : "var(--ochre)",
              color: "white",
              padding: "16px 28px",
              cursor: completed ? "default" : "pointer",
              opacity: isPending ? 0.7 : 1,
            }}
          >
            {completed ? "Completed ✓" : "Mark Complete ✓"}
          </button>
        </div>

        {/* Resource Quick-Links */}
        <div className="py-6 px-16 border-t border-parchment-shadow flex gap-3 flex-wrap items-center">
          <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase mr-2" style={{ color: "var(--muted)" }}>
            Resources:
          </span>
          <a
            href={`/resources/worksheet/${session.id}`}
            className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow py-[5px] px-3 no-underline"
            style={{ color: "var(--ochre-deep)" }}
          >
            Worksheet →
          </a>
          <a
            href="/resources/glossary"
            className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow py-[5px] px-3 no-underline"
            style={{ color: "var(--ochre-deep)" }}
          >
            Glossary →
          </a>
          <a
            href="/resources/objections"
            className="font-mono text-[9.5px] tracking-[0.15em] uppercase border border-parchment-shadow py-[5px] px-3 no-underline"
            style={{ color: "var(--ochre-deep)" }}
          >
            Objections →
          </a>
        </div>
      </section>

      {/* Completion Modal */}
      {showModal && (
        <SessionCompletionModal
          session={session}
          week={week}
          onContinue={handleContinue}
          onStay={handleStay}
        />
      )}
    </>
  );
}
