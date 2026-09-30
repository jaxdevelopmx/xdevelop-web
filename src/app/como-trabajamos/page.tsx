import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

const eyebrow = "Cómo trabajamos";
const heading = "Un enfoque cercano, estratégico y orientado a resultados.";

export const metadata: Metadata = {
  title: eyebrow,
  description: heading,
  alternates: { canonical: "/como-trabajamos" },
  openGraph: { title: `${eyebrow} · XDEVELOP`, description: heading, url: "/como-trabajamos" },
};

const principles = [
  {
    title: "Estrategia y análisis",
    text: "Entendemos tu negocio a fondo para definir la mejor solución tecnológica.",
  },
  {
    title: "Desarrollo ágil e integral",
    text: "Diseñamos e implementamos con metodologías que priorizan la calidad, la funcionalidad y la flexibilidad.",
  },
  {
    title: "Colaboración y transparencia",
    text: "Mantenemos una comunicación clara y cercana durante cada etapa del proyecto.",
  },
  {
    title: "Evolución continua",
    text: "Te acompañamos desde el lanzamiento hasta la escalabilidad y soporte a largo plazo de tus plataformas.",
  },
];

export default function HowWeWork() {
  // From first analysis to long-term support: a real sequence, so it stays numbered.
  return <InfoPage section="como-trabajamos" eyebrow={eyebrow} heading={heading} items={principles} numbered />;
}
