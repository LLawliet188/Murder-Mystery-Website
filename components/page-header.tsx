import { Reveal } from "./reveal";
import { Ornament } from "./ornament";

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl pt-28 text-center sm:pt-32">
      <p className="font-type text-xs uppercase tracking-[0.28em] text-gold/70">{kicker}</p>
      <h1 className="mt-3 font-display fluid-hero text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] text-parchment text-glow-gold">
        {title}
      </h1>
      {subtitle && <p className="mx-auto mt-5 max-w-xl font-serif fluid-lead italic text-parchment-dim">{subtitle}</p>}
      <Ornament className="mt-8" />
    </Reveal>
  );
}
