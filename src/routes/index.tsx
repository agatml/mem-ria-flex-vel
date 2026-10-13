import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/memora/ThemeToggle";
import { CardForm } from "@/components/memora/CardForm";
import { CardList } from "@/components/memora/CardList";
import { ReviewSession } from "@/components/memora/ReviewSession";
import { useFlashcards } from "@/hooks/use-flashcards";
import type { TabId } from "@/lib/flashcards";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Memora — Flashcards para estudar" },
      { name: "description", content: "Crie cartões de frente e verso e revise com o Memora." },
      { property: "og:title", content: "Memora — Flashcards para estudar" },
      { property: "og:description", content: "Crie cartões de frente e verso e revise com o Memora." },
    ],
  }),
  component: Index,
});

function Index() {
  const { cards, loaded, addCard, updateCard, deleteCard } = useFlashcards();
  const [tab, setTab] = useState<TabId>("cards");
  const tabs: { id: TabId; label: string }[] = [
    { id: "cards", label: "Cartões" },
    { id: "review", label: "Revisar" },
  ];

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-primary">M</span>emora
          </h1>
          <div className="flex items-center gap-2">
          <nav className="flex rounded-full bg-muted p-1" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  tab === t.id ? "bg-card text-primary shadow-card" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                {t.id === "cards" && (
                  <span className="rounded-full bg-primary px-2 text-xs text-primary-foreground">{cards.length}</span>
                )}
              </button>
            ))}
          </nav>
          <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {!loaded ? null : tab === "cards" ? (
          <div className="space-y-8">
            <section className="rounded-3xl border bg-card p-5 shadow-card sm:p-6">
              <h2 className="mb-4 text-lg font-bold">Novo cartão</h2>
              <CardForm idPrefix="new" submitLabel="Adicionar cartão" resetOnSubmit onSubmit={addCard} />
            </section>
            <section>
              <h2 className="mb-3 text-lg font-bold">Seus cartões ({cards.length})</h2>
              <CardList cards={cards} onUpdate={updateCard} onDelete={deleteCard} />
            </section>
          </div>
        ) : (
          <ReviewSession cards={cards} onGoCreate={() => setTab("cards")} />
        )}
      </main>
      <Toaster />
    </div>
  );
}
