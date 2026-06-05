import { cn } from "@/lib/utils";

/** A decorative gold filigree divider with a center diamond. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto flex w-full max-w-xs items-center justify-center gap-3 text-gold/60", className)} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
      <svg width="46" height="12" viewBox="0 0 46 12" fill="none">
        <path d="M0 6h14M32 6h14" stroke="currentColor" strokeWidth="1" />
        <path d="M23 1l5 5-5 5-5-5z" stroke="currentColor" strokeWidth="1" fill="rgba(201,162,39,0.15)" />
        <circle cx="16" cy="6" r="1.2" fill="currentColor" />
        <circle cx="30" cy="6" r="1.2" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}
