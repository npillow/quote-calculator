import {
  CreditCard,
  Eye,
  FileText,
  HeartPulse,
  Landmark,
  Shield,
  Smile,
} from "lucide-react";
import type { CoverageType } from "@/lib/portal/types";
import { cn } from "@/lib/utils";

export const TYPE_META: Record<
  CoverageType,
  { label: string; Icon: typeof HeartPulse; tone: string }
> = {
  medical: { label: "Medical", Icon: HeartPulse, tone: "bg-blue/10 text-navy" },
  dental: { label: "Dental", Icon: Smile, tone: "bg-success/12 text-success" },
  vision: { label: "Vision", Icon: Eye, tone: "bg-blue-bright/15 text-navy" },
  life: { label: "Life", Icon: Shield, tone: "bg-navy/10 text-navy" },
  retirement: { label: "401(k)", Icon: Landmark, tone: "bg-warning/12 text-warning" },
};

export const NAV = [
  { to: "/portal", label: "Home", Icon: HeartPulse, match: "home" },
  { to: "/coverage", label: "Coverage", Icon: Shield, match: "coverage" },
  { to: "/claims", label: "Claims", Icon: FileText, match: "claims" },
  { to: "/cards", label: "ID cards", Icon: CreditCard, match: "cards" },
] as const;

export function Meter({
  used,
  max,
  label,
}: {
  used: number;
  max: number;
  label: string;
}) {
  if (max <= 0) return null;
  const pct = Math.min(100, Math.round((used / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
        <span className="font-medium text-muted">{label}</span>
        <span className="tabular-nums text-ink">
          {pct}% · {used.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-paper-2">
        <div
          className="meter-fill h-full rounded-full bg-blue"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6">
      {eyebrow ? (
        <p className="text-[11px] font-semibold tracking-[0.18em] text-blue uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink">
        {title}
      </h1>
      {description ? (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
    </header>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-white px-6 py-12 text-center">
      <p className="font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}

export function TypeChip({ type, className }: { type: CoverageType; className?: string }) {
  const meta = TYPE_META[type];
  const Icon = meta.Icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        meta.tone,
        className,
      )}
    >
      <Icon className="size-3.5" />
      {meta.label}
    </span>
  );
}

export function claimTone(status: string) {
  if (status === "paid") return "green" as const;
  if (status === "processing" || status === "submitted") return "amber" as const;
  return "red" as const;
}
