// src/app/api/subscribe/route.ts
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSupabase() {
  const url = process.env.SUPABASE_SUBSCRIBERS_URL;
  const key = process.env.SUPABASE_SUBSCRIBERS_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase subscribers env vars");
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  let email: string;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const supabase = getSupabase();

  const { error } = await supabase.from("subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
    }
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // Fire-and-forget admin notification — never fail the request over this
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: "jontkaufman@gmail.com",
        subject: `New subscriber: ${email}`,
        text: `New subscriber on Defending Torah:\n\n${email}\n\nTime: ${new Date().toISOString()}`,
      });
    }
  } catch (err) {
    console.error("Resend notification failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
