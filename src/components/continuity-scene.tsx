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
const stableGreen = new THREE.Color("#2ee6a6");
const aluminum = new THREE.Color("#aeb7c6");
const traySilver = new THREE.Color("#e0e5ed");
const ceramicWhite = new THREE.Color("#fafbfd");
const darkChassis = new THREE.Color("#101b35");

type MotionState = {
  progress: number;
  x: number;
  y: number;
  act: number;
};

/**
 * Creates the exact parametric 2D bracket shape of the XDEVELOP logo isotype.
 * In unrotated space, the two brackets are centered symmetrically around (0, 0).
 * Rotated by -45° and 135°, they form the exact diamond emblem with flat cut tips.
 */
function createBracketShape(
  halfSize: number,
  thickness: number,
  radiusOut: number,
  armEnd: number
) {
  const shape = new THREE.Shape();
  const xOut = -halfSize;
  const yOutTop = halfSize;
  const yOutBot = -halfSize;
  const xIn = xOut + thickness;
  const yInTop = yOutTop - thickness;
  const yInBot = yOutBot + thickness;
  const radiusIn = Math.max(0.015, radiusOut - thickness);

  // Top arm tip (flat perpendicular cut at armEnd)
  shape.moveTo(armEnd, yOutTop);
  // Outer top horizontal edge to start of top-left fillet
  shape.lineTo(xOut + radiusOut, yOutTop);
  // Outer top-left corner arc (from PI/2 to PI)
  shape.absarc(xOut + radiusOut, yOutTop - radiusOut, radiusOut, Math.PI / 2, Math.PI, false);
  // Outer vertical spine down to start of bottom-left fillet
  shape.lineTo(xOut, yOutBot + radiusOut);
  // Outer bottom-left corner arc (from PI to 3*PI/2)
  shape.absarc(xOut + radiusOut, yOutBot + radiusOut, radiusOut, Math.PI, (3 * Math.PI) / 2, false);
  // Outer bottom horizontal edge to bottom arm tip
  shape.lineTo(armEnd, yOutBot);
  // Flat perpendicular cut at bottom arm tip
  shape.lineTo(armEnd, yInBot);
  // Inner bottom horizontal edge to start of inner bottom-left fillet
  shape.lineTo(xIn + radiusIn, yInBot);
  // Inner bottom-left corner arc (from 3*PI/2 to PI, clockwise)
  shape.absarc(xIn + radiusIn, yInBot + radiusIn, radiusIn, (3 * Math.PI) / 2, Math.PI, true);
  // Inner vertical spine up to start of inner top-left fillet
  shape.lineTo(xIn, yInTop - radiusIn);
  // Inner top-left corner arc (from PI to PI/2, clockwise)
  shape.absarc(xIn + radiusIn, yInTop - radiusIn, radiusIn, Math.PI, Math.PI / 2, true);
  // Inner top horizontal edge to top arm tip
  shape.lineTo(armEnd, yInTop);
  // Flat perpendicular cut at top arm tip back to start
  shape.lineTo(armEnd, yOutTop);
  shape.closePath();

  return shape;
}

/**
 * An individual modular bracket assembly built with technical layers,
 * machined aluminum top tray, and an embedded glowing optical light core
 * that strictly preserves the brand isotype silhouette.
 */
