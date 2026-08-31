import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import Client from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Perjanjian Kerja Sederhana, 7 Pasal, 2 Halaman, Materai",
  description:
    "Buat perjanjian kerja PKWT sederhana: 7 pasal, jabatan, gaji, jam kerja, hak kewajiban. Preview 2 halaman A4 = PDF, materai.",
  alternates: { canonical: "/karir/perjanjian-kerja" },
  openGraph: {
    title: "Perjanjian Kerja, 7 Pasal",
    description: "PKWT sederhana 2 halaman.",
    url: `${siteConfig.url}/karir/perjanjian-kerja`,
  },
});
export default function Page() {
  return <Client />;
}
