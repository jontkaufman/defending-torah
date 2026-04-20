import { MonoLabel } from "@/components/course/mono-label";
import { PrintButton } from "@/components/course/print-button";

const VERSES = [
  {
    week: 1,
    title: "Foundations",
    ref: "Psalm 119:97",
    text: "Oh how I love your Torah! It is my meditation all the day.",
    hebrew: "אָהַבְתִּי תוֹרָתֶךָ",
  },
  {
    week: 2,
    title: "Yeshua & Torah",
    ref: "Matthew 5:17",
    text: "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfil them.",
    hebrew: "מָשִׁיחַ",
  },
  {
    week: 3,
    title: "Paul",
    ref: "2 Peter 3:16",
    text: "There are some things in them that are hard to understand, which the ignorant and unstable twist to their own destruction.",
    hebrew: "תּוֹרָה",
  },
  {
    week: 4,
    title: "Objections",
    ref: "1 Peter 3:15",
    text: "Always be prepared to give a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect.",
    hebrew: "אֱמֶת",
  },
  {
    week: 5,
    title: "Maturity",
    ref: "Micah 6:8",
    text: "He has told you, O man, what is good; and what does the LORD require of you but to do justice, and to love kindness, and to walk humbly with your God?",
    hebrew: "שָׁלוֹם",
  },
];

export default function VerseCardsPage() {
  return (
    <div className="max-w-[900px] mx-auto py-[52px] px-12">
      {/* Header */}
      <div className="mb-10">
        <MonoLabel color="var(--crimson)" className="mb-3">
          Print & Cut
        </MonoLabel>
        <h1
          className="font-heading font-light mb-4"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Memory Verse Cards
        </h1>
        <p className="font-body text-[17px] text-ink-soft max-w-[560px] mb-6">
          Print, cut out, fold on the dotted line, and carry these verse cards with you
          throughout the course.
        </p>
        <div className="no-print">
          <PrintButton />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {VERSES.map((verse) => (
          <div key={verse.week}>
            {/* Front Card */}
            <div className="border-[1.5px] border-ink bg-parchment-deep p-6 relative overflow-hidden mb-6">
              {/* Hebrew Watermark */}
              <div
                className="absolute top-[-10px] right-[-10px] font-heading font-black text-[80px] opacity-5 text-ochre pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                {verse.hebrew}
              </div>

              {/* Top Row */}
              <div className="flex justify-between items-center mb-4">
                <MonoLabel color="var(--muted)" className="text-[9px]">
                  Week {verse.week} · {verse.title}
                </MonoLabel>
                <MonoLabel color="var(--muted)" className="text-[9px]">
                  Front
                </MonoLabel>
              </div>

              {/* Quote */}
              <div className="border-l-2 border-ochre pl-3 mb-4">
                <p className="font-body italic text-[17px] leading-[1.65] text-ink-soft">
                  {verse.text}
                </p>
              </div>

              {/* Reference */}
              <MonoLabel color="var(--crimson)" className="text-[10px]">
                {verse.ref}
              </MonoLabel>
            </div>

            {/* Back Card */}
            <div className="border-[1.5px] border-ink bg-ink p-6 relative overflow-hidden">
              {/* Hebrew Watermark */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[100px] opacity-[0.06] text-ochre pointer-events-none"
                style={{ lineHeight: 1 }}
                dir="rtl"
              >
                {verse.hebrew}
              </div>

              {/* Top Row */}
              <div className="flex justify-between items-center mb-6 relative z-10">
                <MonoLabel
                  color="rgba(var(--parchment-rgb), 0.4)"
                  className="text-[9px]"
                >
                  Week {verse.week}
                </MonoLabel>
                <MonoLabel
                  color="rgba(var(--parchment-rgb), 0.4)"
                  className="text-[9px]"
                >
                  Back
                </MonoLabel>
              </div>

              {/* Reference */}
              <div className="relative z-10">
                <h2 className="font-heading font-light text-[28px] text-parchment leading-[1.1] mb-2">
                  {verse.ref}
                </h2>
                <p className="font-heading italic text-[18px] text-ochre">
                  {verse.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
