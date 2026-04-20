import Link from "next/link";

const sections = [
  { href: "/articles", label: "Essays" },
  { href: "/objection-finder", label: "Objections" },
  { href: "/torah-laws", label: "Torah Laws" },
  { href: "/blog", label: "Blog" },
];

const resources = [
  { href: "/articles", label: "Article Library" },
  { href: "/torah-laws", label: "Law Index" },
  { href: "/objection-finder", label: "Objection Finder" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  return (
    <footer className="relative z-[1] px-10 pt-[60px] pb-[30px] max-md:px-6 max-md:pt-10 max-md:pb-5">
      {/* Ornamental Rule */}
      <div className="ornamental-rule mb-[60px] max-md:mb-10">
        <span className="ornament">✦</span>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr] gap-[50px] mb-[50px] max-lg:grid-cols-[1fr_1fr] max-lg:gap-[30px] max-md:grid-cols-1 max-md:gap-8">
        {/* Brand */}
        <div>
          <div className="font-heading font-black text-[42px] leading-none mb-4 max-md:text-[32px]">
            <span className="text-ochre">✦</span> Defending Torah
          </div>
          <p className="font-body italic text-lg text-ink-soft max-w-[360px] leading-[1.45]">
            Careful arguments, primary sources, and Hebrew exegesis defending
            Torah — written for readers, not partisans.
          </p>
        </div>

        {/* Sections */}
        <div>
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-crimson mb-[18px] font-medium">
            Sections
          </h4>
          <ul className="list-none">
            {sections.map((link) => (
              <li key={link.href} className="mb-2.5">
                <Link
                  href={link.href}
                  className="text-ink no-underline text-[17px] font-body transition-colors hover:text-ochre-deep hover:italic"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-crimson mb-[18px] font-medium">
            Resources
          </h4>
          <ul className="list-none">
            {resources.map((link) => (
              <li key={link.href} className="mb-2.5">
                <Link
                  href={link.href}
                  className="text-ink no-underline text-[17px] font-body transition-colors hover:text-ochre-deep hover:italic"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="pt-6 border-t border-ink flex justify-between items-center font-mono text-[10px] tracking-[0.22em] uppercase text-muted max-md:flex-col max-md:gap-3 max-md:text-center">
        <div>&copy; 5786 Defending Torah &middot; All Essays CC BY-NC 4.0</div>
        <div className="font-heading text-lg tracking-normal normal-case text-ink">
          שׁוּב אֶל־הַתּוֹרָה
        </div>
        <div className="max-md:hidden">Set in Frank Ruhl Libre &amp; Cormorant</div>
      </div>
    </footer>
  );
}
