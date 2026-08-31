import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import CodecLabClient from "../codec-lab/client";

export const metadata: Metadata = buildMetadata({
  title: "Base64 Tool, Encode Decode Teks",
  description: "Encode decode Base64 dan Base64URL dengan Unicode aman.",
  alternates: { canonical: "/dev/base64-tool" },
  openGraph: {
    title: "Base64 Tool",
    description: "Base64 encode decode teks dan file.",
    url: "https://gsgid.vercel.app/dev/base64-tool",
  },
});

export default function Page() {
  return <CodecLabClient />;
}
