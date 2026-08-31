"use client";
import { useEffect, useState } from "react";

import { LivePreviewPernyataan } from "@/components/karir/LivePreviewKarir";
import { Card, Input, Label, Select, TextArea, ToolShellKarir } from "@/components/karir/ToolShellKarir";

import { getDraft, saveDraft } from "@/lib/db";
import { exportPernyataanPDF, type PernyataanData } from "@/lib/pdf/karir";

const DRAFT_ID = "karir-pernyataan-v1";
const todayISO = () => new Date().toISOString().slice(0, 10);

const defaultData: PernyataanData = {
  template: "umum",
  nama: "Budi Santoso",
  nik: "3171XXXXXXXXXXXX",
  alamat: "Jl. Mawar No. 12, Jakarta Selatan",
  keperluan: "persyaratan administrasi lamaran kerja",
  isi: "",
  kota: "Jakarta",
  tanggal: todayISO(),
  jabatan: "",
};

export default function Client() {
  const [data, setData] = useState<PernyataanData>(defaultData);
  useEffect(() => {
    getDraft<PernyataanData>(DRAFT_ID).then((d) => {
      if (d) setData({ ...defaultData, ...d });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "surat-pernyataan", "karir", data), 500);
    return () => clearTimeout(t);
  }, [data]);
  const up = (k: keyof PernyataanData, v: string) => setData((p) => ({ ...p, [k]: v as never }));
  return (
    <ToolShellKarir
      title="Surat Pernyataan & Izin, 5 Template"
      subtitle="Pilih template: umum, izin tidak masuk, pakta integritas, domisili, penghasilan. Preview A4 = PDF."
      preview={<LivePreviewPernyataan data={data} />}
      onExport={() => exportPernyataanPDF(data)}
      draftKey={DRAFT_ID}
    >
      <Card>
        <Label>Template</Label>
        <Select value={data.template} onChange={(e) => up("template", e.target.value)}>
          <option value="umum">Pernyataan Umum</option>
          <option value="izin">Izin Tidak Masuk Kerja</option>
          <option value="integritas">Pakta Integritas</option>
          <option value="domisili">Keterangan Domisili</option>
          <option value="penghasilan">Pernyataan Penghasilan</option>
        </Select>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Nama</Label>
            <Input value={data.nama} onChange={(e) => up("nama", e.target.value)} />
          </div>
          <div>
            <Label>NIK</Label>
            <Input value={data.nik} onChange={(e) => up("nik", e.target.value)} />
          </div>
        </div>
        <div className="mt-3">
          <Label>Alamat</Label>
          <Input value={data.alamat} onChange={(e) => up("alamat", e.target.value)} />
        </div>
        {data.template === "integritas" && (
          <div className="mt-3">
            <Label>Jabatan</Label>
            <Input
              value={data.jabatan || ""}
              onChange={(e) => up("jabatan", e.target.value)}
              placeholder="Staff / Calon pegawai"
            />
          </div>
        )}
        <div className="mt-3">
          <Label>Keperluan / alasan singkat</Label>
          <Input
            value={data.keperluan}
            onChange={(e) => up("keperluan", e.target.value)}
            placeholder="untuk ..."
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Kota</Label>
            <Input value={data.kota} onChange={(e) => up("kota", e.target.value)} />
          </div>
          <div>
            <Label>Tanggal</Label>
            <Input
              type="date"
              value={data.tanggal}
              onChange={(e) => up("tanggal", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>
            Isi pernyataan (kosongkan untuk otomatis by template, atau tulis manual EYD)
          </Label>
          <TextArea
            rows={4}
            value={data.isi}
            onChange={(e) => up("isi", e.target.value)}
            placeholder="Biarkan kosong untuk pakai wording template, atau isi manual"
          />
        </div>
      </Card>
      <Card className="bg-[#F8FAFC]">
        <p className="font-mono text-[11px] tracking-[0.12em] font-bold text-[#2563EB]">
          PRATINJAU TEMPLATE
        </p>
        <p className="mt-2 text-xs leading-5 text-[#475569]">
          {data.template === "umum" &&
            "Menyatakan dengan sesungguhnya kebenaran keterangan, siap tanggung jawab."}
          {data.template === "izin" &&
            "Izin tidak masuk kerja dengan tanggal & alasan, komitmen selesaikan tugas."}
          {data.template === "integritas" &&
            "Pakta integritas 4 poin: jujur, anti-KKN, lapor pelanggaran, siap sanksi."}
          {data.template === "domisili" && "Keterangan domisili sesuai KTP/KK untuk administrasi."}
          {data.template === "penghasilan" && "Pernyataan penghasilan bulanan untuk administrasi."}
        </p>
      </Card>
    </ToolShellKarir>
  );
}
