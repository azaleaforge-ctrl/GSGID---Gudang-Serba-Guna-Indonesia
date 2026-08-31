"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.2]);
  const reduce = useReducedMotion();
  const { isMobile } = useIsMobile();

  // desktop: asymmetric editorial, mobile: stacked
  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-[var(--lobby-border)] bg-[var(--lobby-bg)]"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 paper-grid opacity-[0.6] pointer-events-none" aria-hidden />

      {/* top meta bar */}
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[var(--lobby-border)] py-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--lobby-muted)]">
            1 DOMAIN · 2 LORONG · 30+ TOOLS
          </p>
          <p className="hidden sm:block font-mono text-[10px] tracking-[0.14em] text-[var(--lobby-muted)]">
            TANPA LOGIN · TANPA PAYWALL · DATA DI DEVICE
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          // MOBILE HERO - stacked
          <div className="py-10 pb-8">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 font-mono text-[11px] tracking-[0.12em]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                GRATIS, UNTUK SELAMANYA
              </p>
              <h1 className="font-jakarta font-black leading-[0.88] tracking-[-0.05em] mt-6 text-[40px]">
                Gudang
                <br />
                <span className="font-light italic tracking-[-0.04em]">serba guna</span>
                <br />
                untuk kerja
                <br />
                <span className="inline-block border-b-[4px] border-[#0A0A0A] pb-1">nyata.</span>
              </h1>
              <p className="mt-5 max-w-[34ch] text-[15px] leading-6 text-[#3A3A36]">
                Satu gudang, dua lorong. <b className="font-semibold text-black">UMKM</b> untuk yang
                jualan. <b className="font-semibold text-black">Karir</b> untuk yang melamar. Semua
                tools jalan di browser, file-mu tidak pernah naik ke server.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3">
                <a
                  href="/umkm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-between overflow-hidden rounded-2xl bg-[#1C1917] px-5 py-4 text-white"
                >
                  <span className="flex flex-col">
                    <span className="font-jakarta font-bold tracking-[-0.02em]">
                      Masuk Lorong UMKM
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.1em] opacity-70">
                      HPP · INVOICE · QR · MARGIN
                    </span>
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EA580C] text-white transition-transform group-active:scale-95">
                    →
                  </span>
                </a>
                <a
                  href="/karir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-[#0F172A]/10 bg-white px-5 py-4"
                >
                  <span className="flex flex-col">
                    <span className="font-jakarta font-bold tracking-[-0.02em] text-[#0F172A]">
                      Masuk Lorong Karir
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-[#64748B]">
                      CV ATS · LAMARAN · GAJI
                    </span>
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0F172A] text-white transition-transform group-active:scale-95">
                    →
                  </span>
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 text-xs text-[#6B6B63]">
                <span className="font-mono tracking-[0.08em]">↗ BUKA DI TAB BARU</span>
                <span aria-hidden>·</span>
                <span>Tidak perlu daftar</span>
              </div>
            </motion.div>

            {/* mobile visual - editorial card */}
            <motion.div
              style={reduce ? undefined : { y, opacity: 0.98 }}
              className="mt-8 overflow-hidden rounded-[20px] border border-[var(--lobby-border)] bg-white"
            >
              <div className="grid grid-cols-2 divide-x divide-[var(--lobby-border)]">
                <div className="p-5">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#EA580C]">
                    LORONG 01
                  </p>
                  <p className="mt-2 font-jakarta font-bold leading-none tracking-[-0.02em]">
                    UMKM
                  </p>
                  <p className="mt-1 text-xs leading-4 text-[#57534E]">
                    Jualan lebih rapi, hitung lebih akurat.
                  </p>
                </div>
                <div className="p-5 bg-[#0F172A] text-white">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#93C5FD]">
                    LORONG 02
                  </p>
                  <p className="mt-2 font-jakarta font-bold leading-none tracking-[-0.02em]">
                    KARIR
                  </p>
                  <p className="mt-1 text-xs leading-4 text-[#CBD5E1]">
                    Lamar lebih percaya diri, negosiasi lebih siap.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--lobby-border)] bg-[#FDFCF8] px-4 py-3">
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#78716C]">
                  GSG.ID / LOBBY
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em]">30+ TOOLS</span>
              </div>
            </motion.div>
          </div>
        ) : (
          // DESKTOP HERO - asymmetric editorial
          <div className="grid grid-cols-12 gap-0 py-10 lg:py-14">
            {/* left copy - 7 cols */}
            <motion.div
              style={reduce ? undefined : { y, opacity }}
              className="col-span-7 flex flex-col pr-8 lg:pr-12"
            >
              <motion.p
                initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)", y: 8 }}
                animate={reduce ? undefined : { clipPath: "inset(0 0 0% 0)", y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 font-mono text-[11px] tracking-[0.14em]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LOBBY, PINTU MASUK GSG ID
              </motion.p>

              <h1 className="font-jakarta font-black leading-[0.84] tracking-[-0.06em] text-[56px] lg:text-[72px] xl:text-[80px] mt-6">
                <motion.span
                  initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
                  animate={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                  className="block"
                >
                  Gudang
                </motion.span>
                <motion.span
                  initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
                  animate={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                  className="block font-light italic tracking-[-0.04em]"
                >
                  serba guna
                </motion.span>
                <motion.span
                  initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
                  animate={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                  className="block"
                >
                  untuk kerja
                </motion.span>
                <motion.span
                  initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
                  animate={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
                  className="inline-block border-b-[6px] border-[#0A0A0A] pb-1"
                >
                  nyata.
                </motion.span>
              </h1>

              <motion.p
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 max-w-[44ch] text-[17px] leading-7 text-[#2A2A28]"
              >
                Bukan template kosong. Bukan AI slop. Satu domain, dua lorong,{" "}
                <b className="font-semibold text-black">UMKM</b> untuk yang jualan,{" "}
                <b className="font-semibold text-black">Karir</b> untuk yang melamar. Semua tools
                jalan offline di browser.
              </motion.p>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.62, duration: 0.6 }}
                className="mt-8 flex items-center gap-3"
              >
                <a
                  href="/umkm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition-colors"
                >
                  Masuk UMKM
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <a
                  href="/karir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0A0A0A] bg-white px-6 py-3 text-sm font-semibold text-[#0A0A0A] hover:bg-[#F3F1EC] transition-colors"
                >
                  Masuk Karir
                </a>
                <span className="hidden lg:inline font-mono text-[11px] tracking-[0.12em] text-[#6B6B63] ml-2">
                  ↗ BUKA DI TAB BARU
                </span>
              </motion.div>

              <div className="mt-6 flex gap-6 font-mono text-[11px] tracking-[0.1em] text-[#78716C]">
                <span>✓ Tanpa login</span>
                <span>✓ File tidak di-upload</span>
                <span>✓ Gratis selamanya</span>
              </div>
            </motion.div>

            {/* right visual - 5 cols, asymmetric overlap */}
            <div className="col-span-5 relative">
              {/* vertical rule */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--lobby-border)] hidden lg:block" />
              <div className="pl-0 lg:pl-8">
                {/* stacked lorong preview cards - editorial tickets */}
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 16, rotate: -0.5 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* UMKM ticket */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-6">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[#EA580C]/20" />
                    <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#EA580C]/[0.06]" />
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#EA580C]">
                      LORONG 01, UMKM
                    </p>
                    <h3 className="mt-2 font-jakarta text-[22px] font-black tracking-[-0.03em] text-[#1C1917] leading-none">
                      Buat jualan jalan.
                    </h3>
                    <p className="mt-2 text-sm leading-5 text-[#57534E]">
                      Hitung HPP biar tidak tekor, invoice rapi biar dibayar cepat, QR & katalog
                      biar laku.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["HPP", "Invoice", "Margin", "QR", "Katalog"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[#FDE68A] bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-[#92400E]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="/umkm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-4 py-2 text-xs font-semibold text-white hover:bg-black"
                    >
                      Buka /umkm <span>↗</span>
                    </a>
                  </div>

                  {/* Karir ticket */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] p-6 text-white">
                    <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border border-white/10" />
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#60A5FA]">
                      LORONG 02, KARIR
                    </p>
                    <h3 className="mt-2 font-jakarta text-[22px] font-black tracking-[-0.03em] leading-none">
                      Biar lamaran dipanggil.
                    </h3>
                    <p className="mt-2 text-sm leading-5 text-[#CBD5E1]">
                      CV ATS yang lolos screening, surat lamaran yang tidak generik, cek gaji biar
                      tidak dirugikan.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["CV ATS", "Cover Letter", "Gaji", "Interview"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="/karir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
                    >
                      Buka /karir <span>↗</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[var(--lobby-border)] bg-white px-4 py-3">
                    <span className="font-mono text-[10px] tracking-[0.14em] text-[#78716C]">
                      PILIH LORONG, TAB BARU
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.14em]">2 PILIHAN</span>
                  </div>
                </motion.div>

                {/* floating stat badge */}
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  animate={reduce ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute -left-4 bottom-6 hidden lg:flex items-center gap-3 rounded-full border border-[var(--lobby-border)] bg-white px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0A] text-white text-xs">
                    ✓
                  </span>
                  <span className="font-mono text-xs tracking-[0.06em]">
                    <b>30+</b> tools · <b>0</b> iklan mengganggu
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
