"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import AuthLayout from "@/components/course/auth-layout";
import Link from "next/link";

type LinkState = "checking" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [linkState, setLinkState] = useState<LinkState>("checking");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Direct token: ?token_hash= links verify in-page, with no dependence
    // on Supabase's redirect allowlist.
    const tokenHash = new URLSearchParams(window.location.search).get(
      "token_hash"
    );
    if (tokenHash) {
      supabase.auth
        .verifyOtp({ type: "recovery", token_hash: tokenHash })
        .then(({ error: verifyError }) =>
          setLinkState(verifyError ? "invalid" : "ready")
        );
      return;
    }

    // Otherwise the emailed link signs the user in via URL params (code or
    // hash tokens); the browser client exchanges them automatically on load.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) setLinkState("ready");
    });

    // Fallback: if no session materializes shortly, the link was bad.
    const timer = setTimeout(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setLinkState(session ? "ready" : "invalid");
    }, 2500);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }
    router.push("/account");
  }

  if (linkState === "checking") {
    return (
      <AuthLayout
        title="One moment."
        subtitle="Password recovery"
        scripture="Your word is a lamp to my feet and a light to my path."
        scriptureRef="Psalm 119:105"
      >
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
          Verifying your reset link…
        </p>
      </AuthLayout>
    );
  }

  if (linkState === "invalid") {
    return (
      <AuthLayout
        title="Link expired."
        subtitle="Password recovery"
        scripture="Your word is a lamp to my feet and a light to my path."
        scriptureRef="Psalm 119:105"
      >
        <div className="space-y-6">
          <div className="p-6 bg-crimson-faint border-t-2 border-crimson/40">
            <p className="font-body text-[17px] text-ink leading-relaxed">
              This reset link is invalid or has expired. Request a new one and
              use it within an hour.
            </p>
          </div>
          <Link href="/forgot-password" className="btn btn-primary w-full text-center">
            Request a New Link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Choose a new password."
      subtitle="Password recovery"
      scripture="Your word is a lamp to my feet and a light to my path."
      scriptureRef="Psalm 119:105"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="password"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]"
          >
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="············"
            className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors placeholder:text-muted placeholder:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted block mb-[7px]"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            placeholder="············"
            className="w-full py-3 bg-transparent border-0 border-b-[1.5px] border-ink font-body text-[19px] text-ink italic outline-none focus:border-ochre transition-colors placeholder:text-muted placeholder:opacity-60"
          />
        </div>

        {error && (
          <div className="p-3 bg-crimson-faint border border-crimson/20 text-crimson text-sm font-body italic">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Set New Password →"}
        </button>
      </form>
    </AuthLayout>
  );
}
