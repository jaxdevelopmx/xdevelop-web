"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ContinuityFallback } from "./continuity-fallback";

gsap.registerPlugin(ScrollTrigger);

const cobalt = new THREE.Color("#2457ff");
const brandPurple = new THREE.Color("#7F00FD");
const signal = new THREE.Color("#ff5a36");
const positions = [-1.5, -0.5, 0.5, 1.5];

type MotionState = {
  progress: number;
  x: number;
  y: number;
  act: number; // 1, 2, or 3
};

function Assembly({ compact, reduced }: { compact: boolean; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const indicators = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const state = useRef<MotionState>({
    progress: reduced ? 1 : 0,
    x: 0,
    y: 0,
    act: reduced ? 3 : 1,
  });
  const { invalidate, gl } = useThree();

  useEffect(() => {
    const motion = state.current;
    const story = document.getElementById("continuity-story");
    if (!story) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.to(motion, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: compact ? story.querySelector(".assembly-stage") : story,
          start: compact ? "top 80%" : "top top",
          end: compact ? "bottom 20%" : "bottom bottom",
          scrub: compact ? 0.3 : 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            motion.act = p < 0.38 ? 1 : p < 0.72 ? 2 : 3;

            // Update status text on HTML caption if available
            const statusText = document.querySelector(".assembly-status-text");
            if (statusText) {
              if (motion.act === 1) {
                statusText.textContent = "01 · Entender lo existente";
              } else if (motion.act === 2) {
                statusText.textContent = "02 · Integrar el equipo";
              } else {
                statusText.textContent = "03 · Sistema operando";
              }
            }
            invalidate();
          },
        },
      });

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    });

    const move = (event: PointerEvent) => {
      if (reduced || event.pointerType !== "mouse") return;
      const rect = gl.domElement.getBoundingClientRect();
      gsap.to(motion, {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 0.14,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 0.1,
        duration: 0.5,
        overwrite: "auto",
        onUpdate: invalidate,
      });
    };

    const leave = () => {
      gsap.to(motion, {
        x: 0,
        y: 0,
        duration: 0.6,
        overwrite: "auto",
        onUpdate: invalidate,
      });
    };

    const canvas = gl.domElement;
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);

    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });

    // Ensure initial render
    invalidate();

    return () => {
      mounted = false;
      media.revert();
      gsap.killTweensOf(motion);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [compact, gl, invalidate, reduced]);

  useFrame(({ clock }) => {
    const progress = reduced ? 1 : state.current.progress;
    // Act 1: 0.0 - 0.38 (Separation / Inspection)
    // Act 2: 0.38 - 0.75 (Alignment / Integration)
    // Act 3: 0.75 - 1.0 (Assembly / Operating Pulse)

    const spread = Math.sin(Math.min(progress / 0.85, 1) * Math.PI);
    const assembly = THREE.MathUtils.smoothstep(progress, 0.45, 0.88);
    const isOperating = assembly > 0.85;

    // Steady operational pulse in Act 3
    const pulse = isOperating ? 0.35 + 0.3 * Math.sin(clock.elapsedTime * 2.8) : 0.4;

    if (root.current) {
      root.current.rotation.set(
        0.12 + state.current.y + (1 - assembly) * 0.08,
        -0.48 + progress * 0.22 + state.current.x,
        (1 - assembly) * 0.04
      );
    }

    layers.current.forEach((layer, index) => {
      if (!layer) return;
      const offset = index - 1.5;
      layer.position.set(
        (1 - assembly) * (index === 2 ? 0.45 : index === 0 ? -0.2 : 0) + spread * offset * 0.14,
        offset * (0.63 + spread * 0.52),
        (1 - assembly) * (index === 3 ? -0.28 : index === 1 ? 0.12 : 0)
      );
      layer.rotation.y = (1 - assembly) * (index === 2 ? -0.16 : index === 0 ? 0.08 : 0);
    });

    indicators.current.forEach((material, index) => {
      if (!material) return;
      // Start orange/signal in Act 1, transition to cobalt and brand purple in Act 2 & 3
      const targetColor = index % 2 === 0 ? cobalt : brandPurple;
      material.color.copy(signal).lerp(targetColor, assembly);
      material.emissive.copy(material.color);
      material.emissiveIntensity = isOperating ? pulse : 0.42;
    });

    // Keep invalidating if in operational pulse so light breathes smoothly
    if (isOperating && !reduced) {
      invalidate();
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#8997ad", 2.2]} />
      <directionalLight
        position={[3, 7, 4]}
        intensity={3.6}
        castShadow={!compact}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-4, 2, -3]} intensity={2} color="#b9caff" />

      <group ref={root}>
        {positions.map((_, index) => (
          <group
            key={index}
            ref={(node) => {
              layers.current[index] = node;
            }}
            position={[0, (index - 1.5) * 0.63, 0]}
          >
            <RoundedBox
              args={[3.05, 0.14, 2.12]}
              radius={0.055}
              smoothness={compact ? 2 : 3}
              castShadow={!compact}
              receiveShadow
            >
              <meshStandardMaterial color="#aeb7c6" metalness={0.72} roughness={0.34} />
            </RoundedBox>
            <RoundedBox
              args={[2.9, 0.035, 1.98]}
              position={[0, 0.09, 0]}
              radius={0.016}
              smoothness={compact ? 1 : 2}
              receiveShadow
            >
              <meshStandardMaterial color="#e0e5ed" metalness={0.35} roughness={0.45} />
            </RoundedBox>

            {[-1, 1].map((side) => (
              <group key={side} position={[side * 0.72, 0.24, 0]}>
                <RoundedBox
                  args={[1.2, 0.28, 1.48]}
                  radius={0.075}
                  smoothness={compact ? 2 : 3}
                  castShadow={!compact}
                  receiveShadow
                >
                  <meshStandardMaterial
                    color={index === 1 && side === 1 ? "#2457ff" : "#fafbfd"}
                    metalness={0.08}
                    roughness={0.3}
                  />
                </RoundedBox>
                {Array.from({ length: compact ? 3 : 5 }, (_, slot) => (
                  <mesh key={slot} position={[-0.38 + slot * (compact ? 0.3 : 0.16), 0.144, 0.05]}>
                    <boxGeometry args={[0.025, 0.008, 0.65]} />
                    <meshStandardMaterial
                      color={index === 1 && side === 1 ? "#1640c8" : "#cdd4df"}
                      roughness={0.7}
                    />
                  </mesh>
                ))}
                <mesh position={[-0.36, 0.04, 0.746]}>
                  <boxGeometry args={[0.3, 0.038, 0.012]} />
                  <meshStandardMaterial
                    ref={(material) => {
                      indicators.current[index * 2 + (side === 1 ? 1 : 0)] = material;
                    }}
                    color={index > 1 ? "#ff5a36" : "#2457ff"}
                    emissive={index > 1 ? "#ff5a36" : "#2457ff"}
                    emissiveIntensity={0.45}
                  />
                </mesh>
                <mesh position={[0.34, 0.04, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.047, 0.047, 0.022, 12]} />
                  <meshStandardMaterial color="#101b35" roughness={0.5} />
                </mesh>
              </group>
            ))}

            {[-1.35, 1.35].flatMap((x) =>
              [-0.86, 0.86].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow={!compact}>
                  <cylinderGeometry args={[0.045, 0.045, 0.34, 12]} />
                  <meshStandardMaterial color="#aeb7c6" metalness={0.85} roughness={0.23} />
                </mesh>
              ))
            )}

            <mesh position={[0, 0.115, 0]}>
              <boxGeometry args={[0.08, 0.014, 1.8]} />
              <meshStandardMaterial color="#2457ff" metalness={0.4} roughness={0.25} />
            </mesh>
          </group>
        ))}

        <RoundedBox
          args={[3.32, 0.18, 2.38]}
          position={[0, -1.48, 0]}
          radius={0.075}
          smoothness={compact ? 2 : 3}
          receiveShadow
          castShadow={!compact}
        >
          <meshStandardMaterial color="#101b35" metalness={0.4} roughness={0.4} />
        </RoundedBox>
      </group>

      {!compact && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.61, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <shadowMaterial transparent opacity={0.13} />
        </mesh>
      )}
    </>
  );
}

