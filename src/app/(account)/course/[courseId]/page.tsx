"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { MonoLabel } from "@/components/course/mono-label";
import { getCourseById } from "@/content/courses";

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourseById(courseId);

  if (!course) {
    return notFound();
  }

  const [activeWeek, setActiveWeek] = useState(1);
  const currentWeekData = course.weeks_data.find((w) => w.num === activeWeek);

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <section
        className="relative overflow-hidden border-b"
        style={{
          padding: "70px 64px 90px",
          borderColor: "var(--ink)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "64px",
        }}
      >
        {/* Hebrew watermark */}
        <div
          className="absolute font-heading pointer-events-none"
          style={{
            top: "20px",
            right: "60px",
            fontSize: "280px",
            opacity: 0.03,
            color: "var(--ink)",
          }}
        >
          תורה
        </div>

        {/* Left column */}
        <div>
          {/* Kicker */}
          <div className="flex items-center gap-4 mb-7">
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--crimson)",
              }}
            />
            <MonoLabel color="var(--crimson)">{course.title} — {course.level} Level</MonoLabel>
          </div>

          {/* H1 */}
          <h1
            className="font-heading font-light mb-6"
            style={{
              fontSize: "clamp(44px, 6vw, 82px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
            }}
          >
            {course.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-body italic" style={{ color: "var(--ochre-deep)" }}>
              {course.title.split(" ").slice(-1)[0]}
            </span>
          </h1>

          {/* Lede */}
          <p
            className="font-body mb-4"
            style={{
              fontSize: "20px",
              lineHeight: 1.55,
              maxWidth: "520px",
              color: "var(--ink-soft)",
            }}
          >
            {course.subtitle}
          </p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-3.5 mb-6">
            <div
              className="font-mono uppercase border"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                borderColor: "var(--ink)",
                padding: "4px 12px",
                color: "var(--ink)",
              }}
            >
              {course.weeks} Weeks
            </div>
            <div
              className="font-mono uppercase border"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                borderColor: "var(--ink)",
                padding: "4px 12px",
                color: "var(--ink)",
              }}
            >
              {course.total_sessions} Sessions
            </div>
            <div
              className="font-mono uppercase border"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                borderColor: "var(--ink)",
                padding: "4px 12px",
                color: "var(--ink)",
              }}
            >
              {course.level}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Link
              href={`/course/${courseId}/week/1`}
              className="font-mono uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                padding: "16px 28px",
                background: "var(--ink)",
                color: "var(--parchment)",
                border: "1px solid var(--ink)",
              }}
            >
              Begin Week 1 →
            </Link>
            <button
              onClick={() => {
                document.getElementById("course-weeks")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-mono uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                padding: "16px 28px",
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
              }}
            >
              See Full Syllabus
            </button>
          </div>
        </div>

        {/* Right column - Pillars preview */}
        <div className="flex items-start justify-center pt-5">
          <div
            className="relative border"
            style={{
              maxWidth: "420px",
              background: "var(--parchment-deep)",
              borderColor: "var(--ink)",
              padding: "36px 34px",
              boxShadow:
                "18px 18px 0 -1px var(--parchment-deep), 18px 18px 0 0 var(--ink)",
            }}
          >
            {/* Inner border */}
            <div
              className="absolute border"
              style={{
                inset: "8px",
                borderColor: "var(--ink)",
                opacity: 0.3,
                pointerEvents: "none",
              }}
            />

            {/* Top row */}
            <div className="flex justify-between mb-6 font-mono" style={{ fontSize: "10px" }}>
              <span style={{ color: "var(--ink)" }}>Course Overview</span>
              <span style={{ color: "var(--ink-soft)" }}>5786</span>
            </div>

            {/* Course title in scroll */}
            <div
              className="font-heading font-light mb-4"
              style={{
                fontSize: "28px",
                lineHeight: 1.1,
                color: "var(--ink)",
              }}
            >
              {course.title}
            </div>

            <div
              className="font-body italic mb-6 pb-4 border-b"
              style={{
                fontSize: "15px",
                color: "var(--ochre-deep)",
                borderColor: "var(--ink)",
              }}
            >
              {course.weeks} weeks · {course.total_sessions} sessions
            </div>

            {/* First pillar quote */}
            <p
              className="font-body italic mb-3"
              style={{
                fontSize: "15px",
                lineHeight: 1.65,
                color: "var(--ink)",
              }}
            >
              {course.pillars[0]?.body}
            </p>
          </div>
        </div>
      </section>

      {/* ========== WEEK TIMELINE SECTION ========== */}
      <section
        id="course-weeks"
        className="border-b"
        style={{
          padding: "80px 64px 100px",
          borderColor: "var(--ink)",
        }}
      >
        {/* Header */}
        <div className="mb-14">
          <MonoLabel color="var(--crimson)" className="mb-3.5">
            Course Syllabus
          </MonoLabel>
          <h2
            className="font-heading font-light"
            style={{
              fontSize: "clamp(34px, 4vw, 54px)",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            {course.weeks} weeks. {course.total_sessions} sessions.
          </h2>
        </div>

        {/* Week tabs */}
        <div className="flex border-t border-l" style={{ borderColor: "var(--ink)" }}>
          {course.weeks_data.map((week) => (
            <button
              key={week.num}
              onClick={() => setActiveWeek(week.num)}
              className="flex-1 border-r text-left"
              style={{
                padding: "20px 16px 18px",
                borderColor: "var(--ink)",
                background: activeWeek === week.num ? "var(--ink)" : "var(--parchment-deep)",
                color: activeWeek === week.num ? "var(--parchment)" : "var(--ink)",
                borderBottom: activeWeek === week.num ? "none" : "1px solid var(--ink)",
              }}
            >
              <div
                className="font-heading font-black mb-1"
                style={{
                  fontSize: "40px",
                  color: activeWeek === week.num
                    ? "var(--ochre)"
                    : "rgba(184, 115, 42, 0.4)",
                }}
              >
                {week.num}
              </div>
              <div
                className="font-mono uppercase mb-0.5"
                style={{
                  fontSize: "9.5px",
                  letterSpacing: "0.2em",
                  opacity: 0.7,
                }}
              >
                {week.title}
              </div>
              <div
                className="font-body italic"
                style={{
                  fontSize: "13px",
                  opacity: 0.7,
                }}
              >
                {week.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Active week content */}
        {currentWeekData && (
          <>
            {/* Session cards */}
            <div
              className="border border-t-0 mb-10"
              style={{
                borderColor: "var(--ink)",
                padding: "32px 40px",
                background: "var(--parchment-deep)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                }}
              >
                {currentWeekData.sessions.map((session, idx) => {
                  const stripeColor = idx === 0 ? "var(--ochre)" : "var(--crimson)";
                  return (
                    <div
                      key={session.id}
                      className="relative border"
                      style={{
                        borderColor: "var(--ink)",
                        background: "var(--parchment)",
                        padding: "20px 22px",
                      }}
                    >
                      {/* Top stripe */}
                      <div
                        className="absolute top-0 left-0 right-0"
                        style={{
                          height: "3px",
                          background: stripeColor,
                        }}
                      />

                      <MonoLabel color={stripeColor} className="mb-2.5">
                        Session {session.id}
                      </MonoLabel>

                      <h3
                        className="font-heading font-light mb-2.5"
                        style={{
                          fontSize: "26px",
                          lineHeight: 1.1,
                          color: "var(--ink)",
                        }}
                      >
                        {session.title}
                      </h3>

                      <p
                        className="font-body mb-4"
                        style={{
                          fontSize: "16px",
                          color: "var(--ink-soft)",
                          lineHeight: 1.5,
                        }}
                      >
                        Big idea: {session.big_idea}
                      </p>

                      <div className="flex gap-2 items-center">
                        <div
                          className="font-mono uppercase border"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.18em",
                            borderColor: "var(--ink)",
                            padding: "3px 10px",
                            color: "var(--ink-soft)",
                          }}
                        >
                          45 min
                        </div>
                        <Link
                          href={`/course/${courseId}/session/${session.id}`}
                          className="font-mono uppercase ml-auto"
                          style={{
                            fontSize: "9.5px",
                            letterSpacing: "0.15em",
                            padding: "6px 14px",
                            background: "var(--ink)",
                            color: "var(--parchment)",
                            border: "1px solid var(--ink)",
                          }}
                        >
                          Open →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Memory verse */}
              <div
                className="flex gap-5 items-start pt-7 mt-8 border-t"
                style={{
                  borderColor: "var(--parchment-shadow)",
                }}
              >
                <MonoLabel color="var(--ink-soft)">Memory Verse</MonoLabel>
                <div className="flex-1 pl-5 border-l" style={{ borderColor: "var(--ochre)" }}>
                  <p
                    className="font-body italic mb-2"
                    style={{
                      fontSize: "19px",
                      color: "var(--ink)",
                      lineHeight: 1.5,
                    }}
                  >
                    {currentWeekData.memory_verse.text}
                  </p>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "10px",
                      color: "var(--crimson)",
                    }}
                  >
                    — {currentWeekData.memory_verse.ref}
                  </div>
                </div>
              </div>
            </div>

            {/* Go to Week button */}
            <div className="flex justify-center">
              <Link
                href={`/course/${courseId}/week/${activeWeek}`}
                className="font-mono uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  padding: "16px 28px",
                  background: "var(--ink)",
                  color: "var(--parchment)",
                  border: "1px solid var(--ink)",
                }}
              >
                Go to Week {activeWeek} →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ========== PILLARS SECTION ========== */}
      <section
        className="relative border-b"
        style={{
          padding: "80px 64px 100px",
          borderColor: "var(--ink)",
          background: "var(--ink)",
        }}
      >
        <MonoLabel color="var(--ochre)" className="mb-3.5">
          Course Pillars
        </MonoLabel>

        <h2
          className="font-heading font-light mb-12"
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.02,
            color: "var(--parchment)",
          }}
        >
          Six ideas repeated{" "}
          <span className="font-body italic" style={{ color: "var(--ochre)" }}>
            throughout
          </span>{" "}
          the course.
        </h2>

        {/* Pillars grid */}
        <div
          className="border-t"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
            borderColor: "rgba(244, 236, 220, 0.15)",
          }}
        >
          {course.pillars.map((pillar, idx) => {
            const isFirstCol = idx % 3 === 0;
            const isSecondCol = idx % 3 === 1;
            const isFirstRow = idx < 3;

            return (
              <div
                key={pillar.num}
                style={{
                  padding: "32px 28px",
                  borderRight: !isFirstCol && !isSecondCol ? "none" : "1px solid rgba(244, 236, 220, 0.15)",
                  borderBottom: isFirstRow ? "1px solid rgba(244, 236, 220, 0.15)" : "none",
                }}
              >
                <div
                  className="font-heading font-black mb-3"
                  style={{
                    fontSize: "52px",
                    color: "var(--ochre)",
                    opacity: 0.4,
                  }}
                >
                  {pillar.num}
                </div>
                <h3
                  className="font-body font-semibold mb-2.5"
                  style={{
                    fontSize: "20px",
                    color: "var(--parchment)",
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: "16px",
                    color: "rgba(244, 236, 220, 0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
