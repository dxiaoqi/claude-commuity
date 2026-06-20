export const siteConfig = {
  name: "Claude Community",
  shortName: "CC_",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.claudecommunity.com",
  description:
    "Independent field notes, practical workflows, and sharp tools for people building with Claude and Claude Code.",
  email: "hello@claudecommunity.com",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
