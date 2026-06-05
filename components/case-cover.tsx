import Image from "next/image";
import { CaseSigil } from "./case-sigil";
import type { MysteryCase } from "@/lib/cases";
import { cn } from "@/lib/utils";

/** A palette-tinted blur placeholder (isomorphic — no Buffer/btoa). */
function shimmer(from: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='12' height='16'><rect width='100%' height='100%' fill='${from}'/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Cover art. If the case declares a real `image`, it's lazy-loaded with a
 * palette blur-up; otherwise we render a self-contained procedural cover
 * (themed gradient + glowing sigil). Either way: vignette, grain, legibility.
 */
export function CaseCover({
  mystery,
  className,
  sigilClassName,
}: {
  mystery: MysteryCase;
  className?: string;
  sigilClassName?: string;
}) {
  const { from, via, to, accent } = mystery.palette;
  const hasImage = !!mystery.image;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* base gradient — also the backdrop while a real image loads */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(150deg, ${from} 0%, ${via} 52%, ${to} 100%)` }}
      />

      {hasImage ? (
        <Image
          src={mystery.image as string}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={shimmer(from)}
          className="object-cover"
        />
      ) : (
        <>
          {/* accent glow */}
          <div
            className="absolute inset-0 anim-pulse-glow"
            style={{ background: `radial-gradient(70% 55% at 50% 30%, ${accent}33 0%, transparent 60%)` }}
          />
          {/* sigil */}
          <div className="absolute inset-0 grid place-items-center">
            <CaseSigil icon={mystery.icon} className={cn("h-[58%] w-[58%]", sigilClassName)} />
          </div>
        </>
      )}

      {/* legibility + depth (over either treatment) */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />
    </div>
  );
}
