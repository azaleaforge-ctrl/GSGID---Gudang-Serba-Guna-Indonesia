"use client";
import { useEffect, useState } from "react";

import { LivePreviewKwitansi } from "@/components/umkm/LivePreviewKwitansi";
import { ToolShell, Card, Label, Input, Select, TextArea } from "@/components/umkm/ToolShell";

import { exportKwitansiPDF, autoTerbilang } from "@/lib/pdf/umkm";
import { exportPreviewToImage, kwitansiImageFilename } from "@/lib/umkm/exportImage";
import { saveDraft, getDraft } from "@/lib/db";
import type { KwitansiData } from "@/lib/pdf/umkm";

const DRAFT_ID = "umkm-kwitansi-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);

const defaults: KwitansiData = {
  no: "KWT-2026-001",
  tanggal: todayISO(),
  terimaDari: "Budi Santoso",
  nominal: 1500000,
  terbilang: "",
  untuk: "Pembayaran DP catering 50 pax, 20 Jan 2026",
  metode: "Transfer BCA",
  penerbit: "Warung Bu Siti",
};

export default function KwitansiClient() {
  const [data, setData] = useState<KwitansiData>(defaults);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    getDraft<KwitansiData>(DRAFT_ID).then((d) => {
      if (d) setData({ ...defaults, ...d });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "generator-kwitansi", "umkm", data), 500);
    return () => clearTimeout(t);
  }, [data]);

  // auto terbilang
  useEffect(() => {
    if (auto) setData((p) => ({ ...p, terbilang: autoTerbilang(p.nominal) }));
  }, [data.nominal, auto]);

  const upd = (patch: Partial<KwitansiData>) => setData((p) => ({ ...p, ...patch }));

  return (
    <ToolShell
      title="Generator Kwitansi & Nota"
      subtitle="Preview live = PDF landscape 1:1. Terbilang otomatis, tinggal isi nominal & keperluan. Export jsPDF, simpan draft IndexedDB."
      preview={<LivePreviewKwitansi data={data} />}
      onExport={() => exportKwitansiPDF(data)}
      onExportPng={() =>
        exportPreviewToImage("kwitansi-preview", "png", kwitansiImageFilename(data.no))
      }
      onExportJpeg={() =>
        exportPreviewToImage("kwitansi-preview", "jpeg", kwitansiImageFilename(data.no))
      }
      draftKey={DRAFT_ID}
    >
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>No kwitansi</Label>
            <Input value={data.no} onChange={(e) => upd({ no: e.target.value })} />
          </div>
          <div>
            <Label>Tanggal</Label>
            <Input
              type="date"
              value={data.tanggal}
              onChange={(e) => upd({ tanggal: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <Label>Telah terima dari</Label>
            <Input
              value={data.terimaDari}
              onChange={(e) => upd({ terimaDari: e.target.value })}
              placeholder="Nama pembayar"
            />
          </div>
          <div>
            <Label>Nominal (Rp)</Label>
            <Input
              type="number"
              value={data.nominal}
              onChange={(e) => upd({ nominal: Math.max(0, Number(e.target.value) || 0) })}
            />
          </div>
          <div>
            <Label>Metode</Label>
            <Select value={data.metode} onChange={(e) => upd({ metode: e.target.value })}>
              <option>Tunai</option>
              <option>Transfer BCA</option>
              <option>Transfer Mandiri</option>
              <option>QRIS</option>
              <option>Lainnya</option>
            </Select>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <Label>Terbilang</Label>
            <label className="flex items-center gap-1.5 font-mono text-[11px]">
              <input
                type="checkbox"
                checked={auto}
                onChange={(e) => setAuto(e.target.checked)}
                className="accent-[#EA580C]"
              />{" "}
              auto
            </label>
          </div>
          <TextArea
            rows={2}
            value={data.terbilang}
            onChange={(e) => {
              setAuto(false);
              upd({ terbilang: e.target.value });
            }}
          />
          <p className="font-mono text-[10px] text-[#78716C] mt-1">
            Otomatis: {autoTerbilang(data.nominal)}
          </p>
        </div>

        <div className="mt-3">
          <Label>Untuk pembayaran</Label>
          <TextArea
            rows={2}
            value={data.untuk}
            onChange={(e) => upd({ untuk: e.target.value })}
            placeholder="Keperluan / keterangan"
          />
        </div>
        <div className="mt-3">
          <Label>Penerbit / penerima (tanda tangan)</Label>
          <Input
            value={data.penerbit}
            onChange={(e) => upd({ penerbit: e.target.value })}
            placeholder="Nama & usaha"
          />
        </div>
      </Card>

      <Card className="bg-[#FFFBEB] border-[#FDE68A]">
        <p className="font-mono text-[11px] font-bold tracking-widest text-[#92400E]">
          TIPS KWITANSI SAH
        </p>
        <ul className="mt-1 list-disc pl-4 text-xs leading-5 text-[#57534E]">
          <li>Tulis nominal angka & terbilang sama persis.</li>
          <li>Cantumkan no urut, tanggal, untuk apa, dan tanda tangan.</li>
          <li>Thermal: cetak, tempel materai jika &gt; Rp5jt (opsional).</li>
        </ul>
      </Card>
    </ToolShell>
  );
}
