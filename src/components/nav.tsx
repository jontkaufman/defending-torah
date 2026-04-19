import Link from "next/link";

const links = [
  { href: "/articles", label: "Topics" },
  { href: "/objection-finder", label: "Objections" },
  { href: "/torah-laws", label: "Torah Laws" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  return (
    <>
      {/* Meta Bar */}
      <div className="relative z-10 border-b border-ink/40 flex justify-between items-center px-10 py-2.5 font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-soft max-md:px-6 max-md:text-[9px] max-md:gap-3">
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
      <nav className="relative z-10 px-10 pt-7 pb-6 grid grid-cols-[1fr_auto_1fr] items-baseline border-b-2 border-ink max-md:grid-cols-[1fr_auto] max-md:gap-5 max-md:px-6">
        <Link href="/" className="no-underline">
          <div className="font-heading font-black text-[34px] leading-none tracking-tight">
            <span className="inline-block text-ochre mr-1 -translate-y-0.5">
              ✦
            </span>
            Defending Torah
          </div>
          <span className="block font-mono text-[10px] font-normal tracking-[0.25em] text-muted mt-1.5 uppercase">
            Biblical Answers for the Honest Skeptic
          </span>
        </Link>

        <ul className="list-none flex gap-9 justify-center max-md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
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
            className="font-mono text-[11px] tracking-[0.18em] uppercase bg-ink text-parchment px-5 py-2.5 no-underline border border-ink transition-all hover:bg-ochre hover:border-ochre hover:text-parchment max-md:hidden"
          >
            Find an Answer →
          </Link>

          {/* Mobile Menu Button (placeholder for future drawer) */}
          <button
            type="button"
            aria-label="Menu"
            className="hidden max-md:flex flex-col gap-[5px] bg-transparent border-none p-0 cursor-pointer"
          >
            <span className="block w-[22px] h-[2px] bg-ink font-mono"></span>
            <span className="block w-[22px] h-[2px] bg-ink font-mono"></span>
            <span className="block w-[22px] h-[2px] bg-ink font-mono"></span>
          </button>
        </div>
      </nav>
    </>
  );
}
