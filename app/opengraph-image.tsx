import { ImageResponse } from "next/og";

// Next 16: edge runtime deprecated — default (nodejs) statically optimizes this route
// honey: keeps opengraph-image cacheable; revalidate if branding changes
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
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ===== TOP 58% : FOTO / LOGO DOMINAN ===== */}
      <div
        style={{
          height: "368px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          position: "relative",
          overflow: "hidden",
          padding: "28px 32px 26px",
        }}
      >
        {/* decorative blobs - satori-safe absolute */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.04)",
            left: "-120px",
            top: "-180px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.08)",
            right: "-60px",
            top: "14px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "999px",
            background: "rgba(253,230,138,0.08)",
            right: "88px",
            bottom: "-46px",
            display: "flex",
          }}
        />
        {/* subtle grid line */}
        <div
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />

        {/* eyebrow pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#FDE68A",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              fontWeight: 700,
              color: "#FDE68A",
            }}
          >
            GSG ID · GUDANG SERBA GUNA
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>—</span>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)" }}>
            1 DOMAIN · 2 LORONG · 30+ TOOLS
          </span>
        </div>

        {/* BIG LOGO - centered, jelas saat share */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginTop: 18,
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 112,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              color: "#FFFFFF",
              lineHeight: 0.9,
            }}
          >
            GSG
          </span>
          <span
            style={{
              fontSize: 112,
              fontWeight: 900,
              letterSpacing: "-0.06em",
              color: "rgba(255,255,255,0.14)",
              lineHeight: 0.9,
            }}
          >
            ID
          </span>
        </div>

        {/* gold underline + lorong chips */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 10,
          }}
        >
          <div style={{ width: 44, height: 3, borderRadius: 999, background: "#F59E0B", display: "flex" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.2em", fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
            UMKM · KARIR · DEV
          </span>
          <div style={{ width: 44, height: 3, borderRadius: 999, background: "#F59E0B", display: "flex" }} />
        </div>

        {/* abstract preview - 3 mini cards hint foto/tools */}
        <div style={{ display: "flex", gap: 10, marginTop: 20, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#FFFBEB",
              borderRadius: 14,
              padding: "10px 14px",
              minWidth: 146,
              border: "1px solid #FDE68A",
            }}
          >
            <span style={{ fontSize: 8, letterSpacing: "0.16em", color: "#D97706", fontWeight: 700 }}>
              LORONG 01
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1C1917", marginTop: 2 }}>UMKM</span>
            <span style={{ fontSize: 10, color: "#78716C", marginTop: 1 }}>HPP · Invoice · QR</span>
          </div>
          <div
            style={{
              width: 34,
              height: 1,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              borderRadius: 14,
              padding: "10px 14px",
              minWidth: 146,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span style={{ fontSize: 8, letterSpacing: "0.16em", color: "#2563EB", fontWeight: 700 }}>
              LORONG 02
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginTop: 2 }}>KARIR</span>
            <span style={{ fontSize: 10, color: "#64748B", marginTop: 1 }}>CV ATS · Interview</span>
          </div>
          <div
            style={{
              width: 34,
              height: 1,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "10px 14px",
              minWidth: 132,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span style={{ fontSize: 8, letterSpacing: "0.16em", color: "#FDE68A", fontWeight: 700 }}>
              LORONG 03
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>DEV</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 1 }}>JSON · Regex · Tools</span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM 42% : TEXT HIERARKI ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "22px 40px 18px",
          background: "#FDFCF8",
        }}
      >
        {/* upper text block */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
          {/* left - main copy */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  color: "#0F172A",
                  lineHeight: 1,
                }}
              >
                GSG ID
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  fontWeight: 700,
                  color: "#78716C",
                  marginLeft: 4,
                }}
              >
                GUDANG SERBA GUNA
              </span>
              <div
                style={{
                  width: 28,
                  height: 2,
                  background: "#F59E0B",
                  borderRadius: 999,
                  marginLeft: 6,
                  display: "flex",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "#1C1917",
                  lineHeight: 1.15,
                }}
              >
                Gudang Serba Guna — Tools UMKM, Karir & Developer
              </span>
              <span
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "#57534E",
                  marginTop: 4,
                  maxWidth: 720,
                }}
              >
                Satu domain untuk kerja nyata. Hitung HPP, bikin invoice & QR — atau tulis CV ATS dan latihan
                interview. Semua jalan tanpa login.
              </span>
            </div>
          </div>

          {/* right - domain & badge */}
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
                background: "#0F172A",
                color: "white",
                borderRadius: 999,
                padding: "9px 16px",
                gap: 8,
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: 999, background: "#22C55E", display: "flex" }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em" }}>30+ TOOLS GRATIS</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>TANPA LOGIN</span>
            </div>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                fontWeight: 700,
                color: "#78716C",
              }}
            >
              TANPA PAYWALL · LANGSUNG PAKAI
            </span>
          </div>
        </div>

        {/* footer line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E7E5E4",
            paddingTop: 14,
            marginTop: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "#0F172A",
              }}
            >
              gsgid.vercel.app
            </span>
            <span style={{ fontSize: 11, color: "#A8A29E" }}>·</span>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", color: "#78716C" }}>© 2026 GUDANG SERBA GUNA ID</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "#A8A29E", fontWeight: 600 }}>
              GRATIS SELAMANYA
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #E7E5E4",
                borderRadius: 999,
                padding: "5px 10px",
                background: "white",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>UMKM</span>
              <span style={{ fontSize: 10, color: "#D6D3D1" }}>|</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>KARIR</span>
              <span style={{ fontSize: 10, color: "#D6D3D1" }}>|</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>DEV</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
