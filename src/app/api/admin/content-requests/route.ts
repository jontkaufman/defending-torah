// src/app/api/admin/content-requests/route.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "reviewed", "archived"] as const;
type Status = (typeof STATUSES)[number];

type D1Stmt = {
  bind: (...args: unknown[]) => {
    run: () => Promise<unknown>;
    all: <T>() => Promise<{ results: T[] }>;
  };
  all: <T>() => Promise<{ results: T[] }>;
};
type D1Like = { prepare: (sql: string) => D1Stmt };

function getDb(): D1Like | null {
  const { env } = getCloudflareContext();
  return (env as unknown as { SUBSCRIBERS_DB?: D1Like }).SUBSCRIBERS_DB ?? null;
}

interface RequestRow {
  id: number;
  platforms: string;
  platform_other: string | null;
  media_types: string;
  media_type_other: string | null;
  subjects: string;
  subject_other: string | null;
  message: string | null;
  email: string | null;
  status: string;
  created_at: string;
}

function parseList(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export async function GET() {
  if (!(await getAdminUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    console.error("SUBSCRIBERS_DB binding missing");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  try {
    const { results } = await db
      .prepare(
        "SELECT * FROM content_requests ORDER BY created_at DESC LIMIT 1000"
      )
      .all<RequestRow>();

    const requests = results.map((row) => ({
      id: row.id,
      platforms: parseList(row.platforms),
      platformOther: row.platform_other,
      mediaTypes: parseList(row.media_types),
      mediaTypeOther: row.media_type_other,
      subjects: parseList(row.subjects),
      subjectOther: row.subject_other,
      message: row.message,
      email: row.email,
      status: row.status,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ requests });
  } catch (err) {
    console.error("D1 select error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await getAdminUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let id: number;
  let status: Status;
  try {
    const body = await req.json();
    id = Number(body.id);
    status = body.status;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Number.isInteger(id) || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  try {
    await db
      .prepare("UPDATE content_requests SET status = ? WHERE id = ?")
      .bind(status, id)
      .run();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("D1 update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await getAdminUser())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let id: number;
  try {
    const body = await req.json();
    id = Number(body.id);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  try {
    await db.prepare("DELETE FROM content_requests WHERE id = ?").bind(id).run();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("D1 delete error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
