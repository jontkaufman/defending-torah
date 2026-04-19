import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/torah-laws", label: "Torah Laws" },
  { href: "/blog", label: "Blog" },
  { href: "/objection-finder", label: "Objection Finder" },
];

export function Nav() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-lg tracking-wide"
        >
          Torah Apologetics
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors hidden sm:block"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
