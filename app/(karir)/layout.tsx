import Link from "next/link";
import type { Metadata } from "next";

import { DonateButton } from "@/components/shared/DonateButton";
import { ScrollLogo } from "@/components/shared/ScrollLogo";

import { buildMetadata, siteConfig } from "@/lib/seo";

// — Metadata —
export const metadata: Metadata = buildMetadata({
  title: "Lorong Karir, Tools Gratis CV ATS & Surat Kerja",
  description:
    "6 tools gratis karir: CV ATS, surat lamaran EYD, surat resign, paklaring, perjanjian kerja, surat pernyataan. Preview 1:1 PDF, tanpa login, data di device.",
  alternates: { canonical: "/karir" },
  openGraph: {
    title: "Lorong Karir, Tools Gratis Pejuang Karir",
    description:
      "CV ATS searchable, surat lamaran EYD PUEBI, resign, paklaring, perjanjian kerja & pernyataan. Export PDF A4 presisi.",
    url: `${siteConfig.url}/karir`,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: "Lorong Karir, GSG ID", type: "image/png" }],
  },
});

// — Header —
function KarirHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 h-[64px]">
        <ScrollLogo variant="karir" size="sm" label="Kembali ke atas Lorong Karir">
          <span className="hidden sm:inline-flex items-center rounded-full bg-[#0F172A] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white">
            LORONG 02
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
      aria-label="Mobile navigation Karir"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E2E8F0] bg-white md:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-3 h-[64px] text-center">
        <div className="flex flex-col items-center justify-center gap-1 bg-[#0F172A] text-white">
          <span className="font-mono text-[10px] tracking-[0.16em] font-bold">LORONG</span>
          <span className="font-mono text-[9px] tracking-widest opacity-70">KARIR</span>
        </div>
        <Link href="/karir/cv-ats" className="flex flex-col items-center justify-center gap-1">
          <span className="font-mono text-[11px] font-bold text-[#0F172A]">CV</span>
          <span className="font-mono text-[8px] tracking-widest text-[#64748B]">ATS</span>
        </Link>
        <Link
          href="/karir/surat-lamaran"
          className="flex flex-col items-center justify-center gap-1 border-l border-[#E2E8F0]"
        >
          <span className="font-mono text-[11px] font-bold text-[#2563EB]">LAMARAN</span>
          <span className="font-mono text-[8px] tracking-widest text-[#64748B]">SURAT</span>
        </Link>
      </div>
    </nav>
  );
}

// — Layout —
export default function KarirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-[#0F172A]">
      <KarirHeader />
      <main className="flex-1 pb-[72px] md:pb-0 bg-white">{children}</main>
      <footer className="border-t border-[#E2E8F0] bg-[#0F172A] text-white py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.14em] opacity-60">
            © 2026 GSG ID, LORONG KARIR, gsg.id/karir
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
