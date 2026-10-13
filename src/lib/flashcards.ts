export interface Flashcard {
  id: string;
  front: string;
  back: string;
  createdAt: number;
}

export type CardInput = Pick<Flashcard, "front" | "back">;
export type ReviewResult = "correct" | "wrong";
export type TabId = "cards" | "review";

const STORAGE_KEY = "memora:cards";

function isFlashcard(v: unknown): v is Flashcard {
  if (!v || typeof v !== "object") return false;
  const c = v as Record<string, unknown>;
  return typeof c.id === "string" && typeof c.front === "string" && typeof c.back === "string";
}

export function loadCards(): Flashcard[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isFlashcard) : [];
  } catch (e) {
    console.warn("Memora: não foi possível ler os cartões salvos.", e);
    return [];
  }
}

export function saveCards(cards: Flashcard[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    return true;
  } catch (e) {
    console.warn("Memora: não foi possível salvar os cartões.", e);
    return false;
  }
}

export function createId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
