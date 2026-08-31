"use client";
import { motion, useReducedMotion } from "framer-motion";

const TOOLS = [
  "KALKULATOR HPP",
  "KALKULATOR BEP",
  "KALKULATOR CICILAN",
  "KALKULATOR DISKON",
  "GENERATOR INVOICE",
  "GENERATOR KWITANSI",
  "CV ATS",
  "SURAT LAMARAN",
  "SURAT RESIGN",
  "PAKLARING",
  "PERJANJIAN KERJA",
  "SURAT PERNYATAAN",
  "JSON FORMATTER",
  "JWT DECODER",
  "REGEX TESTER",
  "CODEC LAB",
  "ID GENERATOR",
  "TIMESTAMP CRON",
];

export function Marquee() {
  const reduce = useReducedMotion();
  const content = TOOLS.join("  ·  ");

  if (reduce) {
    return (
      <div
        className="h-[44px] border-y border-[var(--lobby-border)] bg-white overflow-hidden flex items-center justify-center"
        style={{ contain: "layout paint" }}
      >
        <p className="font-mono text-[11px] tracking-[0.12em] text-center text-[var(--lobby-muted)] whitespace-nowrap px-4">
          {content}
        </p>
      </div>
    );
  }

  // Duplicated track for seamless infinite loop
  const track = [...TOOLS, ...TOOLS];

  return (
    <div
      className="relative h-[44px] overflow-hidden border-y border-[var(--lobby-border)] bg-white will-change-transform"
      style={{ contain: "layout paint" }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-y-0 left-0 flex items-center gap-8 whitespace-nowrap will-change-transform"
        style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {track.map((t, i) => (
          <span key={`${t}-${i}`} className="inline-flex items-center gap-8 shrink-0">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#0A0A0A]">{t}</span>
            <span className="h-1 w-1 rounded-full bg-[#0A0A0A]/20 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
