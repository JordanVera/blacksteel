import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  variant?: "auto" | "obsidian" | "ivory" | "photo";
  className?: string;
}

export function GlassPanel({
  children,
  variant = "auto",
  className,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        variant === "auto" && "glass-surface",
        variant === "obsidian" && "glass-obsidian text-[#F2F0EC]",
        variant === "ivory" && "glass-ivory text-[#17191B]",
        variant === "photo" && "glass-photo",
        className
      )}
    >
      {children}
    </div>
  );
}
