import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import CicilanClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Kalkulator Cicilan, Bunga Flat vs Efektif Anuitas OJK",
  description:
    "Bandingkan cicilan bunga flat vs efektif anuitas OJK. Hitung angsuran P*r*(1+r)^n/((1+r)^n-1), tabel angsuran bulanan akurat.",
  alternates: { canonical: "/umkm/kalkulator-cicilan" },
  openGraph: {
    title: "Kalkulator Cicilan, Flat vs Efektif",
    description: "Anuitas OJK: P·r·(1+r)^n/((1+r)^n−1). Tabel akurat.",
    url: `${siteConfig.url}/umkm/kalkulator-cicilan`,
    type: "website",
  },
});

export default function Page() {
  return <CicilanClient />;
}
