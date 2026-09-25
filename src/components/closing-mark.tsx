"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  brandMarkCenter,
  brandMarkViewBox,
  brandStrokeBracketLower,
  brandStrokeBracketUpper,
  brandStrokeWidth,
} from "@/lib/brand-mark";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Separación inicial sobre el eje por el que abre el isotipo: arriba-izquierda y abajo-derecha. */
const bracketGap = 34;
/** Momento exacto en que las dos piezas hacen contacto. */
const lockAt = 1.92;
/** Tramo "caliente" que deja el cabezal detrás, como fracción del trazo. */
const trailRatio = 0.16;
/** Centro del isotipo, para escalar el visor y el riel desde ahí. */
const markOrigin = `${brandMarkCenter} ${brandMarkCenter}`;
/** Riel: la diagonal por la que corren las piezas al encajar. */
const railPath = "M96 96 L464 464";
/** Esquinas de visor, 52 u hacia dentro del borde. */
const framePath = "M52 82V52H82 M478 52H508V82 M508 478V508H478 M82 508H52V478";
/** El barrido va de abajo-izquierda a arriba-derecha: repasa una junta, luego la otra, y termina apuntando al texto. */
const scanFrom = { x: 120, y: 440 };
const scanTo = { x: 440, y: 120 };
/** Registro donde cae cada punta, en sentido horario desde arriba. */
const registrationTicks = [
  [326.39, 134.37],
  [425.63, 233.61],
  [233.61, 425.63],
  [134.37, 326.39],
] as const;
const tickHalf = 15.56;

