import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import DiskonClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Kalkulator Diskon Bertingkat & Bundling UMKM",
  description:
    "Kalkulator diskon UMKM: diskon bertingkat, potongan nominal, bundling beli X gratis Y, harga coret & profit akhir akurat. Hitung hemat & harga satuan efektif.",
  alternates: { canonical: "/umkm/kalkulator-diskon" },
  openGraph: {
    title: "Kalkulator Diskon, Bertingkat & Bundling",
    description: "Diskon bertingkat, bundling, harga coret akurat.",
    url: `${siteConfig.url}/umkm/kalkulator-diskon`,
    type: "website",
  },
});

export default function Page() {
  return <DiskonClient />;
}
