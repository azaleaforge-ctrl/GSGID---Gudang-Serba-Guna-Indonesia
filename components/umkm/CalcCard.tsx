"use client";
export function CalcCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 ${accent ? "border-[#1C1917] bg-[#1C1917] text-white shadow-[4px_4px_0_#EA580C]" : "border-[#1C1917] bg-white shadow-[4px_4px_0_#1C1917]"}`}
    >
      <p
        className={`font-mono text-[10px] tracking-[0.16em] font-bold ${accent ? "text-[#FDE68A]" : "text-[#78716C]"}`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-mono font-black tracking-tight text-[18px] ${accent ? "text-white" : "text-[#1C1917]"}`}
      >
        {value}
      </p>
      {sub && (
        <p className={`mt-1 text-xs leading-4 ${accent ? "text-[#FDE68A]/80" : "text-[#57534E]"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}
