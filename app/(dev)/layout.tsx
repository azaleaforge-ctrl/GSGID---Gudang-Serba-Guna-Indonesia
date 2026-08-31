import Link from "next/link";
import type { Metadata } from "next";

import { DonateButton } from "@/components/shared/DonateButton";
import { ScrollLogo } from "@/components/shared/ScrollLogo";

import { buildMetadata, siteConfig } from "@/lib/seo";

// — Metadata —
export const metadata: Metadata = buildMetadata({
  title: "Lorong DEV, Tools Gratis Developer Indonesia",
  description:
    "6 tools gratis DEV: JSON formatter, JWT debugger, hash, base64, regex, cron parser. Terminal preview, tanpa login, data di device.",
  alternates: { canonical: "/dev" },
  openGraph: {
    title: "Lorong DEV, Tools Gratis Developer",
    description: "JSON, JWT, hash, base64, regex, cron. Terminal 1:1 preview, gratis, offline.",
    url: `${siteConfig.url}/dev`,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      { url: `${siteConfig.url}/dev/opengraph-image`, width: 1200, height: 630, alt: "Lorong DEV, GSG ID", type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorong DEV, Tools Gratis Developer",
    description: "JSON, JWT, hash, base64, regex, cron. Terminal 1:1 preview, gratis, offline.",
    images: [`${siteConfig.url}/dev/opengraph-image`],
  },
});

// — Header —
function DevHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1F2937] bg-[#0A0A0A]/90 backdrop-blur-[12px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 h-[64px]">
        <ScrollLogo variant="dev" size="sm" label="Kembali ke atas Lorong DEV">
          <span className="hidden sm:inline-flex items-center rounded-full bg-[#22C55E] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#0A0A0A] font-bold">
            LORONG 03
          </span>
          <span className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-[#6B7280]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />● online
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
      aria-label="Mobile navigation DEV"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1F2937] bg-[#0A0A0A] md:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-3 h-[64px] text-center">
        <div className="flex flex-col items-center justify-center gap-1 bg-[#111111] text-[#22C55E] border-r border-[#1F2937]">
          <span className="font-mono text-[10px] tracking-[0.16em] font-bold">LORONG</span>
          <span className="font-mono text-[9px] tracking-widest opacity-70">DEV</span>
        </div>
        <Link
          href="/dev/json-formatter"
          className="flex flex-col items-center justify-center gap-1"
        >
          <span className="font-mono text-[11px] font-bold text-[#E5E7EB]">JSON</span>
          <span className="font-mono text-[8px] tracking-widest text-[#6B7280]">FORMAT</span>
        </Link>
        <Link
          href="/dev/jwt-debugger"
          className="flex flex-col items-center justify-center gap-1 border-l border-[#1F2937]"
        >
          <span className="font-mono text-[11px] font-bold text-[#FACC15]">JWT</span>
          <span className="font-mono text-[8px] tracking-widest text-[#6B7280]">VERIFY</span>
        </Link>
      </div>
    </nav>
  );
}

// — Layout —
export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-[#0A0A0A] text-[#E5E7EB]">
      <DevHeader />
      <main className="flex-1 pb-[72px] md:pb-0">{children}</main>
      <footer className="border-t border-[#1F2937] bg-[#0A0A0A] py-6">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#6B7280]">
            © 2026 GSG ID, LORONG DEV, gsgid.vercel.app/dev
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
