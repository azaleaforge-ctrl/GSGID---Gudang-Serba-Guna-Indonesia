"use client";
import { useEffect, useMemo, useState } from "react";

import { TerminalShell } from "@/components/dev/TerminalShell";
import {
  BtnGhost,
  Card,
  Input,
  Label,
  TextArea,
  ToolShellDev,
} from "@/components/dev/ToolShellDev";

import { getDraft, saveDraft } from "@/lib/db";

const DRAFT_KEY = "dev-regex-tester";
type Draft = { pattern: string; flags: string; test: string; replace: string };

const CHEAT = [
  { k: ".", d: "satu karakter apa saja" },
  { k: "\\d", d: "digit 0-9" },
  { k: "\\w", d: "huruf, angka, underscore" },
  { k: "\\s", d: "whitespace" },
  { k: "^", d: "awal string" },
  { k: "$", d: "akhir string" },
  { k: "*", d: "0 atau lebih" },
  { k: "+", d: "1 atau lebih" },
  { k: "?", d: "0 atau 1" },
  { k: "{m,n}", d: "m sampai n kali" },
  { k: "( )", d: "group" },
  { k: "[abc]", d: "karakter set" },
  { k: "|", d: "atau" },
  { k: "g", d: "global" },
  { k: "i", d: "case insensitive" },
  { k: "m", d: "multiline" },
  { k: "s", d: "dotAll" },
  { k: "u", d: "unicode" },
  { k: "y", d: "sticky" },
];

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState("^(\\d{4})-(\\d{2})-(\\d{2})$");
  const [flags, setFlags] = useState("m");
  const [test, setTest] = useState("2026-08-31\n2026-13-01\nhello 123\nnomor 0812-3456");
  const [replace, setReplace] = useState("$1/$2/$3");

  useEffect(() => {
    getDraft<Draft>(DRAFT_KEY).then((d) => {
      if (d) {
        if (d.pattern) setPattern(d.pattern);
        if (d.flags) setFlags(d.flags);
        if (d.test) setTest(d.test);
        if (d.replace) setReplace(d.replace);
      }
    });
  }, []);
  useEffect(() => {
    saveDraft(DRAFT_KEY, DRAFT_KEY, "lobby" as const, { pattern, flags, test, replace });
  }, [pattern, flags, test, replace]);

  const { error, matches, highlighted, replaced } = useMemo(() => {
    let err: string | null = null;
    const ms: RegExpMatchArray[] = [];
    let hl: React.ReactNode = null;
    let rep: string | null = null;
    try {
      // validate flags
      if (!/^[gimsuy]*$/.test(flags)) throw new Error("Flag tidak valid. Gunakan g,i,m,s,u,y");
      const re = new RegExp(pattern, flags);
      // matches
      if (pattern) {
        // handle global correctly
        if (flags.includes("g")) {
          const globalRe = new RegExp(pattern, flags);
          let m: RegExpExecArray | null;
          while ((m = globalRe.exec(test)) !== null) {
            ms.push([...m] as unknown as RegExpMatchArray);
            if (m[0].length === 0) globalRe.lastIndex++;
            if (ms.length > 200) break;
          }
        } else {
          const m = test.match(re);
          if (m) ms.push(m as RegExpMatchArray);
        }
        // replace preview
        try {
          rep = test.replace(re, replace);
        } catch {}
        // highlighted
        if (flags.includes("g")) {
          const parts: React.ReactNode[] = [];
          const re2 = new RegExp(pattern, flags);
          let last = 0;
          let m: RegExpExecArray | null;
          let idx = 0;
          while ((m = re2.exec(test)) !== null) {
            const start = m.index;
            const end = start + m[0].length;
            if (start > last)
              parts.push(
                <span key={`t-${idx++}`} className="text-[#E5E7EB]">
                  {test.slice(last, start)}
                </span>
              );
            parts.push(
              <mark key={`m-${idx++}`} className="bg-[#22C55E] text-[#0A0A0A] rounded px-0.5">
                {test.slice(start, end)}
              </mark>
            );
            last = end;
            if (m[0].length === 0) re2.lastIndex++;
            if (parts.length > 400) break;
          }
          if (last < test.length)
            parts.push(
              <span key="tail" className="text-[#E5E7EB]">
                {test.slice(last)}
              </span>
            );
          hl = (
            <span className="font-mono text-xs leading-5 whitespace-pre-wrap break-words">
              {parts.length ? parts : <span className="text-[#6B7280]">Tidak ada match</span>}
            </span>
          );
        } else {
          const m = re.exec(test);
          if (m) {
            const start = m.index;
            const end = start + m[0].length;
            hl = (
              <span className="font-mono text-xs leading-5 whitespace-pre-wrap break-words">
                <span className="text-[#E5E7EB]">{test.slice(0, start)}</span>
                <mark className="bg-[#22C55E] text-[#0A0A0A] rounded px-0.5">
                  {test.slice(start, end)}
                </mark>
                <span className="text-[#E5E7EB]">{test.slice(end)}</span>
              </span>
            );
          } else {
            hl = <span className="font-mono text-xs text-[#6B7280]">Tidak ada match</span>;
          }
        }
      }
    } catch (e) {
      err = (e as Error).message;
      hl = <span className="font-mono text-xs text-red-400">{err}</span>;
    }
    return { error: err, matches: ms, highlighted: hl, replaced: rep };
  }, [pattern, flags, test, replace]);

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(new RegExp(f, "g"), "") : prev + f));
  };

  const preview = (
    <div className="p-4 space-y-3">
      <TerminalShell
        title={`regex preview : /${pattern || " "}/${flags}  matches ${matches.length}`}
      >
        <div className="p-4 space-y-3">
          {error ? (
            <div className="rounded-lg border border-red-900 bg-red-950/30 p-3 font-mono text-xs text-red-400">
              {error}
            </div>
          ) : (
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">HIGHLIGHT</p>
              <div className="mt-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3">
                {highlighted}
              </div>
              <p className="font-mono text-[11px] text-[#6B7280] mt-2">
                {matches.length} match{matches.length !== 1 ? "es" : ""} ditemukan
              </p>
            </div>
          )}
          {matches.length > 0 && (
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <p className="font-mono text-[11px] tracking-widest text-[#22C55E]">MATCHES</p>
              <div className="mt-2 space-y-2 max-h-[220px] overflow-auto dev-scrollbar">
                {matches.slice(0, 50).map((m, i) => (
                  <div key={i} className="rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-2">
                    <p className="font-mono text-xs text-[#FACC15]">
                      #{i + 1}: &quot;{m[0]}&quot; {m.index !== undefined ? `at ${m.index}` : ""}
                    </p>
                    {m.length > 1 && (
                      <p className="font-mono text-[11px] text-[#9CA3AF]">
                        groups:{" "}
                        {m
                          .slice(1)
                          .map((g, gi) => `[${gi + 1}]=${g ?? "null"}`)
                          .join(" ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {replaced !== null && replace && (
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <p className="font-mono text-[11px] tracking-widest text-[#60A5FA]">
                REPLACE PREVIEW
              </p>
              <pre className="mt-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3 font-mono text-xs whitespace-pre-wrap break-words text-[#E5E7EB]">
                {replaced}
              </pre>
            </div>
          )}
        </div>
      </TerminalShell>
      <div className="rounded-xl border border-[#1F2937] bg-[#111111] p-3">
        <p className="font-mono text-[11px] tracking-widest text-[#FACC15]">
          CHEAT SHEET BAHASA INDONESIA
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {CHEAT.map((c) => (
            <div
              key={c.k}
              className="flex items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0A0A0A] px-2 py-1.5"
            >
              <code className="font-mono text-xs font-bold text-[#22C55E]">{c.k}</code>
              <span className="font-mono text-[11px] text-[#9CA3AF]">{c.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ToolShellDev
      title="Regex Tester"
      subtitle="Tulis pattern dan flag g,i,m,s,u,y, lihat live highlight, match groups, dan replace preview. Pakai RegExp native."
      preview={preview}
      draftKey={DRAFT_KEY}
    >
      <Card>
        <Label>Pattern</Label>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[#6B7280]">/</span>
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="\\d+"
            className="flex-1"
          />
          <span className="font-mono text-[#6B7280]">/</span>
          <Input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gim"
            className="w-[84px]"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            ["g", "global"],
            ["i", "insensitive"],
            ["m", "multiline"],
            ["s", "dotAll"],
            ["u", "unicode"],
            ["y", "sticky"],
          ].map(([f, label]) => (
            <button
              key={f}
              onClick={() => toggleFlag(f)}
              className={`rounded-full px-3 py-1 font-mono text-xs border ${flags.includes(f) ? "bg-[#22C55E] text-[#0A0A0A] border-[#22C55E]" : "bg-[#0A0A0A] text-[#9CA3AF] border-[#1F2937]"}`}
            >
              {f} {label}
            </button>
          ))}
        </div>
        {error && <p className="font-mono text-xs text-red-400 mt-2">{error}</p>}
      </Card>
      <Card>
        <Label>Test String</Label>
        <TextArea
          value={test}
          onChange={(e) => setTest(e.target.value)}
          rows={6}
          placeholder="masukkan teks untuk ditest"
          className="font-mono text-xs"
        />
      </Card>
      <Card>
        <Label>Replace (preview)</Label>
        <Input
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          placeholder="$1 atau $&"
        />
        <p className="font-mono text-[11px] text-[#6B7280] mt-1">
          $1 group 1, $& whole match, $` before, $&apos; after
        </p>
      </Card>
      <Card className="bg-[#0A0A0A]">
        <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">CONTOH CEPAT</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            ["\\d+", "g"],
            ["^(\\d{4})-(\\d{2})", "m"],
            ["\\b[a-z]+\\b", "gi"],
          ].map(([p, f]) => (
            <BtnGhost
              key={p}
              onClick={() => {
                setPattern(p);
                setFlags(f);
              }}
              className="text-xs"
            >
              /{p}/{f}
            </BtnGhost>
          ))}
        </div>
      </Card>
    </ToolShellDev>
  );
}
