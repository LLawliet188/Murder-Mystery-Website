"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getFloorPlan } from "@/lib/floorplans";
import { cn } from "@/lib/utils";

/**
 * An illustrated crime-scene plan. Rooms are drawn as themed SVG; glowing
 * hotspots (real, focusable buttons) reveal a spoiler-safe clue with a sound.
 */
export function FloorPlanMap({ slug, accent = "#c41e3a" }: { slug: string; accent?: string }) {
  const plan = getFloorPlan(slug);
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  if (!plan) return null;
  const active = plan.rooms.find((r) => r.id === activeId) ?? null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative">
        <svg
          viewBox="0 0 100 72"
          className="w-full rounded-2xl border border-gold/20 bg-[#0b0a11] shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]"
          role="img"
          aria-label={`Floor plan: ${plan.title}`}
        >
          {/* outer wall */}
          <rect x="2.5" y="2.5" width="95" height="67" rx="2" fill="none" stroke="rgba(201,162,39,0.4)" strokeWidth="0.7" />
          <rect x="4" y="4" width="92" height="64" rx="1.5" fill="none" stroke="rgba(201,162,39,0.12)" strokeWidth="0.4" />

          {plan.rooms.map((r, i) => {
            const isActive = r.id === activeId;
            const cx = r.x + r.w / 2;
            const cy = r.y + r.h / 2;
            return (
              <g key={r.id}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="1.4"
                  fill={isActive ? `${accent}26` : `${accent}10`}
                  stroke={isActive ? "rgba(233,185,107,0.8)" : "rgba(201,162,39,0.35)"}
                  strokeWidth="0.4"
                  style={{ transition: "fill 0.4s, stroke 0.4s" }}
                />
                <text
                  x={cx}
                  y={cy + 1.4}
                  textAnchor="middle"
                  fontSize="4"
                  fill={isActive ? "rgba(233,185,107,0.9)" : "rgba(201,162,39,0.45)"}
                  style={{ fontFamily: "var(--font-cinzel), serif" }}
                >
                  {i + 1}
                </text>
                {/* victim marker in the first room */}
                {i === 0 && (
                  <text
                    x={r.x + r.w - 4.5}
                    y={r.y + 5.5}
                    textAnchor="middle"
                    fontSize="5"
                    fill="rgba(196,30,58,0.7)"
                  >
                    ✕
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* glowing, clickable hotspots (HTML, so labels can overflow rooms) */}
        {plan.rooms.map((r) => {
          const cx = r.x + r.w / 2;
          const cy = r.y + r.h / 2;
          const isActive = r.id === activeId;
          return (
            <button
              key={r.id}
              data-sfx="reveal"
              onClick={() => setActiveId(r.id)}
              style={{ left: `${cx}%`, top: `${cy}%` }}
              aria-label={`Examine ${r.label}`}
              aria-pressed={isActive}
              className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            >
              <span className="relative grid h-5 w-5 place-items-center">
                {!reduce && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(196,30,58,0.55), transparent 70%)",
                      animation: "pulse-glow 2.4s ease-in-out infinite",
                    }}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "relative h-2.5 w-2.5 rounded-full border transition-all duration-300",
                    isActive
                      ? "scale-125 border-amber-glow bg-amber-glow shadow-[0_0_14px_4px_rgba(233,185,107,0.7)]"
                      : "border-crimson-bright bg-crimson shadow-[0_0_12px_3px_rgba(196,30,58,0.6)] group-hover:scale-110 group-focus-visible:scale-110"
                  )}
                />
              </span>
              {/* hover/focus label chip */}
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-[calc(100%+4px)] -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-black/85 px-2 py-0.5 font-type text-[0.6rem] uppercase tracking-[0.14em] text-amber-glow opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                  isActive && "opacity-100"
                )}
              >
                {r.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* clue reveal */}
      <div className="mt-4 min-h-[4.5rem]">
        {active ? (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="paper hairline-gold rounded-2xl p-4 sm:p-5"
          >
            <h4 className="font-type text-xs uppercase tracking-[0.2em] text-crimson-bright">{active.label}</h4>
            <p className="mt-1.5 font-serif text-lg italic leading-relaxed text-parchment">{active.clue}</p>
          </motion.div>
        ) : (
          <p className="text-center font-serif italic text-smoke">
            Hold a light to each room — tap the glowing marks to examine the scene.
          </p>
        )}
      </div>
    </div>
  );
}
