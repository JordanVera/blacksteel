"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ContainerScrollStageProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adapted from Aceternity UI's ContainerScroll.
 * Presents an architectural viewport tilted in subtle 3D perspective that
 * physically straightens into full-plane focus as the visitor scrolls.
 */
export function ContainerScrollStage({
  children,
  className,
}: ContainerScrollStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <div
      ref={stageRef}
      style={{ perspective: "1200px" }}
      className={cn("relative w-full", className)}
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                scale,
                y: translateY,
                transformStyle: "preserve-3d",
              }
        }
        className="will-change-transform border border-[#A7A6A3]/25 bg-[#17191B] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)] sm:p-3"
      >
        <div className="relative overflow-hidden border border-[#F2F0EC]/12 bg-[#17191B]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
