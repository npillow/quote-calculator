import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line/80 bg-card shadow-[0_1px_2px_rgb(12_39_68_/_0.04),0_8px_24px_rgb(12_39_68_/_0.06)]",
        className,
      )}
      {...props}
    />
  );
}
