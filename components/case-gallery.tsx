"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useParty } from "@/lib/party-context";
import {
  CASES,
  ERAS,
  MOODS,
  PARTY_SIZES,
  DIFFICULTY_LABEL,
  rankCasesForParty,
  supportsParty,
  fitForParty,
  type MysteryCase,
} from "@/lib/cases";
import { CaseCard } from "./case-card";
import { Skulls } from "./skulls";
import { Ornament } from "./ornament";
import { cn } from "@/lib/utils";

export function CaseGallery() {
  const { size, setSize, ready } = useParty();
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();

  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [era, setEra] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Sync party size from the ?players= URL param on entry.
  useEffect(() => {
    const p = searchParams.get("players");
    if (!p) return;
    const n = parseInt(p, 10);
    if (n >= 3 && n <= 6 && n !== size) setSize(n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setParty = (n: number | null) => {
    setSize(n);
    router.replace(n ? `/cases?players=${n}` : "/cases");
  };

  const { perfectCount, results } = useMemo(() => {
    let pool: MysteryCase[] = CASES;

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      pool = pool.filter((c) =>
        [c.title, c.teaser, c.era, c.mood, c.setting, c.premise].join(" ").toLowerCase().includes(q)
      );
    }
    if (difficulty != null) pool = pool.filter((c) => c.difficulty === difficulty);
    if (era) pool = pool.filter((c) => c.era === era);
    if (mood) pool = pool.filter((c) => c.mood === mood);

    let ordered: MysteryCase[];
    let perfect = 0;
    if (size != null) {
      const supported = rankCasesForParty(size, pool);
      perfect = supported.filter((c) => fitForParty(c, size) === "perfect").length;
      const unsupported = showAll ? pool.filter((c) => !supportsParty(c, size)) : [];
      ordered = [...supported, ...unsupported];
    } else {
      ordered = pool;
    }
    return { perfectCount: perfect, results: ordered };
  }, [query, difficulty, era, mood, size, showAll]);

  const dealMeACase = () => {
    const pickFrom = size != null ? results.filter((c) => supportsParty(c, size)) : results;
    const pool = pickFrom.length ? pickFrom : CASES;
    const choice = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/cases/${choice.slug}`);
  };

  const resetFilters = () => {
    setDifficulty(null);
    setEra(null);
    setMood(null);
    setQuery("");
    setShowAll(false);
  };

  const heading =
    size != null
      ? `Mysteries for a Party of ${size}`
      : "The Complete Case Files";

  return (
    <div className="relative min-h-[100svh] px-4 pb-28 pt-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">The Dossiers</p>
          <h1 className="mt-2 font-display fluid-h2 text-parchment">{heading}</h1>
          <p className="mt-3 font-serif fluid-lead italic text-smoke">
            {size != null ? (
              <>
                {results.length} cases on the table
                {perfectCount > 0 && (
                  <> — <span className="text-amber-glow">{perfectCount} perfect for your party.</span></>
                )}
              </>
            ) : (
              "Ten ways to get away with murder. Choose carefully."
            )}
          </p>
        </header>

        {/* Party selector strip */}
        <div className="glass mb-4 rounded-2xl p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-type text-[0.65rem] uppercase tracking-[0.2em] text-smoke">
                Party Size
              </span>
              <div className="flex items-center gap-2">
                <Chip active={size == null} onClick={() => setParty(null)}>
                  Any
                </Chip>
                {PARTY_SIZES.map((n) => (
                  <Chip key={n} active={size === n} onClick={() => setParty(n)}>
                    {n}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Whisper search */}
            <div className="relative w-full lg:max-w-xs">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-smoke">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Whisper a clue…"
                aria-label="Search the case files"
                className="w-full rounded-full border border-gold/20 bg-black/40 py-2.5 pl-10 pr-4 font-serif text-sm text-parchment placeholder:text-smoke-dim focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/40"
              />
            </div>
          </div>

          {/* Secondary filters */}
          <div className="mt-4 flex flex-col gap-4 border-t border-gold/10 pt-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <FilterRow label="Difficulty">
                <Chip active={difficulty == null} onClick={() => setDifficulty(null)}>
                  All
                </Chip>
                {[2, 3, 4, 5].map((d) => (
                  <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(difficulty === d ? null : d)}>
                    <Skulls value={d} />
                    <span className="ml-1.5 hidden sm:inline">{DIFFICULTY_LABEL[d]}</span>
                  </Chip>
                ))}
              </FilterRow>

              <FilterRow label="Era">
                <Chip active={era == null} onClick={() => setEra(null)}>
                  All
                </Chip>
                {ERAS.map((e) => (
                  <Chip key={e} active={era === e} onClick={() => setEra(era === e ? null : e)}>
                    {e}
                  </Chip>
                ))}
              </FilterRow>

              <FilterRow label="Mood">
                <Chip active={mood == null} onClick={() => setMood(null)}>
                  All
                </Chip>
                {MOODS.map((m) => (
                  <Chip key={m} active={mood === m} onClick={() => setMood(mood === m ? null : m)}>
                    {m}
                  </Chip>
                ))}
              </FilterRow>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {size != null && (
                <label className="flex cursor-pointer items-center gap-2 font-serif text-sm text-smoke">
                  <input
                    type="checkbox"
                    checked={showAll}
                    onChange={(e) => setShowAll(e.target.checked)}
                    className="h-4 w-4 accent-[#c9a227]"
                  />
                  Show off-roster cases
                </label>
              )}
              <button
                onClick={dealMeACase}
                className="btn-seal flex items-center gap-2 rounded-full px-5 py-2.5 text-xs"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" />
                  <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" />
                  <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" />
                  <circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" />
                </svg>
                Deal Me a Case
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {!ready ? null : results.length === 0 ? (
          <div className="py-24 text-center">
            <Ornament />
            <p className="mt-8 font-serif fluid-lead italic text-smoke">The case is still cooling…</p>
            <p className="mt-2 font-body text-parchment-dim">No mystery matches that combination.</p>
            <button onClick={resetFilters} className="btn-seal mt-8 rounded-full px-6 py-3 text-sm">
              Clear the Board
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {results.map((c) => {
                const off = size != null && !supportsParty(c, size);
                return (
                  <motion.div
                    key={c.slug}
                    layout={!reduce}
                    initial={{ opacity: 0, y: reduce ? 0 : 24, filter: "blur(6px)" }}
                    animate={{ opacity: off ? 0.55 : 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(off && "saturate-50")}
                  >
                    <CaseCard mystery={c} partySize={size} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 font-serif text-sm transition-all duration-300",
        active
          ? "border-gold bg-gradient-to-b from-gold/20 to-blood/20 text-amber-glow"
          : "border-smoke-dim/40 text-smoke hover:border-gold/50 hover:text-parchment"
      )}
    >
      {children}
    </button>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-16 shrink-0 font-type text-[0.65rem] uppercase tracking-[0.2em] text-smoke">
        {label}
      </span>
      {children}
    </div>
  );
}
