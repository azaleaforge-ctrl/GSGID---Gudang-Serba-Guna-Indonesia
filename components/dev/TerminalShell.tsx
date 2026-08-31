"use client";

export function TerminalShell({
  title = "gsg@dev : zsh : 80x24",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[#1F2937] bg-[#0A0A0A] shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_0_1px_rgba(34,197,94,0.08)] will-change-transform ${className}`}
      style={{ contain: "layout paint" }}
    >
      <div className="flex items-center gap-3 border-b border-[#1F2937] bg-[#111111] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#EF4444] border border-white/10" />
          <span className="h-3 w-3 rounded-full bg-[#FACC15] border border-white/10" />
          <span className="h-3 w-3 rounded-full bg-[#22C55E] border border-white/10" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-[11px] tracking-[0.12em] text-[#6B7280]">{title}</span>
        </div>
        <div className="w-[48px]" aria-hidden />
      </div>
      <div className="bg-[#0A0A0A]">{children}</div>
    </div>
  );
}

export function TerminalHeaderDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-full bg-[#EF4444] border border-white/10" />
      <span className="h-3 w-3 rounded-full bg-[#FACC15] border border-white/10" />
      <span className="h-3 w-3 rounded-full bg-[#22C55E] border border-white/10" />
    </div>
  );
}
