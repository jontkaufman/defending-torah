"use client";

import { MonoLabel } from "@/components/course/mono-label";
import { useState } from "react";

const OPTIONS = [
  {
    key: "written",
    label: "Written Defence",
    icon: "✍",
    desc: "A short written defence of Torah observance for a complete beginner. Approximately 500–800 words, covering why you believe Torah still applies and responding to at least two common objections.",
  },
  {
    key: "recorded",
    label: "Recorded Response",
    icon: "◉",
    desc: "A 3–5 minute recorded explanation (video or audio) of what you've learned and how you would introduce someone to the idea that God's commandments are still in effect today.",
  },
  {
    key: "statement",
    label: "Belief Statement",
    icon: "◈",
    desc: "A one-page 'what I believe and why' statement that you could give to a friend, pastor, or family member. Should be clear, respectful, and grounded in Scripture.",
  },
];

export default function CapstonePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submittedContent, setSubmittedContent] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-[900px] mx-auto py-[52px] px-12">
        <div className="text-center max-w-[600px] mx-auto">
          <div className="text-[72px] text-olive opacity-30 mb-6">✓</div>
          <MonoLabel color="var(--olive)" className="mb-4">
            Submission Received
          </MonoLabel>
          <h1
            className="font-heading font-light mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 38px)" }}
          >
            Well done.
          </h1>
          <p className="font-body text-[17px] text-ink-soft leading-[1.65] mb-8">
            Your capstone submission has been recorded. You've completed all ten sessions
            and demonstrated a foundational understanding of how to defend biblical Torah
            observance. Your certificate is now available for download.
          </p>

          {/* Ornamental rule */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-parchment-shadow" />
            <span className="font-heading font-light text-[16px] text-ochre">✦</span>
            <div className="flex-1 h-[1px] bg-parchment-shadow" />
          </div>

          <div className="border-l-2 border-ochre pl-4 text-left bg-parchment-deep p-6">
            <p className="font-body italic text-[17px] text-ink-soft leading-[1.65] mb-2">
              "Do your best to present yourself to God as one approved, a worker who has
              no need to be ashamed, rightly handling the word of truth."
            </p>
            <p className="font-mono text-[11px] text-crimson tracking-wide">
              2 Timothy 2:15
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-[52px] px-12">
      {/* Header */}
      <div className="mb-10">
        <MonoLabel color="var(--crimson)" className="mb-3">
          Final Step
        </MonoLabel>
        <h1
          className="font-heading font-light mb-4"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Capstone Submission
        </h1>
        <p className="font-body text-[17px] text-ink-soft max-w-[640px] leading-[1.65]">
          To complete the course, demonstrate what you've learned by choosing one of the
          options below. This is your opportunity to synthesise the material and
          articulate a biblical defence of Torah observance.
        </p>
      </div>

      {/* Progress Reminder */}
      <div className="border border-parchment-shadow p-4 bg-parchment-deep flex items-center gap-4 mb-10">
        <div className="w-[3px] h-10 bg-olive shrink-0" />
        <div className="flex-1">
          <MonoLabel color="var(--olive)" className="mb-1">
            All 10 Sessions Complete
          </MonoLabel>
          <p className="font-body text-[15px] text-ink-soft">
            You've completed all ten sessions. Choose your capstone format below to unlock
            your certificate.
          </p>
        </div>
        <div className="font-heading text-[36px] text-olive shrink-0">100%</div>
      </div>

      {/* Option Cards */}
      <div className="space-y-4 mb-8">
        {OPTIONS.map((option) => {
          const isSelected = selectedOption === option.key;
          return (
            <div key={option.key}>
              <button
                onClick={() => setSelectedOption(option.key)}
                className={`w-full text-left border-[1.5px] p-6 transition-all ${
                  isSelected
                    ? "border-ochre bg-[rgba(184,115,42,0.06)]"
                    : "border-parchment-shadow bg-parchment-deep"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div
                    className={`w-10 h-10 shrink-0 flex items-center justify-center border-[1.5px] ${
                      isSelected
                        ? "border-ochre bg-ochre text-white"
                        : "border-[#ccc] bg-transparent text-[#ccc]"
                    }`}
                  >
                    <span className="text-[20px]">{option.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-heading font-medium text-[22px] text-ink mb-2">
                      {option.label}
                    </h3>
                    <p className="font-body text-[16px] text-ink-soft leading-[1.6]">
                      {option.desc}
                    </p>
                  </div>

                  {/* Radio Circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-[1.5px] shrink-0 flex items-center justify-center ${
                      isSelected ? "border-ochre bg-ochre" : "border-parchment-shadow"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>

              {/* Conditional Input Area */}
              {isSelected && (
                <div className="mt-4 pl-[56px]">
                  {option.key === "recorded" ? (
                    <div className="border-2 border-dashed border-parchment-shadow p-8 text-center bg-parchment-deep">
                      <div className="text-[32px] text-ochre opacity-40 mb-3">↑</div>
                      <p className="font-body text-[16px] text-ink mb-1">
                        Click to upload or drag & drop
                      </p>
                      <p className="font-mono text-[11px] text-muted tracking-wide">
                        MP4, MOV, MP3 or M4A · Max 200MB
                      </p>
                    </div>
                  ) : (
                    <textarea
                      className="w-full min-h-[200px] border border-parchment-shadow p-4 font-body text-[18px] bg-white resize-y"
                      placeholder="Write your response here…"
                      style={{ fontStyle: "italic" }}
                      value={submittedContent}
                      onChange={(e) => setSubmittedContent(e.target.value)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`px-8 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-all ${
            selectedOption
              ? "bg-ochre text-white cursor-pointer hover:bg-ochre-deep"
              : "bg-parchment-shadow text-muted cursor-not-allowed"
          }`}
        >
          {selectedOption ? "Submit & Unlock Certificate →" : "Select an option above first"}
        </button>
      </div>
    </div>
  );
}
