"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── Config: edit texts per lorong here ──────────────────────────
// Key = route prefix. "/" only matches exact "/".
// Longer prefix wins (e.g. "/umkm" matches "/umkm/*").
// Fallback used when no prefix matches.
export const REQUEST_BAR_TEXT_CONFIG: Record<string, string> = {
  "/": "Mau request lorong? Pencet disini.",
  "/umkm": "Mau request tools? Pencet disini.",
  "/karir": "Mau request tools? Pencet disini.",
  "/dev": "Mau request tools? Pencet disini.",
};

export const REQUEST_BAR_DEFAULT_TEXT = "Mau request tools? Pencet disini.";
export const REQUEST_BAR_HREF = "https://forms.gle/mmeX2qg7dGXMQmkM6";

function getTextForPath(pathname: string | null): string {
  if (!pathname) return REQUEST_BAR_DEFAULT_TEXT;
  if (pathname === "/") return REQUEST_BAR_TEXT_CONFIG["/"] ?? REQUEST_BAR_DEFAULT_TEXT;

  const keys = Object.keys(REQUEST_BAR_TEXT_CONFIG)
    .filter((k) => k !== "/")
    .sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (pathname === key || pathname.startsWith(key + "/")) {
      return REQUEST_BAR_TEXT_CONFIG[key];
    }
  }
  return REQUEST_BAR_DEFAULT_TEXT;
}

export function FloatingRequestBar() {
  const pathname = usePathname();
  const text = getTextForPath(pathname);

  return (
    <AnimatePresence>
      <motion.div
        key="floating-request-bar"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.55, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        // Mobile: above BottomNav (64px + safe-area) → 88px | Desktop: above DonateButton (bottom-6 + ~40px height + 12px gap = 72px)
        className="fixed bottom-[calc(88px+env(safe-area-inset-bottom,0px))] md:bottom-[72px] right-4 md:right-6 z-[60] flex items-center pointer-events-none"
        aria-live="polite"
      >
        <motion.a
          href={REQUEST_BAR_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${text} — buka Google Form di tab baru`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pointer-events-auto group inline-flex items-center gap-2.5 md:gap-3 rounded-full bg-white border border-[#E8E6E1] py-1 pl-1 pr-1.5 md:py-1.5 md:pl-1.5 md:pr-1.5 shadow-[0_8px_32px_rgba(10,10,10,0.12),0_2px_8px_rgba(10,10,10,0.08),0_0_0_1px_rgba(10,10,10,0.02)] hover:shadow-[0_12px_40px_rgba(10,10,10,0.16),0_4px_16px_rgba(10,10,10,0.10)] hover:border-[#DDD9D1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-[box-shadow,border-color] duration-200"
        >
          {/* icon circle - sparkles */}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white">
            <svg width={14} height={14} viewBox="0 0 16 16" fill="none" aria-hidden className="opacity-[0.95]">
              <path d="M8 0l1.1 3.9L13 5 9.1 6.1 8 10l-1.1-3.9L3 5l3.9-1.1L8 0z" fill="currentColor" />
              <path d="M13.5 8l0.7 2 2 0.7-2 0.7-0.7 2-0.7-2-2-0.7 2-0.7 0.7-2z" fill="currentColor" opacity={0.9} />
              <path d="M2.5 9l0.6 1.1 1.1 0.6-1.1 0.6L2.5 12l-0.6-1.1L0.8 10.2l1.1-0.6L2.5 9z" fill="currentColor" opacity={0.85} />
            </svg>
          </span>

          <span
            className="pr-1 text-[13px] md:text-[13.5px] font-semibold tracking-[-0.015em] leading-none text-[#0A0A0A] whitespace-nowrap"
            style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
          >
            {text}
          </span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0A0A0A] text-white md:bg-[#F3F1EC] md:text-[#0A0A0A] group-hover:md:bg-[#0A0A0A] group-hover:md:text-white transition-colors duration-200">
            <svg width={12} height={12} viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
}
