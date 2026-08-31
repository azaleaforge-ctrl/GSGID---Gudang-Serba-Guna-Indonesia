"use client";
import { useEffect, useState } from "react";

import { TerminalShell } from "@/components/dev/TerminalShell";
import {
  BtnGhost,
  BtnPrimary,
  Card,
  Input,
  Label,
  ToolShellDev,
} from "@/components/dev/ToolShellDev";

import { generatePassword, generateUUID, hashText, type HashAlgoKey } from "@/lib/dev/hash";
import { getDraft, saveDraft } from "@/lib/db";

const DRAFT_KEY = "dev-id-generator";
type Draft = {
  hashInput: string;
  algo: string;
  pwLen: number;
  pwUpper: boolean;
  pwLower: boolean;
  pwNum: boolean;
  pwSym: boolean;
};

export default function IdGeneratorClient() {
  const [hashInput, setHashInput] = useState("gsg-id-2026");
  const [algo, setAlgo] = useState<HashAlgoKey>("SHA-256");
  const [hashOut, setHashOut] = useState("");
  const [hashLoading, setHashLoading] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [pwLen, setPwLen] = useState(16);
  const [pwUpper, setPwUpper] = useState(true);
  const [pwLower, setPwLower] = useState(true);
  const [pwNum, setPwNum] = useState(true);
  const [pwSym, setPwSym] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    getDraft<Draft>(DRAFT_KEY).then((d) => {
      if (!d) return;
      if (d.hashInput) setHashInput(d.hashInput);
      if (d.algo) setAlgo(d.algo as HashAlgoKey);
      if (d.pwLen) setPwLen(d.pwLen);
      if (typeof d.pwUpper === "boolean") setPwUpper(d.pwUpper);
      if (typeof d.pwLower === "boolean") setPwLower(d.pwLower);
      if (typeof d.pwNum === "boolean") setPwNum(d.pwNum);
      if (typeof d.pwSym === "boolean") setPwSym(d.pwSym);
    });
    setUuids([generateUUID()]);
    setPassword(
      generatePassword({ length: 16, upper: true, lower: true, numbers: true, symbols: false })
    );
  }, []);
  useEffect(() => {
    saveDraft(DRAFT_KEY, DRAFT_KEY, "lobby" as const, {
      hashInput,
      algo,
      pwLen,
      pwUpper,
      pwLower,
      pwNum,
      pwSym,
    });
  }, [hashInput, algo, pwLen, pwUpper, pwLower, pwNum, pwSym]);

  useEffect(() => {
    let cancelled = false;
    setHashLoading(true);
    hashText(hashInput, algo)
      .then((h) => {
        if (!cancelled) setHashOut(h);
      })
      .finally(() => {
        if (!cancelled) setHashLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [hashInput, algo]);

  const addUuid = () => setUuids((prev) => [generateUUID(), ...prev].slice(0, 20));
  const genPw = () =>
    setPassword(
      generatePassword({
        length: pwLen,
        upper: pwUpper,
        lower: pwLower,
        numbers: pwNum,
        symbols: pwSym,
      })
    );

  const copy = async (txt: string, key: string) => {
    await navigator.clipboard.writeText(txt);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  const preview = (
    <div className="p-4 space-y-3">
      <TerminalShell title="id generator : uuid · hash · password">
        <div className="p-4 space-y-3">
          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#FACC15]">UUID v4</p>
            <div className="mt-2 space-y-1.5">
              {uuids.slice(0, 5).map((u) => (
                <div
                  key={u}
                  className="flex items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] px-3 py-2"
                >
                  <code className="font-mono text-xs text-[#22C55E] flex-1 break-all">{u}</code>
                  <button
                    onClick={() => copy(u, u)}
                    className="font-mono text-[11px] text-[#6B7280] hover:text-[#22C55E] shrink-0"
                  >
                    {copied === u ? "copied" : "copy"}
                  </button>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-[#6B7280] mt-2">
              crypto.randomUUID(), 122 bit random, RFC4122.
            </p>
          </div>

          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#22C55E]">HASH {algo}</p>
            <p className="font-mono text-[11px] text-[#6B7280] mt-1">
              input: &quot;{hashInput.slice(0, 40)}&quot; · {hashInput.length} chars
            </p>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] px-3 py-2">
              <code className="font-mono text-xs text-[#E5E7EB] flex-1 break-all">
                {hashLoading ? "hashing..." : hashOut}
              </code>
              <button
                onClick={() => copy(hashOut, "hash")}
                className="font-mono text-[11px] text-[#6B7280] hover:text-[#22C55E]"
              >
                {copied === "hash" ? "copied" : "copy"}
              </button>
            </div>
            <p className="font-mono text-[11px] text-[#6B7280] mt-2">
              {hashOut.length / 2} bytes, hex lowercase.
            </p>
          </div>

          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#60A5FA]">PASSWORD</p>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] px-3 py-2">
              <code className="font-mono text-sm font-bold text-[#E5E7EB] flex-1 break-all">
                {password}
              </code>
              <button
                onClick={() => copy(password, "pw")}
                className="font-mono text-[11px] text-[#6B7280] hover:text-[#22C55E]"
              >
                {copied === "pw" ? "copied" : "copy"}
              </button>
            </div>
            <p className="font-mono text-[11px] text-[#6B7280] mt-2">
              length {password.length}, charset {pwUpper ? "A" : ""}
              {pwLower ? "a" : ""}
              {pwNum ? "0" : ""}
              {pwSym ? "#" : ""}
            </p>
          </div>
        </div>
      </TerminalShell>
    </div>
  );

  return (
    <ToolShellDev
      title="ID Generator"
      subtitle="Generate UUID v4, hash MD5 SHA1 SHA256 SHA512 via Web Crypto, dan password dengan charset pilihan."
      preview={preview}
      draftKey={DRAFT_KEY}
    >
      <Card>
        <div className="flex items-center justify-between">
          <Label>UUID v4</Label>
          <BtnPrimary onClick={addUuid} className="px-3 py-1 text-xs">
            Generate
          </BtnPrimary>
        </div>
        <div className="mt-2 rounded-xl border border-[#1F2937] bg-[#0A0A0A] p-3">
          <code className="font-mono text-xs text-[#22C55E] break-all">{uuids[0] || "-"}</code>
        </div>
        <div className="mt-2 flex gap-2">
          <BtnGhost onClick={() => copy(uuids[0] || "", "uuid-main")} className="flex-1 text-xs">
            {copied === "uuid-main" ? "Copied ✓" : "Copy"}
          </BtnGhost>
          <BtnGhost onClick={() => setUuids([generateUUID()])} className="flex-1 text-xs">
            Reset
          </BtnGhost>
        </div>
      </Card>

      <Card>
        <Label>Hash</Label>
        <Input
          value={hashInput}
          onChange={(e) => setHashInput(e.target.value)}
          placeholder="teks untuk di hash"
          className="mt-1"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(["MD5", "SHA-1", "SHA-256", "SHA-512"] as HashAlgoKey[]).map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`rounded-full px-3 py-1 font-mono text-xs border ${algo === a ? "bg-[#22C55E] text-[#0A0A0A] border-[#22C55E]" : "bg-[#0A0A0A] text-[#9CA3AF] border-[#1F2937]"}`}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-xl border border-[#1F2937] bg-[#0A0A0A] p-3">
          <code className="font-mono text-xs text-[#E5E7EB] break-all">
            {hashLoading ? "…" : hashOut}
          </code>
        </div>
        <BtnGhost onClick={() => copy(hashOut, "hash2")} className="mt-2 w-full text-xs">
          {copied === "hash2" ? "Copied ✓" : "Copy Hash"}
        </BtnGhost>
      </Card>

      <Card>
        <Label>Password Generator</Label>
        <div className="mt-2 flex items-center gap-2">
          <Input
            type="number"
            min={4}
            max={64}
            value={pwLen}
            onChange={(e) => setPwLen(parseInt(e.target.value) || 8)}
            className="w-[80px]"
          />
          <span className="font-mono text-xs text-[#6B7280]">length</span>
          <BtnPrimary onClick={genPw} className="ml-auto px-4 py-2 text-xs">
            Generate
          </BtnPrimary>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            ["Upper A-Z", pwUpper, setPwUpper],
            ["Lower a-z", pwLower, setPwLower],
            ["Numbers 0-9", pwNum, setPwNum],
            ["Symbols !@#", pwSym, setPwSym],
          ].map(([label, val, setter]) => (
            <label
              key={String(label)}
              className="flex items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] px-3 py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={val as boolean}
                onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)}
                className="accent-[#22C55E]"
              />
              <span className="font-mono text-xs text-[#E5E7EB]">{label as string}</span>
            </label>
          ))}
        </div>
        <div className="mt-2 rounded-xl border border-[#1F2937] bg-[#0A0A0A] p-3 flex items-center gap-2">
          <code className="font-mono text-sm font-bold text-[#E5E7EB] flex-1 break-all">
            {password}
          </code>
          <button
            onClick={() => copy(password, "pw2")}
            className="font-mono text-[11px] text-[#22C55E]"
          >
            {copied === "pw2" ? "copied" : "copy"}
          </button>
        </div>
      </Card>
    </ToolShellDev>
  );
}
