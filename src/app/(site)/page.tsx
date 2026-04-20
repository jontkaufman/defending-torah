import Link from "next/link";
import { getObjections } from "@/lib/content";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function Home() {
  const objections = getObjections().slice(0, 5);
  const latestPost = getPosts()[0];

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* HERO */}
      <section className="relative z-[1] px-16 py-[70px] pb-[90px] grid grid-cols-[1.15fr_1fr] gap-[60px] border-b border-ink overflow-hidden max-md:grid-cols-1 max-md:px-6 max-md:py-[50px] max-md:pb-[70px] max-md:gap-[50px]">
        {/* Edition Tag */}
        <div className="absolute top-[90px] right-16 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.3em] uppercase text-muted max-md:hidden">
          No. 001 — Nisan Edition
        </div>

        <div className="relative">
          {/* Hebrew Watermark */}
          <div className="absolute top-0 right-0 font-heading font-black text-[300px] opacity-[0.03] text-ink pointer-events-none select-none leading-none">
            י
          </div>

          {/* Kicker */}
          <div className="rise delay-1 font-mono text-[11px] tracking-[0.3em] uppercase text-crimson mb-7 flex items-center gap-3.5">
            <span className="w-10 h-px bg-crimson" />
            Following the{" "}
            <span className="text-ochre-deep italic font-body text-sm tracking-normal normal-case">
              Master
            </span>
          </div>

          {/* Title */}
          <h1 className="rise delay-2 font-heading font-light text-[clamp(48px,7vw,96px)] leading-[0.96] tracking-[-0.035em] text-ink mb-9">
            Yeshua{" "}
            <em className="font-body italic font-normal text-ochre-deep">
              kept
            </em>{" "}
            Torah.
            <br />
            So should{" "}
            <span className="font-heading font-black text-ink">we</span>.
          </h1>

          {/* Lede */}
          <p className="rise delay-3 text-[22px] leading-[1.5] max-w-[560px] text-ink-soft mb-11 font-normal max-md:text-[18px] max-md:mb-8">
            He observed the Sabbath. He ate clean. He kept the feasts. He said
            not one letter of the Torah would pass away until{" "}
            <em>everything</em> is accomplished.{" "}
            <strong className="font-semibold text-ink italic">
              If we follow Him, we follow where He walked.
            </strong>
          </p>

          {/* Actions */}
          <div className="rise delay-4 flex gap-5 items-center flex-wrap">
            <Link href="/articles" className="btn btn-primary">
              See What He Taught
              <span className="arrow">→</span>
            </Link>
            <Link href="/objection-finder" className="btn btn-ghost">
              Ask a Hard Question
            </Link>
          </div>
        </div>

        {/* Scroll Plate */}
        <div className="rise delay-3 relative flex justify-center items-start pt-5 max-md:justify-start">
          <div className="relative w-full max-w-[480px] aspect-[3/4] bg-parchment-deep border border-ink px-[38px] py-11 shadow-[20px_20px_0_-1px_var(--parchment-deep),20px_20px_0_0_var(--ink)] max-md:max-w-full max-md:shadow-[12px_12px_0_-1px_var(--parchment-deep),12px_12px_0_0_var(--ink)]">
            {/* Inner border */}
            <div className="absolute inset-2 border border-ink pointer-events-none opacity-35" />

            <div className="flex justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-[18px]">
              <span>Plate I</span>
              <span>Mt. 5:17–19</span>
            </div>

            <div
              className="font-heading font-light text-[clamp(72px,10vw,118px)] leading-[0.9] text-ink text-right tracking-tight mb-6"
              dir="rtl"
            >
              יֵשׁוּעַ
            </div>
            <div className="font-body italic text-[26px] text-ochre-deep text-right mb-2 max-md:text-[22px]">
              Yeshua
            </div>
            <div className="font-body text-[17px] text-ink-soft text-right mb-8 pb-6 border-b border-ink max-md:text-[15px] max-md:mb-6">
              salvation · deliverance · the one who saves
            </div>

            <p className="text-[17px] leading-[1.55] text-ink italic mb-[18px] [&::first-letter]:font-heading [&::first-letter]:text-[52px] [&::first-letter]:font-bold [&::first-letter]:float-left [&::first-letter]:leading-[0.85] [&::first-letter]:pr-2 [&::first-letter]:pt-1.5 [&::first-letter]:text-ochre [&::first-letter]:not-italic">
              Do not think that I have come to abolish the Law or the Prophets;
              I have not come to abolish them but to fulfill them. For truly I
              say to you, until heaven and earth pass away, not the smallest
              letter or stroke shall pass from the Law until all is
              accomplished.
            </p>

            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-crimson text-right">
              — Matthew 5:17–18
            </div>
          </div>
        </div>
      </section>

      {/* BEGINNER'S GUIDE FEATURED CALLOUT */}
      <section className="relative z-[1] px-16 py-[70px] border-b border-ink bg-parchment/30 max-md:px-6 max-md:py-[50px]">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-ochre/10 border border-ochre/30 rounded-full mb-6">
            <span className="text-2xl">🌱</span>
            <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ochre-deep font-semibold">
              Start Here
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading font-light text-[clamp(36px,5vw,56px)] leading-[1.1] tracking-tight text-ink mb-6">
            New to Torah Observance?
          </h2>

          {/* Description */}
          <p className="text-[19px] leading-[1.6] text-ink-soft mb-8 max-w-[680px] mx-auto">
            Everything you need to begin your Torah journey—theology for gentiles, answers to common objections, and practical first steps for Sabbath, dietary laws, feasts, and prayer.
          </p>

          {/* CTA Button */}
          <Link
            href="/articles/getting-started-with-torah-observance-beginners-guide"
            className="btn btn-primary inline-flex"
          >
            Read the Complete Beginner's Guide
            <span className="arrow">→</span>
          </Link>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted max-md:flex-col max-md:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-ochre">📖</span>
              <span>~10,000 words</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ochre">⏱️</span>
              <span>30-40 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ochre">🎯</span>
              <span>Entry-level</span>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS — reframed around Yeshua */}
      <section className="relative z-[1] px-16 py-[90px] pb-[100px] border-b border-ink max-md:px-6 max-md:py-[60px] max-md:pb-[70px]">
        <div className="mb-[70px] max-md:mb-[40px]">
          <h2 className="section-title rise delay-2">
            Yeshua did not come to <em>end</em> Torah.
            <br />
            He came to show us how to <em>live</em> it.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-0 border-t border-ink max-md:grid-cols-1">
          {[
            {
              num: "01",
              sub: "Halakh — His Walk",
              hebrew: "הָלַךְ",
              title: (
                <>
                  He <em>lived</em> every command He gave.
                </>
              ),
              body: "Yeshua kept the Sabbath, observed the biblical feasts, ate according to Torah's dietary laws, and wore tzitzit. His debates with the Pharisees were never about whether to keep the law — but about how. He is the pattern, and His life is the interpretation.",
              link: {
                href: "/articles/matthew-5-17-19-foundation",
                label: "Read His words →",
              },
              accent: "bg-ochre",
            },
            {
              num: "02",
              sub: "Lamad — His Teaching",
              hebrew: "לָמַד",
              title: (
                <>
                  He <em>taught</em> Torah as still binding.
                </>
              ),
              body: "\"Whoever relaxes one of the least of these commandments and teaches others to do the same will be called least in the kingdom of heaven\" (Matthew 5:19). He affirmed the whole Torah — distinguishing weightier from lighter, but never abolishing either.",
              link: {
                href: "/articles/moral-ceremonial-civil-division",
                label: "See the evidence →",
              },
              accent: "bg-crimson",
            },
            {
              num: "03",
              sub: "Tsavah — His Commission",
              hebrew: "צִוָּה",
              title: (
                <>
                  He told us to <em>do</em> the same.
                </>
              ),
              body: "\"If you love Me, keep My commandments\" (John 14:15). \"Go and make disciples... teaching them to observe all that I have commanded you\" (Matthew 28:19-20). Following Yeshua means walking as He walked — and He walked Torah.",
              link: {
                href: "/articles",
                label: "Explore His Torah →",
              },
              accent: "bg-olive",
            },
          ].map((pillar, i) => (
            <div
              key={pillar.num}
              className={`px-9 py-10 transition-colors hover:bg-ochre/[0.07] max-md:px-6 max-md:py-7 ${i < 2 ? "border-r border-ink max-md:border-r-0 max-md:border-b" : "max-md:border-b-0"}`}
            >
              <div className={`w-12 h-[3px] ${pillar.accent} mb-8`} />
              <div className="font-heading font-black text-[72px] leading-none text-ochre mb-2.5 max-md:text-[48px]">
                {pillar.num}
              </div>
              <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-[26px]">
                {pillar.sub}
              </span>
              <div
                className="font-heading text-[42px] text-ink mb-1.5"
                dir="rtl"
                style={{ textAlign: "left" }}
              >
                {pillar.hebrew}
              </div>
              <h3 className="font-body text-[28px] font-medium leading-[1.1] text-ink mb-4 max-md:text-[22px]">
                {pillar.title}
              </h3>
              <p className="text-[17px] leading-[1.55] text-ink-soft mb-6 max-md:text-[15px]">
                {pillar.body}
              </p>
              <Link
                href={pillar.link.href}
                className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink no-underline border-b border-ink pb-[3px] transition-colors hover:text-ochre-deep hover:border-ochre-deep"
              >
                {pillar.link.label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 1 JOHN 2:6 BANNER */}
      <section className="relative z-[1] bg-parchment-deep px-16 py-16 border-b border-ink text-center max-md:px-6 max-md:py-12">
        <div className="max-w-3xl mx-auto">
          <p className="font-body italic text-[clamp(20px,3vw,30px)] leading-[1.5] text-ink mb-4">
            &ldquo;Whoever says he abides in Him ought to walk in the same way in which{" "}
            <strong className="font-semibold">He</strong>{" "}walked.&rdquo;
          </p>
          <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-crimson">
            — 1 John 2:6
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="relative z-[1] bg-ink text-parchment px-16 py-[90px] pb-[100px] overflow-hidden max-md:px-6 max-md:py-[60px] max-md:pb-[70px]">
        {/* Radial glow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_10%_20%,rgba(184,115,42,0.18),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(122,46,36,0.15),transparent_50%)]" />

        {/* Hebrew Watermark */}
        <div className="absolute bottom-20 right-16 font-heading font-black text-[200px] opacity-[0.04] text-ochre pointer-events-none select-none leading-none">
          שׁ
        </div>

        <div className="relative z-[1]">
          <div className="mb-[70px] max-md:mb-[40px]">
            <h2 className="section-title !text-parchment rise delay-2">
              Yeshua walked in Torah - Do you?{" "}
              <em className="!text-ochre">Good Question.</em>
            </h2>
          </div>

          <div className="border-t border-parchment/25">
            {(objections.length > 0
              ? objections.map((o, i) => ({
                  num: ["i", "ii", "iii", "iv", "v"][i] ?? `${i + 1}`,
                  q: o.meta.title,
                  tag: o.meta.tags[0] ?? "Apologetics",
                  href: `/objection-finder/${o.meta.slug}`,
                }))
              : [
                  {
                    num: "i",
                    q: '"Didn\'t Paul abolish the law? Doesn\'t Galatians settle it?"',
                    tag: "Pauline Studies",
                    href: "/objection-finder",
                  },
                  {
                    num: "ii",
                    q: "If the Torah is still binding, what about shellfish, mixed fabrics, and the ritual system?",
                    tag: "Mitzvot",
                    href: "/objection-finder",
                  },
                  {
                    num: "iii",
                    q: 'How do we read Hebrews 8 without dismissing the covenant with Israel?',
                    tag: "New Covenant",
                    href: "/objection-finder",
                  },
                ]
            ).map((item) => (
              <Link
                key={item.num}
                href={item.href}
                className="block no-underline py-9 border-b border-parchment/25 grid grid-cols-[80px_1fr_120px] gap-10 items-baseline cursor-pointer transition-[padding] duration-300 hover:pl-3 max-md:grid-cols-[50px_1fr] max-md:gap-5"
              >
                <div className="font-heading font-light text-[48px] text-ochre italic">
                  {item.num}
                </div>
                <div className="font-body font-normal text-[clamp(22px,2.4vw,30px)] leading-[1.25] text-parchment tracking-tight">
                  {item.q}
                </div>
                <div className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-parchment/60 text-right max-md:col-start-2 max-md:text-left max-md:mt-2">
                  {item.tag}
                </div>
              </Link>
            ))}

            {/* View All Link */}
            <div className="pt-8">
              <Link
                href="/objection-finder"
                className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-parchment/60 no-underline border-b border-parchment/40 pb-[3px] transition-colors hover:text-ochre hover:border-ochre inline-block"
              >
                View All Objections →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ESSAY / BLOG POST */}
      {latestPost && (
        <section className="relative z-[1] px-16 py-[90px] pb-[100px] grid grid-cols-[1fr_1.4fr] gap-20 border-b border-ink max-md:grid-cols-1 max-md:gap-10 max-md:px-6 max-md:py-[60px] max-md:pb-[70px]">
          <div className="sticky top-10 self-start max-md:static">
            <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-muted block mb-6">
              Latest
            </span>
            <div className="font-heading font-black text-[92px] leading-[0.9] text-ink mb-2.5 max-md:text-[60px]">
              N° 001
            </div>
            <div className="font-body italic text-[22px] text-ochre-deep mb-9">
              {latestPost.meta.title}
            </div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted pt-5 border-t border-ink">
              {latestPost.meta.date}
            </div>

            {/* Ornamental Rule */}
            <div className="ornamental-rule mt-8">
              <span className="ornament">✦</span>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-crimson mb-8">
              Featured Post
            </div>
            <h2 className="font-heading font-light text-[clamp(40px,5vw,64px)] leading-none tracking-tight mb-7 text-ink">
              {latestPost.meta.title}
            </h2>
            {latestPost.meta.excerpt && (
              <p className="text-[20px] leading-[1.6] text-ink mb-7">
                {latestPost.meta.excerpt}
              </p>
            )}
            <Link
              href={`/blog/${latestPost.meta.slug}`}
              className="btn btn-primary mt-2"
            >
              Read the Full Post <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
