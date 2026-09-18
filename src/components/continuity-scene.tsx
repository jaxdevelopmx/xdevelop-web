"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ContinuityFallback } from "./continuity-fallback";

gsap.registerPlugin(ScrollTrigger);

const cobalt = new THREE.Color("#2457ff");
const brandPurple = new THREE.Color("#7F00FD");
const signal = new THREE.Color("#ff5a36");
const neutralWhite = new THREE.Color("#f4f7fb");

type MotionState = {
  progress: number;
  x: number;
  y: number;
  act: number;
};

/**
 * Generates the precise 2D shape of the XDEVELOP bracket with rounded corners and rounded end caps.
 */
function createLogoBracketShape(height = 2.4, armLength = 0.82, thickness = 0.26, cornerRadius = 0.42) {
  const shape = new THREE.Shape();
  const halfH = height / 2;
  const r = cornerRadius;
  const t = thickness;
  const w = armLength;
  const capR = t / 2;

  // Top arm inner edge
  shape.moveTo(t + r, halfH - t);
  // Inner top-left corner
  shape.absarc(t + r, halfH - t - r, r, Math.PI / 2, Math.PI, false);
  // Inner vertical spine
  shape.lineTo(t, -halfH + t + r);
  // Inner bottom-left corner
  shape.absarc(t + r, -halfH + t + r, r, Math.PI, (3 * Math.PI) / 2, false);
  // Bottom arm inner edge
  shape.lineTo(w - capR, -halfH + t);
  // Rounded bottom cap
  shape.absarc(w - capR, -halfH + capR, capR, -Math.PI / 2, Math.PI / 2, false);
  // Bottom arm outer edge
  shape.lineTo(r, -halfH);
  // Outer bottom-left corner
  shape.absarc(r, -halfH + r, r, (3 * Math.PI) / 2, Math.PI, false);
  // Outer vertical spine
  shape.lineTo(0, halfH - r);
  // Outer top-left corner
  shape.absarc(r, halfH - r, r, Math.PI, Math.PI / 2, false);
  // Top arm outer edge
  shape.lineTo(w - capR, halfH);
  // Rounded top cap
  shape.absarc(w - capR, halfH - capR, capR, Math.PI / 2, -Math.PI / 2, false);
  shape.closePath();

  return shape;
}

/**
 * Inner glowing core path that runs through the spine of each bracket.
 */
