export function ProgressBar({
  value,
  color = "var(--olive)",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="h-1 bg-parchment-shadow rounded-sm overflow-hidden">
      <div
        className="h-full rounded-sm transition-[width] duration-500"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}
