export function MonoLabel({
  children,
  color = "var(--crimson)",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`font-mono text-[10.5px] tracking-[0.28em] uppercase ${className}`}
      style={{ color }}
    >
      {children}
    </div>
  );
}
