export interface Law {
  id: number;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  verse_text: string;
  law_summary: string;
  command_type: string;
  regulated_party: string;
  duration_type: string;
  has_forever_language: number;
  forever_phrase: string | null;
  has_generational_language: number;
  generational_phrase: string | null;
  requires_temple: string;
  requires_priesthood: string;
  requires_land_israel: string;
  requires_specific_role: string | null;
  current_applicability: string;
  classification_reasoning: string;
  textual_evidence: string;
  interpretive_questions: string;
  categories: string[];
  cross_references: string[];
  notes: string;
}

export const BOOKS = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
];

export const COMMAND_TYPES = [
  "obligation",
  "prohibition",
  "conditional",
  "procedural",
];

export const APPLICABILITY = [
  "currently_applicable",
  "requires_temple",
  "requires_priesthood",
  "requires_land_israel",
  "requires_specific_role",
];

export function filterLaws(
  laws: Law[],
  filters: {
    search?: string;
    book?: string;
    commandType?: string;
    applicability?: string;
  },
): Law[] {
  return laws.filter((law) => {
    if (filters.book && law.book !== filters.book) return false;
    if (filters.commandType && law.command_type !== filters.commandType)
      return false;
    if (
      filters.applicability &&
      law.current_applicability !== filters.applicability
    )
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        law.reference.toLowerCase().includes(q) ||
        law.law_summary.toLowerCase().includes(q) ||
        law.verse_text.toLowerCase().includes(q)
      );
    }
    return true;
  });
}
