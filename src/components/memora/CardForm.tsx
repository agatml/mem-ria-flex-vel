import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CardInput } from "@/lib/flashcards";

interface CardFormProps {
  initial?: CardInput;
  submitLabel: string;
  onSubmit: (input: CardInput) => void;
  onCancel?: () => void;
  resetOnSubmit?: boolean;
  idPrefix: string;
}

type Errors = Partial<Record<keyof CardInput, string>>;

export function CardForm({ initial, submitLabel, onSubmit, onCancel, resetOnSubmit, idPrefix }: CardFormProps) {
  const [front, setFront] = useState(initial?.front ?? "");
  const [back, setBack] = useState(initial?.back ?? "");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!front.trim()) next.front = "Escreva a pergunta da frente do cartão.";
    if (!back.trim()) next.back = "Escreva a resposta do verso do cartão.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ front: front.trim(), back: back.trim() });
    if (resetOnSubmit) {
      setFront("");
      setBack("");
    }
  };

  const field = (key: keyof CardInput, label: string, value: string, set: (v: string) => void, ph: string) => (
    <div className="space-y-2">
      <Label htmlFor={`${idPrefix}-${key}`}>{label}</Label>
      <Textarea
        id={`${idPrefix}-${key}`}
        value={value}
        placeholder={ph}
        rows={3}
        aria-invalid={!!errors[key]}
        onChange={(e) => {
          set(e.target.value);
          if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
        }}
        className="resize-none bg-background"
      />
      {errors[key] && <p className="text-sm font-medium text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {field("front", "Frente", front, setFront, "Ex.: Qual é a capital da Austrália?")}
      {field("back", "Verso", back, setBack, "Ex.: Camberra")}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
