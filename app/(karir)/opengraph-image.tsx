import { ImageResponse } from "next/og";

export const alt = "Lorong Karir — CV ATS, Surat Lamaran & Paklaring";
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
        background: "#F8FAFC",
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ===== TOP 58% : SHOWCASE KARIR ===== */}
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
          padding: "26px 32px 22px",
        }}
      >
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
            border: "1px solid rgba(255,255,255,0.07)",
            right: "-40px",
            top: "-20px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "999px",
            background: "rgba(245,158,11,0.08)",
            right: "90px",
            bottom: "-40px",
            display: "flex",
          }}
        />
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

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: 999, background: "#F59E0B", display: "flex" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.18em", fontWeight: 700, color: "#FDE68A" }}>LORONG KARIR</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>—</span>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.6)" }}>
            LORONG 02 · CV & SURAT KERJA
          </span>
        </div>

        {/* hero KARIR */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 16, justifyContent: "center" }}>
          <span style={{ fontSize: 108, fontWeight: 900, letterSpacing: "-0.06em", color: "white", lineHeight: 0.9 }}>
            KARIR
          </span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.18em",
              fontWeight: 700,
              color: "#0F172A",
              background: "#F59E0B",
              borderRadius: 999,
              padding: "6px 12px",
            }}
          >
            CV ATS
          </span>
        </div>

        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.65)", marginTop: 8 }}>
          CV ATS, Surat Lamaran, Paklaring — EYD PUEBI, preview 1:1 PDF A4
        </span>

        {/* mini cards */}
        <div style={{ display: "flex", gap: 10, marginTop: 18, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid white",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#2563EB" }}>CV</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginTop: 2 }}>CV ATS</span>
            <span style={{ fontSize: 10, color: "#64748B", marginTop: 1 }}>Searchable PDF</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#FDE68A" }}>LAMARAN</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>Surat Lamaran</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>EYD PUEBI</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#FDE68A" }}>PK</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>Paklaring</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>Resmi & Rapi</span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM 42% ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "22px 40px 18px",
          background: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#0F172A", lineHeight: 1 }}>
                GSG ID
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  color: "white",
                  background: "#0F172A",
                  borderRadius: 999,
                  padding: "4px 10px",
                }}
              >
                LORONG KARIR
              </span>
              <div style={{ width: 28, height: 2, background: "#F59E0B", borderRadius: 999, marginLeft: 4, display: "flex" }} />
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0F172A",
                lineHeight: 1.15,
                marginTop: 8,
              }}
            >
              Tools Karir Profesional — Lolos ATS, Siap Interview
            </span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: "#475569", marginTop: 4, maxWidth: 640 }}>
              CV ATS searchable, surat lamaran EYD, resign & paklaring. Export PDF A4 presisi, data di device.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 220 }}>
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
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em" }}>GRATIS</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>TANPA LOGIN</span>
            </div>
            <span style={{ fontSize: 10, letterSpacing: "0.14em", fontWeight: 700, color: "#64748B" }}>
              UNTUK PEJUANG KARIR
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #E2E8F0",
            paddingTop: 14,
            marginTop: 14,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#0F172A" }}>
              gsgid.vercel.app/karir
            </span>
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>·</span>
            <span style={{ fontSize: 11, letterSpacing: "0.08em", color: "#64748B" }}>© 2026 GUDANG SERBA GUNA ID</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #E2E8F0",
              borderRadius: 999,
              padding: "5px 10px",
              background: "white",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>CV ATS</span>
            <span style={{ fontSize: 10, color: "#CBD5E1" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>LAMARAN</span>
            <span style={{ fontSize: 10, color: "#CBD5E1" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#0F172A" }}>PAKLARING</span>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
