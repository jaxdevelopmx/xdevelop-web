"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, X } from "lucide-react";
import { clientsData, type ClientItem } from "@/content/clients";
import { analyticsEvents, trackEvent } from "@/lib/analytics";
import { getLenis } from "@/components/smooth-scroll";

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger);

const flipId = (id: string) => `client-card-${id}`;
const mediaFlipId = (id: string) => `client-media-${id}`;

export function ClientSection() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const captured = useRef<ReturnType<typeof Flip.getState> | null>(null);

  const [active, setActive] = useState<ClientItem | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        { wide: "(min-width: 901px) and (prefers-reduced-motion: no-preference)" },
        (context) => {
          if (!context.conditions?.wide) return;
          const list = track.current;
          const frame = viewport.current;
          if (!list || !frame) return;
          const overflow = () => Math.max(0, list.scrollWidth - frame.clientWidth);

          const tween = gsap.to(list, {
            x: () => -overflow(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => `+=${overflow()}`,
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            gsap.set(list, { clearProps: "x" });
          };
        }
      );

      return () => media.revert();
    },
    { scope: section }
  );

  const open = useCallback((client: ClientItem, trigger: HTMLButtonElement) => {
    origin.current = trigger;
    captured.current = Flip.getState(
      `[data-flip-id="${flipId(client.id)}"], [data-flip-id="${mediaFlipId(client.id)}"]`
    );
    setActive(client);
    trackEvent(analyticsEvents.clientSelect, { client: client.id, sector: client.sector });
  }, []);

  const close = useCallback(() => {
    const current = active;
    if (!current) return;
    captured.current = Flip.getState(
      `[data-flip-id="${flipId(current.id)}"], [data-flip-id="${mediaFlipId(current.id)}"]`
    );
    setActive(null);
  }, [active]);

  useLayoutEffect(() => {
    const state = captured.current;
    captured.current = null;
    if (!state) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = Flip.from(state, {
      duration: 0.62,
      ease: "power3.inOut",
      absolute: true,
      nested: true,
      scale: false,
    });

    if (!active || !dialog.current) return;

    const backdrop = dialog.current.parentElement;
    if (backdrop) timeline.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0);

    const body = dialog.current.querySelector(".client-modal-body");
    if (body) {
      timeline.fromTo(
        body.children,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055, ease: "power2.out" },
        0.3
      );
    }

    const close = dialog.current.querySelector(".client-modal-close");
    if (close) timeline.fromTo(close, { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, 0.42);
  }, [active]);

  useEffect(() => {
    if (!active) {
      getLenis()?.start();
      origin.current?.focus();
      origin.current = null;
      return;
    }

    getLenis()?.stop();
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = dialog.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, close]);

  return (
    <section className="clients" id="clientes" aria-labelledby="clients-title" ref={section}>
      <div className="clients-head">
        <div className="eyebrow">
          <span className="status-dot" /> Clientes en operación
        </div>
        <h2 id="clients-title">Empresas e instituciones donde nuestro software opera.</h2>
        <div className="clients-meta">
          <p className="clients-lede">
            Desde la universidad más grande de Iberoamérica hasta infraestructura crítica,
            logística de última milla y fintech. Cada una es un sistema que no puede detenerse.
          </p>
          <div className="clients-count">
            <span className="clients-pulse" aria-hidden="true" />
            <span>
              <strong>+20 sistemas</strong>
              en monitoreo y continuidad
            </span>
          </div>
        </div>
      </div>

      <div className="clients-viewport" ref={viewport}>
        <ul className="clients-track" ref={track}>
          {clientsData.map((client) => (
            <li className="client-card" key={client.id}>
              <button
                type="button"
                className={client.inverted ? "client-card-btn client-card-inverse" : "client-card-btn"}
                aria-label={`Ver detalle de ${client.name}`}
                data-flip-id={active?.id === client.id ? undefined : flipId(client.id)}
                data-tone={client.tone}
                onClick={(event) => open(client, event.currentTarget)}
              >
                <span
                  className="client-card-media"
                  data-flip-id={active?.id === client.id ? undefined : mediaFlipId(client.id)}
                >
                  <Image src={client.color} alt={client.name} width={420} height={200} />
                </span>
                <span className="client-card-zoom">
                  <ArrowUpRight />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active
        ? createPortal(
        <div className="client-modal" role="presentation" onClick={close}>
          <div
            className="client-modal-panel"
            data-flip-id={flipId(active.id)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-modal-title"
            ref={dialog}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="client-modal-close"
              onClick={close}
              aria-label="Cerrar detalle"
              ref={closeButton}
            >
              <X />
            </button>

            <span
              className={
                active.inverted ? "client-modal-media client-modal-media-inverse" : "client-modal-media"
              }
              data-flip-id={mediaFlipId(active.id)}
              data-tone={active.tone}
            >
              <Image src={active.color} alt={active.name} width={420} height={200} />
            </span>

            <div className="client-modal-body">
              <div className="client-modal-status">
                <span className="status-dot" />
                <span>{active.status}</span>
                <span className="client-modal-sector">{active.sectorLabel}</span>
              </div>

              <h3 id="client-modal-title">{active.name}</h3>
              <p className="client-modal-category">{active.category}</p>

              <div className="client-modal-impact">
                <span>Impacto verificado</span>
                <strong>{active.impact}</strong>
              </div>

              <p className="client-modal-description">{active.description}</p>
            </div>
          </div>
        </div>,
            document.body
          )
        : null}
    </section>
  );
}
