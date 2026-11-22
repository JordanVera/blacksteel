"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MediaAsset } from "@/types/domain";
import { cn } from "@/lib/utils";

interface EditorialParallaxGridProps {
  items: {
    media: MediaAsset;
    caption: string;
    index: string;
  }[];
  className?: string;
}

/**
 * Adapted from Aceternity UI's Parallax Scroll component.
 * Uses restrained opposing vertical motion (±30px) on desktop, disabled
 * cleanly for prefers-reduced-motion and stacked cleanly on mobile.
 */
export function EditorialParallaxGrid({
  items,
  className,
}: EditorialParallaxGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateUp = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [28, -28]
  );
  const translateDown = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-28, 28]
  );

  const leftColumn = items.filter((_, i) => i % 2 === 0);
  const rightColumn = items.filter((_, i) => i % 2 === 1);

  return (
    <div
      ref={containerRef}
      className={cn("grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12", className)}
    >
      <motion.div
        style={{ y: translateUp }}
        className="flex flex-col gap-8 lg:gap-12"
      >
        {leftColumn.map((item) => (
          <figure key={item.index} className="space-y-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#17191B] border border-[#17191B]/12 dark:border-[#A7A6A3]/20">
              <Image
                src={item.media.src}
                alt={item.media.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between text-xs text-[#5C5B58] dark:text-[#A7A6A3]">
              <span className="tabular-nums tracking-[0.18em] uppercase">
                {item.index}
              </span>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </motion.div>

      <motion.div
        style={{ y: translateDown }}
        className="flex flex-col gap-8 md:mt-16 lg:gap-12"
      >
        {rightColumn.map((item) => (
          <figure key={item.index} className="space-y-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#17191B] border border-[#17191B]/12 dark:border-[#A7A6A3]/20">
              <Image
                src={item.media.src}
                alt={item.media.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between text-xs text-[#5C5B58] dark:text-[#A7A6A3]">
              <span className="tabular-nums tracking-[0.18em] uppercase">
                {item.index}
              </span>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
