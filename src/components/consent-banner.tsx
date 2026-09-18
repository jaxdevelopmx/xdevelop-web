"use client";

import Link from "next/link";
import { getConsentCopy } from "@/content/consent";
import type { Locale } from "@/content/site";
import { localizedPath } from "@/lib/seo";

export function ConsentBanner({
  locale,
  dismissible,
  onAccept,
  onDecline,
  onClose,
}: {
  locale: Locale;
  dismissible: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}) {
  const copy = getConsentCopy(locale);

  return (
    <aside className="consent-banner" role="dialog" aria-modal="false" aria-labelledby="consent-title" lang={locale}>
      <div className="consent-copy">
        <h2 id="consent-title">{copy.title}</h2>
        <p>{copy.body}</p>
        <Link className="consent-policy" href={localizedPath(locale, "aviso-de-privacidad")}>
          {copy.policy}
        </Link>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-choice" onClick={onDecline}>
          {copy.decline}
        </button>
        <button type="button" className="consent-choice" onClick={onAccept}>
          {copy.accept}
        </button>
        {dismissible ? (
          <button type="button" className="consent-close" onClick={onClose} aria-label={copy.close}>
            ×
          </button>
        ) : null}
      </div>
    </aside>
  );
}
