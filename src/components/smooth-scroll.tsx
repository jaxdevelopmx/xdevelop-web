"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

export function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposeScroll: (() => void) | undefined;

    const syncMotionPreference = () => {
      disposeScroll?.();
      disposeScroll = undefined;
      if (motionPreference.matches) return;

      const lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        anchors: true,
        lerp: 0.085,
      });
      instance = lenis;

      const onScroll = () => ScrollTrigger.update();
      const onTick = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", onScroll);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      disposeScroll = () => {
        lenis.off("scroll", onScroll);
        gsap.ticker.remove(onTick);
        lenis.destroy();
        if (instance === lenis) instance = null;
      };
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      disposeScroll?.();
    };
  }, []);

  return children;
}
