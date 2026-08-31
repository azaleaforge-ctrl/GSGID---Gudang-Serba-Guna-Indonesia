import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import JwtDecoderClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "JWT Decoder, Decode Header Payload Exp WIB",
  description:
    "Decode JWT base64url, lihat header payload, exp ke WIB, bedakan HS256 dan RS256. Client side, aman.",
  alternates: { canonical: "/dev/jwt-decoder" },
  openGraph: {
    title: "JWT Decoder",
    description: "Decode JWT, cek exp, iat, alg tanpa kirim data.",
    url: "https://gsg.id/dev/jwt-decoder",
  },
});

export default function Page() {
  return <JwtDecoderClient />;
}
