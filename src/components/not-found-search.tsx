"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/search-input";

export function NotFoundSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/articles?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search articles, objections, topics..."
      />
    </div>
  );
}
