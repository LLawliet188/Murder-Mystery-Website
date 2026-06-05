"use client";

import { useEffect } from "react";
import { useAudio, type SfxName } from "@/lib/audio-context";

const INTERACTIVE = 'button, a[href], [role="button"], [data-sfx]';
const VALID: SfxName[] = ["hover", "click", "seal", "reveal", "page"];

function sfxFrom(el: Element | null, fallback: SfxName): SfxName {
  const v = el?.getAttribute("data-sfx");
  return v && (VALID as string[]).includes(v) ? (v as SfxName) : fallback;
}

/**
 * Delegated UI sound effects. A single pair of listeners gives every button,
 * link, and [data-sfx] element a hover blip and a click sound — elements can
 * override the click sound with data-sfx="seal" | "reveal" | "page".
 *
 * playSfx() no-ops while sound is muted, so this stays cheap until enabled.
 */
export function SoundFx() {
  const { playSfx } = useAudio();

  useEffect(() => {
    let lastHover: Element | null = null;

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (!el || el === lastHover) return;
      if (el instanceof HTMLButtonElement && el.disabled) return;
      lastHover = el;
      playSfx("hover");
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (el && el === lastHover) lastHover = null;
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE) ?? null;
      if (!el) return;
      if (el instanceof HTMLButtonElement && el.disabled) return;
      playSfx(sfxFrom(el, "click"));
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("click", onClick);
    };
  }, [playSfx]);

  return null;
}
