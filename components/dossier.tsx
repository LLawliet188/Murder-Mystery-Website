"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParty } from "@/lib/party-context";
import { useRank, rankFor } from "@/lib/rank";
import { openCluePack } from "@/lib/clue-pack";
import {
  DIFFICULTY_LABEL,
  rankCasesForParty,
  rosterFor,
  supportsParty,
  type MysteryCase,
} from "@/lib/cases";
import { CaseCover } from "./case-cover";
import { CaseCard } from "./case-card";
import { Skulls } from "./skulls";
import { Ornament } from "./ornament";
import { Reveal } from "./reveal";
import { FogTransition } from "./fog-transition";
import { FloorPlanMap } from "./floor-plan-map";
import { getFloorPlan } from "@/lib/floorplans";
import { cn } from "@/lib/utils";

export function Dossier({ mystery }: { mystery: MysteryCase }) {
  const { size, setSize } = useParty();
  const { markOpened } = useRank();
  const [fog, setFog] = useState(false);
  const [opened, setOpened] = useState(false);
  const [rankBump, setRankBump] = useState<string | null>(null);
  const kitRef = useRef<HTMLDivElement>(null);

  const range = Array.from({ length: mystery.playerMax - mystery.playerMin + 1 }, (_, i) => mystery.playerMin + i);
  const activeSize = size != null && supportsParty(mystery, size) ? size : mystery.ideal;
  const roster = rosterFor(mystery, activeSize);
  const outOfRange = size != null && !supportsParty(mystery, size);
  const plan = getFloorPlan(mystery.slug);

  const openCase = () => {
    setFog(true);
  };

  const onCovered = () => {
    setFog(false);
    setOpened(true);
    const { isNew, count } = markOpened(mystery.slug);
    if (isNew) {
      setRankBump(rankFor(count).current.title);
      setTimeout(() => setRankBump(null), 5000);
    }
    setTimeout(() => kitRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const more = rankCasesForParty(activeSize)
    .filter((c) => c.slug !== mystery.slug)
    .slice(0, 4);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[90svh] items-end overflow-hidden pt-16">
        <CaseCover mystery={mystery} sigilClassName="h-[42%] w-[42%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" />

        {/* wax seal + classified stamp */}
        <div className="absolute right-5 top-24 z-10 flex flex-col items-center gap-4 sm:right-10">
          <div className="wax-seal anim-seal-in grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
            <span className="font-display text-[0.6rem] tracking-[0.1em] text-amber-glow/90">VERDICT</span>
          </div>
          <span className="stamp anim-seal-in inline-block px-3 py-1 text-xs">Classified</span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
          <Link
            href="/cases"
            className="mb-6 inline-flex items-center gap-2 font-serif text-sm text-smoke transition-colors hover:text-amber"
          >
            <span aria-hidden>←</span> The Case Files
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-type text-xs uppercase tracking-[0.2em] text-gold/80">{mystery.era}</span>
            <span className="text-smoke-dim">·</span>
            <span className="font-type text-xs uppercase tracking-[0.2em] text-gold/80">{mystery.mood}</span>
          </div>

          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] text-parchment text-glow-gold">
            {mystery.title}
          </h1>

          <p className="mt-4 max-w-2xl font-serif fluid-lead italic text-parchment-dim">{mystery.teaser}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Meta label="Party" value={mystery.playerMin === mystery.playerMax ? `${mystery.playerMin}` : `${mystery.playerMin}–${mystery.playerMax}`} />
            <div className="flex flex-col">
              <span className="font-type text-[0.6rem] uppercase tracking-[0.2em] text-smoke">Difficulty</span>
              <Skulls value={mystery.difficulty} showLabel className="mt-1" />
            </div>
            <Meta label="Runtime" value={mystery.duration} />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={openCase} data-sfx="seal" className="btn-seal rounded-full px-8 py-4 text-base">
              Open the Case
            </button>
            <button
              onClick={() => openCluePack(mystery, activeSize)}
              className="rounded-full border border-gold/40 px-6 py-4 font-display text-sm uppercase tracking-[0.16em] text-gold transition-colors hover:border-gold hover:text-amber-glow"
            >
              Download Clue Pack
            </button>
          </div>
        </div>
      </section>

      {/* ===== BRIEFING ===== */}
      <section className="relative px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <TypeLabel>The Premise</TypeLabel>
            <p className="mt-3 font-body text-lg leading-relaxed text-parchment">{mystery.premise}</p>

            <TypeLabel className="mt-10">The Setting</TypeLabel>
            <p className="mt-3 font-body text-lg leading-relaxed text-parchment-dim">{mystery.setting}</p>

            <p
              data-clue
              className="clue-hidden mt-8 font-type text-sm italic text-crimson-bright"
            >
              ▸ Hold a light to the page… they say the killer always signs their work.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="paper hairline-gold relative rounded-2xl p-6">
              <span className="stamp absolute -right-3 -top-3 -rotate-6 px-2 py-1 text-[0.6rem]">Case File</span>
              <h3 className="font-display text-lg tracking-wide text-amber-glow">The File</h3>
              <dl className="mt-4 space-y-3">
                <FileRow label="Victim" value={mystery.victim} />
                <FileRow label="Era" value={mystery.era} />
                <FileRow label="Atmosphere" value={mystery.mood} />
                <FileRow label="Clearance" value={`${DIFFICULTY_LABEL[mystery.difficulty]} · ${mystery.difficulty}/5`} />
                <FileRow label="Est. Runtime" value={mystery.duration} />
                <FileRow
                  label="Party"
                  value={mystery.playerMin === mystery.playerMax ? `${mystery.playerMin} players` : `${mystery.playerMin}–${mystery.playerMax} players`}
                />
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SCENE OF THE CRIME ===== */}
      {plan && (
        <section className="relative px-4 py-12 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-3 text-center">
              <Ornament />
              <p className="mt-6 font-type text-xs uppercase tracking-[0.24em] text-gold/70">{plan.title}</p>
              <h2 className="mt-2 font-display fluid-h2 text-parchment">The Scene of the Crime</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <FloorPlanMap slug={mystery.slug} accent={mystery.palette.accent} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== ROSTER ===== */}
      <section className="relative px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-3 text-center">
            <Ornament />
            <h2 className="mt-6 font-display fluid-h2 text-parchment">The Suspects</h2>
          </Reveal>

          <Reveal delay={0.05} className="mb-10 flex flex-col items-center gap-3">
            <p className="font-serif fluid-lead italic text-smoke">
              {activeSize} will sit at your table tonight.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-type text-[0.6rem] uppercase tracking-[0.2em] text-smoke">Roster for</span>
              {range.map((n) => (
                <button
                  key={n}
                  onClick={() => setSize(n)}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full border font-display text-base transition-all",
                    n === activeSize
                      ? "border-gold bg-gold/15 text-amber-glow text-glow-gold"
                      : "border-smoke-dim/40 text-smoke hover:border-gold/60 hover:text-amber"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
            {outOfRange && (
              <p className="font-type text-xs text-crimson-bright/80">
                Your party of {size} is off-roster here — showing the {activeSize}-player cast.
              </p>
            )}
          </Reveal>

          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {roster.map((s, i) => (
                <motion.div
                  key={s.name}
                  layout
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="glass group relative overflow-hidden rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <SuspectPortrait accent={mystery.palette.accent} />
                    <div>
                      <h3 className="font-display text-lg leading-tight text-parchment">{s.name}</h3>
                      <p className="font-type text-[0.65rem] uppercase tracking-[0.16em] text-gold/80">{s.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 font-serif text-[0.98rem] italic leading-relaxed text-parchment-dim">
                    &ldquo;{s.line}&rdquo;
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ===== HOST'S KIT (gated) ===== */}
      <section ref={kitRef} className="relative scroll-mt-20 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {!opened ? (
                  <motion.div
                    key="sealed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <button onClick={openCase} data-sfx="seal" className="wax-seal mb-6 grid h-28 w-28 place-items-center transition-transform hover:scale-105" aria-label="Break the seal and open the case">
                      <span className="font-display text-sm tracking-[0.1em] text-amber-glow/90">OPEN</span>
                    </button>
                    <h2 className="font-display fluid-h2 text-parchment">This File Is Sealed</h2>
                    <p className="mt-3 max-w-md font-serif fluid-lead italic text-smoke">
                      Break the wax to unlock the host&apos;s kit — everything you need to run the night.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">The Case Is Open</p>
                    <h2 className="mt-2 font-display fluid-h2 text-parchment">Host&apos;s Kit</h2>
                    <p className="mt-3 max-w-2xl font-serif fluid-lead italic text-parchment-dim">
                      You hold the master file. Print the dossiers, seal the invitations, and let no
                      one know who you suspect.
                    </p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {mystery.included.map((item) => (
                        <li key={item} className="flex items-start gap-3 font-body text-parchment">
                          <SealBullet />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-4">
                      <button
                        onClick={() => openCluePack(mystery, activeSize)}
                        className="btn-seal rounded-full px-7 py-3.5 text-sm"
                      >
                        Open Printable Clue Pack
                      </button>
                      <Link
                        href="/how-it-works"
                        className="rounded-full border border-gold/40 px-6 py-3.5 font-display text-sm uppercase tracking-[0.16em] text-gold transition-colors hover:border-gold hover:text-amber-glow"
                      >
                        How to Run the Night
                      </Link>
                    </div>
                    <p className="mt-4 font-type text-xs text-smoke">
                      Includes character sheets for all {roster.length} suspects + a wax-sealed invitation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== MORE FOR YOUR PARTY ===== */}
      {more.length > 0 && (
        <section className="relative px-4 pb-28 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8">
              <h2 className="font-display fluid-h2 text-parchment">More for a Party of {activeSize}</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <CaseCard mystery={c} partySize={activeSize} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FogTransition active={fog} label="Breaking the seal…" onCovered={onCovered} />

      {/* Rank toast */}
      <AnimatePresence>
        {rankBump && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 left-1/2 z-[75] -translate-x-1/2"
          >
            <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
              <span className="text-amber-glow">★</span>
              <span className="font-serif text-sm text-parchment">
                Case opened — you rank as <span className="text-amber-glow text-glow-gold">{rankBump}</span>.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-type text-[0.6rem] uppercase tracking-[0.2em] text-smoke">{label}</span>
      <span className="mt-1 font-display text-xl text-parchment">{value}</span>
    </div>
  );
}

function TypeLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn("font-type text-sm uppercase tracking-[0.22em] text-crimson-bright", className)}>
      {children}
    </h3>
  );
}

function FileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-gold/10 pb-2.5">
      <dt className="font-type text-[0.6rem] uppercase tracking-[0.18em] text-smoke">{label}</dt>
      <dd className="text-right font-serif text-parchment">{value}</dd>
    </div>
  );
}

function SealBullet() {
  return (
    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-blood/80 text-[8px] text-amber-glow" aria-hidden>
      ✦
    </span>
  );
}

function SuspectPortrait({ accent }: { accent: string }) {
  return (
    <div
      className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/30"
      style={{ background: `radial-gradient(circle at 40% 30%, ${accent}22, #0a0a0f)` }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-smoke" fill="currentColor">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
      </svg>
    </div>
  );
}
