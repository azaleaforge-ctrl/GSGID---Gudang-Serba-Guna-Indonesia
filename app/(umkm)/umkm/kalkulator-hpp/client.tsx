"use client";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

import { CalcCard, StatGrid } from "@/components/umkm/CalcCard";
import { ToolShell, Card, Label, Input } from "@/components/umkm/ToolShell";

import { calcHPP, formatIDR } from "@/lib/calc/umkm";
import { saveDraft, getDraft } from "@/lib/db";

const DRAFT_ID = "umkm-hpp-v1";

export default function HppClient() {
  const [bahan, setBahan] = useState(50000);
  const [tenaga, setTenaga] = useState(20000);
  const [overhead, setOverhead] = useState(10000);
  const [porsi, setPorsi] = useState(10);
  const [margin, setMargin] = useState(30);
  const [nama, setNama] = useState("Ayam Geprek Sambal");

  const result = useMemo(
    () => calcHPP({ bahan, tenaga, overhead, porsi, marginPercent: margin }),
    [bahan, tenaga, overhead, porsi, margin]
  );

  // load draft
  useEffect(() => {
    getDraft<{
      bahan: number;
      tenaga: number;
      overhead: number;
      porsi: number;
      margin: number;
      nama: string;
    }>(DRAFT_ID).then((d) => {
      if (!d) return;
      setBahan(d.bahan ?? 50000);
      setTenaga(d.tenaga ?? 20000);
      setOverhead(d.overhead ?? 10000);
      setPorsi(d.porsi ?? 10);
      setMargin(d.margin ?? 30);
      setNama(d.nama ?? "Ayam Geprek Sambal");
    });
  }, []);
  // save draft
  useEffect(() => {
    const t = setTimeout(
      () =>
        saveDraft(DRAFT_ID, "kalkulator-hpp", "umkm", {
          bahan,
          tenaga,
          overhead,
          porsi,
          margin,
          nama,
        }),
      400
    );
    return () => clearTimeout(t);
  }, [bahan, tenaga, overhead, porsi, margin, nama]);

  const exportPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    doc.setFillColor(28, 25, 23);
    doc.rect(0, 0, W, 16, "F");
    doc.setTextColor(255, 251, 235);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Kalkulator HPP, GSG ID /umkm", 14, 10);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("Preview 1:1, HPP akurat", W - 14, 10, { align: "right" });
    let y = 24;
    doc.setTextColor(28, 25, 23);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(nama || "Produk UMKM", 14, y);
    y += 6;
    doc.setFontSize(7);
    doc.setTextColor(234, 88, 12);
    doc.text("RUMUS: HPP = (Bahan + Tenaga + Overhead) / Porsi", 14, y);
    y += 8;
    doc.setTextColor(28, 25, 23);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const rows: [string, string][] = [
      ["Bahan Baku", "Rp " + formatIDR(bahan)],
      ["Tenaga", "Rp " + formatIDR(tenaga)],
      ["Overhead", "Rp " + formatIDR(overhead)],
      ["Total Biaya", "Rp " + formatIDR(result.totalBiaya)],
      ["Porsi", String(porsi)],
      ["HPP / Porsi", "Rp " + formatIDR(result.hppPerPorsi)],
      ["Margin " + margin + "%", "Rp " + formatIDR(result.marginRp)],
      ["Harga Jual Saran", "Rp " + formatIDR(result.hargaJual)],
      ["Profit / Porsi", "Rp " + formatIDR(result.profit)],
    ];
    rows.forEach(([k, v]) => {
      if (k === "Harga Jual Saran") {
        doc.setFillColor(28, 25, 23);
        doc.rect(14, y - 4, W - 28, 8, "F");
        doc.setTextColor(255, 251, 235);
        doc.setFont("helvetica", "bold");
        doc.text(k, 16, y + 1);
        doc.text(v, W - 16, y + 1, { align: "right" });
        doc.setTextColor(28, 25, 23);
        doc.setFont("helvetica", "normal");
      } else {
        doc.setFont("helvetica", k.includes("HPP") || k.includes("Profit") ? "bold" : "normal");
        doc.text(k, 14, y);
        doc.text(v, W - 14, y, { align: "right" });
      }
      y += 7;
      doc.setDrawColor(253, 230, 138);
      doc.line(14, y - 2, W - 14, y - 2);
    });
    y += 4;
    doc.setFontSize(6);
    doc.setTextColor(120, 113, 108);
    doc.text("gsg.id/umkm/kalkulator-hpp, Hitung HPP biar tidak tekor. Gratis.", 14, 290);
    doc.save(`hpp-${nama.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  };

  const preview = (
    <div className="bg-white p-5">
      <div className="rounded-2xl border-2 border-[#1C1917] overflow-hidden">
        <div className="bg-[#1C1917] text-[#FFFBEB] px-4 py-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.16em] font-bold">RINCIAN HPP</span>
          <span className="font-mono text-[10px]">HPP = (B+T+O)/Porsi</span>
        </div>
        <div className="p-4">
          <p className="font-jakarta font-black text-[18px] tracking-tight">{nama || "Produk"}</p>
          <p className="font-mono text-[10px] tracking-widest text-[#78716C]">
            Porsi: {porsi} · Margin {margin}%
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2">
              <p className="font-mono text-[10px] tracking-widest text-[#92400E]">BAHAN</p>
              <p className="font-mono font-bold">Rp {formatIDR(bahan)}</p>
            </div>
            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2">
              <p className="font-mono text-[10px] tracking-widest text-[#92400E]">TENAGA</p>
              <p className="font-mono font-bold">Rp {formatIDR(tenaga)}</p>
            </div>
            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2">
              <p className="font-mono text-[10px] tracking-widest text-[#92400E]">OVERHEAD</p>
              <p className="font-mono font-bold">Rp {formatIDR(overhead)}</p>
            </div>
            <div className="rounded-xl border border-[#1C1917] bg-white px-3 py-2">
              <p className="font-mono text-[10px] tracking-widest">TOTAL BIAYA</p>
              <p className="font-mono font-black">Rp {formatIDR(result.totalBiaya)}</p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-[#1C1917] text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-[#FDE68A]">
                HARGA JUAL SARAN
              </p>
              <p className="font-mono font-black text-[20px] leading-none">
                Rp {formatIDR(result.hargaJual)}
              </p>
              <p className="font-mono text-[10px] opacity-60">
                HPP Rp {formatIDR(result.hppPerPorsi)} + margin {margin}%
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] text-[#FDE68A]">PROFIT/PORSI</p>
              <p className="font-mono font-bold text-[#FDE68A]">Rp {formatIDR(result.profit)}</p>
            </div>
          </div>
          <p className="mt-2 font-mono text-[10px] text-[#A8A29E] text-center">
            Preview 1:1 dengan PDF, angka identik.
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <div className="rounded-xl border-2 border-[#1C1917] bg-white p-2 text-center">
          <p className="font-mono text-[10px] tracking-widest">HPP/PORSI</p>
          <p className="font-mono font-black">Rp {formatIDR(result.hppPerPorsi)}</p>
        </div>
        <div className="rounded-xl border-2 border-[#1C1917] bg-[#FFFBEB] p-2 text-center">
          <p className="font-mono text-[10px] tracking-widest">MARGIN Rp</p>
          <p className="font-mono font-black">Rp {formatIDR(result.marginRp)}</p>
        </div>
        <div className="rounded-xl border-2 border-[#EA580C] bg-white p-2 text-center">
          <p className="font-mono text-[10px] tracking-widest">TOTAL PROFIT</p>
          <p className="font-mono font-black text-[#EA580C]">
            Rp {formatIDR(result.profit * porsi)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ToolShell
      title="Kalkulator HPP, Harga Pokok Produksi"
      subtitle="Rumus: HPP = (Bahan + Tenaga + Overhead) / Porsi. Atur margin %, dapat harga jual saran & profit otomatis. Akurat, anti tekor."
      preview={preview}
      onExport={exportPDF}
      draftKey={DRAFT_ID}
    >
      <Card>
        <Label>Nama produk</Label>
        <Input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Ayam Geprek Sambal"
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Bahan baku (Rp)</Label>
            <Input
              type="number"
              value={bahan}
              onChange={(e) => setBahan(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Tenaga (Rp)</Label>
            <Input
              type="number"
              value={tenaga}
              onChange={(e) => setTenaga(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Overhead (Rp)</Label>
            <Input
              type="number"
              value={overhead}
              onChange={(e) => setOverhead(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Porsi / batch</Label>
            <Input
              type="number"
              value={porsi}
              onChange={(e) => setPorsi(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Margin profit (%)</Label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={200}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="flex-1 accent-[#EA580C]"
            />
            <span className="rounded-full border-2 border-[#1C1917] bg-[#FFFBEB] px-3 py-1 font-mono font-black text-sm min-w-[72px] text-center">
              {margin}%
            </span>
          </div>
        </div>
      </Card>

      <StatGrid>
        <CalcCard
          label="HPP / PORSI"
          value={`Rp ${formatIDR(result.hppPerPorsi)}`}
          sub={`Total Rp ${formatIDR(result.totalBiaya)} / ${porsi}`}
        />
        <CalcCard
          label="HARGA JUAL SARAN"
          value={`Rp ${formatIDR(result.hargaJual)}`}
          sub={`Margin ${margin}% = Rp ${formatIDR(result.marginRp)}`}
          accent
        />
        <CalcCard
          label="PROFIT / PORSI"
          value={`Rp ${formatIDR(result.profit)}`}
          sub={`Total profit batch Rp ${formatIDR(result.profit * porsi)}`}
        />
        <CalcCard
          label="TOTAL BIAYA"
          value={`Rp ${formatIDR(result.totalBiaya)}`}
          sub="Bahan+Tenaga+Overhead"
        />
      </StatGrid>
    </ToolShell>
  );
}
