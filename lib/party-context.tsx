"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "verdict.party";

interface PartyCtx {
  /** Chosen party size, or null until the host picks. */
  size: number | null;
  setSize: (n: number | null) => void;
  /** True once we've read persisted state (avoids hydration flash). */
  ready: boolean;
}

const Ctx = createContext<PartyCtx | null>(null);

export function PartyProvider({ children }: { children: React.ReactNode }) {
  const [size, setSizeState] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const n = parseInt(raw, 10);
        if (n >= 3 && n <= 6) setSizeState(n);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setSize = useCallback((n: number | null) => {
    setSizeState(n);
    try {
      if (n == null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, String(n));
    } catch {
      /* ignore */
    }
  }, []);

  return <Ctx.Provider value={{ size, setSize, ready }}>{children}</Ctx.Provider>;
}

export function useParty() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useParty must be used within PartyProvider");
  return ctx;
}
