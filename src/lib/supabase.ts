import type { Law } from "./laws";

async function fetchStaticLaws(): Promise<Law[]> {
  const res = await fetch("/laws-data.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchLaws(): Promise<Law[]> {
  try {
    return await fetchStaticLaws();
  } catch (err) {
    console.error("Static laws fetch failed:", err);
    return [];
  }
}
