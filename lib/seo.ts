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
  ],
  ogImageAlt: "GUDANG SERBA GUNA ID: Tools Gratis untuk UMKM dan Karir",
};

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
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
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: ["/opengraph-image"],
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
    category: "productivity",
    ...overrides,
  };
}
