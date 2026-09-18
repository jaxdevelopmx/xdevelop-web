"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { brandBracketBottom, brandBracketTop, brandMarkCenter, brandMarkViewBox } from "@/lib/brand-mark";

gsap.registerPlugin(useGSAP);

const bracketGap = 52;

export function NotFoundMark() {
  const markRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const enter = gsap.timeline({ defaults: { ease: "power3.out" } });

        enter
          .from(".nf-bracket-left", { x: -180, autoAlpha: 0, duration: 1.1 })
          .from(".nf-bracket-right", { x: 180, autoAlpha: 0, duration: 1.1 }, "<0.06")
          .from(".nf-code", { autoAlpha: 0, scale: 0.86, duration: 0.7, transformOrigin: "center" }, "-=0.42")
          .from(".nf-signal", { scaleX: 0, autoAlpha: 0, transformOrigin: "left center", duration: 0.6 }, "-=0.3");

        gsap.to(".nf-bracket-left", {
          x: -10,
          duration: 3.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.1,
        });

        gsap.to(".nf-bracket-right", {
          x: 10,
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
    <svg ref={markRef} className="not-found-mark" viewBox={brandMarkViewBox} fill="none" aria-hidden="true">
      <g transform={`rotate(45 ${brandMarkCenter} ${brandMarkCenter})`}>
        <g className="nf-bracket nf-bracket-left" transform={`translate(${-bracketGap} 0)`}>
          <path d={brandBracketBottom} fill="var(--ink)" />
        </g>
        <g className="nf-bracket nf-bracket-right" transform={`translate(${bracketGap} 0)`}>
          <path d={brandBracketTop} fill="var(--cobalt)" />
        </g>
      </g>
      <text className="nf-code" x="276" y="308" textAnchor="middle">
        404
      </text>
      <line className="nf-signal" x1="220" y1="352" x2="332" y2="352" stroke="var(--xdev-purple-primary)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
