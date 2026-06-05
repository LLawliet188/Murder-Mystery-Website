import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StepsGrid } from "@/components/how-it-works-steps";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Four steps from gathering your party to delivering the verdict.",
};

const INCLUDED = [
  { t: "Character Dossiers", d: "A sealed identity for every guest — a name, a history, and a secret worth lying for." },
  { t: "Hidden Agendas", d: "Private objectives that turn friends into rivals and dinner into an interrogation." },
  { t: "Rounds of Clues", d: "Evidence revealed in acts, so the truth surfaces slowly — and suspicion shifts." },
  { t: "The Host's Script", d: "A complete timeline so whoever runs the night can play along too." },
  { t: "Printable Invitations", d: "Wax-sealed summons to set the mood before anyone arrives." },
  { t: "The Verdict", d: "A final accusation, a dramatic reveal, and one unforgettable confession." },
];

export default function HowItWorksPage() {
  return (
    <div className="px-4 pb-28 sm:px-8">
      <PageHeader
        kicker="The Method"
        title={<>How the Night Unfolds</>}
        subtitle="From an empty room to a roomful of suspects in four simple steps."
      />

      <section className="mx-auto mt-16 max-w-7xl">
        <StepsGrid />
      </section>

      {/* Anatomy of a mystery */}
      <section className="mx-auto mt-28 max-w-6xl">
        <Reveal className="mb-10 text-center">
          <p className="font-type text-xs uppercase tracking-[0.24em] text-gold/70">In Every Sealed File</p>
          <h2 className="mt-2 font-display fluid-h2 text-parchment">The Anatomy of a Mystery</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.07}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="font-display text-lg text-amber-glow">{it.t}</h3>
                <p className="mt-2 font-body leading-relaxed text-parchment-dim">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Host reassurance */}
      <section className="mx-auto mt-28 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display fluid-h2 text-parchment">No Experience Required</h2>
          <p className="mt-4 font-serif fluid-lead italic text-parchment-dim">
            You don&apos;t need to be a detective to host like one. Every case is self-contained,
            paced for you, and playable at the dinner table or across a crowded room. Pour the wine,
            dim the lights, and let VERDICT do the plotting.
          </p>
          <Link href="/cases" className="btn-seal mt-10 inline-block rounded-full px-8 py-4 text-base">
            Choose Your Case
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
