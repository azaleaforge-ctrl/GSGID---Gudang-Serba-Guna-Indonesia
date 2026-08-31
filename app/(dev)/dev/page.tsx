import type { Metadata } from "next";

import { CodeTypewriter, ScrollCode } from "@/components/dev/CodeTypewriter";
import { DevCard } from "@/components/dev/DevCard";
import { MarqueeCode } from "@/components/dev/MarqueeCode";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { TerminalShell } from "@/components/dev/TerminalShell";

import { buildMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Lorong DEV, 6 Tools Gratis Developer",
  description:
    "Lorong DEV GSG ID: JSON formatter, JWT debugger, hash generator, base64, regex tester, cron parser. Terminal preview, tanpa login, data di device.",
  alternates: { canonical: "/dev" },
  openGraph: {
    title: "Lorong DEV, Tools Gratis Developer",
    description: "6 tools terminal, preview code glow, tanpa login.",
    url: `${siteConfig.url}/dev`,
  },
});

const tools = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    desc: "Prettify, minify, validate JSON. Error pointer line, copy 1 click.",
    tag: "JSON",
    stat: "valid →",
    code: `const data = JSON.parse(raw)\nif (!data.ok) throw\nconsole.log("ok", data)`,
  },
  {
    slug: "jwt-debugger",
    title: "JWT Debugger",
    desc: "Decode header/payload, verify signature, cek exp & nbf.",
    tag: "JWT",
    stat: "verify",
    code: `jwt.verify(token, SECRET)\n// { sub: "user_42", iat: 1714500000 }`,
  },
  {
    slug: "hash-generator",
    title: "Hash Generator",
    desc: "MD5, SHA-1/256/512, HMAC. Compare & file hash.",
    tag: "HASH",
    stat: "sha256",
    code: `crypto.createHash("sha256")\n .update(data)\n .digest("hex")`,
  },
  {
    slug: "base64-tool",
    title: "Base64 Tool",
    desc: "Encode/decode teks & file, URL-safe, auto detect.",
    tag: "B64",
    stat: "encode",
    code: `Buffer.from(str).toString("base64")\nBuffer.from(b64, "base64").toString()`,
  },
  {
    slug: "regex-tester",
    title: "Regex Tester",
    desc: "Test, match, replace. Cheatsheet & flag g/i/m/s.",
    tag: "REGEX",
    stat: "g/i",
    code: `const re = /^(\\d{4})-(\\d{2})-\\d{2}$/\nre.test("2026-08-31") // true`,
  },
  {
    slug: "cron-parser",
    title: "Cron Parser",
    desc: "Jelaskan cron * * * * *, next run, validasi.",
    tag: "CRON",
    stat: "* * * * *",
    code: `cron.schedule("*/5 * * * *", () => {\n run(task)\n})`,
  },
];

export default function DevHubPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* HERO, terminal */}
      <section className="border-b border-[#1F2937] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <Reveal className="grid lg:grid-cols-12 gap-8 items-start">
            <RevealItem className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#1F2937] bg-[#111111] px-3 py-1 font-mono text-[11px] tracking-[0.14em] font-bold text-[#22C55E]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
                LORONG 03, DEV · 6 TOOLS · GRATIS
              </p>
              <h1 className="mt-4 font-mono font-black leading-[0.88] tracking-[-0.04em] text-[40px] lg:text-[56px] text-[#E5E7EB]">
                Lorong DEV
                <span className="block font-light text-[#22C55E] code-glow">
                  untuk yang ngoding.
                </span>
              </h1>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-7 text-[#9CA3AF]">
                JSON berantakan, JWT expired, hash tidak match, cron tidak jalan, regex tidak match,
                base64 error.{" "}
                <span className="text-[#E5E7EB] font-semibold">Semua jalan di browser</span>, tanpa
                kirim data ke server.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#tools"
                  className="rounded-full bg-[#22C55E] px-6 py-3 text-sm font-mono font-bold text-[#0A0A0A] shadow-[0_0_24px_rgba(34,197,94,0.3)] hover:bg-[#16A34A] transition"
                >
                  Lihat 6 Tools ↓
                </a>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#6B7280]">
                  TANPA LOGIN · TANPA PAYWALL · DATA DI DEVICE
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 max-w-[520px]">
                {[
                  ["6", "tools dev"],
                  ["1:1", "preview code"],
                  ["0", "data di-upload"],
                ].map(([n, l]) => (
                  <div
                    key={n}
                    className="rounded-2xl border border-[#1F2937] bg-[#111111] p-3 text-center"
                  >
                    <p className="font-mono font-black text-[#22C55E] text-lg leading-none">{n}</p>
                    <p className="font-mono text-[10px] tracking-widest text-[#6B7280]">{l}</p>
                  </div>
                ))}
              </div>
            </RevealItem>

            <RevealItem className="lg:col-span-5">
              <TerminalShell title="gsg@dev : zsh : 80x24">
                <div className="p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#6B7280]">
                    <span className="text-[#22C55E]">➜</span>{" "}
                    <span className="text-[#FACC15]">~</span> <span>npm run dev</span>
                  </div>
                  <div
                    className="mt-4 rounded-xl border border-[#1F2937] bg-[#111111] p-4 h-[152px] sm:h-[172px] overflow-hidden will-change-transform"
                    style={{ contain: "layout paint" }}
                  >
                    <CodeTypewriter />
                  </div>
                  <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-[#6B7280]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    terminal ready, typewriter loop
                  </div>
                </div>
              </TerminalShell>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <ScrollCode label="json.ts" code={`{\n "ok": true,\n "data": [1,2,3]\n}`} />
                <ScrollCode label="cron.ts" code={`* * * * *\n# every minute\nnext: 12:01`} />
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <MarqueeCode />

      {/* tools grid */}
      <section id="tools" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex items-center gap-3 border-b border-[#1F2937] pb-4">
          <h2 className="font-mono font-black tracking-[-0.02em] text-[22px] lg:text-[26px] text-[#E5E7EB] shrink-0">
            6 Tools, siap pakai
          </h2>
          <div className="hidden sm:block flex-1 h-px bg-[#1F2937]" aria-hidden />
          <p className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#6B7280] shrink-0">
            Buka tools <span className="text-[#22C55E]">→</span>
          </p>
        </div>

        <Reveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
          {tools.map((t) => (
            <RevealItem key={t.slug}>
              <DevCard {...t} />
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-8 rounded-2xl border border-[#1F2937] bg-[#111111] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#22C55E]">
              PRINSIP DEV GSG ID
            </p>
            <p className="mt-1 text-sm leading-6 text-[#9CA3AF]">
              Code glow, terminal chrome, mono, preview code. Draft auto-save di device. Tidak ada
              paywall.
            </p>
          </div>
          <div className="shrink-0 rounded-full bg-[#22C55E] px-5 py-2.5 text-sm font-mono font-bold text-[#0A0A0A]">
            Lorong DEV, gsgid.vercel.app/dev
          </div>
        </div>
      </section>
    </div>
  );
}
