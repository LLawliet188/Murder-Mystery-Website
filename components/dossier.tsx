"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useParty } from "@/lib/party-context";
import { useRank, rankFor } from "@/lib/rank";
import { openCluePack } from "@/lib/clue-pack";
import { openMapPack } from "@/lib/map-pack";
import { rosterFor, supportsParty, type MysteryCase } from "@/lib/cases";
import { caseFor, scriptFor, floorFor, rankCasesFor } from "@/lib/i18n/content";
import { LANGS, useLang, type Lang } from "@/lib/i18n/lang";
import { useT } from "@/lib/i18n/ui";
import { CaseCover } from "./case-cover";
import { CaseCard } from "./case-card";
import { Skulls } from "./skulls";
import { Ornament } from "./ornament";
import { Reveal } from "./reveal";
import { FogTransition } from "./fog-transition";
import { FloorPlanMap } from "./floor-plan-map";
import { cn } from "@/lib/utils";

export function Dossier({ mystery: base }: { mystery: MysteryCase }) {
  const { size, setSize } = useParty();
  const { lang } = useLang();
  const t = useT();
  const { markOpened } = useRank();
  const [fog, setFog] = useState(false);
  const [opened, setOpened] = useState(false);
  const [rankBump, setRankBump] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"sealed" | "confirm" | "revealed">("sealed");
  const kitRef = useRef<HTMLDivElement>(null);

  const mystery = caseFor(base.slug, lang) ?? base;
  const range = Array.from({ length: mystery.playerMax - mystery.playerMin + 1 }, (_, i) => mystery.playerMin + i);
  const activeSize = size != null && supportsParty(mystery, size) ? size : mystery.ideal;
  const roster = rosterFor(mystery, activeSize);
  const outOfRange = size != null && !supportsParty(mystery, size);
  const plan = floorFor(mystery.slug, lang);
  const script = scriptFor(mystery.slug, lang);

  const playersValue =
    mystery.playerMin === mystery.playerMax
      ? t("dossier.f.playersFixed", { n: mystery.playerMin })
      : t("dossier.f.players", { min: mystery.playerMin, max: mystery.playerMax });

  const openCase = () => setFog(true);

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

  const more = rankCasesFor(activeSize, lang)
    .filter((c) => c.slug !== mystery.slug)
    .slice(0, 4);

  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[90svh] items-end overflow-hidden pt-16">
        <CaseCover mystery={mystery} sigilClassName="h-[42%] w-[42%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/30" />

        <div className="absolute right-5 top-24 z-10 flex flex-col items-center gap-4 sm:right-10">
          <div className="wax-seal anim-seal-in grid h-20 w-20 place-items-center sm:h-24 sm:w-24">
            <span className="font-display text-[0.6rem] tracking-[0.1em] text-amber-glow/90">VERDICT</span>
          </div>
          <span className="stamp anim-seal-in inline-block px-3 py-1 text-xs">{t("stamp.classified")}</span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8">
          <Link href="/cases" className="mb-6 inline-flex items-center gap-2 font-serif text-sm text-smoke transition-colors hover:text-amber">
            <span aria-hidden>←</span> {t("dossier.back")}
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-type text-xs uppercase tracking-[0.2em] text-gold/80">{t("era." + mystery.era)}</span>
            <span className="text-smoke-dim">·</span>
            <span className="font-type text-xs uppercase tracking-[0.2em] text-gold/80">{t("mood." + mystery.mood)}</span>
          </div>

          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[0.95] text-parchment text-glow-gold">
            {mystery.title}
          </h1>

          <p className="mt-4 max-w-2xl font-serif fluid-lead italic text-parchment-dim">{mystery.teaser}</p>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Meta
              label={t("dossier.party")}
              value={mystery.playerMin === mystery.playerMax ? `${mystery.playerMin}` : `${mystery.playerMin}–${mystery.playerMax}`}
            />
            <div className="flex flex-col">
              <span className="font-type text-[0.6rem] uppercase tracking-[0.2em] text-smoke">{t("dossier.difficulty")}</span>
              <Skulls value={mystery.difficulty} showLabel label={t("diff." + mystery.difficulty)} className="mt-1" />
            </div>
            <Meta label={t("dossier.runtime")} value={mystery.duration} />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={openCase} data-sfx="seal" className="btn-seal rounded-full px-8 py-4 text-base">
              {t("dossier.open")}
            </button>
            <PdfLanguageButtons labelKey="pdf.clueButton" onOpen={(target) => openCluePack(base, activeSize, target)} />
          </div>
        </div>
      </section>

      {/* ===== BRIEFING ===== */}
      <section className="relative px-4 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <TypeLabel>{t("dossier.premise")}</TypeLabel>
            <p className="mt-3 font-body text-lg leading-relaxed text-parchment">{mystery.premise}</p>

            <TypeLabel className="mt-10">{t("dossier.story")}</TypeLabel>
            <p className="mt-3 whitespace-pre-line font-serif text-xl italic leading-relaxed text-parchment-dim">{mystery.story}</p>

            <TypeLabel className="mt-10">{t("dossier.setting")}</TypeLabel>
            <p className="mt-3 font-body text-lg leading-relaxed text-parchment-dim">{mystery.setting}</p>

            <p data-clue className="clue-hidden mt-8 font-type text-sm italic text-crimson-bright">
              {t("dossier.clue.hidden")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="paper hairline-gold relative rounded-2xl p-6">
              <span className="stamp absolute -right-3 -top-3 -rotate-6 px-2 py-1 text-[0.6rem]">{t("stamp.caseFile")}</span>
              <h3 className="font-display text-lg tracking-wide text-amber-glow">{t("dossier.file")}</h3>
              <dl className="mt-4 space-y-3">
                <FileRow label={t("dossier.f.victim")} value={mystery.victim} />
                <FileRow label={t("dossier.f.era")} value={t("era." + mystery.era)} />
                <FileRow label={t("dossier.f.atmosphere")} value={t("mood." + mystery.mood)} />
                <FileRow label={t("dossier.f.clearance")} value={`${t("diff." + mystery.difficulty)} · ${mystery.difficulty}/5`} />
                <FileRow label={t("dossier.f.runtime")} value={mystery.duration} />
                <FileRow label={t("dossier.f.party")} value={playersValue} />
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
              <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("dossier.scene")}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <FloorPlanMap slug={mystery.slug} accent={mystery.palette.accent} budget={activeSize} />
              <div className="mt-6 text-center">
                <PdfLanguageButtons labelKey="pdf.mapButton" onOpen={(target) => openMapPack(base, activeSize, target)} align="center" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== ROSTER ===== */}
      <section className="relative px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-3 text-center">
            <Ornament />
            <h2 className="mt-6 font-display fluid-h2 text-parchment">{t("dossier.suspects")}</h2>
          </Reveal>

          <Reveal delay={0.05} className="mb-10 flex flex-col items-center gap-3">
            <p className="font-serif fluid-lead italic text-smoke">{t("dossier.willSit", { n: activeSize })}</p>
            <div className="flex items-center gap-2">
              <span className="font-type text-[0.6rem] uppercase tracking-[0.2em] text-smoke">{t("dossier.rosterFor")}</span>
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
                {t("dossier.offRoster", { n: size ?? 0, active: activeSize })}
              </p>
            )}
          </Reveal>

          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {roster.map((s, i) => (
                <motion.div
                  key={i}
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
                  <motion.div key="sealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                    <button onClick={openCase} data-sfx="seal" className="wax-seal mb-6 grid h-28 w-28 place-items-center transition-transform hover:scale-105" aria-label={t("dossier.sealedTitle")}>
                      <span className="font-display text-sm tracking-[0.1em] text-amber-glow/90">{t("dossier.openLabel")}</span>
                    </button>
                    <h2 className="font-display fluid-h2 text-parchment">{t("dossier.sealedTitle")}</h2>
                    <p className="mt-3 max-w-md font-serif fluid-lead italic text-smoke">{t("dossier.sealedBody")}</p>
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("dossier.caseOpen")}</p>
                    <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("dossier.kit")}</h2>
                    <p className="mt-3 max-w-2xl font-serif fluid-lead italic text-parchment-dim">{t("dossier.kitBody")}</p>

                    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                      {mystery.included.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 font-body text-parchment">
                          <SealBullet />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-4">
                      <PdfLanguageButtons
                        labelKey="pdf.clueButton"
                        onOpen={(target) => openCluePack(base, activeSize, target)}
                        variant="seal"
                      />
                      <Link href="/how-it-works" className="rounded-full border border-gold/40 px-6 py-3.5 font-display text-sm uppercase tracking-[0.16em] text-gold transition-colors hover:border-gold hover:text-amber-glow">
                        {t("dossier.howToRun")}
                      </Link>
                    </div>
                    <p className="mt-4 font-type text-xs text-smoke">{t("dossier.kitIncludes", { n: roster.length })}</p>

                    {script && (
                      <div className="mt-12 border-t border-gold/15 pt-10">
                        <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("dossier.forHost")}</p>
                        <h3 className="mt-2 font-display text-2xl text-amber-glow">{t("dossier.rounds")}</h3>

                        <div className="paper hairline-gold mt-6 rounded-2xl p-5 sm:p-6">
                          <p className="font-type text-[0.65rem] uppercase tracking-[0.18em] text-crimson-bright">{t("dossier.readAloudOpening")}</p>
                          <p className="mt-2 font-serif text-lg italic leading-relaxed text-parchment">{script.intro}</p>
                        </div>

                        <div className="mt-6 space-y-5">
                          {script.rounds.map((r, ri) => (
                            <div key={ri} className="glass rounded-2xl p-5 sm:p-6">
                              <h4 className="font-display text-lg text-parchment">{r.name}</h4>
                              <p className="mt-3 font-serif italic leading-relaxed text-parchment-dim">
                                <span className="mr-2 font-type text-[0.58rem] uppercase tracking-[0.16em] text-crimson-bright">{t("dossier.readAloud")}</span>
                                {" "}
                                {r.narration}
                              </p>
                              <p className="mt-2 font-body text-sm leading-relaxed text-smoke">
                                <span className="mr-2 font-type text-[0.58rem] uppercase tracking-[0.16em] text-gold/70">{t("dossier.hostDirects")}</span>
                                {" "}
                                {r.instructions}
                              </p>
                              <ul className="mt-3 space-y-1.5">
                                {r.clues.map((c, ci) => (
                                  <li key={ci} className="flex items-start gap-2 font-body text-sm text-parchment-dim">
                                    <span className="mt-1 text-crimson-bright" aria-hidden>▸</span>
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="mt-12 border-t border-crimson/20 pt-8">
                          <p className="font-type text-xs uppercase tracking-[0.24em] text-crimson-bright/80">{t("dossier.verdict")}</p>
                          <h4 className="mt-2 font-display text-2xl text-parchment">{t("dossier.whoDidIt")}</h4>
                          <p className="mt-2 max-w-xl font-serif italic leading-relaxed text-smoke">{t("dossier.verdictHint")}</p>

                          <div className="mt-5">
                            {verdict === "sealed" && (
                              <button onClick={() => setVerdict("confirm")} className="btn-seal rounded-full px-7 py-3.5 text-sm">
                                {t("dossier.breakSeal")}
                              </button>
                            )}
                            {verdict === "confirm" && (
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="font-serif italic text-parchment-dim">{t("dossier.confirmAccused")}</span>
                                <button onClick={() => setVerdict("revealed")} data-sfx="reveal" className="rounded-full border border-crimson px-6 py-3 font-display text-sm uppercase tracking-[0.16em] text-crimson-bright transition-colors hover:text-amber-glow">
                                  {t("dossier.revealKiller")}
                                </button>
                                <button onClick={() => setVerdict("sealed")} className="rounded-full border border-smoke-dim/40 px-5 py-3 font-display text-sm uppercase tracking-[0.16em] text-smoke transition-colors hover:text-parchment">
                                  {t("dossier.notYet")}
                                </button>
                              </div>
                            )}
                            {verdict === "revealed" && (
                              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="paper rounded-2xl border border-crimson/40 p-5 sm:p-6">
                                <p className="font-type text-[0.65rem] uppercase tracking-[0.18em] text-crimson-bright">{t("dossier.theReveal")}</p>
                                <p className="mt-2 font-serif text-lg italic leading-relaxed text-parchment">{script.reveal}</p>
                                <p className="mt-4 font-type text-[0.65rem] uppercase tracking-[0.18em] text-crimson-bright">{t("dossier.whyHow")}</p>
                                <p className="mt-2 font-body leading-relaxed text-parchment-dim">{script.hostNote}</p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
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
              <h2 className="font-display fluid-h2 text-parchment">{t("dossier.more", { n: activeSize })}</h2>
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

      <FogTransition active={fog} label={t("dossier.breakSeal")} onCovered={onCovered} />

      {/* Rank toast */}
      <AnimatePresence>
        {rankBump && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-24 left-1/2 z-[75] -translate-x-1/2">
            <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
              <span className="text-amber-glow">★</span>
              <span className="font-serif text-sm text-parchment">{t("dossier.rankToast", { rank: t("rank." + rankBump) })}</span>
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
  return <h3 className={cn("font-type text-sm uppercase tracking-[0.22em] text-crimson-bright", className)}>{children}</h3>;
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

function PdfLanguageButtons({
  labelKey,
  onOpen,
  variant = "outline",
  align = "start",
}: {
  labelKey: string;
  onOpen: (lang: Lang) => void;
  variant?: "outline" | "seal";
  align?: "start" | "center";
}) {
  const t = useT();
  const label = t(labelKey);
  const className =
    variant === "seal"
      ? "btn-seal rounded-full px-5 py-3 text-xs"
      : "rounded-full border border-gold/40 px-5 py-3 font-display text-xs uppercase tracking-[0.14em] text-gold transition-colors hover:border-gold hover:text-amber-glow";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", align === "center" && "justify-center")}>
      {LANGS.map((target) => (
        <button key={target.code} onClick={() => onOpen(target.code)} className={className} title={`${label} · ${target.label}`}>
          {label} · {target.short}
        </button>
      ))}
    </div>
  );
}

function SuspectPortrait({ accent }: { accent: string }) {
  return (
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/30" style={{ background: `radial-gradient(circle at 40% 30%, ${accent}22, #0a0a0f)` }} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-smoke" fill="currentColor">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
      </svg>
    </div>
  );
}
