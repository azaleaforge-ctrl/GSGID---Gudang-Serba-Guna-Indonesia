import Link from "next/link";
import type { Metadata } from "next";

import { Reveal, RevealItem } from "@/components/ui/Reveal";

import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lorong Karir, 6 Tools Gratis CV & Surat Kerja (ATS, EYD)",
  description:
    "Lorong Karir GSG ID: CV ATS 1 halaman, surat lamaran EYD PUEBI, resign, paklaring berstempel, perjanjian kerja 2 halaman, pernyataan 5 template. Live preview = PDF A4, draft IndexedDB.",
  alternates: { canonical: "/karir" },
  openGraph: {
    title: "Lorong Karir, Tools Gratis Pejuang Karir",
    description: "6 tools presisi, preview 1:1 PDF, tanpa login.",
    url: `${siteConfig.url}/karir`,
  },
});

const tools = [
  {
    slug: "cv-ats",
    title: "CV ATS Generator",
    desc: "Biodata, ringkasan, pengalaman, pendidikan, skill. Skor ATS live, 1 halaman Helvetica, no tabel/grafik.",
    tag: "CV ATS",
    stat: "Skor 0–100",
  },
  {
    slug: "surat-lamaran",
    title: "Surat Lamaran Kerja",
    desc: "EYD PUEBI, kop + tanggal formal Indonesia, lampiran & tujuan perusahaan. Preview A4 25mm.",
    tag: "LAMARAN",
    stat: "EYD",
  },
  {
    slug: "surat-resign",
    title: "Surat Pengunduran Diri",
    desc: "Alasan, tanggal efektif, ucapan terima kasih. Format formal, siap tanda tangan.",
    tag: "RESIGN",
    stat: "Formal",
  },
  {
    slug: "paklaring",
    title: "Paklaring / Keterangan Kerja",
    desc: "Nomor, periode, jabatan, NIK, stempel. Kop perusahaan, garis ganda.",
    tag: "PAKLARING",
    stat: "Stempel",
  },
  {
    slug: "perjanjian-kerja",
    title: "Perjanjian Kerja",
    desc: "7 pasal sederhana, 2 halaman bila perlu, materai, dua tanda tangan.",
    tag: "PKWT",
    stat: "7 Pasal",
  },
  {
    slug: "surat-pernyataan",
    title: "Surat Pernyataan & Izin",
    desc: "5 template: umum, izin tidak masuk, pakta integritas, domisili, penghasilan.",
    tag: "PERNYATAAN",
    stat: "5 Template",
  },
];

export default function KarirHubPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <Reveal className="grid lg:grid-cols-12 gap-8 items-start">
            <RevealItem className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 font-mono text-[11px] tracking-[0.14em] font-semibold text-[#0F172A]">
                <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
                LORONG 02, KARIR · 6 TOOLS · GRATIS
              </p>
              <h1 className="mt-4 font-jakarta font-bold leading-[0.88] tracking-[-0.04em] text-[40px] lg:text-[54px] text-[#0F172A]">
                Lorong Karir
                <span className="block font-light italic text-[#2563EB]">untuk yang melamar.</span>
              </h1>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-7 text-[#475569]">
                CV yang lolos ATS, surat yang rapi EYD,{" "}
                <b className="text-[#0F172A]">tanpa template berantakan</b>, tanpa data naik server.
                Semua dirender presisi A4 di browser.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#tools"
                  className="rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white"
                >
                  Lihat 6 Tools ↓
                </a>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#94A3B8]">
                  TANPA LOGIN · TANPA PAYWALL · DATA DI DEVICE
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-[520px]">
                {[
                  ["6", "tools karir"],
                  ["1:1", "preview = PDF"],
                  ["A4", "15/25mm margin"],
                ].map(([n, l]) => (
                  <div
                    key={n}
                    className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-center"
                  >
                    <p className="font-mono font-bold text-[#2563EB] text-lg leading-none">{n}</p>
                    <p className="font-mono text-[10px] tracking-widest text-[#64748B]">{l}</p>
                  </div>
                ))}
              </div>
            </RevealItem>

            <RevealItem className="lg:col-span-5">
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563EB] font-bold">
                  APA ITU LORONG KARIR?
                </p>
                <p className="mt-2 text-sm leading-6 text-[#334155]">
                  Lorong kedua GSG ID. Fokus ke dokumen karir yang sering bikin bingung: CV
                  ATS-friendly (searchable, tanpa tabel), surat lamaran EYD PUEBI, resign yang
                  sopan, paklaring dengan stempel, perjanjian kerja sederhana, sampai surat
                  pernyataan 5 varian.
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.12em] font-semibold text-[#0F172A]">
                  UNTUK SIAPA?
                </p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[#0F172A]">
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold"> </span> Fresh graduate &amp;
                    jobseeker yang butuh CV ATS 1 halaman.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold"> </span> Karyawan resign / butuh
                    paklaring untuk kerja berikutnya.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold"> </span> HRD UMKM yang mau bikin
                    perjanjian kerja sederhana tanpa notaris.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#2563EB] font-bold"> </span> Siapa saja yang butuh surat
                    pernyataan/izin yang rapi EYD.
                  </li>
                </ul>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4">
          <h2 className="font-jakarta font-bold tracking-[-0.03em] text-[24px] lg:text-[28px] text-[#0F172A] shrink-0">
            6 Tools, siap pakai
          </h2>
          <div className="hidden sm:block flex-1 h-px bg-[#E2E8F0]" aria-hidden />
          <p className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#94A3B8] shrink-0">
            Buka tools <span>→</span>
          </p>
        </div>

        <Reveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {tools.map((t) => (
            <RevealItem key={t.slug}>
              <Link
                href={`/karir/${t.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 hover:border-[#2563EB]/30 hover:shadow-[0_8px_28px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-[#0F172A] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white">
                    {t.tag}
                  </span>
                  <span className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 font-mono text-[10px] tracking-wide text-[#2563EB]">
                    {t.stat}
                  </span>
                </div>
                <h3 className="mt-3 font-jakarta font-bold tracking-[-0.02em] text-[18px] leading-none group-hover:text-[#2563EB] transition-colors">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-[#64748B]">{t.desc}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold group-hover:bg-[#0F172A] group-hover:text-white group-hover:border-[#0F172A] transition-colors">
                  Buka tool <span>→</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-[#0F172A] text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#93C5FD]">
              PRINSIP KARIR GSG ID
            </p>
            <p className="mt-1 text-sm leading-6 text-white/80">
              Dokumen rapi EYD, ATS searchable, Preview persis PDF, Draft di device. Tidak ada
              paywall.
            </p>
          </div>
          <div className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0F172A] opacity-90">
            Lorong Karir, gsgid.vercel.app/karir
          </div>
        </div>
      </section>
    </div>
  );
}
