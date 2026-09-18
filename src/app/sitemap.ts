import type { MetadataRoute } from "next";
import { locales, pageSlugs, type PageSlug } from "@/content/site";
import { absoluteUrl, defaultLocale, hreflang, localizedPath } from "@/lib/seo";

const lastModified = new Date();

const priorities: Partial<Record<PageSlug, number>> = {
  servicios: 0.9,
  casos: 0.9,
  contacto: 0.9,
  "revision-de-proyectos": 0.8,
  "aviso-de-privacidad": 0.3,
};

function languages(slug?: PageSlug) {
  return Object.fromEntries([
    ...locales.map((locale) => [hreflang[locale], absoluteUrl(localizedPath(locale, slug))]),
    ["x-default", absoluteUrl(localizedPath(defaultLocale, slug))],
  ]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homes = locales.map((locale) => ({
    url: absoluteUrl(localizedPath(locale)),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: { languages: languages() },
  }));

  const pages = locales.flatMap((locale) =>
    pageSlugs.map((slug) => ({
      url: absoluteUrl(localizedPath(locale, slug)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: priorities[slug] ?? 0.7,
      alternates: { languages: languages(slug) },
    })),
  );

  return [...homes, ...pages];
}
