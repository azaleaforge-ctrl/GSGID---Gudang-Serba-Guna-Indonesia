import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import Client from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Surat Pernyataan & Izin, 5 Template (Umum, Integritas, Domisili)",
  description:
    "Buat surat pernyataan 5 template: umum, izin tidak masuk, pakta integritas, domisili, penghasilan. Preview A4 = PDF.",
  alternates: { canonical: "/karir/surat-pernyataan" },
  openGraph: {
    title: "Surat Pernyataan, 5 Template",
    description: "Umum/izin/integritas/domisili/penghasilan.",
    url: `${siteConfig.url}/karir/surat-pernyataan`,
  },
});
export default function Page() {
  return <Client />;
}
