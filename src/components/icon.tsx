type IconName = "arrow" | "terminal" | "spark" | "copy" | "check";

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "arrow") return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === "terminal") return <svg {...props}><path d="m5 7 5 5-5 5M13 17h6" /></svg>;
  if (name === "spark") return <svg {...props}><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3ZM18.5 15l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" /></svg>;
  if (name === "copy") return <svg {...props}><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
  return <svg {...props}><path d="m5 12 4 4L19 6" /></svg>;
}
