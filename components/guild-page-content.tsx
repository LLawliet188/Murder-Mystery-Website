"use client";

import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { GuildRank } from "@/components/guild-rank";
import { Reveal } from "@/components/reveal";
import { Ornament } from "@/components/ornament";
import { useT } from "@/lib/i18n/ui";

const TENET_KEYS = ["tenet1", "tenet2", "tenet3", "tenet4"];

export function GuildPageContent() {
  const t = useT();

  return (
    <div className="px-4 pb-28 sm:px-8">
      <PageHeader kicker={t("guild.kicker")} title={<>{t("guild.title")}</>} subtitle={t("guild.sub")} />

      <section className="mx-auto mt-16 max-w-3xl text-center">
        <Reveal>
          <p className="font-serif fluid-lead italic leading-relaxed text-parchment-dim">{t("guild.lore")}</p>
        </Reveal>
        <Ornament className="mt-10" />
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <Reveal className="mb-8 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("guild.dossierKicker")}</p>
          <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("guild.standingTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl font-body leading-relaxed text-parchment-dim">
            {t("guild.standingSub")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <GuildRank />
        </Reveal>
      </section>

      <section className="mx-auto mt-28 max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("guild.creedKicker")}</p>
          <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("guild.creedTitle")}</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {TENET_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-7">
                <span className="font-display text-3xl text-gold/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl text-amber-glow">{t(`${key}.t`)}</h3>
                <p className="mt-2 font-body leading-relaxed text-parchment-dim">{t(`${key}.d`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display fluid-h2 text-parchment">{t("guild.takeSeatTitle")}</h2>
          <p className="mt-4 font-serif fluid-lead italic text-parchment-dim">{t("guild.takeSeatBody")}</p>
          <Link href="/cases" className="btn-seal mt-10 inline-block rounded-full px-8 py-4 text-base">
            {t("guild.enter")}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
