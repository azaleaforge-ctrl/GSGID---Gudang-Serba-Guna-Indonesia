"use client";
import { useState } from "react";
import Link from "next/link";

import { DonateButton } from "@/components/shared/DonateButton";

import { useIsMobile } from "@/hooks/useIsMobile";

export function ToolShellDev({
  title,
  subtitle,
  children,
  preview,
  draftKey,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  preview: React.ReactNode;
  draftKey?: string;
}) {
  const { isMobile } = useIsMobile();
  const [active, setActive] = useState<"form" | "preview">("form");

  if (isMobile) {
    return (
      <div className="mx-auto max-w-[640px] px-4 py-6">
        <div className="mb-4">
          <Link
            href="/dev"
            className="font-mono text-[11px] tracking-[0.14em] text-[#6B7280] hover:text-[#22C55E]"
          >
            ← LORONG DEV
          </Link>
          <h1 className="mt-2 font-mono font-black tracking-[-0.02em] text-[22px] leading-none text-[#E5E7EB]">
            {title}
          </h1>
          <p className="mt-1.5 text-sm leading-5 text-[#9CA3AF]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#111111] p-1 w-fit">
          <button
            onClick={() => setActive("form")}
            className={`rounded-full px-4 py-1.5 text-[11px] font-mono font-bold tracking-[0.14em] transition ${active === "form" ? "bg-[#22C55E] text-[#0A0A0A]" : "text-[#6B7280]"}`}
          >
            FORM
          </button>
          <button
            onClick={() => setActive("preview")}
            className={`rounded-full px-4 py-1.5 text-[11px] font-mono font-bold tracking-[0.14em] transition ${active === "preview" ? "bg-[#22C55E] text-[#0A0A0A]" : "text-[#6B7280]"}`}
          >
            PREVIEW
          </button>
        </div>

        <div className="mt-4">
          {active === "form" ? (
            <div className="space-y-4">
              {children}
              <button
                onClick={() => setActive("preview")}
                className="w-full rounded-full bg-[#22C55E] px-4 py-3 text-sm font-mono font-bold text-[#0A0A0A] hover:bg-[#16A34A] transition"
              >
                Lihat Preview →
              </button>
              <DonasiBlock />
              {draftKey && (
                <p className="font-mono text-[10px] tracking-widest text-[#4B5563]">
                  AUTO-SAVE · IndexedDB · {draftKey}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-auto rounded-2xl border border-[#1F2937] bg-[#111111] p-3">
                {preview}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActive("form")}
                  className="rounded-full border border-[#1F2937] bg-[#0A0A0A] px-4 py-3 text-sm font-mono font-bold text-[#E5E7EB]"
                >
                  ← Edit
                </button>
                <button
                  onClick={() => setActive("form")}
                  className="rounded-full bg-[#111111] border border-[#22C55E]/30 px-4 py-3 text-sm font-mono font-bold text-[#22C55E]"
                >
                  Kembali
                </button>
              </div>
              <DonasiBlock />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/dev"
          className="font-mono text-[11px] tracking-[0.14em] text-[#6B7280] hover:text-[#22C55E]"
        >
          ← /dev
        </Link>
        <h1 className="mt-2 font-mono text-[28px] font-black tracking-[-0.03em] text-[#E5E7EB]">
          {title}
        </h1>
        <p className="mt-1 max-w-[70ch] text-sm leading-6 text-[#9CA3AF]">{subtitle}</p>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-5 space-y-4">
          {children}
          <DonasiBlock />
          {draftKey && (
            <p className="font-mono text-[10px] tracking-widest text-[#4B5563]">
              AUTO-SAVE · IndexedDB · {draftKey}
            </p>
          )}
        </div>
        <div className="col-span-7 lg:sticky lg:top-[72px]">
          <div className="rounded-2xl border border-[#1F2937] bg-[#111111] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[#22C55E] font-bold">
                LIVE PREVIEW · TERMINAL
              </span>
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
            </div>
            <div className="overflow-auto bg-[#0A0A0A] rounded-xl border border-[#1F2937] max-h-[78vh] dev-scrollbar">
              {preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonasiBlock() {
  return (
    <div className="rounded-2xl border border-dashed border-[#1F2937] bg-[#111111] p-4 flex items-center justify-between gap-3">
      <p className="text-xs leading-4 text-[#9CA3AF] font-mono">
        Gratis selamanya. Dukung via <b className="text-[#22C55E]">Sociabuzz</b>.
      </p>
      <DonateButton variant="header" />
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-[#1F2937] bg-[#111111] p-4 ${className}`}>
      {children}
    </div>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[11px] tracking-[0.14em] text-[#9CA3AF] font-semibold">
      {children}
    </label>
  );
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[#1F2937] bg-[#0A0A0A] px-3 py-2.5 text-sm font-mono text-[#E5E7EB] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 focus:border-[#22C55E]/40 ${props.className || ""}`}
    />
  );
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-[#1F2937] bg-[#0A0A0A] px-3 py-2.5 text-sm font-mono text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 ${props.className || ""}`}
    />
  );
}
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border border-[#1F2937] bg-[#0A0A0A] px-3 py-2.5 text-sm font-mono text-[#E5E7EB] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#22C55E]/30 ${props.className || ""}`}
    />
  );
}
export function BtnPrimary(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full bg-[#22C55E] px-4 py-2.5 text-sm font-mono font-bold text-[#0A0A0A] hover:bg-[#16A34A] transition disabled:opacity-50 ${props.className || ""}`}
    />
  );
}
export function BtnGhost(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`rounded-full border border-[#1F2937] bg-[#0A0A0A] px-4 py-2.5 text-sm font-mono font-semibold text-[#E5E7EB] hover:border-[#22C55E]/30 transition ${props.className || ""}`}
    />
  );
}
