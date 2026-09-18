"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { getSchedulingOrigin } from "@/content/organization";
import { isLocale, type Locale } from "@/content/site";
import { analyticsEvents, gaMeasurementId, setAnalyticsEnabled, trackEvent } from "@/lib/analytics";
import {
  decideConsent,
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
  type ConsentDecision,
} from "@/lib/consent";
import { defaultLocale } from "@/lib/seo";
import { ConsentBanner } from "./consent-banner";
import { GoogleAnalytics } from "./google-analytics";

const measurementIdPattern = /^G-[A-Z0-9]+$/i;
const analyticsPrefix = "analytics";

function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}

function toEventParams(dataset: DOMStringMap) {
  return Object.entries(dataset).reduce<Record<string, string>>((params, [key, value]) => {
    if (key === "analyticsEvent" || !key.startsWith(analyticsPrefix) || value === undefined) return params;
    const name = key.slice(analyticsPrefix.length);
    params[name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()] = value;
    return params;
  }, {});
}

export function AnalyticsProvider() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [measurementReady, setMeasurementReady] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-consent-preferences]")) {
        setPreferencesOpen(true);
        return;
      }
      const trigger = target?.closest<HTMLElement>("[data-analytics-event]");
      const name = trigger?.dataset.analyticsEvent;
      if (!trigger || !name) return;
      trackEvent(name, { ...toEventParams(trigger.dataset), language: localeFromPath(window.location.pathname) });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setAnalyticsEnabled(measurementReady);
  }, [measurementReady]);

  useEffect(() => {
    if (!measurementReady) return;
    trackEvent(analyticsEvents.pageView, {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      language: locale,
    });
  }, [locale, measurementReady, pathname]);

  useEffect(() => {
    const schedulingOrigin = getSchedulingOrigin();
    const onMessage = (event: MessageEvent) => {
      const trusted = event.origin.endsWith("cal.com") || (schedulingOrigin && event.origin === schedulingOrigin);
      if (!trusted) return;
      const payload = event.data as { type?: string } | null;
      if (typeof payload?.type !== "string" || !payload.type.startsWith("bookingSuccessful")) return;
      trackEvent(analyticsEvents.scheduleBooked, { language: locale });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [locale]);

  const decide = useCallback((decision: ConsentDecision) => {
    decideConsent(decision);
    setPreferencesOpen(false);
    if (decision === "denied") setMeasurementReady(false);
  }, []);

  const measurementEnabled = consent === "granted" && measurementIdPattern.test(gaMeasurementId);
  const bannerVisible = consent === "unknown" || preferencesOpen;

  return (
    <>
      <Analytics />
      {measurementEnabled ? (
        <GoogleAnalytics measurementId={gaMeasurementId} onReady={() => setMeasurementReady(true)} />
      ) : null}
      {bannerVisible ? (
        <ConsentBanner
          locale={locale}
          dismissible={consent !== "unknown"}
          onAccept={() => decide("granted")}
          onDecline={() => decide("denied")}
          onClose={() => setPreferencesOpen(false)}
        />
      ) : null}
    </>
  );
}
