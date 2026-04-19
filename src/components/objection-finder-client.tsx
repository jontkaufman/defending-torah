"use client";

import { useState, useMemo } from "react";
import { SearchInput } from "@/components/search-input";
import { ObjectionCard } from "@/components/objection-card";
import type { ContentMeta } from "@/lib/content";

const QUICK_TAGS = [
  "not under law",
  "nailed to the cross",
  "Jesus is our rest",
  "only for Jews",
  "all foods clean",
  "Peter's vision",
  "weak and beggarly",
  "working for salvation",
];

interface ObjectionFinderClientProps {
  objections: ContentMeta[];
}

export function ObjectionFinderClient({ objections }: ObjectionFinderClientProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return objections;
    const q = search.toLowerCase();
    return objections.filter(
      (o) =>
        o.title.toLowerCase().includes(q) ||
        o.excerpt.toLowerCase().includes(q) ||
        o.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [objections, search]);

  return (
    <div className="px-10 py-[70px] max-w-4xl mx-auto max-md:px-6 max-md:py-10">
      {/* Header */}
      <div className="mb-[50px]">
        <div className="section-label rise delay-1 mb-5">
          <span className="num">II.</span>Hard Questions
        </div>
        <h2 className="section-title rise delay-2">
          Someone challenged you.<br />
          Get the <em>answer</em> in 30 seconds.
        </h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by verse, quote, or objection..."
        />
      </div>

      {/* Quick Tags */}
      <div className="flex gap-2 flex-wrap mb-10">
        {QUICK_TAGS.map((tag, i) => (
          <span key={tag} className="flex items-center gap-2">
            <button
              onClick={() => setSearch(tag)}
              className="font-body italic text-lg text-ink-light hover:text-ochre-deep transition-colors"
            >
              «{tag}»
            </button>
            {i < QUICK_TAGS.length - 1 && (
              <span className="text-ink-light">·</span>
            )}
          </span>
        ))}
      </div>

      {/* Results */}
      <div className="border-t border-ink">
        {filtered.length === 0 && search && (
          <p className="text-center text-muted py-16 font-body italic text-lg">
            No objections match &ldquo;{search}&rdquo; yet.
          </p>
        )}
        {filtered.map((o) => (
          <ObjectionCard key={o.slug} meta={o} />
        ))}
      </div>
    </div>
  );
}
