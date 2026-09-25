"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brandBracketBottom, brandBracketTop, brandMarkCenter, brandMarkViewBox } from "@/lib/brand-mark";

gsap.registerPlugin(useGSAP);

/** Separación sobre el eje por el que abre el isotipo: arriba-izquierda y abajo-derecha. */
const bracketGap = 34;

export function NotFoundMark() {
  const markRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const enter = gsap.timeline({ defaults: { ease: "power3.out" } });

        enter
          .from(".nf-bracket-left", { x: -130, y: -130, autoAlpha: 0, duration: 1.1 })
          .from(".nf-bracket-right", { x: 130, y: 130, autoAlpha: 0, duration: 1.1 }, "<0.06")
          .from(".nf-code", { autoAlpha: 0, scale: 0.86, duration: 0.7, transformOrigin: "center" }, "-=0.42")
          .from(".nf-signal", { scaleX: 0, autoAlpha: 0, transformOrigin: "left center", duration: 0.6 }, "-=0.3");

        gsap.to(".nf-bracket-left", {
          x: -7,
          y: -7,
          duration: 3.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.1,
        });

        gsap.to(".nf-bracket-right", {
          x: 7,
          y: 7,
          duration: 3.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.1,
        });

        gsap.to(".nf-code", {
          y: -8,
          duration: 4.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        });
      });

      return () => media.revert();
    },
    { scope: markRef }
  );

  return (
    <svg
      ref={markRef}
      className="h-auto w-[min(100%,460px)] overflow-visible max-[900px]:w-[min(100%,300px)]"
      viewBox={brandMarkViewBox}
      fill="none"
      aria-hidden="true"
    >
      <g className="nf-bracket nf-bracket-left" transform={`translate(${-bracketGap} ${-bracketGap})`}>
        <g transform={`rotate(90 ${brandMarkCenter} ${brandMarkCenter})`}>
          <path d={brandBracketBottom} fill="var(--ink)" />
        </g>
      </g>
      <g className="nf-bracket nf-bracket-right" transform={`translate(${bracketGap} ${bracketGap})`}>
        <g transform={`rotate(90 ${brandMarkCenter} ${brandMarkCenter})`}>
          <path d={brandBracketTop} fill="var(--cobalt)" />
        </g>
      </g>
      <text
        className="nf-code fill-[var(--ink)] text-[104px] font-semibold tracking-[-0.06em] font-[var(--font-onest),system-ui,sans-serif]"
        x="280"
        y="312"
        textAnchor="middle"
      >
        404
      </text>
      <line className="nf-signal" x1="225" y1="344" x2="335" y2="344" stroke="var(--xdev-purple-primary)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
