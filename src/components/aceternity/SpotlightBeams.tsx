'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SpotlightBeamsProps {
  className?: string;
}

const BEAM_PATHS = [
  'M-220 -80 C 120 140, 420 260, 740 420 C 1020 560, 1280 700, 1680 960',
  'M-120 -120 C 220 120, 520 220, 820 390 C 1100 540, 1360 660, 1740 900',
  'M40 -140 C 340 120, 620 200, 910 380 C 1180 540, 1440 640, 1800 840',
  'M240 -150 C 490 120, 740 240, 980 410 C 1240 590, 1520 690, 1860 820',
  'M-280 40 C 80 260, 390 360, 720 510 C 1040 650, 1340 760, 1700 1010',
  'M-240 160 C 140 360, 460 440, 780 580 C 1080 710, 1380 820, 1740 1060',
];

/**
 * Adapted from Aceternity UI's Spotlight + BackgroundBeams.
 * Re-engineered strictly in monochrome steel/ivory architectural skylight tones.
 */
export function SpotlightBeams({ className }: SpotlightBeamsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {/* Monochrome Converging Steel Light Beams */}
      <svg
        className="absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {BEAM_PATHS.map((_, idx) => (
            <motion.linearGradient
              key={`beam-grad-${idx}`}
              id={`bs-beam-grad-${idx}`}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
              animate={
                prefersReducedMotion
                  ? { x1: '25%', x2: '75%', y1: '20%', y2: '75%' }
                  : {
                      x1: ['-20%', '110%'],
                      x2: ['-5%', '125%'],
                      y1: ['-10%', '100%'],
                      y2: ['8%', '115%'],
                    }
              }
              transition={{
                duration: 7 + idx * 1.4,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: idx * 0.9,
              }}
            >
              <stop offset="0%" stopColor="#F2F0EC" stopOpacity="0" />
              <stop offset="35%" stopColor="#A7A6A3" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#F2F0EC" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#F2F0EC" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>

        {BEAM_PATHS.map((d, idx) => (
          <g key={`beam-${idx}`}>
            <path
              d={d}
              stroke="rgba(167, 166, 163, 0.1)"
              strokeWidth="0.75"
              fill="none"
            />
            <path
              d={d}
              stroke={`url(#bs-beam-grad-${idx})`}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
