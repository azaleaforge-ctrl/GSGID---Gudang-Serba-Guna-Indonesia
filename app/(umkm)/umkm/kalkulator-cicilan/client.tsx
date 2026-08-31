"use client";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

import { CalcCard, StatGrid } from "@/components/umkm/CalcCard";
import { ToolShell, Card, Label, Input, Select } from "@/components/umkm/ToolShell";

import { calcCicilanFlat, calcCicilanEfektif, formatIDR } from "@/lib/calc/umkm";
import { saveDraft, getDraft } from "@/lib/db";

const DRAFT_ID = "umkm-cicilan-v1";

export default function CicilanClient() {
  const [pokok, setPokok] = useState(10_000_000);
  const [bunga, setBunga] = useState(1.2); // % per bulan
  const [tenor, setTenor] = useState(12);
  const [tipe, setTipe] = useState<"flat" | "efektif">("efektif");

  const flat = useMemo(
    () => calcCicilanFlat({ pokok, bungaPercentPerMonth: bunga, tenor }),
    [pokok, bunga, tenor]
  );
  const efektif = useMemo(
    () => calcCicilanEfektif({ pokok, bungaPercentPerMonth: bunga, tenor }),
    [pokok, bunga, tenor]
  );
  const cur = tipe === "flat" ? flat : efektif;

  useEffect(() => {
    getDraft<{ pokok: number; bunga: number; tenor: number; tipe: "flat" | "efektif" }>(
      DRAFT_ID
    ).then((d) => {
      if (!d) return;
      setPokok(d.pokok ?? 10_000_000);
      setBunga(d.bunga ?? 1.2);
      setTenor(d.tenor ?? 12);
      setTipe(d.tipe ?? "efektif");
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(
      () => saveDraft(DRAFT_ID, "kalkulator-cicilan", "umkm", { pokok, bunga, tenor, tipe }),
      400
    );
    return () => clearTimeout(t);
  }, [pokok, bunga, tenor, tipe]);

  const exportPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    doc.setFillColor(28, 25, 23);
    doc.rect(0, 0, W, 16, "F");
    doc.setTextColor(255, 251, 235);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Kalkulator Cicilan, ${tipe.toUpperCase()} · GSG ID`, 14, 10);
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      tipe === "flat" ? "Flat: bunga = P*r*n" : "Efektif: P·r·(1+r)^n/((1+r)^n−1)",
      W - 14,
      10,
      { align: "right" }
    );
    let y = 22;
    doc.setTextColor(28, 25, 23);
    doc.setFontSize(7);
    doc.text(`Pokok Rp ${formatIDR(pokok)} · Bunga ${bunga}%/bln · Tenor ${tenor} bln`, 14, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(
      `Angsuran: Rp ${formatIDR(cur.angsuran)}/bln · Total bunga Rp ${formatIDR(cur.totalBunga)} · Total bayar Rp ${formatIDR(cur.totalBayar)}`,
      14,
      y
    );
    y += 8;
    // table header
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(253, 230, 138);
    doc.rect(14, y, W - 28, 7, "FD");
    doc.setFontSize(6);
    doc.text("BLN", 16, y + 4.5);
    doc.text("ANGSURAN", 40, y + 4.5, { align: "right" });
    doc.text("BUNGA", 80, y + 4.5, { align: "right" });
    doc.text("POKOK", 120, y + 4.5, { align: "right" });
    doc.text("SISA", W - 16, y + 4.5, { align: "right" });
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    cur.rows.forEach((r) => {
      if (y > 285) {
        doc.addPage();
        y = 14;
      }
      doc.text(String(r.bulan), 16, y);
      doc.text(formatIDR(r.angsuran), 40, y, { align: "right" });
      doc.text(formatIDR(r.bunga), 80, y, { align: "right" });
      doc.text(formatIDR(r.pokok), 120, y, { align: "right" });
      doc.text(formatIDR(r.sisa), W - 16, y, { align: "right" });
      y += 4;
      doc.setDrawColor(243, 244, 246);
      doc.line(14, y - 1, W - 14, y - 1);
    });
    doc.setFontSize(6);
    doc.setTextColor(120, 113, 108);
    doc.text(`gsg.id/umkm/kalkulator-cicilan, OJK akurat. Flat vs Efektif.`, 14, 290);
    doc.save(`cicilan-${tipe}-${tenor}bln.pdf`);
  };

  const preview = (
    <div className="bg-white p-4">
      <div className="rounded-2xl border-2 border-[#1C1917] overflow-hidden">
        <div className="bg-[#1C1917] text-white px-4 py-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.16em] font-bold text-[#FDE68A]">
            TABEL ANGSURAN, {tipe.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] opacity-70">
            {tipe === "flat" ? "Flat" : "Anuitas"} · {bunga}%/bln
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] px-3 py-2 text-center">
              <p className="font-mono text-[10px] tracking-widest">ANGSURAN</p>
              <p className="font-mono font-black">Rp {formatIDR(cur.angsuran)}</p>
            </div>
            <div className="rounded-xl bg-white border border-[#E7E5E4] px-3 py-2 text-center">
              <p className="font-mono text-[10px] tracking-widest">TOTAL BUNGA</p>
              <p className="font-mono font-bold text-[#EA580C]">Rp {formatIDR(cur.totalBunga)}</p>
            </div>
            <div className="rounded-xl bg-[#1C1917] text-white px-3 py-2 text-center">
              <p className="font-mono text-[10px] tracking-widest text-[#FDE68A]">TOTAL BAYAR</p>
              <p className="font-mono font-black">Rp {formatIDR(cur.totalBayar)}</p>
            </div>
          </div>

          <div className="mt-3 max-h-[320px] overflow-auto rounded-xl border border-[#FDE68A]">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 bg-[#FFFBEB] font-mono text-[10px] tracking-widest text-[#92400E]">
                <tr>
                  <th className="px-2 py-1.5 text-left">BLN</th>
                  <th className="px-2 py-1.5 text-right">ANGSURAN</th>
                  <th className="px-2 py-1.5 text-right">BUNGA</th>
                  <th className="px-2 py-1.5 text-right">POKOK</th>
                  <th className="px-2 py-1.5 text-right">SISA</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[11px]">
                {cur.rows.map((r) => (
                  <tr key={r.bulan} className="border-t border-[#FDE68A]/60">
                    <td className="px-2 py-1">{r.bulan}</td>
                    <td className="px-2 py-1 text-right">{formatIDR(r.angsuran)}</td>
                    <td className="px-2 py-1 text-right text-[#92400E]">{formatIDR(r.bunga)}</td>
                    <td className="px-2 py-1 text-right">{formatIDR(r.pokok)}</td>
                    <td className="px-2 py-1 text-right">{formatIDR(r.sisa)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div
              className={`rounded-xl border-2 px-3 py-2 text-xs ${tipe === "flat" ? "border-[#EA580C] bg-[#FFFBEB]" : "border-[#E7E5E4] bg-white opacity-60"}`}
            >
              <p className="font-mono font-bold">FLAT</p>
              <p className="font-mono">Rp {formatIDR(flat.angsuran)}/bln</p>
              <p className="text-[10px] text-[#78716C]">Bunga {formatIDR(flat.totalBunga)}</p>
            </div>
            <div
              className={`rounded-xl border-2 px-3 py-2 text-xs ${tipe === "efektif" ? "border-[#1C1917] bg-[#1C1917] text-white" : "border-[#E7E5E4] bg-white opacity-60"}`}
            >
              <p className="font-mono font-bold">EFEKTIF</p>
              <p className="font-mono">Rp {formatIDR(efektif.angsuran)}/bln</p>
              <p className="text-[10px] opacity-70">Bunga {formatIDR(efektif.totalBunga)}</p>
            </div>
          </div>
          <p className="mt-2 font-mono text-[10px] text-[#A8A29E] text-center">
            Preview 1:1 dengan PDF, tabel identik.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ToolShell
      title="Kalkulator Cicilan, Flat vs Efektif"
      subtitle="Flat: total bunga = pokok × bunga% × tenor. Efektif anuitas OJK: angsuran = P·r·(1+r)^n / ((1+r)^n − 1). Bandingkan, pilih yang paling ringan."
      preview={preview}
      onExport={exportPDF}
      draftKey={DRAFT_ID}
    >
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label>Pokok pinjaman (Rp)</Label>
            <Input
              type="number"
              value={pokok}
              onChange={(e) => setPokok(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Bunga (% / bulan)</Label>
            <Input
              type="number"
              step="0.1"
              value={bunga}
              onChange={(e) => setBunga(Number(e.target.value) || 0)}
            />
            <p className="font-mono text-[10px] text-[#78716C] mt-1">14,4%/tahun = 1,2%/bln</p>
          </div>
          <div>
            <Label>Tenor (bulan)</Label>
            <Input
              type="number"
              value={tenor}
              onChange={(e) => setTenor(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
          <div className="col-span-2">
            <Label>Metode</Label>
            <Select value={tipe} onChange={(e) => setTipe(e.target.value as never)}>
              <option value="efektif">Efektif Anuitas (OJK), rekomendasi</option>
              <option value="flat">Flat</option>
            </Select>
          </div>
        </div>
      </Card>

      <StatGrid>
        <CalcCard
          label="ANGSURAN"
          value={`Rp ${formatIDR(cur.angsuran)}`}
          sub={`${tenor} bulan · ${tipe}`}
          accent
        />
        <CalcCard
          label="TOTAL BUNGA"
          value={`Rp ${formatIDR(cur.totalBunga)}`}
          sub={tipe === "flat" ? "Pokok×r×n" : "Anuitas OJK"}
        />
        <CalcCard
          label="TOTAL BAYAR"
          value={`Rp ${formatIDR(cur.totalBayar)}`}
          sub={`Pokok + bunga`}
        />
        <CalcCard
          label="SELISIH FLAT vs EFEKTIF"
          value={`Rp ${formatIDR(Math.abs(flat.totalBayar - efektif.totalBayar))}`}
          sub={flat.totalBayar > efektif.totalBayar ? "Flat lebih mahal" : "Efektif lebih mahal"}
        />
      </StatGrid>

      <Card className="bg-[#FFFBEB] border-[#FDE68A]">
        <p className="font-mono text-[11px] font-bold tracking-widest text-[#92400E]">
          CATATAN OJK
        </p>
        <p className="mt-1 text-xs leading-5 text-[#57534E]">
          Flat cocok untuk perbandingan kasar, tapi bank pakai <b>efektif anuitas</b>. Selisih bisa
          jutaan, cek kedua tabel sebelum tanda tangan.
        </p>
      </Card>
    </ToolShell>
  );
}
