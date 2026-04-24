"use client";

import { useState, useMemo } from "react";
import { SearchInput } from "@/components/search-input";
import { ObjectionCard } from "@/components/objection-card";
import type { ContentMeta } from "@/lib/content";

const QUICK_TAGS = [
  "not under law",
  "nailed to the cross",
  "end of the law",
  "only for Jews",
  "all foods clean",
  "Peter's vision",
  "weak and beggarly",
  "that's Judaizing",
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
    <div className="px-32 py-[70px] max-lg:px-16 max-md:px-6 max-md:py-10">
      {/* Header */}
      <div className="text-center mb-[50px]">
        <h1 className="section-title rise delay-2">
          Someone challenged you. Get the <em>answer</em> in 30 seconds.
        </h1>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by verse, quote, or objection..."
        />
      </div>

      {/* Quick Tags */}
      <div className="flex gap-2 flex-wrap justify-center mb-10">
        {QUICK_TAGS.map((tag, i) => (
          <span key={tag} className="flex items-center gap-2">
            <button
              onClick={() => setSearch(tag)}
              className="font-body italic text-lg text-ink-light hover:text-ochre-deep transition-colors max-md:text-base"
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
