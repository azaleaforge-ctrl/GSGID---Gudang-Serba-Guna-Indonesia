"use client";
import { useEffect, useState } from "react";

import { LivePreviewPerjanjian } from "@/components/karir/LivePreviewKarir";
import { ToolShellKarir, Card, Label, Input, TextArea } from "@/components/karir/ToolShellKarir";

import { exportPerjanjianPDF } from "@/lib/pdf/karir";
import { saveDraft, getDraft } from "@/lib/db";
import type { PerjanjianData } from "@/lib/pdf/karir";

const DRAFT_ID = "karir-perjanjian-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);
const nextYearISO = () => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
};

const defaultData: PerjanjianData = {
  nomor: "002/PKWT/VIII/2026",
  perusahaan: "PT Maju Jaya Sejahtera",
  alamatPerusahaan: "Jl. Sudirman No. 88, Jakarta Pusat",
  pihak1Nama: "Siti Rahayu",
  pihak1Jabatan: "HR Manager",
  pihak2Nama: "Budi Santoso",
  pihak2Nik: "3171XXXXXXXXXXXX",
  pihak2Alamat: "Jl. Mawar No. 12, Jakarta Selatan",
  jabatan: "Staff Administrasi",
  lokasiKerja: "Kantor Pusat Jakarta",
  tanggalMulai: todayISO(),
  tanggalSelesai: nextYearISO(),
  gaji: 5500000,
  jamKerja: "Senin–Jumat, 09.00–17.00 (40 jam/minggu)",
  hakKewajiban:
    "PIHAK KEDUA wajib menjalankan tugas sesuai SOP; PIHAK PERTAMA memberikan gaji, BPJS, dan cuti 12 hari/tahun.",
  kota: "Jakarta",
  tanggalSurat: todayISO(),
};

export default function Client() {
  const [data, setData] = useState<PerjanjianData>(defaultData);
  useEffect(() => {
    getDraft<PerjanjianData>(DRAFT_ID).then((d) => {
      if (d) setData({ ...defaultData, ...d });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "perjanjian-kerja", "karir", data), 500);
    return () => clearTimeout(t);
  }, [data]);
  const up = (k: keyof PerjanjianData, v: string | number) =>
    setData((p) => ({ ...p, [k]: v as never }));
  return (
    <ToolShellKarir
      title="Perjanjian Kerja Sederhana, PKWT"
      subtitle="7 pasal (jabatan, jangka waktu, gaji, jam kerja, hak kewajiban). Preview 2 halaman A4 = PDF."
      preview={<LivePreviewPerjanjian data={data} />}
      onExport={() => exportPerjanjianPDF(data)}
      draftKey={DRAFT_ID}
    >
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">NOMOR & PIHAK PERTAMA</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Nomor perjanjian</Label>
            <Input value={data.nomor} onChange={(e) => up("nomor", e.target.value)} />
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Nama pihak 1</Label>
              <Input value={data.pihak1Nama} onChange={(e) => up("pihak1Nama", e.target.value)} />
            </div>
            <div>
              <Label>Jabatan pihak 1</Label>
              <Input
                value={data.pihak1Jabatan}
                onChange={(e) => up("pihak1Jabatan", e.target.value)}
              />
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">PIHAK KEDUA & PEKERJAAN</p>
        <div className="mt-3 space-y-3">
          <div>
            <Label>Nama pihak 2</Label>
            <Input value={data.pihak2Nama} onChange={(e) => up("pihak2Nama", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>NIK</Label>
              <Input value={data.pihak2Nik} onChange={(e) => up("pihak2Nik", e.target.value)} />
            </div>
            <div>
              <Label>Jabatan</Label>
              <Input value={data.jabatan} onChange={(e) => up("jabatan", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Alamat pihak 2</Label>
            <Input value={data.pihak2Alamat} onChange={(e) => up("pihak2Alamat", e.target.value)} />
          </div>
          <div>
            <Label>Lokasi kerja</Label>
            <Input value={data.lokasiKerja} onChange={(e) => up("lokasiKerja", e.target.value)} />
          </div>
        </div>
      </Card>
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Tanggal mulai</Label>
            <Input
              type="date"
              value={data.tanggalMulai}
              onChange={(e) => up("tanggalMulai", e.target.value)}
            />
          </div>
          <div>
            <Label>Tanggal selesai</Label>
            <Input
              type="date"
              value={data.tanggalSelesai}
              onChange={(e) => up("tanggalSelesai", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Gaji (Rp)</Label>
            <Input
              type="number"
              value={data.gaji}
              onChange={(e) => up("gaji", Number(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label>Kota</Label>
            <Input value={data.kota} onChange={(e) => up("kota", e.target.value)} />
          </div>
        </div>
        <div className="mt-3">
          <Label>Tanggal surat</Label>
          <Input
            type="date"
            value={data.tanggalSurat}
            onChange={(e) => up("tanggalSurat", e.target.value)}
          />
        </div>
        <div className="mt-3">
          <Label>Jam kerja</Label>
          <Input value={data.jamKerja} onChange={(e) => up("jamKerja", e.target.value)} />
        </div>
        <div className="mt-3">
          <Label>Hak & kewajiban (Pasal 5)</Label>
          <TextArea
            rows={3}
            value={data.hakKewajiban}
            onChange={(e) => up("hakKewajiban", e.target.value)}
          />
        </div>
      </Card>
    </ToolShellKarir>
  );
}
