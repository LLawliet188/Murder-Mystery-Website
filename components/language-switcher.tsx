"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, LANGS } from "@/lib/i18n/lang";
import { useT } from "@/lib/i18n/ui";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("lang.label")}
        title={t("lang.label")}
        className="flex h-10 items-center gap-1.5 rounded-full border border-smoke-dim/50 bg-black/30 px-3 text-smoke transition-all duration-300 hover:border-gold/50 hover:text-amber"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 12h18M12 3c2.6 2.5 2.6 16 0 18M12 3c-2.6 2.5-2.6 16 0 18" stroke="currentColor" strokeWidth="1.1" />
        </svg>
        <span className="font-type text-[0.7rem] uppercase tracking-[0.12em]">{current.short}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("lang.label")}
          className="absolute right-0 top-[calc(100%+8px)] z-[60] min-w-[8.5rem] overflow-hidden rounded-xl border border-gold/30 bg-obsidian/95 py-1 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur"
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-serif text-sm transition-colors",
                  l.code === lang ? "bg-gold/10 text-amber-glow" : "text-parchment-dim hover:bg-white/5 hover:text-parchment"
                )}
              >
                {l.label}
                {l.code === lang && (
                  <span className="text-amber-glow" aria-hidden>
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
