"use client";
import { useEffect, useState } from "react";

import { LivePreviewPaklaring } from "@/components/karir/LivePreviewKarir";
import { ToolShellKarir, Card, Label, Input, TextArea } from "@/components/karir/ToolShellKarir";

import { exportPaklaringPDF } from "@/lib/pdf/karir";
import { saveDraft, getDraft } from "@/lib/db";
import type { PaklaringData } from "@/lib/pdf/karir";

const DRAFT_ID = "karir-paklaring-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);

const defaultData: PaklaringData = {
  nomor: "001/HRD/PKL/VIII/2026",
  perusahaan: "PT Maju Jaya Sejahtera",
  alamatPerusahaan: "Jl. Sudirman No. 88, Jakarta Pusat 10210, Telp. 021-555-1234",
  nama: "Budi Santoso",
  nik: "3171XXXXXXXXXXXX",
  tempatLahir: "Jakarta",
  tanggalLahir: "1998-05-12",
  jabatan: "Staff Administrasi",
  periodeMulai: "2023-01-10",
  periodeSelesai: "2025-08-31",
  keterangan:
    "Selama bekerja menunjukkan dedikasi dan kinerja baik. Surat ini untuk melamar pekerjaan berikutnya.",
  kota: "Jakarta",
  tanggalTerbit: todayISO(),
  penandatangan: "Siti Rahayu",
  jabatanPenanda: "HR Manager",
};

export default function Client() {
  const [data, setData] = useState<PaklaringData>(defaultData);
  useEffect(() => {
    getDraft<PaklaringData>(DRAFT_ID).then((d) => {
      if (d) setData({ ...defaultData, ...d });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "paklaring", "karir", data), 500);
    return () => clearTimeout(t);
  }, [data]);
  const up = (k: keyof PaklaringData, v: string) => setData((p) => ({ ...p, [k]: v }));
  return (
    <ToolShellKarir
      title="Paklaring, Surat Keterangan Kerja"
      subtitle="Nomor, periode, jabatan, stempel HRD. Preview kop garis ganda A4 25mm = PDF."
      preview={<LivePreviewPaklaring data={data} />}
      onExport={() => exportPaklaringPDF(data)}
      draftKey={DRAFT_ID}
    >
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">PERUSAHAAN</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Nama perusahaan</Label>
            <Input value={data.perusahaan} onChange={(e) => up("perusahaan", e.target.value)} />
          </div>
          <div>
            <Label>Alamat perusahaan</Label>
            <Input
              value={data.alamatPerusahaan}
              onChange={(e) => up("alamatPerusahaan", e.target.value)}
            />
          </div>
          <div>
            <Label>Nomor surat</Label>
            <Input value={data.nomor} onChange={(e) => up("nomor", e.target.value)} />
          </div>
        </div>
      </Card>
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">KARYAWAN</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Nama karyawan</Label>
            <Input value={data.nama} onChange={(e) => up("nama", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>NIK / KTP</Label>
              <Input value={data.nik} onChange={(e) => up("nik", e.target.value)} />
            </div>
            <div>
              <Label>Jabatan</Label>
              <Input value={data.jabatan} onChange={(e) => up("jabatan", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Tempat lahir</Label>
              <Input value={data.tempatLahir} onChange={(e) => up("tempatLahir", e.target.value)} />
            </div>
            <div>
              <Label>Tanggal lahir</Label>
              <Input
                type="date"
                value={data.tanggalLahir}
                onChange={(e) => up("tanggalLahir", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Periode mulai</Label>
              <Input
                type="date"
                value={data.periodeMulai}
                onChange={(e) => up("periodeMulai", e.target.value)}
              />
            </div>
            <div>
              <Label>Periode selesai</Label>
              <Input
                type="date"
                value={data.periodeSelesai}
                onChange={(e) => up("periodeSelesai", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Keterangan tambahan</Label>
            <TextArea
              rows={2}
              value={data.keterangan}
              onChange={(e) => up("keterangan", e.target.value)}
            />
          </div>
        </div>
      </Card>
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Kota terbit</Label>
            <Input value={data.kota} onChange={(e) => up("kota", e.target.value)} />
          </div>
          <div>
            <Label>Tanggal terbit</Label>
            <Input
              type="date"
              value={data.tanggalTerbit}
              onChange={(e) => up("tanggalTerbit", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Penandatangan</Label>
            <Input
              value={data.penandatangan}
              onChange={(e) => up("penandatangan", e.target.value)}
            />
          </div>
          <div>
            <Label>Jabatan penandatangan</Label>
            <Input
              value={data.jabatanPenanda}
              onChange={(e) => up("jabatanPenanda", e.target.value)}
            />
          </div>
        </div>
      </Card>
    </ToolShellKarir>
  );
}
