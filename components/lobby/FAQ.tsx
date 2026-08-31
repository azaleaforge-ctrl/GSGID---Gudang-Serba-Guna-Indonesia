"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Apa bedanya Lorong UMKM dan Karir?",
    a: "UMKM fokus ke jualan: HPP, margin, invoice, stok, katalog. Karir fokus ke melamar: CV ATS, surat lamaran, email, cek gaji. Beda kebutuhan, beda tools, supaya tidak bingung. Keduanya dibuka di tab baru, lobby tetap di sini.",
  },
  {
    q: "Kenapa gratis? Nanti berbayar?",
    a: "Gratis selamanya untuk tools inti. Kami tidak jual data, tidak pasang paywall. Kalau kamu terbantu, donasi sukarela via Sociabuzz sangat membantu biaya domain & pengembangan, tapi tidak wajib.",
  },
  {
    q: "Apakah data saya di-upload ke server?",
    a: "Tidak. Semua proses (hitung, generate PDF) jalan di browser kamu. File dan draft disimpan di IndexedDB di device. Kami tidak melihat isi HPP atau CV kamu.",
  },
  {
    q: "Perlu daftar / login?",
    a: "Tidak. Buka gsg.id, pilih lorong, langsung pakai. Tanpa email, tanpa password. Kalau mau simpan draft, cukup klik simpan, tetap tanpa akun.",
  },
  {
    q: "Bisa dipakai di HP?",
    a: "Bisa. Tiap lorong punya UI khusus mobile, bukan cuma responsive. Tombol besar, form sederhana, PDF tetap rapi di HP kentang sekalipun.",
  },
  {
    q: "Kenapa buka di tab baru?",
    a: "Supaya lobby tetap jadi ‘peta’. Kamu bisa buka UMKM dan Karir bersamaan di tab berbeda, tidak perlu bolak-balik. Klik ‘↗’ di kartu lorong.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--lobby-muted)]">
            FAQ, YANG SERING DITANYA
          </p>
          <h2 className="mt-2 font-jakarta font-black tracking-[-0.04em] leading-[0.9] text-[32px]">
            Jelas dulu,
            <br />
            <span className="font-light italic">baru pakai.</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#57534E]">
            Kalau masih bingung, buka saja salah satu lorong, semua tools ada penjelasan singkat di
            dalamnya.
          </p>

          <div className="mt-6 hidden lg:flex gap-3">
            <a
              href="/umkm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black px-4 py-2 text-xs font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Buka UMKM ↗
            </a>
            <a
              href="/karir"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
            >
              Buka Karir ↗
            </a>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-[var(--lobby-border)] rounded-2xl border border-[var(--lobby-border)] bg-white overflow-hidden">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="group">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left hover:bg-[#FDFCF8] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className="hidden sm:grid h-7 w-7 place-items-center rounded-full border border-[var(--lobby-border)] bg-white font-mono text-[11px] text-[#6B6B63] group-hover:border-black group-hover:text-black transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-jakarta font-semibold tracking-[-0.01em] text-sm sm:text-[15px] leading-tight">
                        {f.q}
                      </span>
                    </span>
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full border transition-colors shrink-0 ${isOpen ? "bg-black border-black text-white rotate-45" : "border-[var(--lobby-border)] text-[#6B6B63] group-hover:border-black group-hover:text-black"}`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0, y: -4 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0, y: -4 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden will-change-transform"
                        style={
                          {
                            willChange: "transform, opacity",
                            contain: "layout paint",
                          } as React.CSSProperties
                        }
                      >
                        <p className="px-5 sm:px-6 pb-6 pl-5 sm:pl-[58px] text-sm leading-6 text-[#3A3A36]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
