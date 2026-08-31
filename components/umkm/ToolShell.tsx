"use client";
import { useState } from "react";

import { DonateButton } from "@/components/shared/DonateButton";

import { useIsMobile } from "@/hooks/useIsMobile";

// — ToolShell: mobile wizard + desktop split —
export function ToolShell({
  title,
  subtitle,
  children,
  preview,
  onExport,
  onExportPng,
  onExportJpeg,
  draftKey,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  preview: React.ReactNode;
  onExport: () => void;
  onExportPng?: () => void;
  onExportJpeg?: () => void;
  draftKey?: string;
}) {
  const { isMobile } = useIsMobile();
  const [active, setActive] = useState<"form" | "preview">("form");

  // — Mobile wizard —
  if (isMobile) {
    return (
      <div className="mx-auto max-w-[640px] px-4 py-6">
        <div className="flex items-center gap-2 rounded-full border border-[#FDE68A] bg-white p-1 w-fit">
          <button
            onClick={() => setActive("form")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wide transition ${active === "form" ? "bg-[#1C1917] text-white" : "text-[#57534E]"}`}
          >
            FORM
          </button>
          <button
            onClick={() => setActive("preview")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-wide transition ${active === "preview" ? "bg-[#EA580C] text-white" : "text-[#57534E]"}`}
          >
            PREVIEW
          </button>
        </div>

        <div className="mt-4">
          {active === "form" ? (
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-[#1C1917] bg-white p-4 shadow-[4px_4px_0_#1C1917]">
                <h1 className="font-jakarta font-black tracking-tight text-[#1C1917]">{title}</h1>
                <p className="mt-1 text-sm leading-5 text-[#57534E]">{subtitle}</p>
              </div>
              {children}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={onExport}
                  className="rounded-full bg-[#1C1917] px-3 py-3 text-xs font-bold text-white shadow-[3px_3px_0_#EA580C]"
                >
                  Export PDF
                </button>
                {onExportPng && (
                  <button
                    onClick={onExportPng}
                    className="rounded-full border-2 border-[#1C1917] bg-white px-3 py-3 text-xs font-bold text-[#1C1917]"
                  >
                    Export PNG
                  </button>
                )}
                {onExportJpeg && (
                  <button
                    onClick={onExportJpeg}
                    className="rounded-full border-2 border-[#1C1917] bg-[#FFFBEB] px-3 py-3 text-xs font-bold text-[#1C1917]"
                  >
                    Export JPEG
                  </button>
                )}
              </div>
              <button
                onClick={() => setActive("preview")}
                className="w-full rounded-full border-2 border-[#1C1917] bg-white px-4 py-3 text-sm font-bold text-[#1C1917]"
              >
                Lihat Preview →
              </button>
              <DonasiBlock />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-auto rounded-2xl border-2 border-[#1C1917] bg-[#FFFBEB] p-3 shadow-[4px_4px_0_#1C1917]">
                {preview}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={onExport}
                  className="rounded-full bg-[#EA580C] px-3 py-3 text-xs font-bold text-white"
                >
                  Export PDF
                </button>
                {onExportPng && (
                  <button
                    onClick={onExportPng}
                    className="rounded-full border-2 border-[#1C1917] bg-white px-3 py-3 text-xs font-bold"
                  >
                    Export PNG
                  </button>
                )}
                {onExportJpeg && (
                  <button
                    onClick={onExportJpeg}
                    className="rounded-full border-2 border-[#1C1917] bg-[#FFFBEB] px-3 py-3 text-xs font-bold"
                  >
                    Export JPEG
                  </button>
                )}
              </div>
              <button
                onClick={() => setActive("form")}
                className="w-full rounded-full border-2 border-[#1C1917] bg-white px-4 py-3 text-sm font-bold"
              >
                ← Edit
              </button>
              <DonasiBlock />
            </div>
          )}
        </div>
      </div>
    );
  }

  // — Desktop split —
  return (
    <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div>
          <h1 className="font-jakarta text-[28px] font-black tracking-[-0.03em] text-[#1C1917]">
            {title}
          </h1>
          <p className="mt-1 max-w-[60ch] text-sm leading-6 text-[#57534E]">{subtitle}</p>
        </div>
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-6 py-3 text-sm font-bold text-white shadow-[4px_4px_0_#EA580C] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#EA580C] transition"
          >
            Export PDF <span>↓</span>
          </button>
          {onExportPng && (
            <button
              onClick={onExportPng}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1C1917] bg-white px-5 py-3 text-sm font-bold text-[#1C1917] hover:bg-[#FFFBEB] transition"
            >
              Export PNG
            </button>
          )}
          {onExportJpeg && (
            <button
              onClick={onExportJpeg}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#1C1917] bg-[#FFFBEB] px-5 py-3 text-sm font-bold text-[#1C1917] hover:bg-white transition"
            >
              Export JPEG
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        <div className="col-span-5 space-y-4">
          {children}
          <div className="lg:hidden grid grid-cols-3 gap-2">
            <button
              onClick={onExport}
              className="rounded-full bg-[#1C1917] px-3 py-3 text-xs font-bold text-white"
            >
              Export PDF
            </button>
            {onExportPng && (
              <button
                onClick={onExportPng}
                className="rounded-full border-2 border-[#1C1917] bg-white px-3 py-3 text-xs font-bold"
              >
                Export PNG
              </button>
            )}
            {onExportJpeg && (
              <button
                onClick={onExportJpeg}
                className="rounded-full border-2 border-[#1C1917] bg-[#FFFBEB] px-3 py-3 text-xs font-bold"
              >
                Export JPEG
              </button>
            )}
          </div>
          <DonasiBlock />
          {draftKey && (
            <p className="font-mono text-[10px] tracking-widest text-[#78716C]">
              AUTO-SAVE · IndexedDB · {draftKey}
            </p>
          )}
        </div>
        <div className="col-span-7 lg:sticky lg:top-[72px]">
          <div className="rounded-[20px] border-2 border-[#1C1917] bg-[#FFFBEB] p-4 shadow-[6px_6px_0_#1C1917]">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-[#92400E]">
                LIVE PREVIEW, 1:1 PDF
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="overflow-auto bg-white rounded-xl border border-[#FDE68A] max-h-[78vh]">
              {preview}
            </div>
            {(onExportPng || onExportJpeg) && (
              <div className="mt-3 flex flex-wrap gap-2 justify-end">
                {onExportPng && (
                  <button
                    onClick={onExportPng}
                    className="rounded-full border-2 border-[#1C1917] bg-white px-4 py-2 text-xs font-bold"
                  >
                    Export PNG
                  </button>
                )}
                {onExportJpeg && (
                  <button
                    onClick={onExportJpeg}
                    className="rounded-full border-2 border-[#1C1917] bg-white px-4 py-2 text-xs font-bold"
                  >
                    Export JPEG
                  </button>
                )}
                <button
                  onClick={onExport}
                  className="rounded-full bg-[#1C1917] px-4 py-2 text-xs font-bold text-white"
                >
                  Export PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// — Donasi —
function DonasiBlock() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#FDE68A] bg-white p-4 flex items-center justify-between gap-3">
      <p className="text-xs leading-4 text-[#57534E]">
        Gratis selamanya. Bantu keep alive via <b className="text-[#1C1917]">Sociabuzz</b>.
      </p>
      <DonateButton variant="header" />
    </div>
  );
}

// — Atoms —
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 border-[#1C1917] bg-white p-4 shadow-[4px_4px_0_#1C1917] ${className}`}
    >
      {children}
    </div>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-[11px] tracking-[0.14em] text-[#57534E] font-semibold">
      {children}
    </label>
  );
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border-2 border-[#1C1917] bg-white px-3 py-2.5 text-sm font-medium text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#EA580C]/30 ${props.className || ""}`}
    />
  );
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border-2 border-[#1C1917] bg-white px-3 py-2.5 text-sm font-medium ${props.className || ""}`}
    />
  );
}
export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl border-2 border-[#1C1917] bg-white px-3 py-2.5 text-sm ${props.className || ""}`}
    />
  );
}
