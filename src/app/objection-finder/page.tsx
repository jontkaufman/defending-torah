import { getObjections } from "@/lib/content";
import { ObjectionFinderClient } from "@/components/objection-finder-client";

export default function ObjectionFinderPage() {
  const objections = getObjections().map((o) => o.meta);
  return <ObjectionFinderClient objections={objections} />;
}
