"use client";

import { useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function subscribeReduceMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const getReduceMotionSSR = () => false;


export function MotionReveal() {
  const reduce = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotion,
    getReduceMotionSSR
  );

  useGSAP(
    () => {
      if (reduce) return;
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", document.body);
      const groups = new Map<string, HTMLElement[]>();

      targets.forEach((el, index) => {
        const key = el.dataset.revealGroup ?? `__reveal-solo-${index}`;
        const group = groups.get(key);
        if (group) group.push(el);
        else groups.set(key, [el]);
      });

      groups.forEach((els) => {
        if (els.length === 1) {
          const el = els[0];
          const delay = parseFloat(el.dataset.revealDelay ?? "0");
          const aboveTheFold = el.getBoundingClientRect().top < window.innerHeight;
          gsap.from(el, {
            ...(aboveTheFold ? {} : { autoAlpha: 0 }),
            y: 28,
            duration: 0.9,
            ease: "power3.out",
            delay,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
          return;
        }

        gsap.set(els, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(els, {
          start: "top 88%",
          once: true,
          interval: 0.1,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.07,
              // "auto" y no true: true mataría también la salida de abajo.
              overwrite: "auto",
            }),
        });
      });

      // Salida: al acercarse al borde superior cada bloque se desvanece y sube un
      // poco, en vez de cortarse de golpe. Va ligado al scroll: al volver, reaparece.
      // Se salta lo anidado para no multiplicar la opacidad de padre e hijo.
      gsap.utils
        .toArray<HTMLElement>("[data-reveal], [data-exit]", document.body)
        .filter((el) => !el.parentElement?.closest("[data-reveal], [data-exit]"))
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -24,
              ease: "none",
              immediateRender: false,
              scrollTrigger: { trigger: el, start: "bottom 38%", end: "bottom 6%", scrub: 0.5 },
            }
          );
        });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh).catch(() => undefined);
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    },
    { dependencies: [reduce], revertOnUpdate: true }
  );

  return null;
}