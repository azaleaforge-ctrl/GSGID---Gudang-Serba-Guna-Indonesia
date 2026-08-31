import { ImageResponse } from "next/og";

export const alt = "Lorong UMKM — Hitung HPP, BEP, Invoice & Kwitansi";
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
        background: "#FFFBEB",
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ===== TOP 58% : FOTO / SHOWCASE UMKM ===== */}
      <div
        style={{
          height: "368px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFBEB",
          position: "relative",
          overflow: "hidden",
          padding: "26px 32px 22px",
          borderBottom: "2px solid #1C1917",
        }}
      >
        {/* warm decorative blobs */}
        <div
          style={{
            position: "absolute",
            width: "560px",
            height: "560px",
            borderRadius: "999px",
            background: "rgba(245,158,11,0.09)",
            left: "-140px",
            top: "-200px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "rgba(146,64,14,0.06)",
            right: "-80px",
            top: "-40px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "260px",
            height: "260px",
            borderRadius: "999px",
            border: "1px solid rgba(245,158,11,0.18)",
            right: "120px",
            bottom: "-70px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            borderRadius: "999px",
            background: "rgba(245,158,11,0.12)",
            left: "260px",
            bottom: "22px",
            display: "flex",
          }}
        />

        {/* eyebrow pill UMKM */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            border: "1px solid #FDE68A",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: 999, background: "#F59E0B", display: "flex" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.18em", fontWeight: 700, color: "#92400E" }}>
            LORONG UMKM
          </span>
          <span style={{ fontSize: 10, color: "#D6D3D1", marginLeft: 2 }}>—</span>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "#78716C" }}>LORONG 01 · TOKO & USAHA</span>
        </div>

        {/* HERO UMKM besar */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            marginTop: 16,
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 108, fontWeight: 900, letterSpacing: "-0.06em", color: "#1C1917", lineHeight: 0.9 }}>
            UMKM
          </span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.22em",
              fontWeight: 700,
              color: "#92400E",
              background: "white",
              border: "1px solid #FDE68A",
              borderRadius: 999,
              padding: "6px 12px",
            }}
          >
            HPP · BEP · INVOICE
          </span>
        </div>

        {/* deskripsi hero */}
        <span style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginTop: 8, letterSpacing: "-0.01em" }}>
          Hitung HPP, BEP, Invoice & Kwitansi — akurat, 1:1 preview PDF
        </span>

        {/* mini cards 3: HPP, BEP, Invoice */}
        <div style={{ display: "flex", gap: 10, marginTop: 18, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#1C1917",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid #1C1917",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#F59E0B" }}>Rp</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>HPP</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>Kalkulator HPP</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid #FDE68A",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#92400E" }}>BEP</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1C1917", marginTop: 2 }}>BEP</span>
            <span style={{ fontSize: 10, color: "#78716C", marginTop: 1 }}>Titik Impas</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid #FDE68A",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#F59E0B" }}>INV</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1C1917", marginTop: 2 }}>Invoice</span>
            <span style={{ fontSize: 10, color: "#78716C", marginTop: 1 }}>PDF 1:1 Preview</span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM 42% : TEKS + FOOTER ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "22px 40px 18px",
          background: "#FFFBEB",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#1C1917", lineHeight: 1 }}>
                GSG ID
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  color: "white",
                  background: "#92400E",
                  borderRadius: 999,
                  padding: "4px 10px",
                }}
              >
                LORONG UMKM
              </span>
              <div style={{ width: 28, height: 2, background: "#F59E0B", borderRadius: 999, marginLeft: 4, display: "flex" }} />
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#1C1917",
                lineHeight: 1.15,
                marginTop: 8,
              }}
            >
              Tools Jualan Praktis — Tanpa Ribet, Langsung Pakai
            </span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: "#57534E", marginTop: 4, maxWidth: 640 }}>
              Kalkulator HPP/BEP, cicilan & diskon — plus invoice & kwitansi siap cetak. Data di device.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
              minWidth: 220,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#1C1917",
                color: "white",
                borderRadius: 999,
                padding: "9px 16px",
                gap: 8,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: 999, background: "#F59E0B", display: "flex" }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em" }}>GRATIS</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>TANPA LOGIN</span>
            </div>
            <span style={{ fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: "#92400E" }}>
              UNTUK YANG JUALAN
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #FDE68A",
            paddingTop: 14,
            marginTop: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#92400E" }}>
              gsgid.vercel.app/umkm
            </span>
            <span style={{ fontSize: 11, color: "#D6D3D1" }}>·</span>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", color: "#78716C" }}>© 2026 GUDANG SERBA GUNA ID</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #FDE68A",
              borderRadius: 999,
              padding: "5px 10px",
              background: "white",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "#92400E" }}>HPP</span>
            <span style={{ fontSize: 10, color: "#D6D3D1" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#92400E" }}>BEP</span>
            <span style={{ fontSize: 10, color: "#D6D3D1" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#92400E" }}>INVOICE</span>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
