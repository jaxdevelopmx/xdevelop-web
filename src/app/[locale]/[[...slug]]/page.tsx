import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageContent, isLocale, locales } from "@/content/site";

const slugs = [
  "nosotros",
  "equipo",
  "servicios",
  "revision-de-proyectos",
  "inteligencia-artificial",
  "sistemas",
  "industrias",
  "metodo-xdevelop",
  "productos",
  "casos",
  "contacto",
  "preguntas-frecuentes",
];

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    { locale, slug: undefined },
    ...slugs.map((slug) => ({ locale, slug: [slug] })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const [title, description] = getPageContent(locale, slug);
  return { title, description };
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const [eyebrow, title, description] = getPageContent(locale, slug);
  const isHome = !slug?.length;
  const copy = locale === "es" ? {
    back: "Volver al inicio",
    detail: "Esta página se construye alrededor de tu operación, no de una lista de tecnologías.",
    cta: "Revisar mi proyecto",
  } : {
    back: "Back home",
    detail: "This page is built around your operation, not a list of technologies.",
    cta: "Review my project",
  };

  if (isHome) {
    return (
      <main className="localized-home">
        <div className="localized-kicker" data-reveal>{eyebrow}</div>
        <h1 data-reveal data-reveal-delay="0.08">{title}</h1>
        <p data-reveal data-reveal-delay="0.16">{description}</p>
        <Link className="button button-dark" href={`/${locale}/contacto`} data-reveal data-reveal-delay="0.24">{copy.cta}</Link>
      </main>
    );
  }

  return (
    <main className="content-page">
      <Link className="back-link" href={`/${locale}`} data-reveal>← {copy.back}</Link>
      <div className="content-page-grid">
        <div data-reveal>
          <div className="eyebrow"><span className="status-dot" /> {eyebrow}</div>
          <h1>{title}</h1>
        </div>
        <div className="content-page-body" data-reveal data-reveal-delay="0.12">
          <p className="content-lede">{description}</p>
          <p>{copy.detail}</p>
          <Link className="button button-dark" href={`/${locale}/contacto`}>{copy.cta}</Link>
        </div>
      </div>
    </main>
  );
}
