import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import CodecLabClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Codec Lab, Base64 URL HTML Entity JWT",
  description:
    "Encode decode Base64, Base64URL, URL, HTML Entity live dua arah. Unicode aman via TextEncoder.",
  alternates: { canonical: "/dev/codec-lab" },
  openGraph: {
    title: "Codec Lab",
    description: "Base64, Base64URL, URL, HTML Entity encode decode.",
    url: "https://gsg.id/dev/codec-lab",
  },
});

export default function Page() {
  return <CodecLabClient />;
}
