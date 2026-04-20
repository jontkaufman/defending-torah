"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth";
import AuthLayout from "@/components/course/auth-layout";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success, signIn redirects automatically
  }

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Sign in to your account"
      scripture="Oh how I love your Torah! It is my meditation all the day."
      scriptureRef="Psalm 119:97"
    >
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

        {/* Password field */}
        <div>
          <label
            htmlFor="password"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="············"
            className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors placeholder:text-muted placeholder:opacity-60"
          />
        </div>

        {/* Forgot password link */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="font-mono text-[10px] tracking-wide uppercase text-ochre-deep underline hover:text-ochre transition-colors"
          >
            Forgot password?
          </Link>
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
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        {/* Sign up link */}
        <div className="text-center pt-4">
          <Link
            href="/signup"
            className="font-mono text-[10px] tracking-wide uppercase text-ochre-deep underline hover:text-ochre transition-colors"
          >
            No account? Create one
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
