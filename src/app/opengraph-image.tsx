import { ImageResponse } from "next/og";

export const alt = "Julia Warter Wellness — lymphatic drainage, fascia release & gut health";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#f2f6f4",
          color: "#10302b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M16 2.5c4.2 6.1 9.5 11.2 9.5 17.1 0 5.5-4.3 9.9-9.5 9.9S6.5 25.1 6.5 19.6c0-5.9 5.3-11 9.5-17.1Z" fill="#0b5b52" />
            <path d="M12.2 20.2c.4 3 2.3 4.9 4.6 5.3" stroke="#b9d957" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 700 }}>Julia Warter Wellness</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            Puffy, heavy, stuck? It might be a movement problem.
          </div>
          <div style={{ fontSize: 30, color: "#46625c" }}>Lymphatic drainage, fascia release & gut health</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ background: "#0b5b52", color: "#fff", padding: "12px 24px", borderRadius: 999, fontSize: 24 }}>
            juliawarter.com
          </div>
          <div style={{ background: "#b9d957", color: "#10302b", padding: "12px 24px", borderRadius: 999, fontSize: 24 }}>
            The 2-minute routine
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
