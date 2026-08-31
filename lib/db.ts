import { openDB, type DBSchema, type IDBPDatabase } from "idb";

// honey: light tamper-evident wrapper, not security boundary — PEPPER is not secret,
// just detects casual F12/IndexedDB edits. No encryption, no auth, no DevTools blocking.
// Keeps backward compat with plain drafts (no _sig) — they pass through and migrate on next save.
const PEPPER = "gsg-id-pepper-v1"; // honey: not secret, just tamper-evident for casual edits
const MAX_DRAFT_SIZE = 500_000; // honey: chars of JSON.stringify; prevents quota blowout, ~500KB

async function computeSig(data: unknown, tool: string): Promise<string> {
  if (typeof window === "undefined" || !globalThis.crypto?.subtle) return "";
  const raw = JSON.stringify(data) + "|" + tool + "|" + PEPPER;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifySig(data: unknown, tool: string, sig: string): Promise<boolean> {
  if (!sig) return true; // empty sig from SSR fallback — treat as pass, will be re-signed on next save
  const expected = await computeSig(data, tool);
  if (!expected) return true; // subtle unavailable — don't block UX
  return expected === sig; // honey: simple === is fine; not a timing-sensitive secret
}

interface GSGDB extends DBSchema {
  drafts: {
    key: string;
    value: {
      id: string;
      tool: string;
      lorong: "umkm" | "karir" | "lobby";
      data: unknown;
      updatedAt: number;
      _sig?: string;
      _v?: number;
    };
    indexes: { "by-tool": string; "by-updated": number };
  };
  prefs: {
    key: string;
    value: unknown;
  };
}

let dbPromise: Promise<IDBPDatabase<GSGDB>> | null = null;

function getDB() {
  if (typeof window === "undefined") return null as unknown as Promise<IDBPDatabase<GSGDB>>;
  if (!dbPromise) {
    dbPromise = openDB<GSGDB>("gsg-id", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("drafts")) {
          const store = db.createObjectStore("drafts", { keyPath: "id" });
          store.createIndex("by-tool", "tool");
          store.createIndex("by-updated", "updatedAt");
        }
        if (!db.objectStoreNames.contains("prefs")) {
          db.createObjectStore("prefs");
        }
      },
    });
  }
  return dbPromise;
}

// generic draft helpers
export async function saveDraft<T>(
  id: string,
  tool: string,
  lorong: GSGDB["drafts"]["value"]["lorong"],
  data: T
) {
  const db = await getDB();
  if (!db) return;
  // honey: size guard avoids quota exceeded / large JSON DoS; throw so caller can show UX message
  const jsonLen = JSON.stringify(data).length;
  if (jsonLen > MAX_DRAFT_SIZE) {
    throw new Error(`[db] draft too large: ${jsonLen} > ${MAX_DRAFT_SIZE} chars`);
  }
  const _sig = await computeSig(data, tool);
  await db.put("drafts", { id, tool, lorong, data, updatedAt: Date.now(), _sig, _v: 1 });
}

export async function getDraft<T>(id: string): Promise<T | undefined> {
  const db = await getDB();
  if (!db) return undefined;
  const rec = await db.get("drafts", id);
  if (!rec) return undefined;
  // honey: verify only if _sig present; legacy plain drafts (no _sig) pass through for compat
  if (rec._sig !== undefined && rec._v !== undefined) {
    const ok = await verifySig(rec.data, rec.tool, rec._sig);
    if (!ok) {
      console.warn("[db] draft tampered, discarding", id);
      await db.delete("drafts", id);
      return undefined;
    }
  }
  return rec.data as T | undefined;
}

export async function deleteDraft(id: string) {
  const db = await getDB();
  if (!db) return;
  await db.delete("drafts", id);
}

export async function listDrafts(tool?: string) {
  const db = await getDB();
  if (!db) return [];
  const all = tool
    ? await db.getAllFromIndex("drafts", "by-tool", tool)
    : await db.getAll("drafts");
  // honey: silently drop tampered drafts; legacy without _sig kept as-is
  const out: typeof all = [];
  for (const rec of all) {
    if (rec._sig !== undefined) {
      const ok = await verifySig(rec.data, rec.tool, rec._sig);
      if (!ok) continue;
    }
    out.push(rec);
  }
  return out;
}

export async function clearOldDrafts(olderThanMs = 1000 * 60 * 60 * 24 * 30) {
  const db = await getDB();
  if (!db) return;
  const cutoff = Date.now() - olderThanMs;
  const tx = db.transaction("drafts", "readwrite");
  let cursor = await tx.store.openCursor();
  while (cursor) {
    if (cursor.value.updatedAt < cutoff) await cursor.delete();
    cursor = await cursor.continue();
  }
  await tx.done;
}

// prefs generic
export async function setPref(key: string, value: unknown) {
  const db = await getDB();
  if (!db) return;
  await db.put("prefs", value, key);
}

export async function getPref<T>(key: string): Promise<T | undefined> {
  const db = await getDB();
  if (!db) return undefined;
  return (await db.get("prefs", key)) as T | undefined;
}
