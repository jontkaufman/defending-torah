// src/app/api/subscribe/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  type D1Stmt = { bind: (...args: unknown[]) => { run: () => Promise<unknown> } };
  type D1Like = { prepare: (sql: string) => D1Stmt };
  const { env } = getCloudflareContext();
  const db = (env as unknown as { SUBSCRIBERS_DB?: D1Like }).SUBSCRIBERS_DB;
  if (!db) {
    console.error("SUBSCRIBERS_DB binding missing");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  try {
    await db
      .prepare("INSERT INTO subscribers (email) VALUES (?)")
      .bind(email)
      .run();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("UNIQUE") || message.includes("constraint")) {
      return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
    }
    console.error("D1 insert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

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
