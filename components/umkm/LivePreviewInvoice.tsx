"use client";
import { calcInvoiceTotal } from "@/lib/calc/umkm";
import type { InvoiceData } from "@/lib/pdf/umkm";

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID").format(Math.round(n));
}
function fmtIDR(n: number) {
  return "Rp " + fmt(n);
}

export function LivePreviewInvoice({ data }: { data: InvoiceData }) {
  const { subtotal, diskon, pajak, ongkir, total } = calcInvoiceTotal(
    data.items,
    data.diskonRp,
    data.pajakPersen,
    data.ongkir
  );

  if (data.template === "thermal") {
    return (
      <div
        id="invoice-preview"
        className="mx-auto w-[280px] bg-white text-[#1C1917] p-4 font-mono text-[11px] leading-[1.4] border border-dashed border-[#1C1917]/20"
      >
        <div className="text-center">
          <p className="font-black tracking-tight text-[13px]">{data.from.name || "GSG UMKM"}</p>
          {data.from.alamat && (
            <p className="text-[9px] leading-3 text-[#57534E] mt-1">{data.from.alamat}</p>
          )}
          {data.from.telp && <p className="text-[9px] text-[#57534E]">{data.from.telp}</p>}
          <div className="my-2 border-t border-dashed border-[#1C1917]/30" />
        </div>
        <div className="flex justify-between">
          <span className="font-bold">INVOICE</span>
          <span>{data.no || "-"}</span>
        </div>
        <p className="text-[10px] text-[#57534E]">{data.tanggal || "-"}</p>
        <p className="mt-2 text-[10px]">Kepada: {data.to.name || "-"}</p>
        {data.to.alamat && <p className="text-[9px] text-[#57534E]">{data.to.alamat}</p>}
        <div className="my-2 border-t border-[#1C1917]" />
        <p className="font-bold mb-1">RINCIAN</p>
        {data.items.map((it, i) => (
          <div
            key={i}
            className="flex justify-between gap-2 py-1 border-b border-dotted border-[#E7E5E4]"
          >
            <span className="truncate">
              {i + 1}. {it.name || "Item"} · {it.qty}x {fmtIDR(it.price)}
            </span>
            <span className="shrink-0 font-bold">{fmtIDR(it.qty * it.price)}</span>
          </div>
        ))}
        <div className="mt-2 space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{fmtIDR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Diskon</span>
            <span>- {fmtIDR(diskon)}</span>
          </div>
          <div className="flex justify-between">
            <span>Pajak {data.pajakPersen}%</span>
            <span>{fmtIDR(pajak)}</span>
          </div>
          <div className="flex justify-between">
            <span>Ongkir</span>
            <span>{fmtIDR(ongkir)}</span>
          </div>
          <div className="flex justify-between font-black text-[12px] border-t-2 border-[#1C1917] pt-1 mt-1">
            <span>TOTAL</span>
            <span>{fmtIDR(total)}</span>
          </div>
        </div>
        <p className="mt-3 text-center text-[9px] tracking-wide text-[#78716C]">
          Terima kasih, GSG ID /umkm
        </p>
        <p className="text-center text-[8px] text-[#A8A29E]">58mm thermal</p>
      </div>
    );
  }

  // Minimal / Materai, same layout as PDF, pixel-mirrored
  return (
    <div id="invoice-preview" className="bg-white text-[#1C1917] p-0 overflow-hidden">
      {/* header */}
      <div className="bg-[#1C1917] text-[#FFFBEB] px-6 py-3 flex items-center justify-between">
        <span className="font-jakarta font-black tracking-tight text-sm">
          {data.logoText || "GSG ID, INVOICE"}
        </span>
        <span className="font-mono text-[10px] tracking-widest opacity-70">
          Lorong UMKM · gsgid.vercel.app/umkm
        </span>
      </div>

      <div className="p-6">
        {/* meta */}
        <div className="grid grid-cols-3 gap-6 text-xs">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#EA580C] font-bold">DARI</p>
            <p className="mt-1 font-bold">{data.from.name || "-"}</p>
            <p className="text-[#57534E] leading-4">
              {data.from.alamat || ""} {data.from.telp ? `· ${data.from.telp}` : ""}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#EA580C] font-bold">
              KEPADA
            </p>
            <p className="mt-1 font-bold">{data.to.name || "-"}</p>
            <p className="text-[#57534E] leading-4">
              {data.to.alamat || ""} {data.to.telp ? `· ${data.to.telp}` : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#EA580C] font-bold">
              INVOICE
            </p>
            <p className="mt-1 font-black text-[16px] tracking-tight">{data.no || "-"}</p>
            <p className="text-[#57534E]">Tanggal: {data.tanggal || "-"}</p>
            <p className="text-[#57534E]">Jatuh tempo: {data.jatuhTempo || "-"}</p>
          </div>
        </div>

        {/* table */}
        <div className="mt-6 overflow-hidden rounded-xl border-2 border-[#1C1917]">
          <div className="grid grid-cols-[32px_1fr_64px_96px_110px] gap-0 bg-[#FFFBEB] border-b-2 border-[#1C1917] px-3 py-2 font-mono text-[10px] tracking-widest font-black text-[#92400E]">
            <span>NO</span>
            <span>DESKRIPSI</span>
            <span className="text-center">QTY</span>
            <span className="text-right">HARGA</span>
            <span className="text-right">JUMLAH</span>
          </div>
          {data.items.map((it, i) => (
            <div
              key={i}
              className="grid grid-cols-[32px_1fr_64px_96px_110px] gap-0 px-3 py-2.5 text-xs border-b border-[#FDE68A] last:border-0"
            >
              <span className="font-mono text-[#78716C]">{i + 1}</span>
              <span className="font-medium">{it.name || "Item"}</span>
              <span className="text-center font-mono">{it.qty}</span>
              <span className="text-right font-mono">{fmtIDR(it.price)}</span>
              <span className="text-right font-mono font-bold">{fmtIDR(it.qty * it.price)}</span>
            </div>
          ))}
          {data.items.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-[#A8A29E]">Belum ada item</div>
          )}
        </div>

        {/* totals */}
        <div className="mt-4 flex justify-end">
          <div className="w-[280px] rounded-xl border-2 border-[#1C1917] overflow-hidden">
            {[
              ["Subtotal", fmtIDR(subtotal)],
              ["Diskon", "- " + fmtIDR(diskon)],
              [`Pajak (${data.pajakPersen}%)`, fmtIDR(pajak)],
              ["Ongkir", fmtIDR(ongkir)],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between px-3 py-2 text-xs border-b border-[#FDE68A] bg-white"
              >
                <span className="text-[#57534E]">{k}</span>
                <span className="font-mono font-medium">{v}</span>
              </div>
            ))}
            <div className="flex justify-between bg-[#1C1917] px-3 py-3 text-white">
              <span className="text-xs font-black tracking-widest">TOTAL</span>
              <span className="font-mono font-black">{fmtIDR(total)}</span>
            </div>
          </div>
        </div>

        {data.catatan && (
          <div className="mt-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2">
            <p className="font-mono text-[10px] tracking-widest text-[#92400E]">CATATAN</p>
            <p className="text-xs leading-5 text-[#57534E]">{data.catatan}</p>
          </div>
        )}

        {data.template === "materai" && (
          <div className="mt-4 flex justify-end">
            <div className="grid h-[84px] w-[160px] place-items-center rounded-xl border-2 border-dashed border-[#EA580C] bg-[#FFFBEB] text-center">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#EA580C] font-black">
                  MATERAI Rp10.000
                </p>
                <p className="font-mono text-[9px] text-[#78716C]">tanda tangan + cap</p>
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 font-mono text-[9px] tracking-wide text-[#A8A29E] text-center">
          Dibuat via GSG ID, Lorong UMKM · gsgid.vercel.app/umkm
        </p>
      </div>
    </div>
  );
}
