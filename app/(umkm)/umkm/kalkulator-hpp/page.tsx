import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import HppClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Kalkulator HPP UMKM, Hitung HPP, Margin & Harga Jual Akurat",
  description:
    "Kalkulator HPP UMKM gratis: hitung Bahan+Tenaga+Overhead per porsi, set margin, dapat harga jual saran & profit. Formula akurat, tanpa login.",
  alternates: { canonical: "/umkm/kalkulator-hpp" },
  openGraph: {
    title: "Kalkulator HPP UMKM, Bahan+Tenaga+Overhead",
    description: "Hitung HPP per porsi, margin & harga jual saran. Gratis, akurat, preview live.",
    url: `${siteConfig.url}/umkm/kalkulator-hpp`,
    type: "website",
  },
});

export default function Page() {
  return <HppClient />;
}
