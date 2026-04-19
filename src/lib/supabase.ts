import { createClient } from "@supabase/supabase-js";
import type { Law } from "./laws";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

interface CategoryRow {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  root_command: string | null;
  depth: number;
}

function buildCategoryPaths(categories: CategoryRow[]): Map<number, string> {
  const byId = new Map<number, CategoryRow>();
  for (const c of categories) byId.set(c.id, c);

  const pathCache = new Map<number, string>();

  function getPath(id: number): string {
    if (pathCache.has(id)) return pathCache.get(id)!;
    const cat = byId.get(id);
    if (!cat) return "";

    let segment: string;
    if (cat.depth === 0) {
      segment = cat.root_command?.toUpperCase() ?? cat.slug.toUpperCase().replace(/-/g, "_");
    } else if (cat.depth === 1) {
      segment = cat.slug.toUpperCase().replace(/-/g, "_");
    } else {
      segment = cat.name;
    }

    if (cat.parent_id != null) {
      const parentPath = getPath(cat.parent_id);
      const full = parentPath ? `${parentPath} > ${segment}` : segment;
      pathCache.set(id, full);
      return full;
    }

    pathCache.set(id, segment);
    return segment;
  }

  for (const c of categories) getPath(c.id);
  return pathCache;
}

const BOOK_NAMES: Record<number, string> = {
  1: "Genesis",
  2: "Exodus",
  3: "Leviticus",
  4: "Numbers",
  5: "Deuteronomy",
};

export async function fetchLaws(): Promise<Law[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    // Fetch categories first
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("id, name, slug, parent_id, root_command, depth");

    if (catError || !categories) throw catError;

    const categoryPaths = buildCategoryPaths(categories as CategoryRow[]);

    // Fetch laws with related data
    const { data: laws, error: lawError } = await supabase
      .from("laws")
      .select(`
        *,
        books(name),
        perpetuity_analysis(*),
        law_categories(category_id),
        cross_references(reference)
      `);

    if (lawError || !laws) throw lawError;

    return laws.map((row: Record<string, unknown>) => {
      const pa = Array.isArray(row.perpetuity_analysis)
        ? row.perpetuity_analysis[0]
        : row.perpetuity_analysis;

      const bookObj = row.books as { name: string } | null;

      const categories = ((row.law_categories as { category_id: number }[]) || [])
        .map((lc) => categoryPaths.get(lc.category_id))
        .filter((p): p is string => !!p);

      const crossRefs = ((row.cross_references as { reference: string }[]) || [])
        .map((cr) => cr.reference);

      return {
        id: row.id as number,
        reference: (row.reference as string) ?? `${bookObj?.name ?? BOOK_NAMES[(row.book_id as number)] ?? ""} ${row.chapter}:${row.verse}`,
        book: bookObj?.name ?? BOOK_NAMES[(row.book_id as number)] ?? "",
        chapter: row.chapter as number,
        verse: row.verse as number,
        verse_text: row.verse_text as string,
        law_summary: row.law_summary as string,
        command_type: row.command_type as string,
        regulated_party: (row.regulated_party as string) ?? "all Israel",
        duration_type: pa?.duration ?? "",
        has_forever_language: pa?.has_forever_language ? 1 : 0,
        forever_phrase: pa?.forever_phrase ?? null,
        has_generational_language: pa?.has_generational_language ? 1 : 0,
        generational_phrase: pa?.generational_phrase ?? null,
        requires_temple: pa?.requires_temple ?? "no",
        requires_priesthood: pa?.requires_priesthood ?? "no",
        requires_land_israel: pa?.requires_land_israel ?? "no",
        requires_specific_role: pa?.requires_specific_role ?? null,
        current_applicability: pa?.current_applicability ?? "",
        classification_reasoning: pa?.classification_reasoning ?? "",
        textual_evidence: pa?.textual_evidence ?? "",
        interpretive_questions: pa?.interpretive_questions ?? "",
        categories,
        cross_references: crossRefs,
        notes: pa?.study_notes ?? "",
        observance_class: pa?.observance_class ?? undefined,
        other_torah_refs: pa?.other_torah_refs ?? undefined,
        preview: pa?.preview ?? undefined,
      } satisfies Law;
    });
  } catch (err) {
    console.error("Supabase fetch failed, falling back to static JSON:", err);
    const res = await fetch("/laws-data.json");
    return res.json();
  }
}
