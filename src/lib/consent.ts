export type ConsentDecision = "granted" | "denied";
export type ConsentState = ConsentDecision | "unknown";
export type ConsentSnapshot = ConsentState | "pending";

const consentCookie = "xdevelop-consent";
const consentMaxAge = 60 * 60 * 24 * 180;
const listeners = new Set<() => void>();

let cached: ConsentState | undefined;

function readCookie(): ConsentState {
  const entry = document.cookie.split("; ").find((cookie) => cookie.startsWith(`${consentCookie}=`));
  const value = entry?.split("=")[1];
  return value === "granted" || value === "denied" ? value : "unknown";
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getConsentSnapshot(): ConsentSnapshot {
  cached ??= readCookie();
  return cached;
}

export function getServerConsentSnapshot(): ConsentSnapshot {
  return "pending";
}

export function decideConsent(decision: ConsentDecision) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${consentCookie}=${decision}; Path=/; Max-Age=${consentMaxAge}; SameSite=Lax${secure}`;
  cached = decision;
  listeners.forEach((listener) => listener());
}
