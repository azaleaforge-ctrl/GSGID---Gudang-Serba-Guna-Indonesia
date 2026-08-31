import Link from "next/link";
import type { Metadata } from "next";

import { DonateButton } from "@/components/shared/DonateButton";
import { ScrollLogo } from "@/components/shared/ScrollLogo";

import { buildMetadata, siteConfig } from "@/lib/seo";

// — Metadata —
export const metadata: Metadata = buildMetadata({
  title: "Lorong UMKM, Tools Gratis UMKM Indonesia",
  description:
    "6 tools gratis UMKM: kalkulator HPP, BEP, cicilan bunga flat vs efektif, diskon bertingkat, generator invoice & kwitansi PDF. Live preview 1:1, tanpa login.",
  alternates: { canonical: "/umkm" },
  openGraph: {
    title: "Lorong UMKM, Tools Gratis untuk yang Jualan",
    description:
      "Hitung HPP, BEP, cicilan & diskon akurat. Buat invoice & kwitansi PDF 1:1 preview. Gratis, offline, data di device.",
    url: `${siteConfig.url}/umkm`,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: "Lorong UMKM, GSG ID", type: "image/png" }],
  },
});

// — Header —
function UmkmHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#1C1917] bg-[#FFFBEB]/90 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 h-[64px]">
        <ScrollLogo variant="umkm" size="sm" label="Kembali ke atas Lorong UMKM">
          <span className="hidden sm:inline-flex items-center rounded-full bg-[#1C1917] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#FFFBEB]">
            LORONG 01
          </span>
        </ScrollLogo>
        <nav className="flex items-center gap-2 sm:gap-3">
          <DonateButton variant="header" />
        </nav>
      </div>
    </header>
  );
}

// — BottomNav (mobile) —
function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation UMKM"
      className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[#1C1917] bg-[#FFFBEB] md:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-3 h-[64px] text-center">
        <div className="flex flex-col items-center justify-center gap-1 bg-[#1C1917] text-white">
          <span className="font-mono text-[10px] tracking-[0.16em] font-bold">LORONG</span>
          <span className="font-mono text-[9px] tracking-widest opacity-70">UMKM</span>
        </div>
        <Link
          href="/umkm/kalkulator-hpp"
          className="flex flex-col items-center justify-center gap-1"
        >
          <span className="font-mono text-[11px] font-bold text-[#1C1917]">HPP</span>
          <span className="font-mono text-[8px] tracking-widest text-[#57534E]">HITUNG</span>
        </Link>
        <Link
          href="/umkm/generator-invoice"
          className="flex flex-col items-center justify-center gap-1 border-l border-[#FDE68A]"
        >
          <span className="font-mono text-[11px] font-bold text-[#EA580C]">INV</span>
          <span className="font-mono text-[8px] tracking-widest text-[#57534E]">CETAK</span>
        </Link>
      </div>
    </nav>
  );
}

// — Layout —
export default function UmkmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-[#FFFBEB] text-[#1C1917]">
      <UmkmHeader />
      <main className="flex-1 pb-[72px] md:pb-0">{children}</main>
      <footer className="border-t-2 border-[#1C1917] bg-[#1C1917] text-[#FFFBEB] py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.14em] opacity-70">
            © 2026 GSG ID, LORONG UMKM, gsgid.vercel.app/umkm
          </p>
          <div className="flex items-center gap-3">
            <DonateButton variant="footer" />
          </div>
        </div>
      </footer>
      <BottomNav />
    </div>
  );
}
