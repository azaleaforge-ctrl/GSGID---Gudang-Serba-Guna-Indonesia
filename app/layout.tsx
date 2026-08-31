import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { LenisProvider } from "@/components/ui/LenisProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFCF8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = organizationJsonLd();
  const siteLd = websiteJsonLd();
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--lobby-bg)] text-[var(--lobby-fg)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
