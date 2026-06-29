import type { ScriptOverlay } from "./content-types";
import { SCRIPTS_DE_A } from "./scripts.de.a";
import { SCRIPTS_DE_B } from "./scripts.de.b";
import { SCRIPTS_DE_C } from "./scripts.de.c";
import { SCRIPTS_DE_D } from "./scripts.de.part-d";

// German script overlays, merged from chunked part-files. Anything absent falls
// back to English per field.
export const SCRIPTS_DE: Record<string, ScriptOverlay> = {
  ...SCRIPTS_DE_A,
  ...SCRIPTS_DE_B,
  ...SCRIPTS_DE_C,
  ...SCRIPTS_DE_D,
};
