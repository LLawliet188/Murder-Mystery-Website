<div align="center">

# 🔍 VERDICT

### *Everyone's a Suspect.*

**A cinematic, gothic-noir murder-mystery game platform.**
Gather your party. Choose your case. Only one of you knows the truth.

<!-- Update this link if your Vercel domain differs -->
[**Live Demo →**](https://murder-mystery-website.vercel.app)

Built with Next.js 16 · React 19 · Tailwind CSS v4 · React Three Fiber

</div>

---

## ✦ Overview

VERDICT is a single-page experience for discovering and hosting host-your-own murder-mystery parties. Its heart is a **player-count matchmaker**: tell it how many will sit at the table tonight (3 · 4 · 5 · 6) and the case files re-rank to fit your party — "perfect for your party" first, scalable cases next — with the suspect roster on each dossier adapting to your headcount.

The whole thing is styled like *a dimly lit detective's study at midnight*: candlelight, wax seals, CLASSIFIED stamps, film grain, drifting fog, and a slow-turning 3D antique key.

## ✦ Features

- 🎭 **Mystery Matchmaker** — antique brass 3/4/5/6 tokens trigger a cinematic fog transition into a gallery ranked for your party size. A floating control changes party size anywhere.
- 🗂 **Case Files gallery** — 3D tilt cards that flip to reveal a dossier, filters by player count / difficulty / era / mood, a "Whisper" search, and a **Deal Me a Case** shuffle.
- 📜 **Confidential dossiers** — wax seal, CLASSIFIED stamp, typewriter labels, a roster that adapts to your party, a gated **Host's Kit**, and a printable **Clue Pack** (generated client-side, no dependencies).
- 🗺 **Interactive crime-scene floor plans** — every case has an illustrated SVG plan with glowing, clickable room hotspots that reveal spoiler-safe clues.
- 🔊 **Atmosphere engine** — procedural ambience (a haunted-room drone + filtered rain) plus **synthesized interaction SFX** (hover, click, wax-seal, reveal). Gesture-gated, never autoplays, with a mute toggle. *File-ready:* drop real tracks into `/public/sounds` and they take over automatically.
- 🌫 **Global FX layer** — film grain, vignette, drifting fog, floating embers & dust, and a candle/magnifying-glass cursor that reveals hidden clues.
- 🎖 **Detective Rank** — progress from Constable → Master Sleuth as you open cases, tracked in `localStorage`, with badges on the Detective's Guild page.
- 📱 **Responsive & accessible** — mobile-first with fluid `clamp()` type, WebGL fallbacks, and full `prefers-reduced-motion` support.

## ✦ The Case Files

| Case | Players | Difficulty | Era · Mood |
|------|:------:|:----------:|------------|
| The Manor of Whispers | 5–6 | Hardened | Victorian · Gothic |
| Last Stop: Midnight Express | 3–5 | Inspector | 1920s · Glamour |
| The Masquerade | 5–6 | Master | Baroque Venice · Opulent |
| Blood & Bootleg | 4–6 | Inspector | Prohibition · Jazz Noir |
| Final Cut | 3–5 | Inspector | 1950s Hollywood · Glamour |
| The Keeper's Light | 3–4 | Hardened | Edwardian · Isolation |
| The Ninth Séance | 4–6 | Hardened | Victorian · Occult |
| Neon Requiem | 4–6 | Master | Near-Future · Cyber-Noir |
| A Knife at the Gala | 3–5 | Amateur | Modern · Glamour |
| Carnival of Shadows | 4–6 | Hardened | 1930s · Eerie |

## ✦ Tech Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) · **React 19**
- **[Tailwind CSS v4](https://tailwindcss.com)** (`@theme` design tokens, no config file)
- **[React Three Fiber](https://r3f.docs.pmnd.rs) + drei + three** — the 3D hero
- **[Framer Motion](https://www.framer.com/motion/)** — transitions & reveals
- **[Howler.js](https://howlerjs.com)** — optional file-based audio (procedural Web Audio by default)
- **Procedural everything** — cover art is themed SVG, ambience & SFX are synthesized, so the app ships with **zero binary assets** and nothing 404s.

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## ✦ Optional Asset Upgrades

The site is fully functional with no media files, but it's wired to upgrade the moment you add them:

- **Music & SFX** — drop files into `/public/sounds/` (`theme-loop.mp3`, `click.mp3`, `hover.mp3`, `wax-seal.mp3`, `reveal.mp3`, `page-turn.mp3`). A real looping track crossfades over the procedural drone; file SFX replace the synth.
- **Cover art** — set `image: "/images/your-cover.jpg"` on any case in [`lib/cases.ts`](lib/cases.ts) to swap the procedural SVG cover for a photo (lazy-loaded with a palette blur-up).

> Prefer royalty-free sources (Pixabay, Mixkit, Unsplash, Pexels). If you use CC-BY material, add a credits line.

## ✦ Project Structure

```
app/            Routes: / · /cases · /cases/[slug] · /how-it-works · /guild
components/     UI: hero scene, tilt cards, dossier, floor-plan map, atmosphere…
lib/            Data & state: cases, floor plans, party + audio contexts, rank, clue packs
public/         Static assets (optional sounds/images go here)
```

## ✦ Deploy

Deployed on **[Vercel](https://vercel.com)** — import the repo, accept the auto-detected Next.js settings (no environment variables needed), and deploy. Every push to `main` auto-redeploys.

---

<div align="center">

*Ten ways to get away with murder. Choose carefully.*

</div>
