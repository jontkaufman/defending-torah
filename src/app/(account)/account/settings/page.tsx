"use client";

import { useState } from "react";
import { MonoLabel } from "@/components/course/mono-label";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyProgress, setWeeklyProgress] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto w-full py-[52px] px-12">
      {/* Header */}
      <div className="mb-10 pb-10 border-b border-parchment-shadow">
        <MonoLabel color="var(--crimson)" className="mb-3">
          Preferences
        </MonoLabel>
        <h1
          className="font-heading font-light leading-none tracking-tight"
          style={{ fontSize: "clamp(36px, 4vw, 48px)" }}
        >
          Settings.
        </h1>
      </div>

      {/* Settings form */}
      <div className="max-w-[560px] space-y-8">
        {/* Email Notifications toggle */}
        <div className="flex justify-between items-start gap-6 pb-6 border-b border-parchment-shadow">
          <div className="flex-1">
            <div className="font-body text-[19px] leading-[1.3] mb-1">
              Email Notifications
            </div>
            <div
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              Receive reminders about new sessions and updates.
            </div>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className="shrink-0 w-[42px] h-[24px] rounded-full transition-colors relative"
            style={{
              background: emailNotifications
                ? "var(--olive)"
                : "var(--parchment-shadow)",
            }}
            aria-label="Toggle email notifications"
          >
            <div
              className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-parchment transition-transform"
              style={{
                transform: emailNotifications
                  ? "translateX(21px)"
                  : "translateX(3px)",
              }}
            />
          </button>
        </div>

        {/* Weekly Progress Email toggle */}
        <div className="flex justify-between items-start gap-6 pb-6 border-b border-parchment-shadow">
          <div className="flex-1">
            <div className="font-body text-[19px] leading-[1.3] mb-1">
              Weekly Progress Email
            </div>
            <div
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              A short summary of your progress sent each week.
            </div>
          </div>
          <button
            onClick={() => setWeeklyProgress(!weeklyProgress)}
            className="shrink-0 w-[42px] h-[24px] rounded-full transition-colors relative"
            style={{
              background: weeklyProgress
                ? "var(--olive)"
                : "var(--parchment-shadow)",
            }}
            aria-label="Toggle weekly progress email"
          >
            <div
              className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-parchment transition-transform"
              style={{
                transform: weeklyProgress
                  ? "translateX(21px)"
                  : "translateX(3px)",
              }}
            />
          </button>
        </div>

        {/* Danger zone */}
        <div className="pt-8">
          <MonoLabel color="var(--crimson)" className="mb-4">
            Danger Zone
          </MonoLabel>
          <button
            className="btn"
            style={{
              background: "transparent",
              border: "1px solid var(--crimson)",
              color: "var(--crimson)",
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
