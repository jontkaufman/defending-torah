"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth";
import AuthLayout from "@/components/course/auth-layout";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Client-side password confirmation check
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await signUp(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success, signUp redirects automatically
  }

  return (
    <AuthLayout
      title="Join the course."
      subtitle="Create your account"
      scripture="Study to show yourself approved unto God, a workman who has no need to be ashamed."
      scriptureRef="2 Timothy 2:15"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full name field */}
        <div>
          <label
            htmlFor="name"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors placeholder:text-muted placeholder:opacity-60"
          />
        </div>

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

        {/* Confirm password field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="············"
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
          {loading ? "Creating account..." : "Create Account →"}
        </button>

        {/* Terms notice */}
        <div className="pt-4 border-t border-parchment-shadow">
          <p className="font-body text-[13px] text-muted italic leading-relaxed">
            By creating an account you agree to receive course materials and
            occasional updates from Defending Torah. No spam. Unsubscribe any
            time.
          </p>
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <Link
            href="/login"
            className="font-mono text-[10px] tracking-wide uppercase text-ochre-deep underline hover:text-ochre transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
