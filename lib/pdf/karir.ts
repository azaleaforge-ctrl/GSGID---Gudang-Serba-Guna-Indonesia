"use client";
import jsPDF from "jspdf";

import type { CVData } from "@/lib/calc/karir";

// ---------- shared helpers ----------
function fmtDateLong(s: string) {
  if (!s) return "-";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}
function split(doc: jsPDF, text: string, w: number) {
  return doc.splitTextToSize(text || "-", w) as string[];
}
function sanitizeFilename(s: string) {
  return (
    s
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "")
      .slice(0, 48) || "dokumen"
  );
}

// ============ CV ATS ============
export type { CVData } from "@/lib/calc/karir";

export function exportCVPDF(data: CVData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const ML = 15;
  const MR = 15;
  const CW = W - ML - MR;
  let y = 14;

  const checkPage = (need: number) => {
    if (y + need > H - 14) {
      doc.addPage();
      y = 14;
    }
  };

  // Nama — Helvetica bold, centered
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  const nama = data.biodata.nama.trim() || "NAMA LENGKAP";
  doc.text(nama.toUpperCase(), W / 2, y, { align: "center" });
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const contacts = [
    data.biodata.email,
    data.biodata.telp,
    data.biodata.alamat,
    data.biodata.linkedin,
    data.biodata.portfolio,
  ]
    .filter(Boolean)
    .join("  •  ");
  if (contacts) {
    const lines = split(doc, contacts, CW);
    doc.text(lines, W / 2, y, { align: "center" });
    y += lines.length * 3.2 + 2;
  } else y += 2;

  // thin line navy
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(ML, y, W - MR, y);
  y += 5;

  const section = (title: string) => {
    checkPage(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), ML, y);
    y += 1.5;
    doc.setDrawColor(226, 232, 240);
    doc.line(ML, y, W - MR, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(7.5);
  };

  // Ringkasan
  if (data.ringkasan.trim()) {
    section("Ringkasan Profil");
    const lines = split(doc, data.ringkasan.trim(), CW);
    checkPage(lines.length * 3.5 + 4);
    doc.text(lines, ML, y);
    y += lines.length * 3.5 + 4;
  }

  // Pengalaman
  if (data.pengalaman.length) {
    section("Pengalaman Kerja");
    data.pengalaman.forEach((p) => {
      if (!p.jabatan.trim() && !p.perusahaan.trim()) return;
      const head = `${p.jabatan || "-"} — ${p.perusahaan || "-"}`;
      const headLines = split(doc, head, CW - 36);
      checkPage(headLines.length * 3.5 + 8);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(headLines, ML, y);
      // periode right aligned on first line
      if (p.periode) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(p.periode, W - MR, y, { align: "right" });
        doc.setTextColor(30, 41, 59);
      }
      y += headLines.length * 3.5 + 1;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      if (p.deskripsi.trim()) {
        const dLines = split(doc, `• ${p.deskripsi.trim()}`, CW - 4);
        checkPage(dLines.length * 3.2 + 3);
        doc.text(dLines, ML + 2, y);
        y += dLines.length * 3.2 + 3;
      } else y += 1;
    });
  }

  // Pendidikan
  if (data.pendidikan.length) {
    section("Pendidikan");
    data.pendidikan.forEach((p) => {
      if (!p.institusi.trim() && !p.jenjang.trim()) return;
      const head = `${p.jenjang || ""}${p.jenjang && p.jurusan ? " — " : ""}${p.jurusan || ""}`;
      const line1 = head || p.institusi;
      checkPage(7);
      doc.setFont("helvetica", "bold");
      doc.text(line1 || "-", ML, y);
      if (p.tahun) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(p.tahun, W - MR, y, { align: "right" });
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(7.5);
      }
      y += 3.5;
      doc.setFont("helvetica", "normal");
      const inst = p.institusi ? `${p.institusi}` : "";
      if (inst) {
        const l = split(doc, inst, CW);
        doc.text(l, ML, y);
        y += l.length * 3.2 + 2;
      }
    });
  }

  // Keterampilan
  section("Keterampilan");
  {
    const skills = data.skills.trim() || "-";
    const lines = split(doc, skills, CW);
    checkPage(lines.length * 3.5 + 2);
    doc.text(lines, ML, y);
    y += lines.length * 3.5 + 4;
  }

  if (data.bahasa.trim()) {
    section("Bahasa");
    const l = split(doc, data.bahasa.trim(), CW);
    checkPage(l.length * 3.5 + 2);
    doc.text(l, ML, y);
    y += l.length * 3.5 + 4;
  }
  if (data.sertifikat.trim()) {
    section("Sertifikasi");
    const l = split(doc, data.sertifikat.trim(), CW);
    checkPage(l.length * 3.5 + 2);
    doc.text(l, ML, y);
    y += l.length * 3.5;
  }

  // footer tiny
  doc.setFontSize(5.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Dibuat via GSG ID — Lorong Karir · gsgid.vercel.app/karir — ATS-friendly, 1 halaman bila memungkinkan.",
    ML,
    H - 8
  );

  doc.save(`CV-ATS-${sanitizeFilename(data.biodata.nama || "cv")}.pdf`);
}

