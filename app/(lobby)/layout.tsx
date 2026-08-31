import type { Metadata } from "next";
import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "GSG ID : Gudang Serba Guna: Tools UMKM, Karir & Developer Gratis",
  description:
    "Satu domain, 3 lorong, 30+ tools gratis Indonesia. Lorong UMKM: HPP, BEP, cicilan, diskon, invoice & kwitansi. Lorong Karir: CV ATS, surat lamaran, resign, paklaring. Lorong DEV: JSON, JWT, hash, base64, regex, cron. Tanpa login, data di device.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "GSG ID : Gudang Serba Guna: Tools UMKM, Karir & Developer Gratis",
    description:
      "30+ tools gratis untuk UMKM, pejuang karir & developer Indonesia. Hitung HPP, buat CV ATS, format JSON. Tanpa login, tanpa paywall, langsung pakai.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GSG ID : Gudang Serba Guna: Tools UMKM, Karir & Developer Gratis",
    description:
      "30+ tools gratis UMKM, Karir & Developer. Tanpa login, gratis selamanya di gsg.id.",
    images: [`${siteConfig.url}/opengraph-image`],
  },
});

export default function LobbyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
