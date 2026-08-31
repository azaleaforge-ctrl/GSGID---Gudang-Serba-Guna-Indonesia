"use client";
import { autoTerbilang } from "@/lib/pdf/umkm";
import type { KwitansiData } from "@/lib/pdf/umkm";

function fmtIDR(n: number) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
}

export function LivePreviewKwitansi({ data }: { data: KwitansiData }) {
  const tb = data.terbilang || autoTerbilang(data.nominal);
  return (
    <div id="kwitansi-preview" className="bg-white p-4">
      <div className="rounded-none border-[3px] border-[#1C1917] p-[6px]">
        <div className="border border-[#1C1917]/20 p-4">
          {/* header */}
          <div className="bg-[#1C1917] text-[#FFFBEB] -m-4 mb-4 px-4 py-3 flex items-center justify-between">
            <span className="font-jakarta font-black tracking-tight">KWITANSI</span>
            <span className="font-mono text-[10px] tracking-widest opacity-70">
              No: {data.no || "-"}
            </span>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-4 text-xs">
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-[#78716C]">
                TELAH TERIMA DARI
              </p>
              <p className="mt-1 font-bold text-[16px] tracking-tight">{data.terimaDari || "-"}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] tracking-[0.16em] text-[#78716C]">TANGGAL</p>
              <p className="mt-1 font-medium">{data.tanggal || "-"}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#78716C]">JUMLAH UANG</p>
            <div className="mt-1 inline-flex rounded-xl border-2 border-[#1C1917] bg-[#FFFBEB] px-4 py-2">
              <span className="font-mono font-black text-[#EA580C] text-[18px]">
                {fmtIDR(data.nominal)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#78716C]">TERBILANG</p>
            <p className="mt-1 font-mono italic text-sm leading-5 text-[#1C1917] capitalize">
              {tb}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-[#78716C]">
              UNTUK PEMBAYARAN
            </p>
            <p className="mt-1 text-sm leading-6">{data.untuk || "-"}</p>
          </div>

          <div className="mt-6 flex justify-end gap-8">
            <div className="text-center">
              <p className="font-mono text-[10px] tracking-wide text-[#78716C]">
                Metode: {data.metode || "Tunai"}
              </p>
              <div className="mt-8 h-px w-[160px] bg-[#1C1917]" />
              <p className="mt-2 text-xs font-bold">{data.penerbit || "Penerima"}</p>
              <p className="font-mono text-[9px] text-[#78716C]">tanda tangan & cap</p>
            </div>
          </div>

          <p className="mt-6 text-center font-mono text-[9px] tracking-wide text-[#A8A29E]">
            GSG ID · Lorong UMKM · gsgid.vercel.app/umkm, {fmtIDR(data.nominal)}
          </p>
        </div>
      </div>
    </div>
  );
}
