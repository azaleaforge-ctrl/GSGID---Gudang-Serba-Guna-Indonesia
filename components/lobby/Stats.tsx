"use client";
import { motion, useReducedMotion } from "framer-motion";
import { siteStats } from "@/lib/registry";

const stats = [
  { k: String(siteStats.tools), label: "Tools gratis", sub: "HPP, Invoice, CV, JSON, JWT…" },
  { k: String(siteStats.lorongs), label: "Lorong fokus", sub: "UMKM, Karir & DEV, beda kebutuhan" },
  { k: "0", label: "Biaya & login", sub: "Tanpa paywall, tanpa akun" },
  { k: "100%", label: "Di browser", sub: "File tidak pernah di-upload" },
];

export function Stats() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Statistik" className="border-b border-[var(--lobby-border)] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--lobby-border)]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="px-4 sm:px-6 py-7 sm:py-8 will-change-transform"
              style={{ willChange: "transform, opacity" }}
            >
              <p className="font-jakarta font-black text-[36px] sm:text-[42px] leading-none tracking-[-0.05em]">
                {s.k}
              </p>
              <p className="mt-1 font-jakarta text-sm font-bold tracking-[-0.01em]">{s.label}</p>
              <p className="font-mono text-[11px] tracking-[0.06em] text-[var(--lobby-muted)]">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
