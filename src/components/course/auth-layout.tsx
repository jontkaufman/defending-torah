"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  scripture: string;
  scriptureRef: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  scripture,
  scriptureRef,
  children,
}: AuthLayoutProps) {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Left panel — parchment form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-parchment relative">
        <div className="w-full max-w-[380px]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-10 h-10 flex-shrink-0"
            >
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
            <div>
              <h1 className="font-heading font-black text-[22px] leading-none text-ink">
                Defending Torah
              </h1>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted mt-0.5">
                Member Access
              </p>
            </div>
          </div>

          {/* Subtitle */}
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-crimson mb-2">
            {subtitle}
          </p>

          {/* Title */}
          <h2 className="font-heading font-light text-[38px] leading-tight text-ink mb-8">
            {title}
          </h2>

          {/* Children (form fields) */}
          {children}
        </div>
      </div>

      {/* Right panel — dark branding (hidden on mobile) */}
      <div className="hidden md:flex relative bg-ink items-end justify-center p-12 overflow-hidden">
        {/* Hebrew watermark */}
        <div
          className="absolute top-[-20px] right-[-20px] font-heading font-black text-[320px] opacity-[0.04] text-ochre pointer-events-none select-none"
          aria-hidden="true"
        >
          ת
        </div>

        {/* Content area */}
        <div className="relative z-10 w-full max-w-md space-y-12">
          {/* Scripture quote */}
          <div>
            <div className="w-12 h-[3px] bg-ochre mb-6" />
            <blockquote className="font-body italic text-[26px] leading-snug text-[rgba(244,236,220,0.85)] mb-3">
              {scripture}
            </blockquote>
            <cite className="font-mono text-[11px] tracking-wider uppercase text-ochre not-italic">
              {scriptureRef}
            </cite>
          </div>

          {/* Course info strip */}
          <div className="border-t border-[rgba(244,236,220,0.15)] pt-6">
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-ochre mb-3">
              Course Platform
            </p>
            <div className="space-y-1 text-[rgba(244,236,220,0.35)] font-body text-[15px]">
              <p>Foundations of Defending Torah</p>
              <p>5 Weeks · 10 Sessions</p>
              <p>Beginner Level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
