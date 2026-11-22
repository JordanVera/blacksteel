"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MovingBorderButtonProps {
  href: string;
  children: ReactNode;
  variant?: "ivory" | "obsidian";
  className?: string;
}

/**
 * Adapted from Aceternity UI's MovingBorder.
 * Channels a continuous monochrome silver-steel glint around the button's
 * architectural perimeter without flashy color gradients.
 */
export function MovingBorderButton({
  href,
  children,
  variant = "obsidian",
  className,
}: MovingBorderButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex overflow-hidden p-[1px] focus-visible:outline-offset-4",
        className
      )}
    >
      {/* Rotating Monochrome Steel Perimeter Beam */}
      <motion.span
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            variant === "obsidian"
              ? "conic-gradient(from 0deg, transparent 0deg, rgba(242,240,236,0.92) 48deg, transparent 105deg, transparent 360deg)"
              : "conic-gradient(from 0deg, transparent 0deg, rgba(23,25,27,0.85) 48deg, transparent 105deg, transparent 360deg)",
        }}
        className="pointer-events-none absolute inset-[-180%] will-change-transform"
      />

      {/* Inner Architectural Surface */}
      <span
        className={cn(
          "relative z-10 inline-flex items-center justify-center gap-2.5 px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
          variant === "obsidian"
            ? "bg-[#17191B] text-[#F2F0EC] group-hover:bg-[#222528]"
            : "bg-[#F2F0EC] text-[#17191B] group-hover:bg-[#E8E5DF]"
        )}
      >
        {children}
      </span>
    </Link>
  );
}
