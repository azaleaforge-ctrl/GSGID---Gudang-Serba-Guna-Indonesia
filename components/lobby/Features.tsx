"use client";
import { motion } from "framer-motion";

const features = [
  {
    n: "01",
    title: "Data di device kamu",
    desc: "Semua hitungan dan PDF dibuat di browser. Tidak ada upload ke server. Tutup tab, data tetap aman di IndexedDB kalau kamu simpan.",
  },
  {
    n: "02",
    title: "Tanpa login, tanpa paywall",
    desc: "Langsung pakai. Tidak ada ‘masukkan email dulu’. Tidak ada batas 3x gratis. Kalau butuh, ya pakai, sesering mungkin.",
  },
  {
    n: "03",
    title: "Untuk kerja nyata",
    desc: "HPP pakai rumus warung, bukan teori. CV ATS sesuai screening Indonesia. Invoice langsung jadi PDF siap kirim ke pelanggan.",
  },
  {
    n: "04",
    title: "Cepat & ringan",
    desc: "Tidak ada loading lama. Buka, isi, jadi. Di HP kentang pun jalan. Cocok untuk yang jualan sambil balas chat.",
  },
  {
    n: "05",
    title: "Dua lorong, tidak campur",
    desc: "UMKM warna hangat, Karir warna Swiss, biar fokus. Kamu tidak akan lihat tools CV waktu lagi hitung HPP.",
  },
  {
    n: "06",
    title: "Gratis selamanya, donasi sukarela",
    desc: "GSG ID gratis karena kami percaya akses alat kerja tidak harus berbayar. Kalau terbantu, donasi via Sociabuzz sangat berarti.",
  },
];

export function Features() {
  return (
    <section id="fitur" className="border-y border-[var(--lobby-border)] bg-[#FDFCF8]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <h2 className="font-jakarta font-black tracking-[-0.04em] leading-none text-[28px] lg:text-[36px]">
            Kenapa <span className="font-light italic">gratis?</span>
            <br />
            Kenapa{" "}
            <span className="underline decoration-[6px] decoration-[#0A0A0A]/10 underline-offset-4">
              di sini?
            </span>
          </h2>
          <p className="max-w-[44ch] text-sm leading-6 text-[#3A3A36]">
            Karena alat kerja yang bagus sering mahal atau ribet. GSG ID dibuat supaya kamu bisa
            langsung pakai, tanpa harus jago spreadsheet atau desain.
          </p>
        </div>

        <div className="mt-8 grid gap-px bg-[var(--lobby-border)] border border-[var(--lobby-border)] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-3 bg-[var(--lobby-border)] gap-px">
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-6 sm:p-7 will-change-transform"
                style={{ willChange: "transform, opacity" }}
              >
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#9CA3AF]">{f.n}</p>
                <h3 className="mt-2 font-jakarta font-bold tracking-[-0.02em] leading-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#57534E]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* editorial callout */}
        <div className="mt-6 grid lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-8 rounded-2xl border border-[var(--lobby-border)] bg-white p-6 flex gap-4">
            <div className="hidden sm:block h-full w-1 shrink-0 rounded-full bg-[#0A0A0A]" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#6B6B63]">UNTUK SIAPA?</p>
              <div className="mt-2 grid sm:grid-cols-2 gap-4 text-sm leading-6">
                <div>
                  <p className="font-bold">UMKM</p>
                  <p className="text-[#57534E]">
                    Yang jualan, warung, online shop, katering, reseller, freelancer yang kelola
                    uang sendiri.
                  </p>
                </div>
                <div>
                  <p className="font-bold">Pejuang Karir</p>
                  <p className="text-[#57534E]">
                    Yang melamar, fresh grad, gap year, mau pindah kerja, atau negosiasi gaji
                    pertama.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 rounded-2xl bg-[#0A0A0A] text-white p-6 flex flex-col justify-between">
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/60">APA ITU GSG ID?</p>
            <p className="mt-2 text-sm leading-6 text-white/90">
              <b>Gudang Serba Guna ID</b>, gudang digital berisi tools kecil yang menyelesaikan satu
              pekerjaan dengan benar. Bukan super-app, bukan AI yang mengarang.
            </p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-white/60">
              gsg.id, 1 domain, 2 lorong, puluhan tools
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
