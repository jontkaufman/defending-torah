// src/app/api/content-request/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LIST = 12;
const MAX_TEXT = 500;

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, 80))
    .filter(Boolean)
    .slice(0, MAX_LIST);
}

function cleanText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, MAX_TEXT);
  return trimmed || null;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const platforms = cleanList(body.platforms);
  const platformOther = cleanText(body.platformOther);
  const mediaTypes = cleanList(body.mediaTypes);
  const mediaTypeOther = cleanText(body.mediaTypeOther);
  const subjects = cleanList(body.subjects);
  const subjectOther = cleanText(body.subjectOther);
  const message = cleanText(body.message);
  const email = cleanText(body.email)?.toLowerCase() ?? null;

  const hasContent =
    platforms.length ||
    platformOther ||
    mediaTypes.length ||
    mediaTypeOther ||
    subjects.length ||
    subjectOther ||
    message;
  if (!hasContent) {
    return NextResponse.json(
      { error: "Pick at least one option or leave a note." },
      { status: 400 }
    );
  }

  if (email && !EMAIL_RE.test(email)) {
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
      .prepare(
        `INSERT INTO content_requests
           (platforms, platform_other, media_types, media_type_other, subjects, subject_other, message, email)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        JSON.stringify(platforms),
        platformOther,
        JSON.stringify(mediaTypes),
        mediaTypeOther,
        JSON.stringify(subjects),
        subjectOther,
        message,
        email
      )
      .run();
  } catch (err) {
    console.error("D1 insert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  try {
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    if (resendKey && fromEmail) {
      const resend = new Resend(resendKey);
      const lines = [
        `Platforms: ${platforms.join(", ") || "—"}${platformOther ? ` (other: ${platformOther})` : ""}`,
        `Media types: ${mediaTypes.join(", ") || "—"}${mediaTypeOther ? ` (other: ${mediaTypeOther})` : ""}`,
        `Subjects: ${subjects.join(", ") || "—"}${subjectOther ? ` (other: ${subjectOther})` : ""}`,
        `Message: ${message || "—"}`,
        `Email: ${email || "—"}`,
        `Time: ${new Date().toISOString()}`,
      ];
      await resend.emails.send({
        from: fromEmail,
        to: "jontkaufman@gmail.com",
        subject: "New content request on Defending Torah",
        text: `New content request:\n\n${lines.join("\n")}`,
      });
    }
  } catch (err) {
    console.error("Resend notification failed (non-fatal):", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
