import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MainFooter } from "@/components/main-footer";
import { MainHeader } from "@/components/main-header";
import { MotionReveal } from "@/components/motion-reveal";
import { Button } from "@/components/ui/button";
import { getNextProjectDetail, getProjectDetail, projectDetails } from "@/content/projects";
import { analyticsEvents } from "@/lib/analytics";

// Only the products and cases listed in src/content/projects.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectDetails.map(({ slug }) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProjectDetail((await params).slug);
  if (!project) return {};
  const path = `/proyectos/${project.slug}`;
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { title: `${project.name} · XDEVELOP`, description: project.summary, url: path },
  };
}

// Same four steps as the home "Así damos continuidad a tu proyecto" section.
const method = [
  ["Entendemos", "Revisamos el proyecto y la operación que debe resolver."],
  ["Priorizamos", "Separamos lo urgente de lo importante y definimos qué conviene conservar."],
  ["Integramos al equipo", "Incorporamos los roles que necesita la siguiente etapa."],
  ["Damos continuidad", "Construimos, revisamos y comprobamos cada avance."],
] as const;

const brandStyle = (brand: string) => ({ "--brand": brand }) as CSSProperties;

// Mockups never grow past their source pixels (the portfolio exports are ~800px wide);
// logos get a size by shape so a wide lockup and a square mark read at the same weight.
function stageImageStyle(image: { width: number; height: number; logo?: boolean }): CSSProperties {
  if (!image.logo) return { maxWidth: image.width };
  return image.width / image.height > 2
    ? { width: "min(100%, 460px)", maxHeight: "none" }
    : { width: "auto", height: "clamp(140px, 14vw, 200px)" };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectDetail((await params).slug);
  if (!project) notFound();

  const next = getNextProjectDetail(project.slug);
  // Three other projects, starting after the next one so the band below doesn't repeat.
  const others = [1, 2, 3].map((offset) => getNextProjectDetail(next.slug, offset));
  const { image } = project;
  const kindLabel = project.kind === "producto" ? "Producto propio XDEVELOP" : "Caso de cliente";

  return (
    <div className="home-shell">
      <MainHeader anchorBase="/" current="proyectos" />

      <main className="case-page">
        {/* Brand band: the client's own color carries the hero; the mockup floats on it, no frame. */}
        <section className="case-band" style={brandStyle(project.brand)} aria-labelledby="page-title">
          <div className="case-band-head">
            <div>
              <p className="case-kind" data-reveal>{kindLabel}</p>
              <h1 id="page-title" data-reveal data-reveal-delay="0.06">{project.name}</h1>
              <p className="case-summary" data-reveal data-reveal-delay="0.12">{project.summary}</p>
            </div>
            {project.metric ? (
              <p className="case-metric" data-reveal data-reveal-delay="0.18">
                <strong>{project.metric.value}</strong>
                <span>{project.metric.label}</span>
              </p>
            ) : null}
          </div>

          <div className={image.logo ? "case-stage case-stage-logo" : "case-stage"} data-reveal data-reveal-delay="0.2">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(width <= 700px) 92vw, 70vw"
              priority
              style={stageImageStyle(image)}
            />
          </div>
        </section>

        <div className={image.logo ? "case-content" : "case-content case-content-overlap"}>
          <dl className="case-facts" data-reveal>
            <div>
              <dt>Tipo</dt>
              <dd>{kindLabel}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd><span className="case-status-dot" aria-hidden="true" />{project.status}</dd>
            </div>
            {project.stack ? (
              <div>
                <dt>Tecnologías</dt>
                <dd>{project.stack.join(", ")}</dd>
              </div>
            ) : null}
          </dl>

          <section className="case-row" data-reveal>
            <h2>La solución</h2>
            <p>{project.solution}</p>
          </section>

          <section className="case-row" data-reveal>
            <h2>Qué construimos</h2>
            <ul className="case-tags">
              {project.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {project.challenges ? (
            <section className="case-section" aria-labelledby="case-challenges">
              <h2 id="case-challenges" data-reveal>El punto de partida</h2>
              <div className="case-challenges">
                {project.challenges.map((item) => (
                  <article key={item.title} data-reveal data-reveal-group="challenges">
                    <h3>{item.title}</h3>
                    <p>{item.problem}</p>
                    <p className="case-answer"><span>Con {project.name}:</span> {item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {project.highlights ? (
            <section className="case-section" aria-labelledby="case-highlights" style={brandStyle(project.brand)}>
              <h2 id="case-highlights" data-reveal>Lo que lo hace distinto</h2>
              <div className="case-highlights">
                {project.highlights.map((item) => (
                  <article key={item.title} data-reveal data-reveal-group="highlights">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {project.gallery ? (
            <section className="case-section" aria-labelledby="case-gallery">
              <h2 id="case-gallery" data-reveal>Pantallas</h2>
              <div className="case-gallery" style={brandStyle(project.brand)} data-reveal>
                {project.gallery.map((shot) => (
                  <figure key={shot.src}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className={shot.flat ? "shot-flat" : undefined}
                      sizes="(width <= 700px) 90vw, 40vw"
                    />
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <section className="case-row" data-reveal>
            <h2>{project.outcomesTitle}</h2>
            <ul>
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>

          {project.result ? (
            <section className="case-row" data-reveal>
              <h2>El resultado</h2>
              <p className="case-result">{project.result}</p>
            </section>
          ) : null}

          <section className="case-section" aria-labelledby="case-method">
            <h2 id="case-method" data-reveal>Cómo trabajamos cada proyecto</h2>
            <div className="process-line case-process">
              {method.map(([step, text], index) => (
                <div className="process-step" key={step} data-reveal data-reveal-group="method">
                  <span>0{index + 1}</span>
                  <strong>{step}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="page-actions" data-reveal>
            <Button
              render={<Link href="/#contacto" />}
              nativeButton={false}
              variant="dark"
              size="cta"
              data-analytics-event={analyticsEvents.scheduleOpen}
              data-analytics-source={`proyecto-${project.slug}`}
            >
              Revisar mi proyecto
            </Button>
            <Link className="text-link" href="/proyectos">Ver todos los proyectos</Link>
          </div>
        </div>

        <section className="case-more" aria-labelledby="case-more">
          <h2 id="case-more" data-reveal>Más proyectos</h2>
          <div className="case-more-grid">
            {others.map((other) => (
              <Link className="case-more-card" key={other.slug} href={`/proyectos/${other.slug}`} data-reveal data-reveal-group="more">
                <span className="project-media" style={brandStyle(other.brand)}>
                  <Image
                    src={other.image.src}
                    alt=""
                    width={other.image.width}
                    height={other.image.height}
                    className={other.image.logo ? "project-logo" : undefined}
                    sizes="(width <= 700px) 90vw, 28vw"
                  />
                </span>
                <span className="card-label">{other.sector}</span>
                <span className="case-more-name">{other.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <Link className="case-next" href={`/proyectos/${next.slug}`} style={brandStyle(next.brand)}>
          <span className="case-next-label">Siguiente proyecto</span>
          <span className="case-next-name">{next.name}</span>
          <span className="case-next-sector">{next.sector}</span>
        </Link>
      </main>

      <MainFooter anchorBase="/" />
      <MotionReveal />
    </div>
  );
}
