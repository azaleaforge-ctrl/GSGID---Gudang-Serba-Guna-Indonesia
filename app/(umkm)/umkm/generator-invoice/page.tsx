import type { Metadata } from "next";

import { buildMetadata, siteConfig } from "@/lib/seo";

import InvoiceClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Generator Invoice UMKM, 3 Template PDF 1:1 (Minimal/Materai/Thermal)",
  description:
    "Buat invoice UMKM profesional: 3 template Minimal, Materai, Thermal 58mm. Form lengkap (no, tanggal, client, items, diskon, pajak 11%, ongkir), live preview HTML persis sama dengan jsPDF A4 & thermal.",
  alternates: { canonical: "/umkm/generator-invoice" },
  openGraph: {
    title: "Generator Invoice, Preview 1:1 PDF",
    description: "Invoice Minimal/Materai/Thermal 58mm. Preview = PDF.",
    url: `${siteConfig.url}/umkm/generator-invoice`,
    type: "website",
  },
});

export default function Page() {
  return <InvoiceClient />;
}
