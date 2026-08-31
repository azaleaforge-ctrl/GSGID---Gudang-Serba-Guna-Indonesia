"use client";
import { useEffect, useState } from "react";

import { TerminalShell } from "@/components/dev/TerminalShell";
import {
  BtnGhost,
  BtnPrimary,
  Card,
  Label,
  TextArea,
  ToolShellDev,
} from "@/components/dev/ToolShellDev";

import {
  decodeBase64,
  decodeBase64Url,
  decodeHtml,
  decodeUrl,
  encodeBase64,
  encodeBase64Url,
  encodeHtml,
  encodeUrl,
} from "@/lib/dev/codec";
import { getDraft, saveDraft } from "@/lib/db";

const DRAFT_KEY = "dev-codec-lab";
type Draft = { tab: string; input: string };

const tabs = [
  { id: "base64", label: "Base64" },
  { id: "base64url", label: "Base64URL" },
  { id: "url", label: "URL" },
  { id: "html", label: "HTML Entity" },
] as const;
type TabId = (typeof tabs)[number]["id"];

export default function CodecLabClient() {
  const [tab, setTab] = useState<TabId>("base64");
  const [input, setInput] = useState("Halo GSG ID, hello 123, emoji 😀");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getDraft<Draft>(DRAFT_KEY).then((d) => {
      if (d?.input) setInput(d.input);
      if (d?.tab) setTab(d.tab as TabId);
    });
  }, []);
  useEffect(() => {
    saveDraft(DRAFT_KEY, DRAFT_KEY, "lobby" as const, { tab, input });
  }, [tab, input]);

  const doEncode = () => {
    setError(null);
    try {
      let out = "";
      if (tab === "base64") out = encodeBase64(input);
      else if (tab === "base64url") out = encodeBase64Url(input);
      else if (tab === "url") out = encodeUrl(input);
      else if (tab === "html") out = encodeHtml(input);
      setOutput(out);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const doDecode = () => {
    setError(null);
    try {
      let out = "";
      if (tab === "base64") out = decodeBase64(input);
      else if (tab === "base64url") out = decodeBase64Url(input);
      else if (tab === "url") out = decodeUrl(input);
      else if (tab === "html") out = decodeHtml(input);
      setOutput(out);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const doSwap = () => {
    if (output) setInput(output);
    setOutput(input);
  };

  // live both directions preview
  const liveEncoded = (() => {
    try {
      if (tab === "base64") return encodeBase64(input);
      if (tab === "base64url") return encodeBase64Url(input);
      if (tab === "url") return encodeUrl(input);
      if (tab === "html") return encodeHtml(input);
    } catch {
      return "-";
    }
    return "";
  })();

  const preview = (
    <div className="p-4 space-y-3">
      <TerminalShell title={`codec lab : ${tab}  live`}>
        <div className="p-4 space-y-3">
          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#22C55E]">INPUT PREVIEW</p>
            <pre className="mt-2 font-mono text-xs text-[#E5E7EB] whitespace-pre-wrap break-words">
              {input || <span className="text-[#6B7280]">kosong</span>}
            </pre>
            <p className="font-mono text-[11px] text-[#6B7280] mt-2">
              {input.length} chars, {new TextEncoder().encode(input).length} bytes UTF-8
            </p>
          </div>
          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#FACC15]">
              LIVE ENCODED ({tab})
            </p>
            <pre className="mt-2 font-mono text-xs text-[#E5E7EB] whitespace-pre-wrap break-words">
              {liveEncoded}
            </pre>
          </div>
          {output && (
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] tracking-widest text-[#60A5FA]">OUTPUT</p>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(output);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1200);
                  }}
                  className="font-mono text-[11px] text-[#22C55E]"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="mt-2 font-mono text-xs text-[#E5E7EB] whitespace-pre-wrap break-words">
                {output}
              </pre>
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-900 bg-red-950/30 p-3 font-mono text-xs text-red-400">
              {error}
            </div>
          )}
          <div className="rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">INFO {tab}</p>
            <p className="font-mono text-xs text-[#9CA3AF] mt-1">
              {tab === "base64" &&
                "Base64 pakai btoa/atob dengan TextEncoder agar Unicode aman. Padding = dipertahankan."}
              {tab === "base64url" &&
                "Base64URL ganti + -> -, / -> _, hapus padding =, untuk JWT dan URL safe."}
              {tab === "url" &&
                "URL encode pakai encodeURIComponent, decode pakai decodeURIComponent. Spasi jadi %20."}
              {tab === "html" &&
                "HTML Entity encode &, <, >, \", ', decode kebalikan. Support numeric &#123; dan &#xAB;."}
            </p>
          </div>
        </div>
      </TerminalShell>
    </div>
  );

  return (
    <ToolShellDev
      title="Codec Lab"
      subtitle="Encode dan decode Base64, Base64URL, URL, HTML Entity. Live dua arah, Unicode via TextEncoder."
      preview={preview}
      draftKey={DRAFT_KEY}
    >
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold border ${tab === t.id ? "bg-[#22C55E] text-[#0A0A0A] border-[#22C55E]" : "bg-[#111111] text-[#9CA3AF] border-[#1F2937]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Card>
        <Label>Input</Label>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder="masukkan teks"
          className="font-mono text-xs"
        />
        <p className="font-mono text-[11px] text-[#6B7280] mt-1">
          Unicode aman, emoji terhitung bytes UTF-8.
        </p>
      </Card>
      <div className="grid grid-cols-3 gap-2">
        <BtnPrimary onClick={doEncode}>Encode →</BtnPrimary>
        <BtnGhost onClick={doDecode}>Decode →</BtnGhost>
        <BtnGhost onClick={doSwap}>Swap</BtnGhost>
      </div>
      <Card>
        <div className="flex items-center justify-between">
          <Label>Output</Label>
          <button
            onClick={async () => {
              if (!output) return;
              await navigator.clipboard.writeText(output);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="font-mono text-[11px] text-[#22C55E]"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <TextArea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          rows={5}
          placeholder="output muncul di sini"
          className="font-mono text-xs"
        />
        {error && <p className="font-mono text-xs text-red-400 mt-2">{error}</p>}
      </Card>
      <Card className="bg-[#0A0A0A]">
        <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">CONTOH CEPAT</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <BtnGhost onClick={() => setInput("hello world")} className="text-xs">
            hello world
          </BtnGhost>
          <BtnGhost
            onClick={() => setInput('<div class="a">test & more</div>')}
            className="text-xs"
          >
            html sample
          </BtnGhost>
          <BtnGhost onClick={() => setInput("😀🎉 unicode test")} className="text-xs">
            emoji
          </BtnGhost>
        </div>
      </Card>
    </ToolShellDev>
  );
}
