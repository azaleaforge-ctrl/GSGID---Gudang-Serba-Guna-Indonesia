import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import TimestampCronClient from "../timestamp-cron/client";

export const metadata: Metadata = buildMetadata({
  title: "Cron Parser, Jelaskan Cron Bahasa Indonesia",
  description: "Jelaskan cron * * * * * ke Bahasa Indonesia dan hitung next run.",
  alternates: { canonical: "/dev/cron-parser" },
  openGraph: {
    title: "Cron Parser",
    description: "Cron explainer Bahasa Indonesia dan next run.",
    url: "https://gsgid.vercel.app/dev/cron-parser",
  },
});

export default function Page() {
  return <TimestampCronClient />;
}
