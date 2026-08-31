import Link from "next/link";
import type { Metadata } from "next";

import { Reveal, RevealItem } from "@/components/ui/Reveal";

import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lorong UMKM, 6 Tools Gratis untuk yang Jualan",
  description:
    "Lorong UMKM GSG ID: kalkulator HPP, BEP, cicilan (flat vs efektif OJK), diskon bertingkat, generator invoice & kwitansi. Live preview = PDF, simpan draft di device.",
  alternates: { canonical: "/umkm" },
  openGraph: {
    title: "Lorong UMKM, Tools Gratis UMKM",
    description: "6 tools akurat, preview 1:1 PDF, tanpa login.",
    url: `${siteConfig.url}/umkm`,
  },
});

const tools = [
  {
    slug: "kalkulator-hpp",
    title: "Kalkulator HPP",
    desc: "Bahan + tenaga + overhead → HPP/porsi, margin & harga jual saran. Anti tekor.",
    tag: "HPP",
    stat: "Akurat",
  },
  {
    slug: "kalkulator-bep",
    title: "Kalkulator BEP",
    desc: "Titik impas unit & rupiah. Tahu kapan mulai untung, bukan tebak-tebakan.",
    tag: "BEP",
    stat: "Unit & Rp",
  },
  {
    slug: "kalkulator-cicilan",
    title: "Kalkulator Cicilan",
    desc: "Bunga flat vs efektif anuitas OJK. Tabel angsuran bulanan lengkap.",
    tag: "CICILAN",
    stat: "OJK",
  },
  {
    slug: "kalkulator-diskon",
    title: "Kalkulator Diskon",
    desc: "Diskon bertingkat, bundling beli X gratis Y, harga coret & profit akhir.",
    tag: "DISKON",
    stat: "Bertingkat",
  },
  {
    slug: "generator-invoice",
    title: "Generator Invoice",
    desc: "3 template (Minimal/Materai/Thermal 58mm). Preview HTML = PDF A4. Pajak 11%, ongkir.",
    tag: "INVOICE",
    stat: "PDF 1:1",
  },
  {
    slug: "generator-kwitansi",
    title: "Generator Kwitansi",
    desc: "Kwitansi & nota. Preview live, export PDF landscape, terbilang otomatis.",
    tag: "KWITANSI",
    stat: "Landscape",
  },
];

export default function UmkmHubPage() {
  return (
    <div className="bg-[#FFFBEB]">
      {/* hero */}
      <section className="border-b-2 border-[#1C1917] bg-[#FFFBEB]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <Reveal className="grid lg:grid-cols-12 gap-8 items-start">
            <RevealItem className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-[#1C1917] bg-white px-3 py-1 font-mono text-[11px] tracking-[0.14em] font-bold">
                <span className="h-2 w-2 rounded-full bg-[#EA580C] animate-pulse" />
                LORONG 01, UMKM · 6 TOOLS · GRATIS
              </p>
              <h1 className="mt-4 font-jakarta font-black leading-[0.88] tracking-[-0.05em] text-[40px] lg:text-[56px]">
                Lorong UMKM
                <span className="block font-light italic text-[#EA580C]">untuk yang jualan.</span>
              </h1>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-7 text-[#57534E]">
                Warung, dapur rumahan, online shop, hitung modal biar{" "}
                <b className="text-[#1C1917]">tidak tekor</b>, bikin invoice biar{" "}
                <b className="text-[#1C1917]">dibayar cepat</b>. Semua jalan di browser, file tidak
                pernah naik server.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#tools"
                  className="rounded-full bg-[#1C1917] px-6 py-3 text-sm font-bold text-white shadow-[4px_4px_0_#EA580C]"
                >
                  Lihat 6 Tools ↓
                </a>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#78716C]">
                  TANPA LOGIN · TANPA PAYWALL · DATA DI DEVICE
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-[520px]">
                {[
                  ["6", "tools akurat"],
                  ["1:1", "preview = PDF"],
                  ["0", "data di-upload"],
                ].map(([n, l]) => (
                  <div
                    key={n}
                    className="rounded-2xl border-2 border-[#1C1917] bg-white p-3 text-center shadow-[3px_3px_0_#1C1917]"
                  >
                    <p className="font-mono font-black text-[#EA580C] text-lg leading-none">{n}</p>
                    <p className="font-mono text-[10px] tracking-widest text-[#57534E]">{l}</p>
                  </div>
                ))}
              </div>
            </RevealItem>

            <RevealItem className="lg:col-span-5">
              <div className="rounded-[24px] border-2 border-[#1C1917] bg-white p-6 shadow-[6px_6px_0_#1C1917]">
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#EA580C] font-bold">
                  UNTUK SIAPA?
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#1C1917]">
                  <li className="flex gap-2">
                    <span className="text-[#EA580C] font-bold"> </span> Pemilik warung &amp; UMKM
                    yang mau hitung HPP beneran.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#EA580C] font-bold"> </span> Online shop yang butuh
                    invoice &amp; kwitansi rapi.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#EA580C] font-bold"> </span> Yang mau ambil cicilan &amp;
                    bandingkan bunga flat vs efektif.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#EA580C] font-bold"> </span> Yang mau promo diskon tanpa
                    boncos.
                  </li>
                </ul>
                <div className="mt-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] px-3 py-2 font-mono text-[11px] tracking-wide text-[#92400E]">
                  Live preview = PDF · IndexedDB draft · Export jsPDF
                </div>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* tools grid */}
      <section id="tools" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex items-center gap-3 border-b-2 border-[#1C1917] pb-4">
          <h2 className="font-jakarta font-black tracking-[-0.03em] text-[24px] lg:text-[28px] shrink-0">
            6 Tools, siap pakai
          </h2>
          <div className="hidden sm:block flex-1 h-px bg-[#1C1917]/15" aria-hidden />
          <p className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#78716C] shrink-0">
            Buka tools <span>→</span>
          </p>
        </div>

        <Reveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {tools.map((t) => (
            <RevealItem key={t.slug}>
              <Link
                href={`/umkm/${t.slug}`}
                className="group flex h-full flex-col rounded-[20px] border-2 border-[#1C1917] bg-white p-5 shadow-[4px_4px_0_#1C1917] hover:shadow-[6px_6px_0_#EA580C] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-[#1C1917] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white">
                    {t.tag}
                  </span>
                  <span className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2 py-1 font-mono text-[10px] tracking-wide text-[#92400E]">
                    {t.stat}
                  </span>
                </div>
                <h3 className="mt-3 font-jakarta font-black tracking-[-0.02em] text-[18px] leading-none group-hover:text-[#EA580C] transition-colors">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#57534E]">{t.desc}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-2 rounded-full bg-[#FFFBEB] border border-[#1C1917] px-3 py-1.5 text-xs font-bold group-hover:bg-[#1C1917] group-hover:text-white transition-colors">
                  Buka tool <span>→</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-8 rounded-2xl border-2 border-[#1C1917] bg-[#1C1917] text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#FDE68A]">
              PRINSIP UMKM GSG ID
            </p>
            <p className="mt-1 text-sm leading-6 text-[#FFFBEB]">
              Hitung akurat OJK, Preview persis PDF, Draft auto-save di device. Tidak ada paywall.
            </p>
          </div>
          <div className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1C1917] opacity-90">
            Lorong UMKM, gsg.id/umkm
          </div>
        </div>
      </section>
    </div>
  );
}
