interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

export function TagBadge({ tag, active, onClick }: TagBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        active
          ? "bg-[var(--accent)] text-white"
          : "bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--accent)]"
      }`}
    >
      {tag}
    </button>
  );
}
