export type HashAlgo = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
export type HashAlgoKey = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

const subtleMap: Record<string, string> = {
  "SHA-1": "SHA-1",
  "SHA-256": "SHA-256",
  "SHA-384": "SHA-384",
  "SHA-512": "SHA-512",
};

// pure JS MD5 (RFC1321) - small impl
function md5(input: string): string {
  // Convert to UTF-8 bytes then to words
  const bytes = new TextEncoder().encode(input);
  // Use classic MD5 algorithm via DataView
  // Implementation adapted from public domain
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = (a + q + x + t) >>> 0;
    return (((a << s) | (a >>> (32 - s))) + b) >>> 0;
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  // padding
  const origLen = bytes.length;
  const withOne = origLen + 1;
  const padLen = withOne % 64;
  const zeros = padLen <= 56 ? 56 - padLen : 120 - padLen;
  // we need 64-bit length
  const totalLen = withOne + zeros + 8;
  const padded = new Uint8Array(totalLen);
  padded.set(bytes);
  padded[origLen] = 0x80;
  // length in bits little endian
  const bitLen = origLen * 8;
  const view = new DataView(padded.buffer);
  view.setUint32(totalLen - 8, bitLen >>> 0, true);
  view.setUint32(totalLen - 4, Math.floor(bitLen / 0x100000000), true);

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < totalLen; i += 64) {
    const M = new Array(16);
    for (let j = 0; j < 16; j++) M[j] = view.getUint32(i + j * 4, true);
    const AA = a,
      BB = b,
      CC = c,
      DD = d;
    a = ff(a, b, c, d, M[0], 7, 0xd76aa478);
    d = ff(d, a, b, c, M[1], 12, 0xe8c7b756);
    c = ff(c, d, a, b, M[2], 17, 0x242070db);
    b = ff(b, c, d, a, M[3], 22, 0xc1bdceee);
    a = ff(a, b, c, d, M[4], 7, 0xf57c0faf);
    d = ff(d, a, b, c, M[5], 12, 0x4787c62a);
    c = ff(c, d, a, b, M[6], 17, 0xa8304613);
    b = ff(b, c, d, a, M[7], 22, 0xfd469501);
    a = ff(a, b, c, d, M[8], 7, 0x698098d8);
    d = ff(d, a, b, c, M[9], 12, 0x8b44f7af);
    c = ff(c, d, a, b, M[10], 17, 0xffff5bb1);
    b = ff(b, c, d, a, M[11], 22, 0x895cd7be);
    a = ff(a, b, c, d, M[12], 7, 0x6b901122);
    d = ff(d, a, b, c, M[13], 12, 0xfd987193);
    c = ff(c, d, a, b, M[14], 17, 0xa679438e);
    b = ff(b, c, d, a, M[15], 22, 0x49b40821);
    a = gg(a, b, c, d, M[1], 5, 0xf61e2562);
    d = gg(d, a, b, c, M[6], 9, 0xc040b340);
    c = gg(c, d, a, b, M[11], 14, 0x265e5a51);
    b = gg(b, c, d, a, M[0], 20, 0xe9b6c7aa);
    a = gg(a, b, c, d, M[5], 5, 0xd62f105d);
    d = gg(d, a, b, c, M[10], 9, 0x02441453);
    c = gg(c, d, a, b, M[15], 14, 0xd8a1e681);
    b = gg(b, c, d, a, M[4], 20, 0xe7d3fbc8);
    a = gg(a, b, c, d, M[9], 5, 0x21e1cde6);
    d = gg(d, a, b, c, M[14], 9, 0xc33707d6);
    c = gg(c, d, a, b, M[3], 14, 0xf4d50d87);
    b = gg(b, c, d, a, M[8], 20, 0x455a14ed);
    a = gg(a, b, c, d, M[13], 5, 0xa9e3e905);
    d = gg(d, a, b, c, M[2], 9, 0xfcefa3f8);
    c = gg(c, d, a, b, M[7], 14, 0x676f02d9);
    b = gg(b, c, d, a, M[12], 20, 0x8d2a4c8a);
    a = hh(a, b, c, d, M[5], 4, 0xfffa3942);
    d = hh(d, a, b, c, M[8], 11, 0x8771f681);
    c = hh(c, d, a, b, M[11], 16, 0x6d9d6122);
    b = hh(b, c, d, a, M[14], 23, 0xfde5380c);
    a = hh(a, b, c, d, M[1], 4, 0xa4beea44);
    d = hh(d, a, b, c, M[4], 11, 0x4bdecfa9);
    c = hh(c, d, a, b, M[7], 16, 0xf6bb4b60);
    b = hh(b, c, d, a, M[10], 23, 0xbebfbc70);
    a = hh(a, b, c, d, M[13], 4, 0x289b7ec6);
    d = hh(d, a, b, c, M[0], 11, 0xeaa127fa);
    c = hh(c, d, a, b, M[3], 16, 0xd4ef3085);
    b = hh(b, c, d, a, M[6], 23, 0x04881d05);
    a = hh(a, b, c, d, M[9], 4, 0xd9d4d039);
    d = hh(d, a, b, c, M[12], 11, 0xe6db99e5);
    c = hh(c, d, a, b, M[15], 16, 0x1fa27cf8);
    b = hh(b, c, d, a, M[2], 23, 0xc4ac5665);
    a = ii(a, b, c, d, M[0], 6, 0xf4292244);
    d = ii(d, a, b, c, M[7], 10, 0x432aff97);
    c = ii(c, d, a, b, M[14], 15, 0xab9423a7);
    b = ii(b, c, d, a, M[5], 21, 0xfc93a039);
    a = ii(a, b, c, d, M[12], 6, 0x655b59c3);
    d = ii(d, a, b, c, M[3], 10, 0x8f0ccc92);
    c = ii(c, d, a, b, M[10], 15, 0xffeff47d);
    b = ii(b, c, d, a, M[1], 21, 0x85845dd1);
    a = ii(a, b, c, d, M[8], 6, 0x6fa87e4f);
    d = ii(d, a, b, c, M[15], 10, 0xfe2ce6e0);
    c = ii(c, d, a, b, M[6], 15, 0xa3014314);
    b = ii(b, c, d, a, M[13], 21, 0x4e0811a1);
    a = ii(a, b, c, d, M[4], 6, 0xf7537e82);
    d = ii(d, a, b, c, M[11], 10, 0xbd3af235);
    c = ii(c, d, a, b, M[2], 15, 0x2ad7d2bb);
    b = ii(b, c, d, a, M[9], 21, 0xeb86d391);
    a = (a + AA) >>> 0;
    b = (b + BB) >>> 0;
    c = (c + CC) >>> 0;
    d = (d + DD) >>> 0;
  }
  const words = [a, b, c, d];
  let hex = "";
  for (const w of words) {
    for (let i = 0; i < 4; i++) {
      const byte = (w >>> (i * 8)) & 0xff;
      hex += byte.toString(16).padStart(2, "0");
    }
  }
  return hex;
}

export async function hashText(input: string, algo: HashAlgoKey): Promise<string> {
  if (algo === "MD5") return md5(input);
  const subtleAlgo = subtleMap[algo];
  if (!subtleAlgo) throw new Error("Algo tidak didukung");
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest(subtleAlgo, data);
  return bufferToHex(buf);
}

export function bufferToHex(buf: ArrayBuffer): string {
  const arr = new Uint8Array(buf);
  let hex = "";
  for (const b of arr) hex += b.toString(16).padStart(2, "0");
  return hex;
}

export function generatePassword(opts: {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
}): string {
  const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerSet = "abcdefghijklmnopqrstuvwxyz";
  const numSet = "0123456789";
  const symSet = "!@#$%^&*_-+=<>?/{}[]()";
  let charset = "";
  if (opts.upper) charset += upperSet;
  if (opts.lower) charset += lowerSet;
  if (opts.numbers) charset += numSet;
  if (opts.symbols) charset += symSet;
  if (!charset) charset = lowerSet + numSet;
  const len = Math.max(4, Math.min(128, opts.length));
  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < len; i++) out += charset[arr[i] % charset.length];
  return out;
}

export function generateUUID(): string {
  return crypto.randomUUID();
}
