import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createId, loadCards, saveCards, type CardInput, type Flashcard } from "@/lib/flashcards";

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCards(loadCards());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Flashcard[]) => {
    setCards(next);
    if (!saveCards(next)) {
      toast.error("Não foi possível salvar no navegador. Suas alterações podem se perder ao recarregar.");
    }
  }, []);

  const addCard = (input: CardInput) =>
    persist([{ id: createId(), createdAt: Date.now(), ...input }, ...cards]);
  const updateCard = (id: string, input: CardInput) =>
    persist(cards.map((c) => (c.id === id ? { ...c, ...input } : c)));
  const deleteCard = (id: string) => persist(cards.filter((c) => c.id !== id));

  return { cards, loaded, addCard, updateCard, deleteCard };
}
