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

import { decodeJwt, formatWIB, jwtVerifyInfo } from "@/lib/dev/jwt";
import { getDraft, saveDraft } from "@/lib/db";

const DRAFT_KEY = "dev-jwt-decoder";
const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function JsonView({ data }: { data: unknown }) {
  return (
    <pre className="font-mono text-xs leading-4 text-[#E5E7EB] whitespace-pre-wrap break-words">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function JwtDecoderClient() {
  const [token, setToken] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    getDraft<{ token: string }>(DRAFT_KEY).then((d) => {
      if (d?.token) setToken(d.token);
    });
  }, []);
  useEffect(() => {
    saveDraft(DRAFT_KEY, DRAFT_KEY, "lobby" as const, { token });
  }, [token]);

  const result = decodeJwt(token);

  const preview = (
    <div className="p-4 space-y-3">
      <TerminalShell title="jwt decode : header . payload . signature">
        <div className="p-4 space-y-3">
          {!result.valid ? (
            <div className="rounded-lg border border-red-900 bg-red-950/30 p-3">
              <p className="font-mono text-xs font-bold text-red-400">Token tidak valid</p>
              <p className="font-mono text-xs text-red-300 mt-1">{result.error}</p>
            </div>
          ) : null}
          <div className="grid gap-3">
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <p className="font-mono text-[11px] tracking-widest text-[#FACC15]">HEADER</p>
              {result.header?.error ? (
                <p className="font-mono text-xs text-red-400 mt-1">{result.header.error}</p>
              ) : result.header?.json ? (
                <JsonView data={result.header.json} />
              ) : (
                <p className="font-mono text-xs text-[#6B7280]">-</p>
              )}
              {result.alg && (
                <p className="font-mono text-[11px] text-[#9CA3AF] mt-2">
                  alg: <span className="text-[#E5E7EB] font-bold">{result.alg}</span>
                </p>
              )}
            </div>
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <p className="font-mono text-[11px] tracking-widest text-[#22C55E]">PAYLOAD</p>
              {result.payload?.error ? (
                <p className="font-mono text-xs text-red-400 mt-1">{result.payload.error}</p>
              ) : result.payload?.json ? (
                <JsonView data={result.payload.json} />
              ) : (
                <p className="font-mono text-xs text-[#6B7280]">-</p>
              )}
              {result.payload?.json !== null &&
              result.payload?.json !== undefined &&
              typeof result.payload.json === "object" ? (
                <div className="mt-3 space-y-1 rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3">
                  <p className="font-mono text-[11px] text-[#6B7280]">CLAIMS</p>
                  {result.iatDate && (
                    <p className="font-mono text-xs text-[#E5E7EB]">
                      iat: {formatWIB(result.iatDate)} <span className="text-[#6B7280]">(WIB)</span>
                    </p>
                  )}
                  {result.expDate && (
                    <p
                      className={`font-mono text-xs ${result.isExpired ? "text-red-400" : "text-[#22C55E]"}`}
                    >
                      exp: {formatWIB(result.expDate)} {result.isExpired ? "(expired)" : "(valid)"}
                    </p>
                  )}
                  {!result.expDate && !result.iatDate && (
                    <p className="font-mono text-xs text-[#6B7280]">Tidak ada exp/iat</p>
                  )}
                </div>
              ) : null}
            </div>
            <div className="rounded-lg border border-[#1F2937] bg-[#111111] p-3">
              <p className="font-mono text-[11px] tracking-widest text-[#60A5FA]">SIGNATURE</p>
              <p className="font-mono text-xs break-all text-[#9CA3AF] mt-1">
                {result.signature || "-"}
              </p>
              <p className="font-mono text-xs text-[#9CA3AF] mt-2">
                Signature adalah base64url dari HMAC/RSASign(header.payload). Tidak bisa
                diverifikasi tanpa secret/key.
              </p>
            </div>
          </div>
          {result.alg && (
            <div className="rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/5 p-3">
              <p className="font-mono text-xs text-[#E5E7EB]">{jwtVerifyInfo(result.alg)}</p>
            </div>
          )}
        </div>
      </TerminalShell>
      <div className="rounded-lg border border-[#1F2937] bg-[#0A0A0A] p-3">
        <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">TOKEN PARTS</p>
        <div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
          {token.split(".").map((p, i) => (
            <span
              key={i}
              className={`rounded-full px-2 py-1 border ${i === 0 ? "border-[#FACC15]/30 bg-[#FACC15]/10 text-[#FACC15]" : i === 1 ? "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]" : "border-[#60A5FA]/30 bg-[#60A5FA]/10 text-[#60A5FA]"}`}
            >
              {["header", "payload", "signature"][i]}: {p.length} chars
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ToolShellDev
      title="JWT Decoder"
      subtitle="Paste token, decode header dan payload base64url, lihat exp dan iat dalam WIB, pahami HS256 vs RS256. Tanpa kirim ke server."
      preview={preview}
      draftKey={DRAFT_KEY}
    >
      <Card>
        <Label>JWT Token</Label>
        <TextArea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={6}
          placeholder="eyJhbGciOi..."
          className="font-mono text-xs leading-4"
        />
        <p className="font-mono text-[11px] text-[#6B7280] mt-2">
          Format: header.payload.signature, base64url. Padding otomatis.
        </p>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        <BtnPrimary onClick={() => setToken(SAMPLE)}>Contoh JWT</BtnPrimary>
        <BtnGhost
          onClick={async () => {
            await navigator.clipboard.writeText(token);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? "Copied ✓" : "Copy Token"}
        </BtnGhost>
      </div>
      <div className="flex gap-2">
        <BtnGhost onClick={() => setToken("")} className="flex-1">
          Clear
        </BtnGhost>
        <BtnGhost
          onClick={async () => {
            const t = await navigator.clipboard.readText().catch(() => "");
            if (t) setToken(t.trim());
          }}
          className="flex-1"
        >
          Paste
        </BtnGhost>
      </div>
      <Card className="bg-[#0A0A0A]">
        <p className="font-mono text-[11px] tracking-widest text-[#6B7280]">CATATAN VERIFY</p>
        <ul className="mt-2 space-y-1 font-mono text-xs text-[#9CA3AF] list-disc pl-4">
          <li>HS256 pakai secret yang sama untuk sign dan verify.</li>
          <li>RS256 pakai private key sign, public key verify.</li>
          <li>Exp dalam detik unix, konversi ke Asia/Jakarta sudah otomatis.</li>
          <li>Tool ini hanya decode, tidak verify signature.</li>
        </ul>
      </Card>
    </ToolShellDev>
  );
}
