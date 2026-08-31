export function encodeBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

export function decodeBase64(input: string): string {
  const s = input.trim();
  // strict check
  const binary = atob(s);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeBase64Url(input: string): string {
  return encodeBase64(input).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeBase64Url(input: string): string {
  let s = input.trim().replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad) s += "=".repeat(4 - pad);
  const binary = atob(s);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeUrl(input: string): string {
  return encodeURIComponent(input);
}
export function decodeUrl(input: string): string {
  return decodeURIComponent(input);
}
export function encodeUrlFull(input: string): string {
  return encodeURI(input);
}

const htmlEncodeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const htmlDecodeMap: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&#x2F;": "/",
  "&apos;": "'",
};

export function encodeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) => htmlEncodeMap[c] || c);
}
export function decodeHtml(input: string): string {
  return input
    .replace(/&(amp|lt|gt|quot|#39|#x27|#x2F|apos);/g, (m) => htmlDecodeMap[m] || m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

export function isProbablyBase64(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (t.length % 4 === 1) return false;
  return /^[A-Za-z0-9+/=_-]+$/.test(t);
}
