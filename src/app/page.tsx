import Link from "next/link";
import { getArticles, getObjections } from "@/lib/content";
import { getPosts } from "@/lib/posts";

const sections = [
  {
    href: "/articles",
    title: "Article Library",
    description:
      "Teaching articles, deep dives, and scholarly analysis — all grounded in Scripture.",
    icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
  },
  {
    href: "/torah-laws",
    title: "Torah Laws",
    description:
      "1,377 laws from the five books of Torah — searchable, filterable, and expandable for study.",
    icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z",
  },
  {
    href: "/objection-finder",
    title: "Objection Finder",
    description:
      'Someone challenged you. Search by verse or claim and get the answer in 30 seconds.',
    icon: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
  },
  {
    href: "/blog",
    title: "Blog",
    description:
      "Polished articles written for sharing — ready for Facebook, group chats, and conversations.",
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
  },
];

export default function Home() {
  const articleCount = getArticles().length + getObjections().length;
  const postCount = getPosts().length;

  return (
    <div>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-5xl font-bold mb-4">
          Torah Apologetics
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
          Biblical defense of Torah observance — grounded in Scripture, tested by
          every objection, equipped for every conversation.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/objection-finder"
            className="px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Find an Answer
          </Link>
          <Link
            href="/articles"
            className="px-6 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] font-medium hover:border-[var(--accent)] transition-colors"
          >
            Browse Articles
          </Link>
        </div>
      </section>

      {/* Section Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-[var(--accent)] shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={section.icon}
                  />
                </svg>
                <div>
                  <h2 className="font-heading text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
