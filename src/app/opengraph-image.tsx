import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AutoCompare Dashboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "#2563eb",
      }}
    >
      🏎️ AutoCompare
    </div>,
    { ...size },
  );
}
