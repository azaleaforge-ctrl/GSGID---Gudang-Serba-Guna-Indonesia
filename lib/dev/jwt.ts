export type JwtPart = { raw: string; json: unknown; error: string | null };
export type JwtDecodeResult = {
  valid: boolean;
  error: string | null;
  header: JwtPart | null;
  payload: JwtPart | null;
  signature: string | null;
  alg: string | null;
  expDate: Date | null;
  iatDate: Date | null;
  isExpired: boolean | null;
};

export function base64UrlDecode(input: string): string {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad) s += "=".repeat(4 - pad);
  // use atob with UTF-8 handling
  try {
    const binary = atob(s);
    // decode UTF-8 bytes to string
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    throw new Error("Base64url decode gagal");
  }
}

export function base64UrlEncode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function tryParseJson(str: string): { json: unknown; error: string | null } {
  try {
    return { json: JSON.parse(str), error: null };
  } catch (e) {
    return { json: null, error: (e as Error).message };
  }
}

export function decodeJwt(token: string): JwtDecodeResult {
  const t = token.trim();
  if (!t)
    return {
      valid: false,
      error: "Token kosong",
      header: null,
      payload: null,
      signature: null,
      alg: null,
      expDate: null,
      iatDate: null,
      isExpired: null,
    };
  const parts = t.split(".");
  if (parts.length !== 3)
    return {
      valid: false,
      error: "Format JWT harus 3 bagian dipisah titik (header.payload.signature)",
      header: null,
      payload: null,
      signature: parts[2] ?? null,
      alg: null,
      expDate: null,
      iatDate: null,
      isExpired: null,
    };
  const [hRaw, pRaw, sRaw] = parts;
  let hStr = "";
  let pStr = "";
  let hErr: string | null = null;
  let pErr: string | null = null;
  let hJson: unknown = null;
  let pJson: unknown = null;
  try {
    hStr = base64UrlDecode(hRaw);
  } catch (e) {
    hErr = (e as Error).message;
  }
  try {
    pStr = base64UrlDecode(pRaw);
  } catch (e) {
    pErr = (e as Error).message;
  }
  if (!hErr) {
    const r = tryParseJson(hStr);
    hJson = r.json;
    hErr = r.error;
  }
  if (!pErr) {
    const r = tryParseJson(pStr);
    pJson = r.json;
    pErr = r.error;
  }
  const header: JwtPart = { raw: hStr, json: hJson, error: hErr };
  const payload: JwtPart = { raw: pStr, json: pJson, error: pErr };
  const alg =
    hJson && typeof hJson === "object" && hJson !== null && "alg" in hJson
      ? String((hJson as Record<string, unknown>).alg)
      : null;
  let expDate: Date | null = null;
  let iatDate: Date | null = null;
  let isExpired: boolean | null = null;
  if (pJson && typeof pJson === "object" && pJson !== null) {
    const p = pJson as Record<string, unknown>;
    if (typeof p.exp === "number") {
      expDate = new Date(p.exp * 1000);
      isExpired = Date.now() > expDate.getTime();
    }
    if (typeof p.iat === "number") iatDate = new Date(p.iat * 1000);
  }
  const valid = !hErr && !pErr;
  return {
    valid,
    error: valid ? null : hErr || pErr || "Decode gagal",
    header,
    payload,
    signature: sRaw,
    alg,
    expDate,
    iatDate,
    isExpired,
  };
}

export function formatWIB(date: Date, tz: string = "Asia/Jakarta"): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: tz,
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function jwtVerifyInfo(alg: string | null): string {
  if (!alg) return "Alg tidak ditemukan di header.";
  if (alg === "HS256" || alg === "HS384" || alg === "HS512")
    return `${alg} adalah HMAC dengan secret simetris. Verifikasi butuh secret yang sama, tidak bisa hanya dari token.`;
  if (alg === "RS256" || alg === "RS384" || alg === "RS512")
    return `${alg} adalah RSA asimetris. Verifikasi butuh public key, signature dibuat dengan private key.`;
  if (alg === "ES256" || alg.startsWith("ES"))
    return `${alg} adalah ECDSA. Verifikasi butuh public key EC.`;
  if (alg === "none")
    return "Alg none berarti tanpa signature, tidak aman dan tidak boleh dipakai di production.";
  return `${alg}: pastikan library server mendukung alg ini.`;
}
