"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A card that tilts toward the cursor and flips in 3D on hover to reveal its
 * back face. Tilt is disabled under prefers-reduced-motion; on touch devices the
 * flip is driven by focus/tap rather than hover.
 */
export function TiltCard({
  front,
  back,
  className,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 11, y: px * 13 });
    setGlare({ x: (px + 0.5) * 100, y: (py + 0.5) * 100 });
  };

  const reset = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const rotY = (reduce ? 0 : tilt.y) + (hovered ? 180 : 0);
  const rotX = reduce ? 0 : tilt.x;

  return (
    <div className={cn("tilt-wrap", className)}>
      <div
        ref={ref}
        className="tilt-card relative h-full w-full"
        style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onFocus={() => setHovered(true)}
        onBlur={reset}
      >
        {/* front */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {front}
          {!reduce && (
            <div
              className="pointer-events-none absolute inset-0 opacity-60 transition-opacity"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,220,160,0.18), transparent 45%)`,
                mixBlendMode: "screen",
              }}
            />
          )}
        </div>
        {/* back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
