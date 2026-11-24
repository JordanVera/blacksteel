'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface HeroRevealProps {
  children: ReactNode;
  delay?: number;
  offset?: number;
  className?: string;
}

/** Entrance fade for secondary hero content. Keep LCP text and imagery outside it. */
export function HeroReveal({
  children,
  delay = 0,
  offset = 16,
  className,
}: HeroRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
