"use client";

import Link from "next/link";
import { TiltCard } from "./tilt-card";
import { CaseCover } from "./case-cover";
import { Skulls } from "./skulls";
import { fitForParty, rosterFor, type MysteryCase } from "@/lib/cases";
import { useT } from "@/lib/i18n/ui";

export function CaseCard({ mystery, partySize }: { mystery: MysteryCase; partySize: number | null }) {
  const t = useT();
  const fit = partySize ? fitForParty(mystery, partySize) : null;
  const rosterCount = rosterFor(mystery, partySize ?? mystery.ideal).length;
  const range =
    mystery.playerMin === mystery.playerMax
      ? t("card.playersFixed", { n: mystery.playerMin })
      : t("card.players", { min: mystery.playerMin, max: mystery.playerMax });

  return (
    <Link
      href={`/cases/${mystery.slug}`}
      data-sfx="reveal"
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
      aria-label={`${t("card.open")}: ${mystery.title}`}
    >
      <TiltCard
        className="aspect-[3/4] w-full"
        front={
          <div className="relative h-full w-full">
            <CaseCover mystery={mystery} />

            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
              <span className="font-type text-[0.6rem] uppercase tracking-[0.2em] text-parchment/70">
                {t("era." + mystery.era)}
              </span>
              {fit === "perfect" && (
                <span className="rounded-full border border-gold/60 bg-black/40 px-2 py-1 font-type text-[0.55rem] uppercase tracking-[0.16em] text-amber-glow text-glow-gold">
                  {t("fit.perfect")}
                </span>
              )}
              {fit === "scalable" && (
                <span className="rounded-full border border-smoke-dim/50 bg-black/40 px-2 py-1 font-type text-[0.55rem] uppercase tracking-[0.16em] text-parchment-dim">
                  {t("fit.scales")}
                </span>
              )}
              {fit === "unsupported" && (
                <span className="rounded-full border border-crimson/40 bg-black/40 px-2 py-1 font-type text-[0.55rem] uppercase tracking-[0.16em] text-crimson-bright/80">
                  {t("fit.off")}
                </span>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="font-display text-xl leading-tight text-parchment transition-colors group-hover:text-amber-glow sm:text-2xl">
                {mystery.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 font-serif text-sm italic text-parchment-dim">{mystery.teaser}</p>
              <div className="mt-3 flex items-center justify-between border-t border-gold/15 pt-2.5">
                <span className="font-type text-[0.65rem] uppercase tracking-[0.14em] text-smoke">{range}</span>
                <Skulls value={mystery.difficulty} />
              </div>
            </div>
          </div>
        }
        back={
          <div className="paper relative flex h-full w-full flex-col justify-between p-5">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{ background: `radial-gradient(60% 50% at 50% 30%, ${mystery.palette.accent}, transparent 60%)` }}
              aria-hidden
            />
            <div className="relative">
              <span className="stamp inline-block -rotate-6 px-2 py-0.5 text-[0.55rem]">{t("stamp.classified")}</span>
              <h3 className="mt-3 font-display text-lg leading-tight text-amber-glow">{mystery.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-parchment-dim line-clamp-5">{mystery.premise}</p>
            </div>
            <div className="relative space-y-2 border-t border-gold/20 pt-3">
              <Row label={t("card.suspects")} value={t("card.suspectsValue", { n: rosterCount })} />
              <Row label={t("card.difficulty")} value={<Skulls value={mystery.difficulty} showLabel label={t("diff." + mystery.difficulty)} />} />
              <Row label={t("card.runtime")} value={mystery.duration} />
              <span className="mt-1 inline-flex items-center gap-1.5 font-display text-sm uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-amber-glow">
                {t("card.open")}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>
        }
      />
    </Link>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-type text-[0.6rem] uppercase tracking-[0.18em] text-smoke">{label}</span>
      <span className="font-serif text-sm text-parchment">{value}</span>
    </div>
  );
}
