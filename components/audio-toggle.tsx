"use client";

import { useAudio } from "@/lib/audio-context";
import { cn } from "@/lib/utils";

export function AudioToggle({ className }: { className?: string }) {
  const { enabled, toggle, supported } = useAudio();
  if (!supported) return null;

  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambience" : "Play ambience"}
      title={enabled ? "Silence the room" : "Let the room breathe"}
      className={cn(
        "group relative grid h-10 w-10 place-items-center rounded-full border transition-all duration-500",
        enabled
          ? "border-gold/60 bg-gold/10 text-amber-glow"
          : "border-smoke-dim/50 bg-black/30 text-smoke hover:border-gold/40 hover:text-amber",
        className
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
          opacity={enabled ? 1 : 0.7}
        />
        {enabled ? (
          <>
            <path d="M16 8.5a4.5 4.5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="anim-pulse-glow" />
            <path d="M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          </>
        ) : (
          <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}
