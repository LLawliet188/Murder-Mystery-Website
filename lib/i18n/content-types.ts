import type { MysteryCase, Suspect } from "@/lib/cases";
import type { CaseScript, Round, CharacterBrief } from "@/lib/scripts";

// Translation overlays carry ONLY the translatable fields; everything structural
// (slug, player counts, palette, icon, geometry, guilt flags) comes from the
// English source. Any missing field falls back to English.

export type CaseOverlay = Partial<
  Pick<MysteryCase, "title" | "teaser" | "premise" | "story" | "setting" | "victim" | "duration" | "included">
> & { cast?: Partial<Suspect>[] };

export type ScriptOverlay = Partial<
  Pick<CaseScript, "hostNote" | "intro" | "reveal" | "howToRun">
> & { rounds?: Partial<Round>[]; briefs?: Partial<CharacterBrief>[] };

export type FloorOverlay = { title?: string; rooms?: { label?: string; clue?: string }[] };
