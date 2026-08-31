"use client";
import jsPDF from "jspdf";

import { calcInvoiceTotal, type InvoiceItem } from "@/lib/calc/umkm";

// Shared invoice data shape — must match LivePreviewInvoice props
export type InvoiceData = {
  no: string;
  tanggal: string;
  jatuhTempo: string;
  template: "minimal" | "materai" | "thermal";
  from: { name: string; alamat: string; telp: string };
  to: { name: string; alamat: string; telp: string };
  items: InvoiceItem[];
  diskonRp: number;
  pajakPersen: number;
  ongkir: number;
  catatan: string;
  logoText?: string;
};

export type KwitansiData = {
  no: string;
  tanggal: string;
  terimaDari: string;
  nominal: number;
  terbilang: string;
  untuk: string;
  metode: string;
  penerbit: string;
};

function fmtIDR(n: number) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
}
function fmtDate(s: string) {
  if (!s) return "-";
  // expect YYYY-MM-DD
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function terbilang(n: number): string {
  if (n === 0) return "nol";
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];
  const conv = (x: number): string => {
    if (x < 12) return satuan[x];
    if (x < 20) return conv(x - 10) + " belas";
    if (x < 100) return conv(Math.floor(x / 10)) + " puluh" + (x % 10 ? " " + conv(x % 10) : "");
    if (x < 200) return "seratus" + (x - 100 ? " " + conv(x - 100) : "");
    if (x < 1000)
      return conv(Math.floor(x / 100)) + " ratus" + (x % 100 ? " " + conv(x % 100) : "");
    if (x < 2000) return "seribu" + (x - 1000 ? " " + conv(x - 1000) : "");
    if (x < 1_000_000)
      return conv(Math.floor(x / 1000)) + " ribu" + (x % 1000 ? " " + conv(x % 1000) : "");
    if (x < 1_000_000_000)
      return (
        conv(Math.floor(x / 1_000_000)) + " juta" + (x % 1_000_000 ? " " + conv(x % 1_000_000) : "")
      );
    return (
      conv(Math.floor(x / 1_000_000_000)) +
      " milyar" +
      (x % 1_000_000_000 ? " " + conv(x % 1_000_000_000) : "")
    );
  };
  return conv(Math.round(n)).trim();
}

