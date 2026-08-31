export type JsonErrorInfo = {
  message: string;
  position: number | null;
  line: number | null;
  column: number | null;
};

export function validateJson(input: string): {
  valid: boolean;
  error: JsonErrorInfo | null;
  parsed: unknown;
} {
  if (!input.trim())
    return {
      valid: false,
      error: { message: "Input kosong", position: null, line: null, column: null },
      parsed: null,
    };
  try {
    const parsed = JSON.parse(input);
    return { valid: true, error: null, parsed };
  } catch (e) {
    const err = e as SyntaxError;
    const msg = err.message || "JSON tidak valid";
    const pos = extractPosition(msg);
    const lc = pos !== null ? offsetToLineCol(input, pos) : { line: null, column: null };
    return {
      valid: false,
      error: { message: msg, position: pos, line: lc.line, column: lc.column },
      parsed: null,
    };
  }
}

export function formatJson(input: string, indent = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

function extractPosition(msg: string): number | null {
  // Chrome: "Unexpected token x in JSON at position 123"
  const m1 = msg.match(/position\s+(\d+)/i);
  if (m1) return parseInt(m1[1], 10);
  // Firefox: "JSON.parse: unexpected character at line 1 column 5 of the JSON data"
  const m2 = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  if (m2) {
    // no offset available, return null and we compute differently
    return null;
  }
  return null;
}

export function offsetToLineCol(
  input: string,
  offset: number | null
): { line: number | null; column: number | null } {
  if (offset === null || offset < 0) return { line: null, column: null };
  const slice = input.slice(0, offset);
  const lines = slice.split("\n");
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}

export function jsonErrorPositionToLineCol(
  input: string,
  err: unknown
): { line: number | null; column: number | null; position: number | null } {
  if (err instanceof SyntaxError) {
    const pos = extractPosition(err.message);
    if (pos !== null) {
      const lc = offsetToLineCol(input, pos);
      return { ...lc, position: pos };
    }
    // try parsing line/column from firefox
    const m = err.message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (m) return { line: parseInt(m[1], 10), column: parseInt(m[2], 10), position: null };
  }
  return { line: null, column: null, position: null };
}
