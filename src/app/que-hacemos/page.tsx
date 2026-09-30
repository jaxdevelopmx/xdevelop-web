import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

const eyebrow = "Lo que hacemos";
const heading = "Transformamos retos en soluciones tecnológicas escalables.";

export const metadata: Metadata = {
  title: "Qué hacemos",
  description: heading,
  alternates: { canonical: "/que-hacemos" },
  openGraph: { title: `${eyebrow} · XDEVELOP`, description: heading, url: "/que-hacemos" },
};

const services = [
  {
    title: "Desarrollo de software a la medida",
    text: "Plataformas SaaS, aplicaciones móviles (iOS y Android) y sistemas web diseñados según tus necesidades específicas.",
  },
  {
    title: "Inteligencia artificial y automatización",
    text: "Integramos IA, bots y automatización de procesos (RPA) para optimizar tareas operativas y potenciar la toma de decisiones.",
  },
  {
    title: "Talento y CaaS (código como servicio)",
    text: "Módulos de desarrollo listos para integrarse o equipos dedicados (In-Plant y Nearshore) para acelerar tus proyectos.",
  },
  {
    title: "Consultoría y soporte especializado",
    text: "Acompañamiento estratégico, arquitectura de software y soporte técnico para garantizar continuidad y rendimiento.",
  },
];

export default function WhatWeDo() {
  return <InfoPage section="que-hacemos" eyebrow={eyebrow} heading={heading} items={services} />;
}