// ============ SURAT LAMARAN ============
export type SuratLamaranData = {
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  telp: string;
  email: string;
  perusahaanTujuan: string;
  alamatPerusahaan: string;
  posisi: string;
  sumberInfo: string;
  kotaTanggal: string;
  tanggalSurat: string;
  lampiran: string;
  hormat: string;
};

export function exportSuratLamaranPDF(d: SuratLamaranData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const ML = 25;
  const MR = 25;
  const CW = W - ML - MR;
  let y = 18;
  // kop thin
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.6);
  doc.line(ML, 12, W - MR, 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text((d.nama || "NAMA PELAMAR").toUpperCase(), ML, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  y += 3.5;
  const kop = `${d.alamat || "-"} · ${d.telp || "-"} · ${d.email || "-"}`;
  doc.text(split(doc, kop, CW), ML, y);
  y += 6;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.line(ML, y, W - MR, y);
  y += 6;

  // tanggal formal
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  const kota = d.kotaTanggal || "Jakarta";
  const tgl = fmtDateLong(d.tanggalSurat);
  doc.text(`${kota}, ${tgl}`, W - MR, y, { align: "right" });
  y += 7;
  // nomor/lampiran/hal — EYD
  doc.setFontSize(8);
  doc.text(`Nomor    : -`, ML, y);
  y += 4;
  doc.text(`Lampiran : ${d.lampiran || "1 (satu) berkas"}`, ML, y);
  y += 4;
  doc.text(`Hal      : Lamaran Pekerjaan`, ML, y);
  y += 7;
  // kepada
  doc.text("Yth.", ML, y);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.text(`HRD ${d.perusahaanTujuan || "Perusahaan"}`, ML, y);
  y += 4;
  doc.setFont("helvetica", "normal");
  const al = split(doc, d.alamatPerusahaan || "-", CW);
  doc.text(al, ML, y);
  y += al.length * 4 + 4;
  doc.text("di", ML, y);
  y += 4;
  doc.text(`       ${kota}`, ML, y);
  y += 8;
  doc.text("Dengan hormat,", ML, y);
  y += 6;
  const posisi = d.posisi || "posisi yang tersedia";
  const sumber = d.sumberInfo ? ` yang saya peroleh dari ${d.sumberInfo}` : "";
  const paragraf1 = `Berdasarkan informasi lowongan pekerjaan untuk posisi ${posisi} pada ${d.perusahaanTujuan || "perusahaan Bapak/Ibu"}${sumber}, saya bermaksud mengajukan lamaran untuk mengisi posisi tersebut.`;
  const l1 = split(doc, paragraf1, CW);
  doc.text(l1, ML, y);
  y += l1.length * 4 + 3;
  const paragraf2 = `Saya yang bertanda tangan di bawah ini:`;
  doc.text(paragraf2, ML, y);
  y += 5;
  // biodata block
  doc.setFontSize(8);
  const rows: [string, string][] = [
    ["Nama", d.nama || "-"],
    ["Tempat, tgl. lahir", `${d.tempatLahir || "-"}, ${fmtDateLong(d.tanggalLahir)}`],
    ["Alamat", d.alamat || "-"],
    ["Telepon/Email", `${d.telp || "-"} / ${d.email || "-"}`],
  ];
  rows.forEach(([k, v]) => {
    const vLines = split(doc, v, CW - 38);
    doc.text(k.padEnd(16, " "), ML + 4, y);
    doc.text(":", ML + 32, y);
    doc.text(vLines, ML + 36, y);
    y += Math.max(1, vLines.length) * 4;
  });
  y += 3;
  const paragraf3 = `Sebagai bahan pertimbangan, saya lampirkan daftar riwayat hidup, fotokopi ijazah terakhir, dan dokumen pendukung lainnya. Saya berharap dapat diberi kesempatan wawancara untuk menjelaskan lebih rinci mengenai kompetensi saya.`;
  const l3 = split(doc, paragraf3, CW);
  doc.text(l3, ML, y);
  y += l3.length * 4 + 3;
  doc.text(
    "Demikian surat lamaran ini saya sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, saya ucapkan terima kasih.",
    ML,
    y,
    { maxWidth: CW } as never
  );
  // wrap manually
  const closing = split(
    doc,
    "Demikian surat lamaran ini saya sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, saya ucapkan terima kasih.",
    CW
  );
  // already above, adjust y
  y += closing.length * 4 + 6;
  doc.text("Hormat saya,", ML, y);
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.text(d.nama || "___________", ML, y);
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text("materai tidak diperlukan untuk lamaran digital", ML, y);

  // footer
  doc.setFontSize(5.5);
  doc.text("GSG ID · Lorong Karir — EYD PUEBI · gsgid.vercel.app/karir", ML, 287);

  doc.save(`Surat-Lamaran-${sanitizeFilename(d.nama || "pelamar")}.pdf`);
}

// ============ SURAT RESIGN ============
export type SuratResignData = {
  nama: string;
  jabatan: string;
  departemen: string;
  perusahaan: string;
  alamatPerusahaan: string;
  tanggalSurat: string;
  tanggalEfektif: string;
  alasan: string;
  ucapan: string;
  kota: string;
};

export function exportSuratResignPDF(d: SuratResignData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const ML = 25;
  const MR = 25;
  const CW = W - ML - MR;
  let y = 28;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text("SURAT PENGUNDURAN DIRI", W / 2, y, { align: "center" });
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(W / 2 - 30, y, W / 2 + 30, y);
  y += 8;

  const kota = d.kota || "Jakarta";
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`${kota}, ${fmtDateLong(d.tanggalSurat)}`, W - MR, y, { align: "right" });
  y += 7;
  doc.text("Yth.", ML, y);
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.text(`Pimpinan ${d.perusahaan || "Perusahaan"}`, ML, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  const al = split(doc, d.alamatPerusahaan || "-", CW);
  doc.text(al, ML, y);
  y += al.length * 4 + 3;
  doc.text("di Tempat", ML, y);
  y += 8;
  doc.text("Dengan hormat,", ML, y);
  y += 6;
  doc.text(`Saya yang bertanda tangan di bawah ini:`, ML, y);
  y += 6;
  const rows: [string, string][] = [
    ["Nama", d.nama || "-"],
    ["Jabatan", d.jabatan || "-"],
    ["Departemen", d.departemen || "-"],
  ];
  rows.forEach(([k, v]) => {
    doc.text(k, ML + 4, y);
    doc.text(":", ML + 28, y);
    doc.text(split(doc, v, CW - 32), ML + 32, y);
    y += 4;
  });
  y += 3;
  const p1 = `Melalui surat ini, saya mengajukan pengunduran diri sebagai ${d.jabatan || "karyawan"} pada ${d.perusahaan || "perusahaan"} terhitung efektif sejak ${fmtDateLong(d.tanggalEfektif)}.`;
  const l1 = split(doc, p1, CW);
  doc.text(l1, ML, y);
  y += l1.length * 4 + 3;
  const alasan = d.alasan.trim() ? `Adapun alasan pengunduran diri saya: ${d.alasan.trim()}` : "";
  if (alasan) {
    const la = split(doc, alasan, CW);
    doc.text(la, ML, y);
    y += la.length * 4 + 3;
  }
  const ucapan =
    d.ucapan.trim() ||
    "Saya mengucapkan terima kasih atas kesempatan, bimbingan, dan pengalaman yang diberikan selama bekerja.";
  const lu = split(doc, ucapan, CW);
  doc.text(lu, ML, y);
  y += lu.length * 4 + 3;
  const p2 =
    "Saya berkomitmen menyelesaikan tanggung jawab hingga tanggal efektif dan membantu proses serah terima tugas agar transisi berjalan baik.";
  const l2 = split(doc, p2, CW);
  doc.text(l2, ML, y);
  y += l2.length * 4 + 5;
  doc.text("Hormat saya,", ML, y);
  y += 14;
  doc.setFont("helvetica", "bold");
  doc.text(d.nama || "___________", ML, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(`${d.jabatan || ""}${d.departemen ? " — " + d.departemen : ""}`, ML, y);
  doc.setFontSize(5.5);
  doc.text("GSG ID · Lorong Karir — formal EYD", ML, 287);
  doc.save(`Surat-Resign-${sanitizeFilename(d.nama || "karyawan")}.pdf`);
}

// ============ PAKLARING ============
export type PaklaringData = {
  nomor: string;
  perusahaan: string;
  alamatPerusahaan: string;
  nama: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  jabatan: string;
  periodeMulai: string;
  periodeSelesai: string;
  keterangan: string;
  kota: string;
  tanggalTerbit: string;
  penandatangan: string;
  jabatanPenanda: string;
};

export function exportPaklaringPDF(d: PaklaringData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const ML = 25;
  const MR = 25;
  const CW = W - ML - MR;
  // kop
  let y = 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text((d.perusahaan || "NAMA PERUSAHAAN").toUpperCase(), W / 2, y, { align: "center" });
  y += 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  const kopAl = split(doc, d.alamatPerusahaan || "Alamat perusahaan", CW);
  doc.text(kopAl, W / 2, y, { align: "center" });
  y += kopAl.length * 2.8 + 3;
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(ML, y, W - MR, y);
  doc.setLineWidth(0.2);
  doc.line(ML, y + 1, W - MR, y + 1);
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("SURAT KETERANGAN KERJA", W / 2, y, { align: "center" });
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(`Nomor: ${d.nomor || "-"}`, W / 2, y, { align: "center" });
  y += 8;
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text("Yang bertanda tangan di bawah ini menerangkan bahwa:", ML, y);
  y += 6;
  const rows: [string, string][] = [
    ["Nama", d.nama || "-"],
    ["NIK / No. KTP", d.nik || "-"],
    ["Tempat/Tgl. Lahir", `${d.tempatLahir || "-"}, ${fmtDateLong(d.tanggalLahir)}`],
    ["Jabatan", d.jabatan || "-"],
    ["Periode Kerja", `${fmtDateLong(d.periodeMulai)} s.d. ${fmtDateLong(d.periodeSelesai)}`],
  ];
  doc.setFontSize(8.5);
  rows.forEach(([k, v]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(k, ML + 2, y);
    doc.text(":", ML + 34, y);
    doc.setTextColor(15, 23, 42);
    const vl = split(doc, v, CW - 36);
    doc.text(vl, ML + 38, y);
    y += Math.max(1, vl.length) * 4;
  });
  y += 4;
  const ket =
    d.keterangan.trim() ||
    "Selama bekerja, yang bersangkutan telah menunjukkan dedikasi dan kinerja yang baik. Surat ini dibuat untuk dipergunakan sebagaimana mestinya.";
  const lk = split(
    doc,
    `Telah bekerja pada ${d.perusahaan || "perusahaan kami"} sebagai ${d.jabatan || "karyawan"} pada periode tersebut. ${ket}`,
    CW
  );
  doc.text(lk, ML, y);
  y += lk.length * 4 + 8;

  doc.text(`Demikian surat keterangan ini dibuat dengan sebenarnya.`, ML, y);
  y += 10;
  const kota = d.kota || "Jakarta";
  doc.text(`${kota}, ${fmtDateLong(d.tanggalTerbit)}`, W - MR, y, { align: "right" });
  y += 6;
  doc.text("Hormat kami,", W - MR, y, { align: "right" });
  y += 18;
  // stamp placeholder
  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.3);
  // dashed approximation
  if (
    (doc as unknown as { setLineDashPattern?: (a: number[], b: number) => void }).setLineDashPattern
  )
    (doc as unknown as { setLineDashPattern: (a: number[], b: number) => void }).setLineDashPattern(
      [2, 2],
      0
    );
  doc.rect(W - MR - 44, y - 12, 44, 34);
  if (
    (doc as unknown as { setLineDashPattern?: (a: number[], b: number) => void }).setLineDashPattern
  )
    (doc as unknown as { setLineDashPattern: (a: number[], b: number) => void }).setLineDashPattern(
      [],
      0
    );
  doc.setFontSize(5);
  doc.setTextColor(37, 99, 235);
  doc.text("STEMPEL", W - MR - 22, y + 2, { align: "center" });
  doc.setFontSize(6);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(d.penandatangan || "HRD", W - MR - 22, y + 14, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(d.jabatanPenanda || "HR Manager", W - MR - 22, y + 18, { align: "center" });
  // underline signature
  y += 22;
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.2);
  // doc.line not needed

  doc.setFontSize(5.5);
  doc.setTextColor(148, 163, 184);
  doc.text("GSG ID · Lorong Karir — Paklaring · gsgid.vercel.app/karir", ML, 287);
  doc.save(`Paklaring-${sanitizeFilename(d.nama || "karyawan")}.pdf`);
}

// ============ PERJANJIAN KERJA ============
export type PerjanjianData = {
  nomor: string;
  perusahaan: string;
  alamatPerusahaan: string;
  pihak1Nama: string;
  pihak1Jabatan: string;
  pihak2Nama: string;
  pihak2Nik: string;
  pihak2Alamat: string;
  jabatan: string;
  lokasiKerja: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  gaji: number;
  jamKerja: string;
  hakKewajiban: string;
  kota: string;
  tanggalSurat: string;
};

function fmtIDR(n: number) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n || 0));
}

