import { ImageResponse } from "next/og";

export const alt = "Lorong DEV — JSON Formatter, JWT Decoder & Regex Tester";
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
        background: "#020617",
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ===== TOP 58% : SHOWCASE DEV ===== */}
      <div
        style={{
          height: "368px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          position: "relative",
          overflow: "hidden",
          padding: "26px 32px 22px",
          borderBottom: "1px solid rgba(34,197,94,0.18)",
        }}
      >
        {/* code grid + neon blobs */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background: "rgba(34,197,94,0.06)",
            left: "-120px",
            top: "-200px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            border: "1px solid rgba(34,197,94,0.14)",
            right: "-40px",
            top: "-20px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "999px",
            background: "rgba(34,197,94,0.04)",
            right: "100px",
            bottom: "-40px",
            display: "flex",
          }}
        />
        {/* subtle terminal line pattern */}
        <div
          style={{
            position: "absolute",
            left: "32px",
            right: "32px",
            bottom: "0",
            height: "1px",
            background: "rgba(34,197,94,0.14)",
            display: "flex",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.22)",
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: 999, background: "#22C55E", display: "flex" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.18em", fontWeight: 700, color: "#22C55E" }}>LORONG DEV</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginLeft: 2 }}>—</span>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)" }}>
            LORONG 03 · CODE & TOOLS
          </span>
        </div>

        {/* hero DEV */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 16, justifyContent: "center" }}>
          <span style={{ fontSize: 108, fontWeight: 900, letterSpacing: "-0.06em", color: "white", lineHeight: 0.9 }}>
            DEV
          </span>
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.16em",
              fontWeight: 700,
              color: "#020617",
              background: "#22C55E",
              borderRadius: 999,
              padding: "6px 12px",
            }}
          >
            {"{ }"} CODE
          </span>
        </div>

        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.55)", marginTop: 8, fontFamily: "monospace" }}>
          JSON Formatter · JWT Decoder · Regex Tester — terminal preview
        </span>

        {/* mini cards */}
        <div style={{ display: "flex", gap: 10, marginTop: 18, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#0F172A",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid rgba(34,197,94,0.22)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#22C55E", fontFamily: "monospace" }}>{"{ }"} </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>JSON</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 1, fontFamily: "monospace" }}>
              Formatter
            </span>
          </div>
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
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#0F172A", fontFamily: "monospace" }}>JWT</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", marginTop: 2 }}>JWT</span>
            <span style={{ fontSize: 10, color: "#64748B", marginTop: 1, fontFamily: "monospace" }}>Decoder</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "11px 14px",
              minWidth: 154,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", color: "#22C55E", fontFamily: "monospace" }}>REGEX</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "white", marginTop: 2 }}>Regex</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 1, fontFamily: "monospace" }}>
              Tester
            </span>
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
              <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#020617", lineHeight: 1 }}>
                GSG ID
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  color: "#22C55E",
                  background: "#020617",
                  borderRadius: 999,
                  padding: "4px 10px",
                  border: "1px solid rgba(34,197,94,0.22)",
                }}
              >
                LORONG DEV
              </span>
              <div style={{ width: 28, height: 2, background: "#22C55E", borderRadius: 999, marginLeft: 4, display: "flex" }} />
            </div>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#020617",
                lineHeight: 1.15,
                marginTop: 8,
              }}
            >
              Tools Developer Cepat — JSON, JWT, Regex & Hash
            </span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: "#475569", marginTop: 4, maxWidth: 640 }}>
              Formatter, decoder & tester dengan terminal 1:1 preview. Offline, tanpa login, data di device.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 220 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#020617",
                color: "white",
                borderRadius: 999,
                padding: "9px 16px",
                gap: 8,
                border: "1px solid rgba(34,197,94,0.22)",
              }}
            >
              <div style={{ width: 7, height: 7, borderRadius: 999, background: "#22C55E", display: "flex" }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em" }}>GRATIS</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>TANPA LOGIN</span>
            </div>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                fontWeight: 700,
                color: "#16A34A",
                fontFamily: "monospace",
              }}
            >
              UNTUK DEVELOPER
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
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", color: "#020617" }}>
              gsgid.vercel.app/dev
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
            <span style={{ fontSize: 10, fontWeight: 700, color: "#020617", fontFamily: "monospace" }}>JSON</span>
            <span style={{ fontSize: 10, color: "#CBD5E1" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#020617", fontFamily: "monospace" }}>JWT</span>
            <span style={{ fontSize: 10, color: "#CBD5E1" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#020617", fontFamily: "monospace" }}>REGEX</span>
          </div>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
