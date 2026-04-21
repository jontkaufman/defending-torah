import { getUser } from "@/lib/auth";
import { getCourseProgress, getCapstoneSubmission } from "@/lib/course-progress";
import { foundationsCourse } from "@/content/courses/foundations-of-defending-torah";
import { MonoLabel } from "@/components/course/mono-label";
import { PrintButton } from "@/components/course/print-button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CertificatePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const progress = await getCourseProgress(foundationsCourse.id);
  if (!progress || progress.status !== "finished") {
    redirect("/account/courses");
  }

  const capstone = await getCapstoneSubmission(foundationsCourse.id);
  if (!capstone) {
    redirect("/resources/capstone");
  }

  const studentName = user.user_metadata?.full_name || "Student";
  const completionDate = progress.completed_at
    ? new Date(progress.completed_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="certificate-wrapper min-h-screen bg-[#1a1a24] flex flex-col items-center justify-center px-5 py-10">
      {/* Top buttons */}
      <div className="no-print mb-24 flex gap-4">
        <Link
          href="/account"
          className="font-mono text-[10px] tracking-[0.18em] uppercase bg-[rgba(255,255,255,0.08)] text-[rgba(244,236,220,0.6)] border border-[rgba(255,255,255,0.12)] px-4 py-2 hover:bg-[rgba(255,255,255,0.12)] transition-colors"
        >
          ← Back to Dashboard
        </Link>
        <PrintButton />
      </div>

      {/* Certificate card */}
      <div
        className="certificate-card w-full max-w-[760px] bg-parchment border border-parchment-shadow relative overflow-hidden"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
      >
        {/* Double decorative border */}
        <div className="absolute inset-[12px] border border-parchment-shadow pointer-events-none z-0" />
        <div className="absolute inset-[16px] border border-[rgba(151,94,34,0.2)] pointer-events-none z-0" />

        {/* Hebrew watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[400px] opacity-[0.025] text-ochre pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          ת
        </div>

        {/* Content */}
        <div className="relative z-10 px-16 py-14 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 mb-7">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-7 h-7 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z"
                fill="#1e3a5f"
                stroke="#c9a84c"
                strokeWidth="1.5"
              />
              <line
                x1="16"
                y1="8"
                x2="16"
                y2="24"
                stroke="#c9a84c"
                strokeWidth="1.5"
              />
              <line
                x1="10"
                y1="15"
                x2="22"
                y2="15"
                stroke="#c9a84c"
                strokeWidth="1.5"
              />
            </svg>
            <h1 className="font-heading font-black text-[22px] leading-none text-ink">
              Defending Torah
            </h1>
          </div>

          {/* Ornamental rule */}
          <div className="flex items-center gap-4 mb-8" aria-hidden="true">
            <div className="flex-1 h-px bg-ink opacity-20" />
            <div className="font-heading text-[18px] text-ochre font-light">
              ✦
            </div>
            <div className="flex-1 h-px bg-ink opacity-20" />
          </div>

          {/* Certificate label */}
          <div className="mb-5">
            <MonoLabel color="var(--crimson)" className="text-center">
              Certificate of Completion
            </MonoLabel>
          </div>

          {/* Body text */}
          <p className="font-body text-[19px] text-ink-soft mb-4">
            This is to certify that
          </p>

          {/* Student name */}
          <p className="font-heading font-light text-ochre-deep mb-2.5">
            <em
              className="font-body italic"
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                lineHeight: "1.05",
                letterSpacing: "-0.025em",
              }}
            >
              {studentName}
            </em>
          </p>

          <p className="font-body text-[19px] text-ink-soft mb-7">
            has successfully completed
          </p>

          {/* Course title box */}
          <div className="border border-ink px-8 py-5 inline-block mb-7">
            <h2 className="font-heading font-light text-[28px] leading-[1.1] tracking-[-0.02em] mb-1.5 text-ink">
              Foundations of Defending Torah
            </h2>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
              5 Weeks · 10 Sessions · Beginner Level
            </p>
          </div>

          {/* Completion date */}
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-8">
            Completed: {completionDate}
          </p>

          {/* Ornamental rule */}
          <div className="flex items-center gap-4 mb-7" aria-hidden="true">
            <div className="flex-1 h-px bg-ink opacity-20" />
            <div className="font-heading text-[18px] text-ochre font-light">
              ✦
            </div>
            <div className="flex-1 h-px bg-ink opacity-20" />
          </div>

          {/* Scripture */}
          <blockquote className="font-body italic text-[18px] leading-[1.65] text-ink-soft max-w-[460px] mx-auto mb-2.5">
            Oh how I love your Torah! It is my meditation all the day.
          </blockquote>

          <MonoLabel color="var(--crimson)" className="text-center">
            — Psalm 119:97
          </MonoLabel>
        </div>
      </div>
    </div>
  );
}
