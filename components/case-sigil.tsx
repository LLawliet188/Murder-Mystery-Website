import type { IconKey } from "@/lib/cases";

/** Hand-drawn line-art sigils — one per case, drawn in currentColor. */
export function CaseSigil({ icon, className }: { icon: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      >
        {PATHS[icon]}
      </g>
    </svg>
  );
}

const PATHS: Record<IconKey, React.ReactNode> = {
  key: (
    <>
      <circle cx="34" cy="34" r="16" />
      <circle cx="34" cy="34" r="5" />
      <path d="M45 45 L78 78" />
      <path d="M66 66 L74 58" />
      <path d="M72 72 L80 64" />
    </>
  ),
  train: (
    <>
      <rect x="22" y="26" width="56" height="40" rx="6" />
      <path d="M22 46 H78" />
      <rect x="30" y="32" width="16" height="10" rx="2" />
      <rect x="54" y="32" width="16" height="10" rx="2" />
      <circle cx="36" cy="74" r="6" />
      <circle cx="64" cy="74" r="6" />
      <path d="M30 66 v4 M70 66 v4" />
      <path d="M14 80 H86" opacity="0.5" />
    </>
  ),
  mask: (
    <>
      <path d="M24 34 C24 28 40 26 50 26 C60 26 76 28 76 34 C76 54 64 70 50 70 C36 70 24 54 24 34 Z" />
      <path d="M30 30 C40 24 60 24 70 30" opacity="0.6" />
      <path d="M34 44 C38 40 46 40 48 44 C46 48 38 48 34 44 Z" />
      <path d="M52 44 C54 40 62 40 66 44 C62 48 54 48 52 44 Z" />
      <path d="M50 26 V18 M44 20 L50 16 L56 20" />
    </>
  ),
  bottle: (
    <>
      <path d="M44 20 h12 v10 c0 4 6 8 6 16 v32 a4 4 0 0 1-4 4 H42 a4 4 0 0 1-4-4 V46 c0-8 6-12 6-16 z" />
      <path d="M40 50 h24" opacity="0.6" />
      <rect x="42" y="58" width="20" height="14" rx="2" opacity="0.55" />
      <circle cx="76" cy="70" r="2" opacity="0.5" />
    </>
  ),
  film: (
    <>
      <path d="M20 44 h60 v30 a4 4 0 0 1-4 4 H24 a4 4 0 0 1-4-4 z" />
      <path d="M20 44 L26 32 L36 38 L46 28 L56 36 L66 26 L78 36 L80 44" />
      <path d="M30 38 L34 30 M48 36 L52 28 M64 34 L68 26" opacity="0.6" />
      <path d="M20 56 H80" opacity="0.5" />
    </>
  ),
  lighthouse: (
    <>
      <path d="M40 78 L43 40 H57 L60 78 Z" />
      <rect x="41" y="30" width="18" height="10" rx="2" />
      <path d="M44 30 V24 h12 v6" />
      <path d="M50 18 v-6" />
      <path d="M38 24 L26 18 M62 24 L74 18 M36 32 L24 32 M64 32 L76 32" opacity="0.55" />
      <path d="M34 78 H66" />
    </>
  ),
  planchette: (
    <>
      <path d="M30 40 C30 30 70 30 70 40 C70 56 56 66 50 72 C44 66 30 56 30 40 Z" />
      <circle cx="50" cy="46" r="7" />
      <path d="M22 28 l3 6 M78 28 l-3 6 M50 22 v6" opacity="0.55" />
      <path d="M26 60 q24 16 48 0" opacity="0.5" />
    </>
  ),
  circuit: (
    <>
      <circle cx="50" cy="50" r="7" />
      <path d="M50 43 V24 M50 57 V76 M43 50 H24 M57 50 H76" />
      <circle cx="50" cy="22" r="3" />
      <circle cx="50" cy="78" r="3" />
      <circle cx="22" cy="50" r="3" />
      <circle cx="78" cy="50" r="3" />
      <path d="M36 36 L28 28 M64 36 L72 28 M36 64 L28 72 M64 64 L72 72" opacity="0.55" />
    </>
  ),
  glass: (
    <>
      <path d="M34 26 H66 L58 48 a8 8 0 0 1-16 0 Z" />
      <path d="M50 48 V72" />
      <path d="M38 72 H62" />
      <path d="M40 20 l2 4 M60 18 l-2 5 M52 16 l1 5" opacity="0.55" />
    </>
  ),
  carousel: (
    <>
      <path d="M22 44 C22 30 78 30 78 44 Z" />
      <path d="M30 44 v6 M42 44 v6 M50 44 v6 M58 44 v6 M70 44 v6" opacity="0.6" />
      <path d="M50 30 V20 M44 24 L50 18 L56 24" />
      <path d="M32 50 v22 M68 50 v22" />
      <path d="M40 56 c0 8 8 10 8 2 c0-6-8-4-8 2 M40 72 h20" />
      <path d="M26 78 H74" opacity="0.5" />
    </>
  ),
};
