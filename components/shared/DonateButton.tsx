"use client";
import { motion } from "framer-motion";

const HREF = "https://sociabuzz.com/azaleaforge15/tribe";

export function DonateButton({
  variant = "header",
}: {
  variant?: "header" | "floating" | "footer";
}) {
  if (variant === "floating") {
    return (
      <motion.a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Donasi via Sociabuzz"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-50 hidden md:inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-3 text-sm font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] hover:bg-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.24)] transition-all"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
        Donasi
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="opacity-80">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.4} strokeLinecap="square" />
        </svg>
      </motion.a>
    );
  }

  if (variant === "footer") {
    return (
      <a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur hover:bg-white hover:text-black transition-colors"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Dukung GSG ID, Donasi via Sociabuzz
        <span aria-hidden>→</span>
      </a>
    );
  }

  // header
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-4 py-2 text-[13px] font-semibold tracking-[-0.01em] text-white hover:bg-black transition-colors"
    >
      Donasi
      <span className="hidden sm:inline opacity-70 font-normal"> Sociabuzz</span>
    </a>
  );
}
