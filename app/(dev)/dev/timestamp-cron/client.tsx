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

import { nextCronRuns, parseCron } from "@/lib/dev/cron";
import { getDraft, saveDraft } from "@/lib/db";

const DRAFT_KEY = "dev-timestamp-cron";
type Draft = { timestamp: string; cron: string; tz: string };

const tzOptions = [
  { id: "Asia/Jakarta", label: "WIB (Jakarta)" },
  { id: "Asia/Makassar", label: "WITA (Makassar)" },
  { id: "Asia/Jayapura", label: "WIT (Jayapura)" },
] as const;

function formatInTz(date: Date, tz: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: tz,
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export default function TimestampCronClient() {
  const [now, setNow] = useState<Date | null>(null);
  const [tz, setTz] = useState<string>("Asia/Jakarta");
  const [timestamp, setTimestamp] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [isMs, setIsMs] = useState(false);
  const [cron, setCron] = useState("*/5 * * * *");

  useEffect(() => {
    getDraft<Draft>(DRAFT_KEY).then((d) => {
      if (d?.timestamp) setTimestamp(d.timestamp);
      if (d?.cron) setCron(d.cron);
      if (d?.tz) setTz(d.tz);
    });
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    saveDraft(DRAFT_KEY, DRAFT_KEY, "lobby" as const, { timestamp, cron, tz });
  }, [timestamp, cron, tz]);

  const parsedTs = (() => {
    const n = Number(timestamp);
    if (isNaN(n) || !timestamp.trim()) return null;
    const ms = isMs ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d;
  })();

  const cronRes = parseCron(cron);
  const nextRuns = cronRes.valid ? nextCronRuns(cron, 5, new Date()) : [];

  const setNowTs = () => {
    const n = Date.now();
    setTimestamp(String(isMs ? n : Math.floor(n / 1000)));
  };

  const preview = (
    <div className="p-4 space-y-3">
      <TerminalShell title="timestamp + cron : live">
        <div className="p-4 space-y-3">
          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#22C55E]">NOW</p>
            {now ? (
              <div className="mt-2 space-y-1">
                <p className="font-mono text-xs text-[#E5E7EB]">
                  Unix detik: {Math.floor(now.getTime() / 1000)}
                </p>
                <p className="font-mono text-xs text-[#E5E7EB]">Unix ms: {now.getTime()}</p>
                {tzOptions.map((t) => (
                  <p key={t.id} className="font-mono text-xs text-[#9CA3AF]">
                    {t.label}: {formatInTz(now, t.id)}
                  </p>
                ))}
              </div>
            ) : (
              <p className="font-mono text-xs text-[#6B7280]">loading...</p>
            )}
          </div>

          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#FACC15]">TIMESTAMP → DATE</p>
            {parsedTs ? (
              <div className="mt-2 space-y-1">
                {tzOptions.map((t) => (
                  <p
                    key={t.id}
                    className={`font-mono text-xs ${t.id === tz ? "text-[#22C55E] font-bold" : "text-[#E5E7EB]"}`}
                  >
                    {t.label}: {formatInTz(parsedTs, t.id)}
                  </p>
                ))}
                <p className="font-mono text-[11px] text-[#6B7280]">
                  ISO: {parsedTs.toISOString()}
                </p>
              </div>
            ) : (
              <p className="font-mono text-xs text-red-400 mt-2">Timestamp tidak valid</p>
            )}
          </div>

          <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
            <p className="font-mono text-[11px] tracking-widest text-[#60A5FA]">CRON</p>
            <p className="font-mono text-sm font-bold text-[#E5E7EB] mt-1">{cron || "-"}</p>
            {cronRes.valid ? (
              <>
                <p className="font-mono text-xs text-[#22C55E] mt-1">{cronRes.description}</p>
                <div className="mt-2 space-y-1">
                  <p className="font-mono text-[11px] text-[#6B7280]">NEXT 5 RUNS ({tz})</p>
                  {nextRuns.map((d, i) => (
                    <p
                      key={i}
                      className="font-mono text-xs text-[#E5E7EB] rounded bg-[#0A0A0A] border border-[#1F2937] px-2 py-1"
                    >
                      {i + 1}. {formatInTz(d, tz)}
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <p className="font-mono text-xs text-red-400 mt-1">{cronRes.error}</p>
            )}
          </div>
        </div>
      </TerminalShell>
    </div>
  );

  return (
    <ToolShellDev
      title="Timestamp dan Cron"
      subtitle="Konversi Unix detik dan ms ke WIB WITA WIT live, dan jelaskan cron 5 field ke Bahasa Indonesia dengan 5 run berikutnya."
      preview={preview}
      draftKey={DRAFT_KEY}
    >
      <Card>
        <div className="flex items-center justify-between">
          <Label>Unix Timestamp</Label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isMs}
              onChange={(e) => setIsMs(e.target.checked)}
              className="accent-[#22C55E]"
            />
            <span className="font-mono text-xs text-[#9CA3AF]">ms</span>
          </label>
        </div>
        <Input
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="1714500000"
          className="mt-1 font-mono"
        />
        <div className="mt-2 flex gap-2">
          <BtnPrimary onClick={setNowTs} className="flex-1 text-xs">
            Now
          </BtnPrimary>
          <BtnGhost
            onClick={async () => {
              await navigator.clipboard.writeText(timestamp);
            }}
            className="flex-1 text-xs"
          >
            Copy
          </BtnGhost>
        </div>
        {parsedTs && (
          <div className="mt-3 rounded-xl border border-[#1F2937] bg-[#0A0A0A] p-3 space-y-1">
            {tzOptions.map((t) => (
              <p key={t.id} className="font-mono text-xs text-[#E5E7EB]">
                <span className="text-[#6B7280]">{t.label}:</span> {formatInTz(parsedTs, t.id)}
              </p>
            ))}
          </div>
        )}
        <div className="mt-3">
          <Label>Zona Waktu</Label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {tzOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => setTz(t.id)}
                className={`rounded-full px-3 py-1 font-mono text-xs border ${tz === t.id ? "bg-[#22C55E] text-[#0A0A0A] border-[#22C55E]" : "bg-[#0A0A0A] text-[#9CA3AF] border-[#1F2937]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <Label>Date → Timestamp</Label>
        <Input
          type="datetime-local"
          onChange={(e) => {
            const d = new Date(e.target.value);
            if (!isNaN(d.getTime()))
              setTimestamp(String(isMs ? d.getTime() : Math.floor(d.getTime() / 1000)));
          }}
          className="mt-1"
        />
        <p className="font-mono text-[11px] text-[#6B7280] mt-1">
          Pilih tanggal, timestamp otomatis terisi sesuai mode detik atau ms.
        </p>
      </Card>

      <Card>
        <Label>Cron (5 field)</Label>
        <Input
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          placeholder="* * * * *"
          className="mt-1 font-mono"
        />
        <p className="font-mono text-[11px] text-[#6B7280] mt-1">
          Format: menit jam tanggal bulan hari. Contoh: 0 9 * * 1 = Senin jam 9 pagi.
        </p>
        {cronRes.valid ? (
          <p className="font-mono text-xs text-[#22C55E] mt-2">{cronRes.description}</p>
        ) : (
          <p className="font-mono text-xs text-red-400 mt-2">{cronRes.error}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["* * * * *", "0 9 * * *", "0 0 * * 1", "*/5 * * * *", "0 9 1 * *"].map((c) => (
            <button
              key={c}
              onClick={() => setCron(c)}
              className="rounded-full border border-[#1F2937] bg-[#0A0A0A] px-3 py-1 font-mono text-xs text-[#9CA3AF] hover:border-[#22C55E]/30"
            >
              {c}
            </button>
          ))}
        </div>
      </Card>
    </ToolShellDev>
  );
}
