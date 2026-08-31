import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import IdGeneratorClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "ID Generator, UUID Hash Password",
  description:
    "Generate UUID v4, hash MD5 SHA1 SHA256 SHA512 via Web Crypto, dan password aman. Hex output benar.",
  alternates: { canonical: "/dev/id-generator" },
  openGraph: {
    title: "ID Generator",
    description: "UUID v4, hash, password generator dengan Web Crypto.",
    url: "https://gsg.id/dev/id-generator",
  },
});

export default function Page() {
  return <IdGeneratorClient />;
}
