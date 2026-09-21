import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-sm text-ink shadow-sm",
          "placeholder:text-muted/70",
          "transition-[border-color,box-shadow] duration-150",
          "focus-visible:border-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/25",
          "disabled:cursor-not-allowed disabled:bg-paper",
          className,
        )}
        {...props}
      />
    );
  },
);
