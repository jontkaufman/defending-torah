"use client";

import { useState, useMemo, useEffect } from "react";
import { LawFilters } from "@/components/law-filters";
import { LawRow } from "@/components/law-row";
import { filterLaws, type Law } from "@/lib/laws";

export default function TorahLawsPage() {
  const [laws, setLaws] = useState<Law[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [book, setBook] = useState("");
  const [commandType, setCommandType] = useState("");
  const [applicability, setApplicability] = useState("");

  useEffect(() => {
    fetch("/laws-data.json")
      .then((r) => r.json())
      .then((data: Law[]) => {
        setLaws(data);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(
    () => filterLaws(laws, { search, book, commandType, applicability }),
    [laws, search, book, commandType, applicability],
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">Torah Laws</h1>
        <p className="text-[var(--text-secondary)]">
          {laws.length > 0
            ? `${laws.length} laws from the five books of Torah — search, filter, and study`
            : "Loading..."}
        </p>
      </div>

      <div className="mb-6">
        <LawFilters
          search={search}
          onSearchChange={setSearch}
          book={book}
          onBookChange={setBook}
          commandType={commandType}
          onCommandTypeChange={setCommandType}
          applicability={applicability}
          onApplicabilityChange={setApplicability}
        />
      </div>

      {!loading && (
        <div className="text-sm text-[var(--text-muted)] mb-3">
          Showing {filtered.length} of {laws.length} laws
        </div>
      )}

      <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] rounded-lg overflow-hidden">
        {loading && (
          <p className="text-center text-[var(--text-muted)] py-12">
            Loading laws...
          </p>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-[var(--text-muted)] py-12">
            No laws match your filters.
          </p>
        )}
        {filtered.map((law) => (
          <LawRow key={law.id} law={law} />
        ))}
      </div>
    </div>
  );
}
