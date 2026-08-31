/**
 * Lorong UMKM — pure calc functions. Accurate formulas, no side effects.
 * All currency in IDR (number). No formatting here.
 * Edge: sanitize NaN/negative/0 at callsite; functions clamp sensibly.
 */

// ---- helpers ----
function toNum(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function clampNonNeg(n: number): number {
  return n < 0 || !Number.isFinite(n) ? 0 : n;
}

// ============ HPP ============
/** HPP per unit = (bahan + tenaga + overhead) / porsi */
export function calcHPP(input: {
  bahan: number;
  tenaga: number;
  overhead: number;
  porsi: number; // divisor, min 1
  marginPercent: number; // e.g. 30 = 30%
}): {
  totalBiaya: number;
  hppPerPorsi: number;
  marginRp: number;
  hargaJual: number;
  profit: number;
} {
  const bahan = clampNonNeg(toNum(input.bahan));
  const tenaga = clampNonNeg(toNum(input.tenaga));
  const overhead = clampNonNeg(toNum(input.overhead));
  let porsi = Math.floor(clampNonNeg(toNum(input.porsi, 1)));
  if (porsi < 1) porsi = 1;
  const marginPercent = clampNonNeg(toNum(input.marginPercent));

  const totalBiaya = bahan + tenaga + overhead;
  const hppPerPorsi = totalBiaya / porsi;
  const marginRp = hppPerPorsi * (marginPercent / 100);
  const hargaJual = hppPerPorsi + marginRp; // saran
  const profit = marginRp; // per porsi
  return { totalBiaya, hppPerPorsi, marginRp, hargaJual, profit };
}

// ============ BEP ============
export function calcBEP(input: {
  fixedCost: number;
  pricePerUnit: number;
  variablePerUnit: number;
}): {
  bepUnit: number; // ceil
  bepRupiah: number;
  contributionMargin: number;
  valid: boolean;
  reason?: string;
} {
  const fixed = clampNonNeg(toNum(input.fixedCost));
  const price = clampNonNeg(toNum(input.pricePerUnit));
  const variable = clampNonNeg(toNum(input.variablePerUnit));
  const cm = price - variable;
  if (cm <= 0) {
    return {
      bepUnit: Infinity,
      bepRupiah: Infinity,
      contributionMargin: cm,
      valid: false,
      reason: price <= variable ? "Harga harus > biaya variabel" : "Margin kontribusi ≤ 0",
    };
  }
  const bepUnit = Math.ceil(fixed / cm);
  const bepRupiah = bepUnit * price; // bulatkan ke unit ceil * price (akurasi praktis UMKM)
  // alternatif exact: fixed/cm*price = same, but ceil aligns with unit must be integer
  return { bepUnit, bepRupiah, contributionMargin: cm, valid: true };
}

// ============ CICILAN ============
export type CicilanRow = {
  bulan: number;
  angsuran: number;
  bunga: number;
  pokok: number;
  sisa: number;
};

/** Flat: bunga = pokok * rate% * tenor (rate monthly %). Angsuran flat tiap bulan. */
export function calcCicilanFlat(input: {
  pokok: number;
  bungaPercentPerMonth: number;
  tenor: number; // bulan
}): { angsuran: number; totalBunga: number; totalBayar: number; rows: CicilanRow[] } {
  const pokok = clampNonNeg(toNum(input.pokok));
  let tenor = Math.floor(clampNonNeg(toNum(input.tenor)));
  if (tenor < 1) tenor = 1;
  const rate = clampNonNeg(toNum(input.bungaPercentPerMonth)) / 100;

  const totalBunga = pokok * rate * tenor;
  const totalBayar = pokok + totalBunga;
  const angsuran = totalBayar / tenor;
  const bungaPerBulan = pokok * rate;
  const pokokPerBulan = pokok / tenor;

  const rows: CicilanRow[] = [];
  let sisa = pokok;
  for (let i = 1; i <= tenor; i++) {
    const pokokCicil = i === tenor ? sisa : pokokPerBulan;
    const bunga = bungaPerBulan;
    sisa = Math.max(0, sisa - pokokCicil);
    rows.push({
      bulan: i,
      angsuran: Math.round(angsuran),
      bunga: Math.round(bunga),
      pokok: Math.round(pokokCicil),
      sisa: Math.round(sisa),
    });
  }
  return {
    angsuran: Math.round(angsuran),
    totalBunga: Math.round(totalBunga),
    totalBayar: Math.round(totalBayar),
    rows,
  };
}

/** Efektif anuitas OJK: angsuran = P * r * (1+r)^n / ((1+r)^n -1) */
export function calcCicilanEfektif(input: {
  pokok: number;
  bungaPercentPerMonth: number;
  tenor: number;
}): { angsuran: number; totalBunga: number; totalBayar: number; rows: CicilanRow[] } {
  const pokok = clampNonNeg(toNum(input.pokok));
  let tenor = Math.floor(clampNonNeg(toNum(input.tenor)));
  if (tenor < 1) tenor = 1;
  const rate = clampNonNeg(toNum(input.bungaPercentPerMonth)) / 100;

  if (rate === 0) {
    const angs = pokok / tenor;
    const rows: CicilanRow[] = [];
    let sisa = pokok;
    for (let i = 1; i <= tenor; i++) {
      const pokokCicil = i === tenor ? sisa : angs;
      sisa = Math.max(0, sisa - pokokCicil);
      rows.push({
        bulan: i,
        angsuran: Math.round(angs),
        bunga: 0,
        pokok: Math.round(pokokCicil),
        sisa: Math.round(sisa),
      });
    }
    return { angsuran: Math.round(angs), totalBunga: 0, totalBayar: Math.round(pokok), rows };
  }

  const pow = Math.pow(1 + rate, tenor);
  const angsuranExact = (pokok * rate * pow) / (pow - 1);
  const angsuran = Math.round(angsuranExact);

  const rows: CicilanRow[] = [];
  let sisa = pokok;
  let totalBunga = 0;
  for (let i = 1; i <= tenor; i++) {
    const bungaExact = sisa * rate;
    const bunga = Math.round(bungaExact);
    let pokokCicil = angsuran - bunga;
    // last month adjust sisa
    if (i === tenor) pokokCicil = sisa;
    if (pokokCicil < 0) pokokCicil = 0;
    if (pokokCicil > sisa) pokokCicil = sisa;
    sisa = Math.max(0, sisa - pokokCicil);
    totalBunga += bunga;
    const angsThis = i === tenor ? pokokCicil + bunga : angsuran;
    rows.push({
      bulan: i,
      angsuran: Math.round(angsThis),
      bunga,
      pokok: Math.round(pokokCicil),
      sisa: Math.round(sisa),
    });
  }
  const totalBayar = pokok + totalBunga;
  return { angsuran, totalBunga: Math.round(totalBunga), totalBayar: Math.round(totalBayar), rows };
}

// ============ DISKON ============
export function calcDiskon(input: {
  hargaAwal: number;
  diskonPersen: number[]; // bertingkat, applied sequentially
  diskonRp?: number; // potongan nominal setelah persen
  qty?: number; // bundling qty
  bundling?: { beli: number; gratis: number }; // e.g. beli 2 gratis 1
}): {
  hargaCoret: number;
  hargaSetelahDiskon: number;
  hargaSatuanEfektif: number;
  hematRp: number;
  hematPersen: number;
  qtyBayar: number;
  qtyTotal: number;
} {
  const hargaAwal = clampNonNeg(toNum(input.hargaAwal));
  const qty = Math.max(1, Math.floor(clampNonNeg(toNum(input.qty, 1))));
  const diskonRp = clampNonNeg(toNum(input.diskonRp, 0));

  let harga = hargaAwal;
  for (const p of input.diskonPersen ?? []) {
    const pct = Math.min(100, Math.max(0, toNum(p)));
    harga = harga * (1 - pct / 100);
  }
  harga = Math.max(0, harga - diskonRp);

  // bundling: bayar X dapat Y total
  let qtyBayar = qty;
  let qtyTotal = qty;
  if (input.bundling && input.bundling.beli > 0 && input.bundling.gratis >= 0) {
    const beli = Math.floor(input.bundling.beli);
    const gratis = Math.floor(input.bundling.gratis);
    const paket = beli + gratis;
    const paketCount = Math.floor(qty / paket);
    const sisa = qty % paket;
    // if qty = total items wanted, bayar = paketCount*beli + min(sisa,beli)
    qtyBayar = paketCount * beli + Math.min(sisa, beli);
    qtyTotal = qty;
    // harga satuan efektif = (qtyBayar*harga)/qtyTotal
  }

  const totalBayar = qtyBayar * harga;
  const hargaSatuanEfektif = totalBayar / qtyTotal;
  const hematRp = hargaAwal * qtyTotal - totalBayar;
  const hematPersen = hargaAwal > 0 ? (hematRp / (hargaAwal * qtyTotal)) * 100 : 0;

  return {
    hargaCoret: hargaAwal,
    hargaSetelahDiskon: Math.round(harga),
    hargaSatuanEfektif: Math.round(hargaSatuanEfektif),
    hematRp: Math.round(Math.max(0, hematRp)),
    hematPersen: Math.round(hematPersen * 10) / 10,
    qtyBayar,
    qtyTotal,
  };
}

// ============ INVOICE/KWITANSI helpers ============
export type InvoiceItem = { name: string; qty: number; price: number };

export function calcInvoiceTotal(
  items: InvoiceItem[],
  diskonRp: number,
  pajakPersen: number,
  ongkir: number
) {
  const subtotal = items.reduce((a, b) => a + clampNonNeg(b.qty) * clampNonNeg(b.price), 0);
  const diskon = Math.min(subtotal, clampNonNeg(diskonRp));
  const dpp = subtotal - diskon;
  const pajak = Math.round(dpp * (clampNonNeg(pajakPersen) / 100));
  const ship = clampNonNeg(ongkir);
  const total = dpp + pajak + ship;
  return { subtotal, diskon, dpp, pajak, ongkir: ship, total };
}

export function formatIDR(n: number): string {
  return new Intl.NumberFormat("id-ID").format(Math.round(n));
}

// quick sanity (can be run manually)
// calcHPP({bahan:50000,tenaga:20000,overhead:10000,porsi:10,marginPercent:30}) -> hpp 8000, harga 10400
// calcBEP({fixedCost:1000000,pricePerUnit:20000,variablePerUnit:12000}) -> 125 unit, 2.500.000
// calcCicilanEfektif({pokok:10_000_000,bungaPercentPerMonth:1,tenor:12}) -> ~888k angsuran
