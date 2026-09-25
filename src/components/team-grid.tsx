"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin, SplitText);

/** Barrido de la señal de IA a lo ancho de la retícula: rápido y lineal. */
const sweepDuration = 0.9;
/** Relevo entre filas: la fila de abajo toma el trabajo un instante después. */
const rowHandoff = 0.2;

type TeamGridProps = {
  roles: string[][];
  statement: string;
};

/**
 * Retícula de roles de "La IA hizo posible empezar…". Una señal (la IA) cruza la
 * retícula y, al pasar, cada rol se activa: su número se decodifica, se enciende
 * su punto de estado y aparece su contenido. El HTML del servidor ya es el estado
 * final; sin JS o con reduced-motion no se anima nada.
 */
export function TeamGrid({ roles, statement }: TeamGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;
      const media = gsap.matchMedia(root);

      media.add(
        {
          wide: "(min-width: 701px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 700px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { wide } = context.conditions as { wide: boolean; narrow: boolean };
          const grid = root.querySelector<HTMLElement>(".role-grid");
          const trace = root.querySelector<HTMLElement>(".role-trace");
          const head = root.querySelector<HTMLElement>(".role-head");
          const statementEl = root.querySelector<HTMLElement>(".continuity-statement");
          if (!grid || !trace || !head || !statementEl) return;

          const cells = gsap.utils.toArray<HTMLElement>(".role", grid);
          const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;

          const hide = (cell: HTMLElement) => {
            const q = gsap.utils.selector(cell);
            gsap.set(q(".role-dot"), { scale: 0 });
            gsap.set(q(".role-num"), { autoAlpha: 0 });
            gsap.set(q("h3, p"), { autoAlpha: 0, y: 18 });
          };

          const activate = (cell: HTMLElement, tl: gsap.core.Timeline, at: number) => {
            const q = gsap.utils.selector(cell);
            const num = q(".role-num")[0] as HTMLElement | undefined;
            tl.to(q(".role-dot"), { scale: 1, duration: 0.35, ease: "back.out(3)" }, at)
              .fromTo(
                q(".role-dot-ring"),
                { scale: 1, autoAlpha: 0.7 },
                { scale: 3.2, autoAlpha: 0, duration: 0.7, ease: "power2.out" },
                at
              )
              .to(num ?? [], { autoAlpha: 1, duration: 0.12 }, at)
              .to(
                num ?? [],
                { scrambleText: { text: num?.textContent ?? "", chars: "0123456789" }, duration: 0.45, ease: "none" },
                at
              )
              .to(q("h3, p"), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, at + 0.05);
          };

          // Ya visible al montar (recarga o scroll restaurado): no se desarma lo que
          // el servidor pintó. Misma regla que MotionReveal y ClosingMark.
          if (wide && !inView(grid)) {
            cells.forEach(hide);
            const setTrace = gsap.quickSetter(trace, "scaleX");
            const setHeadX = gsap.quickSetter(head, "x", "px");
            gsap.set(trace, { scaleX: 0 });

            // Se mide al arrancar, no al montar: el layout ya está asentado.
            const play = contextSafe(() => {
              const width = grid.clientWidth;
              const rows = [...new Set(cells.map((cell) => cell.offsetTop))].sort((a, b) => a - b);
              const sweep = { progress: 0 };
              const tl = gsap.timeline();

              gsap.set([trace, head], { autoAlpha: 1 });
              tl.to(
                sweep,
                {
                  progress: 1,
                  duration: sweepDuration,
                  ease: "none",
                  onUpdate: () => {
                    setTrace(sweep.progress);
                    setHeadX(sweep.progress * width);
                  },
                },
                0
              );
              cells.forEach((cell) => {
                const at = 0.1 + (cell.offsetLeft / width) * sweepDuration + rows.indexOf(cell.offsetTop) * rowHandoff;
                activate(cell, tl, at);
              });
              tl.to([trace, head], { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, sweepDuration + 0.15);
            });

            ScrollTrigger.create({
              trigger: grid,
              start: "top 72%",
              once: true,
              refreshPriority: -1,
              onEnter: play,
            });
          }

          // Una columna: cada rol se activa al entrar en pantalla.
          if (!wide) {
            const pending = cells.filter((cell) => !inView(cell));
            pending.forEach(hide);
            if (pending.length) {
              ScrollTrigger.batch(pending, {
                start: "top 85%",
                once: true,
                onEnter: contextSafe((batch: Element[]) => {
                  const tl = gsap.timeline();
                  batch.forEach((cell, index) => activate(cell as HTMLElement, tl, index * 0.12));
                }),
              });
            }
          }

          // Remate: el cuadro de señal gira a su sitio y la frase entra palabra por palabra.
          if (!inView(statementEl)) {
            const copy = statementEl.querySelector(".continuity-copy");
            const mark = statementEl.querySelector(".continuity-mark");
            if (copy && mark) {
              const split = SplitText.create(copy, { type: "words" });
              gsap.set(mark, { scale: 0, rotation: -90 });
              gsap.set(split.words, { autoAlpha: 0, y: "0.35em" });

              ScrollTrigger.create({
                trigger: statementEl,
                start: "top 85%",
                once: true,
                refreshPriority: -1,
                onEnter: contextSafe(() => {
                  gsap
                    .timeline()
                    .to(mark, { scale: 1, rotation: 0, duration: 0.55, ease: "back.out(2.2)" }, 0)
                    .to(split.words, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.03, ease: "power3.out" }, 0.12)
                    // Las palabras envueltas en inline-block abren el interlineado: se deshace al terminar.
                    .call(() => split.revert());
                }),
              });
            }
          }
        }
      );

      return () => media.revert();
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <div className="role-grid">
        {roles.map(([title, text], index) => (
          <article className="role" key={title} data-exit>
            <span className="role-index">
              <span className="role-dot" aria-hidden="true">
                <span className="role-dot-ring" />
              </span>
              <span className="role-num">0{index + 1}</span>
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
        {/* Van después de los roles para no alterar los :nth-child de la retícula. */}
        <span className="role-trace" aria-hidden="true" />
        <span className="role-head" aria-hidden="true" />
      </div>
      <div className="continuity-statement" data-exit>
        <span className="continuity-mark" aria-hidden="true" />
        <span className="continuity-copy">{statement}</span>
      </div>
    </div>
  );
}
