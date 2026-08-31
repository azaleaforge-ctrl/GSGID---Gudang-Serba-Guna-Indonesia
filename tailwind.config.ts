import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        lobby: {
          bg: "var(--lobby-bg)",
          fg: "var(--lobby-fg)",
          muted: "var(--lobby-muted)",
          border: "var(--lobby-border)",
          accent: "var(--lobby-accent)",
        },
        umkm: {
          cream: "#FFFBEB",
          orange: "#EA580C",
          ink: "#1C1917",
          amber: "#F59E0B",
        },
        karir: {
          navy: "#0F172A",
          blue: "#2563EB",
          slt: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
export default config;
