"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const PLATFORMS = [
  "YouTube",
  "Instagram",
  "Facebook",
  "X (Twitter)",
  "Podcast (Spotify / Apple)",
  "Telegram",
];

const MEDIA_TYPES = [
  "Long-form teachings",
  "Short-form videos",
  "Shorts / Reels",
  "Live streams & Q&A",
  "Podcast episodes",
  "Written studies",
];

const SUBJECTS = [
  "The Feasts",
  "Sabbath",
  "Dietary laws",
  "Paul's letters",
  "Answering objections",
  "Hebrew & Greek word studies",
  "Torah 101 for beginners",
  "Church history",
];

interface QuestionProps {
  legend: string;
  hint: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  other: string;
  onOther: (value: string) => void;
  otherPlaceholder: string;
}

function CheckboxQuestion({
  legend,
  hint,
  options,
  selected,
  onToggle,
  other,
  onOther,
  otherPlaceholder,
}: QuestionProps) {
  return (
    <fieldset className="mb-10">
      <legend className="font-heading font-medium text-[22px] text-ink mb-1">
        {legend}
      </legend>
      <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted mb-4">
        {hint}
      </p>
      <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer select-none transition-all font-body text-[15px] ${
                checked
                  ? "border-ink bg-ink text-parchment shadow-[3px_3px_0_0_var(--ochre)]"
                  : "border-ink/40 text-ink hover:border-ink hover:bg-ochre-faint"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`w-4 h-4 border shrink-0 flex items-center justify-center ${
                  checked ? "border-parchment bg-parchment" : "border-ink/50"
                }`}
              >
                {checked && <Check size={12} className="text-ink" />}
              </span>
              {option}
            </label>
          );
        })}
      </div>
      <input
        type="text"
        value={other}
        onChange={(e) => onOther(e.target.value)}
        placeholder={otherPlaceholder}
        maxLength={80}
        className="mt-3 w-full bg-transparent border border-ink/40 focus:border-ink px-4 py-3 font-body text-[15px] text-ink placeholder:text-muted outline-none transition-colors"
        aria-label={`${legend} — other`}
      />
    </fieldset>
  );
}

export function ContentRequestForm() {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [platformOther, setPlatformOther] = useState("");
  const [mediaTypes, setMediaTypes] = useState<string[]>([]);
  const [mediaTypeOther, setMediaTypeOther] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectOther, setSubjectOther] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) =>
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const hasContent =
      platforms.length ||
      platformOther.trim() ||
      mediaTypes.length ||
      mediaTypeOther.trim() ||
      subjects.length ||
      subjectOther.trim() ||
      message.trim();
    if (!hasContent) {
      setError("Pick at least one option — or leave us a note.");
      return;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("That email address doesn't look right.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/content-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platforms,
          platformOther: platformOther.trim(),
          mediaTypes,
          mediaTypeOther: mediaTypeOther.trim(),
          subjects,
          subjectOther: subjectOther.trim(),
          message: message.trim(),
          email: trimmedEmail,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-ink bg-parchment-deep p-10 text-center shadow-[6px_6px_0_0_var(--ink)]">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson mb-4">
          Request Received
        </div>
        <p className="font-heading font-light text-[28px] leading-[1.2] text-ink mb-3">
          Thank you — your voice shapes what we make next.
        </p>
        <p className="text-[15px] text-ink-soft leading-[1.55]">
          We read every request. Watch the feed — you may see your idea sooner
          than you think.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <CheckboxQuestion
        legend="Where should we go next?"
        hint="We're on TikTok today — pick the platforms you'd use · select all that apply"
        options={PLATFORMS}
        selected={platforms}
        onToggle={toggle(setPlatforms)}
        other={platformOther}
        onOther={setPlatformOther}
        otherPlaceholder="Another platform? Tell us…"
      />

      <CheckboxQuestion
        legend="What kind of content do you want?"
        hint="Select all that apply"
        options={MEDIA_TYPES}
        selected={mediaTypes}
        onToggle={toggle(setMediaTypes)}
        other={mediaTypeOther}
        onOther={setMediaTypeOther}
        otherPlaceholder="Another format? Tell us…"
      />

      <CheckboxQuestion
        legend="What subjects should we cover?"
        hint="Select all that apply"
        options={SUBJECTS}
        selected={subjects}
        onToggle={toggle(setSubjects)}
        other={subjectOther}
        onOther={setSubjectOther}
        otherPlaceholder="Another subject? Tell us…"
      />

      <div className="mb-8">
        <label
          htmlFor="request-message"
          className="block font-heading font-medium text-[22px] text-ink mb-1"
        >
          Anything else?
        </label>
        <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted mb-4">
          Optional — questions, verse requests, video ideas
        </p>
        <textarea
          id="request-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="e.g. Can you cover Acts 15 and the four requirements?"
          className="w-full bg-transparent border border-ink/40 focus:border-ink px-4 py-3 font-body text-[15px] text-ink placeholder:text-muted outline-none transition-colors resize-y"
        />
      </div>

      <div className="mb-8">
        <label
          htmlFor="request-email"
          className="block font-heading font-medium text-[22px] text-ink mb-1"
        >
          Your email
        </label>
        <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted mb-4">
          Optional — only if you'd like a reply
        </p>
        <input
          id="request-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent border border-ink/40 focus:border-ink px-4 py-3 font-body text-[16px] text-ink placeholder:text-muted outline-none transition-colors"
        />
      </div>

      {error && (
        <p role="alert" className="mb-5 font-mono text-[11px] text-crimson tracking-wide">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary !px-8 !py-4">
        {loading ? "Sending…" : "Send My Request"}
        <span className="arrow">→</span>
      </button>

      <p className="mt-5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
        No account needed. No spam. Just tell us what you want to see.
      </p>
    </form>
  );
}
