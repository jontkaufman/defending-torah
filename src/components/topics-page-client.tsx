"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchInput } from "@/components/search-input";
import type { ContentMeta } from "@/lib/content";
import type { PostMeta } from "@/lib/posts";

const TOPICS = [
  {
    key: "sabbath",
    label: "Sabbath",
    description: "Creation ordinance, weekly rest, and the ongoing command",
  },
  {
    key: "moedim",
    label: "Moedim (Set-Apart Times)",
    description: "Biblical feasts, appointed times, and God's prophetic calendar",
  },
  {
    key: "dietary-laws",
    label: "Dietary Laws",
    description: "Clean and unclean — what Scripture actually teaches about food",
  },
  {
    key: "grace-and-law",
    label: "Grace & Law",
    description: "Faith, works, righteousness, and what Paul really said",
  },
  {
    key: "covenant",
    label: "Covenant",
    description: "Old and new covenants, priesthood, and continuity",
  },
  {
    key: "torah-foundation",
    label: "Torah Foundation",
    description: "Why God's instructions remain in force",
  },
  {
    key: "gentiles-and-torah",
    label: "Gentiles & Torah",
    description:
      "The Jerusalem Council, the Judaizing accusation, and one law for all",
  },
];

type ContentType = "article" | "objection";

interface TopicsPageClientProps {
  articles: { meta: ContentMeta; type: ContentType }[];
  posts: { meta: PostMeta; type: "post" }[];
}

function getHref(item: { type: ContentType | "post"; meta: { slug: string } }) {
  switch (item.type) {
    case "objection":
      return `/objection-finder/${item.meta.slug}`;
    case "post":
      return `/blog/${item.meta.slug}`;
    default:
      return `/articles/${item.meta.slug}`;
  }
}

function getTypeLabel(type: ContentType | "post") {
  return type === "objection" ? "Objection" : "Essay";
}

function getTypeColor(type: ContentType | "post") {
  return type === "objection" ? "text-crimson" : "text-ochre";
}

