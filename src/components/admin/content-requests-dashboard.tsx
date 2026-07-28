"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Archive, CheckCircle2, Inbox, RotateCcw, Trash2 } from "lucide-react";

interface ContentRequest {
  id: number;
  platforms: string[];
  platformOther: string | null;
  mediaTypes: string[];
  mediaTypeOther: string | null;
  subjects: string[];
  subjectOther: string | null;
  message: string | null;
  email: string | null;
  status: string;
  createdAt: string;
}

type StatusFilter = "all" | "new" | "reviewed" | "archived";

function parseUtc(sqliteDate: string): Date {
  return new Date(sqliteDate.replace(" ", "T") + "Z");
}

function countValues(lists: string[][]): [string, number][] {
  const counts = new Map<string, number>();
  for (const list of lists) {
    for (const value of list) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-ink/30 px-6 py-5">
      <div className="font-heading font-light text-[40px] leading-none text-ink mb-2">
        {value}
      </div>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">
        {label}
      </div>
    </div>
  );
}

function BarList({
  title,
  counts,
  others,
  total,
}: {
  title: string;
  counts: [string, number][];
  others: string[];
  total: number;
}) {
  const max = counts.length ? counts[0][1] : 0;
  return (
    <div className="border border-ink/30 p-6">
      <h3 className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-crimson mb-5">
        {title}
      </h3>
      {counts.length === 0 ? (
        <p className="text-[14px] text-muted italic font-body">No votes yet.</p>
      ) : (
        <ul className="list-none space-y-3">
          {counts.map(([label, count]) => (
            <li key={label} title={`${label}: ${count} of ${total} requests`}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-body text-[14px] text-ink">{label}</span>
                <span className="font-mono text-[11px] text-ink-soft">
                  {count}
                </span>
              </div>
              <div className="h-[10px] bg-ochre-faint" role="presentation">
                <div
                  className="h-full bg-ochre"
                  style={{ width: `${max ? (count / max) * 100 : 0}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {others.length > 0 && (
        <div className="mt-5 pt-4 border-t border-ink/20">
          <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-muted mb-2">
            Write-ins
          </div>
          <ul className="list-none space-y-1">
            {others.map((other, i) => (
              <li key={i} className="font-body text-[13.5px] italic text-ink-soft">
                &ldquo;{other}&rdquo;
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "archived", label: "Archived" },
];

export function ContentRequestsDashboard() {
  const [requests, setRequests] = useState<ContentRequest[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content-requests");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRequests(data.requests);
      setError(null);
    } catch {
      setError("Couldn't load requests. Refresh to try again.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: number, status: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/content-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setRequests((prev) =>
        prev ? prev.map((r) => (r.id === id ? { ...r, status } : r)) : prev
      );
    } catch {
      setError("Update failed. Refresh and try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Permanently delete this request? This can't be undone.")) {
      return;
    }
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/content-requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setRequests((prev) => (prev ? prev.filter((r) => r.id !== id) : prev));
    } catch {
      setError("Delete failed. Refresh and try again.");
    } finally {
      setBusyId(null);
    }
  }

  const metrics = useMemo(() => {
    if (!requests) return null;
    const active = requests.filter((r) => r.status !== "archived");
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return {
      total: requests.length,
      lastWeek: requests.filter((r) => parseUtc(r.createdAt).getTime() > weekAgo)
        .length,
      awaiting: requests.filter((r) => r.status === "new").length,
      platforms: countValues(active.map((r) => r.platforms)),
      platformOthers: active.map((r) => r.platformOther).filter(Boolean) as string[],
      mediaTypes: countValues(active.map((r) => r.mediaTypes)),
      mediaTypeOthers: active
        .map((r) => r.mediaTypeOther)
        .filter(Boolean) as string[],
      subjects: countValues(active.map((r) => r.subjects)),
      subjectOthers: active.map((r) => r.subjectOther).filter(Boolean) as string[],
      activeCount: active.length,
    };
  }, [requests]);

  const visible = useMemo(() => {
    if (!requests) return [];
    return filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);
  }, [requests, filter]);

  if (error && !requests) {
    return (
      <p role="alert" className="font-mono text-[12px] text-crimson">
        {error}
      </p>
    );
  }

  if (!requests || !metrics) {
    return (
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
        Loading requests…
      </p>
    );
  }

  return (
    <div>
      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-4 mb-10 max-md:grid-cols-1">
        <StatTile label="Total Requests" value={metrics.total} />
        <StatTile label="Last 7 Days" value={metrics.lastWeek} />
        <StatTile label="Awaiting Review" value={metrics.awaiting} />
      </div>

      {/* Metrics */}
      <section className="mb-12">
        <h2 className="font-heading font-medium text-[26px] text-ink mb-2">
          What People Want
        </h2>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-6">
          Vote counts across {metrics.activeCount} active requests · archived
          excluded
        </p>
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          <BarList
            title="Platforms"
            counts={metrics.platforms}
            others={metrics.platformOthers}
            total={metrics.activeCount}
          />
          <BarList
            title="Media Types"
            counts={metrics.mediaTypes}
            others={metrics.mediaTypeOthers}
            total={metrics.activeCount}
          />
          <BarList
            title="Subjects"
            counts={metrics.subjects}
            others={metrics.subjectOthers}
            total={metrics.activeCount}
          />
        </div>
      </section>

      {/* Submissions */}
      <section>
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2 className="font-heading font-medium text-[26px] text-ink">
            Submissions
          </h2>
          <div className="flex gap-1" role="group" aria-label="Filter by status">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`font-mono text-[10px] tracking-[0.18em] uppercase px-3.5 py-2 border transition-all ${
                  filter === f.value
                    ? "bg-ink text-parchment border-ink"
                    : "bg-transparent text-ink-soft border-ink/30 hover:border-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p role="alert" className="mb-4 font-mono text-[11px] text-crimson">
            {error}
          </p>
        )}

        {visible.length === 0 ? (
          <div className="border border-ink/30 p-10 text-center">
            <Inbox size={20} className="inline-block text-muted mb-3" />
            <p className="font-body italic text-[15px] text-muted">
              Nothing here yet.
            </p>
          </div>
        ) : (
          <ul className="list-none space-y-4">
            {visible.map((r) => (
              <li
                key={r.id}
                className={`border p-6 ${
                  r.status === "new"
                    ? "border-ink bg-parchment-deep"
                    : "border-ink/30"
                }`}
              >
                <div className="flex justify-between items-start gap-4 flex-wrap mb-3">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted">
                    #{r.id} · {parseUtc(r.createdAt).toLocaleString()} ·{" "}
                    <span
                      className={
                        r.status === "new" ? "text-crimson" : "text-ink-soft"
                      }
                    >
                      {r.status}
                    </span>
                    {r.email && <> · {r.email}</>}
                  </div>
                  <div className="flex gap-2">
                    {r.status !== "reviewed" && (
                      <button
                        onClick={() => updateStatus(r.id, "reviewed")}
                        disabled={busyId === r.id}
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-soft border border-ink/30 px-3 py-1.5 hover:border-ink hover:text-ink transition-all"
                      >
                        <CheckCircle2 size={12} /> Reviewed
                      </button>
                    )}
                    {r.status !== "archived" ? (
                      <button
                        onClick={() => updateStatus(r.id, "archived")}
                        disabled={busyId === r.id}
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-soft border border-ink/30 px-3 py-1.5 hover:border-ink hover:text-ink transition-all"
                      >
                        <Archive size={12} /> Archive
                      </button>
                    ) : (
                      <button
                        onClick={() => updateStatus(r.id, "new")}
                        disabled={busyId === r.id}
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-soft border border-ink/30 px-3 py-1.5 hover:border-ink hover:text-ink transition-all"
                      >
                        <RotateCcw size={12} /> Restore
                      </button>
                    )}
                    <button
                      onClick={() => remove(r.id)}
                      disabled={busyId === r.id}
                      className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-crimson border border-crimson/40 px-3 py-1.5 hover:border-crimson hover:bg-crimson hover:text-parchment transition-all"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 mb-1">
                  {(
                    [
                      ["Platforms", r.platforms, r.platformOther],
                      ["Media", r.mediaTypes, r.mediaTypeOther],
                      ["Subjects", r.subjects, r.subjectOther],
                    ] as [string, string[], string | null][]
                  ).map(([label, values, other]) => (
                    <div key={label}>
                      <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-muted mb-1">
                        {label}
                      </div>
                      <div className="font-body text-[14px] text-ink leading-[1.5]">
                        {values.length || other ? (
                          <>
                            {values.join(", ")}
                            {other && (
                              <em className="text-ochre-deep">
                                {values.length ? ", " : ""}
                                &ldquo;{other}&rdquo;
                              </em>
                            )}
                          </>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {r.message && (
                  <blockquote className="mt-3 pt-3 border-t border-ink/20 font-body italic text-[15px] text-ink-soft leading-[1.55]">
                    &ldquo;{r.message}&rdquo;
                  </blockquote>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
