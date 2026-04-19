"use client";

import { useState, useMemo } from "react";
import { SearchInput } from "@/components/search-input";
import { TagBadge } from "@/components/tag-badge";
import { ArticleCard } from "@/components/article-card";
import type { ContentMeta } from "@/lib/content";

// Categories for user-friendly tabs
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "topics", label: "Topics" },
  { key: "people", label: "People" },
  { key: "arguments", label: "Common Arguments" },
  { key: "history", label: "History" },
];

interface ArticlesPageClientProps {
  articles: { meta: ContentMeta; type: "article" | "objection" | "deep-dive" }[];
  allTags: string[];
}

export function ArticlesPageClient({ articles, allTags }: ArticlesPageClientProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return articles.filter((item) => {
      const matchesSearch =
        !search ||
        item.meta.title.toLowerCase().includes(search.toLowerCase()) ||
        item.meta.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        item.meta.tags.some((t) =>
          t.toLowerCase().includes(search.toLowerCase()),
        );

      const matchesCategory =
        activeCategory === "all" || item.meta.category === activeCategory;

      const matchesTags =
        activeTags.size === 0 ||
        item.meta.tags.some((t) => activeTags.has(t));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [articles, search, activeCategory, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Article Library</h1>
        <p className="text-[var(--text-secondary)]">
          Biblical defense of Torah observance — search by verse, topic, or objection
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder='Search by verse, topic, or objection — e.g. "Col 2:16"'
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 border-b border-[var(--border)] mb-4 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
              activeCategory === cat.key
                ? "border-b-2 border-[var(--accent)] text-[var(--text-primary)] font-medium"
                : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tag Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {allTags.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            active={activeTags.has(tag)}
            onClick={() => toggleTag(tag)}
          />
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-center text-[var(--text-muted)] py-12">
            No articles match your search.
          </p>
        )}
        {filtered.map((item) => (
          <ArticleCard key={item.meta.slug} meta={item.meta} type={item.type} />
        ))}
      </div>
    </div>
  );
}
