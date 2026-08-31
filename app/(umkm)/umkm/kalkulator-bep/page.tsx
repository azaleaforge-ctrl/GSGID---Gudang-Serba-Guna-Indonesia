import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import BepClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Kalkulator BEP, Titik Impas Unit & Rupiah Akurat",
  description:
    "Kalkulator BEP UMKM gratis: hitung break-even point unit & rupiah. Rumus BEP = FixedCost / (Price - Variable). Tahu kapan mulai untung.",
  alternates: { canonical: "/umkm/kalkulator-bep" },
  openGraph: {
    title: "Kalkulator BEP, Unit & Rupiah",
    description: "BEP = Fixed / (Price - Variable). Ceil unit, rupiah presisi.",
    url: `${siteConfig.url}/umkm/kalkulator-bep`,
    type: "website",
  },
});

export default function Page() {
  return <BepClient />;
}
