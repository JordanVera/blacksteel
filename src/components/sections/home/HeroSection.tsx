'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Container } from '@/components/layout/Container';
import { BlueprintReveal } from '@/components/aceternity/BlueprintReveal';
import { FlipWords } from '@/components/aceternity/FlipWords';
import { MovingBorderButton } from '@/components/aceternity/MovingBorderButton';

const HERO_DISCIPLINES = [
  'Structural Precision.',
  'Bespoke Millwork.',
  'Architectural Permanence.',
  'Complex Remodeling.',
];

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_LINES = [
  [
    { text: 'Built', accent: false },
    { text: 'Beyond', accent: false },
  ],
  [{ text: 'Ordinary.', accent: true }],
];

const REVEAL_HINTS = {
  lens: 'Move to Reveal',
  scan: 'Scanning',
  static: 'Plan / Finish',
} as const;

function StaggeredHeadline() {
  let wordIndex = 0;

  return (
    <h1 className="display-hero text-[#F2F0EC]">
      {HEADLINE_LINES.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.map((word) => {
            const delay = 0.15 + wordIndex++ * 0.12;
            return (
              <span
                key={word.text}
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
              >
                <motion.span
                  initial={{ y: '105%', opacity: 0, filter: 'blur(8px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay, ease: EASE }}
                  className={
                    word.accent
                      ? 'inline-block bg-gradient-to-r from-[#F2F0EC] via-[#D8D5CF] to-[#A7A6A3] bg-clip-text text-transparent'
                      : 'inline-block'
                  }
                >
                  {word.text}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function HeroSection() {
  return (
    <section aria-label="BLACKSTEEL Hero" className="relative text-[#F2F0EC]">
      <BlueprintReveal
        src="/images/kitchen/1.jpg"
        alt="Luxury kitchen remodel with custom millwork, a stone island, and integrated appliances"
        className="min-h-[100svh]"
      >
        {(mode) => (
          <div className="pointer-events-none relative flex flex-1 flex-col">
            {/* Readability Scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,25,27,0.92)_0%,rgba(23,25,27,0.55)_32%,transparent_62%),linear-gradient(to_bottom,rgba(23,25,27,0.6)_0%,transparent_22%)]"
            />

            {/* CAD Frame Corners */}
            <div
              aria-hidden="true"
              className="arch-crosshair absolute inset-x-4 bottom-4 top-24 text-[#F2F0EC] sm:inset-x-6 sm:bottom-6 sm:top-28"
            />

            {/* Top Plan Annotations */}
            <Container className="relative pt-28 sm:pt-32">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
                className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D8D5CF]"
              >
                <div className="space-y-1.5">
                  <p className="text-[#F2F0EC]">Plan 01.A / Kitchen</p>
                  <p className="text-[#A7A6A3]">Scale 1:48 · Sheet A-201</p>
                </div>
                <div className="hidden items-center gap-3 sm:flex">
                  <span
                    aria-hidden="true"
                    className="h-px w-16 bg-[#F2F0EC]/35"
                  />
                  <span>29.76° N · 95.36° W</span>
                </div>
              </motion.div>
            </Container>

            {/* Bottom Headline Block */}
            <Container className="relative mt-auto pb-10 sm:pb-14 lg:pb-16">
              <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
                <div className="space-y-7 lg:col-span-9">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex flex-wrap items-center gap-3"
                  >
                    <span className="glass-photo inline-flex items-center gap-3 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#F2F0EC]">
                      <span className="text-[#A7A6A3]">[01]</span>
                      <span
                        aria-hidden="true"
                        className="h-px w-4 bg-[#F2F0EC]/35"
                      />
                      <span>Houston &amp; Austin, Texas</span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D8D5CF]">
                      Sibling-Owned · Architectural Build Practice
                    </span>
                  </motion.div>

                  <StaggeredHeadline />

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
                    className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-base text-[#D8D5CF] sm:text-xl"
                  >
                    <span className="font-light text-[#D8D5CF]">
                      Engineered for{' '}
                    </span>
                    <FlipWords
                      words={HERO_DISCIPLINES}
                      className="font-display font-semibold tracking-[-0.02em] text-[#F2F0EC]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
                    className="pointer-events-auto flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center"
                  >
                    <MovingBorderButton href="/contact" variant="ivory">
                      <span>Start Your Project</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </MovingBorderButton>

                    <Link
                      href="/projects"
                      className="group glass-photo inline-flex items-center justify-center gap-2.5 px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#F2F0EC] transition-all duration-300 hover:border-[#F2F0EC]/55 hover:bg-[#17191B]/80"
                    >
                      <span>Explore Selected Work</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.div>
                </div>

                {/* Reveal Hint & Scroll Cue */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                  className="flex items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] lg:col-span-3 lg:flex-col lg:items-end"
                >
                  <span className="glass-photo inline-flex items-center gap-2.5 px-3 py-1.5">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#A7BED6] shadow-[0_0_8px_rgba(167,190,214,0.9)] motion-safe:animate-pulse"
                    />
                    <span>{REVEAL_HINTS[mode]}</span>
                  </span>
                  <a
                    href="#studio-introduction"
                    className="group pointer-events-auto inline-flex items-center gap-2.5 text-[#D8D5CF] transition-colors hover:text-[#F2F0EC]"
                  >
                    <span>Scroll</span>
                    <ArrowDown
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </motion.div>
              </div>
            </Container>
          </div>
        )}
      </BlueprintReveal>
    </section>
  );
}
