import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/content/site";
import { MotionReveal } from "@/components/motion-reveal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="localized-shell">
      <header className="localized-header">
        <Link href={`/${locale}`} className="localized-logo">XDEVELOP<span>software</span></Link>
        <nav aria-label="Localized navigation">
          <Link href={`/${locale}/servicios`}>{locale === "es" ? "Servicios" : "Services"}</Link>
          <Link href={`/${locale}/casos`}>{locale === "es" ? "Casos" : "Cases"}</Link>
          <Link href={`/${locale}/contacto`}>{locale === "es" ? "Contacto" : "Contact"}</Link>
        </nav>
        <div className="localized-actions">
          <Link href={`/es${locale === "es" ? "" : "/"}`}>ES</Link><span>/</span><Link href={`/en${locale === "en" ? "" : "/"}`}>EN</Link>
          <Link className="button button-dark button-small" href={`/${locale}/contacto`}>{locale === "es" ? "Revisar mi proyecto" : "Review my project"}</Link>
        </div>
      </header>
      {children}
      <MotionReveal />
    </div>
  );
}
