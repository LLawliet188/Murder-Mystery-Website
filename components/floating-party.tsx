"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useParty } from "@/lib/party-context";
import { PARTY_SIZES } from "@/lib/cases";
import { cn } from "@/lib/utils";

export function FloatingParty() {
  const { size, setSize, ready } = useParty();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (!ready || size == null) return null;

  const choose = (n: number) => {
    setSize(n);
    setOpen(false);
    if (pathname.startsWith("/cases") && !pathname.includes("/cases/")) {
      router.replace(`/cases?players=${n}`);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex items-center gap-2 rounded-2xl p-2.5"
          >
            {PARTY_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => choose(n)}
                aria-label={`Party of ${n}`}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full border font-display text-lg transition-all duration-300",
                  n === size
                    ? "border-gold bg-gradient-to-b from-gold/30 to-blood/30 text-amber-glow text-glow-gold"
                    : "border-smoke-dim/40 text-smoke hover:border-gold/60 hover:text-amber"
                )}
              >
                {n}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="glass group flex items-center gap-3 rounded-full py-2.5 pl-4 pr-3 transition-all duration-300 hover:border-gold/50"
        aria-expanded={open}
        aria-label="Change party size"
      >
        <span className="font-type text-[0.65rem] uppercase tracking-[0.2em] text-smoke">Party of</span>
        <span className="font-display text-xl text-amber-glow text-glow-gold">{size}</span>
        <span
          className={cn(
            "grid h-6 w-6 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-300",
            open ? "rotate-180" : ""
          )}
          aria-hidden
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
