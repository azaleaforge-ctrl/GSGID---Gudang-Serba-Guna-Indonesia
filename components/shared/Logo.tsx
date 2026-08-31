"use client";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "umkm" | "karir" | "dev";
type Size = "sm" | "md" | "lg";

const palette: Record<Variant, { fg: string; outline: string; sub: string }> = {
  light: { fg: "#0A0A0A", outline: "transparent", sub: "#6B6B63" },
  dark: { fg: "#FDFCF8", outline: "#FDFCF8", sub: "#A8A6A0" },
  umkm: { fg: "#1C1917", outline: "#1C1917", sub: "#EA580C" },
  karir: { fg: "#0F172A", outline: "#0F172A", sub: "#2563EB" },
  dev: { fg: "#E5E7EB", outline: "#E5E7EB", sub: "#22C55E" },
};

const sizes: Record<Size, { gsg: string; id: string; sub: string; gap: string }> = {
  sm: {
    gsg: "text-[22px]",
    id: "text-[22px]",
    sub: "text-[7px] tracking-[0.28em]",
    gap: "gap-[3px]",
  },
  md: {
    gsg: "text-[30px] md:text-[34px]",
    id: "text-[30px] md:text-[34px]",
    sub: "text-[8px] md:text-[9px] tracking-[0.32em]",
    gap: "gap-[4px]",
  },
  lg: {
    gsg: "text-[42px] md:text-[56px]",
    id: "text-[42px] md:text-[56px]",
    sub: "text-[9px] md:text-[11px] tracking-[0.34em]",
    gap: "gap-[6px]",
  },
};

export function Logo({
  variant = "light",
  size = "md",
  withSubtitle = true,
  className,
}: {
  variant?: Variant;
  size?: Size;
  withSubtitle?: boolean;
  className?: string;
}) {
  const c = palette[variant];
  const s = sizes[size];
  return (
    <div
      className={cn("inline-flex flex-col leading-none select-none", className)}
      aria-label="GUDANG SERBA GUNA ID"
    >
      <div
        className={cn(
          "flex items-baseline font-jakarta font-black tracking-[-0.04em] leading-none",
          s.gap
        )}
      >
        <span className={cn(s.gsg, "font-black")} style={{ color: c.fg, letterSpacing: "-0.05em" }}>
          GSG
        </span>
        {/* ID outline */}
        <span
          className={cn(s.id, "font-black")}
          style={{
            color: "transparent",
            WebkitTextStroke: `1.4px ${variant === "light" ? "#0A0A0A" : c.outline}`,
            // fallback for outline on dark
            ...(variant === "dark" ? { WebkitTextStroke: "1.4px #FDFCF8" } : {}),
            letterSpacing: "-0.04em",
            marginLeft: "-1px",
          }}
          aria-hidden
        >
          ID
        </span>
        <span
          className="ml-[6px] h-[18px] w-[2px] md:h-[22px] self-center bg-current opacity-10"
          style={{ color: c.fg }}
        />
        <span
          className="ml-[6px] font-mono text-[9px] font-medium tracking-[0.18em] leading-none self-center opacity-60 hidden sm:inline"
          style={{ color: c.fg }}
        >
          EST.2026
        </span>
      </div>
      {withSubtitle && (
        <span
          className={cn("font-mono font-medium uppercase mt-[2px] md:mt-[4px] leading-none", s.sub)}
          style={{ color: c.sub }}
        >
          GUDANG SERBA GUNA
        </span>
      )}
    </div>
  );
}

// SVG emblem variant for OG / favicon use
export function LogoMark({ variant = "light", size = 40 }: { variant?: Variant; size?: number }) {
  const c = palette[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect width={40} height={40} rx={8} fill={c.fg} />
      <text
        x={20}
        y={24}
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight={900}
        fontSize={16}
        letterSpacing="-0.06em"
        fill={variant === "dark" || variant === "light" ? "#FDFCF8" : "#FFFBEB"}
      >
        GSG
      </text>
    </svg>
  );
}
