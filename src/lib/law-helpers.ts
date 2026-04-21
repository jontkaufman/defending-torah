// Shared constants and helpers for Torah Law views

export const OBSERVANCE_CONFIG: Record<
  string,
  { label: string; symbol: string; color: string }
> = {
  already_observing: { label: "Christians Already Do", symbol: "\u2714", color: "#5c6b3f" },
  should_observe: { label: "Should Observe", symbol: "\u2605", color: "#975e22" },
  situational: { label: "Situational", symbol: "\u25C7", color: "#6a7a8a" },
  observe_in_principle: { label: "Observe in Principle", symbol: "\u25CB", color: "#8a6b3f" },
  cannot_currently_observe: { label: "Cannot Currently Observe", symbol: "\u29B8", color: "#7a2e24" },
  aware_in_principle: { label: "Aware in Principle", symbol: "\u25B3", color: "#574e40" },
  voluntary: { label: "Voluntary", symbol: "\u2661", color: "#6a4a7a" },
};

export const BOOK_NAMES: Record<number, string> = {
  1: "Genesis", 2: "Exodus", 3: "Leviticus", 4: "Numbers", 5: "Deuteronomy",
  6: "Joshua", 7: "Judges", 8: "Ruth", 9: "1 Samuel", 10: "2 Samuel",
  11: "1 Kings", 12: "2 Kings", 13: "1 Chronicles", 14: "2 Chronicles",
  15: "Ezra", 16: "Nehemiah", 17: "Esther", 18: "Job", 19: "Psalms",
  20: "Proverbs", 21: "Ecclesiastes", 22: "Song of Solomon", 23: "Isaiah",
  24: "Jeremiah", 25: "Lamentations", 26: "Ezekiel", 27: "Daniel",
  28: "Hosea", 29: "Joel", 30: "Amos", 31: "Obadiah", 32: "Jonah",
  33: "Micah", 34: "Nahum", 35: "Habakkuk", 36: "Zephaniah", 37: "Haggai",
  38: "Zechariah", 39: "Malachi", 40: "Matthew", 41: "Mark", 42: "Luke",
  43: "John", 44: "Acts", 45: "Romans", 46: "1 Corinthians",
  47: "2 Corinthians", 48: "Galatians", 49: "Ephesians", 50: "Philippians",
  51: "Colossians", 52: "1 Thessalonians", 53: "2 Thessalonians",
  54: "1 Timothy", 55: "2 Timothy", 56: "Titus", 57: "Philemon",
  58: "Hebrews", 59: "James", 60: "1 Peter", 61: "2 Peter", 62: "1 John",
  63: "2 John", 64: "3 John", 65: "Jude", 66: "Revelation",
};

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "it", "its", "that", "this", "was",
  "are", "be", "has", "had", "have", "he", "she", "his", "her", "him",
  "you", "your", "they", "them", "their", "we", "our", "who", "whom",
  "which", "what", "will", "shall", "may", "not", "no", "nor", "if",
  "as", "so", "do", "did", "does", "been", "being", "were", "am", "i",
  "me", "my", "all", "each", "every", "any", "one", "two", "into",
  "out", "up", "also", "than", "then", "said", "says", "say", "when",
  "there", "here", "more", "must", "about", "over", "such", "after",
  "before", "these", "those", "own", "how", "because", "would", "could",
  "should", "make", "can", "upon", "let", "us", "come", "came", "give",
  "gave", "take", "took", "went", "go", "among", "through", "under",
]);

export function extractKeywords(text: string, maxCount = 12): string[] {
  if (!text) return [];
  const words = text
    .replace(/["""''.,;:!?()[\]{}<>—–\-/\\]/g, " ")
    .split(/\s+/)
    .map((w) => w.toLowerCase().trim())
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w) && !/^\d+$/.test(w));
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const w of words) {
    if (!seen.has(w)) {
      seen.add(w);
      unique.push(w);
    }
  }
  return unique.slice(0, maxCount);
}
