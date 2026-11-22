'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ArchitecturalLampProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adapted from Aceternity UI's LampContainer.
 * Re-engineered as a monochrome architectural skylight beam cutting downward
 * across dark obsidian with a seamless gradient fade and zero neon casts.
 */
export function ArchitecturalLamp({
  children,
  className,
}: ArchitecturalLampProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#17191B]  py-24 sm:py-32 lg:py-40',
        className,
      )}
    >
      {/* Seamless Overhead Monochrome Skylight Field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 25%, transparent 100%)',
        }}
      >
        {/* Overhead Radial Skylight Wash */}
        <div className="absolute left-1/2 top-0 h-[280px] w-[46rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#F2F0EC]/18 blur-[95px]" />

        {/* Razor-Thin Overhead Architectural Light Slot */}
        <motion.div
          initial={
            prefersReducedMotion ? { width: '26rem' } : { width: '12rem' }
          }
          whileInView={{ width: '26rem' }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-10 h-px max-w-[78vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F2F0EC] to-transparent"
        />

        {/* Subtle Architectural Cone */}
        <div
          className="absolute left-1/2 top-10 h-64 w-[40rem] max-w-[90vw] -translate-x-1/2 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at top center, rgba(242,240,236,0.34) 0%, rgba(167,166,163,0.08) 45%, transparent 75%)',
          }}
        />
      </div>

      {/* Illuminated Content */}
      <div className="relative z-10 w-full pt-8">{children}</div>
    </div>
  );
}
