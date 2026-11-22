"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface BentoCardSpotlightProps {
  children: ReactNode;
  className?: string;
  surface?: "dark" | "auto";
}

/**
 * Adapted from Aceternity UI's CardSpotlight + CanvasRevealEffect.
 * Tracks cursor position to cast a monochrome steel radial sheen and reveal
 * an architectural blueprint dot-matrix field underneath with zero WebGL weight.
 */
export function BentoCardSpotlight({
  children,
  className,
  surface = "auto",
}: BentoCardSpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }

  const spotlightMask = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(242, 240, 236, 0.14), transparent 72%)`;
  const dotRevealMask = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, white, transparent 78%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group/spotlight relative overflow-hidden border transition-colors duration-300",
        surface === "dark"
          ? "border-[#A7A6A3]/22 bg-[#17191B] text-[#F2F0EC] hover:border-[#F2F0EC]/40"
          : "border-[#17191B]/14 bg-[#F2F0EC] text-[#17191B] hover:border-[#17191B]/35 dark:border-[#A7A6A3]/22 dark:bg-[#17191B] dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]/40",
        className
      )}
    >
      {/* Monochrome Radial Steel Illumination */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-[1] transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: spotlightMask,
        }}
      />

      {/* Blueprint Dot-Matrix Reveal Layer */}
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300",
          surface === "dark"
            ? "bg-arch-dots-dark"
            : "bg-arch-dots dark:bg-arch-dots-dark"
        )}
        style={{
          opacity: isHovering ? 0.9 : 0,
          maskImage: dotRevealMask,
          WebkitMaskImage: dotRevealMask,
        }}
      />

      {/* Precision Corner Crosshair Accents */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-2 z-[2] h-2.5 w-2.5 border-l border-t border-current opacity-25 transition-opacity duration-300 group-hover/spotlight:opacity-70"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 z-[2] h-2.5 w-2.5 border-b border-r border-current opacity-25 transition-opacity duration-300 group-hover/spotlight:opacity-70"
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
