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
  observance_class?: string;
  other_torah_refs?: string | string[];
  preview?: string;
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

// Display config for the 10 Commandments level
// `order` controls rendering position within each root group
export const LEVEL2_CONFIG: Record<
  string,
  { label: string; short: string; order: number }
> = {
  // LOVE_GOD (1–5)
  KNOW_FEAR_CLING: { label: "No Other Gods", short: "1", order: 1 },
  NO_IDOLATRY: { label: "No Idols", short: "2", order: 2 },
  GODS_NAME: { label: "Do Not Take Yahweh's Name in Vain", short: "3", order: 3 },
  SACRED_TIMES: { label: "Honor the Sabbath", short: "4", order: 4 },
  HONOR_PARENTS: { label: "Honor Your Parents", short: "5", order: 5 },
  PRIESTHOOD_AND_SANCTUARY: { label: "Priesthood & Sanctuary", short: "—", order: 10 },
  PURITY_AND_HOLINESS: { label: "Purity & Holiness", short: "—", order: 11 },
  WORSHIP_AND_OFFERINGS: { label: "Worship & Offerings", short: "—", order: 12 },
  VOWS_AND_DEDICATIONS: { label: "Vows & Dedications", short: "—", order: 13 },
  // LOVE_NEIGHBOR (6–10)
  NO_MURDER: { label: "You Shall Not Murder", short: "6", order: 1 },
  NO_ADULTERY: { label: "You Shall Not Commit Adultery", short: "7", order: 2 },
  NO_STEAL: { label: "You Shall Not Steal", short: "8", order: 3 },
  NO_FALSE_WITNESS: { label: "You Shall Not Bear False Witness", short: "9", order: 4 },
  NO_COVET: { label: "You Shall Not Covet", short: "10", order: 5 },
  COMPASSION_AND_CARE: { label: "Compassion & Care", short: "—", order: 10 },
  WARFARE_AND_NATIONAL_LIFE: { label: "Warfare & National Life", short: "—", order: 11 },
};

export const ROOT_LABELS: Record<string, { label: string; hebrew: string }> = {
  LOVE_GOD: { label: "Love Yahweh", hebrew: "אָהַבְתָּ אֵת יהוה" },
  LOVE_NEIGHBOR: { label: "Love Your Neighbor", hebrew: "וְאָהַבְתָּ לְרֵעֲךָ" },
};

export interface HierarchyNode {
  _laws: Law[];
  _children: Record<string, HierarchyNode>;
}

export function buildHierarchyTree(laws: Law[]): Record<string, HierarchyNode> {
  const tree: Record<string, HierarchyNode> = {};

  laws.forEach((law) => {
    const paths = law.categories || [];
    paths.forEach((path) => {
      const parts = path.split(" > ").map((s) => s.trim());
      let node = tree;
      parts.forEach((part, depth) => {
        if (!node[part]) node[part] = { _laws: [], _children: {} };
        if (depth === parts.length - 1) {
          node[part]._laws.push(law);
        }
        node = node[part]._children;
      });
    });
  });

  return tree;
}

function countLawsInNode(node: HierarchyNode): number {
  let count = node._laws.length;
  for (const child of Object.values(node._children)) {
    count += countLawsInNode(child);
  }
  return count;
}

export { countLawsInNode };

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
