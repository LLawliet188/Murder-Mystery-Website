import { CASES, getCaseBySlug, rankCasesForParty, type MysteryCase } from "@/lib/cases";
import { getScript, type CaseScript } from "@/lib/scripts";
import { getFloorPlan, type FloorPlan } from "@/lib/floorplans";
import type { Lang } from "./lang";
import type { CaseOverlay, ScriptOverlay, FloorOverlay } from "./content-types";
import { CASES_HI, SCRIPTS_HI, FLOOR_HI } from "./content.hi";
import { CASES_DE, SCRIPTS_DE, FLOOR_DE } from "./content.de";

const CASE_OV: Record<Lang, Record<string, CaseOverlay>> = { en: {}, hi: CASES_HI, de: CASES_DE };
const SCRIPT_OV: Record<Lang, Record<string, ScriptOverlay>> = { en: {}, hi: SCRIPTS_HI, de: SCRIPTS_DE };
const FLOOR_OV: Record<Lang, Record<string, FloorOverlay>> = { en: {}, hi: FLOOR_HI, de: FLOOR_DE };

function mergeCase(base: MysteryCase, ov?: CaseOverlay): MysteryCase {
  if (!ov) return base;
  return {
    ...base,
    title: ov.title ?? base.title,
    teaser: ov.teaser ?? base.teaser,
    premise: ov.premise ?? base.premise,
    setting: ov.setting ?? base.setting,
    victim: ov.victim ?? base.victim,
    duration: ov.duration ?? base.duration,
    included: ov.included ?? base.included,
    cast: base.cast.map((c, i) => {
      const o = ov.cast?.[i];
      return o ? { name: o.name ?? c.name, title: o.title ?? c.title, line: o.line ?? c.line } : c;
    }),
  };
}

function mergeScript(base: CaseScript, ov?: ScriptOverlay): CaseScript {
  if (!ov) return base;
  return {
    ...base,
    hostNote: ov.hostNote ?? base.hostNote,
    intro: ov.intro ?? base.intro,
    reveal: ov.reveal ?? base.reveal,
    howToRun: ov.howToRun ?? base.howToRun,
    rounds: base.rounds.map((r, i) => {
      const o = ov.rounds?.[i];
      return o
        ? {
            name: o.name ?? r.name,
            narration: o.narration ?? r.narration,
            instructions: o.instructions ?? r.instructions,
            clues: o.clues ?? r.clues,
          }
        : r;
    }),
    briefs: base.briefs.map((b, i) => {
      const o = ov.briefs?.[i];
      return o
        ? {
            ...b,
            name: o.name ?? b.name,
            relationship: o.relationship ?? b.relationship,
            secret: o.secret ?? b.secret,
            alibi: o.alibi ?? b.alibi,
            accused: o.accused ?? b.accused,
          }
        : b;
    }),
  };
}

function mergeFloor(base: FloorPlan, ov?: FloorOverlay): FloorPlan {
  if (!ov) return base;
  return {
    title: ov.title ?? base.title,
    rooms: base.rooms.map((r, i) => {
      const o = ov.rooms?.[i];
      return o ? { ...r, label: o.label ?? r.label, clue: o.clue ?? r.clue } : r;
    }),
  };
}

/** Locale-aware content accessors (per-field English fallback). */
export function caseFor(slug: string, lang: Lang): MysteryCase | undefined {
  const base = getCaseBySlug(slug);
  return base ? mergeCase(base, CASE_OV[lang][slug]) : undefined;
}
export function casesFor(lang: Lang): MysteryCase[] {
  return CASES.map((c) => mergeCase(c, CASE_OV[lang][c.slug]));
}
export function rankCasesFor(n: number, lang: Lang): MysteryCase[] {
  return rankCasesForParty(n).map((c) => mergeCase(c, CASE_OV[lang][c.slug]));
}
export function scriptFor(slug: string, lang: Lang): CaseScript | undefined {
  const base = getScript(slug);
  return base ? mergeScript(base, SCRIPT_OV[lang][slug]) : undefined;
}
export function floorFor(slug: string, lang: Lang): FloorPlan | undefined {
  const base = getFloorPlan(slug);
  return base ? mergeFloor(base, FLOOR_OV[lang][slug]) : undefined;
}
