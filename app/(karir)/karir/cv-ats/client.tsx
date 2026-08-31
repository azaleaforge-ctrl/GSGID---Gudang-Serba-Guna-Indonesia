"use client";
import { useEffect, useState } from "react";

import { LivePreviewCV } from "@/components/karir/LivePreviewKarir";
import { ToolShellKarir, Card, Label, Input, TextArea } from "@/components/karir/ToolShellKarir";

import { exportCVPDF } from "@/lib/pdf/karir";
import { hitungATSScore } from "@/lib/calc/karir";
import { saveDraft, getDraft } from "@/lib/db";
import type { CVData } from "@/lib/calc/karir";

const DRAFT_ID = "karir-cv-ats-v1";

const defaultData: CVData = {
  biodata: {
    nama: "Budi Santoso",
    email: "budi@email.com",
    telp: "0812-3456-7890",
    alamat: "Jakarta Selatan, DKI Jakarta",
    linkedin: "linkedin.com/in/budisantoso",
    portfolio: "budisantoso.dev",
  },
  ringkasan:
    "Fresh graduate Sistem Informasi dengan pengalaman magang analisis data dan pengembangan web. Terbiasa bekerja dalam tim, mencapai target, dan mengerjakan proyek berbasis analisis. Menguasai Excel, komunikasi, dan administrasi.",
  pengalaman: [
    {
      jabatan: "Magang Analis Data",
      perusahaan: "PT Maju Jaya",
      periode: "Jun 2025, Agu 2025",
      deskripsi:
        "Menganalisis 1.200 baris data penjualan, membuat dashboard Excel, meningkatkan akurasi laporan 18%.",
    },
    {
      jabatan: "Staff Administrasi",
      perusahaan: "Koperasi Sejahtera",
      periode: "2024",
      deskripsi: "Mengelola arsip, input data, dan koordinasi tim 4 orang.",
    },
  ],
  pendidikan: [
    {
      jenjang: "S1",
      institusi: "Universitas Indonesia",
      tahun: "2021, 2025",
      jurusan: "Sistem Informasi, IPK 3.72",
    },
  ],
  skills: "Microsoft Excel, Analisis Data, Komunikasi, Administrasi, Tim, Manajemen Proyek",
  bahasa: "Indonesia (native), Inggris (intermediate)",
  sertifikat: "Sertifikat Excel Advanced, MyEduSolve 2025",
};

