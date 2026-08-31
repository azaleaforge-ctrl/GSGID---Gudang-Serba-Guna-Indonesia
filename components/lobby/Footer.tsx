import { DonateButton } from "@/components/shared/DonateButton";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--lobby-border)] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* top */}
        <div className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <Logo variant="light" size="md" />
            <p className="mt-3 max-w-[36ch] text-sm leading-6 text-[#57534E]">
              Gudang tools gratis untuk UMKM & pejuang karir Indonesia. Dibuat dengan rapi, bukan
              asal jadi. Data di device, bukan di server.
            </p>
            <div className="mt-5">
              <DonateButton variant="header" />
              <p className="mt-2 font-mono text-[11px] tracking-[0.06em] text-[#78716C]">
                Donasi sukarela via Sociabuzz, bantu jaga tetap gratis.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#0A0A0A]">LORONG</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="/umkm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    UMKM, /umkm ↗
                  </a>
                </li>
                <li>
                  <a
                    href="/karir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Karir, /karir ↗
                  </a>
                </li>
                <li>
                  <a
                    href="/dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    DEV, /dev ↗
                  </a>
                </li>
                <li>
                  <span className="text-[#78716C]">Lobby, / (kamu di sini)</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#0A0A0A]">BANTUAN</p>
              <ul className="mt-3 space-y-2 text-sm text-[#57534E]">
                <li>
                  <a href="#faq" className="hover:text-black">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#fitur" className="hover:text-black">
                    Kenapa gratis
                  </a>
                </li>
                <li>
                  <a
                    href="https://sociabuzz.com/azaleaforge15/tribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    Donasi
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#0A0A0A]">CATATAN</p>
              <p className="mt-3 text-sm leading-6 text-[#57534E]">
                1 domain, 3 lorong. Semua tools jalan offline di browser. Tidak ada tracking aneh,
                tidak ada paywall.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[var(--lobby-border)] py-5">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#78716C]">
            © 2026 GUDANG SERBA GUNA ID, Dibuat untuk kerja nyata.
          </p>
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#78716C]">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Semua tools gratis
            </span>
          </p>
        </div>
      </div>

      {/* large wordmark */}
      <div
        className="overflow-hidden border-t border-[var(--lobby-border)] bg-[#FDFCF8] select-none"
        aria-hidden
      >
        <p className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3 font-jakarta font-black tracking-[-0.06em] leading-none text-[18vw] lg:text-[11rem] text-[#0A0A0A]/[0.06] whitespace-nowrap text-center">
          GSGID
        </p>
      </div>
    </footer>
  );
}
