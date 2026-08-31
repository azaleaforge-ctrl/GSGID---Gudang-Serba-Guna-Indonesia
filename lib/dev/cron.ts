export type CronField = { raw: string; values: number[]; min: number; max: number };
export type CronParseResult = {
  valid: boolean;
  error: string | null;
  fields: {
    minute: CronField;
    hour: CronField;
    dom: CronField;
    month: CronField;
    dow: CronField;
  } | null;
  description: string;
};

function parseField(raw: string, min: number, max: number): number[] {
  const vals = new Set<number>();
  const parts = raw.split(",");
  for (const part of parts) {
    if (part === "*") {
      for (let i = min; i <= max; i++) vals.add(i);
    } else if (part.includes("/")) {
      const [base, stepStr] = part.split("/");
      const step = parseInt(stepStr, 10);
      if (isNaN(step) || step <= 0) throw new Error(`Step tidak valid di ${part}`);
      let start = min;
      let end = max;
      if (base !== "*") {
        if (base.includes("-")) {
          const [a, b] = base.split("-").map((n) => parseInt(n, 10));
          start = a;
          end = b;
        } else {
          start = parseInt(base, 10);
        }
      }
      for (let i = start; i <= end; i += step) vals.add(i);
    } else if (part.includes("-")) {
      const [a, b] = part.split("-").map((n) => parseInt(n, 10));
      if (isNaN(a) || isNaN(b) || a < min || b > max || a > b)
        throw new Error(`Range tidak valid ${part}`);
      for (let i = a; i <= b; i++) vals.add(i);
    } else {
      const v = parseInt(part, 10);
      if (isNaN(v) || v < min || v > max) throw new Error(`Nilai ${part} di luar ${min}-${max}`);
      vals.add(v);
    }
  }
  return [...vals].sort((a, b) => a - b);
}

export function parseCron(expr: string): CronParseResult {
  const raw = expr.trim();
  const parts = raw.split(/\s+/);
  if (parts.length !== 5) {
    return {
      valid: false,
      error: "Cron harus 5 field: menit jam tanggal bulan hari (contoh: * * * * *)",
      fields: null,
      description: "",
    };
  }
  try {
    const minute = { raw: parts[0], values: parseField(parts[0], 0, 59), min: 0, max: 59 };
    const hour = { raw: parts[1], values: parseField(parts[1], 0, 23), min: 0, max: 23 };
    const dom = { raw: parts[2], values: parseField(parts[2], 1, 31), min: 1, max: 31 };
    const month = { raw: parts[3], values: parseField(parts[3], 1, 12), min: 1, max: 12 };
    const dow = { raw: parts[4], values: parseField(parts[4], 0, 7), min: 0, max: 7 };
    // normalize dow 7 => 0
    if (dow.values.includes(7) && !dow.values.includes(0))
      dow.values = [...dow.values.filter((v) => v !== 7), 0].sort((a, b) => a - b);
    if (dow.values.includes(7) && dow.values.includes(0))
      dow.values = dow.values.filter((v) => v !== 7);
    const desc = describeCron({ minute, hour, dom, month, dow });
    return {
      valid: true,
      error: null,
      fields: { minute, hour, dom, month, dow },
      description: desc,
    };
  } catch (e) {
    return { valid: false, error: (e as Error).message, fields: null, description: "" };
  }
}

function describeCron(f: {
  minute: CronField;
  hour: CronField;
  dom: CronField;
  month: CronField;
  dow: CronField;
}): string {
  const m = f.minute.raw;
  const h = f.hour.raw;
  const dom = f.dom.raw;
  const mon = f.month.raw;
  const dow = f.dow.raw;

  if (m === "*" && h === "*" && dom === "*" && mon === "*" && dow === "*") return "Setiap menit";
  if (m.startsWith("*/") && h === "*" && dom === "*" && mon === "*" && dow === "*") {
    const n = m.slice(2);
    return `Setiap ${n} menit`;
  }
  if (m === "0" && h === "*" && dom === "*" && mon === "*" && dow === "*")
    return "Setiap jam tepat menit 0";
  if (mon === "*" && dom === "*" && dow === "*") {
    if (m !== "*" && h !== "*") {
      // specific time daily
      if (
        !m.includes(",") &&
        !m.includes("/") &&
        !m.includes("-") &&
        !h.includes(",") &&
        !h.includes("/") &&
        !h.includes("-")
      ) {
        return `Setiap hari jam ${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
      }
      return `Setiap hari pada jam ${h} menit ${m}`;
    }
    if (m !== "*" && h === "*") return `Setiap jam pada menit ${m}`;
  }
  // weekly
  if (dow !== "*" && m !== "*" && h !== "*") {
    const days: Record<string, string> = {
      "0": "Minggu",
      "1": "Senin",
      "2": "Selasa",
      "3": "Rabu",
      "4": "Kamis",
      "5": "Jumat",
      "6": "Sabtu",
      "7": "Minggu",
    };
    let dayName = dow;
    if (dow in days) dayName = days[dow];
    else if (!dow.includes(",") && !dow.includes("/") && !dow.includes("-"))
      dayName = days[dow] || dow;
    else dayName = `hari ${dow}`;
    return `Setiap ${dayName} jam ${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  }
  // monthly
  if (dom !== "*" && m !== "*" && h !== "*") {
    return `Setiap tanggal ${dom} jam ${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  }
  return `Cron ${m} ${h} ${dom} ${mon} ${dow}: menit ${m}, jam ${h}, tanggal ${dom}, bulan ${mon}, hari ${dow}`;
}

export function nextCronRuns(expr: string, count = 5, from: Date = new Date()): Date[] {
  const parsed = parseCron(expr);
  if (!parsed.valid || !parsed.fields) return [];
  const { minute, hour, dom, month, dow } = parsed.fields;
  const out: Date[] = [];
  // brute force minute by minute up to 1 year ~525k iterations max, for 5 runs will be far less
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);
  let guard = 0;
  while (out.length < count && guard < 525600 * 2) {
    guard++;
    const min = cursor.getMinutes();
    const hr = cursor.getHours();
    const d = cursor.getDate();
    const mo = cursor.getMonth() + 1;
    const dw = cursor.getDay();
    const matchMin = minute.values.includes(min);
    const matchHr = hour.values.includes(hr);
    const matchDom = dom.values.includes(d);
    const matchMon = month.values.includes(mo);
    // dow: 0 and 7 are Sunday
    const matchDow = dow.values.includes(dw) || (dw === 0 && dow.values.includes(7));
    // cron dom/dow is OR when both are restricted? Simplified: require both if not *
    const domMatch = dom.raw === "*" ? true : matchDom;
    const dowMatch = dow.raw === "*" ? true : matchDow;
    let dayMatch: boolean;
    if (dom.raw === "*" && dow.raw === "*") dayMatch = true;
    else if (dom.raw === "*") dayMatch = dowMatch;
    else if (dow.raw === "*") dayMatch = domMatch;
    else dayMatch = domMatch || dowMatch;
    if (matchMin && matchHr && matchMon && dayMatch) {
      out.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return out;
}

export function formatWIB(date: Date, tz: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: tz,
  }).format(date);
}
