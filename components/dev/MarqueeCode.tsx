"use client";
import { motion, useReducedMotion } from "framer-motion";

// DEV tools only - real tools from registry
const DEV_TOOLS = [
  "JSON FORMATTER",
  "JWT DECODER",
  "REGEX TESTER",
  "CODEC LAB",
  "ID GENERATOR",
  "TIMESTAMP CRON",
];

export function MarqueeCode() {
  const reduce = useReducedMotion();
  const content = DEV_TOOLS.join("  ·  ");

  if (reduce) {
    return (
      <div
        className="h-[40px] border-y border-[#1F2937] bg-[#111111] overflow-hidden flex items-center justify-center"
        style={{ contain: "layout paint" }}
      >
        <p className="font-mono text-[11px] tracking-[0.12em] text-center text-[#6B7280] whitespace-nowrap px-4">
          {content}
        </p>
      </div>
    );
  }

  const track = [...DEV_TOOLS, ...DEV_TOOLS];

  return (
    <div
      className="relative h-[40px] overflow-hidden border-y border-[#1F2937] bg-[#0A0A0A] will-change-transform"
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
            <span className="font-mono text-[11px] tracking-[0.08em] text-[#22C55E]">{t}</span>
            <span className="h-1 w-1 rounded-full bg-[#FACC15] shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
