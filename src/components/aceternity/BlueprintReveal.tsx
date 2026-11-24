"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export type BlueprintRevealMode = "lens" | "scan" | "static";

interface BlueprintRevealProps {
  src: string;
  alt: string;
  revealRadius?: number;
  sizes?: string;
  className?: string;
  children?: (mode: BlueprintRevealMode) => ReactNode;
}

const SPRING = { stiffness: 170, damping: 26, mass: 0.6 };

/**
 * Adapted from Aceternity UI's Lens and Compare components.
 * Renders a photograph as a steel-blue blueprint drawing and reveals the
 * finished interior through a cursor-tracked optical lens. Touch devices get
 * an auto-sweeping scan line; reduced-motion users get a static split.
 */
export function BlueprintReveal({
  src,
  alt,
  revealRadius = 220,
  sizes = "100vw",
  className,
  children,
}: BlueprintRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<BlueprintRevealMode>("lens");

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);
  const radius = useMotionValue(0);
  const scan = useMotionValue(0);

  const lensMask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, black 58%, transparent 100%)`;
  const scanClip = useTransform(scan, (value) => `inset(0 ${100 - value}% 0 0)`);
  const scanLeft = useMotionTemplate`${scan}%`;
  const reticleScale = useTransform(radius, [0, revealRadius], [0.4, 1]);
  const reticleOpacity = useTransform(radius, [0, revealRadius * 0.5], [0, 1]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const noHover = window.matchMedia("(hover: none)");

    const resolve = () => {
      if (reducedMotion.matches) return setMode("static");
      setMode(noHover.matches ? "scan" : "lens");
    };

    resolve();
    reducedMotion.addEventListener("change", resolve);
    noHover.addEventListener("change", resolve);
    return () => {
      reducedMotion.removeEventListener("change", resolve);
      noHover.removeEventListener("change", resolve);
    };
  }, []);

  useEffect(() => {
    if (mode === "lens") {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = rect.width * 0.62;
        const cy = rect.height * 0.42;
        pointerX.jump(cx);
        pointerY.jump(cy);
        x.jump(cx);
        y.jump(cy);
      }
      const intro = animate(radius, [0, revealRadius * 1.55, revealRadius], {
        duration: 1.9,
        delay: 0.55,
        times: [0, 0.58, 1],
        ease: [0.22, 1, 0.36, 1],
      });
      return () => intro.stop();
    }

    if (mode === "scan") {
      scan.jump(0);
      const sweep = animate(scan, 100, {
        duration: 4.2,
        delay: 0.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 1.6,
      });
      return () => sweep.stop();
    }
  }, [mode, pointerX, pointerY, radius, revealRadius, scan, x, y]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "lens" || event.pointerType === "touch") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "lens" || event.pointerType === "touch") return;
    handlePointerMove(event);
    animate(radius, revealRadius, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== "lens" || event.pointerType === "touch") return;
    animate(radius, revealRadius * 0.55, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
  };

  // Motion leaves stale inline values behind when a key disappears, so every
  // mode must set both properties explicitly.
  const realityStyle =
    mode === "lens"
      ? { maskImage: lensMask, WebkitMaskImage: lensMask, clipPath: "none" }
      : {
          maskImage: "none",
          WebkitMaskImage: "none",
          clipPath: mode === "scan" ? scanClip : "inset(0 0 0 50%)",
        };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-[#17191B]",
        mode === "lens" && "cursor-crosshair",
        className
      )}
    >
      {/* Blueprint Drawing Layer */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes={sizes}
          className="blueprint-filter object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#4F6F8F] mix-blend-color" />
        <div className="absolute inset-0 bg-[#0F1A26]/35 mix-blend-multiply" />
        <div className="bg-blueprint-grid absolute inset-0 opacity-80" />
      </div>

      {/* Finished Reality Layer */}
      <motion.div className="absolute inset-0 z-[1]" style={realityStyle}>
        <Image
          src={src}
          alt={alt}
          fill
          loading="eager"
          sizes={sizes}
          className="object-cover object-center"
        />
      </motion.div>

      {/* Lens Reticle */}
      {mode === "lens" ? (
        <motion.div
          aria-hidden="true"
          style={{ x, y }}
          className="pointer-events-none absolute left-0 top-0 z-[2] h-0 w-0"
        >
          <motion.div
            style={{
              scale: reticleScale,
              opacity: reticleOpacity,
              width: revealRadius * 1.16,
              height: revealRadius * 1.16,
              marginLeft: revealRadius * -0.58,
              marginTop: revealRadius * -0.58,
            }}
            className="relative rounded-full border border-[#F2F0EC]/55"
          >
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-[#F2F0EC]/80" />
            <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-[#F2F0EC]/80" />
            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#F2F0EC]/80" />
            <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-[#F2F0EC]/80" />
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2F0EC]/70" />
          </motion.div>
        </motion.div>
      ) : null}

      {/* Scan Line / Static Split Divider */}
      {mode !== "lens" ? (
        <motion.div
          aria-hidden="true"
          style={{ left: mode === "scan" ? scanLeft : "50%" }}
          className="pointer-events-none absolute inset-y-0 z-[2] w-px -translate-x-1/2 bg-[#F2F0EC]/85 shadow-[0_0_18px_2px_rgba(167,190,214,0.45)]"
        />
      ) : null}

      <div className="relative z-[3] flex flex-1 flex-col">{children?.(mode)}</div>
    </div>
  );
}
