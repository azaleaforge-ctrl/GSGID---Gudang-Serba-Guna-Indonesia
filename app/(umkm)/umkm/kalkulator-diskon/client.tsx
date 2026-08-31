"use client";
import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

import { CalcCard, StatGrid } from "@/components/umkm/CalcCard";
import { ToolShell, Card, Label, Input } from "@/components/umkm/ToolShell";

import { calcDiskon, formatIDR } from "@/lib/calc/umkm";
import { saveDraft, getDraft } from "@/lib/db";

const DRAFT_ID = "umkm-diskon-v1";

export default function DiskonClient() {
  const [hargaAwal, setHargaAwal] = useState(100000);
  const [d1, setD1] = useState(20);
  const [d2, setD2] = useState(10);
  const [d3, setD3] = useState(0);
  const [potRp, setPotRp] = useState(0);
  const [qty, setQty] = useState(1);
  const [beli, setBeli] = useState(2);
  const [gratis, setGratis] = useState(1);
  const [pakaiBundling, setPakaiBundling] = useState(false);
  const [modalPerPcs, setModalPerPcs] = useState(60000);

  const diskonPersen = useMemo(() => [d1, d2, d3].filter((n) => n > 0), [d1, d2, d3]);
  const r = useMemo(
    () =>
      calcDiskon({
        hargaAwal,
        diskonPersen,
        diskonRp: potRp,
        qty,
        bundling: pakaiBundling ? { beli, gratis } : undefined,
      }),
    [hargaAwal, diskonPersen, potRp, qty, beli, gratis, pakaiBundling]
  );

  const profitAkhir = r.hargaSatuanEfektif - modalPerPcs;
  const profitPersen = modalPerPcs > 0 ? (profitAkhir / modalPerPcs) * 100 : 0;

  useEffect(() => {
    getDraft<{
      hargaAwal: number;
      d1: number;
      d2: number;
      d3: number;
      potRp: number;
      qty: number;
      beli: number;
      gratis: number;
      pakaiBundling: boolean;
      modalPerPcs: number;
    }>(DRAFT_ID).then((d) => {
      if (!d) return;
      setHargaAwal(d.hargaAwal ?? 100000);
      setD1(d.d1 ?? 20);
      setD2(d.d2 ?? 10);
      setD3(d.d3 ?? 0);
      setPotRp(d.potRp ?? 0);
      setQty(d.qty ?? 1);
      setBeli(d.beli ?? 2);
      setGratis(d.gratis ?? 1);
      setPakaiBundling(d.pakaiBundling ?? false);
      setModalPerPcs(d.modalPerPcs ?? 60000);
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(
      () =>
        saveDraft(DRAFT_ID, "kalkulator-diskon", "umkm", {
          hargaAwal,
          d1,
          d2,
          d3,
          potRp,
          qty,
          beli,
          gratis,
          pakaiBundling,
          modalPerPcs,
        }),
      400
    );
    return () => clearTimeout(t);
  }, [hargaAwal, d1, d2, d3, potRp, qty, beli, gratis, pakaiBundling, modalPerPcs]);

  const exportPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    doc.setFillColor(28, 25, 23);
    doc.rect(0, 0, W, 16, "F");
    doc.setTextColor(255, 251, 235);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Kalkulator Diskon, GSG ID /umkm", 14, 10);
    let y = 24;
    doc.setTextColor(28, 25, 23);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Harga awal Rp ${formatIDR(hargaAwal)} · Diskon ${diskonPersen.join("% + ") || "0"}%${potRp ? ` + Rp ${formatIDR(potRp)}` : ""}`,
      14,
      y
    );
    y += 5;
    if (pakaiBundling) {
      doc.text(
        `Bundling: beli ${beli} gratis ${gratis} · Qty ${qty} (bayar ${r.qtyBayar}, dapat ${r.qtyTotal})`,
        14,
        y
      );
      y += 5;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`Harga satuan efektif: Rp ${formatIDR(r.hargaSatuanEfektif)}`, 14, y);
    y += 5;
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Hemat Rp ${formatIDR(r.hematRp)} (${r.hematPersen}%) · Harga coret Rp ${formatIDR(r.hargaCoret)}`,
      14,
      y
    );
    y += 6;
    doc.text(
      `Modal/pcs Rp ${formatIDR(modalPerPcs)} · Profit akhir Rp ${formatIDR(profitAkhir)}/pcs (${profitPersen.toFixed(1)}%)`,
      14,
      y
    );
    y += 8;
    // bar
    doc.setDrawColor(253, 230, 138);
    doc.line(14, y, W - 14, y);
    y += 6;
    doc.setFontSize(6);
    doc.setTextColor(120, 113, 108);
    doc.text(
      "Diskon bertingkat: harga * (1 - d1%) * (1 - d2%) ... - potongan Rp. Bundling: bayar = paket*beli + sisa.",
      14,
      y
    );
    doc.text("gsg.id/umkm/kalkulator-diskon", 14, 290);
    doc.save("diskon-gsg.pdf");
  };

  const preview = (
    <div className="bg-white p-4">
      <div className="rounded-2xl border-2 border-[#1C1917] overflow-hidden">
        <div className="bg-[#1C1917] text-white px-4 py-3 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.16em] font-bold text-[#FDE68A]">
            HASIL DISKON
          </span>
          <span className="font-mono text-[10px] opacity-70">Harga coret → bayar</span>
        </div>
        <div className="p-4">
          {/* price hero */}
          <div className="flex items-end gap-3">
            <p className="font-mono text-xs line-through decoration-2 decoration-[#EA580C] text-[#78716C]">
              Rp {formatIDR(r.hargaCoret)}
            </p>
            <span className="rounded-full bg-[#EA580C] px-2 py-1 font-mono text-[10px] font-bold text-white">
              −{r.hematPersen}%
            </span>
          </div>
          <p className="font-mono font-black text-[28px] leading-none tracking-tight">
            Rp {formatIDR(r.hargaSatuanEfektif)}
          </p>
          <p className="font-mono text-[10px] tracking-widest text-[#57534E]">
            HARGA SATUAN EFEKTIF {pakaiBundling ? `· bayar ${r.qtyBayar} dapat ${r.qtyTotal}` : ""}
          </p>

          {r.hargaSetelahDiskon !== r.hargaSatuanEfektif && (
            <p className="mt-1 font-mono text-[11px] text-[#92400E]">
              Harga setelah diskon (belum bundling): Rp {formatIDR(r.hargaSetelahDiskon)}
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2">
              <p className="font-mono text-[10px] tracking-widest">HEMAT</p>
              <p className="font-mono font-bold">Rp {formatIDR(r.hematRp)}</p>
              <p className="font-mono text-[10px] text-[#92400E]">{r.hematPersen}%</p>
            </div>
            <div
              className={`rounded-xl border-2 px-3 py-2 ${profitAkhir >= 0 ? "border-[#1C1917] bg-white" : "border-red-300 bg-red-50"}`}
            >
              <p className="font-mono text-[10px] tracking-widest">PROFIT AKHIR /PCS</p>
              <p
                className={`font-mono font-black ${profitAkhir >= 0 ? "text-[#1C1917]" : "text-red-600"}`}
              >
                Rp {formatIDR(profitAkhir)}
              </p>
              <p className="font-mono text-[10px] opacity-60">
                {profitPersen.toFixed(1)}% dari modal
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-[#1C1917] text-white px-3 py-2 flex justify-between items-center text-xs">
            <span className="font-mono tracking-widest text-[#FDE68A]">TOTAL BAYAR</span>
            <span className="font-mono font-black">
              Rp {formatIDR(r.hargaSatuanEfektif * r.qtyTotal)}
            </span>
          </div>
          <p className="font-mono text-[10px] text-[#78716C] text-center mt-1">
            {r.qtyBayar} × Rp {formatIDR(r.hargaSetelahDiskon)} = Rp{" "}
            {formatIDR(r.hargaSatuanEfektif * r.qtyTotal)} untuk {r.qtyTotal} pcs
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <ToolShell
      title="Kalkulator Diskon, Bertingkat & Bundling"
      subtitle="Diskon bertingkat dihitung sekuensial: Harga × (1−d1) × (1−d2) … − potongan Rp. Bundling: bayar X dapat Y, hitung harga satuan efektif & profit akhir agar tidak boncos."
      preview={preview}
      onExport={exportPDF}
      draftKey={DRAFT_ID}
    >
      <Card>
        <Label>Harga awal / harga coret (Rp)</Label>
        <Input
          type="number"
          value={hargaAwal}
          onChange={(e) => setHargaAwal(Number(e.target.value) || 0)}
        />
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <Label>Diskon 1 (%)</Label>
            <Input
              type="number"
              value={d1}
              onChange={(e) => setD1(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
            />
          </div>
          <div>
            <Label>Diskon 2 (%)</Label>
            <Input
              type="number"
              value={d2}
              onChange={(e) => setD2(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
            />
          </div>
          <div>
            <Label>Diskon 3 (%)</Label>
            <Input
              type="number"
              value={d3}
              onChange={(e) => setD3(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Potongan nominal (Rp)</Label>
            <Input
              type="number"
              value={potRp}
              onChange={(e) => setPotRp(Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Qty (pcs)</Label>
            <Input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Modal / HPP per pcs (Rp), untuk cek profit</Label>
          <Input
            type="number"
            value={modalPerPcs}
            onChange={(e) => setModalPerPcs(Number(e.target.value) || 0)}
          />
        </div>
        <label className="mt-3 flex items-center gap-2 rounded-xl border-2 border-[#1C1917] bg-[#FFFBEB] px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={pakaiBundling}
            onChange={(e) => setPakaiBundling(e.target.checked)}
            className="accent-[#EA580C]"
          />
          <span className="font-mono text-xs font-bold">Pakai bundling (beli X gratis Y)</span>
        </label>
        {pakaiBundling && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <Label>Beli</Label>
              <Input
                type="number"
                value={beli}
                onChange={(e) => setBeli(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
            <div>
              <Label>Gratis</Label>
              <Input
                type="number"
                value={gratis}
                onChange={(e) => setGratis(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>
          </div>
        )}
      </Card>

      <StatGrid>
        <CalcCard
          label="HARGA SETELAH DISKON"
          value={`Rp ${formatIDR(r.hargaSetelahDiskon)}`}
          sub={`${diskonPersen.join("% + ") || "0"}% ${potRp ? `+ Rp ${formatIDR(potRp)}` : ""}`}
        />
        <CalcCard
          label="HARGA EFEKTIF /PCS"
          value={`Rp ${formatIDR(r.hargaSatuanEfektif)}`}
          sub={pakaiBundling ? `Bundling ${beli}+${gratis}` : "Tanpa bundling"}
          accent
        />
        <CalcCard
          label="HEMAT"
          value={`Rp ${formatIDR(r.hematRp)}`}
          sub={`${r.hematPersen}% total`}
        />
        <CalcCard
          label="PROFIT AKHIR"
          value={`Rp ${formatIDR(profitAkhir)}`}
          sub={`${profitPersen.toFixed(1)}% · modal Rp ${formatIDR(modalPerPcs)}`}
        />
      </StatGrid>
      {profitAkhir < 0 && (
        <p className="rounded-xl border-2 border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
          ⚠ Minus! Naikkan harga atau kurangi diskon/bundling.
        </p>
      )}
    </ToolShell>
  );
}
