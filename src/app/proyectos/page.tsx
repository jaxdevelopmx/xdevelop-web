import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MainFooter } from "@/components/main-footer";
import { MainHeader } from "@/components/main-header";
import { MotionReveal } from "@/components/motion-reveal";
import { getProjectDetail } from "@/content/projects";
import { Button } from "@/components/ui/button";
import { analyticsEvents } from "@/lib/analytics";

const eyebrow = "Proyectos destacados";
const heading = "Soluciones tecnológicas diseñadas para transformar industrias.";

export const metadata: Metadata = {
  title: eyebrow,
  description: heading,
  alternates: { canonical: "/proyectos" },
  openGraph: { title: `${eyebrow} · XDEVELOP`, description: heading, url: "/proyectos" },
};

type Project = {
  name: string;
  /** What kind of operation it serves: the projects are not a sequence, so no numbering. */
  sector: string;
  text: string;
  image: { src: string; width: number; height: number; alt: string };
  /** Logos (not mockups) sit smaller and reuse the gallery's dark-mode tone fixes. */
  logo?: boolean;
  /** Stage color behind the image: the client's own brand color. */
  brand: string;
};

// Mockups come from the portfolio (assets/source/portfolio); Keedu and TWBA have
// no case page there, so they show their client logo instead.
const projects: Project[] = [
  {
    name: "Keedu",
    sector: "Gestión escolar",
    text: "Plataforma integral para la gestión escolar, accesos mediante QR y comunicación en tiempo real con tutores.",
    logo: true,
    // Keedu's logo is navy, so its stage is a light tint of that blue.
    brand: "#e9f0fb",
    image: { src: "/media/generated/client-logos-keedu-keedu-logo-640.webp", width: 640, height: 640, alt: "Logo de Keedu" },
  },
  {
    name: "SGT",
    brand: "#17563d",
    sector: "Gestión operativa",
    text: "ERP, sitio web y app móvil híbrida para la gestión operativa, comunicación interna y métricas de desempeño del personal.",
    image: { src: "/media/projects/sgt-mockup.webp", width: 800, height: 470, alt: "ERP, sitio web y app de SGT en varios dispositivos" },
  },
  {
    name: "ICEE",
    brand: "#154a86",
    sector: "Logística",
    text: "Sistema de trazabilidad logística con seguimiento de rutas y registro de evidencias en tiempo real.",
    image: { src: "/media/projects/icee-mockup.webp", width: 387, height: 480, alt: "App de entregas de ICEE en un teléfono" },
  },
  {
    name: "UNAM",
    brand: "#0f2e5c",
    sector: "Facultad de Odontología",
    text: "App móvil y backoffice para la digitalización de procesos académicos, trámites y avisos.",
    image: { src: "/media/projects/unam-mockup.webp", width: 696, height: 401, alt: "Backoffice de la Facultad de Odontología de la UNAM en una laptop" },
  },
  {
    name: "Residia",
    brand: "#0a2a8a",
    sector: "Administración de condominios",
    text: "ERP especializado para el control de condominios: accesos, incidencias, reservas y comunicación en un solo sistema.",
    image: { src: "/media/projects/residia-mockup.webp", width: 720, height: 623, alt: "Plataforma Residia en laptop, tablet y teléfono" },
  },
  {
    name: "OVEE",
    brand: "#3b2a8f",
    sector: "Salones de eventos",
    text: "ERP para la automatización comercial de salones de eventos: cotizaciones, contratos, pagos y servicios adicionales en un solo sistema.",
    image: { src: "/media/projects/ovee-mockup.webp", width: 474, height: 521, alt: "Plataforma OVEE en una laptop" },
  },
  {
    name: "TWBA",
    sector: "Recursos humanos",
    text: "Sistema de control de asistencia mediante reconocimiento facial y gestión automatizada de nómina.",
    logo: true,
    brand: "#050811",
    image: { src: "/media/generated/client-logos-twba-logo-blanco-twba-640.webp", width: 640, height: 640, alt: "Logo de TWBA" },
  },
];

export default function Projects() {
  return (
    <div className="home-shell">
      <MainHeader anchorBase="/" current="proyectos" />

      <main>
        <section className="page-hero" aria-labelledby="page-title">
          <div className="eyebrow" data-reveal><span className="status-dot" /> {eyebrow}</div>
          <h1 id="page-title" data-reveal data-reveal-delay="0.06">{heading}</h1>

          <div className="project-grid">
            {projects.map((project, index) => {
              // An odd last card would sit alone: it spans the row, image beside the copy.
              const wide = projects.length % 2 === 1 && index === projects.length - 1;
              const detail = getProjectDetail(project.name.toLowerCase());
              return (
                <article
                  className={wide ? "project project-wide" : "project"}
                  key={project.name}
                  data-reveal
                  data-reveal-group="projects"
                >
                  <div className="project-media" style={{ "--brand": project.brand } as CSSProperties}>
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      className={project.logo ? "project-logo" : undefined}
                      sizes="(width <= 700px) 90vw, 40vw"
                    />
                  </div>
                  <div className="project-copy">
                    <span className="card-label">{project.sector}</span>
                    <h2>{project.name}</h2>
                    <p>{project.text}</p>
                    {detail ? (
                      <Link className="arrow-link project-link" href={`/proyectos/${detail.slug}`}>Ver caso</Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="page-actions" data-reveal>
            <Button
              render={<Link href="/#contacto" />}
              nativeButton={false}
              variant="dark"
              size="cta"
              data-analytics-event={analyticsEvents.scheduleOpen}
              data-analytics-source="proyectos"
            >
              Revisar mi proyecto
            </Button>
          </div>
        </section>
      </main>

      <MainFooter anchorBase="/" />
      <MotionReveal />
    </div>
  );
}