export function exportPerjanjianPDF(d: PerjanjianData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const ML = 25;
  const MR = 25;
  const CW = W - ML - MR;
  let y = 16;
  // title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("PERJANJIAN KERJA WAKTU TERTENTU", W / 2, y, { align: "center" });
  y += 5;
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Nomor: ${d.nomor || "-"}`, W / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  const pembuka = `Pada hari ini, ${fmtDateLong(d.tanggalSurat)}, yang bertanda tangan di bawah ini:`;
  doc.text(split(doc, pembuka, CW), ML, y);
  y += split(doc, pembuka, CW).length * 4 + 3;

  // pihak 1
  doc.setFont("helvetica", "bold");
  doc.text("PIHAK PERTAMA", ML, y);
  y += 4;
  doc.setFont("helvetica", "normal");
  const p1rows: [string, string][] = [
    ["Nama", d.pihak1Nama || "-"],
    ["Jabatan", d.pihak1Jabatan || "-"],
    ["Perusahaan", d.perusahaan || "-"],
    ["Alamat", d.alamatPerusahaan || "-"],
  ];
  p1rows.forEach(([k, v]) => {
    const vl = split(doc, v, CW - 30);
    doc.text(k, ML + 4, y);
    doc.text(":", ML + 24, y);
    doc.text(vl, ML + 28, y);
    y += Math.max(1, vl.length) * 4;
  });
  y += 3;
  doc.setFont("helvetica", "bold");
  doc.text("PIHAK KEDUA", ML, y);
  y += 4;
  doc.setFont("helvetica", "normal");
  const p2rows: [string, string][] = [
    ["Nama", d.pihak2Nama || "-"],
    ["NIK", d.pihak2Nik || "-"],
    ["Alamat", d.pihak2Alamat || "-"],
    ["Jabatan", d.jabatan || "-"],
  ];
  p2rows.forEach(([k, v]) => {
    const vl = split(doc, v, CW - 30);
    doc.text(k, ML + 4, y);
    doc.text(":", ML + 24, y);
    doc.text(vl, ML + 28, y);
    y += Math.max(1, vl.length) * 4;
  });
  y += 3;
  const sepakat =
    "Kedua belah pihak sepakat mengadakan perjanjian kerja dengan ketentuan sebagai berikut:";
  doc.text(split(doc, sepakat, CW), ML, y);
  y += 5;

  const pasal: { judul: string; isi: string }[] = [
    {
      judul: "Pasal 1 — Jabatan & Lokasi",
      isi: `PIHAK KEDUA dipekerjakan sebagai ${d.jabatan || "-"} berlokasi di ${d.lokasiKerja || "-"}.`,
    },
    {
      judul: "Pasal 2 — Jangka Waktu",
      isi: `Perjanjian berlaku sejak ${fmtDateLong(d.tanggalMulai)} sampai dengan ${fmtDateLong(d.tanggalSelesai)}.`,
    },
    {
      judul: "Pasal 3 — Gaji & Pembayaran",
      isi: `Gaji pokok sebesar ${fmtIDR(d.gaji)} per bulan, dibayarkan setiap akhir bulan via transfer.`,
    },
    {
      judul: "Pasal 4 — Jam Kerja",
      isi: d.jamKerja || "Jam kerja mengikuti ketentuan perusahaan (40 jam/minggu, Senin–Jumat).",
    },
    {
      judul: "Pasal 5 — Hak & Kewajiban",
      isi:
        d.hakKewajiban ||
        "PIHAK KEDUA wajib menjalankan tugas dengan baik; PIHAK PERTAMA menyediakan fasilitas dan hak sesuai peraturan.",
    },
    {
      judul: "Pasal 6 — Berakhirnya Perjanjian",
      isi: "Perjanjian berakhir demi hukum pada tanggal selesai, atau diakhiri sesuai peraturan ketenagakerjaan yang berlaku.",
    },
    {
      judul: "Pasal 7 — Penyelesaian Perselisihan",
      isi: "Perselisihan diselesaikan secara musyawarah; bila gagal, sesuai mekanisme ketenagakerjaan.",
    },
  ];

  const drawPasal = (idx: number, judul: string, isi: string) => {
    if (y > 255) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(`${idx}. ${judul}`, ML, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    const lines = split(doc, isi, CW);
    if (y + lines.length * 4 > 280) {
      doc.addPage();
      y = 18;
    }
    doc.text(lines, ML, y);
    y += lines.length * 4 + 3;
  };
  pasal.forEach((p, i) => drawPasal(i + 1, p.judul, p.isi));

  if (y > 230) {
    doc.addPage();
    y = 18;
  }
  y += 2;
  doc.text(
    split(
      doc,
      "Demikian perjanjian ini dibuat rangkap dua, bermaterai cukup, dan ditandatangani kedua belah pihak dalam keadaan sadar tanpa paksaan.",
      CW
    ),
    ML,
    y
  );
  y += 10;
  doc.text(`${d.kota || "Jakarta"}, ${fmtDateLong(d.tanggalSurat)}`, W / 2, y, { align: "center" });
  y += 8;
  // two signatures
  const leftX = ML + 22;
  const rightX = W - MR - 22;
  doc.setFontSize(8);
  doc.text("PIHAK PERTAMA", leftX, y, { align: "center" });
  doc.text("PIHAK KEDUA", rightX, y, { align: "center" });
  y += 18;
  // stamp box for pihak pertama
  if (
    (doc as unknown as { setLineDashPattern?: (a: number[], b: number) => void }).setLineDashPattern
  )
    (doc as unknown as { setLineDashPattern: (a: number[], b: number) => void }).setLineDashPattern(
      [2, 2],
      0
    );
  doc.setDrawColor(37, 99, 235);
  doc.rect(leftX - 18, y - 12, 36, 26);
  if (
    (doc as unknown as { setLineDashPattern?: (a: number[], b: number) => void }).setLineDashPattern
  )
    (doc as unknown as { setLineDashPattern: (a: number[], b: number) => void }).setLineDashPattern(
      [],
      0
    );
  doc.setFontSize(5);
  doc.setTextColor(37, 99, 235);
  doc.text("MATERAI", leftX, y - 2, { align: "center" });
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text(d.pihak1Nama || "HRD", leftX, y + 8, { align: "center" });
  doc.text(d.pihak2Nama || "Karyawan", rightX, y + 8, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.5);
  doc.setTextColor(148, 163, 184);
  doc.text("GSG ID · Perjanjian Kerja Sederhana — 2 halaman bila perlu · gsgid.vercel.app/karir", ML, 287);
  doc.save(`Perjanjian-Kerja-${sanitizeFilename(d.pihak2Nama || "karyawan")}.pdf`);
}

// ============ SURAT PERNYATAAN ============
export type PernyataanData = {
  template: "umum" | "izin" | "integritas" | "domisili" | "penghasilan";
  nama: string;
  nik: string;
  alamat: string;
  keperluan: string;
  isi: string;
  kota: string;
  tanggal: string;
  jabatan?: string;
};

const templateTitles: Record<PernyataanData["template"], string> = {
  umum: "SURAT PERNYATAAN",
  izin: "SURAT IZIN TIDAK MASUK KERJA",
  integritas: "PAKTA INTEGRITAS",
  domisili: "SURAT KETERANGAN DOMISILI",
  penghasilan: "SURAT PERNYATAAN PENGHASILAN",
};

const templateIntros: Record<PernyataanData["template"], string> = {
  umum: "Saya yang bertanda tangan di bawah ini:",
  izin: "Saya yang bertanda tangan di bawah ini mengajukan izin tidak masuk kerja:",
  integritas: "Saya yang bertanda tangan di bawah ini menyatakan pakta integritas sebagai berikut:",
  domisili: "Saya yang bertanda tangan di bawah ini menerangkan domisili:",
  penghasilan: "Saya yang bertanda tangan di bawah ini menyatakan penghasilan:",
};

export function exportPernyataanPDF(d: PernyataanData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const ML = 25;
  const MR = 25;
  const CW = W - ML - MR;
  let y = 24;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(templateTitles[d.template] || "SURAT PERNYATAAN", W / 2, y, { align: "center" });
  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(W / 2 - 32, y, W / 2 + 32, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(templateIntros[d.template], ML, y);
  y += 6;
  const rows: [string, string][] = [
    ["Nama", d.nama || "-"],
    ["NIK", d.nik || "-"],
    ["Alamat", d.alamat || "-"],
  ];
  if (d.jabatan) rows.push(["Jabatan", d.jabatan]);
  rows.forEach(([k, v]) => {
    doc.setTextColor(100, 116, 139);
    doc.text(k, ML + 2, y);
    doc.text(":", ML + 26, y);
    doc.setTextColor(15, 23, 42);
    const vl = split(doc, v, CW - 30);
    doc.text(vl, ML + 30, y);
    y += Math.max(1, vl.length) * 4;
  });
  y += 4;
  // body by template
  let body = "";
  if (d.template === "umum") {
    body =
      d.isi.trim() ||
      `Menyatakan dengan sesungguhnya bahwa ${d.keperluan || "keterangan ini"} adalah benar dan dapat dipertanggungjawabkan. Apabila di kemudian hari terdapat kekeliruan, saya bersedia menanggung akibatnya sesuai ketentuan yang berlaku.`;
  } else if (d.template === "izin") {
    body =
      d.isi.trim() ||
      `Bermaksud mengajukan izin tidak masuk kerja pada ${fmtDateLong(d.tanggal)} dikarenakan ${d.keperluan || "keperluan penting"}. Saya akan menyelesaikan tugas yang tertunda dan berkoordinasi dengan atasan.`;
  } else if (d.template === "integritas") {
    body =
      d.isi.trim() ||
      `1) Melaksanakan tugas dengan jujur dan penuh tanggung jawab; 2) Tidak melakukan KKN; 3) Melaporkan pelanggaran yang diketahui; 4) Bersedia dikenakan sanksi bila melanggar pakta ini. Pernyataan ini terkait ${d.keperluan || "pelaksanaan tugas/jabatan"}.`;
  } else if (d.template === "domisili") {
    body =
      d.isi.trim() ||
      `Menerangkan bahwa saya berdomisili di alamat tersebut di atas sesuai KTP/KK dan surat ini dipergunakan untuk ${d.keperluan || "keperluan administrasi"}.`;
  } else if (d.template === "penghasilan") {
    body =
      d.isi.trim() ||
      `Menyatakan penghasilan saya per bulan adalah sesuai kemampuan/sebagaimana terlampir dan surat ini dipergunakan untuk ${d.keperluan || "keperluan administrasi"}. Saya bertanggung jawab atas kebenaran data ini.`;
  }
  const bl = split(doc, body, CW);
  doc.text(bl, ML, y);
  y += bl.length * 4 + 6;
  if (d.keperluan && d.template !== "umum" && !body.includes(d.keperluan)) {
    const kl = split(doc, `Keperluan: ${d.keperluan}.`, CW);
    doc.text(kl, ML, y);
    y += kl.length * 4 + 4;
  }
  doc.text(
    "Demikian surat ini saya buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.",
    ML,
    y,
    { maxWidth: CW } as never
  );
  // ensure split
  const closing = split(
    doc,
    "Demikian surat ini saya buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.",
    CW
  );
  y += closing.length * 4 + 8;
  doc.text(`${d.kota || "Jakarta"}, ${fmtDateLong(d.tanggal)}`, W - MR, y, { align: "right" });
  y += 6;
  doc.text("Yang menyatakan,", W - MR, y, { align: "right" });
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.text(d.nama || "___________", W - MR, y, { align: "right" });
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(d.nik ? `NIK: ${d.nik}` : "", W - MR, y, { align: "right" });
  doc.setFontSize(5.5);
  doc.text("GSG ID · Lorong Karir — Surat Pernyataan (5 template) · gsgid.vercel.app/karir", ML, 287);
  const titleMap: Record<string, string> = {
    umum: "Pernyataan",
    izin: "Izin",
    integritas: "Pakta-Integritas",
    domisili: "Domisili",
    penghasilan: "Penghasilan",
  };
  doc.save(
    `Surat-${titleMap[d.template] || "Pernyataan"}-${sanitizeFilename(d.nama || "warga")}.pdf`
  );
}
