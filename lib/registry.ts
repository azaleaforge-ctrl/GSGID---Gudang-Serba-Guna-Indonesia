export const lorongs = [
  { id: "umkm", label: "UMKM", path: "/umkm", tools: 6 },
  { id: "karir", label: "KARIR", path: "/karir", tools: 6 },
  { id: "dev", label: "DEV", path: "/dev", tools: 6 },
] as const;

export const lorongCount = lorongs.length;
export const totalTools = lorongs.reduce((a, l) => a + l.tools, 0);

// single source for Stats & sitemap
export const siteStats = {
  tools: totalTools,
  lorongs: lorongCount,
};
