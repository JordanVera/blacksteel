import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        size === "default" && "max-w-[1440px]",
        size === "wide" && "max-w-[1600px]",
        size === "narrow" && "max-w-[1080px]",
        className
      )}
    >
      {children}
    </div>
  );
}
