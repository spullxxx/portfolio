import { ImageResponse } from "next/og";

/* Imagem de prévia ao compartilhar o link (WhatsApp, LinkedIn, X…) — gerada no build. */
export const alt = "Carlos Daniel | Desenvolvedor autônomo · IA & Automação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const line = "rgba(255,255,255,0.08)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f0ece8",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* grade de linhas, como no site */}
        <div style={{ position: "absolute", left: 180, top: 0, bottom: 0, width: 1, background: line }} />
        <div style={{ position: "absolute", right: 180, top: 0, bottom: 0, width: 1, background: line }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 110, height: 1, background: line }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 110, height: 1, background: line }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 230px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#22c55e",
                boxShadow: "0 0 0 6px rgba(34,197,94,0.15)",
              }}
            />
            <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#8c8782" }}>
              Disponível para projetos
            </div>
          </div>
          <div style={{ marginTop: 28, fontSize: 96, lineHeight: 1, letterSpacing: -2 }}>Carlos Daniel</div>
          <div style={{ marginTop: 26, fontSize: 30, color: "#bcb8b4" }}>Desenvolvedor autônomo · IA & Automação</div>
          <div style={{ marginTop: 40, fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#7a7a7a" }}>
            +30 projetos · sites · sistemas · automações
          </div>
        </div>
      </div>
    ),
    size,
  );
}
