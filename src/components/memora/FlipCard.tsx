import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
}

export function FlipCard({ front, back, flipped, onFlip }: FlipCardProps) {
  const face = "flip-face absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl border bg-card p-6 text-center shadow-card sm:p-10";
  return (
    <div className="flip-scene w-full">
      <button
        type="button"
        onClick={onFlip}
        aria-label={flipped ? "Mostrar frente" : "Mostrar verso"}
        className={cn("flip-inner relative block h-72 w-full sm:h-96", flipped && "is-flipped")}
      >
        <div className={face} aria-hidden={flipped}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Frente</span>
          <p className="max-h-full overflow-auto break-words text-2xl font-bold leading-snug sm:text-3xl">{front}</p>
        </div>
        <div className={cn(face, "flip-back")} aria-hidden={!flipped}>
          <span className="text-xs font-semibold uppercase tracking-widest text-success">Verso</span>
          <p className="max-h-full overflow-auto break-words text-2xl font-semibold leading-snug sm:text-3xl">{back}</p>
        </div>
      </button>
    </div>
  );
}
