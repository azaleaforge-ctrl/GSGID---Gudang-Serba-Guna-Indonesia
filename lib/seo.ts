import type { Metadata } from "next";

export const siteConfig = {
  name: "GUDANG SERBA GUNA ID",
  shortName: "GSG ID",
  domain: "gsg.id",
  url: "https://gsg.id",
  title: "GUDANG SERBA GUNA ID: Tools Gratis UMKM dan Karir",
  description:
    "Gudang tools gratis untuk UMKM dan pejuang karir Indonesia. Hitung HPP, buat invoice, generate CV ATS, cek gaji, dan puluhan tools lain, tanpa login, tanpa paywall.",
  keywords: [
    "tools umkm gratis",
    "kalkulator hpp",
    "invoice umkm",
    "cv ats gratis",
    "surat lamaran",
    "cek gaji",
    "gsg id",
    "gudang serba guna",
    "tools gratis indonesia",
    "kalkulator umkm",
    "kalkulator bep",
    "kwitansi online",
    "generator invoice",
    "tools developer gratis",
    "json formatter",
    "jwt decoder",
    "hash generator",
    "base64 tool",
  ],
  ogImage: "https://gsg.id/opengraph-image",
  ogImageAlt: "GUDANG SERBA GUNA ID: Tools Gratis untuk UMKM dan Karir",
  twitterHandle: "@gsg_id",
};

const DEFAULT_OG_IMAGE = {
  url: `${siteConfig.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: siteConfig.ogImageAlt,
  type: "image/png" as const,
};

const DEFAULT_TWITTER_IMAGE = `${siteConfig.url}/opengraph-image`;

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const defaults: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "productivity",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/gsgid_minimal_transparent.png", type: "image/png" },
        { url: "/favicon.ico", type: "image/x-icon" },
      ],
      shortcut: "/gsgid_minimal_transparent.png",
      apple: "/gsgid_minimal_transparent.png",
    },
    verification: {
      // honey: add google-site-verification when ready
      google: undefined,
    },
  };

  if (!overrides) return defaults;

  // Deep-merge openGraph / twitter / alternates so per-page overrides don't wipe images
  const { openGraph: ogOverride, twitter: twOverride, alternates: altOverride, ...rest } = overrides;

  return {
    ...defaults,
    ...rest,
    alternates: altOverride ? { ...defaults.alternates, ...altOverride } : defaults.alternates,
    openGraph: ogOverride
      ? {
          ...(defaults.openGraph as Record<string, unknown>),
          ...(ogOverride as Record<string, unknown>),
          images:
            (ogOverride as { images?: unknown }).images ?? (defaults.openGraph as { images?: unknown }).images,
          url: (ogOverride as { url?: string }).url ?? (defaults.openGraph as { url?: string }).url,
        } as Metadata["openGraph"]
      : defaults.openGraph,
    twitter: twOverride
      ? {
          ...(defaults.twitter as Record<string, unknown>),
          ...(twOverride as Record<string, unknown>),
          images:
            (twOverride as { images?: unknown }).images ?? (defaults.twitter as { images?: unknown }).images,
        } as Metadata["twitter"]
      : defaults.twitter,
  };
}
