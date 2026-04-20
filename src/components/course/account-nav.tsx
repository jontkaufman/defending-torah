"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth";

const tabs = [
  { label: "Home", href: "/account", key: "home" },
  { label: "Courses", href: "/account/courses", key: "courses" },
  { label: "Resources", href: "/account/resources", key: "resources" },
  { label: "Profile", href: "/account/profile", key: "profile" },
  { label: "Settings", href: "/account/settings", key: "settings" },
] as const;

export function AccountNav() {
  const pathname = usePathname();

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname === "/account") return "home";
    if (pathname?.startsWith("/account/courses")) return "courses";
    if (pathname?.startsWith("/account/resources")) return "resources";
    if (pathname?.startsWith("/account/profile")) return "profile";
    if (pathname?.startsWith("/account/settings")) return "settings";
    return null;
  };

  const activeTab = getActiveTab();
  const showTabs = pathname?.startsWith("/account");

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="sticky top-0 z-50 bg-[var(--ink)]">
      {/* Row 1: Top bar */}
      <div className="border-b border-[rgba(244,236,220,0.08)] px-12 py-2.5">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Title */}
          <Link href="/account" className="flex items-center gap-2.5">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2C10 2 5 5 5 5v17s5 4 11 8c6-4 11-8 11-8V5s-5-3-11-3z"
                fill="#1e3a5f"
                stroke="#c9a84c"
                strokeWidth="1.5"
              />
              <line
                x1="16"
                y1="8"
                x2="16"
                y2="24"
                stroke="#c9a84c"
                strokeWidth="1.5"
              />
              <line
                x1="10"
                y1="15"
                x2="22"
                y2="15"
                stroke="#c9a84c"
                strokeWidth="1.5"
              />
            </svg>
            <span className="font-heading font-black text-[18px] text-parchment">
              Defending Torah
            </span>
          </Link>

          {/* Right: Portal label + Sign Out button */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[rgba(244,236,220,0.5)]">
              Student Portal
            </span>
            <button
              onClick={handleSignOut}
              className="font-mono text-[10px] tracking-[0.15em] uppercase border border-[rgba(244,236,220,0.2)] text-[rgba(244,236,220,0.6)] px-3 py-[5px] hover:border-[rgba(244,236,220,0.4)] hover:text-[rgba(244,236,220,0.8)] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Tab strip (only on /account/* paths) */}
      {showTabs && (
        <div className="px-12">
          <nav className="flex">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={`font-mono text-[10.5px] tracking-[0.2em] uppercase px-6 py-4 border-b-2 transition-colors ${
                    isActive
                      ? "text-[var(--ochre)] border-[var(--ochre)]"
                      : "text-[rgba(244,236,220,0.5)] border-transparent hover:text-[rgba(244,236,220,0.7)]"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
