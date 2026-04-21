"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-heading font-light text-[clamp(48px,8vw,72px)] leading-[1.05] tracking-tight text-ink mb-6">
          Something Went Wrong
        </h1>

        <p className="text-[19px] leading-[1.6] text-ink-soft mb-10">
          An unexpected error occurred. Please try again.
        </p>

        {/* Show error message in development only */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-crimson/10 border border-crimson/30 rounded text-left">
            <p className="font-mono text-sm text-crimson">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Try Again
          </button>

          <Link href="/" className="btn btn-ghost">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
