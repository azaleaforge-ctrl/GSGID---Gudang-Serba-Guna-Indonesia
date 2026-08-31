"use client";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

import { CalcCard, StatGrid } from "@/components/umkm/CalcCard";
import { ToolShell, Card, Label, Input } from "@/components/umkm/ToolShell";

import { calcBEP, formatIDR } from "@/lib/calc/umkm";
import { saveDraft, getDraft } from "@/lib/db";

const DRAFT_ID = "umkm-bep-v1";

export default function BepClient() {
  const [fixed, setFixed] = useState(1500000);
  const [price, setPrice] = useState(25000);
  const [variable, setVariable] = useState(15000);
  const r = useMemo(
    () => calcBEP({ fixedCost: fixed, pricePerUnit: price, variablePerUnit: variable }),
    [fixed, price, variable]
  );

  useEffect(() => {
    getDraft<{ fixed: number; price: number; variable: number }>(DRAFT_ID).then((d) => {
      if (!d) return;
      setFixed(d.fixed ?? 1500000);
      setPrice(d.price ?? 25000);
      setVariable(d.variable ?? 15000);
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(
      () => saveDraft(DRAFT_ID, "kalkulator-bep", "umkm", { fixed, price, variable }),
      400
    );
    return () => clearTimeout(t);
  }, [fixed, price, variable]);

  const exportPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    doc.setFillColor(28, 25, 23);
    doc.rect(0, 0, W, 16, "F");
    doc.setTextColor(255, 251, 235);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Kalkulator BEP, GSG ID /umkm", 14, 10);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("BEP = Fixed / (Price - Variable)", W - 14, 10, { align: "right" });
    let y = 24;
    doc.setTextColor(28, 25, 23);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Fixed Cost: Rp ${formatIDR(fixed)} · Harga: Rp ${formatIDR(price)} · Variabel: Rp ${formatIDR(variable)}`,
      14,
      y
    );
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`Kontribusi margin: Rp ${formatIDR(r.contributionMargin)} / unit`, 14, y);
    y += 8;
    if (!r.valid) {
      doc.setTextColor(220, 38, 38);
      doc.text(`⚠ ${r.reason}, BEP tidak valid`, 14, y);
    } else {
      doc.setTextColor(28, 25, 23);
      doc.setFillColor(255, 251, 235);
      doc.setDrawColor(253, 230, 138);
      doc.rect(14, y, W - 28, 10, "FD");
      doc.text(`BEP Unit: ${r.bepUnit} unit`, 16, y + 6);
      doc.text(`BEP Rupiah: Rp ${formatIDR(r.bepRupiah)}`, W - 16, y + 6, { align: "right" });
    }
    y += 14;
    doc.setFontSize(6);
    doc.setTextColor(120, 113, 108);
    doc.text("gsg.id/umkm/kalkulator-bep, tahu titik impas, bukan tebak.", 14, 290);
    doc.save("bep-gsg.pdf");
  };

  const preview = (
    <div className="bg-white p-5">
      <div className="rounded-2xl border-2 border-[#1C1917] overflow-hidden">
        <div className="bg-[#1C1917] text-white px-4 py-3">
          <p className="font-mono text-[10px] tracking-[0.16em] text-[#FDE68A] font-bold">
            BREAK-EVEN POINT
          </p>
          <p className="font-mono text-[11px] opacity-70">BEP = Fixed ÷ (Harga − Variabel)</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] px-3 py-2 text-center">
              <p className="font-mono text-[10px] tracking-widest">FIXED</p>
              <p className="font-mono font-bold">Rp {formatIDR(fixed)}</p>
            </div>
            <div className="rounded-xl bg-white border-2 border-[#1C1917] px-3 py-2 text-center">
              <p className="font-mono text-[10px] tracking-widest">HARGA</p>
              <p className="font-mono font-bold">Rp {formatIDR(price)}</p>
            </div>
            <div className="rounded-xl bg-white border border-[#E7E5E4] px-3 py-2 text-center">
              <p className="font-mono text-[10px] tracking-widest">VARIABEL</p>
              <p className="font-mono font-bold">Rp {formatIDR(variable)}</p>
            </div>
          </div>

          {!r.valid ? (
            <div className="rounded-xl bg-red-50 border-2 border-red-200 px-4 py-3 text-sm text-red-700">
              ⚠ {r.reason}, perbaiki harga &gt; biaya variabel.
            </div>
          ) : (
            <>
              <div className="rounded-xl bg-[#1C1917] text-white px-4 py-4 flex justify-between items-center">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#FDE68A]">BEP UNIT</p>
                  <p className="font-mono font-black text-[24px] leading-none">
                    {r.bepUnit.toLocaleString("id-ID")} unit
                  </p>
                  <p className="font-mono text-[10px] opacity-60">ceil(Fixed / Margin)</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#FDE68A]">
                    BEP RUPIAH
                  </p>
                  <p className="font-mono font-black text-[18px]">Rp {formatIDR(r.bepRupiah)}</p>
                  <p className="font-mono text-[10px] opacity-60">
                    {r.bepUnit} × Rp {formatIDR(price)}
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2 flex justify-between text-xs">
                <span className="font-mono text-[#92400E]">Margin kontribusi</span>
                <span className="font-mono font-bold">
                  Rp {formatIDR(r.contributionMargin)} / unit
                </span>
              </div>
            </>
          )}
          <p className="font-mono text-[10px] text-[#A8A29E] text-center">
            Preview 1:1 dengan PDF · ceil unit (harus bulat, tidak boleh pecahan).
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ToolShell
      title="Kalkulator BEP, Titik Impas"
      subtitle="Rumus: BEP unit = FixedCost / (Harga − Variabel). BEP rupiah = BEP unit × Harga. Bulatkan ke atas (ceil) karena unit harus bulat."
      preview={preview}
      onExport={exportPDF}
      draftKey={DRAFT_ID}
    >
      <Card>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label>Biaya tetap / Fixed Cost (Rp / bulan)</Label>
            <Input
              type="number"
              value={fixed}
              onChange={(e) => setFixed(Number(e.target.value) || 0)}
            />
            <p className="font-mono text-[10px] text-[#78716C] mt-1">
              Sewa, gaji tetap, listrik tetap.
            </p>
          </div>
          <div>
            <Label>Harga jual per unit (Rp)</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Biaya variabel per unit (Rp)</Label>
            <Input
              type="number"
              value={variable}
              onChange={(e) => setVariable(Number(e.target.value) || 0)}
            />
            <p className="font-mono text-[10px] text-[#78716C] mt-1">
              Bahan + kemasan + ongkir variabel per pcs.
            </p>
          </div>
        </div>
      </Card>
      <StatGrid>
        <CalcCard
          label="KONTRIBUSI MARGIN"
          value={`Rp ${formatIDR(r.contributionMargin)}`}
          sub="Harga − Variabel per unit"
        />
        <CalcCard
          label="BEP UNIT"
          value={r.valid ? `${r.bepUnit.toLocaleString("id-ID")} unit` : " "}
          sub={r.valid ? "ceil(Fixed/Margin)" : r.reason}
          accent={r.valid}
        />
        <CalcCard
          label="BEP RUPIAH"
          value={r.valid ? `Rp ${formatIDR(r.bepRupiah)}` : " "}
          sub={r.valid ? `${r.bepUnit} × Rp ${formatIDR(price)}` : " "}
        />
        <CalcCard
          label="STATUS"
          value={r.valid ? "VALID" : "TIDAK VALID"}
          sub={r.valid ? "Harga > variabel ✓" : "Perbaiki input"}
        />
      </StatGrid>
      {!r.valid && (
        <p className="rounded-xl border-2 border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
          {r.reason}
        </p>
      )}
    </ToolShell>
  );
}
