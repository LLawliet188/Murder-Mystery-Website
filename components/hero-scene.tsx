"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";

function AntiqueKey() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.35;
    // ease toward pointer for a subtle parallax
    const targetX = state.pointer.y * 0.3;
    const targetZ = -state.pointer.x * 0.25;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.05;
  });

  const brass = { color: "#c9a227", metalness: 0.85, roughness: 0.32, emissive: "#3a2a08", emissiveIntensity: 0.4 } as const;

  return (
    <group ref={group} rotation={[0.3, 0, 0]} scale={1.15}>
      {/* bow (handle ring) */}
      <mesh position={[0, 1.5, 0]}>
        <torusGeometry args={[0.85, 0.16, 24, 64]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      {/* inner flourish */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.06, 16, 40]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      {/* collar */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.22, 24]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      {/* shaft */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 2.6, 20]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      {/* tip */}
      <mesh position={[0, -2.05, 0]}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      {/* bit / teeth */}
      <mesh position={[0.34, -1.55, 0]}>
        <boxGeometry args={[0.55, 0.42, 0.14]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[0.5, -1.2, 0]}>
        <boxGeometry args={[0.22, 0.28, 0.14]} />
        <meshStandardMaterial {...brass} />
      </mesh>
    </group>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function HeroScene() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
  }, []);

  if (!mounted || !webgl || reduce) return <KeyFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.25} />
      {/* warm candle key light */}
      <pointLight position={[3, 4, 5]} intensity={70} color="#ffcf8a" />
      {/* crimson rim */}
      <pointLight position={[-5, -2, -3]} intensity={45} color="#c41e3a" />
      {/* cool fill */}
      <spotLight position={[-4, 6, 4]} angle={0.5} penumbra={1} intensity={30} color="#9fb6ff" />
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
        <AntiqueKey />
      </Float>
    </Canvas>
  );
}

/** Static, glowing key for reduced-motion or no-WebGL environments. */
function KeyFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <svg viewBox="0 0 100 100" className="anim-float h-2/3 w-2/3 text-gold text-glow-gold" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="26" r="15" />
          <circle cx="50" cy="26" r="6" />
          <path d="M50 41 V82" />
          <path d="M50 64 H62 M50 72 H58 M50 56 H60" />
        </g>
        <circle cx="50" cy="50" r="48" stroke="rgba(201,162,39,0.15)" />
      </svg>
    </div>
  );
}
