import { ImageResponse } from "next/og";

export const alt = "Claude Community — Less prompting. More shipping.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#171714", color: "#f0eee7", fontFamily: "monospace" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}><span style={{ color: "#c8ff5a" }}>CC_</span><span style={{ color: "#777970" }}>INDEPENDENT FIELD NOTES</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontFamily: "sans-serif", fontSize: 102, fontWeight: 700, letterSpacing: -6 }}>Less prompting.</div><div style={{ fontFamily: "serif", fontSize: 108, fontStyle: "italic", color: "#ef8c68", letterSpacing: -5 }}>More shipping.</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#999990" }}><span>Claude / Claude Code / real workflows</span><span>claudecommunity.com</span></div>
    </div>, size,
  );
}
