import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GUDANG SERBA GUNA ID, Tools Gratis UMKM & Karir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        background: "#FDFCF8",
        padding: "48px",
        fontFamily: "sans-serif",
      }}
    >
      {/* top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          letterSpacing: "0.18em",
          color: "#6B6B63",
          borderBottom: "1px solid #E8E6E1",
          paddingBottom: 16,
        }}
      >
        <span>GSG.ID, 1 DOMAIN · 2 LORONG · 30+ TOOLS</span>
        <span>TANPA LOGIN · GRATIS</span>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 24, paddingTop: 32 }}>
        <div
          style={{ flex: 1.1, display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.05em", color: "#0A0A0A" }}
            >
              GSG
            </span>
            <span
              style={
                {
                  fontSize: 56,
                  fontWeight: 900,
                  color: "transparent",
                  WebkitTextStroke: "1.6px #0A0A0A",
                } as unknown as Record<string, string>
              }
            >
              ID
            </span>
            <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "#6B6B63", marginLeft: 8 }}>
              GUDANG SERBA GUNA
            </span>
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "#0A0A0A",
              marginTop: 12,
            }}
          >
            Gudang serba guna
            <br />
            <span style={{ fontWeight: 300, fontStyle: "italic" }}>untuk kerja nyata.</span>
          </div>
          <div
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "#3A3A36",
              marginTop: 16,
              maxWidth: 520,
            }}
          >
            Satu domain, dua lorong. UMKM untuk yang jualan, Karir untuk yang melamar. Tanpa login,
            tanpa paywall.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <div
              style={{
                background: "#0A0A0A",
                color: "white",
                borderRadius: 999,
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Masuk UMKM ↗
            </div>
            <div
              style={{
                background: "white",
                color: "#0A0A0A",
                border: "1px solid #0A0A0A",
                borderRadius: 999,
                padding: "10px 18px",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Masuk Karir ↗
            </div>
          </div>
        </div>

        <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: 20,
              padding: 20,
              flex: 1,
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#EA580C" }}>
              LORONG 01, UMKM
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#1C1917", marginTop: 6 }}>
              Buat jualan jalan.
            </div>
            <div style={{ fontSize: 12, color: "#57534E", marginTop: 6 }}>
              HPP · Invoice · QR · Margin · Stok
            </div>
          </div>
          <div
            style={{
              background: "#0F172A",
              borderRadius: 20,
              padding: 20,
              flex: 1,
              color: "white",
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#60A5FA" }}>
              LORONG 02, KARIR
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
              Biar lamaran dipanggil.
            </div>
            <div style={{ fontSize: 12, color: "#CBD5E1", marginTop: 6 }}>
              CV ATS · Lamaran · Gaji · Interview
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "#78716C",
          borderTop: "1px solid #E8E6E1",
          paddingTop: 14,
          marginTop: 12,
        }}
      >
        <span>© 2026 GUDANG SERBA GUNA ID</span>
        <span>gsg.id, gratis selamanya</span>
      </div>
    </div>,
    { ...size }
  );
}
