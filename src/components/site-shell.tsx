import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content/site";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const links = [["servicios", es ? "Qué hacemos" : "What we do"], ["metodo-xdevelop", es ? "Cómo trabajamos" : "How we work"], ["casos", es ? "Experiencia" : "Experience"], ["nosotros", es ? "Nosotros" : "About"]];
  return <header className="navigation"><Link className="navigation-brand" href={`/${locale}`} aria-label="XDEVELOP"><Image src="/brand/xdevelop-logo-black.png" alt="XDEVELOP" width={196} height={52} priority /></Link><nav className="navigation-links" aria-label={es ? "Navegación principal" : "Main navigation"}>{links.map(([slug, title]) => <Link key={slug} href={`/${locale}/${slug}`}>{title}</Link>)}</nav><div className="navigation-actions"><LanguageSwitcher locale={locale} /><Link className="action action-small" href={`/${locale}/contacto`}>{es ? "Hablemos" : "Let's talk"}<span aria-hidden="true">↗</span></Link><details className="mobile-navigation"><summary aria-label={es ? "Abrir menú" : "Open menu"}>☰</summary><nav aria-label={es ? "Navegación móvil" : "Mobile navigation"}>{links.map(([slug, title]) => <Link key={slug} href={`/${locale}/${slug}`}>{title}</Link>)}<Link href={`/${locale}/productos`}>{es ? "Productos" : "Products"}</Link><Link href={`/${locale}/contacto`}>{es ? "Contacto" : "Contact"}</Link></nav></details></div></header>;
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return <footer className="footer"><div className="footer-top"><div><Image src="/brand/xdevelop-logo-white.png" alt="XDEVELOP" width={160} height={43} /><p>{es ? "Software para operaciones que no pueden detenerse." : "Software for operations that cannot stop."}</p></div><div><span>{es ? "Conversemos" : "Let's talk"}</span><a href="mailto:hola@xdevelop.mx">hola@xdevelop.mx</a><a href="tel:+525528482194">55 2848 2194</a></div><div><span>{es ? "Explorar" : "Explore"}</span><Link href={`/${locale}/equipo`}>{es ? "Equipo" : "Team"}</Link><Link href={`/${locale}/productos`}>{es ? "Productos" : "Products"}</Link><Link href={`/${locale}/preguntas-frecuentes`}>FAQ</Link></div><div><span>{es ? "Encuéntranos" : "Find us"}</span><address>Av. Marina Nacional 385, Piso 3<br />Verónica Anzures, Miguel Hidalgo<br />CDMX, México</address></div></div><div className="footer-bottom"><span>© 2026 XDEVELOP</span><span>{es ? "Hecho para continuar." : "Built to keep going."}</span></div></footer>;
}
