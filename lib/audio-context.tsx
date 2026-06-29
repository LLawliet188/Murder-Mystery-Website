"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Howl } from "howler";

export type SfxName = "hover" | "click" | "seal" | "reveal" | "page";

interface AudioCtx {
  enabled: boolean;
  toggle: () => void;
  supported: boolean;
  playSfx: (name: SfxName) => void;
}

const Ctx = createContext<AudioCtx | null>(null);

const BED_GAIN = 0.065; // ambient drone/rain underlay
const SCORE_GAIN = 0.23; // procedural parlor-noir score
const MUSIC_GAIN = 0.24; // file-based track, if present
const SFX_GAIN = 0.45;

const MUSIC_SRC = "/sounds/theme-loop.mp3";
const SFX_SRC: Record<SfxName, string> = {
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
  seal: "/sounds/wax-seal.mp3",
  reveal: "/sounds/reveal.mp3",
  page: "/sounds/page-turn.mp3",
};

function hasAudioSupport() {
  return (
    typeof window !== "undefined" &&
    !!(window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)
  );
}

// ── Procedural noir score ────────────────────────────────────────────────
// A slow minor-key progression (A minor: i – VI – III – V) with a bass pulse,
// a soft arpeggio, and a sparse high melody. Mysterious, Holmesian, and — since
// it's synthesized — entirely original and royalty-free.
const PROG = [
  { bass: 73.42, arp: [146.83, 174.61, 220.0, 277.18] }, // Dm(add9)
  { bass: 58.27, arp: [116.54, 146.83, 174.61, 233.08] }, // Bbmaj7 shadow
  { bass: 65.41, arp: [130.81, 155.56, 196.0, 246.94] }, // C minor color
  { bass: 55.0, arp: [110.0, 138.59, 164.81, 207.65] }, // A7 tension
];
const MELODY = [587.33, 554.37, 523.25, 466.16, 440.0, 392.0]; // D5 C#5 C5 Bb4 A4 G4

function tone(
  ctx: AudioContext,
  bus: AudioNode,
  freq: number,
  start: number,
  dur: number,
  peak: number,
  type: OscillatorType
) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  const o2 = ctx.createOscillator();
  o2.type = type;
  o2.frequency.value = freq;
  o2.detune.value = 7;
  const g = ctx.createGain();
  g.gain.value = 0;
  o.connect(g);
  o2.connect(g);
  g.connect(bus);
  const atk = 0.05;
  const rel = Math.min(0.6, dur * 0.6);
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(peak, start + atk);
  g.gain.setValueAtTime(peak, start + Math.max(atk, dur - rel));
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.start(start);
  o2.start(start);
  o.stop(start + dur + 0.05);
  o2.stop(start + dur + 0.05);
}

function scheduleBar(ctx: AudioContext, bus: AudioNode, barIndex: number, t0: number, beat: number) {
  const bar = beat * 4;
  const chord = PROG[barIndex % PROG.length];
  tone(ctx, bus, chord.bass, t0, bar * 1.05, 0.12, "sine"); // candlelit low drone
  tone(ctx, bus, chord.bass / 2, t0 + beat * 2, beat * 1.85, 0.055, "sine"); // distant floorboard thrum

  const steps = [0, 0.72, 1.48, 2.62];
  chord.arp.forEach((f, i) => tone(ctx, bus, f, t0 + steps[i] * beat, beat * 0.72, 0.055, "triangle"));
  tone(ctx, bus, chord.arp[1] * 2, t0 + 3.35 * beat, beat * 0.52, 0.035, "sine"); // glassy question mark
  if (barIndex % 2 === 1) {
    const m = MELODY[(barIndex >> 1) % MELODY.length];
    tone(ctx, bus, m, t0 + beat * 1.38, beat * 1.25, 0.052, "sine"); // sparse music-box melody
  }
  if (barIndex % 4 === 3) {
    tone(ctx, bus, 466.16, t0 + beat * 3.04, beat * 0.58, 0.028, "sine");
    tone(ctx, bus, 493.88, t0 + beat * 3.08, beat * 0.52, 0.022, "sine"); // close dissonance before the loop turns
  }
}

