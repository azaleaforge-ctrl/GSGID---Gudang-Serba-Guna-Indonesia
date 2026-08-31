import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import Client from "./client";

export const metadata: Metadata = buildMetadata({
  title: "CV ATS Generator, Skor Live, 1 Halaman, Searchable PDF",
  description:
    "Buat CV ATS-friendly gratis: biodata, ringkasan, pengalaman, pendidikan, skill. Skor ATS 0–100 live, preview A4 Helvetica tanpa tabel/grafik, export PDF searchable 15mm margin.",
  alternates: { canonical: "/karir/cv-ats" },
  openGraph: {
    title: "CV ATS Generator, Preview 1:1 PDF",
    description: "CV 1 halaman ATS, skor live, export searchable PDF.",
    url: `${siteConfig.url}/karir/cv-ats`,
  },
});

export default function Page() {
  return <Client />;
}
