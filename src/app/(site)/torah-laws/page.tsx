"use client";

import { useState, useMemo, useEffect } from "react";
import {
  buildHierarchyTree,
  countLawsInNode,
  LEVEL2_CONFIG,
  ROOT_LABELS,
  filterLaws,
  type Law,
  type HierarchyNode,
} from "@/lib/laws";
import { fetchLaws } from "@/lib/supabase";
import LawSidePanel from "@/components/law-side-panel";

function LawRow({
  law,
  isSelected,
  onSelect,
}: {
  law: Law;
  isSelected: boolean;
  onSelect: (law: Law) => void;
}) {
  const typeColor =
    law.command_type === "obligation"
      ? "text-olive"
      : law.command_type === "prohibition"
        ? "text-crimson"
        : "text-ochre";

  const borderColor =
    law.command_type === "obligation"
      ? "border-l-olive"
      : law.command_type === "prohibition"
        ? "border-l-crimson"
        : law.command_type === "conditional"
          ? "border-l-ochre"
          : "border-l-ink-light";

  return (
    <div
      className={`border-b border-ink/20 last:border-b-0 border-l-2 ${borderColor} ${
        isSelected ? "bg-ochre/10 border-l-ochre" : ""
      }`}
    >
      <button
        onClick={() => onSelect(law)}
        className="w-full px-6 py-4 flex items-start gap-4 text-left hover:bg-parchment-deep/50 transition-colors cursor-pointer max-md:px-3 max-md:py-3 max-md:gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.15em] text-muted w-24 shrink-0 pt-0.5 max-md:w-auto max-md:text-[9px]">
          {law.reference}
        </span>
        <span className="flex-1 font-body text-[16px] text-ink leading-snug max-md:text-[14px]">
          {law.law_summary}
        </span>
        <span
          className={`font-mono text-[9px] tracking-[0.15em] uppercase w-20 text-right shrink-0 pt-0.5 max-md:hidden ${typeColor}`}
        >
          {law.command_type}
        </span>
      </button>
    </div>
  );
}

