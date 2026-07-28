"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, X } from "lucide-react";

const LS_DISMISSED = "social_banner_dismissed";

export function SocialBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem(LS_DISMISSED)) return;
    // Slight delay so the banner slides in after the page settles.
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    localStorage.setItem(LS_DISMISSED, "1");
    setVisible(false);
  }

  if (!visible || pathname === "/connect") return null;

  return (
    <div
      role="region"
      aria-label="We're on social media"
      className="fixed bottom-0 inset-x-0 z-40 animate-[slide-up_0.45s_cubic-bezier(0.2,0.7,0.2,1)]"
    >
      <div className="bg-ink text-parchment border-t-2 border-ochre px-6 py-3.5 flex items-center justify-center gap-4 flex-wrap max-md:gap-3 max-md:py-3">
        <span className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-parchment/90 max-md:text-[10px]">
          <Radio size={14} className="text-ochre shrink-0" aria-hidden="true" />
          Did you know — we&apos;re on social media! Join us for live conversations.
        </span>
        <Link
          href="/connect"
          onClick={dismiss}
          className="font-mono text-[11px] tracking-[0.18em] uppercase bg-ochre text-parchment px-4 py-2 no-underline border border-ochre transition-all hover:bg-parchment hover:text-ink max-md:text-[10px]"
        >
          Find Us →
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-parchment/60 hover:text-parchment transition-colors max-md:static max-md:translate-y-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
