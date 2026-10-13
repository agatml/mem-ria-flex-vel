import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CardForm } from "./CardForm";
import type { CardInput, Flashcard } from "@/lib/flashcards";

interface CardListProps {
  cards: Flashcard[];
  onUpdate: (id: string, input: CardInput) => void;
  onDelete: (id: string) => void;
}

export function CardList({ cards, onUpdate, onDelete }: CardListProps) {
  const [editing, setEditing] = useState<Flashcard | null>(null);
  const [deleting, setDeleting] = useState<Flashcard | null>(null);

  if (!cards.length) {
    return (
      <p className="rounded-2xl border border-dashed bg-card p-8 text-center text-muted-foreground">
        Nenhum cartão ainda. Crie o primeiro acima!
      </p>
    );
  }

  return (
    <>
      <ul className="space-y-3">
        {cards.map((card) => (
          <li key={card.id} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-card sm:p-5">
            <div className="min-w-0 flex-1 space-y-1">
              <p className="break-words font-semibold">{card.front}</p>
              <p className="break-words text-sm text-muted-foreground">{card.back}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button variant="ghost" size="icon" aria-label="Editar cartão" onClick={() => setEditing(card)}>
                <Pencil />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Excluir cartão" className="text-destructive hover:text-destructive" onClick={() => setDeleting(card)}>
                <Trash2 />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar cartão</DialogTitle>
            <DialogDescription>Altere a frente ou o verso e salve.</DialogDescription>
          </DialogHeader>
          {editing && (
            <CardForm
              key={editing.id}
              idPrefix="edit"
              initial={editing}
              submitLabel="Salvar alterações"
              onCancel={() => setEditing(null)}
              onSubmit={(input) => {
                onUpdate(editing.id, input);
                setEditing(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir este cartão?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleting?.front}” será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleting && onDelete(deleting.id)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
