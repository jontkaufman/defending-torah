"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./mobile-menu";

const links = [
  { href: "/articles", label: "Topics" },
  { href: "/objection-finder", label: "Objections" },
  { href: "/torah-laws", label: "Torah Laws" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(path + "/");

  return (
    <>
      {/* Meta Bar */}
      <div className="relative z-10 border-b border-ink/40 flex justify-between items-center px-10 py-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-soft max-md:hidden">
        <div>
          Vol. I <span className="text-ochre">·</span> Essays in Torah &amp;
          Evidence
        </div>
        <div className="font-heading text-[15px] tracking-normal normal-case text-ink max-md:text-[13px]">
          defendingtorah.com
        </div>
        <div>
          Est. 5786 <span className="text-ochre">·</span> Updated Weekly
        </div>
      </div>

      {/* Primary Nav */}
      <nav role="navigation" aria-label="Main navigation" className="relative z-10 px-10 pt-7 pb-6 grid grid-cols-[1fr_auto_1fr] items-baseline border-b-2 border-ink max-md:grid-cols-[1fr_auto] max-md:gap-5 max-md:px-6">
        <Link href="/" className="no-underline" aria-current={pathname === "/" ? "page" : undefined}>
          <div className="font-heading font-black text-[34px] leading-none tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="inline-block w-7 h-7 mr-1 -translate-y-0.5" aria-hidden="true">
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z" fill="#1e3a5f" stroke="#c9a84c" strokeWidth="1.5"/>
              <path d="M16 2C10 2 5 5 5 5v17s5 4 11 8" fill="#243f6b"/>
              <line x1="16" y1="8" x2="16" y2="24" stroke="#c9a84c" strokeWidth="1.5"/>
              <line x1="10" y1="15" x2="22" y2="15" stroke="#c9a84c" strokeWidth="1.5"/>
            </svg>
            Defending Torah
          </div>
          <span className="block font-mono text-[10px] font-normal tracking-[0.25em] text-muted mt-1.5 uppercase">
            Biblical Answers for the Honest Skeptic
          </span>
        </Link>

        <ul className="list-none flex gap-9 justify-center max-lg:gap-5 max-md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="text-ink no-underline font-body text-lg italic font-medium relative pb-1 transition-colors hover:text-ochre-deep group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="justify-self-end flex items-center gap-5">
          <Link
            href="/objection-finder"
            aria-current={isActive("/objection-finder") ? "page" : undefined}
            className="font-mono text-[11px] tracking-[0.18em] uppercase bg-ink text-parchment px-5 py-2.5 no-underline border border-ink transition-all hover:bg-ochre hover:border-ochre hover:text-parchment max-md:hidden"
          >
            Find an Answer →
          </Link>
          <Link
            href="/login"
            aria-current={isActive("/login") ? "page" : undefined}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink px-4 py-2.5 no-underline border border-ink transition-all hover:bg-ink hover:text-parchment max-md:hidden"
          >
            Log In
          </Link>

          <MobileMenu />
        </div>
      </nav>
    </>
  );
}