// ========== INVOICE PDF ==========
export function exportInvoicePDF(data: InvoiceData) {
  const { subtotal, diskon, pajak, ongkir, total } = calcInvoiceTotal(
    data.items,
    data.diskonRp,
    data.pajakPersen,
    data.ongkir
  );

  if (data.template === "thermal") {
    // 58mm width ≈ 58*2.834=164pt; use 58mm in jsPDF
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [58, 200] });
    let y = 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(data.from.name || "GSG UMKM", 29, y, { align: "center" });
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    if (data.from.alamat) {
      const lines = doc.splitTextToSize(data.from.alamat, 54);
      doc.text(lines, 29, y, { align: "center" });
      y += lines.length * 2.8;
    }
    if (data.from.telp) {
      doc.text(data.from.telp, 29, y, { align: "center" });
      y += 3;
    }
    y += 1;
    doc.setLineWidth(0.2);
    doc.line(2, y, 56, y);
    y += 3;

    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 2, y);
    doc.setFont("helvetica", "normal");
    doc.text(data.no || "-", 56, y, { align: "right" });
    y += 2.8;
    doc.text(fmtDate(data.tanggal), 2, y);
    y += 4;
    doc.text(`Kepada: ${data.to.name || "-"}`, 2, y);
    y += 2.6;
    if (data.to.alamat) {
      const al = doc.splitTextToSize(data.to.alamat, 54);
      doc.text(al, 2, y);
      y += al.length * 2.6;
    }

    doc.line(2, y, 56, y);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.text("RINCIAN", 2, y);
    y += 3;
    doc.setFont("helvetica", "normal");
    data.items.forEach((it, i) => {
      const line = `${i + 1}. ${it.name || "Item"}  ${it.qty}x ${fmtIDR(it.price)}`;
      doc.text(line, 2, y);
      y += 2.8;
      doc.text(fmtIDR(it.qty * it.price), 56, y, { align: "right" });
      y += 3;
      if (y > 185) {
        doc.addPage([58, 200] as unknown as string);
        y = 6;
      }
    });
    y += 1;
    doc.line(2, y, 56, y);
    y += 3;
    const rows: [string, string][] = [
      ["Subtotal", fmtIDR(subtotal)],
      ["Diskon", "- " + fmtIDR(diskon)],
      [`Pajak ${data.pajakPersen}%`, fmtIDR(pajak)],
      ["Ongkir", fmtIDR(ongkir)],
    ];
    rows.forEach(([k, v]) => {
      doc.text(k, 2, y);
      doc.text(v, 56, y, { align: "right" });
      y += 2.8;
    });
    y += 1;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("TOTAL", 2, y);
    doc.text(fmtIDR(total), 56, y, { align: "right" });
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.text("Terima kasih — dibuat via GSG ID /umkm", 29, y, { align: "center" });
    doc.save(`invoice-${data.no || "thermal"}.pdf`);
    return;
  }

  // A4 minimal / materai
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  // header bar
  doc.setFillColor(28, 25, 23); // #1C1917
  doc.rect(0, 0, W, 18, "F");
  doc.setTextColor(255, 251, 235);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(data.logoText || "GSG ID — INVOICE", 14, 11);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("Lorong UMKM · gsgid.vercel.app/umkm", W - 14, 11, { align: "right" });

  // from/to & meta
  let y = 26;
  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(234, 88, 12);
  doc.text("DARI", 14, y);
  doc.text("KEPADA", 74, y);
  doc.text("INVOICE", 150, y);
  y += 4;
  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(data.from.name || "-", 14, y);
  doc.text(data.to.name || "-", 74, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.no || "-", 150, y);
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(87, 83, 78);
  const fromLines = doc.splitTextToSize(
    `${data.from.alamat || ""}${data.from.telp ? " · " + data.from.telp : ""}`,
    52
  );
  const toLines = doc.splitTextToSize(
    `${data.to.alamat || ""}${data.to.telp ? " · " + data.to.telp : ""}`,
    52
  );
  doc.text(fromLines, 14, y);
  doc.text(toLines, 74, y);
  doc.setTextColor(28, 25, 23);
  doc.text(`Tanggal: ${fmtDate(data.tanggal)}`, 150, y);
  y += Math.max(fromLines.length, toLines.length) * 3 + 1;
  doc.text(`Jatuh tempo: ${fmtDate(data.jatuhTempo)}`, 150, y);
  y += 8;

  // table header
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(253, 230, 138);
  doc.rect(14, y, W - 28, 7, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(146, 64, 14);
  doc.text("NO", 16, y + 4.5);
  doc.text("DESKRIPSI", 24, y + 4.5);
  doc.text("QTY", 118, y + 4.5, { align: "center" });
  doc.text("HARGA", 138, y + 4.5, { align: "right" });
  doc.text("JUMLAH", W - 16, y + 4.5, { align: "right" });
  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(28, 25, 23);
  doc.setFontSize(7.5);
  data.items.forEach((it, idx) => {
    if (y > 265) {
      doc.addPage();
      y = 14;
    }
    doc.setDrawColor(253, 230, 138);
    doc.line(14, y + 5, W - 14, y + 5);
    doc.text(String(idx + 1), 16, y + 3.5);
    const name = doc.splitTextToSize(it.name || "Item", 88);
    doc.text(name, 24, y + 3.5);
    doc.text(String(it.qty), 118, y + 3.5, { align: "center" });
    doc.text(fmtIDR(it.price), 138, y + 3.5, { align: "right" });
    doc.text(fmtIDR(it.qty * it.price), W - 16, y + 3.5, { align: "right" });
    y += Math.max(1, name.length) * 4 + 2;
  });

  // totals
  y += 2;
  const totalBoxX = 120;
  const totalBoxW = W - 14 - totalBoxX;
  const row = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(label, totalBoxX + 2, y + 4);
    doc.text(value, W - 16, y + 4, { align: "right" });
    doc.setDrawColor(253, 230, 138);
    doc.line(totalBoxX, y + 6, W - 14, y + 6);
    y += 7;
  };
  doc.setFontSize(7);
  doc.setFillColor(255, 255, 255);
  // subtotal etc
  row("Subtotal", fmtIDR(subtotal));
  row("Diskon", "- " + fmtIDR(diskon));
  row(`Pajak (${data.pajakPersen}%)`, fmtIDR(pajak));
  row("Ongkir", fmtIDR(ongkir));
  // total
  doc.setFillColor(28, 25, 23);
  doc.rect(totalBoxX, y, totalBoxW, 9, "F");
  doc.setTextColor(255, 251, 235);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("TOTAL", totalBoxX + 2, y + 5.5);
  doc.text(fmtIDR(total), W - 16, y + 5.5, { align: "right" });
  y += 12;
  doc.setTextColor(28, 25, 23);

  if (data.catatan) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(87, 83, 78);
    doc.text("Catatan:", 14, y);
    y += 3.5;
    const cat = doc.splitTextToSize(data.catatan, W - 28);
    doc.text(cat, 14, y);
    y += cat.length * 3.5 + 4;
  }

  // materai stamp
  if (data.template === "materai") {
    // dashed border box for stamp
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(0.4);
    doc.setLineDashPattern([2, 2], 0);
    doc.rect(W - 54, y, 40, 28);
    doc.setLineDashPattern([], 0);
    doc.setLineWidth(0.2);
    doc.setFontSize(6);
    doc.setTextColor(234, 88, 12);
    doc.text("MATERAI", W - 34, y + 8, { align: "center" });
    doc.setFontSize(5);
    doc.text("Rp10.000", W - 34, y + 12, { align: "center" });
    doc.setFontSize(5);
    doc.setTextColor(120, 113, 108);
    doc.text("tanda tangan + cap", W - 34, y + 23, { align: "center" });
  }

  // footer
  doc.setFontSize(6);
  doc.setTextColor(120, 113, 108);
  doc.text(
    "Dibuat via GSG ID — Lorong UMKM · gsgid.vercel.app/umkm — Gratis, tanpa login, data di device.",
    14,
    290
  );
  doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID")}`, W - 14, 290, { align: "right" });

  doc.save(`invoice-${(data.no || "gsg").replace(/\s+/g, "-")}.pdf`);
}

