import { ImageResponse } from "next/og";

export const dynamic = "force-static";
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
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B6B63", borderBottom: "1px solid #E8E6E1", paddingBottom: 16 }}>
        <div style={{ display: "flex" }}>GSG.ID - 1 DOMAIN, 2 LORONG, 30+ TOOLS</div>
        <div style={{ display: "flex" }}>TANPA LOGIN - GRATIS</div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: 24, paddingTop: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1.1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 900, color: "#0A0A0A" }}>GSG</div>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 900, color: "#0A0A0A" }}>ID</div>
            <div style={{ display: "flex", fontSize: 10, color: "#6B6B63", marginLeft: 8 }}>GUDANG SERBA GUNA</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
            <div style={{ display: "flex", fontSize: 52, fontWeight: 900, color: "#0A0A0A", lineHeight: 0.9 }}>Gudang serba guna</div>
            <div style={{ display: "flex", fontSize: 52, fontWeight: 300, color: "#0A0A0A" }}>untuk kerja nyata.</div>
          </div>
          <div style={{ display: "flex", fontSize: 16, color: "#3A3A36", marginTop: 16 }}>Satu domain, dua lorong. UMKM untuk jualan, Karir untuk melamar.</div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <div style={{ display: "flex", background: "#0A0A0A", color: "white", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 700 }}>Masuk UMKM</div>
            <div style={{ display: "flex", background: "white", color: "#0A0A0A", border: "1px solid #0A0A0A", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 700 }}>Masuk Karir</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: 380, gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 20, padding: 20, flex: 1 }}>
            <div style={{ display: "flex", fontSize: 10, color: "#EA580C" }}>LORONG 01 - UMKM</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 900, color: "#1C1917", marginTop: 6 }}>Buat jualan jalan.</div>
            <div style={{ display: "flex", fontSize: 12, color: "#57534E", marginTop: 6 }}>HPP - Invoice - QR - Margin - Stok</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", background: "#0F172A", borderRadius: 20, padding: 20, flex: 1 }}>
            <div style={{ display: "flex", fontSize: 10, color: "#60A5FA" }}>LORONG 02 - KARIR</div>
            <div style={{ display: "flex", fontSize: 22, fontWeight: 900, color: "white", marginTop: 6 }}>Biar lamaran dipanggil.</div>
            <div style={{ display: "flex", fontSize: 12, color: "#CBD5E1", marginTop: 6 }}>CV ATS - Lamaran - Gaji - Interview</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#78716C", borderTop: "1px solid #E8E6E1", paddingTop: 14, marginTop: 12 }}>
        <div style={{ display: "flex" }}>2026 GUDANG SERBA GUNA ID</div>
        <div style={{ display: "flex" }}>gsg.id, gratis selamanya</div>
      </div>
    </div>,
    { ...size }
  );
}
