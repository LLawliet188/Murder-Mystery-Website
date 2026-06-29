"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { floorFor } from "@/lib/i18n/content";
import { useLang } from "@/lib/i18n/lang";
import { useAudio } from "@/lib/audio-context";
import { useT } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

type RoomState = "opened" | "available" | "locked";

/**
 * The crime-scene plan, played as a strategic investigation. Players may only
 * search a limited number of rooms (the `budget` — one per guest), so they must
 * choose: some rooms hold evidence, others are dead ends. Opened rooms reveal a
 * clue and join the evidence log; once the budget is spent, the rest stay sealed.
 */
export function FloorPlanMap({
  slug,
  accent = "#c41e3a",
  budget,
}: {
  slug: string;
  accent?: string;
  budget?: number;
}) {
  const { lang } = useLang();
  const plan = floorFor(slug, lang);
  const reduce = useReducedMotion();
  const { playSfx } = useAudio();
  const t = useT();
  const [opened, setOpened] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  if (!plan) return null;

  const total = plan.rooms.length;
  const limit = Math.max(1, Math.min(budget ?? total, total));
  const used = opened.length;
  const remaining = Math.max(0, limit - used);
  const constrained = limit < total;
  const active = plan.rooms.find((r) => r.id === activeId) ?? null;

  const stateOf = (id: string): RoomState =>
    opened.includes(id) ? "opened" : used >= limit ? "locked" : "available";

  const investigate = (id: string) => {
    const st = stateOf(id);
    if (st === "opened") {
      setActiveId(id);
      playSfx("click");
      return;
    }
    if (st === "locked") {
      playSfx("click");
      return;
    }
    setOpened((p) => [...p, id]);
    setActiveId(id);
    playSfx("reveal");
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* investigation budget */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <span className="font-type text-xs uppercase tracking-[0.2em] text-gold/80">
          {constrained ? t("fp.investigateN", { limit, total }) : t("fp.investigate")}
        </span>
        {constrained && (
          <span className="font-serif text-sm italic text-smoke">
            {remaining > 0
              ? remaining === 1
                ? t("fp.remaining1")
                : t("fp.remaining", { n: remaining })
              : t("fp.spent")}
          </span>
        )}
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 100 72"
          className="w-full rounded-2xl border border-gold/20 bg-[#0b0a11] shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]"
          role="img"
          aria-label={`Floor plan: ${plan.title}`}
        >
          <rect x="2.5" y="2.5" width="95" height="67" rx="2" fill="none" stroke="rgba(201,162,39,0.4)" strokeWidth="0.7" />
          <rect x="4" y="4" width="92" height="64" rx="1.5" fill="none" stroke="rgba(201,162,39,0.12)" strokeWidth="0.4" />

          {plan.rooms.map((r, i) => {
            const st = stateOf(r.id);
            const isActive = r.id === activeId;
            const cx = r.x + r.w / 2;
            const cy = r.y + r.h / 2;
            const fill =
              st === "opened"
                ? `${accent}30`
                : st === "locked"
                ? "rgba(255,255,255,0.02)"
                : `${accent}10`;
            const stroke = isActive
              ? "rgba(233,185,107,0.85)"
              : st === "opened"
              ? "rgba(233,185,107,0.45)"
              : st === "locked"
              ? "rgba(201,162,39,0.12)"
              : "rgba(201,162,39,0.35)";
            const numColor =
              st === "locked" ? "rgba(201,162,39,0.2)" : isActive || st === "opened" ? "rgba(233,185,107,0.9)" : "rgba(201,162,39,0.45)";
            return (
              <g key={r.id}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="1.4"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.4"
                  style={{ transition: "fill 0.4s, stroke 0.4s" }}
                />
                <text x={cx} y={cy + 1.4} textAnchor="middle" fontSize="4" fill={numColor} style={{ fontFamily: "var(--font-cinzel), serif" }}>
                  {i + 1}
                </text>
                {i === 0 && (
                  <text x={r.x + r.w - 4.5} y={r.y + 5.5} textAnchor="middle" fontSize="5" fill="rgba(196,30,58,0.7)">
                    ✕
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* clickable hotspots */}
        {plan.rooms.map((r) => {
          const cx = r.x + r.w / 2;
          const cy = r.y + r.h / 2;
          const st = stateOf(r.id);
          const isActive = r.id === activeId;
          return (
            <button
              key={r.id}
              onClick={() => investigate(r.id)}
              style={{ left: `${cx}%`, top: `${cy}%` }}
              aria-label={
                st === "opened"
                  ? t("fp.reexamine", { room: r.label })
                  : st === "locked"
                  ? t("fp.locked", { room: r.label })
                  : t("fp.search", { room: r.label })
              }
              aria-pressed={isActive}
              className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            >
              <span className="relative grid h-5 w-5 place-items-center">
                {st === "available" && !reduce && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(196,30,58,0.55), transparent 70%)", animation: "pulse-glow 2.4s ease-in-out infinite" }}
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "relative grid place-items-center rounded-full border transition-all duration-300",
                    st === "opened"
                      ? "h-3 w-3 border-amber-glow bg-amber-glow shadow-[0_0_14px_4px_rgba(233,185,107,0.7)]"
                      : st === "locked"
                      ? "h-3 w-3 border-smoke-dim/50 bg-black/60 text-[6px] text-smoke-dim"
                      : "h-2.5 w-2.5 border-crimson-bright bg-crimson shadow-[0_0_12px_3px_rgba(196,30,58,0.6)] group-hover:scale-110 group-focus-visible:scale-110",
                    isActive && "scale-125"
                  )}
                >
                  {st === "locked" && <span aria-hidden>🔒</span>}
                </span>
              </span>
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

      {/* the clue just uncovered */}
      <div className="mt-4 min-h-[4.5rem]">
        {active && opened.includes(active.id) ? (
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
            {remaining > 0 ? t("fp.hint") : t("fp.done")}
          </p>
        )}
      </div>

      {/* evidence log — the rooms already searched */}
      {opened.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 font-type text-[0.65rem] uppercase tracking-[0.2em] text-gold/70">{t("fp.evidence")}</p>
          <ul className="space-y-2">
            {opened.map((id) => {
              const r = plan.rooms.find((x) => x.id === id);
              if (!r) return null;
              return (
                <li key={id}>
                  <button
                    onClick={() => investigate(id)}
                    className="flex w-full items-start gap-3 rounded-xl border border-gold/15 bg-black/30 p-3 text-left transition-colors hover:border-gold/40"
                  >
                    <span className="mt-0.5 text-crimson-bright" aria-hidden>▸</span>
                    <span>
                      <span className="font-display text-sm text-amber-glow">{r.label}</span>
                      <span className="mt-0.5 block font-serif text-sm italic leading-snug text-parchment-dim">{r.clue}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
