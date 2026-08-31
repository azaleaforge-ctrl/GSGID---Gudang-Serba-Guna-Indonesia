"use client";
import { useEffect, useState } from "react";

import { LivePreviewInvoice } from "@/components/umkm/LivePreviewInvoice";
import { ToolShell, Card, Label, Input, Select, TextArea } from "@/components/umkm/ToolShell";

import { exportInvoicePDF } from "@/lib/pdf/umkm";
import { exportPreviewToImage, invoiceImageFilename } from "@/lib/umkm/exportImage";
import { saveDraft, getDraft } from "@/lib/db";
import type { InvoiceData } from "@/lib/pdf/umkm";

const DRAFT_ID = "umkm-invoice-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);
const dueISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
};

const defaultData: InvoiceData = {
  no: "INV-2026-001",
  tanggal: todayISO(),
  jatuhTempo: dueISO(),
  template: "minimal",
  from: { name: "Warung Bu Siti", alamat: "Jl. Mawar No. 12, Jakarta", telp: "0812-3456-7890" },
  to: { name: "PT Maju Jaya", alamat: "Jl. Kebon Jeruk No. 88, Jakarta", telp: "021-555-1234" },
  items: [
    { name: "Ayam Geprek Sambal Matah, dus", qty: 10, price: 25000 },
    { name: "Es Teh Manis", qty: 10, price: 5000 },
  ],
  diskonRp: 10000,
  pajakPersen: 11,
  ongkir: 15000,
  catatan: "Pembayaran transfer BCA 1234567890 a.n. Warung Bu Siti. Terima kasih!",
  logoText: "GSG ID, INVOICE",
};

