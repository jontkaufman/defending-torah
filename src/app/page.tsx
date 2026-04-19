import Link from "next/link";
import { getObjections } from "@/lib/content";
import { getPosts } from "@/lib/posts";

export default function Home() {
  const objections = getObjections().slice(0, 5);
  const latestPost = getPosts()[0];

  return (
    <div>
      {/* HERO */}
      <section className="relative z-[1] px-10 py-[70px] pb-[90px] grid grid-cols-[1.15fr_1fr] gap-[60px] border-b border-ink overflow-hidden max-md:grid-cols-1 max-md:px-6 max-md:py-[50px] max-md:pb-[70px] max-md:gap-[50px]">
        {/* Edition Tag */}
        <div className="absolute top-[90px] right-10 [writing-mode:vertical-rl] font-mono text-[10px] tracking-[0.3em] uppercase text-muted max-md:hidden">
          No. 001 — Nisan Edition
        </div>

        <div className="relative">
          {/* Hebrew Watermark */}
          <div className="absolute top-0 right-0 font-heading font-black text-[300px] opacity-[0.03] text-ink pointer-events-none select-none leading-none">
            תּ
          </div>

          {/* Kicker */}
          <div className="rise delay-1 font-mono text-[11px] tracking-[0.3em] uppercase text-crimson mb-7 flex items-center gap-3.5">
            <span className="w-10 h-px bg-crimson" />
            A Defense of the{" "}
            <span className="text-ochre-deep italic font-body text-sm tracking-normal normal-case">
              Torat Moshe
            </span>
          </div>

          {/* Title */}
          <h1 className="rise delay-2 font-heading font-light text-[clamp(52px,7.5vw,104px)] leading-[0.96] tracking-[-0.035em] text-ink mb-9">
            The <em className="font-body italic font-normal text-ochre-deep">Torah</em> is
            not
            <br />a <span className="font-heading font-black text-ink">yoke</span>.
            <br />
            It is a{" "}
            <em className="font-body italic font-normal text-ochre-deep">gift.</em>
          </h1>

          {/* Lede */}
          <p className="rise delay-3 text-[22px] leading-[1.5] max-w-[560px] text-ink-soft mb-11 font-normal">
            Careful arguments, primary sources, and Hebrew exegesis for the
            honest skeptic and the serious student.{" "}
            <strong className="font-semibold text-ink italic">
              No slogans. No tribal shorthand.
            </strong>{" "}
            Only the text, the history, and the covenant — examined as they are.
          </p>

          {/* Actions */}
          <div className="rise delay-4 flex gap-5 items-center flex-wrap">
            <Link href="/articles" className="btn btn-primary">
              Begin With the First Essay
              <span className="arrow">→</span>
            </Link>
            <Link href="/objection-finder" className="btn btn-ghost">
              Ask a Question
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
              <span>Dt. 30:11–14</span>
            </div>

            <div className="font-heading font-light text-[clamp(72px,10vw,118px)] leading-[0.9] text-ink text-right tracking-tight mb-6" dir="rtl">
              אֱמֶת
            </div>
            <div className="font-body italic text-[26px] text-ochre-deep text-right mb-2">
              emet
            </div>
            <div className="font-body text-[17px] text-ink-soft text-right mb-8 pb-6 border-b border-ink">
              truth · firmness · that which stands
            </div>

            <p className="text-[17px] leading-[1.55] text-ink italic mb-[18px] [&::first-letter]:font-heading [&::first-letter]:text-[52px] [&::first-letter]:font-bold [&::first-letter]:float-left [&::first-letter]:leading-[0.85] [&::first-letter]:pr-2 [&::first-letter]:pt-1.5 [&::first-letter]:text-ochre [&::first-letter]:not-italic">
              This commandment which I am commanding you today is not too
              difficult for you, nor is it out of reach. It is not in heaven…
              but the word is very near you, in your mouth and in your heart,
              that you may observe it.
            </p>

            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-crimson text-right">
              — Devarim 30:11, 14
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative z-[1] px-10 py-[90px] pb-[100px] border-b border-ink max-md:px-6 max-md:py-[60px] max-md:pb-[70px]">
        <div className="grid grid-cols-[1fr_2fr] gap-[60px] mb-[70px] items-end max-md:grid-cols-1 max-md:gap-6">
          <div className="section-label rise delay-1">
            <span className="num">I.</span>Three Pillars
          </div>
          <h2 className="section-title rise delay-2">
            What we are <em>building</em>,<br />
            and why it matters now.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-0 border-t border-ink max-md:grid-cols-1">
          {[
            {
              num: "01",
              sub: "Mikra — Text",
              hebrew: "מִקְרָא",
              title: (
                <>
                  The <em>Scripture</em>, read on its own terms.
                </>
              ),
              body: "Old Testament–first exegesis. Hebrew grammar, Ancient Near Eastern context, and the covenantal arc from Bereshit through the Apostolic writings — without importing later theological filters.",
              link: { href: "/articles", label: "Read the essays →" },
              accent: "bg-ochre",
            },
            {
              num: "02",
              sub: "Raayah — Evidence",
              hebrew: "רְאָיָה",
              title: (
                <>
                  The <em>evidence</em>, laid out honestly.
                </>
              ),
              body: "Archaeology, manuscript transmission, Second Temple sources, and the historical setting of Yeshua. Strong cases where they exist; acknowledged uncertainty where it does not.",
              link: { href: "/articles", label: "See the studies →" },
              accent: "bg-crimson",
            },
            {
              num: "03",
              sub: "Brit — Covenant",
              hebrew: "בְּרִית",
              title: (
                <>
                  The <em>covenant</em>, continuous and whole.
                </>
              ),
              body: "Grace (chen) and Torah as one covenantal fabric. The New Covenant of Jeremiah 31 as the Torah written on the heart — not its abrogation. Engaging the law-versus-grace debate at its roots.",
              link: { href: "/articles", label: "Explore the argument →" },
              accent: "bg-olive",
            },
          ].map((pillar, i) => (
            <div
              key={pillar.num}
              className={`px-9 py-10 transition-colors hover:bg-ochre/[0.07] ${i < 2 ? "border-r border-ink max-md:border-r-0 max-md:border-b" : "max-md:border-b-0"}`}
            >
              <div className={`w-12 h-[3px] ${pillar.accent} mb-8`} />
              <div className="font-heading font-black text-[72px] leading-none text-ochre mb-2.5">
                {pillar.num}
              </div>
              <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-[26px]">
                {pillar.sub}
              </span>
              <div className="font-heading text-[42px] text-ink mb-1.5" dir="rtl" style={{ textAlign: "left" }}>
                {pillar.hebrew}
              </div>
              <h3 className="font-body text-[28px] font-medium leading-[1.1] text-ink mb-4">
                {pillar.title}
              </h3>
              <p className="text-[17px] leading-[1.55] text-ink-soft mb-6">
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

      {/* OBJECTIONS */}
      <section className="relative z-[1] bg-ink text-parchment px-10 py-[90px] pb-[100px] overflow-hidden max-md:px-6 max-md:py-[60px] max-md:pb-[70px]">
        {/* Radial glow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_10%_20%,rgba(184,115,42,0.18),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(122,46,36,0.15),transparent_50%)]" />

        {/* Hebrew Watermark */}
        <div className="absolute bottom-20 right-10 font-heading font-black text-[200px] opacity-[0.04] text-ochre pointer-events-none select-none leading-none">
          שׁ
        </div>

        <div className="relative z-[1]">
          <div className="grid grid-cols-[1fr_2fr] gap-[60px] mb-[70px] items-end max-md:grid-cols-1 max-md:gap-6">
            <div className="section-label !text-ochre rise delay-1">
              <span className="num !text-parchment">II.</span>Hard Questions
            </div>
            <h2 className="section-title !text-parchment rise delay-2">
              Every serious objection deserves a{" "}
              <em className="!text-ochre">serious answer.</em>
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
        <section className="relative z-[1] px-10 py-[90px] pb-[100px] grid grid-cols-[1fr_1.4fr] gap-20 border-b border-ink max-md:grid-cols-1 max-md:gap-10 max-md:px-6 max-md:py-[60px] max-md:pb-[70px]">
          <div className="sticky top-10 self-start max-md:static">
            <span className="section-label block mb-6">
              <span className="num">III.</span>Latest
            </span>
            <div className="font-heading font-black text-[92px] leading-[0.9] text-ink mb-2.5">
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
