import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-paper-2 text-ink",
  blue: "bg-blue/10 text-navy",
  green: "bg-success/12 text-success",
  amber: "bg-warning/12 text-warning",
  red: "bg-red/10 text-red-deep",
} as const;

export function Badge({
  className,
  tone = "neutral",
  children,
}: {
  className?: string;
  tone?: keyof typeof tones;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
