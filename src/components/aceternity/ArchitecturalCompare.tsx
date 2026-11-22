"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitecturalCompareProps {
  beforeSrc: string;
  beforeAlt: string;
  beforeLabel?: string;
  afterSrc: string;
  afterAlt: string;
  afterLabel?: string;
  initialPercent?: number;
  className?: string;
}

/**
 * Adapted from Aceternity UI's Compare component.
 * Stripped of sparkles and neon glow gradients; re-engineered with a razor
 * 1px Soft Ivory drafting divider, smoked-glass badges, pointer drag, and
 * full keyboard arrow-key accessibility.
 */
export function ArchitecturalCompare({
  beforeSrc,
  beforeAlt,
  beforeLabel = "Architectural Shell",
  afterSrc,
  afterAlt,
  afterLabel = "Finished Interior",
  initialPercent = 52,
  className,
}: ArchitecturalCompareProps) {
  const [sliderXPercent, setSliderXPercent] = useState(initialPercent);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setSliderXPercent(Math.max(4, Math.min(96, raw)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setSliderXPercent((prev) => Math.max(4, prev - 5));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setSliderXPercent((prev) => Math.min(96, prev + 5));
    } else if (event.key === "Home") {
      event.preventDefault();
      setSliderXPercent(10);
    } else if (event.key === "End") {
      event.preventDefault();
      setSliderXPercent(90);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-[#17191B] select-none touch-none cursor-ew-resize border border-[#17191B]/15 dark:border-[#A7A6A3]/25",
        className
      )}
    >
      {/* After Image (Full Base Layer) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        loading="eager"
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover pointer-events-none"
      />

      {/* Before Image (Clipped Overlay Layer) */}
      <div
        className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          loading="eager"
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover pointer-events-none"
        />
      </div>

      {/* Subtle Vignette for Glass Badge Contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24 bg-gradient-to-b from-[#17191B]/55 to-transparent"
      />

      {/* Frosted Architectural Labels */}
      <span className="pointer-events-none absolute left-4 top-4 z-[3] glass-photo px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 z-[3] glass-photo px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
        {afterLabel}
      </span>

      {/* Precision Hairline Divider & Keyboard-Accessible Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Compare architectural shell and finished interior"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(sliderXPercent)}
        onKeyDown={handleKeyDown}
        style={{ left: `${sliderXPercent}%` }}
        className="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-[#F2F0EC]/90 focus-visible:outline-2 focus-visible:outline-[#F2F0EC]"
      >
        <div className="glass-obsidian absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#F2F0EC]/45 text-[#F2F0EC] transition-transform duration-200 hover:scale-105">
          <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
