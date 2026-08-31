import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const weekly = "weekly" as const;
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: weekly, priority: 1 },
    { url: `${base}/umkm`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${base}/umkm/kalkulator-hpp`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/umkm/kalkulator-bep`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/umkm/kalkulator-cicilan`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/umkm/kalkulator-diskon`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/umkm/generator-invoice`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/umkm/generator-kwitansi`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/karir`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${base}/karir/cv-ats`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/karir/surat-lamaran`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/karir/surat-resign`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/karir/paklaring`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/karir/perjanjian-kerja`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/karir/surat-pernyataan`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev`, lastModified: now, changeFrequency: weekly, priority: 0.9 },
    { url: `${base}/dev/json-formatter`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/jwt-decoder`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/jwt-debugger`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/hash-generator`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/base64-tool`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/regex-tester`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/cron-parser`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/id-generator`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/timestamp-cron`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
    { url: `${base}/dev/codec-lab`, lastModified: now, changeFrequency: weekly, priority: 0.8 },
  ];
}
