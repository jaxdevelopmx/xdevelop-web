import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

const eyebrow = "Nuestra experiencia";
const heading = "Casos de éxito que respaldan nuestra capacidad de impacto real.";

export const metadata: Metadata = {
  title: eyebrow,
  description: heading,
  alternates: { canonical: "/experiencia" },
  openGraph: { title: `${eyebrow} · XDEVELOP`, description: heading, url: "/experiencia" },
};

const areas = [
  {
    title: "Educación y gestión escolar",
    label: "Keedu y UNAM",
    text: "Digitalización de accesos, seguridad, apps móviles y portales administrativos para miles de usuarios.",
  },
  {
    title: "Logística y trazabilidad",
    label: "ICEE",
    text: "Seguimiento de entregas en tiempo real y automatización operativa en campo.",
  },
  {
    title: "Plataformas de negocio y ERPs",
    label: "Residia, OscarsFit y OVEE",
    text: "Centralización de accesos, reservas, cotizaciones y flujos comerciales en sistemas integrados.",
  },
  {
    title: "Experiencias digitales e innovación",
    label: "TWBA, Boxstore y Chili’s",
    text: "Reconocimiento facial para control de personal, tótems interactivos de autoservicio y dinámicas digitales interactivas.",
  },
];

export default function Experience() {
  return (
    <InfoPage
      section="experiencia"
      eyebrow={eyebrow}
      heading={heading}
      items={areas}
      secondaryLink={{ href: "/proyectos", label: "Ver proyectos" }}
    />
  );
}
