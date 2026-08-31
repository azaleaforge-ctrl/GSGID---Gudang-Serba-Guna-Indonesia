"use client";
import { useState } from "react";

import { DonateButton } from "@/components/shared/DonateButton";

import { useIsMobile } from "@/hooks/useIsMobile";

export function ToolShellKarir({
  title,
  subtitle,
  children,
  preview,
  onExport,
  draftKey,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  preview: React.ReactNode;
  onExport: () => void;
  draftKey?: string;
}) {
  const { isMobile } = useIsMobile();
  const [active, setActive] = useState<"form" | "preview">("form");

  if (isMobile) {
    return (
      <div className="mx-auto max-w-[640px] px-4 py-6 bg-white">
        <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1 w-fit">
          <button
            onClick={() => setActive("form")}
            className={`rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] transition ${active === "form" ? "bg-[#0F172A] text-white" : "text-[#64748B]"}`}
          >
            FORM
          </button>
          <button
            onClick={() => setActive("preview")}
            className={`rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] transition ${active === "preview" ? "bg-[#2563EB] text-white" : "text-[#64748B]"}`}
          >
            PREVIEW
          </button>
        </div>

        <div className="mt-4">
          {active === "form" ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                <h1 className="font-jakarta font-bold tracking-[-0.02em] text-[#0F172A] text-[18px] leading-tight">
                  {title}
                </h1>
                <p className="mt-1.5 text-sm leading-5 text-[#64748B]">{subtitle}</p>
              </div>
              {children}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onExport}
                  className="rounded-full bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => setActive("preview")}
                  className="rounded-full border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#0F172A]"
                >
                  Lihat Preview →
                </button>
              </div>
              <DonasiBlock />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-auto rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                {preview}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setActive("form")}
                  className="rounded-full border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold"
                >
                  ← Edit
                </button>
                <button
                  onClick={onExport}
                  className="rounded-full bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white"
                >
                  Export PDF
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
    <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-8 bg-white">
      <div className="mb-6 flex items-end justify-between gap-6 border-b border-[#E2E8F0] pb-6">
        <div>
          <h1 className="font-jakarta text-[26px] font-bold tracking-[-0.03em] text-[#0F172A]">
            {title}
          </h1>
          <p className="mt-1.5 max-w-[62ch] text-sm leading-6 text-[#64748B]">{subtitle}</p>
        </div>
        <button
          onClick={onExport}
          className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition"
        >
          Export PDF <span>↓</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-5 space-y-4">
          {children}
          <button
            onClick={onExport}
            className="lg:hidden w-full rounded-full bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white"
          >
            Export PDF
          </button>
          <DonasiBlock />
          {draftKey && (
            <p className="font-mono text-[10px] tracking-[0.14em] text-[#94A3B8]">
              AUTO-SAVE · IndexedDB · {draftKey}
            </p>
          )}
        </div>
        <div className="col-span-7 lg:sticky lg:top-[72px]">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[#2563EB] font-semibold">
                LIVE PREVIEW, 1:1 PDF
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="overflow-auto bg-white rounded-xl border border-[#E2E8F0] max-h-[78vh]">
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
    <div className="rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-4 flex items-center justify-between gap-3">
      <p className="text-xs leading-4 text-[#64748B]">
        Gratis selamanya. Bantu keep alive via <b className="text-[#0F172A]">Sociabuzz</b>.
      </p>
      <DonateButton variant="header" />
    </div>
  );
}

// Swiss atoms, thin 1px borders, generous whitespace
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-[#E2E8F0] bg-white p-4 ${className}`}>{children}</div>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[11px] tracking-[0.14em] text-[#475569] font-semibold">
      {children}
    </label>
  );
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] ${props.className || ""}`}
    />
  );
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm ${props.className || ""}`}
    />
  );
}
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm ${props.className || ""}`}
    />
  );
}
