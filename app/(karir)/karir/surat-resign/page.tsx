import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import Client from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Surat Pengunduran Diri (Resign), Formal, Tanggal Efektif",
  description:
    "Buat surat resign formal: jabatan, departemen, alasan, tanggal efektif, ucapan terima kasih. Preview A4 = PDF, siap tanda tangan.",
  alternates: { canonical: "/karir/surat-resign" },
  openGraph: {
    title: "Surat Resign, Formal",
    description: "Resign formal, efektif & sopan.",
    url: `${siteConfig.url}/karir/surat-resign`,
  },
});
export default function Page() {
  return <Client />;
}
