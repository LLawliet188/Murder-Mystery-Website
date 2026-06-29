"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** A fog/iris wipe that covers the screen, then fires onCovered (navigate there). */
export function FogTransition({
  active,
  onCovered,
  label,
}: {
  active: boolean;
  onCovered: () => void;
  label?: string;
}) {
  // Navigation is driven by a deterministic timer, not by the animation's
  // completion callback: a backgrounded/throttled tab can pause the fade
  // indefinitely, which would otherwise strand the user under the fog.
  const onCoveredRef = useRef(onCovered);
  const firedRef = useRef(false);

  useEffect(() => {
    onCoveredRef.current = onCovered;
  }, [onCovered]);

  useEffect(() => {
    if (!active) {
      firedRef.current = false;
      return;
    }
    const t = setTimeout(() => {
      if (!firedRef.current) {
        firedRef.current = true;
        onCoveredRef.current();
      }
    }, 600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="fog"
          className="fixed inset-0 z-[80] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-obsidian" />
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.7 }}
            style={{
              background:
                "radial-gradient(60% 50% at 30% 40%, rgba(60,40,70,0.6), transparent 60%), radial-gradient(50% 45% at 75% 65%, rgba(40,20,30,0.7), transparent 60%)",
              filter: "blur(20px)",
            }}
          />
          <motion.div
            className="relative h-24 w-24 rounded-full"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: "radial-gradient(circle, rgba(255,207,138,0.5), transparent 70%)",
            }}
          />
          {label && (
            <motion.p
              className="absolute bottom-[22%] font-type text-sm uppercase tracking-[0.3em] text-amber/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {label}
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
