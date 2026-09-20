import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type StepperProps = {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
};

export function Stepper({
  label,
  hint,
  value,
  min = 0,
  max = 500,
  onChange,
  size = "md",
}: StepperProps) {
  const btn = size === "sm" ? "size-10" : "size-11";
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          className={cn(
            "inline-flex items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted",
            btn,
          )}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="size-4" />
        </button>
        <input
          inputMode="numeric"
          aria-label={label}
          className="h-11 w-14 rounded-md border border-input bg-card text-center text-base tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={value}
          onChange={(e) => {
            const next = e.target.value.replace(/[^\d]/g, "");
            onChange(Math.min(max, Math.max(min, next === "" ? 0 : Number(next))));
          }}
        />
        <button
          type="button"
          aria-label={`Increase ${label}`}
          className={cn(
            "inline-flex items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted",
            btn,
          )}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
