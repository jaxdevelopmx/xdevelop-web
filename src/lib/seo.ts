import type { Metadata } from "next";
import { locales, type Locale, type PageSlug } from "@/content/site";

export const defaultLocale: Locale = "es";

export const siteUrl = (process.env.SITE_URL ?? "https://xdevelop.mx").replace(/\/+$/, "");

export const hreflang: Record<Locale, string> = {
  es: "es-MX",
  en: "en",
};

export const openGraphLocale: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
};

export function localizedPath(locale: Locale, slug?: PageSlug) {
  if (slug) return `/${locale}/${slug}`;
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function buildAlternates(locale: Locale, slug?: PageSlug): Metadata["alternates"] {
  const languages = Object.fromEntries([
    ...locales.map((entry) => [hreflang[entry], localizedPath(entry, slug)]),
    ["x-default", localizedPath(defaultLocale, slug)],
  ]);

  return { canonical: localizedPath(locale, slug), languages };
}

export function buildOpenGraph(locale: Locale, slug: PageSlug | undefined, title: string, description: string) {
  return {
    type: "website" as const,
    title,
    description,
    url: localizedPath(locale, slug),
    siteName: "XDEVELOP",
    locale: openGraphLocale[locale],
    alternateLocale: locales.filter((entry) => entry !== locale).map((entry) => openGraphLocale[entry]),
  };
}
