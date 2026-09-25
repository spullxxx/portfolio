import { ImageResponse } from "next/og";

/* Ícone da aba do navegador: monograma "CD" no estilo do site. */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          background: "#f0ece8",
          color: "#0a0a0a",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        CD
      </div>
    ),
    size,
  );
}
