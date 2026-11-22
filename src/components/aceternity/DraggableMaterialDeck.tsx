"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import { Move, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MaterialBoardItem {
  id: string;
  code: string;
  name: string;
  finish: string;
  tolerance: string;
  note: string;
  imageSrc: string;
  imageAlt: string;
  defaultRotate: number;
}

interface DraggableMaterialDeckProps {
  items: MaterialBoardItem[];
  className?: string;
}

/**
 * Adapted from Aceternity UI's DraggableCard.
 * Presents a tactile stack of architectural material sample boards that
 * visitors can physically drag/fling aside or cycle via accessible buttons.
 */
export function DraggableMaterialDeck({
  items,
  className,
}: DraggableMaterialDeckProps) {
  const [deck, setDeck] = useState<MaterialBoardItem[]>(items);
  const prefersReducedMotion = useReducedMotion();

  const sendTopToBack = () => {
    setDeck((prev) => {
      if (prev.length <= 1) return prev;
      const [first, ...rest] = prev;
      return first ? [...rest, first] : prev;
    });
  };

  const resetDeck = () => {
    setDeck(items);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const distance = Math.hypot(info.offset.x, info.offset.y);
    const velocity = Math.hypot(info.velocity.x, info.velocity.y);
    if (distance > 95 || velocity > 480) {
      sendTopToBack();
    }
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C5B58]">
          <Move className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Drag or Cycle Material Boards</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={sendTopToBack}
            className="border border-[#17191B]/22 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#17191B] transition-colors hover:border-[#17191B] hover:bg-[#17191B] hover:text-[#F2F0EC] cursor-pointer"
          >
            Next Sample
          </button>
          <button
            type="button"
            onClick={resetDeck}
            aria-label="Reset material sample order"
            className="inline-flex h-8 w-8 items-center justify-center border border-[#17191B]/22 text-[#17191B] transition-colors hover:border-[#17191B] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Physical Stacked Material Cards */}
      <div className="relative h-[430px] w-full sm:h-[460px]">
        {deck.map((card, index) => {
          const isTop = index === 0;
          const depth = index;
          return (
            <motion.div
              key={card.id}
              layout
              drag={isTop && !prefersReducedMotion}
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.72}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.03, cursor: "grabbing" }}
              animate={{
                scale: 1 - depth * 0.04,
                y: depth * 12,
                rotate: isTop ? 0 : card.defaultRotate,
                opacity: 1 - depth * 0.14,
                zIndex: deck.length - depth,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
              className={cn(
                "absolute inset-x-0 top-0 overflow-hidden border border-[#A7A6A3]/30 bg-[#17191B] shadow-[0_28px_64px_-24px_rgba(0,0,0,0.72)]",
                isTop
                  ? "cursor-grab active:cursor-grabbing"
                  : "pointer-events-none"
              )}
            >
              <div className="relative h-56 w-full overflow-hidden border-b border-[#A7A6A3]/22 sm:h-60">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="pointer-events-none object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17191B]/85 via-transparent to-[#17191B]/30" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="glass-photo px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                    {card.code}
                  </span>
                  <span className="glass-photo px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#D8D5CF]">
                    {card.tolerance}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "space-y-2.5 bg-[#17191B] p-5 transition-opacity duration-200 sm:p-6",
                  !isTop && "opacity-0"
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                  {card.finish}
                </p>
                <h4 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[#F2F0EC]">
                  {card.name}
                </h4>
                <p className="text-xs leading-[1.68] text-[#D8D5CF] sm:text-sm">
                  {card.note}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
