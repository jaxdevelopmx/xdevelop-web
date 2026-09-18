"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { ContinuityFallback } from "./continuity-fallback";
import { ContinuityLoader } from "./continuity-loader";

const ContinuityScene = dynamic(
  () => import("./continuity-scene").then((module) => module.ContinuityScene),
  { ssr: false, loading: () => <ContinuityLoader /> }
);

class SceneBoundary extends Component<{ children: ReactNode; onReset?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    console.warn("3D Scene Error handled gracefully:", error);
  }
  render() {
    return this.state.failed ? <ContinuityFallback /> : this.props.children;
  }
}

export function SceneLoader() {
  const container = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<{ compact: boolean; reduced: boolean; enabled: boolean }>({
    compact: false,
    reduced: false,
    enabled: true,
  });
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Defer scene bootstrapping out of the critical path: parse/compile the
    // three.js bundle only once the browser is idle, so it never delays LCP
    // or interactivity. The loader layer keeps the stage occupied meanwhile.
    const schedule = () => {
      const run = () => !cancelled && setIdle(true);
      const ric = (globalThis as { requestIdleCallback?: (cb: () => void, opt: { timeout: number }) => void })
        .requestIdleCallback;
      if (ric) {
        ric(run, { timeout: 2500 });
        return;
      }
      window.setTimeout(run, 200);
    };
    schedule();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // @react-three/fiber instantiates a THREE.Clock internally on every Canvas
    // mount, which logs a one-time "Clock deprecated" warning from three r183+.
    // Not actionable in our code until fiber migrates — filter exactly that
    // message so it doesn't clutter the console, nothing else is touched.
    const deprecatedClock = /Clock: This module has been deprecated/;
    const originalWarn = console.warn;
    console.warn = (message: unknown, ...args: unknown[]) => {
      if (typeof message === "string" && deprecatedClock.test(message)) return;
      originalWarn(message, ...args);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");

    const update = () => {
      setProfile({
        compact: compact.matches,
        reduced: reduced.matches,
        enabled: true,
      });
    };

    update();

    reduced.addEventListener("change", update);
    compact.addEventListener("change", update);

    return () => {
      console.warn = originalWarn;
      reduced.removeEventListener("change", update);
      compact.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="assembly-canvas" ref={container} aria-hidden="true">
      {/* Loader while WebGL boots; graceful 2D logo only if WebGL fails */}
      <div
        className="scene-layer scene-fallback-layer"
        style={{
          opacity: ready && !failed ? 0 : 1,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}
      >
        {failed ? <ContinuityFallback /> : <ContinuityLoader />}
      </div>

      {/* 3D WebGL Canvas Layer - smoothly fades in as soon as WebGL completes the initial paint */}
      <div
        className="scene-layer scene-webgl-layer"
        style={{
          opacity: ready && !failed ? 1 : 0,
          transition: "opacity 0.5s ease 0.25s",
        }}
      >
        <SceneBoundary>
          {profile.enabled && !failed && idle && (
            <ContinuityScene
              key={`${profile.compact}-${profile.reduced}`}
              compact={profile.compact}
              reduced={profile.reduced}
              onFailure={() => setFailed(true)}
              onRestore={() => setFailed(false)}
              onReady={() => setReady(true)}
            />
          )}
        </SceneBoundary>
      </div>
    </div>
  );
}
