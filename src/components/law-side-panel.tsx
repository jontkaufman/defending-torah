"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Sparkles,
  X,
  Clock,
  BookOpen,
  Info,
  MessageSquare,
  Search,
} from "lucide-react";
import { OBSERVANCE_CONFIG, BOOK_NAMES, extractKeywords } from "@/lib/law-helpers";
import type { Law } from "@/lib/laws";

interface FetchedVerse {
  reference: string;
  text: string | null;
  loading: boolean;
  error: string | null;
}

interface KeywordResults {
  keyword: string;
  results: { reference: string; text: string; highlighted: string }[];
  loading: boolean;
  error: string | null;
}

/** Split raw other_torah_refs into individual, fully-qualified references.
 *  Handles: semicolons inside array elements, bare verse numbers (e.g. "17"
 *  meaning same book+chapter as previous ref), and parenthetical notes. */
function normalizeRefs(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  // Flatten to individual strings by splitting on semicolons and commas
  const flat = (Array.isArray(raw) ? raw : [raw]).flatMap((s) =>
    s.split(/[;,]/).map((r) => r.trim()).filter(Boolean),
  );

  const result: string[] = [];
  let lastBookChapter = ""; // e.g. "Exodus 21:"

  for (const piece of flat) {
    // Strip parenthetical notes for the link text
    const clean = piece.replace(/\s*\(.*?\)\s*$/, "").trim();
    if (!clean) continue;

    // Check if it starts with a book name (letter) vs bare number
    if (/^[A-Za-z]/.test(clean)) {
      result.push(clean);
      // Extract "Book Chapter:" prefix for resolving subsequent bare numbers
      const m = clean.match(/^(.+\s)(\d+):/);
      if (m) lastBookChapter = `${m[1]}${m[2]}:`;
    } else if (lastBookChapter && /^\d/.test(clean)) {
      // Bare number like "17" or "21:18-21" — prepend last book (+ chapter if needed)
      if (clean.includes(":")) {
        // Has its own chapter:verse — just needs the book name
        const bookName = lastBookChapter.replace(/\s*\d+:\s*$/, " ");
        result.push(`${bookName}${clean}`);
      } else {
        // Just a verse number — use full book+chapter prefix
        result.push(`${lastBookChapter}${clean}`);
      }
    } else {
      result.push(clean);
    }
  }

  return result;
}

