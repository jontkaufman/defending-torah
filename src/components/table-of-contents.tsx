"use client";

import { useEffect, useState, useRef } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("intro");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pendingFlashRef = useRef<string | null>(null);

  // Extract headings from DOM on mount
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = [];

    headingElements.forEach((heading) => {
      // Skip headings inside hidden containers (e.g. xl:hidden mobile fallback)
      if ((heading as HTMLElement).offsetParent === null) return;

      const level = parseInt(heading.tagName[1]) as 2 | 3;
      const text = heading.textContent || "";
      let id = heading.id;

      if (!id) {
        const baseId = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        id = baseId;
        let counter = 1;
        while (document.querySelectorAll(`[id="${id}"]`).length > 0) {
          id = `${baseId}-${counter}`;
          counter++;
        }
        heading.id = id;
      }

      items.push({ id, text, level });
    });

    setHeadings(items);
  }, [content]);

  // Check if nav is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (navRef.current) {
        setIsScrollable(navRef.current.scrollHeight > navRef.current.clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [headings]);

  // Scroll-based active section tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.3;
      let current = "intro";

      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const raf = requestAnimationFrame(handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [headings]);

  // Flash heading once after scroll settles
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!pendingFlashRef.current) return;
        const el = document.getElementById(pendingFlashRef.current);
        if (el) {
          el.classList.add("toc-flash");
          setTimeout(() => el.classList.remove("toc-flash"), 1400);
        }
        pendingFlashRef.current = null;
      }, 160);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // sticky header + ~5 lines breathing room
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      pendingFlashRef.current = id;
      window.scrollTo({ top, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes toc-flash {
          0%   { background-color: transparent; }
          20%  { background-color: rgba(184, 115, 42, 0.18); }
          100% { background-color: transparent; }
        }
        .toc-flash {
          animation: toc-flash 1.4s ease-out;
          border-radius: 3px;
        }
      `}</style>

      {/* Desktop Sidebar */}
      <nav
        ref={navRef}
        className="hidden xl:block sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto will-change-transform relative"
        aria-label="Table of contents"
        style={{
          maskImage: isScrollable
            ? "linear-gradient(to bottom, black 90%, transparent 100%)"
            : undefined,
          WebkitMaskImage: isScrollable
            ? "linear-gradient(to bottom, black 90%, transparent 100%)"
            : undefined,
        }}
      >
        <div className="bg-ink/15 rounded-lg p-3">
          {(() => {
            let h2Count = 1;
            const items = headings.map((h) => ({
              ...h,
              number: h.level === 2 ? ++h2Count : null,
            }));
            return (
              <div className="space-y-0.5">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-current={activeId === "intro" ? "true" : undefined}
                  className={`
                    w-full text-left px-2 py-1 text-[12px] font-sans rounded transition-all duration-150 flex items-start gap-1.5
                    ${activeId === "intro"
                      ? "bg-ochre/15 text-ink font-semibold border-l-[3px] border-ochre"
                      : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                    }
                  `}
                >
                  <span className="shrink-0 text-ink-soft/50">1.</span>
                  <span>Intro</span>
                </button>
                {items.map(({ id, text, level, number }) => (
                  <button
                    key={id}
                    onClick={() => handleClick(id)}
                    aria-current={activeId === id ? "true" : undefined}
                    className={`
                      w-full text-left px-2 py-1 text-[12px] font-sans rounded transition-all duration-150 flex items-start gap-1.5
                      ${level === 3 ? "pl-5 text-[11px]" : ""}
                      ${
                        activeId === id
                          ? "bg-ochre/15 text-ink font-semibold border-l-[3px] border-ochre"
                          : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                      }
                    `}
                  >
                    {number && <span className="shrink-0 text-ink-soft/50">{number}.</span>}
                    {level === 3 && <span className="shrink-0 text-ink-soft/30">—</span>}
                    <span>{text}</span>
                  </button>
                ))}
              </div>
            );
          })()}
        </div>
      </nav>

      {/* Mobile TOC Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden fixed bottom-6 right-4 z-40 w-12 h-12 bg-parchment/80 backdrop-blur border border-ink/20 rounded shadow-lg flex items-center justify-center hover:bg-parchment transition-colors"
        aria-label="Open table of contents"
      >
        <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-ink/40" onClick={() => setIsOpen(false)}>
          <div
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-parchment shadow-2xl overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg text-ink">Contents</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-ink/5"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              {headings.map(({ id, text, level }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  aria-current={activeId === id ? "true" : undefined}
                  className={`
                    w-full text-left px-3 py-2 text-sm font-sans rounded transition-all duration-150
                    ${level === 3 ? "pl-7 text-[13px]" : ""}
                    ${
                      activeId === id
                        ? "bg-ochre/10 text-ink font-semibold border-l-[3px] border-ochre"
                        : "text-ink-soft hover:bg-ochre/5 hover:text-ink"
                    }
                  `}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
