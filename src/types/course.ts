export type MemoryVerse = {
  ref: string;
  text: string;
};

export type Session = {
  id: number;
  title: string;
  big_idea: string;
  opening_q: string;
  scriptures: string[];
  teaching: string;
  misunderstanding: string;
  response: string;
  application: string;
  discussion: string[];
  homework: string[];
};

export type Week = {
  num: number;
  title: string;
  subtitle: string;
  memory_verse: MemoryVerse;
  sessions: Session[];
};

export type Pillar = {
  num: string;
  title: string;
  body: string;
};

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  weeks: number;
  total_sessions: number;
  level: string;
  pillars: Pillar[];
  weeks_data: Week[];
};
