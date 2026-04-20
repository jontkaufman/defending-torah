"use client";

export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => window.print()}
      className={`btn font-mono text-[10px] tracking-[0.18em] uppercase bg-ochre text-white border-none px-4 py-2 cursor-pointer ${className}`}
    >
      Print / Save PDF ↓
    </button>
  );
}
