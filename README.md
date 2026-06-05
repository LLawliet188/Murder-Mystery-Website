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
- 🕵️ **Ten complete, playable mysteries** — each case is a full game: a narrator's script, a three-round structure, a private dossier for every suspect (relationship · secret · alibi · what they say if accused), real clues, red herrings, and a solution. The culprit is always within the minimum roster, so every case is solvable at any supported party size.
- 🔒 **Sealed, end-only verdict** — the host is a player too, so *no one* learns the killer until the Verdict. On-screen it's a two-step seal; in print it's the last, folded page.
- 🚪 **Strategic room investigation** — an interactive crime-scene floor plan where your party may search only **as many rooms as there are players**. Choose wisely — some rooms hold evidence, others are dead ends. Searched rooms join an evidence log.
- 🗂 **Case Files gallery** — 3D tilt cards that flip to reveal a dossier, filters by player count / difficulty / era / mood, a "Whisper" search, and a **Deal Me a Case** shuffle.
- 📄 **Printable host kit (no dependencies)** — a client-generated **Clue Pack** (how-to-play, narrator script, filled character sheets, wax-sealed invitation, sealed solution) and a **Scene Map** (rooms, corridor pathways, legend) — both print / save-as-PDF.
- 🎻 **Noir atmosphere engine** — a synthesized, royalty-free mystery score (a slow minor-key motif) that fades in on first interaction, over a procedural ambient bed, plus synthesized UI sound effects (hover, click, wax-seal, reveal). Mute toggle; never autoplays on load. *File-ready:* drop real tracks into `/public/sounds` and they crossfade in.
- 🌫 **Cinematic FX** — film grain, vignette, drifting fog, floating embers & dust, a 3D rotating hero key (R3F), 3D tilt cards, and a candle/magnifying-glass cursor that reveals hidden clues.
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

## ✦ How a Game Runs

1. **Gather** — pick how many are playing; the matchmaker ranks the cases that fit.
2. **Set up** — open a case, download the Clue Pack and Scene Map. Each guest gets only their own character sheet (their secret, alibi, and agenda); the solution stays folded and sealed.
3. **Play the rounds** — read the narrator's opening, then work through three rounds of narration, accusations, and clues.
4. **Investigate** — on the floor plan, the party may search only as many rooms as there are players. Decide together — and mind the red herrings.
5. **Accuse & deliver the Verdict** — everyone names a suspect and votes. Only then is the sealed solution opened, revealing the killer to the whole table at once — host included.

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

- **Music & SFX** — drop files into `/public/sounds/` (`theme-loop.mp3`, `click.mp3`, `hover.mp3`, `wax-seal.mp3`, `reveal.mp3`, `page-turn.mp3`). A real looping track crossfades over the synthesized noir score; file SFX replace the synth.
- **Cover art** — set `image: "/images/your-cover.jpg"` on any case in [`lib/cases.ts`](lib/cases.ts) to swap the procedural SVG cover for a photo (lazy-loaded with a palette blur-up).

> Prefer royalty-free sources (Pixabay, Mixkit, Unsplash, Pexels). If you use CC-BY material, add a credits line.

## ✦ Project Structure

```
app/            Routes: / · /cases · /cases/[slug] · /how-it-works · /guild
components/     UI: hero scene, tilt cards, dossier, floor-plan map, atmosphere…
lib/            Data & playable scripts, floor plans, party + audio contexts,
                rank, and the clue-pack & scene-map (PDF) generators
public/         Static assets (optional sounds/images go here)
```

## ✦ Deploy

Deployed on **[Vercel](https://vercel.com)** — import the repo, accept the auto-detected Next.js settings (no environment variables needed), and deploy. Every push to `main` auto-redeploys.

---

<div align="center">

*Ten ways to get away with murder. Choose carefully.*

</div>
