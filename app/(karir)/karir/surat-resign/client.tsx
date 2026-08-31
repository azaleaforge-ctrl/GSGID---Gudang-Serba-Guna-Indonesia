"use client";
import { useEffect, useState } from "react";

import { LivePreviewResign } from "@/components/karir/LivePreviewKarir";
import { ToolShellKarir, Card, Label, Input, TextArea } from "@/components/karir/ToolShellKarir";

import { exportSuratResignPDF } from "@/lib/pdf/karir";
import { saveDraft, getDraft } from "@/lib/db";
import type { SuratResignData } from "@/lib/pdf/karir";

const DRAFT_ID = "karir-resign-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);
const nextMonthISO = () => {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return d.toISOString().slice(0, 10);
};

const defaultData: SuratResignData = {
  nama: "Budi Santoso",
  jabatan: "Staff Administrasi",
  departemen: "Operasional",
  perusahaan: "PT Maju Jaya",
  alamatPerusahaan: "Jl. Kebon Jeruk No. 88, Jakarta Barat",
  tanggalSurat: todayISO(),
  tanggalEfektif: nextMonthISO(),
  alasan: "Mengembangkan karier di bidang lain dan melanjutkan studi.",
  ucapan:
    "Saya mengucapkan terima kasih atas kesempatan, bimbingan, dan pengalaman berharga selama bekerja. Semoga perusahaan semakin maju.",
  kota: "Jakarta",
};

export default function Client() {
  const [data, setData] = useState<SuratResignData>(defaultData);
  useEffect(() => {
    getDraft<SuratResignData>(DRAFT_ID).then((d) => {
      if (d) setData({ ...defaultData, ...d });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "surat-resign", "karir", data), 500);
    return () => clearTimeout(t);
  }, [data]);
  const up = (k: keyof SuratResignData, v: string) => setData((p) => ({ ...p, [k]: v }));
  return (
    <ToolShellKarir
      title="Surat Pengunduran Diri, Resign"
      subtitle="Alasan, tanggal efektif, komitmen serah terima. Preview formal A4 = PDF."
      preview={<LivePreviewResign data={data} />}
      onExport={() => exportSuratResignPDF(data)}
      draftKey={DRAFT_ID}
    >
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">IDENTITAS</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Nama</Label>
            <Input value={data.nama} onChange={(e) => up("nama", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Jabatan</Label>
              <Input value={data.jabatan} onChange={(e) => up("jabatan", e.target.value)} />
            </div>
            <div>
              <Label>Departemen</Label>
              <Input value={data.departemen} onChange={(e) => up("departemen", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Perusahaan</Label>
            <Input value={data.perusahaan} onChange={(e) => up("perusahaan", e.target.value)} />
          </div>
          <div>
            <Label>Alamat perusahaan</Label>
            <Input
              value={data.alamatPerusahaan}
              onChange={(e) => up("alamatPerusahaan", e.target.value)}
            />
          </div>
        </div>
      </Card>
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Kota</Label>
            <Input value={data.kota} onChange={(e) => up("kota", e.target.value)} />
          </div>
          <div>
            <Label>Tanggal surat</Label>
            <Input
              type="date"
              value={data.tanggalSurat}
              onChange={(e) => up("tanggalSurat", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Tanggal efektif resign</Label>
          <Input
            type="date"
            value={data.tanggalEfektif}
            onChange={(e) => up("tanggalEfektif", e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Label>Alasan</Label>
          <TextArea rows={3} value={data.alasan} onChange={(e) => up("alasan", e.target.value)} />
        </div>
        <div className="mt-3">
          <Label>Ucapan terima kasih</Label>
          <TextArea rows={3} value={data.ucapan} onChange={(e) => up("ucapan", e.target.value)} />
        </div>
      </Card>
    </ToolShellKarir>
  );
}
