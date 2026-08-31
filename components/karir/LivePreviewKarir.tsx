"use client";
import type { CVData } from "@/lib/calc/karir";
import type {
  PaklaringData,
  PerjanjianData,
  PernyataanData,
  SuratLamaranData,
  SuratResignData,
} from "@/lib/pdf/karir";

function fmtLong(s: string) {
  if (!s) return "-";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

// ---- CV ATS PREVIEW (A4 15mm, Helvetica-like, no table) ----
export function LivePreviewCV({ data }: { data: CVData }) {
  const contacts = [
    data.biodata.email,
    data.biodata.telp,
    data.biodata.alamat,
    data.biodata.linkedin,
    data.biodata.portfolio,
  ]
    .filter(Boolean)
    .join(" • ");
  return (
    <div
      className="bg-white text-[#0F172A] p-6 sm:p-7"
      style={{ fontFamily: "Inter, Helvetica, Arial, sans-serif" }}
    >
      <div className="text-center">
        <h2 className="font-black tracking-[-0.02em] text-[18px] leading-none uppercase">
          {data.biodata.nama || "NAMA LENGKAP"}
        </h2>
        {contacts && (
          <p className="mt-2 font-mono text-[10px] leading-4 text-[#64748B]">{contacts}</p>
        )}
        <div className="mt-4 h-px bg-[#E2E8F0]" />
      </div>

      {data.ringkasan.trim() && (
        <Section title="Ringkasan Profil">
          <p className="text-[11.5px] leading-[1.6] text-[#1E293B]">{data.ringkasan}</p>
        </Section>
      )}

      <Section title="Pengalaman Kerja">
        {data.pengalaman.filter((p) => p.jabatan || p.perusahaan).length === 0 ? (
          <p className="text-[11px] text-[#94A3B8]">Belum ada pengalaman</p>
        ) : (
          <div className="space-y-3">
            {data.pengalaman.map((p, i) =>
              !p.jabatan && !p.perusahaan ? null : (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[11.5px] font-bold leading-tight">
                      {p.jabatan || "-"},{" "}
                      <span className="font-semibold text-[#2563EB]">{p.perusahaan || "-"}</span>
                    </p>
                    {p.periode && (
                      <span className="shrink-0 font-mono text-[10px] text-[#64748B]">
                        {p.periode}
                      </span>
                    )}
                  </div>
                  {p.deskripsi && (
                    <p className="mt-1 text-[11px] leading-5 text-[#334155]">• {p.deskripsi}</p>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </Section>

      <Section title="Pendidikan">
        {data.pendidikan.filter((p) => p.institusi || p.jenjang).length === 0 ? (
          <p className="text-[11px] text-[#94A3B8]">Belum ada pendidikan</p>
        ) : (
          <div className="space-y-2">
            {data.pendidikan.map((p, i) =>
              !p.institusi && !p.jenjang ? null : (
                <div key={i} className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11.5px] font-bold">
                      {[p.jenjang, p.jurusan].filter(Boolean).join(", ") || "-"}
                    </p>
                    <p className="text-[11px] text-[#475569]">{p.institusi}</p>
                  </div>
                  <span className="font-mono text-[10px] text-[#64748B] shrink-0">{p.tahun}</span>
                </div>
              )
            )}
          </div>
        )}
      </Section>

      <Section title="Keterampilan">
        <p className="text-[11px] leading-5 text-[#1E293B]">{data.skills || "-"}</p>
      </Section>
      {data.bahasa.trim() && (
        <Section title="Bahasa">
          <p className="text-[11px] leading-5">{data.bahasa}</p>
        </Section>
      )}
      {data.sertifikat.trim() && (
        <Section title="Sertifikasi">
          <p className="text-[11px] leading-5">{data.sertifikat}</p>
        </Section>
      )}
      <p className="mt-6 text-center font-mono text-[8px] tracking-wide text-[#94A3B8]">
        GSG ID, Lorong Karir · ATS-friendly · 15mm margin · Helvetica
      </p>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] tracking-[0.14em] font-bold text-[#0F172A]">
        {title.toUpperCase()}
      </p>
      <div className="mt-1 h-px bg-[#E2E8F0]" />
      <div className="mt-2">{children}</div>
    </div>
  );
}

// ---- SURAT LAMARAN PREVIEW (A4 25mm, kop, EYD) ----
export function LivePreviewLamaran({ data }: { data: SuratLamaranData }) {
  const kota = data.kotaTanggal || "Jakarta";
  return (
    <div
      className="bg-white text-[#0F172A] px-7 py-6 text-[11px] leading-[1.7]"
      style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
    >
      <div className="h-[3px] bg-[#2563EB]" />
      <div className="mt-3 flex justify-between gap-4">
        <p className="font-bold tracking-tight uppercase text-[11px]">
          {data.nama || "NAMA PELAMAR"}
        </p>
        <p className="font-mono text-[9px] text-[#64748B] shrink-0">gsgid.vercel.app/KARIR</p>
      </div>
      <p className="font-mono text-[9px] text-[#64748B] leading-4">
        {[data.alamat, data.telp, data.email].filter(Boolean).join(" · ") || "-"}
      </p>
      <div className="mt-3 h-px bg-[#E2E8F0]" />

      <p className="mt-5 text-right text-[11px]">
        {kota}, {fmtLong(data.tanggalSurat)}
      </p>
      <div className="mt-3 space-y-1 font-mono text-[11px]">
        <p>Nomor &nbsp;&nbsp;&nbsp;: -</p>
        <p>Lampiran : {data.lampiran || "1 (satu) berkas"}</p>
        <p>Hal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Lamaran Pekerjaan</p>
      </div>
      <div className="mt-4">
        <p>Yth.</p>
        <p className="font-bold">HRD {data.perusahaanTujuan || "Perusahaan"}</p>
        <p className="text-[#475569]">{data.alamatPerusahaan || "-"}</p>
        <p>di</p>
        <p className="ml-6">{kota}</p>
      </div>
      <p className="mt-4">Dengan hormat,</p>
      <p className="mt-2 text-justify">
        Berdasarkan informasi lowongan pekerjaan untuk posisi{" "}
        <b>{data.posisi || "posisi yang tersedia"}</b> pada{" "}
        <b>{data.perusahaanTujuan || "perusahaan Bapak/Ibu"}</b>
        {data.sumberInfo ? ` yang saya peroleh dari ${data.sumberInfo}` : ""}, saya bermaksud
        mengajukan lamaran untuk mengisi posisi tersebut.
      </p>
      <p className="mt-2">Saya yang bertanda tangan di bawah ini:</p>
      <div className="mt-2 ml-2 space-y-1 font-mono text-[11px]">
        <p>
          Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
          <span className="font-sans font-medium">{data.nama || "-"}</span>
        </p>
        <p>
          Tempat, tgl lahir : {data.tempatLahir || "-"}, {fmtLong(data.tanggalLahir)}
        </p>
        <p>
          Alamat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.alamat || "-"}
        </p>
        <p>
          Telepon/Email &nbsp;&nbsp;: {data.telp || "-"} / {data.email || "-"}
        </p>
      </div>
      <p className="mt-3 text-justify">
        Sebagai bahan pertimbangan, saya lampirkan daftar riwayat hidup, fotokopi ijazah terakhir,
        dan dokumen pendukung lainnya. Saya berharap dapat diberi kesempatan wawancara untuk
        menjelaskan lebih rinci mengenai kompetensi saya.
      </p>
      <p className="mt-2 text-justify">
        Demikian surat lamaran ini saya sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, saya
        ucapkan terima kasih.
      </p>
      <p className="mt-4">Hormat saya,</p>
      <p className="mt-8 font-bold">{data.nama || "___________"}</p>
      <p className="mt-6 text-center font-mono text-[8px] text-[#94A3B8]">
        GSG ID · EYD PUEBI · 25mm margin · Helvetica
      </p>
    </div>
  );
}

export function LivePreviewResign({ data }: { data: SuratResignData }) {
  const kota = data.kota || "Jakarta";
  return (
    <div
      className="bg-white text-[#0F172A] px-7 py-8 text-[11px] leading-[1.7]"
      style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
    >
      <h2 className="text-center font-bold tracking-[0.12em] text-[12px]">
        SURAT PENGUNDURAN DIRI
      </h2>
      <div className="mx-auto mt-2 h-px w-24 bg-[#E2E8F0]" />
      <p className="mt-6 text-right">
        {kota}, {fmtLong(data.tanggalSurat)}
      </p>
      <div className="mt-4">
        <p>Yth.</p>
        <p className="font-bold">Pimpinan {data.perusahaan || "Perusahaan"}</p>
        <p className="text-[#475569]">{data.alamatPerusahaan || "-"}</p>
        <p>di Tempat</p>
      </div>
      <p className="mt-4">Dengan hormat,</p>
      <p>Saya yang bertanda tangan di bawah ini:</p>
      <div className="mt-2 ml-2 space-y-1">
        <p>Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.nama || "-"}</p>
        <p>Jabatan &nbsp;&nbsp;: {data.jabatan || "-"}</p>
        <p>Departemen : {data.departemen || "-"}</p>
      </div>
      <p className="mt-3 text-justify">
        Melalui surat ini, saya mengajukan pengunduran diri sebagai{" "}
        <b>{data.jabatan || "karyawan"}</b> pada <b>{data.perusahaan || "perusahaan"}</b> terhitung
        efektif sejak <b>{fmtLong(data.tanggalEfektif)}</b>.
      </p>
      {data.alasan.trim() && (
        <p className="mt-2 text-justify">Adapun alasan pengunduran diri saya: {data.alasan}</p>
      )}
      <p className="mt-2 text-justify">
        {data.ucapan.trim() ||
          "Saya mengucapkan terima kasih atas kesempatan, bimbingan, dan pengalaman yang diberikan selama bekerja."}
      </p>
      <p className="mt-2 text-justify">
        Saya berkomitmen menyelesaikan tanggung jawab hingga tanggal efektif dan membantu proses
        serah terima tugas agar transisi berjalan baik.
      </p>
      <p className="mt-6">Hormat saya,</p>
      <p className="mt-10 font-bold">{data.nama || "___________"}</p>
      <p className="font-mono text-[10px] text-[#64748B]">
        {data.jabatan}
        {data.departemen ? `, ${data.departemen}` : ""}
      </p>
    </div>
  );
}

export function LivePreviewPaklaring({ data }: { data: PaklaringData }) {
  const kota = data.kota || "Jakarta";
  return (
    <div
      className="bg-white text-[#0F172A] px-7 py-6 text-[11px] leading-[1.7]"
      style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
    >
      <div className="text-center">
        <p className="font-black tracking-tight uppercase text-[11px]">
          {data.perusahaan || "NAMA PERUSAHAAN"}
        </p>
        <p className="font-mono text-[9px] text-[#64748B]">
          {data.alamatPerusahaan || "Alamat perusahaan"}
        </p>
        <div className="mt-3 h-[2px] bg-[#0F172A]" />
        <div className="mt-[2px] h-px bg-[#0F172A]" />
      </div>
      <h2 className="mt-5 text-center font-bold tracking-[0.14em] text-[12px]">
        SURAT KETERANGAN KERJA
      </h2>
      <p className="text-center font-mono text-[10px] text-[#64748B]">Nomor: {data.nomor || "-"}</p>
      <p className="mt-4">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
      <div className="mt-3 space-y-1.5">
        {[
          ["Nama", data.nama || "-"],
          ["NIK / No. KTP", data.nik || "-"],
          ["Tempat/Tgl. Lahir", `${data.tempatLahir || "-"}, ${fmtLong(data.tanggalLahir)}`],
          ["Jabatan", data.jabatan || "-"],
          ["Periode Kerja", `${fmtLong(data.periodeMulai)} s.d. ${fmtLong(data.periodeSelesai)}`],
        ].map(([k, v]) => (
          <div key={k} className="grid grid-cols-[128px_8px_1fr] gap-1">
            <span className="text-[#64748B]">{k}</span>
            <span>:</span>
            <span className="font-medium">{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-justify">
        Telah bekerja pada <b>{data.perusahaan || "perusahaan kami"}</b> sebagai{" "}
        <b>{data.jabatan || "karyawan"}</b> pada periode tersebut.{" "}
        {data.keterangan.trim() ||
          "Selama bekerja, yang bersangkutan telah menunjukkan dedikasi dan kinerja yang baik. Surat ini dibuat untuk dipergunakan sebagaimana mestinya."}
      </p>
      <p className="mt-3">Demikian surat keterangan ini dibuat dengan sebenarnya.</p>
      <div className="mt-6 flex justify-end">
        <div className="text-right">
          <p>
            {kota}, {fmtLong(data.tanggalTerbit)}
          </p>
          <p>Hormat kami,</p>
          <div className="mt-2 grid h-[88px] w-[160px] place-items-center rounded-lg border border-dashed border-[#2563EB] bg-[#F8FAFC]">
            <div className="text-center">
              <p className="font-mono text-[9px] tracking-[0.18em] font-bold text-[#2563EB]">
                STEMPEL
              </p>
              <p className="mt-6 text-[11px] font-bold">{data.penandatangan || "HRD"}</p>
              <p className="font-mono text-[9px] text-[#64748B]">
                {data.jabatanPenanda || "HR Manager"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LivePreviewPerjanjian({ data }: { data: PerjanjianData }) {
  const fmtIDR = (n: number) => "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n || 0));
  return (
    <div
      className="bg-white text-[#0F172A] px-7 py-6 text-[11px] leading-[1.65]"
      style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
    >
      <h2 className="text-center font-black tracking-[0.08em] text-[11px]">
        PERJANJIAN KERJA WAKTU TERTENTU
      </h2>
      <p className="text-center font-mono text-[10px] text-[#64748B]">Nomor: {data.nomor || "-"}</p>
      <p className="mt-4 text-justify">
        Pada hari ini, {fmtLong(data.tanggalSurat)}, yang bertanda tangan di bawah ini:
      </p>
      <p className="mt-3 font-bold">PIHAK PERTAMA</p>
      <div className="ml-2 space-y-1">
        <p>Nama &nbsp;&nbsp;&nbsp;&nbsp;: {data.pihak1Nama || "-"}</p>
        <p>Jabatan &nbsp;: {data.pihak1Jabatan || "-"}</p>
        <p>Perusahaan: {data.perusahaan || "-"}</p>
        <p>Alamat &nbsp;&nbsp;: {data.alamatPerusahaan || "-"}</p>
      </div>
      <p className="mt-3 font-bold">PIHAK KEDUA</p>
      <div className="ml-2 space-y-1">
        <p>Nama &nbsp;: {data.pihak2Nama || "-"}</p>
        <p>NIK &nbsp;&nbsp;: {data.pihak2Nik || "-"}</p>
        <p>Alamat: {data.pihak2Alamat || "-"}</p>
        <p>Jabatan: {data.jabatan || "-"}</p>
      </div>
      <p className="mt-3 text-justify">
        Kedua belah pihak sepakat mengadakan perjanjian kerja dengan ketentuan sebagai berikut:
      </p>
      <div className="mt-3 space-y-3">
        {[
          [
            "Pasal 1, Jabatan & Lokasi",
            `PIHAK KEDUA dipekerjakan sebagai ${data.jabatan || "-"} berlokasi di ${data.lokasiKerja || "-"}.`,
          ],
          [
            "Pasal 2, Jangka Waktu",
            `Berlaku sejak ${fmtLong(data.tanggalMulai)} sampai dengan ${fmtLong(data.tanggalSelesai)}.`,
          ],
          [
            "Pasal 3, Gaji & Pembayaran",
            `Gaji pokok sebesar ${fmtIDR(data.gaji)} per bulan, dibayarkan tiap akhir bulan via transfer.`,
          ],
          [
            "Pasal 4, Jam Kerja",
            data.jamKerja || "Jam kerja mengikuti ketentuan perusahaan (40 jam/minggu).",
          ],
          [
            "Pasal 5, Hak & Kewajiban",
            data.hakKewajiban ||
              "PIHAK KEDUA wajib menjalankan tugas dengan baik; PIHAK PERTAMA menyediakan hak sesuai peraturan.",
          ],
          [
            "Pasal 6, Berakhirnya Perjanjian",
            "Berakhir demi hukum pada tanggal selesai, atau diakhiri sesuai peraturan ketenagakerjaan.",
          ],
          [
            "Pasal 7, Penyelesaian Perselisihan",
            "Musyawarah terlebih dahulu; bila gagal, sesuai mekanisme ketenagakerjaan.",
          ],
        ].map(([t, c], i) => (
          <div key={i}>
            <p className="font-bold">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-justify">{c}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-justify">
        Demikian perjanjian ini dibuat rangkap dua, bermaterai cukup, dan ditandatangani dalam
        keadaan sadar tanpa paksaan.
      </p>
      <p className="mt-4 text-center">
        {data.kota || "Jakarta"}, {fmtLong(data.tanggalSurat)}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-6 text-center">
        <div>
          <p>PIHAK PERTAMA</p>
          <div className="mx-auto mt-2 grid h-[68px] w-[132px] place-items-center rounded-lg border border-dashed border-[#2563EB] bg-[#F8FAFC] text-[9px] font-mono font-bold text-[#2563EB]">
            MATERAI
          </div>
          <p className="mt-2 font-bold">{data.pihak1Nama || "HRD"}</p>
        </div>
        <div>
          <p>PIHAK KEDUA</p>
          <div className="h-[68px]" />
          <p className="font-bold">{data.pihak2Nama || "Karyawan"}</p>
        </div>
      </div>
    </div>
  );
}

export function LivePreviewPernyataan({ data }: { data: PernyataanData }) {
  const titles: Record<string, string> = {
    umum: "SURAT PERNYATAAN",
    izin: "SURAT IZIN TIDAK MASUK KERJA",
    integritas: "PAKTA INTEGRITAS",
    domisili: "SURAT KETERANGAN DOMISILI",
    penghasilan: "SURAT PERNYATAAN PENGHASILAN",
  };
  const intros: Record<string, string> = {
    umum: "Saya yang bertanda tangan di bawah ini:",
    izin: "Saya yang bertanda tangan di bawah ini mengajukan izin tidak masuk kerja:",
    integritas: "Saya yang bertanda tangan di bawah ini menyatakan pakta integritas:",
    domisili: "Saya yang bertanda tangan di bawah ini menerangkan domisili:",
    penghasilan: "Saya yang bertanda tangan di bawah ini menyatakan penghasilan:",
  };
  let body = "";
  if (data.template === "umum")
    body =
      data.isi.trim() ||
      `Menyatakan dengan sesungguhnya bahwa ${data.keperluan || "keterangan ini"} adalah benar dan dapat dipertanggungjawabkan. Apabila terdapat kekeliruan, saya bersedia menanggung akibatnya sesuai ketentuan.`;
  else if (data.template === "izin")
    body =
      data.isi.trim() ||
      `Bermaksud mengajukan izin tidak masuk kerja pada ${fmtLong(data.tanggal)} dikarenakan ${data.keperluan || "keperluan penting"}. Saya akan menyelesaikan tugas tertunda dan berkoordinasi dengan atasan.`;
  else if (data.template === "integritas")
    body =
      data.isi.trim() ||
      `1) Melaksanakan tugas dengan jujur dan penuh tanggung jawab; 2) Tidak melakukan KKN; 3) Melaporkan pelanggaran; 4) Bersedia dikenakan sanksi bila melanggar. Terkait ${data.keperluan || "pelaksanaan tugas/jabatan"}.`;
  else if (data.template === "domisili")
    body =
      data.isi.trim() ||
      `Menerangkan bahwa saya berdomisili di alamat tersebut di atas sesuai KTP/KK dan surat ini dipergunakan untuk ${data.keperluan || "keperluan administrasi"}.`;
  else
    body =
      data.isi.trim() ||
      `Menyatakan penghasilan saya per bulan sebagaimana terlampir dan surat ini dipergunakan untuk ${data.keperluan || "keperluan administrasi"}. Saya bertanggung jawab atas kebenaran data ini.`;

  return (
    <div
      className="bg-white text-[#0F172A] px-7 py-7 text-[11px] leading-[1.7]"
      style={{ fontFamily: "Inter, Helvetica, sans-serif" }}
    >
      <h2 className="text-center font-bold tracking-[0.12em] text-[12px]">
        {titles[data.template]}
      </h2>
      <div className="mx-auto mt-2 h-px w-24 bg-[#E2E8F0]" />
      <p className="mt-5">{intros[data.template]}</p>
      <div className="mt-3 space-y-1">
        <p>Nama &nbsp;&nbsp;: {data.nama || "-"}</p>
        <p>NIK &nbsp;&nbsp;&nbsp;&nbsp;: {data.nik || "-"}</p>
        <p>Alamat : {data.alamat || "-"}</p>
        {data.jabatan && <p>Jabatan: {data.jabatan}</p>}
      </div>
      <p className="mt-4 text-justify">{body}</p>
      <p className="mt-3 text-justify">
        Demikian surat ini saya buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.
      </p>
      <div className="mt-6 text-right">
        <p>
          {data.kota || "Jakarta"}, {fmtLong(data.tanggal)}
        </p>
        <p>Yang menyatakan,</p>
        <p className="mt-10 font-bold">{data.nama || "___________"}</p>
        {data.nik && <p className="font-mono text-[10px] text-[#64748B]">NIK: {data.nik}</p>}
      </div>
    </div>
  );
}
