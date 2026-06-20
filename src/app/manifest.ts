import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Claude Community", short_name: "CC_", description: "Independent field notes for Claude builders.", start_url: "/", display: "standalone", background_color: "#f0eee7", theme_color: "#171714", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
