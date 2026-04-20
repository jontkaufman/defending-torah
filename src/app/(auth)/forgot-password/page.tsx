"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/auth";
import AuthLayout from "@/components/course/auth-layout";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await resetPassword(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={sent ? "Check your inbox." : "Reset your password."}
      subtitle="Password recovery"
      scripture="Your word is a lamp to my feet and a light to my path."
      scriptureRef="Psalm 119:105"
    >
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors placeholder:text-muted placeholder:opacity-60"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-crimson-faint border border-crimson/20 text-crimson text-sm font-body italic">
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link →"}
          </button>

          {/* Back to sign in link */}
          <div className="text-center">
            <Link
              href="/login"
              className="font-mono text-[10px] tracking-wide uppercase text-ochre-deep underline hover:text-ochre transition-colors"
            >
              ← Back to sign in
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Success confirmation card */}
          <div className="p-6 bg-parchment-deep border-t-2 border-olive">
            <p className="font-body text-[17px] text-ink leading-relaxed">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
          </div>

          {/* Return to sign in button */}
          <button
            onClick={() => (window.location.href = "/login")}
            className="btn btn-ghost w-full"
          >
            Return to Sign In
          </button>
        </div>
      )}
    </AuthLayout>
  );
}
