import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/content/site";
import { analyticsEvents } from "@/lib/analytics";
import { localizedPath } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="localized-shell" lang={locale}>
      <header className="localized-header">
        <Link href={localizedPath(locale)} className="localized-logo">XDEVELOP<span>software</span></Link>
        <nav aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          <Link href={localizedPath(locale, "servicios")} data-analytics-event={analyticsEvents.serviceSelect} data-analytics-source="localized-nav">{locale === "es" ? "Servicios" : "Services"}</Link>
          <Link href={localizedPath(locale, "casos")} data-analytics-event={analyticsEvents.caseSelect} data-analytics-source="localized-nav">{locale === "es" ? "Casos" : "Cases"}</Link>
          <Link href={localizedPath(locale, "contacto")}>{locale === "es" ? "Contacto" : "Contact"}</Link>
        </nav>
        <div className="localized-actions">
          {locales.map((language) => (
            <Link
              key={language}
              lang={language}
              href={localizedPath(language)}
              aria-current={language === locale ? "true" : undefined}
              data-analytics-event={analyticsEvents.languageChange}
              data-analytics-from={locale}
              data-analytics-to={language}
            >
              {language.toUpperCase()}
            </Link>
          ))}
          <Link className="button button-dark button-small" href={localizedPath(locale, "contacto")}>{locale === "es" ? "Revisar mi proyecto" : "Review my project"}</Link>
        </div>
      </header>
      {children}
    </div>
  );
}
