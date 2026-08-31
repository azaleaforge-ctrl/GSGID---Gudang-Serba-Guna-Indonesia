import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import TimestampCronClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "Timestamp dan Cron, Unix WIB dan Next Runs",
  description:
    "Konversi Unix detik dan ms ke WIB WITA WIT live, jelaskan cron Bahasa Indonesia dan hitung 5 run berikutnya.",
  alternates: { canonical: "/dev/timestamp-cron" },
  openGraph: {
    title: "Timestamp dan Cron",
    description: "Unix ke WIB WITA WIT dan cron explainer Bahasa Indonesia.",
    url: "https://gsgid.vercel.app/dev/timestamp-cron",
  },
});

export default function Page() {
  return <TimestampCronClient />;
}
