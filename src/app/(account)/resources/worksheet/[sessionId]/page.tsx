import { MonoLabel } from "@/components/course/mono-label";
import { PrintButton } from "@/components/course/print-button";
import { getSession } from "@/content/courses/foundations-of-defending-torah";
import { notFound } from "next/navigation";

// Writing lines component
function WritingLines({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-[1px] bg-parchment-shadow mb-[18px]" />
      ))}
    </>
  );
}

// Ornamental rule
function OrnamentalRule() {
  return (
    <div className="flex items-center gap-4 my-8" aria-hidden="true">
      <div className="flex-1 h-[1px] bg-parchment-shadow" />
      <span className="font-heading font-light text-[16px] text-ochre">✦</span>
      <div className="flex-1 h-[1px] bg-parchment-shadow" />
    </div>
  );
}

export default async function WorksheetPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const result = getSession(parseInt(sessionId));

  if (!result) {
    return notFound();
  }

  const { session, week } = result;

  // Key terms mapping
  const keyTermsMap: Record<number, string[]> = {
    1: ["Torah", "Covenant", "Obedience", "Legalism"],
    2: ["Covenant", "Faithfulness", "Torah", "Grace"],
    3: ["Fulfill", "Tradition", "Torah", "Holiness"],
    4: ["Justification", "Sanctification", "Holiness", "Lawlessness"],
    5: ["Grace", "Legalism", "Torah", "Condemnation"],
    6: ["Torah", "Faithfulness", "Tradition", "Obedience"],
    7: ["Condemnation", "Grace", "Torah", "Holiness"],
    8: ["Sabbath", "Torah", "Holiness", "Tradition"],
    9: ["Obedience", "Faithfulness", "Repentance", "Torah"],
    10: ["Torah", "Faithfulness", "Covenant", "Obedience"],
  };

  const keyTerms = keyTermsMap[session.id] || ["Torah", "Covenant", "Grace", "Obedience"];

  return (
    <div className="max-w-[900px] mx-auto py-[52px] px-12 relative">
      {/* Print button */}
      <div className="no-print absolute top-4 right-4">
        <PrintButton />
      </div>

      {/* Header */}
      <div className="flex justify-between mb-8 pb-6 border-b-2 border-ink">
        <div className="flex-1">
          <MonoLabel color="var(--crimson)">
            Session {session.id} of 10 · Week {week.num} Worksheet
          </MonoLabel>
          <h1 className="font-heading font-light mt-3 mb-2" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
            {session.title}
          </h1>
          <p className="font-body italic text-[18px] text-ink-soft">
            Big idea: {session.big_idea}
          </p>
        </div>
        <div className="shrink-0 ml-6 space-y-3">
          <div>
            <MonoLabel color="var(--ink)">Student Name</MonoLabel>
            <div className="w-[200px] h-[1px] bg-ink mt-2" />
          </div>
          <div>
            <MonoLabel color="var(--ink)">Date</MonoLabel>
            <div className="w-[200px] h-[1px] bg-ink mt-2" />
          </div>
        </div>
      </div>

      <OrnamentalRule />

      {/* Scripture Readings */}
      <section className="mb-10">
        <MonoLabel color="var(--ochre)" className="mb-4">
          Step 1 — Scripture Readings
        </MonoLabel>
        <p className="font-body text-[16px] text-ink-soft mb-6">
          Read each passage carefully. Write down one key observation from each.
        </p>
        {session.scriptures.map((scripture, i) => (
          <div key={i} className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="w-[3px] h-[20px] bg-ochre shrink-0" />
              <span className="font-body text-[15px] text-ink">{scripture}</span>
            </div>
            <WritingLines count={3} />
          </div>
        ))}
      </section>

      <OrnamentalRule />

      {/* Opening Question */}
      <section className="mb-10">
        <MonoLabel color="var(--crimson)" className="mb-4">
          Step 2 — Opening Question Response
        </MonoLabel>
        <p className="font-body text-[17px] text-ink mb-4 italic">
          "{session.opening_q}"
        </p>
        <WritingLines count={4} />
      </section>

      <OrnamentalRule />

      {/* Big Idea Rewrite */}
      <section className="mb-10">
        <div className="border border-parchment-shadow p-4 bg-parchment-deep">
          <MonoLabel color="var(--ochre)" className="mb-3">
            Step 3 — Big Idea (write it in your own words)
          </MonoLabel>
          <WritingLines count={3} />
        </div>
      </section>

      <OrnamentalRule />

      {/* Homework Tasks */}
      <section className="mb-10">
        <MonoLabel color="var(--ink)" className="mb-5">
          Homework Tasks
        </MonoLabel>
        {session.homework.map((task, i) => (
          <div key={i} className="mb-6">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-5 h-5 border border-ink shrink-0 mt-1" />
              <p className="font-body text-[16px] text-ink flex-1">{task}</p>
            </div>
            <WritingLines count={3} />
          </div>
        ))}
      </section>

      <OrnamentalRule />

      {/* Key Terms */}
      <section className="mb-10">
        <MonoLabel color="var(--crimson)" className="mb-5">
          Key Terms — Define in Your Own Words
        </MonoLabel>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {keyTerms.map((term, i) => (
            <div key={i}>
              <h3 className="font-heading font-medium text-[20px] text-ink mb-2">
                {term}
              </h3>
              <WritingLines count={2} />
            </div>
          ))}
        </div>
      </section>

      <OrnamentalRule />

      {/* Memory Verse */}
      <section>
        <div className="border border-ink p-5 bg-parchment-deep">
          <MonoLabel color="var(--olive)" className="mb-4">
            Memory Verse — Week {week.num}
          </MonoLabel>
          <div className="border-l-2 border-ochre pl-4 mb-4">
            <p className="font-body text-[17px] text-ink-soft mb-2">
              {week.memory_verse.text}
            </p>
            <p className="font-mono text-[11px] text-crimson tracking-wider">
              {week.memory_verse.ref}
            </p>
          </div>
          <MonoLabel color="var(--ink)" className="mb-3">
            Write it out from memory
          </MonoLabel>
          <WritingLines count={2} />
        </div>
      </section>
    </div>
  );
}
