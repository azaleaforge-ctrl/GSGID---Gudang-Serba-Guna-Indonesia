"use client";
import { motion, useReducedMotion } from "framer-motion";

export function CTA() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-10">
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[28px] bg-[#0A0A0A] p-6 sm:p-10 lg:p-12 will-change-transform"
        style={{ willChange: "transform, opacity" }}
      >
        {/* subtle line pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, white 0 1px, transparent 1px 32px)`,
          }}
        />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10 hidden lg:block" />
        <div className="absolute -right-10 -bottom-10 h-80 w-80 rounded-full border border-dashed border-white/10 hidden lg:block" />

        <div className="relative grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/60">SIAP KERJA?</p>
            <h2 className="mt-2 font-jakarta font-black tracking-[-0.05em] leading-[0.9] text-white text-[32px] sm:text-[40px] lg:text-[44px]">
              Pilih lorong.
              <br />
              <span className="font-light italic text-white/80">Buka di tab baru.</span>
            </h2>
            <p className="mt-3 max-w-[44ch] text-sm leading-6 text-white/70">
              Tidak perlu daftar. Tidak perlu mikir lama. Klik yang paling dekat dengan kebutuhanmu
              hari ini, sisanya biar tools yang bantu.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <a
              href="/umkm"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-[#EA580C] px-6 py-4 text-white hover:bg-[#C2410C] transition-colors"
            >
              <span>
                <span className="block font-jakarta font-bold tracking-[-0.02em]">Masuk UMKM</span>
                <span className="block font-mono text-[11px] tracking-[0.08em] opacity-80">
                  /umkm, untuk yang jualan
                </span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#EA580C] transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <a
              href="/karir"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-white px-6 py-4 text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              <span>
                <span className="block font-jakarta font-bold tracking-[-0.02em]">Masuk Karir</span>
                <span className="block font-mono text-[11px] tracking-[0.08em] text-[#64748B]">
                  /karir, untuk yang melamar
                </span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0F172A] text-white transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>

            <p className="text-center font-mono text-[11px] tracking-[0.12em] text-white/50">
              KEDUANYA GRATIS · KEDUANYA TAB BARU
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
