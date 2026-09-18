"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { ContinuityFallback } from "./continuity-fallback";

const ContinuityScene = dynamic(
  () => import("./continuity-scene").then((module) => module.ContinuityScene),
  { ssr: false, loading: () => <ContinuityFallback /> }
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

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 700px)");

    const update = () => {
      setProfile({
        compact: compact.matches,
        reduced: reduced.matches,
        enabled: true,
      });
    };

    // Initialize immediately
    update();

    reduced.addEventListener("change", update);
    compact.addEventListener("change", update);

    return () => {
      reduced.removeEventListener("change", update);
      compact.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="assembly-canvas" ref={container} aria-hidden="true">
      <SceneBoundary>
        {profile.enabled && !failed ? (
          <ContinuityScene
            key={`${profile.compact}-${profile.reduced}`}
            compact={profile.compact}
            reduced={profile.reduced}
            onFailure={() => setFailed(true)}
            onRestore={() => setFailed(false)}
          />
        ) : (
          <ContinuityFallback />
        )}
      </SceneBoundary>
    </div>
  );
}
