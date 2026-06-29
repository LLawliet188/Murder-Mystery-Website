"use client";

import { Reveal } from "./reveal";
import { useT } from "@/lib/i18n/ui";

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

const STEPS = [
  {
    n: "I",
    key: "step1",
    icon: (
      <svg viewBox="0 0 32 32" {...stroke}>
        <circle cx="11" cy="12" r="4" />
        <circle cx="22" cy="13" r="3" />
        <path d="M4 26c0-4 3-7 7-7s7 3 7 7M18 26c0-3 2-5 4-5s4 2 4 5" />
      </svg>
    ),
  },
  {
    n: "II",
    key: "step2",
    icon: (
      <svg viewBox="0 0 32 32" {...stroke}>
        <rect x="6" y="5" width="14" height="20" rx="2" transform="rotate(-8 13 15)" />
        <rect x="12" y="7" width="14" height="20" rx="2" transform="rotate(7 19 17)" />
      </svg>
    ),
  },
  {
    n: "III",
    key: "step3",
    icon: (
      <svg viewBox="0 0 32 32" {...stroke}>
        <path d="M6 10c0-3 4-4 10-4s10 1 10 4v14c0 3-4 4-10 4S6 27 6 24z" />
        <path d="M11 14c1-2 9-2 10 0M13 19h6" />
      </svg>
    ),
  },
  {
    n: "IV",
    key: "step4",
    icon: (
      <svg viewBox="0 0 32 32" {...stroke}>
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20l7 7" />
      </svg>
    ),
  },
];

export function StepsGrid() {
  const t = useT();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s, i) => (
        <Reveal key={s.n} delay={i * 0.1}>
          <div className="glass group relative h-full overflow-hidden rounded-2xl p-6">
            <span className="absolute -right-2 -top-3 font-display text-7xl text-gold/10 transition-colors group-hover:text-gold/20">
              {s.n}
            </span>
            <div className="relative mb-4 grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-amber-glow">
              <span className="h-6 w-6">{s.icon}</span>
            </div>
            <h3 className="relative font-display text-lg tracking-wide text-parchment">{t(s.key + ".t")}</h3>
            <p className="relative mt-2 font-body text-[0.95rem] leading-relaxed text-parchment-dim">{t(s.key + ".d")}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
