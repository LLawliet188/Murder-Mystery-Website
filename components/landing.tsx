"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroScene } from "./hero-scene";
import { PlayerCountSelector } from "./player-count-selector";
import { CaseCard } from "./case-card";
import { StepsGrid } from "./how-it-works-steps";
import { Reveal } from "./reveal";
import { Ornament } from "./ornament";
import { useParty } from "@/lib/party-context";
import { caseFor } from "@/lib/i18n/content";
import { useLang } from "@/lib/i18n/lang";
import { useT } from "@/lib/i18n/ui";
import type { MysteryCase } from "@/lib/cases";

const FEATURED_SLUGS = ["manor-of-whispers", "neon-requiem", "the-masquerade"];

export function Landing() {
  const { size } = useParty();
  const { lang } = useLang();
  const t = useT();

  const featured = FEATURED_SLUGS.map((s) => caseFor(s, lang)).filter((c): c is MysteryCase => !!c);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative grid min-h-[100svh] place-items-center overflow-hidden px-4 pt-16">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 46%, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.4) 55%, transparent 78%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center py-16 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.32em" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 font-type text-[0.7rem] uppercase tracking-[0.32em] text-amber/70 sm:text-sm"
          >
            {t("hero.kicker")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display fluid-hero font-semibold leading-[0.95] text-parchment"
          >
            {t("hero.title1")}
            <br />
            <span className="text-glow-blood text-crimson-bright">{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 max-w-xl font-serif fluid-lead italic text-parchment-dim"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 w-full"
          >
            <PlayerCountSelector />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12"
          >
            <Link
              href="/cases"
              className="font-serif text-sm tracking-wide text-smoke underline-offset-8 transition-colors hover:text-amber hover:underline"
            >
              {t("hero.browse")}
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold/50">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ===== WHISPER LINE ===== */}
      <section className="relative px-4 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Ornament />
          <p className="mt-8 font-display fluid-h2 leading-tight text-parchment">{t("whisper.l1")}</p>
          <p className="mt-5 font-serif fluid-lead italic text-smoke">{t("whisper.l2")}</p>
        </Reveal>
      </section>

      {/* ===== FEATURED CASES ===== */}
      <section className="relative px-4 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("landing.featuredKicker")}</p>
              <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("landing.featuredTitle")}</h2>
            </div>
            <Link href="/cases" className="btn-seal rounded-full px-6 py-3 text-sm">
              {t("landing.allCases")}
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.1}>
                <CaseCard mystery={c} partySize={size} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 text-center">
            <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("how.kicker")}</p>
            <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("how.title")}</h2>
          </Reveal>
          <StepsGrid />
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="relative px-4 py-28 sm:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Ornament />
          <h2 className="mt-8 font-display fluid-h2 text-parchment">{t("landing.closingTitle")}</h2>
          <p className="mx-auto mt-4 max-w-lg font-serif fluid-lead italic text-parchment-dim">{t("landing.closingBody")}</p>
          <div className="mt-12">
            <PlayerCountSelector />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
