"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useParty } from "@/lib/party-context";
import { PARTY_SIZES } from "@/lib/cases";
import { FogTransition } from "./fog-transition";
import { cn } from "@/lib/utils";

export function PlayerCountSelector({
  prompt = "How many will sit at the table tonight?",
  className,
}: {
  prompt?: string;
  className?: string;
}) {
  const { size, setSize } = useParty();
  const router = useRouter();
  const [pending, setPending] = useState<number | null>(null);

  const select = (n: number) => {
    setSize(n);
    setPending(n);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="mb-6 text-center font-serif italic fluid-lead text-parchment-dim">{prompt}</p>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7">
        {PARTY_SIZES.map((n, i) => {
          const selected = size === n;
          return (
            <motion.button
              key={n}
              data-sfx="seal"
              onClick={() => select(n)}
              initial={{ opacity: 0, y: 26, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              aria-label={`A party of ${n}`}
              className="group relative grid place-items-center"
            >
              {/* halo */}
              <span
                className={cn(
                  "absolute inset-0 rounded-full blur-xl transition-opacity duration-500",
                  selected ? "opacity-90" : "opacity-0 group-hover:opacity-80"
                )}
                style={{ background: "radial-gradient(circle, rgba(233,185,107,0.6), transparent 70%)" }}
                aria-hidden
              />
              {/* brass token */}
              <span
                className={cn(
                  "relative grid h-[clamp(4.2rem,12vw,6rem)] w-[clamp(4.2rem,12vw,6rem)] place-items-center rounded-full border-2 transition-all duration-500",
                  selected ? "border-amber-glow" : "border-gold/60 group-hover:border-amber"
                )}
                style={{
                  background:
                    "radial-gradient(circle at 35% 28%, #3a2c12 0%, #1c1408 55%, #0c0a06 100%)",
                  boxShadow:
                    "inset 0 2px 6px rgba(255,220,150,0.25), inset 0 -6px 14px rgba(0,0,0,0.7), 0 14px 30px -14px rgba(0,0,0,0.9)",
                }}
              >
                {/* engraved ring */}
                <span className="absolute inset-[6px] rounded-full border border-gold/25" aria-hidden />
                <span
                  className={cn(
                    "font-display text-[clamp(1.8rem,5vw,2.6rem)] leading-none transition-colors duration-500",
                    selected ? "text-amber-glow text-glow-gold" : "text-gold-soft group-hover:text-amber-glow"
                  )}
                >
                  {n}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <FogTransition
        active={pending != null}
        label="The case is still cooling…"
        onCovered={() => router.push(`/cases?players=${pending}`)}
      />
    </div>
  );
}
