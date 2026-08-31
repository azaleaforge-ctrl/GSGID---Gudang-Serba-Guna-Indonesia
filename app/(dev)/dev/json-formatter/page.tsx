import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import JsonFormatterClient from "./client";

export const metadata: Metadata = buildMetadata({
  title: "JSON Formatter + Viewer, Format dan Validasi",
  description:
    "Format, minify, validasi JSON dengan error line number, tree view collapsible, copy. 100% client side.",
  alternates: { canonical: "/dev/json-formatter" },
  openGraph: {
    title: "JSON Formatter + Viewer",
    description: "Prettify, minify, validate JSON dengan pointer line.",
    url: "https://gsg.id/dev/json-formatter",
  },
});

export default function Page() {
  return <JsonFormatterClient />;
}
