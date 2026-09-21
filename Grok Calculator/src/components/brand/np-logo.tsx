import { cn } from "@/lib/utils";

export function NpLogo({
  className,
  size = "md",
  plate = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  plate?: boolean;
}) {
  const heights = { sm: "h-14", md: "h-[4.75rem]", lg: "h-28" } as const;
  const img = (
    <img
      src="/np-logo.png"
      alt="NP Benefit Services"
      className={cn("w-auto object-contain", heights[size])}
    />
  );
  if (plate) {
    return (
      <div className={cn("inline-flex rounded-lg bg-white p-3 shadow-sm", className)}>
        {img}
      </div>
    );
  }
  return <div className={cn("flex items-center", className)}>{img}</div>;
}
