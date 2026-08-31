import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GSG ID - Gudang Serba Guna",
    short_name: "GSG ID",
    description:
      "Gudang tools gratis untuk UMKM, pejuang karir & developer Indonesia. 30+ tools tanpa login.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFCF8",
    theme_color: "#FDFCF8",
    icons: [
      {
        src: "/gsgid_minimal_transparent.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/gsgid_minimal_transparent.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