function AnimatedChildren({
  expanded,
  children,
}: {
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-300 ease-out"
      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function TreeLevel({
  name,
  node,
  depth,
  selectedLaw,
  onSelectLaw,
}: {
  name: string;
  node: HierarchyNode;
  depth: number;
  selectedLaw: Law | null;
  onSelectLaw: (law: Law) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const count = countLawsInNode(node);
  const childKeys = Object.keys(node._children).sort((a, b) => {
    const oa = LEVEL2_CONFIG[a]?.order ?? 99;
    const ob = LEVEL2_CONFIG[b]?.order ?? 99;
    return oa - ob;
  });
  const hasDirectLaws = node._laws.length > 0;

  const config = depth === 1 ? LEVEL2_CONFIG[name] : undefined;
  const rootConfig = depth === 0 ? ROOT_LABELS[name] : undefined;

  if (depth === 0) {
    return (
      <div className="mb-10">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left py-8 px-8 bg-ink text-parchment flex items-center justify-between cursor-pointer transition-colors hover:bg-ink-soft max-md:py-5 max-md:px-5"
        >
          <div className="flex items-baseline gap-5 max-md:gap-3">
            <span className="font-heading font-black text-[48px] leading-none text-ochre max-md:text-[32px]">
              {name === "LOVE_GOD" ? "I" : "II"}
            </span>
            <div>
              <div className="font-heading font-light text-[32px] leading-tight text-parchment max-md:text-[22px]">
                {rootConfig?.label ?? name}
              </div>
              <div className="font-heading text-xl text-ochre/80 mt-1 max-md:text-base" dir="rtl">
                {rootConfig?.hebrew ?? ""}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-parchment/60">
              {count} laws
            </span>
            <span className="text-parchment/60 text-xl">
              {expanded ? "−" : "+"}
            </span>
          </div>
        </button>

        <AnimatedChildren expanded={expanded}>
          <div className="border-l border-r border-ink">
            {childKeys.map((childName) => (
              <TreeLevel
                key={childName}
                name={childName}
                node={node._children[childName]}
                depth={depth + 1}
                selectedLaw={selectedLaw}
                onSelectLaw={onSelectLaw}
              />
            ))}
            {hasDirectLaws &&
              node._laws.map((law) => (
                <LawRow
                  key={law.id}
                  law={law}
                  isSelected={selectedLaw?.id === law.id}
                  onSelect={onSelectLaw}
                />
              ))}
          </div>
        </AnimatedChildren>
      </div>
    );
  }

  if (depth === 1) {
    const shortNum = config?.short ?? "—";
    const label = config?.label ?? name.replace(/_/g, " ");

    return (
      <div className="border-b border-ink">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left py-6 px-8 flex items-center gap-5 hover:bg-parchment-deep/50 transition-colors border-l-[3px] border-ochre max-md:py-4 max-md:px-4 max-md:gap-3"
        >
          <span className="font-heading font-black text-[32px] text-ochre w-10 shrink-0 max-md:text-[24px] max-md:w-8">
            {shortNum}
          </span>
          <span className="flex-1 font-heading font-medium text-lg text-ink max-md:text-base">
            {label}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">
            {count} laws
          </span>
          <span className="text-muted text-lg w-5 text-center">
            {expanded ? "−" : "+"}
          </span>
        </button>

        <AnimatedChildren expanded={expanded}>
          <div className="pl-[3.25rem] bg-parchment-deep/40 max-md:pl-6">
            {childKeys.map((childName) => (
              <TreeLevel
                key={childName}
                name={childName}
                node={node._children[childName]}
                depth={depth + 1}
                selectedLaw={selectedLaw}
                onSelectLaw={onSelectLaw}
              />
            ))}
            {hasDirectLaws &&
              node._laws.map((law) => (
                <LawRow
                  key={law.id}
                  law={law}
                  isSelected={selectedLaw?.id === law.id}
                  onSelect={onSelectLaw}
                />
              ))}
          </div>
        </AnimatedChildren>
      </div>
    );
  }

  // Depth 2+ (subcategories)
  return (
    <div className="border-b border-ink/20 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left py-3.5 px-5 flex items-center gap-4 hover:bg-parchment-deep/30 transition-colors border-l-2 border-parchment-shadow"
      >
        <span className="flex-1 font-body text-[16px] text-ink">
          {name}
        </span>
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted">
          {count}
        </span>
        <span className="text-muted text-sm w-4 text-center">
          {expanded ? "−" : "+"}
        </span>
      </button>

      <AnimatedChildren expanded={expanded}>
        <div className="pl-5 border-l border-parchment-shadow ml-3">
          {childKeys.map((childName) => (
            <TreeLevel
              key={childName}
              name={childName}
              node={node._children[childName]}
              depth={depth + 1}
              selectedLaw={selectedLaw}
              onSelectLaw={onSelectLaw}
            />
          ))}
          {hasDirectLaws &&
            node._laws.map((law) => (
              <LawRow
                key={law.id}
                law={law}
                isSelected={selectedLaw?.id === law.id}
                onSelect={onSelectLaw}
              />
            ))}
        </div>
      </AnimatedChildren>
    </div>
  );
}

export default function TorahLawsPage() {
  const [laws, setLaws] = useState<Law[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLaw, setSelectedLaw] = useState<Law | null>(null);

  useEffect(() => {
    fetchLaws()
      .then((data) => {
        setLaws(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (!search) return laws;
    return filterLaws(laws, { search });
  }, [laws, search]);

  const tree = useMemo(() => buildHierarchyTree(filtered), [filtered]);

  // Ensure consistent root order: LOVE_GOD first, then LOVE_NEIGHBOR
  const rootKeys = ["LOVE_GOD", "LOVE_NEIGHBOR"].filter(
    (k) => tree[k] !== undefined,
  );

  return (
    <div className="px-10 py-[70px] max-md:px-6 max-md:py-10">
      {/* Header */}
      <div className="text-center mb-[50px]">
        <h1 className="section-title rise delay-2">
          {laws.length > 0 ? `${laws.length}` : "..."} laws from the five
          books, organized by <em>the two greatest commandments.</em>
        </h1>
      </div>

      {/* Search */}
      <div className="max-w-2xl mb-10">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by verse, keyword, or law summary..."
            className="search-editorial"
          />
          {search && !loading && (
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mt-2">
              {filtered.length} of {laws.length} laws match &ldquo;{search}
              &rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Tree */}
      {loading && (
        <p className="text-center text-muted py-16 font-body italic text-lg">
          Loading laws...
        </p>
      )}

      {!loading && filtered.length === 0 && search && (
        <p className="text-center text-muted py-16 font-body italic text-lg">
          No laws match your search.
        </p>
      )}

      {!loading && (
        <div>
          {rootKeys.map((rootKey) => (
            <TreeLevel
              key={rootKey}
              name={rootKey}
              node={tree[rootKey]}
              depth={0}
              selectedLaw={selectedLaw}
              onSelectLaw={setSelectedLaw}
            />
          ))}
        </div>
      )}

      {/* Side Panel */}
      <LawSidePanel
        selectedLaw={selectedLaw}
        onClose={() => setSelectedLaw(null)}
      />
    </div>
  );
}
