import { useCallback, useEffect, useState } from "react";
import { Check, RotateCcw, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FlipCard } from "./FlipCard";
import { shuffle, type Flashcard, type ReviewResult } from "@/lib/flashcards";

interface ReviewSessionProps {
  cards: Flashcard[];
  onGoCreate: () => void;
}

interface SessionState {
  queue: Flashcard[];
  index: number;
  flipped: boolean;
  results: Record<string, ReviewResult>;
}

const start = (cards: Flashcard[]): SessionState => ({ queue: shuffle(cards), index: 0, flipped: false, results: {} });

export function ReviewSession({ cards, onGoCreate }: ReviewSessionProps) {
  const [s, setS] = useState<SessionState>(() => start(cards));
  const done = s.queue.length > 0 && s.index >= s.queue.length;
  const current = s.queue[s.index];

  const flip = useCallback(() => setS((p) => ({ ...p, flipped: !p.flipped })), []);
  const answer = (r: ReviewResult) =>
    setS((p) => {
      const card = p.queue[p.index];
      if (!card) return p;
      return { ...p, results: { ...p.results, [card.id]: r }, index: p.index + 1, flipped: false };
    });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || done || !current) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [role=dialog]")) return;
      e.preventDefault();
      flip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip, done, current]);

  if (!cards.length) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-card p-10 text-center shadow-card">
        <h2 className="text-xl font-bold">Nada para revisar ainda</h2>
        <p className="mt-2 text-muted-foreground">Crie alguns cartões e volte aqui para estudar.</p>
        <Button className="mt-6" onClick={onGoCreate}>
          <Plus /> Criar cartões
        </Button>
      </div>
    );
  }

  if (done) {
    const values = Object.values(s.results);
    const correct = values.filter((v) => v === "correct").length;
    const wrong = values.length - correct;
    const pct = Math.round((correct / values.length) * 100);
    const wrongCards = s.queue.filter((c) => s.results[c.id] === "wrong");
    return (
      <div className="mx-auto max-w-lg rounded-3xl bg-card p-8 text-center shadow-card sm:p-10">
        <h2 className="text-2xl font-bold">Sessão concluída!</h2>
        <p className="mt-6 text-6xl font-extrabold text-primary">{pct}%</p>
        <p className="text-sm text-muted-foreground">de acerto</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-success/10 p-4">
            <p className="text-3xl font-bold text-success">{correct}</p>
            <p className="text-sm font-medium text-success">Acertos</p>
          </div>
          <div className="rounded-2xl bg-destructive/10 p-4">
            <p className="text-3xl font-bold text-destructive">{wrong}</p>
            <p className="text-sm font-medium text-destructive">Erros</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" onClick={() => setS(start(cards))}>
            <RotateCcw /> Revisar tudo de novo
          </Button>
          <Button className="flex-1" variant="outline" disabled={!wrongCards.length} onClick={() => setS(start(wrongCards))}>
            Revisar só os que errei
          </Button>
        </div>
      </div>
    );
  }

  if (!current) return null;
  const pos = s.index + 1;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Cartão {pos} de {s.queue.length}</p>
        <Progress value={(s.index / s.queue.length) * 100} />
      </div>
      <FlipCard front={current.front} back={current.back} flipped={s.flipped} onFlip={flip} />
      {s.flipped ? (
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" variant="destructive" onClick={() => answer("wrong")}>
            <X /> Errei
          </Button>
          <Button size="lg" variant="success" onClick={() => answer("correct")}>
            <Check /> Acertei
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <Button size="lg" variant="outline" onClick={flip} className="min-w-40">
            Virar
          </Button>
          <p className="mt-2 hidden text-xs text-muted-foreground sm:block">ou aperte Espaço</p>
        </div>
      )}
    </div>
  );
}
