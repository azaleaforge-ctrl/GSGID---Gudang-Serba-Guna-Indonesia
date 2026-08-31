import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import Client from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Paklaring / Surat Keterangan Kerja, Nomor, Periode, Stempel",
  description:
    "Buat paklaring gratis: nomor, periode kerja, jabatan, NIK, stempel. Kop perusahaan garis ganda, preview A4 = PDF.",
  alternates: { canonical: "/karir/paklaring" },
  openGraph: {
    title: "Paklaring, Stempel",
    description: "Keterangan kerja formal berstempel.",
    url: `${siteConfig.url}/karir/paklaring`,
  },
});
export default function Page() {
  return <Client />;
}
