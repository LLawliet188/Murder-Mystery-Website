"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AudioToggle } from "./audio-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { useT } from "@/lib/i18n/ui";

const LINKS = [
  { href: "/cases", key: "nav.cases" },
  { href: "/how-it-works", key: "nav.how" },
  { href: "/guild", key: "nav.guild" },
];

export function SiteNav() {
  const pathname = usePathname();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-gold/15 bg-obsidian/70 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="VERDICT — home">
          <KeyMark />
          <span className="font-display title-spaced text-lg text-parchment transition-colors group-hover:text-amber-glow sm:text-xl">
            Verdict
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center">
            {LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative px-2.5 py-2 font-serif text-sm tracking-wide transition-colors sm:px-4 sm:text-base",
                      active ? "text-amber-glow" : "text-smoke hover:text-parchment"
                    )}
                  >
                    {t(l.key)}
                    {active && (
                      <span className="absolute inset-x-2.5 bottom-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent sm:inset-x-4" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="mx-1 hidden h-5 w-px bg-gold/20 sm:block" />
          <AudioToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}

function KeyMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold transition-transform duration-700 group-hover:rotate-[20deg]">
      <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" />
      <path d="M11 11l8 8M16 16l2-2M18.5 18.5l1.6-1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
