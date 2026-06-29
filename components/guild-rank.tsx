"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRank, RANKS } from "@/lib/rank";
import { CASES } from "@/lib/cases";
import { useT } from "@/lib/i18n/ui";

export function GuildRank() {
  const t = useT();
  const { count, current, next, ready, opened } = useRank();
  const total = CASES.length;
  const currentTitle = t(`rank.${current.title}`);
  const nextTitle = next ? t(`rank.${next.title}`) : "";

  const progress = next
    ? Math.min(1, (count - current.at) / (next.at - current.at))
    : 1;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
      <div className="flex flex-col items-center text-center">
        <span className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">{t("rank.standing")}</span>
        <motion.h2
          key={current.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 font-display text-[clamp(2rem,6vw,3.5rem)] text-amber-glow text-glow-gold"
        >
          {ready ? currentTitle : "…"}
        </motion.h2>
        <p className="mt-2 font-serif fluid-lead italic text-parchment-dim">
          {t("rank.opened", { count, total })}
          {next && <>{t("rank.toNext", { n: next.at - count, title: nextTitle })}</>}
        </p>

        {/* progress bar */}
        <div className="mt-6 h-2 w-full max-w-md overflow-hidden rounded-full border border-gold/20 bg-black/40">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-blood via-crimson to-gold"
          />
        </div>
      </div>

      {/* badges */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {RANKS.map((r) => {
          const earned = count >= r.at;
          return (
            <div
              key={r.title}
              className={`flex flex-col items-center rounded-2xl border p-4 text-center transition-all ${
                earned ? "border-gold/50 bg-gold/5" : "border-smoke-dim/20 opacity-50"
              }`}
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-full border ${
                  earned ? "border-gold text-amber-glow" : "border-smoke-dim/40 text-smoke-dim"
                }`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.4 5 5.6.6-4 4 1.2 5.4L12 19.6 6.8 22 8 16.6l-4-4 5.6-.6z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    fill={earned ? "rgba(201,162,39,0.2)" : "none"}
                  />
                </svg>
              </span>
              <span className="mt-2 font-display text-xs tracking-wide text-parchment">{t(`rank.${r.title}`)}</span>
              <span className="font-type text-[0.6rem] uppercase tracking-[0.14em] text-smoke">
                {r.at === 0 ? t("rank.start") : t("rank.casesN", { n: r.at })}
              </span>
            </div>
          );
        })}
      </div>

      {opened.length === 0 && ready && (
        <div className="mt-8 text-center">
          <Link href="/cases" className="btn-seal inline-block rounded-full px-7 py-3 text-sm">
            {t("rank.firstCase")}
          </Link>
        </div>
      )}
    </div>
  );
}