// ========== KWITANSI PDF ==========
export function exportKwitansiPDF(data: KwitansiData) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [210, 110] });
  const W = 210;
  const H = 110;
  // border thick
  doc.setDrawColor(28, 25, 23);
  doc.setLineWidth(0.8);
  doc.rect(4, 4, W - 8, H - 8);
  doc.setLineWidth(0.2);
  doc.rect(5.5, 5.5, W - 11, H - 11);

  // header
  doc.setFillColor(28, 25, 23);
  doc.rect(4, 4, W - 8, 14, "F");
  doc.setTextColor(255, 251, 235);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("KWITANSI", 10, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text(`No: ${data.no || "-"}`, W - 10, 13, { align: "right" });

  let y = 24;
  doc.setTextColor(28, 25, 23);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 113, 108);
  doc.text("TELAH TERIMA DARI", 10, y);
  doc.text("TANGGAL", 150, y);
  y += 4;
  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.terimaDari || "-", 10, y);
  doc.setFontSize(7);
  doc.text(fmtDate(data.tanggal), 150, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 113, 108);
  doc.text("JUMLAH UANG", 10, y);
  doc.text("TERBILANG", 10, y + 14);
  y += 4;
  doc.setTextColor(234, 88, 12);
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(253, 230, 138);
  doc.rect(10, y - 3, 80, 9, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(fmtIDR(data.nominal), 12, y + 3);
  y += 14;
  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  const tb = (data.terbilang || terbilang(data.nominal) + " rupiah").trim();
  const lines = doc.splitTextToSize(tb.charAt(0).toUpperCase() + tb.slice(1), 190);
  doc.text(lines, 10, y);
  y += lines.length * 3.5 + 4;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 113, 108);
  doc.setFontSize(7);
  doc.text("UNTUK PEMBAYARAN", 10, y);
  y += 4;
  doc.setTextColor(28, 25, 23);
  doc.setFontSize(8);
  const untuk = doc.splitTextToSize(data.untuk || "-", 120);
  doc.text(untuk, 10, y);
  // signature box
  const sigY = 62;
  doc.setFontSize(6);
  doc.setTextColor(120, 113, 108);
  doc.text(`Metode: ${data.metode || "Tunai"}`, 150, sigY);
  doc.setDrawColor(28, 25, 23);
  doc.line(150, sigY + 18, 198, sigY + 18);
  doc.setTextColor(28, 25, 23);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(data.penerbit || "Penerima", 174, sigY + 22, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(120, 113, 108);
  doc.text("tanda tangan & cap", 174, sigY + 25, { align: "center" });

  // footer tiny
  doc.setFontSize(5);
  doc.text("GSG ID · Lorong UMKM · gsgid.vercel.app/umkm", 10, H - 7);
  doc.text(
    `Nominal: ${fmtIDR(data.nominal)} · Dicetak ${new Date().toLocaleDateString("id-ID")}`,
    W - 10,
    H - 7,
    { align: "right" }
  );

  doc.save(`kwitansi-${(data.no || "gsg").replace(/\s+/g, "-")}.pdf`);
}

export function autoTerbilang(n: number) {
  const t = terbilang(n);
  return t.charAt(0).toUpperCase() + t.slice(1) + " rupiah";
}
