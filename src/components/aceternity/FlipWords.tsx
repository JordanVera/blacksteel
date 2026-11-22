"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

/**
 * Adapted from Aceternity UI's FlipWords.
 * Cycles architectural positioning statements smoothly with zero layout shift.
 */
export function FlipWords({
  words,
  duration = 3200,
  className,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => window.clearInterval(timer);
  }, [duration, prefersReducedMotion, words.length]);

  const activeWord = words[index] ?? words[0] ?? "";

  if (prefersReducedMotion) {
    return <span className={cn("inline-block", className)}>{activeWord}</span>;
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={activeWord}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {activeWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
