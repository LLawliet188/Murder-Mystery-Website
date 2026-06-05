"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A candle / magnifying-glass cursor. Follows the pointer with a warm pool of
 * light, and "illuminates" elements marked [data-clue] when the light falls near
 * them. Disabled on touch devices and when reduced motion is requested.
 */
export function CandleCursor() {
  const [active, setActive] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setActive(true);
    document.documentElement.classList.add("candle-active");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const { x, y } = pos.current;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${x - 130}px, ${y - 130}px, 0)`;
      if (flameRef.current) flameRef.current.style.transform = `translate3d(${x - 7}px, ${y - 10}px, 0)`;

      // Reveal nearby clues.
      const clues = document.querySelectorAll<HTMLElement>("[data-clue]");
      clues.forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const near = Math.hypot(cx - x, cy - y) < 150;
        el.classList.toggle("is-lit", near);
      });

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("candle-active");
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-[260px] w-[260px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,207,138,0.16) 0%, rgba(233,185,107,0.08) 35%, transparent 68%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={flameRef}
        aria-hidden
        className="anim-flicker pointer-events-none fixed left-0 top-0 z-[71] h-[20px] w-[14px] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 35%, #fff 0%, #ffcf8a 30%, #e9b96b 55%, #c41e3a 100%)",
          boxShadow: "0 0 16px 5px rgba(255,207,138,0.7), 0 0 38px 12px rgba(196,30,58,0.3)",
        }}
      />
    </>
  );
}
