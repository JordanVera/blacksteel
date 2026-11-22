"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScanSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitecturalLensProps {
  children: ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  label?: string;
  className?: string;
}

/**
 * Adapted from Aceternity UI's Lens component.
 * Renders a precision optical magnifying loupe following cursor or touch over
 * architectural craft photography, with a keyboard/button inspect toggle.
 */
export function ArchitecturalLens({
  children,
  zoomFactor = 2.05,
  lensSize = 190,
  label = "Optical Tolerance Loupe · 2.0×",
  className,
}: ArchitecturalLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [position, setPosition] = useState({ x: 220, y: 160 });

  const updatePointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
      y: Math.max(0, Math.min(rect.height, clientY - rect.top)),
    });
  };

  const active = isHovering || pinned;

  return (
    <div
      ref={containerRef}
      onMouseEnter={(event) => {
        setIsHovering(true);
        updatePointer(event.clientX, event.clientY);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={(event) => updatePointer(event.clientX, event.clientY)}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        setIsHovering(true);
        updatePointer(touch.clientX, touch.clientY);
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (!touch) return;
        updatePointer(touch.clientX, touch.clientY);
      }}
      className={cn(
        "relative overflow-hidden border border-[#A7A6A3]/28 bg-[#17191B] select-none cursor-crosshair",
        className
      )}
    >
      {children}

      {/* Top Optical Telemetry Pill & Keyboard Inspect Toggle */}
      <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-center justify-between gap-2">
        <span className="glass-photo px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
          {label}
        </span>
        <button
          type="button"
          onClick={() => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect && !pinned) {
              setPosition({ x: rect.width * 0.5, y: rect.height * 0.5 });
            }
            setPinned((prev) => !prev);
          }}
          aria-pressed={pinned}
          className="pointer-events-auto glass-photo inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:border-[#F2F0EC]/60 cursor-pointer"
        >
          <ScanSearch className="h-3 w-3" aria-hidden="true" />
          <span>{pinned ? "Loupe Locked" : "Toggle Loupe"}</span>
        </button>
      </div>

      {/* Magnified Optical Circle */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            style={{
              maskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 98%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 98%, transparent 100%)`,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Steel Loupe Reticle Ring */}
      <AnimatePresence>
        {active ? (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            style={{
              width: lensSize,
              height: lensSize,
              left: position.x - lensSize / 2,
              top: position.y - lensSize / 2,
            }}
            className="pointer-events-none absolute z-20 rounded-full border border-[#F2F0EC]/80 shadow-[0_0_0_1px_rgba(23,25,27,0.85),0_20px_50px_rgba(0,0,0,0.65)]"
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-[#F2F0EC]/75" />
            <span className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2 bg-[#F2F0EC]/75" />
            <span className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-[#F2F0EC]/75" />
            <span className="absolute right-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-[#F2F0EC]/75" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