function ModularBracket({
  bracketGeo,
  trayGeo,
  opticalGeo,
  isLeft,
  compact,
  indicatorRef,
  warnRef,
}: {
  bracketGeo: THREE.BufferGeometry;
  trayGeo: THREE.BufferGeometry;
  opticalGeo: THREE.BufferGeometry;
  isLeft: boolean;
  compact: boolean;
  indicatorRef: (mat: THREE.MeshStandardMaterial | null) => void;
  warnRef: (mat: THREE.MeshStandardMaterial | null) => void;
}) {
  return (
    <group>
      {/* Layer 1: Structural Chassis Base in Dark Titanium Slate */}
      <mesh geometry={bracketGeo} position={[0, 0, -0.05]} castShadow={!compact} receiveShadow>
        <meshStandardMaterial color={darkChassis} metalness={0.65} roughness={0.34} />
      </mesh>

      {/* Layer 2: Precision Machined Surface Tray in Brushed Aluminum */}
      <mesh geometry={trayGeo} position={[0, 0, 0.08]} castShadow={!compact} receiveShadow>
        <meshStandardMaterial color={traySilver} metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Layer 3: Embedded Glowing Optical Track (Data Spine) */}
      <mesh geometry={opticalGeo} position={[0, 0, 0.125]}>
        <meshStandardMaterial
          ref={indicatorRef}
          color={signal}
          emissive={signal}
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Layer 4: Precision Hardware Details along the bracket */}
      {/* Titanium hex fasteners countersunk into the face */}
      {[-0.62, 0, 0.62].map((y, i) => (
        <mesh key={i} position={[-1.13, y, 0.12]} castShadow={!compact}>
          <cylinderGeometry args={[0.026, 0.026, 0.04, compact ? 8 : 12]} />
          <meshStandardMaterial color={aluminum} metalness={0.92} roughness={0.16} />
        </mesh>
      ))}
      <mesh position={[-0.74, 1.13, 0.12]} castShadow={!compact}>
        <cylinderGeometry args={[0.026, 0.026, 0.04, compact ? 8 : 12]} />
        <meshStandardMaterial color={aluminum} metalness={0.92} roughness={0.16} />
      </mesh>
      <mesh position={[-0.74, -1.13, 0.12]} castShadow={!compact}>
        <cylinderGeometry args={[0.026, 0.026, 0.04, compact ? 8 : 12]} />
        <meshStandardMaterial color={aluminum} metalness={0.92} roughness={0.16} />
      </mesh>

      {/* Flush Ceramic Micro-Module on top arm */}
      <group position={[-0.9, 1.13, 0.13]}>
        <mesh>
          <boxGeometry args={[0.22, 0.12, 0.05]} />
          <meshStandardMaterial color={isLeft ? ceramicWhite : cobalt} metalness={0.15} roughness={0.25} />
        </mesh>
      </group>

      {/* Flush Ceramic Micro-Module on bottom arm */}
      <group position={[-0.9, -1.13, 0.13]}>
        <mesh>
          <boxGeometry args={[0.22, 0.12, 0.05]} />
          <meshStandardMaterial color={isLeft ? cobalt : ceramicWhite} metalness={0.15} roughness={0.25} />
        </mesh>
      </group>

      {/* Risk beacons on arm tips - flicker while disassembled, settle to stable green when docked */}
      <mesh position={[-1.02, 1.13, 0.15]}>
        <sphereGeometry args={[0.026, compact ? 6 : 10, compact ? 6 : 10]} />
        <meshStandardMaterial
          ref={warnRef}
          color={signal}
          emissive={signal}
          emissiveIntensity={0.35}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-1.02, -1.13, 0.15]}>
        <sphereGeometry args={[0.026, compact ? 6 : 10, compact ? 6 : 10]} />
        <meshStandardMaterial
          ref={warnRef}
          color={signal}
          emissive={signal}
          emissiveIntensity={0.35}
          roughness={0.3}
        />
      </mesh>

      {/* Micro heat dissipation fins along outer spine */}
      {!compact &&
        [-0.35, -0.2, -0.05, 0.1, 0.25].map((y, i) => (
          <mesh key={i} position={[-1.24, y, 0.05]}>
            <boxGeometry args={[0.015, 0.07, 0.09]} />
            <meshStandardMaterial color="#8997ad" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}

      {/* Terminal Alignment Pins facing the gap */}
      <mesh position={[-0.58, 1.13, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.024, 0.024, 0.08, 10]} />
        <meshStandardMaterial color={aluminum} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-0.58, -1.13, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.024, 0.024, 0.08, 10]} />
        <meshStandardMaterial color={aluminum} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}


