import { MonoLabel } from "@/components/course/mono-label";

const resources = [
  {
    key: "worksheet",
    label: "Session Worksheets",
    icon: "✍",
    desc: "Printable fill-in worksheets for each session. Includes discussion prompts, reflection questions, and space for notes.",
    href: "/resources/worksheet/1",
  },
  {
    key: "verses",
    label: "Memory Verse Cards",
    icon: "◈",
    desc: "Five printable cards, one per week. Each card features the week's memory verse with reference and key context.",
    href: "/resources/verse-cards",
  },
  {
    key: "glossary",
    label: "Key Terms Glossary",
    icon: "▦",
    desc: "14 foundational terms defined with biblical references and context. Essential vocabulary for understanding Torah continuity.",
    href: "/resources/glossary",
  },
  {
    key: "objections",
    label: "Objections Cheat Sheet",
    icon: "◉",
    desc: "All 12 common objections addressed in the course, with quick biblical responses and key verses to remember.",
    href: "/resources/objections",
  },
  {
    key: "capstone",
    label: "Capstone Submission",
    icon: "★",
    desc: "Complete your final project by writing a personal defence of Torah observance. Submit for review and certificate eligibility.",
    href: "/resources/capstone",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-[1200px] mx-auto w-full py-[52px] px-12">
      {/* Header */}
      <div className="mb-10 pb-10 border-b border-parchment-shadow">
        <MonoLabel color="var(--crimson)" className="mb-3">
          Course Resources
        </MonoLabel>
        <h1
          className="font-heading font-light leading-none tracking-tight mb-2.5"
          style={{ fontSize: "clamp(36px, 4vw, 48px)" }}
        >
          Learning materials.
        </h1>
        <p
          className="font-body text-[18px] max-w-[560px]"
          style={{ color: "var(--ink-soft)" }}
        >
          Downloadable worksheets, study aids, and reference materials to support
          your learning.
        </p>
      </div>

      {/* Resource rows */}
      <div className="space-y-4 max-w-[860px]">
        {resources.map((resource) => (
          <a
            key={resource.key}
            href={resource.href}
            className="border border-parchment-shadow p-6 px-7 bg-parchment-deep flex items-center gap-6 transition-all hover:border-ink hover:shadow-sm group"
          >
            {/* Icon box */}
            <div
              className="w-[44px] h-[44px] shrink-0 flex items-center justify-center border border-ochre text-[20px] transition-colors group-hover:bg-ochre group-hover:text-parchment"
              style={{ color: "var(--ochre)" }}
            >
              {resource.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-heading font-medium text-[22px] leading-[1.2] mb-1">
                {resource.label}
              </h3>
              <p
                className="font-body text-[16px] leading-[1.5]"
                style={{ color: "var(--ink-soft)" }}
              >
                {resource.desc}
              </p>
            </div>

            {/* Arrow indicator */}
            <MonoLabel
              color="var(--ochre)"
              className="shrink-0 transition-transform group-hover:translate-x-1"
            >
              Open →
            </MonoLabel>
          </a>
        ))}
      </div>
    </div>
  );
}
