"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Howl } from "howler";

export type SfxName = "hover" | "click" | "seal" | "reveal" | "page";

interface AudioCtx {
  enabled: boolean;
  toggle: () => void;
  supported: boolean;
  /** Play a short interaction sound. Honors mute; no-ops until the user enables sound. */
  playSfx: (name: SfxName) => void;
}

const Ctx = createContext<AudioCtx | null>(null);

const TARGET_GAIN = 0.16; // procedural ambience bed
const MUSIC_GAIN = 0.32; // looping track, when a file is present
const SFX_GAIN = 0.5;

// Optional drop-in assets. If a file is missing it 404s silently and we fall
// back to synthesis (sfx) or the procedural drone (music) — nothing breaks.
const MUSIC_SRC = "/sounds/theme-loop.mp3";
const SFX_SRC: Record<SfxName, string> = {
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
  seal: "/sounds/wax-seal.mp3",
  reveal: "/sounds/reveal.mp3",
  page: "/sounds/page-turn.mp3",
};

/**
 * VERDICT's atmosphere engine.
 *
 * Works with zero audio files: ambience is a procedural drone + filtered noise,
 * and interaction SFX are synthesized with the Web Audio API. If royalty-free
 * files are later dropped into /public/sounds, they transparently take over —
 * a real looping track crossfades over the drone, and file SFX replace the
 * synth. Never autoplays: the AudioContext is created on the first toggle (the
 * required user gesture), and SFX stay silent until sound is enabled.
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null); // procedural ambience bed
  const sfxBusRef = useRef<GainNode | null>(null); // synth SFX bus
  const enabledRef = useRef(false);

  // File-based assets (loaded lazily, optional).
  const filesTriedRef = useRef(false);
  const musicRef = useRef<Howl | null>(null);
  const musicOkRef = useRef(false);
  const sfxHowlsRef = useRef<Partial<Record<SfxName, Howl>>>({});

  useEffect(() => {
    setSupported(
      typeof window !== "undefined" &&
        !!(window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
    );
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  /** Build the AudioContext, the procedural ambience bed, and the SFX bus. */
  const build = useCallback(() => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();

    // --- Procedural ambience bed (fallback / always-on bed) ---
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    [55, 55.4].forEach((f) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.35;
      osc.connect(g).connect(master);
      osc.start();
    });

    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 650;
    band.Q.value = 0.7;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.5;
    noise.connect(band).connect(noiseGain).connect(master);
    noise.start();

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.28;
    lfo.connect(lfoGain).connect(noiseGain.gain);
    lfo.start();

    // --- SFX bus (synthesized one-shots) ---
    const sfxBus = ctx.createGain();
    sfxBus.gain.value = SFX_GAIN;
    sfxBus.connect(ctx.destination);

    ctxRef.current = ctx;
    masterRef.current = master;
    sfxBusRef.current = sfxBus;
    return ctx;
  }, []);

  /** Try to load optional /public/sounds files; upgrade ambience/SFX if present. */
  const loadFiles = useCallback(async () => {
    if (filesTriedRef.current) return;
    filesTriedRef.current = true;
    try {
      const { Howl } = await import("howler");

      // Looping music — crossfade over the procedural drone if it loads.
      const music = new Howl({ src: [MUSIC_SRC], loop: true, html5: true, volume: 0 });
      music.once("load", () => {
        musicOkRef.current = true;
        musicRef.current = music;
        if (enabledRef.current) {
          music.play();
          music.fade(0, MUSIC_GAIN, 4000);
          // duck the procedural bed under the real track
          const ctx = ctxRef.current;
          if (ctx && masterRef.current) {
            const now = ctx.currentTime;
            masterRef.current.gain.cancelScheduledValues(now);
            masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now);
            masterRef.current.gain.linearRampToValueAtTime(TARGET_GAIN * 0.4, now + 3);
          }
        }
      });
      music.once("loaderror", () => {
        music.unload();
      });

      // File SFX — replace synth versions when present.
      (Object.keys(SFX_SRC) as SfxName[]).forEach((name) => {
        const h = new Howl({ src: [SFX_SRC[name]], volume: SFX_GAIN });
        h.once("load", () => {
          sfxHowlsRef.current[name] = h;
        });
        h.once("loaderror", () => h.unload());
      });
    } catch {
      /* Howler unavailable — synthesis covers everything. */
    }
  }, []);

  // ---- Synthesized SFX (used until/unless a file overrides them) ----
  const noiseBurst = useCallback((dur: number) => {
    const ctx = ctxRef.current!;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    return src;
  }, []);

  const playSynth = useCallback(
    (name: SfxName) => {
      const ctx = ctxRef.current;
      const bus = sfxBusRef.current;
      if (!ctx || !bus) return;
      const t = ctx.currentTime;

      if (name === "hover") {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = 1320;
        const g = ctx.createGain();
        g.gain.value = 0;
        o.connect(g).connect(bus);
        g.gain.linearRampToValueAtTime(0.05, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        o.start(t);
        o.stop(t + 0.13);
        return;
      }

      if (name === "click") {
        const o = ctx.createOscillator();
        o.type = "triangle";
        o.frequency.setValueAtTime(440, t);
        o.frequency.exponentialRampToValueAtTime(170, t + 0.07);
        const g = ctx.createGain();
        g.gain.value = 0;
        o.connect(g).connect(bus);
        g.gain.linearRampToValueAtTime(0.08, t + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        o.start(t);
        o.stop(t + 0.11);
        return;
      }

      if (name === "seal") {
        // a low wax-stamp thud + a short "press" of filtered noise
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.setValueAtTime(120, t);
        o.frequency.exponentialRampToValueAtTime(54, t + 0.18);
        const g = ctx.createGain();
        g.gain.value = 0;
        o.connect(g).connect(bus);
        g.gain.linearRampToValueAtTime(0.22, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
        o.start(t);
        o.stop(t + 0.3);

        const press = noiseBurst(0.09);
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 900;
        const pg = ctx.createGain();
        pg.gain.value = 0;
        press.connect(lp).connect(pg).connect(bus);
        pg.gain.linearRampToValueAtTime(0.12, t + 0.006);
        pg.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        press.start(t);
        press.stop(t + 0.1);
        return;
      }

      if (name === "reveal") {
        // an upward whoosh — bandpassed noise sweeping in
        const src = noiseBurst(0.55);
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.Q.value = 0.8;
        bp.frequency.setValueAtTime(280, t);
        bp.frequency.exponentialRampToValueAtTime(2100, t + 0.5);
        const g = ctx.createGain();
        g.gain.value = 0;
        src.connect(bp).connect(g).connect(bus);
        g.gain.linearRampToValueAtTime(0.13, t + 0.14);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
        src.start(t);
        src.stop(t + 0.56);
        return;
      }

      if (name === "page") {
        // two quick paper ticks
        [0, 0.07].forEach((off) => {
          const src = noiseBurst(0.05);
          const hp = ctx.createBiquadFilter();
          hp.type = "highpass";
          hp.frequency.value = 1800;
          const g = ctx.createGain();
          g.gain.value = 0;
          src.connect(hp).connect(g).connect(bus);
          g.gain.linearRampToValueAtTime(0.07, t + off + 0.004);
          g.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.06);
          src.start(t + off);
          src.stop(t + off + 0.06);
        });
      }
    },
    [noiseBurst]
  );

  const playSfx = useCallback(
    (name: SfxName) => {
      if (!enabledRef.current) return;
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();
      const file = sfxHowlsRef.current[name];
      if (file) {
        file.play();
        return;
      }
      playSynth(name);
    },
    [playSynth]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      enabledRef.current = next;

      let ctx = ctxRef.current;
      if (next && !ctx) ctx = build();
      if (next) void loadFiles();
      if (!ctx || !masterRef.current) return next;
      if (ctx.state === "suspended") void ctx.resume();

      // Fade the procedural ambience bed.
      const now = ctx.currentTime;
      const g = masterRef.current.gain;
      const bedTarget = next ? (musicOkRef.current ? TARGET_GAIN * 0.4 : TARGET_GAIN) : 0;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(bedTarget, now + (next ? 1.4 : 0.6));

      // Fade the looping track, if one is loaded.
      const music = musicRef.current;
      if (music && musicOkRef.current) {
        if (next) {
          if (!music.playing()) music.play();
          music.fade(music.volume(), MUSIC_GAIN, 2500);
        } else {
          music.fade(music.volume(), 0, 600);
          setTimeout(() => music.pause(), 650);
        }
      }

      return next;
    });
  }, [build, loadFiles]);

  useEffect(() => {
    return () => {
      try {
        musicRef.current?.unload();
        Object.values(sfxHowlsRef.current).forEach((h) => h?.unload());
      } catch {
        /* noop */
      }
      void ctxRef.current?.close();
    };
  }, []);

  return <Ctx.Provider value={{ enabled, toggle, supported, playSfx }}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