export function TopicsPageClient({ articles, posts }: TopicsPageClientProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  // Sync URL param changes (e.g. clicking a tag badge from another page)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  // Combine all content into one list
  const allItems = useMemo(() => {
    const contentItems = articles.map((a) => ({
      ...a,
      topic: a.meta.topic,
    }));
    const postItems = posts.map((p) => ({
      meta: {
        slug: p.meta.slug,
        title: p.meta.title,
        excerpt: p.meta.excerpt,
        category: "",
        topic: p.meta.topic,
        tags: p.meta.tags,
        difficulty: "entry" as const,
        date: p.meta.date,
        relatedSlugs: [],
      },
      type: "post" as const,
      topic: p.meta.topic,
    }));
    return [...contentItems, ...postItems];
  }, [articles, posts]);

  // Filter by search
  const filtered = useMemo(() => {
    if (!search) return allItems;
    const q = search.toLowerCase();
    return allItems.filter(
      (item) =>
        item.meta.title.toLowerCase().includes(q) ||
        item.meta.excerpt.toLowerCase().includes(q) ||
        item.meta.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [allItems, search]);

  // Group by topic
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const topic of TOPICS) {
      map.set(
        topic.key,
        filtered.filter((item) => item.topic === topic.key),
      );
    }
    // Uncategorized
    const categorized = new Set(TOPICS.map((t) => t.key));
    const uncategorized = filtered.filter(
      (item) => !item.topic || !categorized.has(item.topic),
    );
    if (uncategorized.length > 0) {
      map.set("other", uncategorized);
    }
    return map;
  }, [filtered]);

  const toggle = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  // When searching, show flat results instead of topics
  const isSearching = search.length > 0;

  return (
    <div className="px-32 py-[70px] max-lg:px-16 max-md:px-6 max-md:py-10">
      {/* Header */}
      <div className="text-center mb-[50px]">
        <h1 className="section-title rise delay-2">
          Every essay and <em>objection</em> — by topic.
        </h1>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder='Search by verse, topic, or keyword — e.g. "Sabbath"'
        />
      </div>

      {isSearching ? (
        /* Flat search results */
        <div className="border-t border-ink">
          {filtered.length === 0 && (
            <p className="text-center text-muted py-16 font-body italic text-lg">
              No articles match your search.
            </p>
          )}
          {filtered.map((item) => (
            <TopicItem key={`${item.type}-${item.meta.slug}`} item={item} />
          ))}
        </div>
      ) : (
        /* Topic accordion */
        <div className="border-t border-ink">
          {TOPICS.map((topic) => {
            const items = grouped.get(topic.key) ?? [];
            const isOpen = openTopic === topic.key;
            return (
              <div key={topic.key} className="border-b border-ink">
                <button
                  onClick={() => toggle(topic.key)}
                  className="w-full text-left px-0 py-6 flex items-center justify-between gap-6 bg-transparent border-none cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4 max-md:gap-2">
                      <h2 className="font-heading font-medium text-2xl text-ink group-hover:text-ochre-deep transition-colors max-md:text-xl">
                        {topic.label}
                      </h2>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
                        {items.length}{" "}
                        {items.length === 1 ? "article" : "articles"}
                      </span>
                    </div>
                    <p className="text-[15px] text-ink-soft mt-1">
                      {topic.description}
                    </p>
                  </div>
                  <span
                    className={`text-ink-soft text-xl transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && items.length > 0 && (
                  <div className="pb-6 pl-4 border-l-2 border-ochre/30 ml-2">
                    {items.map((item) => (
                      <TopicItem
                        key={`${item.type}-${item.meta.slug}`}
                        item={item}
                      />
                    ))}
                  </div>
                )}
                {isOpen && items.length === 0 && (
                  <p className="pb-6 pl-4 text-muted font-body italic">
                    No articles in this topic yet.
                  </p>
                )}
              </div>
            );
          })}
          {/* Uncategorized */}
          {(grouped.get("other")?.length ?? 0) > 0 && (
            <div className="border-b border-ink">
              <button
                onClick={() => toggle("other")}
                className="w-full text-left px-0 py-6 flex items-center justify-between gap-6 bg-transparent border-none cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading font-medium text-2xl text-ink group-hover:text-ochre-deep transition-colors">
                    Other
                  </h2>
                </div>
                <span
                  className={`text-ink-soft text-xl transition-transform duration-200 shrink-0 ${
                    openTopic === "other" ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openTopic === "other" && (
                <div className="pb-6 pl-4 border-l-2 border-ochre/30 ml-2">
                  {(grouped.get("other") ?? []).map((item) => (
                    <TopicItem
                      key={`${item.type}-${item.meta.slug}`}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TopicItem({
  item,
}: {
  item: {
    meta: { slug: string; title: string; excerpt: string };
    type: ContentType | "post";
  };
}) {
  const isBeginnersGuide =
    item.meta.slug === "getting-started-with-torah-observance-beginners-guide";

  if (isBeginnersGuide) {
    return (
      <Link
        href={getHref(item)}
        className="block py-5 pl-4 pr-4 no-underline mb-4 bg-ochre/5 border-l-4 border-ochre rounded group hover:bg-ochre/10 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0 pt-0.5" aria-label="beginner friendly" role="img">🌱</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-ochre-deep font-semibold bg-ochre/20 px-2 py-0.5 rounded">
                Start Here
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ochre">
                {getTypeLabel(item.type)}
              </span>
            </div>
            <h3 className="font-heading font-semibold text-[19px] text-ink mb-1 group-hover:text-ochre-deep transition-colors">
              {item.meta.title}
            </h3>
            <p className="text-[14px] text-ink-soft line-clamp-2 leading-[1.5]">
              {item.meta.excerpt}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={getHref(item)}
      className="block py-4 pl-4 no-underline transition-[padding] duration-200 hover:pl-2 group"
    >
      <div className="flex items-start gap-4 max-md:gap-2">
        <span
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${getTypeColor(item.type)} whitespace-nowrap pt-1 w-16 shrink-0 max-md:w-auto max-md:text-[9px]`}
        >
          {getTypeLabel(item.type)}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-lg text-ink mb-0.5 group-hover:text-ochre-deep transition-colors">
            {item.meta.title}
          </h3>
          <p className="text-[14px] text-ink-soft line-clamp-1">
            {item.meta.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
