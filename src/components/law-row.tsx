"use client";

import { useState } from "react";
import type { Law } from "@/lib/laws";

const commandTypeColors: Record<string, string> = {
  obligation: "text-emerald-400",
  prohibition: "text-red-400",
  conditional: "text-amber-400",
  procedural: "text-blue-400",
};

export function LawRow({ law }: { law: Law }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-start gap-4 text-left hover:bg-[var(--bg-card)] transition-colors"
      >
        <span className="text-sm text-[var(--text-muted)] w-28 shrink-0 font-mono">
          {law.reference}
        </span>
        <span className="flex-1 text-sm text-[var(--text-primary)]">
          {law.law_summary}
        </span>
        <span
          className={`text-xs uppercase font-medium w-20 text-right shrink-0 ${commandTypeColors[law.command_type] ?? ""}`}
        >
          {law.command_type}
        </span>
        <span className="text-[var(--text-muted)] text-sm shrink-0">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pl-36 space-y-3 text-sm">
          <div>
            <div className="text-[var(--text-muted)] text-xs uppercase mb-1">
              Verse Text
            </div>
            <p className="text-[var(--text-secondary)] italic">
              {law.verse_text}
            </p>
          </div>

          {law.classification_reasoning && (
            <div>
              <div className="text-[var(--text-muted)] text-xs uppercase mb-1">
                Classification
              </div>
              <p className="text-[var(--text-secondary)]">
                {law.classification_reasoning}
              </p>
            </div>
          )}

          {law.cross_references.length > 0 && (
            <div>
              <div className="text-[var(--text-muted)] text-xs uppercase mb-1">
                Cross References
              </div>
              <p className="text-[var(--text-secondary)]">
                {law.cross_references.join(", ")}
              </p>
            </div>
          )}

          {law.interpretive_questions && (
            <div>
              <div className="text-[var(--text-muted)] text-xs uppercase mb-1">
                Questions for Study
              </div>
              <p className="text-[var(--text-secondary)]">
                {law.interpretive_questions}
              </p>
            </div>
          )}

          {law.notes && (
            <div>
              <div className="text-[var(--text-muted)] text-xs uppercase mb-1">
                Notes
              </div>
              <p className="text-[var(--text-secondary)]">{law.notes}</p>
            </div>
          )}

          <div className="flex gap-4 text-xs text-[var(--text-muted)]">
            <span>Party: {law.regulated_party}</span>
            <span>Applicability: {law.current_applicability.replace(/_/g, " ")}</span>
            {law.has_forever_language === 1 && (
              <span className="text-emerald-400">Has perpetual language</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
