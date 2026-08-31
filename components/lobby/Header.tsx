"use client";
import { DonateButton } from "@/components/shared/DonateButton";
import { ScrollLogo } from "@/components/shared/ScrollLogo";

import { useIsMobile } from "@/hooks/useIsMobile";

export function Header() {
  const { isMobile } = useIsMobile();
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--lobby-border)] bg-[var(--lobby-bg)]/80 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 h-[64px]">
        <ScrollLogo variant="light" size="sm" label="Kembali ke atas beranda"></ScrollLogo>

        {!isMobile ? (
          <nav className="flex items-center gap-6" aria-label="Primary">
            <a
              href="#lorong"
              className="font-mono text-[11px] tracking-[0.14em] text-[var(--lobby-muted)] hover:text-black transition-colors"
            >
              LORONG
            </a>
            <a
              href="#fitur"
              className="font-mono text-[11px] tracking-[0.14em] text-[var(--lobby-muted)] hover:text-black transition-colors"
            >
              FITUR
            </a>
            <a
              href="#faq"
              className="font-mono text-[11px] tracking-[0.14em] text-[var(--lobby-muted)] hover:text-black transition-colors"
            >
              FAQ
            </a>
            <div className="h-6 w-px bg-[var(--lobby-border)]" />
            <DonateButton variant="header" />
          </nav>
        ) : (
          <DonateButton variant="header" />
        )}
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E8E6E1] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-4 h-[64px]">
        <a
          href="#lorong"
          className="flex flex-col items-center justify-center gap-1 text-[#0A0A0A]"
        >
          <span className="h-1.5 w-6 rounded-full bg-[#EA580C]" />
          <span className="font-mono text-[10px] tracking-[0.16em] font-semibold">UMKM</span>
        </a>
        <a
          href="#lorong"
          className="flex flex-col items-center justify-center gap-1 text-[#0F172A] border-l border-[#E8E6E1]"
        >
          <span className="h-1.5 w-6 rounded-full bg-[#2563EB]" />
          <span className="font-mono text-[10px] tracking-[0.16em] font-semibold">KARIR</span>
        </a>
        <a
          href="#lorong"
          className="flex flex-col items-center justify-center gap-1 text-[#0A0A0A] border-l border-[#E8E6E1]"
        >
          <span className="h-1.5 w-6 rounded-full bg-[#22C55E]" />
          <span className="font-mono text-[10px] tracking-[0.16em] font-semibold">DEV</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center gap-1 border-l border-[#E8E6E1]"
        >
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#6B6B63]">GSG ID</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
        </a>
      </div>
    </nav>
  );
}
