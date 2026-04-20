"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/articles", label: "Topics" },
  { href: "/objection-finder", label: "Objections" },
  { href: "/torah-laws", label: "Torah Laws" },
  { href: "/blog", label: "Blog" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="hidden max-md:flex flex-col gap-[5px] bg-transparent border-none p-2 cursor-pointer relative z-[60]"
      >
        <span
          className="block w-[22px] h-[2px] transition-all duration-300 origin-center"
          style={{
            background: open ? "var(--parchment)" : "var(--ink)",
            transform: open ? "rotate(45deg) translate(2.5px, 2.5px)" : "none",
          }}
        />
        <span
          className="block w-[22px] h-[2px] transition-all duration-300"
          style={{
            background: open ? "var(--parchment)" : "var(--ink)",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block w-[22px] h-[2px] transition-all duration-300 origin-center"
          style={{
            background: open ? "var(--parchment)" : "var(--ink)",
            transform: open ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none",
          }}
        />
      </button>

      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          background: "rgba(26, 31, 46, 0.95)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setOpen(false)}
      >
        {/* Menu content — stop propagation so clicks inside don't close */}
        <div
          className="flex flex-col items-center justify-center h-full px-8"
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: "transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)",
          }}
        >
          {/* Nav links */}
          <nav className="flex flex-col items-center gap-8 mb-12">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="no-underline font-heading font-light text-[32px] tracking-tight transition-colors hover:text-ochre"
                style={{
                  color: "var(--parchment)",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.3s ${0.1 + i * 0.05}s, transform 0.3s ${0.1 + i * 0.05}s, color 0.2s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div
            className="flex flex-col items-center gap-4 w-full max-w-[280px]"
            style={{
              opacity: open ? 1 : 0,
              transition: "opacity 0.3s 0.35s",
            }}
          >
            <Link
              href="/objection-finder"
              onClick={() => setOpen(false)}
              className="w-full text-center font-mono text-[11px] tracking-[0.18em] uppercase no-underline px-5 py-3.5 transition-all"
              style={{
                background: "var(--ochre)",
                color: "var(--parchment)",
                border: "1px solid var(--ochre)",
              }}
            >
              Find an Answer →
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="w-full text-center font-mono text-[11px] tracking-[0.18em] uppercase no-underline px-5 py-3.5 transition-all"
              style={{
                background: "transparent",
                color: "var(--parchment)",
                border: "1px solid rgba(244, 236, 220, 0.3)",
              }}
            >
              Log In
            </Link>
          </div>

          {/* Bottom tagline */}
          <div
            className="absolute bottom-8 font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{
              color: "rgba(244, 236, 220, 0.3)",
              opacity: open ? 1 : 0,
              transition: "opacity 0.3s 0.4s",
            }}
          >
            Biblical Answers for the Honest Skeptic
          </div>
        </div>
      </div>
    </>
  );
}
