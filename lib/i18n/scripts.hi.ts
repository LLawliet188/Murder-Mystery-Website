import type { ScriptOverlay } from "./content-types";
import { SCRIPTS_HI_A } from "./scripts.hi.a";
import { SCRIPTS_HI_B } from "./scripts.hi.b";
import { SCRIPTS_HI_C } from "./scripts.hi.c";
import { SCRIPTS_HI_D } from "./scripts.hi.part-d";

// Hindi script overlays, merged from chunked part-files. Anything absent falls
// back to English per field.
export const SCRIPTS_HI: Record<string, ScriptOverlay> = {
  ...SCRIPTS_HI_A,
  ...SCRIPTS_HI_B,
  ...SCRIPTS_HI_C,
  ...SCRIPTS_HI_D,
};