/**
 * VERDICT's atmosphere engine. A synthesized noir score + ambient bed + UI sound
 * effects, all generated with the Web Audio API (no files required, nothing
 * copyrighted). The score fades in gently on the user's first interaction — never
 * autoplaying on load — and a floating toggle mutes it. If a real loop is dropped
 * at /sounds/theme-loop.mp3 it crossfades in over the synth.
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);

  const ctxRef = useRef<AudioContext | null>(null);
  const bedRef = useRef<GainNode | null>(null);
  const scoreBusRef = useRef<GainNode | null>(null);
  const sfxBusRef = useRef<GainNode | null>(null);
  const scoreTimerRef = useRef<number | null>(null);
  const scoreStateRef = useRef<{ bar: number; nextTime: number }>({ bar: 0, nextTime: 0 });
  const enabledRef = useRef(false);
  const userMutedRef = useRef(false);

  const filesTriedRef = useRef(false);
  const musicRef = useRef<Howl | null>(null);
  const musicOkRef = useRef(false);
  const sfxHowlsRef = useRef<Partial<Record<SfxName, Howl>>>({});

  useEffect(() => {
    const id = window.setTimeout(() => setSupported(hasAudioSupport()), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const build = useCallback(() => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();

    // ambient bed: low drone + filtered rain
    const bed = ctx.createGain();
    bed.gain.value = 0;
    bed.connect(ctx.destination);
    [36.71, 37.06, 55].forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 2 ? 0.16 : 0.22;
      osc.connect(g).connect(bed);
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
    band.frequency.value = 840;
    band.Q.value = 0.55;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.42;
    noise.connect(band).connect(noiseGain).connect(bed);
    noise.start();
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.22;
    lfo.connect(lfoGain).connect(noiseGain.gain);
    lfo.start();

    // score bus (through a warm low-pass)
    const scoreBus = ctx.createGain();
    scoreBus.gain.value = 0;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1900;
    const delay = ctx.createDelay(1.2);
    delay.delayTime.value = 0.38;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.16;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;
    scoreBus.connect(lp).connect(ctx.destination);
    lp.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(ctx.destination);

    // sfx bus
    const sfxBus = ctx.createGain();
    sfxBus.gain.value = SFX_GAIN;
    sfxBus.connect(ctx.destination);

    ctxRef.current = ctx;
    bedRef.current = bed;
    scoreBusRef.current = scoreBus;
    sfxBusRef.current = sfxBus;
    return ctx;
  }, []);

  const startScore = useCallback(() => {
    const ctx = ctxRef.current;
    const bus = scoreBusRef.current;
    if (!ctx || !bus || scoreTimerRef.current != null) return;
    const beat = 0.96;
    let bar = scoreStateRef.current.bar;
    let nextTime = Math.max(ctx.currentTime + 0.15, scoreStateRef.current.nextTime);
    const tick = () => {
      const c = ctxRef.current;
      const b = scoreBusRef.current;
      if (!c || !b) return;
      while (nextTime < c.currentTime + 0.35) {
        scheduleBar(c, b, bar, nextTime, beat);
        nextTime += beat * 4;
        bar++;
      }
      scoreStateRef.current = { bar, nextTime };
    };
    tick();
    scoreTimerRef.current = window.setInterval(tick, 80);
  }, []);

  const stopScore = useCallback(() => {
    if (scoreTimerRef.current != null) {
      clearInterval(scoreTimerRef.current);
      scoreTimerRef.current = null;
    }
  }, []);

  const loadFiles = useCallback(async () => {
    if (filesTriedRef.current) return;
    filesTriedRef.current = true;
    try {
      const { Howl } = await import("howler");
      const music = new Howl({ src: [MUSIC_SRC], loop: true, html5: true, volume: 0 });
      music.once("load", () => {
        musicOkRef.current = true;
        musicRef.current = music;
        if (enabledRef.current) {
          music.play();
          music.fade(0, MUSIC_GAIN, 4000);
          const ctx = ctxRef.current;
          if (ctx && scoreBusRef.current) {
            const now = ctx.currentTime;
            scoreBusRef.current.gain.cancelScheduledValues(now);
            scoreBusRef.current.gain.setValueAtTime(scoreBusRef.current.gain.value, now);
            scoreBusRef.current.gain.linearRampToValueAtTime(0, now + 3);
            setTimeout(() => stopScore(), 3200);
          }
        }
      });
      music.once("loaderror", () => music.unload());

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
  }, [stopScore]);

  const setAudio = useCallback(
    (next: boolean) => {
      enabledRef.current = next;
      setEnabled(next);

      let ctx = ctxRef.current;
      if (next && !ctx) ctx = build();
      if (next) void loadFiles();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();
      const now = ctx.currentTime;

      if (bedRef.current) {
        const g = bedRef.current.gain;
        g.cancelScheduledValues(now);
        g.setValueAtTime(g.value, now);
        g.linearRampToValueAtTime(next ? BED_GAIN : 0, now + (next ? 2 : 0.6));
      }

      if (scoreBusRef.current) {
        const g = scoreBusRef.current.gain;
        g.cancelScheduledValues(now);
        g.setValueAtTime(g.value, now);
        if (next && !musicOkRef.current) {
          startScore();
          g.linearRampToValueAtTime(SCORE_GAIN, now + 3);
        } else {
          g.linearRampToValueAtTime(0, now + 0.8);
          window.setTimeout(() => {
            if (!enabledRef.current || musicOkRef.current) stopScore();
          }, 900);
        }
      }

      const music = musicRef.current;
      if (music && musicOkRef.current) {
        if (next) {
          if (!music.playing()) music.play();
          music.fade(music.volume(), MUSIC_GAIN, 2500);
        } else {
          music.fade(music.volume(), 0, 600);
          window.setTimeout(() => music.pause(), 650);
        }
      }
    },
    [build, loadFiles, startScore, stopScore]
  );

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    if (!next) userMutedRef.current = true; // remember an explicit mute
    setAudio(next);
  }, [setAudio]);

  // Begin the score on the first user gesture (never autoplay on load).
  useEffect(() => {
    if (!supported) return;
    const start = () => {
      cleanup();
      if (!enabledRef.current && !userMutedRef.current) setAudio(true);
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    window.addEventListener("touchstart", start, { once: true });
    return cleanup;
  }, [supported, setAudio]);

  // ── synthesized SFX (used until a file overrides) ──
  const playSynth = useCallback((name: SfxName) => {
    const ctx = ctxRef.current;
    const bus = sfxBusRef.current;
    if (!ctx || !bus) return;
    const t = ctx.currentTime;
    const noiseBurst = (dur: number) => {
      const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      return src;
    };

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
    } else if (name === "click") {
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
    } else if (name === "seal") {
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
    } else if (name === "reveal") {
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
    } else if (name === "page") {
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
  }, []);

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

  const unloadSfx = useCallback(() => {
    Object.values(sfxHowlsRef.current).forEach((h) => h?.unload());
  }, []);

  useEffect(() => {
    return () => {
      stopScore();
      try {
        musicRef.current?.unload();
        unloadSfx();
      } catch {
        /* noop */
      }
      void ctxRef.current?.close();
    };
  }, [stopScore, unloadSfx]);

  return <Ctx.Provider value={{ enabled, toggle, supported, playSfx }}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
