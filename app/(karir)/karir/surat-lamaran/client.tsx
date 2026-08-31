"use client";
import { useEffect, useState } from "react";

import { LivePreviewLamaran } from "@/components/karir/LivePreviewKarir";
import { ToolShellKarir, Card, Label, Input } from "@/components/karir/ToolShellKarir";

import { exportSuratLamaranPDF } from "@/lib/pdf/karir";
import { saveDraft, getDraft } from "@/lib/db";
import type { SuratLamaranData } from "@/lib/pdf/karir";

const DRAFT_ID = "karir-lamaran-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);

const defaultData: SuratLamaranData = {
  nama: "Budi Santoso",
  tempatLahir: "Jakarta",
  tanggalLahir: "1998-05-12",
  alamat: "Jl. Mawar No. 12, Jakarta Selatan",
  telp: "0812-3456-7890",
  email: "budi@email.com",
  perusahaanTujuan: "PT Teknologi Nusantara",
  alamatPerusahaan: "Jl. Sudirman No. 88, Jakarta Pusat",
  posisi: "Staff Administrasi",
  sumberInfo: "situs GSG ID / LinkedIn",
  kotaTanggal: "Jakarta",
  tanggalSurat: todayISO(),
  lampiran: "1 (satu) berkas",
  hormat: "Hormat saya",
};

export default function Client() {
  const [data, setData] = useState<SuratLamaranData>(defaultData);
  useEffect(() => {
    getDraft<SuratLamaranData>(DRAFT_ID).then((d) => {
      if (d) setData({ ...defaultData, ...d });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "surat-lamaran", "karir", data), 500);
    return () => clearTimeout(t);
  }, [data]);
  const up = (k: keyof SuratLamaranData, v: string) => setData((p) => ({ ...p, [k]: v }));
  return (
    <ToolShellKarir
      title="Surat Lamaran Kerja, EYD PUEBI"
      subtitle="Kop pelamar, tanggal formal Indonesia, Yth HRD, biodata, alasan lamaran. Preview kertas A4 25mm margin = PDF."
      preview={<LivePreviewLamaran data={data} />}
      onExport={() => exportSuratLamaranPDF(data)}
      draftKey={DRAFT_ID}
    >
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">PELAMAR</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Nama lengkap</Label>
            <Input value={data.nama} onChange={(e) => up("nama", e.target.value)} />
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
          <div>
            <Label>Alamat</Label>
            <Input value={data.alamat} onChange={(e) => up("alamat", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Telepon</Label>
              <Input value={data.telp} onChange={(e) => up("telp", e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={data.email} onChange={(e) => up("email", e.target.value)} />
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">TUJUAN</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Perusahaan tujuan</Label>
            <Input
              value={data.perusahaanTujuan}
              onChange={(e) => up("perusahaanTujuan", e.target.value)}
            />
          </div>
          <div>
            <Label>Alamat perusahaan</Label>
            <Input
              value={data.alamatPerusahaan}
              onChange={(e) => up("alamatPerusahaan", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Posisi dilamar</Label>
              <Input value={data.posisi} onChange={(e) => up("posisi", e.target.value)} />
            </div>
            <div>
              <Label>Sumber info</Label>
              <Input
                value={data.sumberInfo}
                onChange={(e) => up("sumberInfo", e.target.value)}
                placeholder="LinkedIn / Instagram"
              />
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">SURAT</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Kota</Label>
            <Input value={data.kotaTanggal} onChange={(e) => up("kotaTanggal", e.target.value)} />
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
          <Label>Lampiran</Label>
          <Input value={data.lampiran} onChange={(e) => up("lampiran", e.target.value)} />
        </div>
      </Card>
    </ToolShellKarir>
  );
}
