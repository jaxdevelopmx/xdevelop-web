import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageContent, isLocale, locales, pageSlugs, resolveSlug } from "@/content/site";
import { analyticsEvents } from "@/lib/analytics";
import { buildAlternates, buildOpenGraph, localizedPath } from "@/lib/seo";

type PageParams = { params: Promise<{ locale: string; slug?: string[] }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    { locale, slug: undefined },
    ...pageSlugs.map((slug) => ({ locale, slug: [slug] })),
  ]);
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = resolveSlug(slug);
  if (!isLocale(locale) || resolved === null) return {};

  const [, title, description] = getPageContent(locale, resolved);

  return {
    title,
    description,
    alternates: buildAlternates(locale, resolved),
    openGraph: buildOpenGraph(locale, resolved, title, description),
  };
}

export default async function LocalizedPage({ params }: PageParams) {
  const { locale, slug } = await params;
  const resolved = resolveSlug(slug);
  if (!isLocale(locale) || resolved === null) notFound();

  const [eyebrow, title, description] = getPageContent(locale, resolved);
  const copy = locale === "es" ? {
    back: "Volver al inicio",
    detail: "Esta página se construye alrededor de tu operación, no de una lista de tecnologías.",
    cta: "Revisar mi proyecto",
  } : {
    back: "Back home",
    detail: "This page is built around your operation, not a list of technologies.",
    cta: "Review my project",
  };

  if (!resolved) {
    return (
      <main className="localized-home">
        <div className="localized-kicker" data-reveal>{eyebrow}</div>
        <h1 data-reveal data-reveal-delay="0.08">{title}</h1>
        <p data-reveal data-reveal-delay="0.16">{description}</p>
        <Link
          className="button button-dark"
          href={localizedPath(locale, "contacto")}
          data-reveal
          data-reveal-delay="0.24"
          data-analytics-event={analyticsEvents.scheduleOpen}
          data-analytics-source="localized-home"
        >
          {copy.cta}
        </Link>
      </main>
    );
  }

  return (
    <main className="content-page">
      <Link className="back-link" href={localizedPath(locale)} data-reveal>← {copy.back}</Link>
      <div className="content-page-grid">
        <div data-reveal>
          <div className="eyebrow"><span className="status-dot" /> {eyebrow}</div>
          <h1>{title}</h1>
        </div>
        <div className="content-page-body" data-reveal data-reveal-delay="0.12">
          <p className="content-lede">{description}</p>
          <p>{copy.detail}</p>
          <Link
            className="button button-dark"
            href={localizedPath(locale, "contacto")}
            data-analytics-event={analyticsEvents.scheduleOpen}
            data-analytics-source={`localized-${resolved}`}
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}
