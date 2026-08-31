/**
 * Lorong KARIR — pure functions, no side effects.
 * ATS scoring 0-100, date formal ID, helpers.
 */

export type CVData = {
  biodata: {
    nama: string;
    email: string;
    telp: string;
    alamat: string;
    linkedin: string;
    portfolio: string;
  };
  ringkasan: string;
  pengalaman: { jabatan: string; perusahaan: string; periode: string; deskripsi: string }[];
  pendidikan: { jenjang: string; institusi: string; tahun: string; jurusan: string }[];
  skills: string;
  bahasa: string;
  sertifikat: string;
};

export type ATSResult = {
  score: number;
  breakdown: { label: string; score: number; max: number; ok: boolean }[];
  suggestions: string[];
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export function hitungATSScore(data: CVData): ATSResult {
  const breakdown: ATSResult["breakdown"] = [];
  const suggestions: string[] = [];
  let total = 0;

  // 1 biodata 15
  const bio = data.biodata;
  const bioComplete = Boolean(
    bio.nama.trim() && bio.email.trim() && bio.telp.trim() && bio.alamat.trim()
  );
  const bioValid = isEmail(bio.email);
  const bioScore = bioComplete && bioValid ? 15 : bioComplete ? 10 : bio.nama.trim() ? 5 : 0;
  breakdown.push({ label: "Biodata lengkap", score: bioScore, max: 15, ok: bioScore === 15 });
  total += bioScore;
  if (!bioComplete) suggestions.push("Lengkapi nama, email, telepon, alamat.");
  if (bio.email && !bioValid) suggestions.push("Format email tidak valid.");

  // 2 ringkasan 15
  const r = data.ringkasan.trim();
  const rLen = r.length;
  let rScore = 0;
  if (rLen >= 120 && rLen <= 600) rScore = 15;
  else if (rLen >= 50) rScore = 10;
  else if (rLen > 0) rScore = 5;
  breakdown.push({ label: "Ringkasan profil", score: rScore, max: 15, ok: rScore === 15 });
  total += rScore;
  if (rScore < 15)
    suggestions.push("Ringkasan 2–4 kalimat, 120–600 karakter, sebut peran & skill utama.");

  // 3 pengalaman 20
  const expCount = data.pengalaman.filter((p) => p.jabatan.trim() || p.perusahaan.trim()).length;
  const expDescOk = data.pengalaman.some((p) => p.deskripsi.trim().length >= 30);
  let expScore = 0;
  if (expCount >= 2 && expDescOk) expScore = 20;
  else if (expCount >= 1 && expDescOk) expScore = 15;
  else if (expCount >= 1) expScore = 8;
  breakdown.push({ label: "Pengalaman kerja", score: expScore, max: 20, ok: expScore === 20 });
  total += expScore;
  if (expScore < 15)
    suggestions.push("Tambah min. 1 pengalaman + deskripsi pencapaian (angka, aksi).");

  // 4 pendidikan 15
  const eduCount = data.pendidikan.filter((p) => p.institusi.trim()).length;
  const eduScore = eduCount >= 1 ? 15 : 0;
  if (eduCount === 0) suggestions.push("Isi pendidikan terakhir.");
  breakdown.push({ label: "Pendidikan", score: eduScore, max: 15, ok: eduScore === 15 });
  total += eduScore;

  // 5 skills 15
  const skillArr = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  let skillScore = 0;
  if (skillArr.length >= 6) skillScore = 15;
  else if (skillArr.length >= 3) skillScore = 10;
  else if (skillArr.length >= 1) skillScore = 5;
  breakdown.push({
    label: "Keterampilan (pisah koma)",
    score: skillScore,
    max: 15,
    ok: skillScore === 15,
  });
  total += skillScore;
  if (skillScore < 10)
    suggestions.push("Tambah 3–6 skill relevan, pisahkan koma (mis. Excel, Komunikasi).");

  // 6 ATS hygiene 20 (no foto assumption + keyword + searchable)
  // keyword check: ringkasan+exp contains skill keywords
  const corpus = (
    data.ringkasan +
    " " +
    data.pengalaman.map((p) => p.deskripsi).join(" ") +
    " " +
    data.skills
  ).toLowerCase();
  const keywordHits = [
    "pengalaman",
    "proyek",
    "tim",
    "target",
    "analisis",
    "komunikasi",
    "microsoft",
    "excel",
    "administrasi",
  ].filter((k) => corpus.includes(k)).length;
  let hygiene = 0;
  if (keywordHits >= 3) hygiene = 10;
  else if (keywordHits >= 1) hygiene = 5;
  // linkedin/portfolio bonus but not required; give 5 if either filled
  const linkOk = Boolean(bio.linkedin.trim() || bio.portfolio.trim());
  const hygieneBonus = linkOk ? 5 : 0;
  // bahasa/sertifikat extra 5 if any
  const extra = data.bahasa.trim() || data.sertifikat.trim() ? 5 : 0;
  const hygieneScore = Math.min(20, hygiene + hygieneBonus + extra);
  breakdown.push({
    label: "Kata kunci & kelengkapan",
    score: hygieneScore,
    max: 20,
    ok: hygieneScore >= 15,
  });
  total += hygieneScore;
  if (hygiene < 10)
    suggestions.push(
      "Sisipkan kata kunci lowongan (mis. analisis, tim, target) di ringkasan/pengalaman."
    );

  const score = Math.min(100, Math.round(total));
  return { score, breakdown, suggestions: suggestions.slice(0, 3) };
}

export function formatTanggalFormal(dateISO: string, kota = "Jakarta"): string {
  if (!dateISO) return `${kota}, –`;
  const d = new Date(dateISO);
  if (isNaN(d.getTime())) return `${kota}, ${dateISO}`;
  const tgl = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  return `${kota}, ${tgl}`;
}

export function sanitizeFileName(s: string, fallback = "dokumen") {
  const cleaned =
    s
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "") || fallback;
  return cleaned.slice(0, 48);
}
