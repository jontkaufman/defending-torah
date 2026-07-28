import type { Metadata } from "next";
import { ContentRequestForm } from "@/components/content-request-form";
import { TIKTOK_HANDLE, TIKTOK_URL } from "@/lib/social";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Follow Defending Torah on social media, join live conversations, and tell us what content to make next — platforms, formats, and subjects.",
};

const OFFERINGS = [
  {
    kicker: "Live",
    title: "Live Conversations",
    body: "Real-time discussions on Torah, the New Testament, and the hard questions in between. Bring your objections — we take them live.",
  },
  {
    kicker: "Short-form",
    title: "Answers in 60 Seconds",
    body: "One objection, one clear answer, straight from the text. Shareable responses to the arguments you hear most.",
  },
  {
    kicker: "Community",
    title: "The Comments Are the Classroom",
    body: "Some of our best content starts as a question in the comments. Ask, push back, request a verse — we read everything.",
  },
];

export default function ConnectPage() {
  return (
    <div className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <header className="mb-12 rise">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-crimson" />
            Beyond the Page
          </div>
          <h1 className="font-heading font-light text-[clamp(36px,5vw,58px)] leading-[1.05] tracking-tight text-ink mb-5">
            The conversation doesn&apos;t end
            <br />
            <em className="font-body italic text-ochre-deep">at the essay.</em>
          </h1>
          <p className="text-[18px] leading-[1.65] text-ink-soft max-w-[560px]">
            The essays here go deep. On social media we go <em>live</em> — short
            answers, real questions, and unscripted conversations about Torah
            and the Messiah. Come join us.
          </p>
        </header>

        {/* TikTok card */}
        <section className="mb-14 rise delay-1">
          <div className="border border-ink bg-parchment-deep p-8 shadow-[8px_8px_0_0_var(--ink)] flex items-center justify-between gap-6 flex-wrap">
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-crimson mb-2">
                Now Streaming On
              </div>
              <div className="font-heading font-black text-[34px] leading-none text-ink mb-1.5">
                TikTok
              </div>
              <div className="font-mono text-[12px] tracking-[0.12em] text-ink-soft">
                {TIKTOK_HANDLE}
              </div>
            </div>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !px-7 !py-4"
            >
              Follow &amp; Join a Live
              <span className="arrow">→</span>
            </a>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
            More platforms coming — help us pick below.
          </p>
        </section>

        {/* What you'll find */}
        <section className="mb-14 rise delay-2">
          <div className="ornamental-rule mb-10" aria-hidden="true">
            <span className="ornament">✦</span>
          </div>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {OFFERINGS.map((item) => (
              <div key={item.title} className="border border-ink/30 p-6">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-ochre-deep mb-3">
                  {item.kicker}
                </div>
                <h2 className="font-heading font-medium text-[20px] leading-[1.2] text-ink mb-2.5">
                  {item.title}
                </h2>
                <p className="text-[14.5px] leading-[1.55] text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="rise delay-3">
          <div className="ornamental-rule mb-10" aria-hidden="true">
            <span className="ornament">✦</span>
          </div>
          <header className="mb-10">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-crimson" />
              Content Request Desk
            </div>
            <h2 className="font-heading font-light text-[clamp(28px,4vw,42px)] leading-[1.1] tracking-tight text-ink mb-4">
              You tell us what to make.
            </h2>
            <p className="text-[16px] leading-[1.65] text-ink-soft max-w-[540px]">
              We&apos;re one account on one platform — for now. Where we expand,
              what formats we produce, and which subjects we tackle next should
              be driven by the people actually watching. Three quick questions;
              every answer is optional.
            </p>
          </header>
          <ContentRequestForm />
        </section>
      </div>
    </div>
  );
}
