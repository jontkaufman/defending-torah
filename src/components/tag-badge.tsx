import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

export function TagBadge({ tag, active, onClick }: TagBadgeProps) {
  const className = `font-mono text-[10px] tracking-[0.15em] uppercase transition-colors mr-1 no-underline ${
    active
      ? "text-ink font-medium border-b border-ink"
      : "text-ink-light hover:text-ink"
  }`;

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {tag}
      </button>
    );
  }

  return (
    <Link href={`/articles?q=${encodeURIComponent(tag)}`} className={className}>
      {tag}
    </Link>
  );
}
