"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "verdict.opened";

export interface Rank {
  title: string;
  at: number;
}

export const RANKS: Rank[] = [
  { title: "Constable", at: 0 },
  { title: "Sergeant", at: 1 },
  { title: "Inspector", at: 3 },
  { title: "Detective", at: 5 },
  { title: "Chief Inspector", at: 7 },
  { title: "Master Sleuth", at: 10 },
];

export function rankFor(count: number): { current: Rank; next: Rank | null } {
  let current = RANKS[0];
  let next: Rank | null = RANKS[1] ?? null;
  for (let i = 0; i < RANKS.length; i++) {
    if (count >= RANKS[i].at) {
      current = RANKS[i];
      next = RANKS[i + 1] ?? null;
    }
  }
  return { current, next };
}

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useRank() {
  const [opened, setOpened] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOpened(read());
    setReady(true);
  }, []);

  const markOpened = useCallback((slug: string): { isNew: boolean; count: number } => {
    const cur = read();
    if (cur.includes(slug)) {
      setOpened(cur);
      return { isNew: false, count: cur.length };
    }
    const updated = [...cur, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(updated));
    } catch {
      /* ignore */
    }
    setOpened(updated);
    return { isNew: true, count: updated.length };
  }, []);

  const count = opened.length;
  return { opened, count, ready, markOpened, ...rankFor(count) };
}
