"use client";

import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StepsGrid } from "@/components/how-it-works-steps";
import { Reveal } from "@/components/reveal";
import { useT } from "@/lib/i18n/ui";

const INCLUDED_KEYS = ["inc1", "inc2", "inc3", "inc4", "inc5", "inc6"];

export function HowItWorksPageContent() {
  const t = useT();

  return (
    <div className="px-4 pb-28 sm:px-8">
      <PageHeader kicker={t("how.kicker")} title={<>{t("how.title")}</>} subtitle={t("how.sub")} />

      <section className="mx-auto mt-16 max-w-7xl">
        <StepsGrid />
      </section>

      <section className="mx-auto mt-28 max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("how.anatomyKicker")}</p>
          <h2 className="mt-2 font-display fluid-h2 text-parchment">{t("how.anatomyTitle")}</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.07}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-display text-lg text-amber-glow">{t(`${key}.t`)}</h3>
                <p className="mt-2 font-body leading-relaxed text-parchment-dim">{t(`${key}.d`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display fluid-h2 text-parchment">{t("how.noExpTitle")}</h2>
          <p className="mt-4 font-serif fluid-lead italic text-parchment-dim">{t("how.noExpBody")}</p>
          <Link href="/cases" className="btn-seal mt-10 inline-block rounded-full px-8 py-4 text-base">
            {t("how.chooseCase")}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
