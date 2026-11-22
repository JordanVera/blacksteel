import { cn } from "@/lib/utils";

interface DemoBadgeProps {
  label?: string;
  variant?: "photo" | "surface";
  className?: string;
}

export function DemoBadge({
  label = "Demonstration Study",
  variant = "photo",
  className,
}: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]",
        variant === "photo" && "glass-photo text-[#F2F0EC]/90",
        variant === "surface" &&
          "border border-[#17191B]/18 bg-[#F2F0EC]/70 text-[#5C5B58] backdrop-blur-sm dark:border-[#A7A6A3]/25 dark:bg-[#17191B]/70 dark:text-[#A7A6A3]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full bg-current opacity-75"
      />
      {label}
    </span>
  );
}
