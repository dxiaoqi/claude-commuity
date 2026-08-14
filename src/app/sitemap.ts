import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAvailableLocalesForSlug, getSlugsByKind } from "@/lib/blog";
import { defaultLocale, locales } from "@/i18n/config";

function buildLanguages(pathTemplate: string, availableLocales: readonly string[]) {
  const languages = Object.fromEntries(
    availableLocales.map((l) => [l, `${siteConfig.url}${pathTemplate.replace("{locale}", l)}`])
  );
  languages["x-default"] = `${siteConfig.url}${pathTemplate.replace("{locale}", defaultLocale)}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogSlugs = getSlugsByKind("blog");
  const labSlugs = getSlugsByKind("lab");
  const paperSlugs = getSlugsByKind("paper");

  const staticPaths = ["", "/blog", "/lab", "/lab/mini-claude-code", "/papers", "/claude-code", "/claude", "/privacy"] as const;

  const staticRoutes: MetadataRoute.Sitemap = [];
  for (const p of staticPaths) {
    for (const l of locales) {
      staticRoutes.push({
        url: `${siteConfig.url}/${l}${p}`,
        lastModified: now,
        changeFrequency: p === "/privacy" ? "yearly" : "weekly",
        priority: p === "" ? 1 : p === "/blog" || p === "/lab" || p === "/papers" ? 0.9 : p === "/lab/mini-claude-code" ? 0.88 : p === "/privacy" ? 0.2 : 0.85,
        alternates: {
          languages: buildLanguages(`/{locale}${p}`, locales),
        },
      });
    }
  }

  const postRoutes: MetadataRoute.Sitemap = [];
  for (const slug of blogSlugs) {
    const available = getAvailableLocalesForSlug(slug);
    for (const l of locales) {
      postRoutes.push({
        url: `${siteConfig.url}/${l}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: buildLanguages(`/{locale}/blog/${slug}`, available),
        },
      });
    }
  }
  for (const slug of labSlugs) {
    const available = getAvailableLocalesForSlug(slug);
    for (const l of locales) {
      postRoutes.push({
        url: `${siteConfig.url}/${l}/lab/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: buildLanguages(`/{locale}/lab/${slug}`, available),
        },
      });
    }
  }
  for (const slug of paperSlugs) {
    const available = getAvailableLocalesForSlug(slug);
    for (const l of locales) {
      postRoutes.push({
        url: `${siteConfig.url}/${l}/papers/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: buildLanguages(`/{locale}/papers/${slug}`, available),
        },
      });
    }
  }

  return [...staticRoutes, ...postRoutes];
}
