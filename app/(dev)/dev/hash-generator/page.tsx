import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import IdGeneratorClient from "../id-generator/client";

export const metadata: Metadata = buildMetadata({
  title: "Hash Generator, MD5 SHA1 SHA256 SHA512",
  description: "Generate hash MD5 SHA1 SHA256 SHA512 via Web Crypto, bandingkan hash.",
  alternates: { canonical: "/dev/hash-generator" },
  openGraph: {
    title: "Hash Generator",
    description: "Hash generator MD5 SHA256 via Web Crypto.",
    url: "https://gsgid.vercel.app/dev/hash-generator",
  },
});

export default function Page() {
  return <IdGeneratorClient />;
}