function ModularLogoAssembly({ compact, reduced }: { compact: boolean; reduced: boolean }) {
  const root = useRef<THREE.Group>(null);
  const bracket1 = useRef<THREE.Group>(null);
  const bracket2 = useRef<THREE.Group>(null);
  const indicator1 = useRef<THREE.MeshStandardMaterial | null>(null);
  const indicator2 = useRef<THREE.MeshStandardMaterial | null>(null);
  const connectorRods = useRef<THREE.Group>(null);
  const warnMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const bridgeMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const rimLight = useRef<THREE.PointLight>(null);
  const dockRef = useRef(0);
  const prevAssembly = useRef(0);
  const elapsed = useRef(0);

  const state = useRef<MotionState>({
    progress: reduced ? 1 : 0,
    x: 0,
    y: 0,
    act: reduced ? 3 : 1,
  });

  const { invalidate, gl } = useThree();

  // Create memoized bracket footprint profiles matching the exact logo isotype
  const { baseBracketGeo, midTrayGeo, opticalTrackGeo } = useMemo(() => {
    // Base structural chassis
    const bShape = createBracketShape(1.25, 0.24, 0.46, -0.58);
    const bGeo = new THREE.ExtrudeGeometry(bShape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: compact ? 2 : 4,
      steps: 1,
      bevelSize: 0.032,
      bevelThickness: 0.032,
    });

    // Inset brushed aluminum mid-tray
    const tShape = createBracketShape(1.235, 0.20, 0.44, -0.595);
    const tGeo = new THREE.ExtrudeGeometry(tShape, {
      depth: 0.07,
      bevelEnabled: true,
      bevelSegments: compact ? 1 : 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015,
    });

    // Recessed optical glowing light conduit
    const oShape = createBracketShape(1.22, 0.06, 0.38, -0.66);
    const oGeo = new THREE.ExtrudeGeometry(oShape, {
      depth: 0.03,
      bevelEnabled: false,
    });

    return { baseBracketGeo: bGeo, midTrayGeo: tGeo, opticalTrackGeo: oGeo };
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
            motion.act = p < 0.38 ? 1 : p < 0.72 ? 2 : 3;

            const statusText = document.querySelector(".assembly-status-text");
            if (statusText) {
              if (motion.act === 1) {
                statusText.textContent = "01 · Entender lo existente (Módulos separados)";
              } else if (motion.act === 2) {
                statusText.textContent = "02 · Integrar el equipo (Alineación y acople)";
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
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 0.18,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 0.14,
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

  useFrame((_, delta) => {
    const progress = reduced ? 1 : state.current.progress;
    const live = !reduced;
    const t = (elapsed.current += delta);

    // Narrative Acts:
    // Act 1: Exploded / separated diagnostic view
    // Act 2: Convergence, modular alignment & docking
    // Act 3: Complete XDEVELOP diamond emblem locked in place with living pulse
    const separation = 1 - THREE.MathUtils.smoothstep(progress, 0.24, 0.82);
    const assembly = THREE.MathUtils.smoothstep(progress, 0.42, 0.88);
    const isOperating = assembly > 0.85;

    const pulse = isOperating ? 0.45 + 0.4 * Math.sin(t * 3.2) : 0.45;

    if (root.current) {
      // Perspective pitch & yaw for 3D inspection in Act 1, settling into clean diamond in Act 3
      const pitch = 0.12 * separation + state.current.y;
      const yaw = -0.26 * separation + state.current.x;
      const idle = live ? Math.sin(t * 0.55) * 0.014 : 0;
      root.current.rotation.set(pitch, yaw, idle);

      // Idle hover in Act 3 keeps the assembled emblem alive
      root.current.position.y = live ? Math.sin(t * 1.1) * 0.045 : 0;

      // Controlled scale: comfortably contained at start (Act 1), gently expanding into emblem size in Act 3
      const currentScale = (compact ? 0.62 : 0.72) + 0.08 * (1 - separation);
      root.current.scale.setScalar(currentScale);
    }

    // Bracket 1 (Upper-Left bracket of the logo diamond)
    // Symmetrically separates along normal vector (-0.707, 0.707) with controlled offset so it stays fully in frame
    if (bracket1.current) {
      const offsetX = -0.34 * separation;
      const offsetY = 0.34 * separation;
      const offsetZ = 0.22 * separation;
      const rotZ = -Math.PI / 4 + separation * 0.12;
      const rotX = separation * 0.10;

      bracket1.current.position.set(offsetX, offsetY, offsetZ);
      bracket1.current.rotation.set(rotX, 0, rotZ);
    }

    // Bracket 2 (Lower-Right bracket of the logo diamond, 180° counterpart)
    // Symmetrically separates along (0.707, -0.707)
    if (bracket2.current) {
      const offsetX = 0.34 * separation;
      const offsetY = -0.34 * separation;
      const offsetZ = -0.22 * separation;
      const rotZ = (3 * Math.PI) / 4 - separation * 0.12;
      const rotX = -separation * 0.10;

      bracket2.current.position.set(offsetX, offsetY, offsetZ);
      bracket2.current.rotation.set(rotX, 0, rotZ);
    }

    // Inter-bracket laser coupling bridges inside the two gaps
    if (connectorRods.current) {
      connectorRods.current.scale.setScalar(assembly);
    }

    // Docking flash: single bright burst the moment the assembly locks home
    const crossed = prevAssembly.current < 0.9 && assembly >= 0.9;
    prevAssembly.current = assembly;
    if (live) {
      dockRef.current = crossed ? 1 : Math.max(0, dockRef.current - 0.045);
    } else {
      dockRef.current = 0;
    }

    // Coupling bridge glow - steady in Act 3, spikes briefly on the docking flash
    bridgeMats.current.forEach((mat, i) => {
      const base = i % 2 === 0 ? 0.8 : 1.2;
      mat.emissiveIntensity = Math.min(3, base + dockRef.current * 1.6);
    });

    if (rimLight.current) {
      rimLight.current.intensity = 1.4 + dockRef.current * 2.6;
    }

    // Risk beacons: fast orange/red flicker while separated, calm green once stable
    if (warnMats.current.length) {
      const warnColor = new THREE.Color();
      warnColor.copy(signal).lerp(stableGreen, assembly);
      for (let i = 0; i < warnMats.current.length; i++) {
        const mat = warnMats.current[i];
        const blink = 0.5 + 0.5 * Math.sin(t * (20 + 4 * (i % 3)) + i * 1.9);
        mat.emissiveIntensity = 0.15 + separation * (0.35 + 2.2 * blink);
        mat.color.copy(warnColor);
        mat.emissive.copy(warnColor);
      }
    }

    // Lighting transition:
    // Diagnostic warning (amber/signal) in Act 1 -> Cobalt in Act 2 -> Brand Violet with pulse in Act 3
    if (indicator1.current && indicator2.current) {
      const currentColor = new THREE.Color();
      if (assembly < 0.5) {
        currentColor.copy(signal).lerp(cobalt, assembly * 2);
      } else {
        currentColor.copy(cobalt).lerp(brandPurple, (assembly - 0.5) * 2);
      }

      indicator1.current.color.copy(currentColor);
      indicator1.current.emissive.copy(currentColor);
      indicator1.current.emissiveIntensity = pulse;

      indicator2.current.color.copy(currentColor);
      indicator2.current.emissive.copy(currentColor);
      indicator2.current.emissiveIntensity = pulse;
    }

    if (isOperating && !reduced) {
      invalidate();
    } else if (!reduced && warnMats.current.length && separation > 0.15) {
      invalidate();
    }
  });

  return (
    <>
      <ambientLight intensity={0.92} />
      <hemisphereLight args={["#ffffff", "#8997ad", 2.3]} />
      <directionalLight
        position={[4, 8, 5]}
        intensity={3.6}
        castShadow={!compact}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={4.5}
        shadow-camera-bottom={-4.5}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-4, -2, -3]} intensity={1.8} color="#b9caff" />
      <pointLight ref={rimLight} position={[0, 0, 2.2]} intensity={1.4} color="#7F00FD" distance={6} />

      <group ref={root}>
        {/* Upper-Left Modular Bracket */}
        <group ref={bracket1}>
          <ModularBracket
            bracketGeo={baseBracketGeo}
            trayGeo={midTrayGeo}
            opticalGeo={opticalTrackGeo}
            isLeft={true}
            compact={compact}
            indicatorRef={(el) => {
              indicator1.current = el;
            }}
            warnRef={(el) => {
              if (el) warnMats.current.push(el);
            }}
          />
        </group>

        {/* Lower-Right Modular Bracket */}
        <group ref={bracket2}>
          <ModularBracket
            bracketGeo={baseBracketGeo}
            trayGeo={midTrayGeo}
            opticalGeo={opticalTrackGeo}
            isLeft={false}
            compact={compact}
            indicatorRef={(el) => {
              indicator2.current = el;
            }}
            warnRef={(el) => {
              if (el) warnMats.current.push(el);
            }}
          />
        </group>

        {/* Optical Data Bus Bridges inside the two open gaps */}
        <group ref={connectorRods}>
          {/* Top-Right Gap Bridge */}
          <group position={[0.884, 0.884, 0.05]} rotation={[0, 0, Math.PI / 4]}>
            <mesh>
              <cylinderGeometry args={[0.032, 0.032, 0.64, compact ? 8 : 16]} />
              <meshStandardMaterial
                ref={(el) => {
                  if (el) bridgeMats.current[0] = el;
                }}
                color="#2457ff"
                emissive="#2457ff"
                emissiveIntensity={0.8}
                metalness={0.8}
              />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <cylinderGeometry args={[0.016, 0.016, 0.72, compact ? 6 : 10]} />
              <meshStandardMaterial
                ref={(el) => {
                  if (el) bridgeMats.current[1] = el;
                }}
                color="#7F00FD"
                emissive="#7F00FD"
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>

          {/* Bottom-Left Gap Bridge */}
          <group position={[-0.884, -0.884, 0.05]} rotation={[0, 0, Math.PI / 4]}>
            <mesh>
              <cylinderGeometry args={[0.032, 0.032, 0.64, compact ? 8 : 16]} />
              <meshStandardMaterial
                ref={(el) => {
                  if (el) bridgeMats.current[2] = el;
                }}
                color="#7F00FD"
                emissive="#7F00FD"
                emissiveIntensity={0.8}
                metalness={0.8}
              />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <cylinderGeometry args={[0.016, 0.016, 0.72, compact ? 6 : 10]} />
              <meshStandardMaterial
                ref={(el) => {
                  if (el) bridgeMats.current[3] = el;
                }}
                color="#2457ff"
                emissive="#2457ff"
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        </group>
      </group>

      {!compact && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.85, 0]} receiveShadow>
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
  onReady,
}: {
  compact: boolean;
  reduced: boolean;
  onFailure: () => void;
  onRestore?: () => void;
  onReady?: () => void;
}) {
  return (
    <Canvas
      shadows={compact ? false : "percentage"}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 6.4], fov: compact ? 40 : 35 }}
      dpr={compact ? 1 : [1, 1.5]}
      gl={{
        antialias: !compact,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={() => {
        // Signal that the WebGL context is initialized and ready for first paint
        requestAnimationFrame(() => {
          onReady?.();
        });
      }}
      fallback={<ContinuityFallback />}
    >
      <ContextGuard onFailure={onFailure} onRestore={onRestore} />
      <ModularLogoAssembly compact={compact} reduced={reduced} />
    </Canvas>
  );
}