export default function InvoiceClient() {
  const [data, setData] = useState<InvoiceData>(defaultData);

  useEffect(() => {
    getDraft<InvoiceData>(DRAFT_ID).then((d) => {
      if (d)
        setData({
          ...defaultData,
          ...d,
          from: { ...defaultData.from, ...d.from },
          to: { ...defaultData.to, ...d.to },
        });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "generator-invoice", "umkm", data), 500);
    return () => clearTimeout(t);
  }, [data]);

  const update = (patch: Partial<InvoiceData>) => setData((p) => ({ ...p, ...patch }));
  const updateFrom = (patch: Partial<InvoiceData["from"]>) =>
    setData((p) => ({ ...p, from: { ...p.from, ...patch } }));
  const updateTo = (patch: Partial<InvoiceData["to"]>) =>
    setData((p) => ({ ...p, to: { ...p.to, ...patch } }));

  const addItem = () =>
    setData((p) => ({ ...p, items: [...p.items, { name: "", qty: 1, price: 0 }] }));
  const updItem = (i: number, patch: Partial<(typeof data.items)[number]>) =>
    setData((p) => ({
      ...p,
      items: p.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)),
    }));
  const delItem = (i: number) =>
    setData((p) => ({ ...p, items: p.items.filter((_, idx) => idx !== i) }));

  return (
    <ToolShell
      title="Generator Invoice, 3 Template"
      subtitle="Minimal, Materai (kotak Rp10.000), Thermal 58mm. Preview HTML persis sama dengan jsPDF export (A4 + thermal). Pajak 11%, ongkir, diskon. Auto-save IndexedDB."
      preview={<LivePreviewInvoice data={data} />}
      onExport={() => exportInvoicePDF(data)}
      onExportPng={() =>
        exportPreviewToImage("invoice-preview", "png", invoiceImageFilename(data.no))
      }
      onExportJpeg={() =>
        exportPreviewToImage("invoice-preview", "jpeg", invoiceImageFilename(data.no))
      }
      draftKey={DRAFT_ID}
    >
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>No invoice</Label>
            <Input value={data.no} onChange={(e) => update({ no: e.target.value })} />
          </div>
          <div>
            <Label>Template</Label>
            <Select
              value={data.template}
              onChange={(e) => update({ template: e.target.value as never })}
            >
              <option value="minimal">Minimal, A4 bersih</option>
              <option value="materai">Materai, A4 + kotak materai</option>
              <option value="thermal">Thermal, 58mm struk</option>
            </Select>
          </div>
          <div>
            <Label>Tanggal</Label>
            <Input
              type="date"
              value={data.tanggal}
              onChange={(e) => update({ tanggal: e.target.value })}
            />
          </div>
          <div>
            <Label>Jatuh tempo</Label>
            <Input
              type="date"
              value={data.jatuhTempo}
              onChange={(e) => update({ jatuhTempo: e.target.value })}
            />
          </div>
        </div>
      </Card>

      <Card>
        <p className="font-mono text-[11px] tracking-widest font-bold">DARI (penjual)</p>
        <div className="mt-2 space-y-2">
          <Input
            value={data.from.name}
            onChange={(e) => updateFrom({ name: e.target.value })}
            placeholder="Nama usaha"
          />
          <Input
            value={data.from.alamat}
            onChange={(e) => updateFrom({ alamat: e.target.value })}
            placeholder="Alamat"
          />
          <Input
            value={data.from.telp}
            onChange={(e) => updateFrom({ telp: e.target.value })}
            placeholder="Telp/WA"
          />
        </div>
        <p className="mt-3 font-mono text-[11px] tracking-widest font-bold">KEPADA (client)</p>
        <div className="mt-2 space-y-2">
          <Input
            value={data.to.name}
            onChange={(e) => updateTo({ name: e.target.value })}
            placeholder="Nama client"
          />
          <Input
            value={data.to.alamat}
            onChange={(e) => updateTo({ alamat: e.target.value })}
            placeholder="Alamat client"
          />
          <Input
            value={data.to.telp}
            onChange={(e) => updateTo({ telp: e.target.value })}
            placeholder="Telp client"
          />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-widest font-bold">ITEMS</p>
          <button
            onClick={addItem}
            className="rounded-full border-2 border-[#1C1917] bg-[#FFFBEB] px-3 py-1 text-xs font-bold"
          >
            + Item
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.items.map((it, i) => (
            <div key={i} className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB]/50 p-2">
              <Input
                value={it.name}
                onChange={(e) => updItem(i, { name: e.target.value })}
                placeholder={`Item ${i + 1} deskripsi`}
              />
              <div className="mt-2 grid grid-cols-[72px_1fr_auto] gap-2 items-center">
                <Input
                  type="number"
                  value={it.qty}
                  onChange={(e) => updItem(i, { qty: Math.max(0, Number(e.target.value) || 0) })}
                  placeholder="Qty"
                />
                <Input
                  type="number"
                  value={it.price}
                  onChange={(e) => updItem(i, { price: Math.max(0, Number(e.target.value) || 0) })}
                  placeholder="Harga"
                />
                <button
                  onClick={() => delItem(i)}
                  className="rounded-full bg-white border border-[#1C1917] px-2 py-1 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          {data.items.length === 0 && (
            <p className="text-xs text-[#A8A29E] text-center py-2">
              Belum ada item, tambah minimal 1.
            </p>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div>
            <Label>Diskon (Rp)</Label>
            <Input
              type="number"
              value={data.diskonRp}
              onChange={(e) => update({ diskonRp: Math.max(0, Number(e.target.value) || 0) })}
            />
          </div>
          <div>
            <Label>Pajak (%)</Label>
            <Input
              type="number"
              value={data.pajakPersen}
              onChange={(e) => update({ pajakPersen: Math.max(0, Number(e.target.value) || 0) })}
            />
          </div>
          <div>
            <Label>Ongkir (Rp)</Label>
            <Input
              type="number"
              value={data.ongkir}
              onChange={(e) => update({ ongkir: Math.max(0, Number(e.target.value) || 0) })}
            />
          </div>
        </div>
      </Card>

      <Card>
        <Label>Catatan / footer</Label>
        <TextArea
          rows={2}
          value={data.catatan}
          onChange={(e) => update({ catatan: e.target.value })}
          placeholder="Rekening, terima kasih, dll"
        />
        <div className="mt-2">
          <Label>Header text</Label>
          <Input
            value={data.logoText || ""}
            onChange={(e) => update({ logoText: e.target.value })}
            placeholder="GSG ID, INVOICE"
          />
        </div>
      </Card>
    </ToolShell>
  );
}
