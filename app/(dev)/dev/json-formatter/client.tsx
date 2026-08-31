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

import { formatJson, minifyJson, offsetToLineCol, validateJson } from "@/lib/dev/json";
import { getDraft, saveDraft } from "@/lib/db";

const DRAFT_KEY = "dev-json-formatter";
type Draft = { input: string };

function JsonTree({ data, name, depth = 0 }: { data: unknown; name?: string; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  if (data === null)
    return (
      <div className="font-mono text-xs">
        <span className="text-[#6B7280]">{name ? `${name}: ` : ""}</span>
        <span className="text-[#F472B6]">null</span>
      </div>
    );
  if (typeof data === "string")
    return (
      <div className="font-mono text-xs">
        <span className="text-[#6B7280]">{name ? `${name}: ` : ""}</span>
        <span className="text-[#22C55E]">&quot;{data}&quot;</span>
      </div>
    );
  if (typeof data === "number")
    return (
      <div className="font-mono text-xs">
        <span className="text-[#6B7280]">{name ? `${name}: ` : ""}</span>
        <span className="text-[#FACC15]">{String(data)}</span>
      </div>
    );
  if (typeof data === "boolean")
    return (
      <div className="font-mono text-xs">
        <span className="text-[#6B7280]">{name ? `${name}: ` : ""}</span>
        <span className="text-[#60A5FA]">{String(data)}</span>
      </div>
    );
  if (Array.isArray(data)) {
    return (
      <div className="font-mono text-xs">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#9CA3AF] hover:text-[#22C55E] text-left"
        >
          {open ? "▼" : "▶"} {name ? `${name}: ` : ""}[{data.length}]
        </button>
        {open && (
          <div className="ml-3 border-l border-[#1F2937] pl-3 mt-1 space-y-1">
            {data.map((v, i) => (
              <JsonTree key={i} data={v} name={`${i}`} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
  if (typeof data === "object") {
    const entries = Object.entries(data as Record<string, unknown>);
    return (
      <div className="font-mono text-xs">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#9CA3AF] hover:text-[#22C55E] text-left"
        >
          {open ? "▼" : "▶"} {name ? `${name}: ` : ""}
          {`{${entries.length}}`}
        </button>
        {open && (
          <div className="ml-3 border-l border-[#1F2937] pl-3 mt-1 space-y-1">
            {entries.map(([k, v]) => (
              <JsonTree key={k} data={v} name={k} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
  return <div className="font-mono text-xs text-[#6B7280]">{String(data)}</div>;
}

export default function JsonFormatterClient() {
  const [input, setInput] = useState(
    '{\n  "name": "GSG ID",\n  "ok": true,\n  "data": [1, 2, 3]\n}'
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [posInfo, setPosInfo] = useState<{
    line: number | null;
    column: number | null;
    position: number | null;
  } | null>(null);
  const [parsed, setParsed] = useState<unknown>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getDraft<Draft>(DRAFT_KEY).then((d) => {
      if (d?.input) setInput(d.input);
    });
  }, []);
  useEffect(() => {
    saveDraft(DRAFT_KEY, DRAFT_KEY, "lobby" as const, { input });
  }, [input]);

  const doValidate = () => {
    const res = validateJson(input);
    if (res.valid) {
      setError(null);
      setPosInfo(null);
      setParsed(res.parsed);
      setOutput(formatJson(input, 2));
    } else {
      setError(res.error?.message ?? "Invalid");
      setPosInfo({
        line: res.error?.line ?? null,
        column: res.error?.column ?? null,
        position: res.error?.position ?? null,
      });
      setParsed(null);
    }
  };
  const doFormat = () => {
    try {
      const out = formatJson(input, 2);
      setOutput(out);
      setError(null);
      setPosInfo(null);
      setParsed(JSON.parse(input));
    } catch (e) {
      const msg = (e as Error).message;
      const m = msg.match(/position\s+(\d+)/);
      const pos = m ? parseInt(m[1], 10) : null;
      const lc = pos !== null ? offsetToLineCol(input, pos) : { line: null, column: null };
      setError(msg);
      setPosInfo({ ...lc, position: pos });
    }
  };
  const doMinify = () => {
    try {
      const out = minifyJson(input);
      setOutput(out);
      setError(null);
      setPosInfo(null);
      setParsed(JSON.parse(input));
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
    }
  };
  const doCopy = async () => {
    const txt = output || input;
    await navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const preview = (
    <div className="p-4 space-y-3">
      <TerminalShell title="json preview : tree">
        <div className="p-4">
          {error ? (
            <div className="rounded-lg border border-red-900 bg-red-950/30 p-3">
              <p className="font-mono text-xs font-bold text-red-400">Invalid JSON</p>
              <p className="font-mono text-xs text-red-300 mt-1 break-words">{error}</p>
              {posInfo?.line && (
                <p className="font-mono text-[11px] text-red-300/80 mt-1">
                  Line {posInfo.line}, Column {posInfo.column}{" "}
                  {posInfo.position !== null ? `(pos ${posInfo.position})` : ""}
                </p>
              )}
            </div>
          ) : parsed !== null ? (
            <div className="space-y-2">
              <p className="font-mono text-[11px] tracking-widest text-[#22C55E]">
                VALID ·{" "}
                {Array.isArray(parsed)
                  ? `Array[${(parsed as unknown[]).length}]`
                  : typeof parsed === "object"
                    ? `Object{${Object.keys(parsed as object).length}}`
                    : typeof parsed}
              </p>
              <JsonTree data={parsed} />
            </div>
          ) : (
            <p className="font-mono text-xs text-[#6B7280]">
              Klik Format atau Validate untuk melihat tree.
            </p>
          )}
          {output && (
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#6B7280]">OUTPUT</span>
                <button
                  onClick={doCopy}
                  className="font-mono text-[11px] text-[#22C55E] hover:underline"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="mt-2 max-h-[320px] overflow-auto rounded-lg border border-[#1F2937] bg-[#111111] p-3 font-mono text-xs leading-4 text-[#E5E7EB] whitespace-pre-wrap break-words dev-scrollbar">
                {output}
              </pre>
            </div>
          )}
        </div>
      </TerminalShell>
      <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
        <div className="rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3 text-center">
          <p className="text-[#6B7280]">INPUT</p>
          <p className="font-bold text-[#E5E7EB]">{input.length} chars</p>
        </div>
        <div className="rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3 text-center">
          <p className="text-[#6B7280]">STATUS</p>
          <p className={`font-bold ${error ? "text-red-400" : "text-[#22C55E]"}`}>
            {error ? "Error" : "Ready"}
          </p>
        </div>
        <div className="rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3 text-center">
          <p className="text-[#6B7280]">LINES</p>
          <p className="font-bold text-[#E5E7EB]">{input.split("\n").length}</p>
        </div>
      </div>
    </div>
  );

  return (
    <ToolShellDev
      title="JSON Formatter + Viewer"
      subtitle="Format, minify, validate JSON. Error pointer line dan column, tree collapsible, copy 1 klik. Semua di browser."
      preview={preview}
      draftKey={DRAFT_KEY}
    >
      <Card>
        <Label>JSON Input</Label>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={14}
          placeholder={'{"key":"value"}'}
          className="font-mono text-xs leading-4"
        />
        {error && posInfo && (
          <p className="mt-2 font-mono text-xs text-red-400">
            Error: {error} {posInfo.line ? `at line ${posInfo.line}:${posInfo.column}` : ""}
          </p>
        )}
        {!error && parsed !== null && (
          <p className="mt-2 font-mono text-xs text-[#22C55E]">Valid JSON</p>
        )}
      </Card>
      <div className="grid grid-cols-3 gap-2">
        <BtnPrimary onClick={doFormat}>Format</BtnPrimary>
        <BtnGhost onClick={doMinify}>Minify</BtnGhost>
        <BtnGhost onClick={doValidate}>Validate</BtnGhost>
      </div>
      <div className="flex gap-2">
        <BtnGhost onClick={doCopy} className="flex-1">
          {copied ? "Copied ✓" : "Copy Output"}
        </BtnGhost>
        <BtnGhost onClick={() => setInput("")} className="flex-1">
          Clear
        </BtnGhost>
      </div>
      <Card className="bg-[#0A0A0A]">
        <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">CONTOH CEPAT</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {['{"a":1,"b":[2,3]}', '[{"id":1,"name":"A"},{"id":2}]', '{"invalid": json}'].map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="rounded-full border border-[#1F2937] bg-[#111111] px-3 py-1 font-mono text-xs text-[#9CA3AF] hover:border-[#22C55E]/30 hover:text-[#E5E7EB]"
            >
              {s.slice(0, 18)}…
            </button>
          ))}
        </div>
      </Card>
    </ToolShellDev>
  );
}
