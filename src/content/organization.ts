import type { Locale } from "./site";

export const organization = {
  name: "XDEVELOP",
  legalName: "XDEVELOP Software",
  foundingYear: "2012",
  logo: "/brand/xdevelop-logo-black.png",
  email: "hola@xdevelop.mx",
  phone: "+525528482194",
  phoneDisplay: "55 2848 2194",
  whatsapp: "https://wa.me/525528482194",
  address: {
    street: "Av. Marina Nacional 385, Piso 3",
    neighborhood: "Verónica Anzures, Miguel Hidalgo",
    locality: "Ciudad de México",
    region: "CDMX",
    country: "MX",
  },
  social: [
    "https://www.linkedin.com/company/xdevelopment-software/",
    "https://www.instagram.com/xdevelopmx/",
  ],
} as const;

export const schedulingUrl = process.env.NEXT_PUBLIC_SCHEDULING_URL ?? "";

export function getSchedulingHref(locale: Locale) {
  return schedulingUrl || `/${locale}/contacto`;
}

export function isExternalScheduling() {
  return schedulingUrl.length > 0;
}

export function getSchedulingOrigin() {
  try {
    return schedulingUrl ? new URL(schedulingUrl).origin : "";
  } catch {
    return "";
  }
}
