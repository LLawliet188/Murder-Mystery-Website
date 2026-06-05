import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { GuildRank } from "@/components/guild-rank";
import { Reveal } from "@/components/reveal";
import { Ornament } from "@/components/ornament";

export const metadata: Metadata = {
  title: "The Detective's Guild",
  description:
    "An order of hosts, sleuths, and quiet liars. Track your standing, earn your rank, and learn the creed of the table.",
};

const TENETS = [
  {
    t: "Everyone Lies",
    d: "Assume nothing at face value. The kindest guest may hold the sharpest knife — read the silences, not just the words.",
  },
  {
    t: "The Table Is Sacred",
    d: "What is confessed over candlelight stays at the table. A good host protects the fiction so the truth can wound cleanly.",
  },
  {
    t: "Suspicion Is a Gift",
    d: "Doubt is the detective's compass. Follow it past the obvious suspect and into the corners no one wants lit.",
  },
  {
    t: "The Verdict Is Earned",
    d: "Accuse with evidence or not at all. A guess that lands is luck; a case that holds is craft.",
  },
];

export default function GuildPage() {
  return (
    <div className="px-4 pb-28 sm:px-8">
      <PageHeader
        kicker="The Order"
        title={<>The Detective&apos;s Guild</>}
        subtitle="An invitation-only order of hosts, sleuths, and accomplished liars. Open cases, sharpen your instincts, and rise through the ranks."
      />

      {/* Lore / manifesto */}
      <section className="mx-auto mt-16 max-w-3xl text-center">
        <Reveal>
          <p className="font-serif fluid-lead italic leading-relaxed text-parchment-dim">
            We meet after dark, in rooms that smell of wax and old paper. We are
            the ones who notice the trembling hand, the alibi told a half-second
            too fast, the door that should have been locked. Every case you open
            is a night the Guild remembers — and every verdict you reach moves
            you closer to mastery.
          </p>
        </Reveal>
        <Ornament className="mt-10" />
      </section>

      {/* Standing / rank progression */}
      <section className="mx-auto mt-20 max-w-5xl">
        <Reveal className="mb-8 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">Your Dossier</p>
          <h2 className="mt-2 font-display fluid-h2 text-parchment">Rank &amp; Standing</h2>
          <p className="mx-auto mt-3 max-w-xl font-body leading-relaxed text-parchment-dim">
            Your progress is kept on this device alone — no account, no audience.
            Open more cases to climb from Constable to Master Sleuth.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <GuildRank />
        </Reveal>
      </section>

      {/* The creed */}
      <section className="mx-auto mt-28 max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">By Candlelight, We Swear</p>
          <h2 className="mt-2 font-display fluid-h2 text-parchment">The Four Tenets</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {TENETS.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-7">
                <span className="font-display text-3xl text-gold/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl text-amber-glow">{it.t}</h3>
                <p className="mt-2 font-body leading-relaxed text-parchment-dim">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto mt-28 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display fluid-h2 text-parchment">Take Your Seat</h2>
          <p className="mt-4 font-serif fluid-lead italic text-parchment-dim">
            The Guild has no membership card. You join the moment you open your
            first case — and the table has been waiting for you.
          </p>
          <Link href="/cases" className="btn-seal mt-10 inline-block rounded-full px-8 py-4 text-base">
            Enter the Case Files
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
