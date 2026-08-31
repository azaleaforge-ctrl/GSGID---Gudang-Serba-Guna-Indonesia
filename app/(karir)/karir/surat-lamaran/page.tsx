import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import Client from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Surat Lamaran Kerja Generator, EYD PUEBI, A4 25mm",
  description:
    "Buat surat lamaran kerja EYD PUEBI: kop, tanggal formal Indonesia, nomor/lampiran/hal, biodata pelamar, lampiran. Preview A4 25mm margin = PDF.",
  alternates: { canonical: "/karir/surat-lamaran" },
  openGraph: {
    title: "Surat Lamaran, EYD PUEBI",
    description: "Lamaran formal EYD, preview = PDF A4.",
    url: `${siteConfig.url}/karir/surat-lamaran`,
  },
});

export default function Page() {
  return <Client />;
}
