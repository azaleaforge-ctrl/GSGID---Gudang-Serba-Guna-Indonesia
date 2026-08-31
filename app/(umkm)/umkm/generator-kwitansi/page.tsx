import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import KwitansiClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Generator Kwitansi & Nota UMKM, PDF Landscape 1:1",
  description:
    "Buat kwitansi & nota UMKM: preview live persis sama dengan PDF landscape. Terbilang otomatis, metode pembayaran, tanda tangan & cap.",
  alternates: { canonical: "/umkm/generator-kwitansi" },
  openGraph: {
    title: "Generator Kwitansi, Live Preview = PDF",
    description: "Kwitansi & Nota, terbilang otomatis, export PDF.",
    url: `${siteConfig.url}/umkm/generator-kwitansi`,
    type: "website",
  },
});

export default function Page() {
  return <KwitansiClient />;
}