function createGlowTrackShape(height = 2.1, armLength = 0.68, thickness = 0.08, cornerRadius = 0.36) {
  const shape = new THREE.Shape();
  const halfH = height / 2;
  const r = cornerRadius;
  const t = thickness;
  const w = armLength;
  const capR = t / 2;

  shape.moveTo(t + r, halfH - t);
  shape.absarc(t + r, halfH - t - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(t, -halfH + t + r);
  shape.absarc(t + r, -halfH + t + r, r, Math.PI, (3 * Math.PI) / 2, false);
  shape.lineTo(w - capR, -halfH + t);
  shape.absarc(w - capR, -halfH + capR, capR, -Math.PI / 2, Math.PI / 2, false);
  shape.lineTo(r, -halfH);
  shape.absarc(r, -halfH + r, r, (3 * Math.PI) / 2, Math.PI, false);
  shape.lineTo(0, halfH - r);
  shape.absarc(r, halfH - r, r, Math.PI, Math.PI / 2, false);
  shape.lineTo(w - capR, halfH);
  shape.absarc(w - capR, halfH - capR, capR, Math.PI / 2, -Math.PI / 2, false);
  shape.closePath();

  return shape;
}

function LogoAssembly({ compact, reduced }: { compact: boolean; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const bracket1 = useRef<THREE.Group>(null);
  const bracket2 = useRef<THREE.Group>(null);
  const glowMat1 = useRef<THREE.MeshStandardMaterial>(null);
  const glowMat2 = useRef<THREE.MeshStandardMaterial>(null);
  const connectorGroup = useRef<THREE.Group>(null);

  const state = useRef<MotionState>({
    progress: reduced ? 1 : 0,
    x: 0,
    y: 0,
    act: reduced ? 3 : 1,
  });

  const { invalidate, gl } = useThree();

  // Create memoized bracket geometries
  const { bracketGeo, glowGeo, pinGeo } = useMemo(() => {
    const bShape = createLogoBracketShape(2.5, 0.9, 0.28, 0.44);
    const gShape = createGlowTrackShape(2.2, 0.72, 0.08, 0.38);

    const bGeo = new THREE.ExtrudeGeometry(bShape, {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: compact ? 2 : 4,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
    });
    bGeo.center();

    const gGeo = new THREE.ExtrudeGeometry(gShape, {
      depth: 0.04,
      bevelEnabled: false,
    });
    gGeo.center();

    const pGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.75, compact ? 8 : 16);

    return { bracketGeo: bGeo, glowGeo: gGeo, pinGeo: pGeo };
  }, [compact]);

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
            motion.act = p < 0.36 ? 1 : p < 0.72 ? 2 : 3;

            const statusText = document.querySelector(".assembly-status-text");
            if (statusText) {
              if (motion.act === 1) {
                statusText.textContent = "01 · Entender lo existente (Módulos separados)";
              } else if (motion.act === 2) {
                statusText.textContent = "02 · Integrar el equipo (Alineación y ensamble)";
              } else {
                statusText.textContent = "03 · Sistema operando (Emblema XDEVELOP activo)";
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
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 0.16,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 0.12,
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

    // Smoothstep transitions for the 3 Acts:
    // Act 1 (0.0 -> 0.36): Disassembled, tilted, inspecting parts, warning amber light
    // Act 2 (0.36 -> 0.75): Converging, aligning, connecting, shifting to cobalt & violet
    // Act 3 (0.75 -> 1.0): Complete diamond lock, breathing operational pulse
    const separation = 1 - THREE.MathUtils.smoothstep(progress, 0.25, 0.82);
    const assembly = THREE.MathUtils.smoothstep(progress, 0.45, 0.9);
    const isOperating = assembly > 0.85;

    const time = clock.elapsedTime;
    const pulse = isOperating ? 0.38 + 0.35 * Math.sin(time * 2.8) : 0.42;

    // Overall root orientation:
    // When assembled, forms the iconic XDEVELOP diamond (45 degree rotation)
    if (root.current) {
      // In Act 1, slightly more isometric to show 3D depth and thickness.
      // In Act 3, settles into a clean, majestic 3D presentation facing the camera with slight pitch.
      const pitch = 0.18 * separation + state.current.y;
      const yaw = -0.32 * separation + state.current.x;
      root.current.rotation.set(pitch, yaw, 0);
    }

    // Bracket 1 (Upper-Left bracket of the diamond)
    if (bracket1.current) {
      const offsetX = -0.42 - separation * 0.95;
      const offsetY = 0.42 + separation * 0.75;
      const offsetZ = separation * 0.7;
      const rotZ = -Math.PI / 4 + separation * 0.25;
      const rotX = separation * 0.2;

      bracket1.current.position.set(offsetX, offsetY, offsetZ);
      bracket1.current.rotation.set(rotX, 0, rotZ);
    }

    // Bracket 2 (Lower-Right bracket of the diamond, symmetrical counterpart)
    if (bracket2.current) {
      const offsetX = 0.42 + separation * 0.95;
      const offsetY = -0.42 - separation * 0.75;
      const offsetZ = -separation * 0.7;
      const rotZ = (3 * Math.PI) / 4 - separation * 0.25;
      const rotX = -separation * 0.2;

      bracket2.current.position.set(offsetX, offsetY, offsetZ);
      bracket2.current.rotation.set(rotX, 0, rotZ);
    }

    // Connector pins bridging the two brackets
    if (connectorGroup.current) {
      connectorGroup.current.position.set(0, 0, 0);
      connectorGroup.current.scale.setScalar(assembly);
    }

    // Dynamic light color evolution:
    // Signal/Orange (#ff5a36) in Act 1 -> Cobalt (#2457ff) in Act 2 -> Brand Violet (#7F00FD) in Act 3
    if (glowMat1.current && glowMat2.current) {
      const currentColor = new THREE.Color();
      if (assembly < 0.5) {
        currentColor.copy(signal).lerp(cobalt, assembly * 2);
      } else {
        currentColor.copy(cobalt).lerp(brandPurple, (assembly - 0.5) * 2);
      }

      glowMat1.current.color.copy(currentColor);
      glowMat1.current.emissive.copy(currentColor);
      glowMat1.current.emissiveIntensity = pulse;

      glowMat2.current.color.copy(currentColor);
      glowMat2.current.emissive.copy(currentColor);
      glowMat2.current.emissiveIntensity = pulse;
    }

    if (isOperating && !reduced) {
      invalidate();
    }
  });

  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight args={["#ffffff", "#8997ad", 2.4]} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={3.8}
        castShadow={!compact}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-4, -2, -3]} intensity={1.8} color="#b9caff" />
      <pointLight position={[0, 0, 2]} intensity={1.5} color="#7F00FD" distance={6} />

      <group ref={root} scale={compact ? 0.9 : 1.15}>
        {/* Bracket 1 (Upper-Left) */}
        <group ref={bracket1}>
          <mesh geometry={bracketGeo} castShadow={!compact} receiveShadow>
            <meshStandardMaterial
              color={neutralWhite}
              metalness={0.52}
              roughness={0.24}
            />
          </mesh>

          {/* Glowing core track along the spine */}
          <mesh geometry={glowGeo} position={[0, 0, 0.2]}>
            <meshStandardMaterial
              ref={glowMat1}
              color={signal}
              emissive={signal}
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
          <mesh geometry={glowGeo} position={[0, 0, -0.2]}>
            <meshStandardMaterial
              color={signal}
              emissive={signal}
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Bracket 2 (Lower-Right) */}
        <group ref={bracket2}>
          <mesh geometry={bracketGeo} castShadow={!compact} receiveShadow>
            <meshStandardMaterial
              color={neutralWhite}
              metalness={0.52}
              roughness={0.24}
            />
          </mesh>

          {/* Glowing core track along the spine */}
          <mesh geometry={glowGeo} position={[0, 0, 0.2]}>
            <meshStandardMaterial
              ref={glowMat2}
              color={signal}
              emissive={signal}
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
          <mesh geometry={glowGeo} position={[0, 0, -0.2]}>
            <meshStandardMaterial
              color={signal}
              emissive={signal}
              emissiveIntensity={0.4}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Dynamic Connector Pins that bridge the diamond tips */}
        <group ref={connectorGroup}>
          <mesh geometry={pinGeo} position={[0, 1.42, 0]} rotation={[0, 0, Math.PI / 4]}>
            <meshStandardMaterial color="#2457ff" emissive="#2457ff" emissiveIntensity={0.6} metalness={0.8} />
          </mesh>
          <mesh geometry={pinGeo} position={[0, -1.42, 0]} rotation={[0, 0, Math.PI / 4]}>
            <meshStandardMaterial color="#7F00FD" emissive="#7F00FD" emissiveIntensity={0.6} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {!compact && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <shadowMaterial transparent opacity={0.14} />
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
      camera={{ position: [0, 0, 5.8], fov: compact ? 42 : 38 }}
      dpr={compact ? 1 : [1, 1.5]}
      gl={{
        antialias: !compact,
        alpha: true,
        powerPreference: "high-performance",
      }}
      fallback={<ContinuityFallback />}
    >
      <ContextGuard onFailure={onFailure} onRestore={onRestore} />
      <LogoAssembly compact={compact} reduced={reduced} />
    </Canvas>
  );
}