function ContextGuard({ onFailure, onRestore }: { onFailure: () => void; onRestore?: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL Context Lost — preventing default to allow auto-restoration");
      onFailure();
    };
    const handleRestored = () => {
      console.info("WebGL Context Restored successfully");
      onRestore?.();
    };

    canvas.addEventListener("webglcontextlost", handleLost);
    canvas.addEventListener("webglcontextrestored", handleRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleLost);
      canvas.removeEventListener("webglcontextrestored", handleRestored);
    };
  }, [gl, onFailure, onRestore]);

  return null;
}

export function ContinuityScene({
  compact,
  reduced,
  onFailure,
  onRestore,
}: {
  compact: boolean;
  reduced: boolean;
  onFailure: () => void;
  onRestore?: () => void;
}) {
  return (
    <Canvas
      shadows={compact ? false : "percentage"}
      frameloop="demand"
      camera={{ position: [5.4, 3.7, 7.8], fov: compact ? 38 : 36 }}
      dpr={compact ? 1 : [1, 1.5]}
      gl={{
        antialias: !compact,
        alpha: true,
        powerPreference: "high-performance",
      }}
      fallback={<ContinuityFallback />}
    >
      <ContextGuard onFailure={onFailure} onRestore={onRestore} />
      <Assembly compact={compact} reduced={reduced} />
    </Canvas>
  );
}
