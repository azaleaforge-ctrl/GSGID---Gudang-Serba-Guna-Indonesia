"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function DevCard({
  slug,
  title,
  desc,
  tag,
  stat,
  code,
}: {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  stat: string;
  code: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="will-change-transform"
      style={{ willChange: "transform, opacity" }}
    >
      <Link
        href={`/dev/${slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111111] hover:border-[#22C55E]/40 hover:shadow-[0_0_32px_rgba(34,197,94,0.12)] hover:-translate-y-0.5 transition-all"
      >
        {/* terminal header */}
        <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#0A0A0A] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444] border border-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FACC15] border border-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E] border border-white/10" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#6B7280]">{tag}.ts</span>
          <span className="rounded-full border border-[#1F2937] bg-[#111111] px-2 py-0.5 font-mono text-[10px] tracking-wide text-[#22C55E]">
            {stat}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-mono font-bold tracking-tight text-[15px] leading-none text-[#E5E7EB] group-hover:text-[#22C55E] transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-5 text-[#9CA3AF]">{desc}</p>

          <div className="mt-4 rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3 overflow-hidden">
            <pre className="font-mono text-[11px] leading-4 text-[#E5E7EB] whitespace-pre-wrap break-words">
              <code className="code-glow">{code}</code>
            </pre>
          </div>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] border border-[#1F2937] px-3 py-1.5 text-xs font-mono font-semibold text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-[#0A0A0A] group-hover:border-[#22C55E] transition-colors">
            buka <span className="text-[#FACC15] group-hover:text-[#0A0A0A]">$</span> <span>→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
