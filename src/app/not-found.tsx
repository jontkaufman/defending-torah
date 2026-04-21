import Link from "next/link";
import { NotFoundSearch } from "@/components/not-found-search";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-heading font-light text-[clamp(48px,8vw,72px)] leading-[1.05] tracking-tight text-ink mb-6">
          Page Not Found
        </h1>

        <p className="text-[19px] leading-[1.6] text-ink-soft mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <nav className="mb-10">
          <ul className="flex flex-wrap justify-center gap-4 text-[15px]">
            <li>
              <Link
                href="/"
                className="text-ink no-underline font-body italic font-medium relative pb-1 transition-colors hover:text-ochre-deep group"
              >
                Home
                <span className="absolute left-0 bottom-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            <li>
              <Link
                href="/articles"
                className="text-ink no-underline font-body italic font-medium relative pb-1 transition-colors hover:text-ochre-deep group"
              >
                Articles
                <span className="absolute left-0 bottom-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            <li>
              <Link
                href="/objection-finder"
                className="text-ink no-underline font-body italic font-medium relative pb-1 transition-colors hover:text-ochre-deep group"
              >
                Objections
                <span className="absolute left-0 bottom-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-ink no-underline font-body italic font-medium relative pb-1 transition-colors hover:text-ochre-deep group"
              >
                Blog
                <span className="absolute left-0 bottom-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            <li>
              <Link
                href="/torah-laws"
                className="text-ink no-underline font-body italic font-medium relative pb-1 transition-colors hover:text-ochre-deep group"
              >
                Torah Laws
                <span className="absolute left-0 bottom-0 h-px bg-ochre w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="max-w-md mx-auto">
          <p className="text-sm text-muted mb-3">Or search for what you need:</p>
          <NotFoundSearch />
        </div>
      </div>
    </div>
  );
}