export function ClosingMark() {
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^\w-]/g, "");
  const clipId = `cm-clip-${uid}`;
  const beamId = `cm-beam-${uid}`;
  const haloId = `cm-halo-${uid}`;
  const beamGlowId = `cm-beam-glow-${uid}`;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const media = gsap.matchMedia(root);

      // Bajo 600px el ornamento se oculta por CSS; con reduced-motion se queda el
      // HTML del servidor, que ya es el estado final. En ambos casos no corre nada.
      media.add("(prefers-reduced-motion: no-preference) and (width > 600px)", () => {
        let locked = false;
        let visible = false;
        // El pulso del punto de estado es el pulse-ring de CSS; solo late
        // mientras el ornamento está en pantalla.
        const syncLive = () => {
          root.toggleAttribute("data-live", locked && visible);
        };

        // refreshPriority < 0: se mide después del pin de la galería de clientes aunque
        // ese pin se cree más tarde (p. ej. al rotar una tablet de 601-900px a >900px).
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          refreshPriority: -1,
          onToggle: (self) => {
            visible = self.isActive;
            syncLive();
          },
        });

        // Ya visible al montar (/#contacto, recarga o scroll restaurado): no se
        // desarma lo que el servidor pintó terminado. Misma regla que MotionReveal.
        if (root.getBoundingClientRect().top < window.innerHeight) {
          locked = true;
          syncLive();
          return () => root.removeAttribute("data-live");
        }

        const xdevBracket = root.querySelector<SVGPathElement>(".cm-bracket--xdev");
        const head = root.querySelector<SVGGElement>(".cm-head");
        if (!xdevBracket || !head) return;

        const length = xdevBracket.getTotalLength();
        const trail = length * trailRatio;
        const setHeadX = gsap.quickSetter(head, "x", "px");
        const setHeadY = gsap.quickSetter(head, "y", "px");
        const build = { progress: 0 };
        const moveHead = () => {
          const point = xdevBracket.getPointAtLength(build.progress * length);
          setHeadX(point.x);
          setHeadY(point.y);
        };

        // Estado "desarmado", aplicado fuera de pantalla.
        gsap.set(".cm-frame", { autoAlpha: 0, scale: 1.16, svgOrigin: markOrigin });
        gsap.set(".cm-frame-lock", { autoAlpha: 0, scale: 1.08, svgOrigin: markOrigin });
        gsap.set(".cm-rail", { autoAlpha: 1, scale: 0, svgOrigin: markOrigin });
        gsap.set(".cm-tick", { autoAlpha: 0, scale: 0, transformOrigin: "50% 50%" });
        gsap.set(".cm-client", {
          autoAlpha: 0,
          x: -bracketGap - 16,
          y: -bracketGap - 16,
          rotation: -4,
          svgOrigin: "184 184",
        });
        gsap.set(".cm-xdev", { x: bracketGap, y: bracketGap });
        gsap.set([xdevBracket, ".cm-plan"], { strokeDasharray: `${length} ${length * 2}`, strokeDashoffset: length });
        gsap.set(".cm-plan", { autoAlpha: 1 });
        gsap.set(".cm-trail", { autoAlpha: 1, strokeDasharray: `${trail} ${length * 2}`, strokeDashoffset: trail });
        gsap.set(head, { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" });
        moveHead();
        gsap.set(".cm-scan", { autoAlpha: 0, ...scanFrom });
        gsap.set(".cm-status", { autoAlpha: 0, y: 6 });
        gsap.set([".cm-dot-busy", ".cm-label-busy"], { autoAlpha: 1 });
        gsap.set(".cm-label-done", { autoAlpha: 0 });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        intro
          // 1 · Mesa de trabajo: visor y riel.
          .to(".cm-frame", { autoAlpha: 1, scale: 1.08, duration: 0.6, ease: "expo.out" }, 0)
          .to(".cm-rail", { scale: 1, duration: 0.5 }, 0.1)
          // 2 · "Ya construiste una parte": llega completa, pero desalineada.
          .to(".cm-client", { autoAlpha: 1, x: -bracketGap, y: -bracketGap, duration: 0.5, ease: "power2.out" }, 0.15)
          .to(".cm-tick", { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.05 }, 0.3)
          // 3 · Plan: la IA traza la ruta en un instante.
          .to(".cm-plan", { strokeDashoffset: 0, duration: 0.38, ease: "power2.inOut" }, 0.4)
          // 4 · Ejecución: el cabezal construye la pieza XDEVELOP sobre ese plan, en una sola pasada.
          .to(".cm-status", { autoAlpha: 1, y: 0, duration: 0.3 }, 0.6)
          .to(head, { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power2.out" }, 0.6)
          .to(xdevBracket, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, 0.6)
          .to(".cm-trail", { strokeDashoffset: trail - length, duration: 0.8, ease: "power2.inOut" }, 0.6)
          .to(build, { progress: 1, duration: 0.8, ease: "power2.inOut", onUpdate: moveHead }, 0.6)
          .to([head, ".cm-trail"], { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, 1.34)
          .to(head, { scale: 0.4, duration: 0.2, ease: "power2.in" }, 1.34)
          // 5 · Integración: las dos piezas corren por el riel y encajan.
          .to([".cm-client", ".cm-xdev"], { x: 0, y: 0, rotation: 0, duration: 0.5, ease: "power4.inOut" }, lockAt - 0.5)
          // 6 · Contacto: el visor sujeta, los registros confirman en orden y el estado pasa a "En operación".
          .to([".cm-frame", ".cm-frame-lock"], { scale: 1, duration: 0.45, ease: "expo.out" }, lockAt)
          .set(".cm-frame-lock", { autoAlpha: 1 }, lockAt)
          .to(".cm-frame-lock", { autoAlpha: 0, duration: 0.6, ease: "power2.out" }, lockAt + 0.1)
          .to(".cm-tick", { autoAlpha: 0, scale: 1.6, duration: 0.45, stagger: 0.04, ease: "power2.out" }, lockAt)
          .to([".cm-dot-busy", ".cm-label-busy"], { autoAlpha: 0, duration: 0.2 }, lockAt)
          .to(".cm-label-done", { autoAlpha: 1, duration: 0.25 }, lockAt + 0.05)
          .call(
            () => {
              locked = true;
              syncLive();
            },
            undefined,
            lockAt
          )
          // 7 · Verificación: un barrido repasa ambas juntas y retira el andamiaje.
          .set(".cm-scan", { autoAlpha: 1 }, lockAt + 0.05)
          .to(".cm-scan", { ...scanTo, duration: 0.75, ease: "power2.inOut" }, lockAt + 0.05)
          .to(".cm-scan", { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, lockAt + 0.6)
          .to([".cm-rail", ".cm-plan"], { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, lockAt + 0.2)
          .to(".cm-frame", { autoAlpha: 0, duration: 0.5, ease: "power2.out" }, lockAt + 0.45);

        // Arranca con el ornamento completo en vista y después del fade de MotionReveal
        // ("top 88%"). clamp() garantiza que el inicio sea alcanzable al fondo de la página;
        // si el scroll salta más allá, ScrollTrigger dispara onEnter igual.
        ScrollTrigger.create({
          trigger: root,
          start: "clamp(center 78%)",
          once: true,
          refreshPriority: -1,
          onEnter: () => intro.play(),
        });

        return () => root.removeAttribute("data-live");
      });

      return () => media.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="closing-mark" data-reveal aria-hidden="true">
      <svg className="closing-mark-svg" viewBox={brandMarkViewBox} fill="none">
        <defs>
          <clipPath id={clipId}>
            <rect x="52" y="52" width="456" height="456" />
          </clipPath>
          <linearGradient id={beamId} gradientUnits="userSpaceOnUse" x1="-200" y1="-200" x2="200" y2="200">
            <stop offset="0" className="cm-stop-cobalt" stopOpacity="0" />
            <stop offset="0.3" className="cm-stop-cobalt" />
            <stop offset="0.7" className="cm-stop-ai" />
            <stop offset="1" className="cm-stop-ai" stopOpacity="0" />
          </linearGradient>
          {/* Resplandor desenfocado: se lee como luz en ambos temas, no como un contorno turbio. */}
          <filter id={haloId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={beamGlowId}>
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <path className="cm-frame" d={framePath} vectorEffect="non-scaling-stroke" />
        <path className="cm-frame-lock" d={framePath} vectorEffect="non-scaling-stroke" />
        <path className="cm-rail" d={railPath} vectorEffect="non-scaling-stroke" />
        {registrationTicks.map(([x, y]) => (
          <line
            key={`${x}-${y}`}
            className="cm-tick"
            x1={x - tickHalf}
            y1={y + tickHalf}
            x2={x + tickHalf}
            y2={y - tickHalf}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <g className="cm-client">
          <path className="cm-bracket cm-bracket--client" d={brandStrokeBracketUpper} strokeWidth={brandStrokeWidth} />
        </g>

        <g className="cm-xdev">
          <path className="cm-plan" d={brandStrokeBracketLower} />
          <path className="cm-bracket cm-bracket--xdev" d={brandStrokeBracketLower} strokeWidth={brandStrokeWidth} />
          <path className="cm-bracket cm-trail" d={brandStrokeBracketLower} strokeWidth={brandStrokeWidth} />
          <g className="cm-head">
            <g className="cm-head-shape">
              <circle className="cm-head-halo" r="24" filter={`url(#${haloId})`} />
              <circle className="cm-head-core" r="10" />
            </g>
          </g>
        </g>

        <g clipPath={`url(#${clipId})`}>
          <g className="cm-scan">
            <line
              className="cm-scan-glow"
              x1="-200"
              y1="-200"
              x2="200"
              y2="200"
              stroke={`url(#${beamId})`}
              strokeWidth="14"
              filter={`url(#${beamGlowId})`}
            />
            <line
              x1="-200"
              y1="-200"
              x2="200"
              y2="200"
              stroke={`url(#${beamId})`}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
      </svg>

      <div className="cm-status">
        <span className="cm-dot">
          <span className="cm-dot-busy" />
          <span className="cm-dot-ring" />
        </span>
        <span className="cm-status-label">
          <span className="cm-label-busy">Integrando</span>
          <span className="cm-label-done">En operación</span>
        </span>
      </div>
    </div>
  );
}
