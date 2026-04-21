"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className="search-editorial"
        aria-label={placeholder ?? "Search articles and objections"}
      />
      <span className="absolute right-0 bottom-4 font-mono text-[10px] tracking-[0.2em] uppercase text-muted pointer-events-none">
        ⌕
      </span>
    </div>
  );
}
