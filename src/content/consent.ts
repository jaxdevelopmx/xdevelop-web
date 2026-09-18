import type { Locale } from "./site";

export const consentCopy = {
  es: {
    title: "Cookies y medición",
    body: "Usamos cookies necesarias para que el sitio funcione y cookies de analítica para entender cómo se navega. La analítica solo se activa si la aceptas.",
    accept: "Aceptar analítica",
    decline: "Solo lo necesario",
    policy: "Aviso de privacidad",
    preferences: "Preferencias de cookies",
    close: "Cerrar preferencias",
  },
  en: {
    title: "Cookies and measurement",
    body: "We use necessary cookies to run the site and analytics cookies to understand how it is used. Analytics is enabled only if you accept it.",
    accept: "Accept analytics",
    decline: "Only what is necessary",
    policy: "Privacy notice",
    preferences: "Cookie preferences",
    close: "Close preferences",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function getConsentCopy(locale: Locale) {
  return consentCopy[locale];
}
