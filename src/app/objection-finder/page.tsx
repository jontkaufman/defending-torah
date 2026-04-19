import type { Metadata } from "next";
import { getObjections } from "@/lib/content";
import { ObjectionFinderClient } from "@/components/objection-finder-client";

export const metadata: Metadata = {
  title: "Objection Finder — Common Arguments Against Torah, Answered",
  description:
    "Search 15+ common objections to Torah observance with quick answers, key points, and full verse-by-verse analysis.",
};

export default function ObjectionFinderPage() {
  const objections = getObjections().map((o) => o.meta);
  return <ObjectionFinderClient objections={objections} />;
}
