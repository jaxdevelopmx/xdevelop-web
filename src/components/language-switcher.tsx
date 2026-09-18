"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/site";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
  return <div className="language-switch" aria-label={locale === "es" ? "Idioma" : "Language"}>{(["es", "en"] as const).map((language) => <Link key={language} lang={language} href={`/${language}${suffix === "/" ? "" : suffix}`} aria-current={language === locale ? "true" : undefined} onClick={() => { document.cookie = `locale=${language}; Path=/; Max-Age=31536000; SameSite=Lax`; }}>{language.toUpperCase()}</Link>)}</div>;
}