export default function LawSidePanel({
  selectedLaw,
  onClose,
}: {
  selectedLaw: Law | null;
  onClose: () => void;
}) {
  const [sideTab, setSideTab] = useState<"study" | "details">("study");
  const [fetchedVerse, setFetchedVerse] = useState<FetchedVerse | null>(null);
  const [verseCache, setVerseCache] = useState<Record<string, string>>({});
  const [keywordResults, setKeywordResults] = useState<KeywordResults | null>(null);

  const fetchVerse = useCallback(
    (ref: string) => {
      const cleanRef = ref.replace(/\s*\(.*?\)\s*/g, "").trim();
      if (!cleanRef) return;

      if (verseCache[cleanRef]) {
        setFetchedVerse({ reference: cleanRef, text: verseCache[cleanRef], loading: false, error: null });
        return;
      }

      setFetchedVerse({ reference: cleanRef, text: null, loading: true, error: null });

      const apiRef = cleanRef.replace(/\s+/g, "+");
      fetch(`https://bible-api.com/${encodeURIComponent(apiRef)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Verse not found");
          return res.json();
        })
        .then((data) => {
          const text = data.text?.trim();
          if (!text) throw new Error("No text returned");
          setVerseCache((prev) => ({ ...prev, [cleanRef]: text }));
          setFetchedVerse({ reference: data.reference || cleanRef, text, loading: false, error: null });
        })
        .catch(() => {
          setFetchedVerse({ reference: cleanRef, text: null, loading: false, error: "Could not load verse" });
        });
    },
    [verseCache],
  );

  const searchKeyword = useCallback((keyword: string) => {
    setKeywordResults({ keyword, results: [], loading: true, error: null });
    fetch(`https://bolls.life/search/WEB/${encodeURIComponent(keyword)}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Search failed");
        return res.json();
      })
      .then((data) => {
        const results = (data || []).slice(0, 20).map((v: { book: number; chapter: number; verse: number; text?: string }) => ({
          reference: `${BOOK_NAMES[v.book] || `Book ${v.book}`} ${v.chapter}:${v.verse}`,
          text: (v.text || "").replace(/<\/?mark>/g, ""),
          highlighted: v.text || "",
        }));
        setKeywordResults({ keyword, results, loading: false, error: null });
      })
      .catch(() => {
        setKeywordResults({ keyword, results: [], loading: false, error: "Search failed" });
      });
  }, []);

  useEffect(() => {
    setFetchedVerse(null);
    setKeywordResults(null);
    setSideTab("study");
  }, [selectedLaw]);

  const otherRefsList = normalizeRefs(selectedLaw?.other_torah_refs);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const panel = (
    <>
      {/* Backdrop */}
      <div
        className={`side-panel-backdrop ${selectedLaw ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`side-panel ${selectedLaw ? "open" : ""}`}>
        {selectedLaw && (
          <>
            {/* Header */}
            <div className="side-panel-header">
              <div className="side-panel-title-area">
                <h2 className="side-panel-title">{selectedLaw.reference}</h2>
                {selectedLaw.observance_class && OBSERVANCE_CONFIG[selectedLaw.observance_class] && (
                  <span
                    className="shrink-0 text-lg"
                    title={OBSERVANCE_CONFIG[selectedLaw.observance_class].label}
                    style={{ color: OBSERVANCE_CONFIG[selectedLaw.observance_class].color }}
                  >
                    {OBSERVANCE_CONFIG[selectedLaw.observance_class].symbol}
                  </span>
                )}
                {selectedLaw.has_forever_language === 1 && (
                  <Sparkles className="w-5 h-5 text-crimson shrink-0" />
                )}
              </div>
              <button onClick={onClose} className="side-panel-close">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="side-panel-tabs">
              <button
                className={`side-panel-tab ${sideTab === "study" ? "active" : ""}`}
                onClick={() => setSideTab("study")}
              >
                <BookOpen className="w-4 h-4" />
                Study
              </button>
              <button
                className={`side-panel-tab ${sideTab === "details" ? "active" : ""}`}
                onClick={() => setSideTab("details")}
              >
                <Info className="w-4 h-4" />
                Details
              </button>
            </div>

            {/* Body */}
            <div className="side-panel-body">
              {/* ── Study Tab ── */}
              {sideTab === "study" && (
                <>
                  <section className="side-panel-section">
                    <h3 className="side-panel-label">Verse Text</h3>
                    <blockquote className="side-panel-verse">
                      {selectedLaw.verse_text}
                    </blockquote>
                  </section>

                  <section className="side-panel-section">
                    <h3 className="side-panel-label">Law Summary</h3>
                    <p className="side-panel-text">
                      {selectedLaw.law_summary || selectedLaw.preview || "No summary available"}
                    </p>
                  </section>

                  {(selectedLaw.has_forever_language === 1 ||
                    selectedLaw.has_generational_language === 1) && (
                    <section className="side-panel-section side-panel-eternal">
                      <h3 className="side-panel-label">
                        <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
                        Eternal Language
                      </h3>
                      {selectedLaw.has_forever_language === 1 && selectedLaw.forever_phrase && (
                        <p className="side-panel-text side-panel-phrase">
                          &ldquo;{selectedLaw.forever_phrase}&rdquo;
                        </p>
                      )}
                      {selectedLaw.has_generational_language === 1 &&
                        selectedLaw.generational_phrase && (
                          <p className="side-panel-text side-panel-phrase">
                            &ldquo;{selectedLaw.generational_phrase}&rdquo;
                          </p>
                        )}
                    </section>
                  )}

                  {otherRefsList.length > 0 && (
                    <section className="side-panel-section">
                      <h3 className="side-panel-label">
                        <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
                        Related Verses
                      </h3>
                      <div className="side-panel-refs">
                        {otherRefsList.map((ref, i) => {
                          const clean = (ref || "").trim();
                          if (!clean) return null;
                          return (
                            <button key={i} className="verse-ref-btn" onClick={() => fetchVerse(clean)}>
                              {clean}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Fetched verse display */}
                  {fetchedVerse && (
                    <section className="side-panel-section side-panel-fetched-verse">
                      <div className="fetched-verse-header">
                        <h3 className="side-panel-label">
                          <BookOpen className="w-3.5 h-3.5 inline mr-1.5" />
                          {fetchedVerse.reference}
                        </h3>
                        <button className="fetched-verse-close" onClick={() => setFetchedVerse(null)}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {fetchedVerse.loading && (
                        <p className="side-panel-text italic text-muted">Loading verse...</p>
                      )}
                      {fetchedVerse.error && (
                        <p className="side-panel-text text-crimson">{fetchedVerse.error}</p>
                      )}
                      {fetchedVerse.text && (
                        <>
                          <blockquote className="side-panel-verse">{fetchedVerse.text}</blockquote>
                          <div className="keyword-tags">
                            {extractKeywords(fetchedVerse.text).map((kw, i) => (
                              <button key={i} className="keyword-tag" onClick={() => searchKeyword(kw)}>
                                {kw}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </section>
                  )}

                  {/* Keywords from verse text */}
                  {!fetchedVerse && selectedLaw.verse_text && (
                    <section className="side-panel-section">
                      <h3 className="side-panel-label">
                        <Search className="w-3.5 h-3.5 inline mr-1.5" />
                        Search by Keyword
                      </h3>
                      <div className="keyword-tags">
                        {extractKeywords(selectedLaw.verse_text).map((kw, i) => (
                          <button key={i} className="keyword-tag" onClick={() => searchKeyword(kw)}>
                            {kw}
                          </button>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Keyword search results */}
                  {keywordResults && (
                    <section className="side-panel-section side-panel-keyword-results">
                      <div className="fetched-verse-header">
                        <h3 className="side-panel-label">
                          <Search className="w-3.5 h-3.5 inline mr-1.5" />
                          &ldquo;{keywordResults.keyword}&rdquo; in Scripture
                        </h3>
                        <button className="fetched-verse-close" onClick={() => setKeywordResults(null)}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {keywordResults.loading && (
                        <p className="side-panel-text italic text-muted">Searching...</p>
                      )}
                      {keywordResults.error && (
                        <p className="side-panel-text text-crimson">{keywordResults.error}</p>
                      )}
                      {keywordResults.results.length > 0 && (
                        <div className="keyword-results-list">
                          {keywordResults.results.map((r, i) => (
                            <div key={i} className="keyword-result-item">
                              <button
                                className="keyword-result-ref"
                                onClick={() => fetchVerse(r.reference)}
                              >
                                {r.reference}
                              </button>
                              <p
                                className="keyword-result-text"
                                dangerouslySetInnerHTML={{ __html: r.highlighted }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {!keywordResults.loading && keywordResults.results.length === 0 && !keywordResults.error && (
                        <p className="side-panel-text italic text-muted">No results found</p>
                      )}
                    </section>
                  )}
                </>
              )}

              {/* ── Details Tab ── */}
              {sideTab === "details" && (
                <>
                  <section className="side-panel-section side-panel-grid">
                    <h3 className="side-panel-label">Classification</h3>
                    <div className="side-panel-field">
                      <span className="side-panel-field-label">Duration</span>
                      <span className="side-panel-field-value">
                        {selectedLaw.duration_type?.replace(/_/g, " ") || "Not analyzed"}
                      </span>
                    </div>
                    <div className="side-panel-field">
                      <span className="side-panel-field-label">Applicability</span>
                      <span className="side-panel-field-value">
                        {selectedLaw.current_applicability?.replace(/_/g, " ") || "Not analyzed"}
                      </span>
                    </div>
                    <div className="side-panel-field">
                      <span className="side-panel-field-label">Regulated Party</span>
                      <span className="side-panel-field-value">
                        {selectedLaw.regulated_party || "Not specified"}
                      </span>
                    </div>
                    {selectedLaw.observance_class && OBSERVANCE_CONFIG[selectedLaw.observance_class] && (
                      <div className="side-panel-field">
                        <span className="side-panel-field-label">Observance</span>
                        <span className="side-panel-field-value flex items-center gap-1">
                          <span style={{ color: OBSERVANCE_CONFIG[selectedLaw.observance_class].color }}>
                            {OBSERVANCE_CONFIG[selectedLaw.observance_class].symbol}
                          </span>
                          {" "}
                          {OBSERVANCE_CONFIG[selectedLaw.observance_class].label}
                        </span>
                      </div>
                    )}
                    {selectedLaw.categories?.length > 0 && (
                      <div className="side-panel-field">
                        <span className="side-panel-field-label">Category</span>
                        <span className="side-panel-field-value">
                          {selectedLaw.categories
                            .map((c) => c.split(" > ").slice(1).join(" > "))
                            .join("; ")}
                        </span>
                      </div>
                    )}
                  </section>

                  {(selectedLaw.requires_temple !== "no" ||
                    selectedLaw.requires_priesthood !== "no" ||
                    selectedLaw.requires_land_israel !== "no") && (
                    <section className="side-panel-section">
                      <h3 className="side-panel-label">
                        <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                        Prerequisites
                      </h3>
                      {selectedLaw.requires_temple && selectedLaw.requires_temple !== "no" && (
                        <p className="side-panel-prereq">Temple: {selectedLaw.requires_temple}</p>
                      )}
                      {selectedLaw.requires_priesthood && selectedLaw.requires_priesthood !== "no" && (
                        <p className="side-panel-prereq">
                          Priesthood: {selectedLaw.requires_priesthood}
                        </p>
                      )}
                      {selectedLaw.requires_land_israel && selectedLaw.requires_land_israel !== "no" && (
                        <p className="side-panel-prereq">
                          Land of Israel: {selectedLaw.requires_land_israel}
                        </p>
                      )}
                    </section>
                  )}

                  {selectedLaw.classification_reasoning && (
                    <section className="side-panel-section">
                      <h3 className="side-panel-label">Reasoning</h3>
                      <p className="side-panel-text">{selectedLaw.classification_reasoning}</p>
                    </section>
                  )}

                  {selectedLaw.notes && (
                    <section className="side-panel-section">
                      <h3 className="side-panel-label">
                        <MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />
                        Notes
                      </h3>
                      <p className="side-panel-text">{selectedLaw.notes}</p>
                    </section>
                  )}
                </>
              )}
            </div>

            {/* Observance Legend — sticky footer */}
            <div className="side-panel-legend">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {Object.entries(OBSERVANCE_CONFIG).map(([key, cfg]) => (
                  <div key={key} className="flex items-center gap-1.5 text-[10px]">
                    <span style={{ color: cfg.color }} className="text-sm">
                      {cfg.symbol}
                    </span>
                    <span className="font-mono text-[9px] text-muted tracking-wide">
                      {cfg.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );

  if (!mounted) return null;
  return createPortal(panel, document.body);
}
