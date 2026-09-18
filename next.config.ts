import type { NextConfig } from "next";

const legacyRoutes: Record<string, string> = {
  "/servicios": "/es/servicios",
  "/casos-de-exito": "/es/casos",
  "/tecnologias-y-skills": "/es/sistemas",
  "/codigo-como-servicio-caas": "/es/servicios",
  "/desarrollo-de-software-a-medida": "/es/servicios",
  "/inteligencia-artificial": "/es/inteligencia-artificial",
  "/aplicaciones-moviles": "/es/sistemas",
  "/sitios-web-y-ecommerce": "/es/sistemas",
  "/fabrica-de-software-y-nearshore": "/es/equipo",
  "/consultoria-e-implementaciones": "/es/servicios",
  "/soluciones-saas": "/es/productos",
  "/soporte-tecnico-y-helpdesk": "/es/servicios",
  "/in-plant-de-talento": "/es/equipo",
  "/implant-de-talento": "/es/equipo",
  "/data-y-analytics": "/es/sistemas",
  "/aviso-de-privacidad": "/es/aviso-de-privacidad",
};

const legacyRedirectsArePermanent = process.env.LEGACY_REDIRECTS_PERMANENT === "true";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return Object.entries(legacyRoutes).map(([source, destination]) => ({
      source,
      destination,
      permanent: legacyRedirectsArePermanent,
    }));
  },
};

export default nextConfig;
