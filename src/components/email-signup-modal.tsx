"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export function EmailSignupModal({ open, onClose, onSubscribed }: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setError(null);
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setLoading(false);
        onSubscribed();
        return;
      }

      const data = await res.json();
      if (res.status === 409) {
        setError("You're already on the list.");
      } else if (data?.error) {
        setError(data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-parchment border border-ink w-full max-w-md p-10 shadow-[8px_8px_0_0_var(--ink)]">
        {/* Inner border */}
        <div className="absolute inset-2 border border-ink/20 pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Kicker */}
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-crimson mb-4 flex items-center gap-3">
          <span className="w-6 h-px bg-crimson" />
          Stay in the Scroll
        </div>

        <h2 id="signup-modal-title" className="font-heading font-light text-[32px] leading-[1.1] tracking-tight text-ink mb-3">
          New essays, objections answered,<br />
          <em className="font-body italic text-ochre-deep">straight to your inbox.</em>
        </h2>

        <p className="text-[15px] text-ink-soft leading-[1.55] mb-7">
          No noise. Just careful arguments and primary sources when new content drops.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex gap-0 border border-ink">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 font-body text-[16px] text-ink placeholder:text-muted outline-none"
              disabled={loading}
              autoFocus
              aria-describedby={error ? "signup-error" : undefined}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary !py-3 !px-5 shrink-0"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </div>

          {error && (
            <p id="signup-error" role="alert" className="mt-3 font-mono text-[11px] text-crimson tracking-wide">
              {error}
            </p>
          )}
        </form>

        <p className="mt-5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