export default function Client() {
  const [data, setData] = useState<CVData>(defaultData);
  const ats = hitungATSScore(data);

  useEffect(() => {
    getDraft<CVData>(DRAFT_ID).then((d) => {
      if (d)
        setData({
          ...defaultData,
          ...d,
          biodata: { ...defaultData.biodata, ...(d as CVData).biodata },
        });
    });
  }, []);
  useEffect(() => {
    const t = setTimeout(() => saveDraft(DRAFT_ID, "cv-ats", "karir", data), 500);
    return () => clearTimeout(t);
  }, [data]);

  const upBio = (k: keyof CVData["biodata"], v: string) =>
    setData((p) => ({ ...p, biodata: { ...p.biodata, [k]: v } }));
  const addExp = () =>
    setData((p) => ({
      ...p,
      pengalaman: [...p.pengalaman, { jabatan: "", perusahaan: "", periode: "", deskripsi: "" }],
    }));
  const updExp = (i: number, patch: Partial<CVData["pengalaman"][number]>) =>
    setData((p) => ({
      ...p,
      pengalaman: p.pengalaman.map((e, idx) => (idx === i ? { ...e, ...patch } : e)),
    }));
  const delExp = (i: number) =>
    setData((p) => ({ ...p, pengalaman: p.pengalaman.filter((_, idx) => idx !== i) }));
  const addEdu = () =>
    setData((p) => ({
      ...p,
      pendidikan: [...p.pendidikan, { jenjang: "", institusi: "", tahun: "", jurusan: "" }],
    }));
  const updEdu = (i: number, patch: Partial<CVData["pendidikan"][number]>) =>
    setData((p) => ({
      ...p,
      pendidikan: p.pendidikan.map((e, idx) => (idx === i ? { ...e, ...patch } : e)),
    }));
  const delEdu = (i: number) =>
    setData((p) => ({ ...p, pendidikan: p.pendidikan.filter((_, idx) => idx !== i) }));

  return (
    <ToolShellKarir
      title="CV ATS Generator, 1 Halaman"
      subtitle="Form lengkap, skor ATS 0–100 live, preview A4 15mm Helvetica tanpa tabel/grafik. Export PDF searchable, identik dengan preview."
      preview={<LivePreviewCV data={data} />}
      onExport={() => exportCVPDF(data)}
      draftKey={DRAFT_ID}
    >
      {/* ATS score */}
      <Card className="bg-[#F8FAFC]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.14em] font-bold text-[#0F172A]">
            ATS SCORE, LIVE
          </p>
          <span
            className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${ats.score >= 80 ? "bg-emerald-500 text-white" : ats.score >= 60 ? "bg-amber-400 text-[#0F172A]" : "bg-[#E2E8F0] text-[#475569]"}`}
          >
            {ats.score}/100
          </span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
          <div className="h-full bg-[#2563EB] transition-all" style={{ width: `${ats.score}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {ats.breakdown.map((b) => (
            <div
              key={b.label}
              className={`rounded-lg border px-2.5 py-2 ${b.ok ? "bg-emerald-50 border-emerald-200" : "bg-white border-[#E2E8F0]"}`}
            >
              <p className="font-mono text-[10px] tracking-wide text-[#64748B]">{b.label}</p>
              <p className="font-mono text-xs font-bold">
                {b.score}/{b.max}
              </p>
            </div>
          ))}
        </div>
        {ats.suggestions.length > 0 && (
          <ul className="mt-3 list-disc pl-4 text-xs leading-5 text-[#475569]">
            {ats.suggestions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <p className="font-mono text-[11px] tracking-[0.14em] font-bold">BIODATA</p>
        <div className="mt-3 grid grid-cols-1 gap-3">
          <div>
            <Label>Nama lengkap</Label>
            <Input
              value={data.biodata.nama}
              onChange={(e) => upBio("nama", e.target.value)}
              placeholder="Budi Santoso"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Email</Label>
              <Input
                value={data.biodata.email}
                onChange={(e) => upBio("email", e.target.value)}
                placeholder="budi@email.com"
              />
            </div>
            <div>
              <Label>Telepon</Label>
              <Input
                value={data.biodata.telp}
                onChange={(e) => upBio("telp", e.target.value)}
                placeholder="0812-..."
              />
            </div>
          </div>
          <div>
            <Label>Alamat (kota)</Label>
            <Input
              value={data.biodata.alamat}
              onChange={(e) => upBio("alamat", e.target.value)}
              placeholder="Jakarta Selatan"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>LinkedIn (opsional)</Label>
              <Input
                value={data.biodata.linkedin}
                onChange={(e) => upBio("linkedin", e.target.value)}
                placeholder="linkedin.com/in/..."
              />
            </div>
            <div>
              <Label>Portfolio (opsional)</Label>
              <Input
                value={data.biodata.portfolio}
                onChange={(e) => upBio("portfolio", e.target.value)}
                placeholder="site.dev"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <Label>Ringkasan profil (2–4 kalimat, sebut peran & skill)</Label>
        <TextArea
          rows={4}
          value={data.ringkasan}
          onChange={(e) => setData((p) => ({ ...p, ringkasan: e.target.value }))}
          placeholder="Fresh graduate ... Menguasai ..."
        />
        <p className="mt-1 font-mono text-[10px] text-[#94A3B8]">
          {data.ringkasan.length} karakter, target 120–600
        </p>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.14em] font-bold">PENGALAMAN</p>
          <button
            onClick={addExp}
            className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-semibold"
          >
            + Tambah
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.pengalaman.map((e, i) => (
            <div key={i} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/60 p-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={e.jabatan}
                  onChange={(ev) => updExp(i, { jabatan: ev.target.value })}
                  placeholder="Jabatan"
                />
                <Input
                  value={e.perusahaan}
                  onChange={(ev) => updExp(i, { perusahaan: ev.target.value })}
                  placeholder="Perusahaan"
                />
              </div>
              <Input
                className="mt-2"
                value={e.periode}
                onChange={(ev) => updExp(i, { periode: ev.target.value })}
                placeholder="Periode (mis. Jun 2024, Sekarang)"
              />
              <TextArea
                className="mt-2"
                rows={2}
                value={e.deskripsi}
                onChange={(ev) => updExp(i, { deskripsi: ev.target.value })}
                placeholder="Deskripsi pencapaian + angka"
              />
              <button
                onClick={() => delExp(i)}
                className="mt-2 text-[11px] font-semibold text-[#EF4444]"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.14em] font-bold">PENDIDIKAN</p>
          <button
            onClick={addEdu}
            className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-semibold"
          >
            + Tambah
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {data.pendidikan.map((e, i) => (
            <div key={i} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/60 p-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={e.jenjang}
                  onChange={(ev) => updEdu(i, { jenjang: ev.target.value })}
                  placeholder="Jenjang (S1/D3)"
                />
                <Input
                  value={e.tahun}
                  onChange={(ev) => updEdu(i, { tahun: ev.target.value })}
                  placeholder="Tahun (2021–2025)"
                />
              </div>
              <Input
                className="mt-2"
                value={e.institusi}
                onChange={(ev) => updEdu(i, { institusi: ev.target.value })}
                placeholder="Institusi"
              />
              <Input
                className="mt-2"
                value={e.jurusan}
                onChange={(ev) => updEdu(i, { jurusan: ev.target.value })}
                placeholder="Jurusan, IPK"
              />
              <button
                onClick={() => delEdu(i)}
                className="mt-2 text-[11px] font-semibold text-[#EF4444]"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Label>Keterampilan (pisah koma, 3–6 skill)</Label>
        <TextArea
          rows={2}
          value={data.skills}
          onChange={(e) => setData((p) => ({ ...p, skills: e.target.value }))}
          placeholder="Excel, Komunikasi, ..."
        />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <Label>Bahasa</Label>
            <Input
              value={data.bahasa}
              onChange={(e) => setData((p) => ({ ...p, bahasa: e.target.value }))}
              placeholder="Indonesia, Inggris"
            />
          </div>
          <div>
            <Label>Sertifikat</Label>
            <Input
              value={data.sertifikat}
              onChange={(e) => setData((p) => ({ ...p, sertifikat: e.target.value }))}
              placeholder="Sertifikat ..."
            />
          </div>
        </div>
      </Card>
    </ToolShellKarir>
  );
}
