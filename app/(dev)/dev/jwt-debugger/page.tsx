import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import JwtDecoderClient from "../jwt-decoder/client";

export const metadata: Metadata = buildMetadata({
  title: "JWT Debugger, Decode dan Verify Info",
  description: "Decode JWT header payload, lihat exp WIB, pahami HS256 vs RS256. Client side.",
  alternates: { canonical: "/dev/jwt-debugger" },
  openGraph: {
    title: "JWT Debugger",
    description: "Decode JWT header payload dan cek exp.",
    url: "https://gsgid.vercel.app/dev/jwt-debugger",
  },
});

export default function Page() {
  return <JwtDecoderClient />;
}
