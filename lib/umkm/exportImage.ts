"use client";

import { toPng, toJpeg } from "html-to-image";

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function sanitizeFilename(s: string) {
  return (s || "gsg").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function exportPreviewToImage(
  previewId: string,
  format: "png" | "jpeg",
  filenameBase: string
) {
  const node = document.getElementById(previewId);
  if (!node) throw new Error("Preview node not found: " + previewId);

  // Ensure fonts are ready before capture for pixel accuracy
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }

  const opts = {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    // use neutral style to avoid taint
  } as const;

  let dataUrl: string;
  if (format === "png") {
    dataUrl = await toPng(node as HTMLElement, opts);
  } else {
    dataUrl = await toJpeg(node as HTMLElement, { ...opts, quality: 0.92 });
  }

  const ext = format === "png" ? "png" : "jpeg";
  // caller passes base like invoice-INV-001, we add extension
  const filename = `${sanitizeFilename(filenameBase)}.${ext === "jpeg" ? "jpg" : ext}`;
  downloadDataUrl(dataUrl, filename);
}

export function invoiceImageFilename(no: string) {
  return `invoice-${sanitizeFilename(no || "gsg")}`;
}

export function kwitansiImageFilename(no: string) {
  return `kwitansi-${sanitizeFilename(no || "gsg")}`;
}
