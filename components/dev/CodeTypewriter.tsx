"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const snippets = [
  `const payload = {\n  sub: "user_42",\n  iat: Date.now(),\n  role: "dev"\n};\n\njwt.verify(token, SECRET); // ✓ valid`,
  `const data = JSON.parse(raw);\nif (!data.ok) throw new Error("invalid json");\nconsole.log("parsed", data);`,
  `cron.schedule("*/5 * * * *", () => {\n  console.log("tick", new Date().toISOString());\n});`,
];

export function CodeTypewriter() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");

  const full = snippets[index];

  useEffect(() => {
    if (reduce) {
      setTyped(full);
      return;
    }
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        // hold then next
        setTimeout(() => setIndex((p) => (p + 1) % snippets.length), 1800);
      }
    }, 14);
    return () => clearInterval(t);
  }, [index, full, reduce]);

  // Fixed-height wrapper prevents CLS; inner absolute animates only transform/opacity/clip-path
  return (
    <div
      className="relative h-[120px] sm:h-[140px] overflow-hidden will-change-transform"
      style={{ contain: "layout paint" }}
    >
      <motion.div
        key={index}
        initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 8 }}
        animate={reduce ? undefined : { clipPath: "inset(0 0 0% 0)", opacity: 1, y: 0 }}
        exit={reduce ? undefined : { clipPath: "inset(0 100% 0 0)", opacity: 0, y: -8 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 font-mono text-[12px] leading-5 will-change-transform"
        style={{ willChange: "transform, opacity" }}
      >
        <pre className="whitespace-pre-wrap break-words text-[#E5E7EB]">
          <code>
            {typed}
            <span
              className="inline-block h-4 w-[8px] translate-y-[2px] bg-[#22C55E] animate-pulse ml-1"
              aria-hidden
            />
          </code>
        </pre>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-[#6B7280]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          {index === 0
            ? "jwt.verify, valid"
            : index === 1
              ? "JSON.parse, ok"
              : "cron * * * * *, tick"}
          <span className="text-[#1F2937]">·</span>
          <span className="text-[#FACC15]">{String(index + 1).padStart(2, "0")}/03</span>
        </div>
      </motion.div>
    </div>
  );
}

// Static snippet with scroll reveal (clip-path) — fixed height to avoid CLS
export function ScrollCode({
  code,
  lang = "ts",
  label,
}: {
  code: string;
  lang?: string;
  label?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { clipPath: "inset(0 0 100% 0)", y: 8, opacity: 0 }}
      whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-xl border border-[#1F2937] bg-[#111111] will-change-transform"
      style={{ contain: "layout paint" }}
    >
      <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#0A0A0A] px-3 py-2">
        <span className="font-mono text-[10px] tracking-[0.14em] text-[#6B7280]">
          {label || lang}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
      </div>
      <div className="h-[86px] overflow-hidden p-3">
        <pre className="font-mono text-xs leading-5 text-[#E5E7EB] whitespace-pre-wrap break-words">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  );
}
