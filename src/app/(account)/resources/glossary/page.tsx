"use client";

import { MonoLabel } from "@/components/course/mono-label";
import { useState } from "react";

const TERMS = [
  {
    term: "Torah",
    def: "God's instruction, teaching, and direction for His people. Not a legal burden — a gift that reveals His holiness, wisdom, and love.",
    root: "From the Hebrew יָרָה (yarah) — to guide, to direct, to shoot straight.",
  },
  {
    term: "Covenant",
    def: "A binding agreement between God and His people, involving promises, obligations, and relationship. Not a contract — a family bond.",
    root: "From the Hebrew בְּרִית (berit) — a cutting, a binding pledge.",
  },
  {
    term: "Grace",
    def: "God's unearned favour — His decision to be for us and with us even when we don't deserve it. Also His enabling power to live rightly.",
    root: "From the Greek χάρις (charis) — gift, favour, thanks.",
  },
  {
    term: "Obedience",
    def: "Living according to God's instruction out of love and trust, not fear. Not earning favour — responding to the One who already loves us.",
    root: "From the Latin oboedire — to listen, to hear and respond.",
  },
  {
    term: "Legalism",
    def: "Seeking to earn God's favour through rule-keeping, rather than responding to His love. Obedience and legalism are not the same thing.",
    root: "The problem is not what you do, but why and how.",
  },
  {
    term: "Justification",
    def: "Being declared righteous before God — not because we earned it, but because of Messiah's faithfulness and God's grace received by faith.",
    root: "From the Latin justificare — to make right, to declare innocent.",
  },
  {
    term: "Sanctification",
    def: "The ongoing process of being made holy — walking in obedience, growing in character, becoming more like Messiah over time.",
    root: "From the Latin sanctificare — to make holy.",
  },
  {
    term: "Holiness",
    def: "Being set apart for God. Reflecting His character. Living in a way that is distinct from the surrounding culture because we belong to Him.",
    root: "From the Hebrew קָדוֹשׁ (kadosh) — set apart, sacred, distinct.",
  },
  {
    term: "Fulfill",
    def: "To fill up the full meaning of something — to do it completely and correctly. Not to end or cancel. Yeshua fulfilled Torah by living it perfectly.",
    root: "From the Greek πληρόω (plēroō) — to fill, to complete, to bring to full expression.",
  },
  {
    term: "Lawlessness",
    def: "Living without regard for God's instruction. The Greek is ἀνομία (anomia) — literally 'without Torah.' The opposite of righteousness.",
    root: "Yeshua warned that many will cry 'Lord, Lord' but He will say 'I never knew you — depart from me, you workers of lawlessness' (Matthew 7:23).",
  },
  {
    term: "Tradition",
    def: "Human customs and rules passed down over generations. Not wrong in themselves — but when they replace or override God's commands, they become a problem.",
    root: "Yeshua rebuked traditions that made void the word of God (Mark 7:13).",
  },
  {
    term: "Condemnation",
    def: "The penalty and judgment that sin deserves. Messiah's death removes our condemnation — not the standard that defined what sin is.",
    root: "Romans 8:1 — There is therefore no condemnation for those who are in Messiah Yeshua.",
  },
  {
    term: "Faithfulness",
    def: "Steady trust and obedience over time — both God's and ours. God is always faithful. Our faithfulness is the response of a grateful heart.",
    root: "From the Hebrew אֱמוּנָה (emunah) — firmness, steadiness, reliability.",
  },
  {
    term: "Repentance",
    def: "Turning away from sin and back to God's ways. Not just feeling sorry — changing direction. The first and continual call of the gospel.",
    root: "From the Greek μετάνοια (metanoia) — a change of mind, a turning around.",
  },
];

export default function GlossaryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-[900px] mx-auto py-[52px] px-12">
      {/* Header */}
      <div className="mb-10">
        <MonoLabel color="var(--crimson)" className="mb-3">
          Reference
        </MonoLabel>
        <h1
          className="font-heading font-light mb-4"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Key Terms Glossary
        </h1>
        <p className="font-body text-[17px] text-ink-soft max-w-[640px]">
          Fourteen core concepts used throughout the course. Click to expand definitions
          and etymological roots.
        </p>
      </div>

      {/* Accordion */}
      <div className="border-t border-ink">
        {TERMS.map((item, index) => {
          const isOpen = openIndex === index;
          const num = String(index + 1).padStart(2, "0");

          return (
            <div key={index} className="border-b border-parchment-shadow">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-baseline gap-5 py-[18px] text-left"
              >
                <span className="font-heading font-black text-[20px] text-ochre opacity-40 w-8 shrink-0">
                  {num}
                </span>
                <span className="font-heading font-light text-[24px] text-ink tracking-[-0.01em] flex-1">
                  {item.term}
                </span>
                <span
                  className={`font-mono text-[11px] transition-all ${
                    isOpen ? "text-ochre rotate-90" : "text-muted"
                  }`}
                >
                  ›
                </span>
              </button>

              {isOpen && (
                <div className="pb-5 pl-[52px]">
                  <p className="font-body text-[18px] leading-[1.65] text-ink-soft mb-3">
                    {item.def}
                  </p>
                  <div
                    className="border-l-2 border-ochre pl-[14px] py-2 px-[14px]"
                    style={{ backgroundColor: "rgba(151, 94, 34, 0.04)" }}
                  >
                    <MonoLabel color="var(--ochre)" className="text-[9px] mb-1">
                      Root / Note
                    </MonoLabel>
                    <p className="font-body italic text-[15px] text-muted leading-[1.55]">
                      {item.root}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
