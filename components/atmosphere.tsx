"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface Ember {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  hue: string;
}

interface Mote {
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  dx: number;
  dy: number;
  opacity: number;
}

/** Fixed full-screen atmosphere: drifting fog, film grain, vignette, scanlines,
 *  rising embers, and floating dust motes. All motion is skipped when the user
 *  prefers reduced motion. */
export function Atmosphere() {
  const reduce = useReducedMotion();
  const [embers, setEmbers] = useState<Ember[]>([]);
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => {
      const hues = ["#e9b96b", "#c41e3a", "#ffcf8a", "#c9a227"];
      setEmbers(
        Array.from({ length: 18 }, () => ({
          left: Math.random() * 100,
          delay: Math.random() * 14,
          duration: 12 + Math.random() * 14,
          size: 1 + Math.random() * 2.5,
          drift: (Math.random() - 0.5) * 120,
          hue: hues[Math.floor(Math.random() * hues.length)],
        }))
      );
      setMotes(
        Array.from({ length: 16 }, () => ({
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 12,
          duration: 16 + Math.random() * 16,
          size: 0.6 + Math.random() * 1.6,
          dx: (Math.random() - 0.5) * 60,
          dy: -20 - Math.random() * 50,
          opacity: 0.18 + Math.random() * 0.3,
        }))
      );
    }, 0);
    return () => window.clearTimeout(id);
  }, [reduce]);

  return (
    <>
      {/* drifting fog — sits behind page content */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute -inset-[15%]"
          style={{
            background:
              "radial-gradient(50% 40% at 22% 82%, rgba(150,165,195,0.12), transparent 60%), radial-gradient(45% 35% at 78% 72%, rgba(120,135,170,0.1), transparent 62%)",
            filter: "blur(14px)",
            willChange: "transform",
            animation: reduce ? undefined : "fog-drift 40s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -inset-[15%]"
          style={{
            background:
              "radial-gradient(40% 30% at 60% 92%, rgba(201,162,39,0.06), transparent 60%)",
            filter: "blur(16px)",
            willChange: "transform",
            animation: reduce ? undefined : "fog-drift 60s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="fx-vignette" aria-hidden />
      <div className="fx-scanline" aria-hidden />
      <div className="fx-grain" aria-hidden />

      {!reduce && (
        <div className="pointer-events-none fixed inset-0 z-[57] overflow-hidden" aria-hidden>
          {/* rising embers */}
          {embers.map((e, i) => (
            <span
              key={`e${i}`}
              className="absolute bottom-[-10px] rounded-full"
              style={{
                left: `${e.left}%`,
                width: e.size,
                height: e.size,
                background: e.hue,
                boxShadow: `0 0 ${e.size * 4}px ${e.hue}`,
                opacity: 0,
                animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
                ["--drift" as string]: `${e.drift}px`,
              }}
            />
          ))}
          {/* floating dust motes */}
          {motes.map((m, i) => (
            <span
              key={`m${i}`}
              className="absolute rounded-full bg-[#e9d8b0]"
              style={{
                left: `${m.left}%`,
                top: `${m.top}%`,
                width: m.size,
                height: m.size,
                opacity: 0,
                animation: `dust-float ${m.duration}s ease-in-out ${m.delay}s infinite`,
                ["--dust-x" as string]: `${m.dx}px`,
                ["--dust-y" as string]: `${m.dy}px`,
                ["--dust-opacity" as string]: m.opacity,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
