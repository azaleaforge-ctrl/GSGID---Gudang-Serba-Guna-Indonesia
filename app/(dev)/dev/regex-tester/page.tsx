import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import RegexTesterClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Regex Tester, Live Match dan Replace",
  description:
    "Test regex dengan flag g,i,m,s,u,y, highlight live, lihat groups dan replace preview. Cheat sheet Indonesia.",
  alternates: { canonical: "/dev/regex-tester" },
  openGraph: {
    title: "Regex Tester",
    description: "Live regex highlight, match groups, replace preview.",
    url: "https://gsgid.vercel.app/dev/regex-tester",
  },
});

export default function Page() {
  return <RegexTesterClient />;
}
