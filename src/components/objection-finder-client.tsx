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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">
          Objection Finder
        </h1>
        <p className="text-[var(--text-secondary)]">
          Someone challenged you. Get the answer in 30 seconds.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by verse, quote, or objection..."
        />
      </div>

      {/* Quick Tags */}
      <div className="flex gap-2 flex-wrap justify-center mb-8">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearch(tag)}
            className="px-4 py-2 rounded-full text-xs bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            &ldquo;{tag}&rdquo;
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && search && (
          <p className="text-center text-[var(--text-muted)] py-12">
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
