"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function LorongCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yUmkm = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const yKarir = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);
  const yDev = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]);

  return (
    <section
      ref={ref}
      id="lorong"
      className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14"
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 border-b border-[var(--lobby-border)] pb-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--lobby-muted)]">
            PILIH LORONG, SESUAI KEBUTUHAN
          </p>
          <h2 className="mt-2 font-jakarta font-black tracking-[-0.04em] leading-[0.9] text-[32px] lg:text-[44px]">
            Tiga lorong.
            <br />
            <span className="font-light italic">Satu gudang.</span>
          </h2>
        </div>
        <p className="max-w-[42ch] text-sm leading-6 text-[#3A3A36]">
          Jangan campur aduk. UMKM butuh hitung dan jualan. Karir butuh dokumen. DEV butuh code.
          Tiap lorong punya tools yang memang untuk itu.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* UMKM — parallax wrapper only */}
        <motion.div
          style={{
            y: yUmkm,
            willChange: "transform",
            backfaceVisibility: "hidden" as const,
            transform: "translateZ(0)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          className="will-change-transform min-w-0"
        >
          <a
            href="/umkm"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[24px] border border-[#FDE68A] bg-[#FFFBEB] p-6 sm:p-8 flex flex-col min-h-[420px] will-change-transform hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(234,88,12,0.12)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full border border-[#EA580C]/15" />
              <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-dashed border-[#EA580C]/20" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FDE68A] to-transparent" />
            </div>

            <div className="relative min-w-0">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[#FFFBEB]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C]" />
                  LORONG 01
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#92400E]">
                  /umkm ↗
                </span>
              </div>

              <h3 className="mt-6 font-jakarta font-black tracking-[-0.04em] leading-[0.9] text-[36px] sm:text-[42px] text-[#1C1917]">
                UMKM
                <span className="block font-light italic text-[#EA580C]">yang jualan</span>
              </h3>
              <p className="mt-3 max-w-[32ch] text-sm leading-6 text-[#57534E]">
                Untuk pemilik warung, online shop, dapur rumahan, sampai yang baru mau mulai. Hitung
                modal, bikin struk, kelola stok, biar untung beneran, bukan tebak-tebakan.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-2">
                {[
                  "Kalkulator HPP & Margin",
                  "Invoice & Kwitansi PDF",
                  "Katalog & QR Menu",
                  "Hitung BEP & Stok",
                  "Label Harga & Ongkir",
                  "Laporan Harian",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-xl border border-[#FDE68A] bg-white px-3 py-2.5 text-xs font-medium text-[#1C1917]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EA580C] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-auto pt-6 flex items-center justify-between gap-2 flex-wrap min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EA580C] px-4 py-2 text-xs font-bold text-white group-hover:bg-[#C2410C] transition-colors whitespace-nowrap shrink-0">
                Masuk Lorong UMKM{" "}
                <span className="inline-grid place-items-center w-3 h-3 text-xs leading-none transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.1em] text-[#92400E] whitespace-nowrap shrink-0">
                GRATIS · TAB BARU
              </span>
            </div>
          </a>
        </motion.div>

        {/* KARIR — parallax wrapper only */}
        <motion.div
          style={{
            y: yKarir,
            willChange: "transform",
            backfaceVisibility: "hidden" as const,
            transform: "translateZ(0)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          className="will-change-transform min-w-0"
        >
          <a
            href="/karir"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[24px] bg-[#0F172A] p-6 sm:p-8 flex flex-col min-h-[420px] border border-[#1E293B] will-change-transform hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(15,23,42,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full border border-dashed border-white/10" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
            </div>

            <div className="relative min-w-0">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[#0F172A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                  LORONG 02
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#93C5FD]">
                  /karir ↗
                </span>
              </div>

              <h3 className="mt-6 font-jakarta font-black tracking-[-0.04em] leading-[0.9] text-[36px] sm:text-[42px] text-white">
                KARIR
                <span className="block font-light italic text-[#60A5FA]">yang melamar</span>
              </h3>
              <p className="mt-3 max-w-[32ch] text-sm leading-6 text-[#CBD5E1]">
                Untuk fresh graduate, switch career, sampai yang mau naik gaji. CV ATS, surat
                lamaran yang tidak malas, dan cek pasaran gaji, biar negosiasi ada datanya.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-2">
                {[
                  "CV ATS (PDF)",
                  "Surat Lamaran",
                  "Cek Gaji Pasaran",
                  "Email Lamaran",
                  "Portofolio Link",
                  "Latihan Interview",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-xs font-medium text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-auto pt-6 flex items-center justify-between gap-2 flex-wrap min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0F172A] group-hover:bg-[#F1F5F9] transition-colors whitespace-nowrap shrink-0">
                Masuk Lorong Karir{" "}
                <span className="inline-grid place-items-center w-3 h-3 text-xs leading-none transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.1em] text-[#64748B] whitespace-nowrap shrink-0">
                GRATIS · TAB BARU
              </span>
            </div>
          </a>
        </motion.div>

        {/* DEV — Terminal — parallax wrapper only */}
        <motion.div
          style={{
            y: yDev,
            willChange: "transform",
            backfaceVisibility: "hidden" as const,
            transform: "translateZ(0)",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 30 }}
          className="will-change-transform min-w-0"
        >
          <a
            href="/dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[24px] bg-[#0A0A0A] p-6 sm:p-8 flex flex-col min-h-[420px] border border-[#1F2937] will-change-transform hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(34,197,94,0.14)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          >
            <div className="absolute inset-0 pointer-events-none terminal-grid opacity-40" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-[#22C55E]/10" />
              <div className="absolute -right-6 -top-6 h-48 w-48 rounded-full border border-dashed border-[#22C55E]/15" />
            </div>

            <div className="relative min-w-0">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-[#0A0A0A] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A] animate-pulse" />
                  LORONG 03
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#22C55E]">
                  /dev ↗
                </span>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444] border border-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FACC15] border border-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] border border-white/10" />
                <span className="ml-2 font-mono text-[10px] tracking-[0.12em] text-[#6B7280]">
                  gsg@dev, zsh
                </span>
              </div>

              <h3 className="mt-4 font-mono font-black tracking-[-0.04em] leading-[0.9] text-[32px] sm:text-[38px] text-[#E5E7EB]">
                DEV
                <span className="block font-light text-[#22C55E] code-glow">yang ngoding</span>
              </h3>
              <p className="mt-3 max-w-[32ch] text-sm leading-6 text-[#9CA3AF]">
                Untuk developer, engineer, sysadmin. Format JSON, verify JWT, hash, base64, test
                regex, dan parse cron, semua di terminal.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-2">
                {[
                  "JSON Formatter",
                  "JWT Debugger",
                  "Hash Generator",
                  "Base64 Tool",
                  "Regex Tester",
                  "Cron Parser",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-xl border border-[#1F2937] bg-white/[0.04] px-3 py-2.5 text-xs font-mono font-medium text-[#E5E7EB]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-auto pt-6 flex items-center justify-between gap-2 flex-wrap min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-4 py-2 text-xs font-bold text-[#0A0A0A] group-hover:bg-[#16A34A] transition-colors whitespace-nowrap shrink-0">
                Masuk Lorong DEV{" "}
                <span className="inline-grid place-items-center w-3 h-3 text-xs leading-none transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.1em] text-[#6B7280] whitespace-nowrap shrink-0">
                GRATIS · TAB BARU
              </span>
            </div>
          </a>
        </motion.div>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] tracking-[0.12em] text-[var(--lobby-muted)]">
        Klik salah satu lorong, akan terbuka di <b className="font-semibold text-black">tab baru</b>
        , lobby tetap di sini.
      </p>
    </section>
  );
}
