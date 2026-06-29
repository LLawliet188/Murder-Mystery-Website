import { cn } from "@/lib/utils";
import { DIFFICULTY_LABEL } from "@/lib/cases";

function Skull({ lit }: { lit: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className={cn(lit ? "skull-lit" : "skull-dim")}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2C7 2 4 5.5 4 10c0 2.4 1 4 2.4 5.2.5.4.6.7.6 1.3V18c0 1.1.9 2 2 2h.5v-2H10v2h1.2v-2h1.6v2H14v-2h.5c1.1 0 2-.9 2-2v-1.5c0-.6.1-.9.6-1.3C18.5 14 19.6 12.4 19.6 10 19.6 5.5 16.6 2 12 2zm-3 9.5A1.8 1.8 0 1 1 9 8a1.8 1.8 0 0 1 0 3.5zm6 0A1.8 1.8 0 1 1 15 8a1.8 1.8 0 0 1 0 3.5z"
      />
    </svg>
  );
}

export function Skulls({
  value,
  showLabel = false,
  label,
  className,
}: {
  value: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
}) {
  const text = label ?? DIFFICULTY_LABEL[value];
  return (
    <span className={cn("inline-flex items-center gap-1", className)} title={`${text} — ${value}/5`}>
      <span className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skull key={i} lit={i <= value} />
        ))}
      </span>
      {showLabel && (
        <span className="ml-1.5 font-type text-[0.7rem] uppercase tracking-[0.18em] text-smoke">{text}</span>
      )}
    </span>
  );
}
