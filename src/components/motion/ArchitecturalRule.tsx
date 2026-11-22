"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ArchitecturalRuleProps {
  className?: string;
  delay?: number;
  tone?: "default" | "contrast" | "light";
}

export function ArchitecturalRule({
  className,
  delay = 0,
  tone = "default",
}: ArchitecturalRuleProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: "left center" }}
      className={cn(
        "h-px w-full",
        tone === "default" && "bg-[#17191B]/15 dark:bg-[#A7A6A3]/25",
        tone === "contrast" && "bg-[#A7A6A3]/25 dark:bg-[#17191B]/15",
        tone === "light" && "bg-[#F2F0EC]/22",
        className
      )}
    />
  );
}
