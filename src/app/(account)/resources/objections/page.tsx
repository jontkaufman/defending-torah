import { MonoLabel } from "@/components/course/mono-label";
import { PrintButton } from "@/components/course/print-button";

const OBJECTIONS = [
  {
    num: "01",
    obj: "We are not under the law.",
    response:
      "Being 'not under law' means free from condemnation — not free from instruction. Paul himself says 'we uphold the law' (Romans 3:31).",
    ref: "Romans 3:31; 6:14–15",
  },
  {
    num: "02",
    obj: "Jesus fulfilled the law so we don't have to.",
    response:
      "'Fulfil' means to fill up the full meaning, not to end. Yeshua said not one letter would pass away until all is accomplished (Matthew 5:17–18).",
    ref: "Matthew 5:17–19",
  },
  {
    num: "03",
    obj: "The law was nailed to the cross.",
    response:
      "The 'record of debt' nailed away was our certificate of sin — not the definition of holiness. The standard that defines sin cannot also be removed by paying for sin.",
    ref: "Colossians 2:13–14",
  },
  {
    num: "04",
    obj: "The Sabbath was abolished.",
    response:
      "The Sabbath was established at creation before Israel existed (Genesis 2:2–3). Isaiah 56 promises it to all who hold it — explicitly including foreigners.",
    ref: "Isaiah 56:6–7; Genesis 2:2–3",
  },
  {
    num: "05",
    obj: "The law was only for Israel.",
    response:
      "Many commands pre-date Israel. The same Torah applied to sojourners living among Israel. Isaiah 56 explicitly includes Gentiles who join themselves to God.",
    ref: "Exodus 12:49; Isaiah 56:6",
  },
  {
    num: "06",
    obj: "Paul taught against the law.",
    response:
      "Paul calls the law 'holy, just, and good' (Romans 7:12). He observed Torah himself (Acts 21:24). He opposed its misuse for justification, not its use for holiness.",
    ref: "Romans 7:12; Acts 21:20–24",
  },
  {
    num: "07",
    obj: "Grace means commandments no longer apply.",
    response:
      "Grace frees us from sin's penalty — not from holiness. 'Shall we sin because we are not under law? By no means!' (Romans 6:15). Grace enables obedience.",
    ref: "Romans 6:15; Titus 2:11–12",
  },
  {
    num: "08",
    obj: "Love replaces the law.",
    response:
      "Yeshua said love for God means keeping His commandments (John 14:15). Love is the motive that fulfils the law, not the replacement for it.",
    ref: "John 14:15; Romans 13:10",
  },
  {
    num: "09",
    obj: "The old covenant is gone, so the law is gone.",
    response:
      "The new covenant writes Torah on the heart (Jeremiah 31:33). It deepens obedience — it does not remove it. What changes is the location: from stone to heart.",
    ref: "Jeremiah 31:31–33; Hebrews 8:10",
  },
  {
    num: "10",
    obj: "Food laws are no longer relevant.",
    response:
      "Acts 10 is about people, not food. Peter himself explains the vision in the same passage: 'God has shown me that I should not call any person common' (Acts 10:28).",
    ref: "Acts 10:28; Acts 11:18",
  },
  {
    num: "11",
    obj: "Trying to obey Torah is legalism.",
    response:
      "Legalism is earning salvation by works. Obedience from love is discipleship. Yeshua said 'If you love me, keep my commandments' — that is not legalism.",
    ref: "John 14:15; Galatians 2:16",
  },
  {
    num: "12",
    obj: "Christians only need the New Testament.",
    response:
      "The New Testament itself says all Scripture is profitable (2 Timothy 3:16). Yeshua and the apostles had only the 'Old Testament' — and it was sufficient for faith.",
    ref: "2 Timothy 3:16–17; Luke 24:27",
  },
];

export default function ObjectionsPage() {
  return (
    <div className="max-w-[900px] mx-auto py-[52px] px-12">
      {/* Header */}
      <div className="flex justify-between items-end flex-wrap gap-4 mb-10">
        <div>
          <MonoLabel color="var(--crimson)" className="mb-3">
            Quick Reference
          </MonoLabel>
          <h1
            className="font-heading font-light mb-3"
            style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
          >
            12 Objections & Responses
          </h1>
          <p className="font-body text-[16px] text-ink-soft max-w-[560px]">
            Common objections to Torah observance and concise biblical responses.
          </p>
        </div>
        <div className="no-print">
          <PrintButton />
        </div>
      </div>

      {/* Objections List */}
      <div className="border-t border-ink">
        {OBJECTIONS.map((item) => (
          <div key={item.num} className="grid grid-cols-[40px_1fr] gap-4 py-5 border-b border-parchment-shadow">
            {/* Number */}
            <div className="font-heading font-black text-[28px] text-ochre opacity-40 leading-none pt-1">
              {item.num}
            </div>

            {/* Content */}
            <div>
              <p className="font-body italic text-[19px] text-crimson leading-[1.4] mb-[10px]">
                "{item.obj}"
              </p>
              <p className="font-body text-[18px] leading-[1.65] text-ink-soft mb-2">
                {item.response}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-[2px] h-[14px] bg-ochre" />
                <span className="font-mono text-[9.5px] text-ochre-deep tracking-wide">
                  {item.ref}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
