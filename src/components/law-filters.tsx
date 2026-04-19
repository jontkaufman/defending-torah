"use client";

import { BOOKS, COMMAND_TYPES, APPLICABILITY } from "@/lib/laws";
import { SearchInput } from "./search-input";

interface LawFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  book: string;
  onBookChange: (v: string) => void;
  commandType: string;
  onCommandTypeChange: (v: string) => void;
  applicability: string;
  onApplicabilityChange: (v: string) => void;
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}

export function LawFilters(props: LawFiltersProps) {
  return (
    <div className="space-y-3">
      <SearchInput
        value={props.search}
        onChange={props.onSearchChange}
        placeholder="Search by verse or keyword..."
      />
      <div className="flex gap-3 flex-wrap">
        <Select
          value={props.book}
          onChange={props.onBookChange}
          options={BOOKS}
          placeholder="All Books"
        />
        <Select
          value={props.commandType}
          onChange={props.onCommandTypeChange}
          options={COMMAND_TYPES}
          placeholder="All Types"
        />
        <Select
          value={props.applicability}
          onChange={props.onApplicabilityChange}
          options={APPLICABILITY}
          placeholder="All Applicability"
        />
      </div>
    </div>
  );
}
