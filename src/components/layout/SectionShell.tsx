import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionSurface =
  | "canvas"
  | "elevated"
  | "contrast"
  | "obsidian";

interface SectionShellProps {
  id?: string;
  surface?: SectionSurface;
  spacing?: "default" | "spacious" | "compact" | "none";
  children: ReactNode;
  className?: string;
}

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  canvas: "bg-[#F2F0EC] text-[#17191B] dark:bg-[#17191B] dark:text-[#F2F0EC]",
  elevated: "bg-[#E8E5DF] text-[#17191B] dark:bg-[#34383C] dark:text-[#F2F0EC]",
  contrast: "bg-[#17191B] text-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]",
  obsidian: "bg-[#17191B] text-[#F2F0EC]",
};

const SPACING_CLASSES = {
  default: "py-24 sm:py-28 lg:py-36",
  spacious: "py-28 sm:py-36 lg:py-44",
  compact: "py-16 sm:py-20 lg:py-24",
  none: "",
};

export function SectionShell({
  id,
  surface = "canvas",
  spacing = "default",
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative transition-colors duration-300",
        SURFACE_CLASSES[surface],
        SPACING_CLASSES[spacing],
        className
      )}
    >
      {children}
    </section>
  );
}
