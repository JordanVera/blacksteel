import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { HeroReveal } from '@/components/motion/HeroReveal';
import { SpotlightBeams } from '@/components/aceternity/SpotlightBeams';
import { ContainerScrollStage } from '@/components/aceternity/ContainerScrollStage';
import { FlipWords } from '@/components/aceternity/FlipWords';
import { MovingBorderButton } from '@/components/aceternity/MovingBorderButton';

const HERO_DISCIPLINES = [
  'Structural Precision.',
  'Bespoke Millwork.',
  'Architectural Permanence.',
  'Complex Remodeling.',
];

const HERO_DISCIPLINES_TEXT = `Engineered for ${HERO_DISCIPLINES.map((word) =>
  word.replace(/\.$/, '').toLowerCase(),
).join(', ')}.`;

export function HeroSection() {
  return (
    <section
      aria-label="BLACKSTEEL Hero"
      className="relative overflow-hidden bg-[#17191B] bg-arch-grid-dark pb-20 pt-36 text-[#F2F0EC] sm:pb-28 sm:pt-44 lg:pb-32 lg:pt-52"
    >
      {/* Steel-blue spotlight + converging light beams */}
      <SpotlightBeams />

      {/* Subtle Radial Vignette Focusing Attention on the Stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_18%,rgba(23,25,27,0.88)_86%)]"
      />

      <Container className="relative z-10">
        {/* Top Monumental Typographic Block */}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-8">
            <HeroReveal
              offset={12}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="glass-photo inline-flex items-center gap-3 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#F2F0EC]">
                <span className="text-[#A7A6A3]">[01]</span>
                <span aria-hidden="true" className="h-px w-4 bg-[#F2F0EC]/35" />
                <span>Houston &amp; Austin, Texas</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                Sibling-Owned · Architectural Build Practice
              </span>
            </HeroReveal>

            <h1 className="display-hero animate-hero-rise text-[#F2F0EC]">
              Built Beyond
              <br />
              <span className="bg-gradient-to-r from-[#F2F0EC] via-[#D8D5CF] to-[#A7A6A3] bg-clip-text text-transparent">
                Ordinary.
              </span>
            </h1>

            <HeroReveal delay={0.22}>
              <p className="sr-only">{HERO_DISCIPLINES_TEXT}</p>
              <div
                aria-hidden="true"
                className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-base text-[#D8D5CF] sm:text-xl"
              >
                <span className="font-light text-[#A7A6A3]">
                  Engineered for{' '}
                </span>
                <FlipWords
                  words={HERO_DISCIPLINES}
                  className="font-display font-semibold tracking-[-0.02em] text-[#F2F0EC]"
                />
              </div>
            </HeroReveal>

            <p className="animate-hero-rise max-w-[58ch] text-[15px] font-light leading-[1.7] text-[#D8D5CF] sm:text-base">
              BLACKSTEEL Construction &amp; Remodeling is a sibling-owned
              contractor for luxury kitchens, bathrooms, whole-home remodels,
              custom cabinetry, and structural additions in Houston and Austin,
              Texas.
            </p>

            <HeroReveal
              delay={0.32}
              className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-center"
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
            </HeroReveal>
          </div>

          {/* Right Smoked-Steel Studio Spec Readout */}
          <HeroReveal delay={0.38} offset={18} className="lg:col-span-4">
            <div className="glass-steel arch-crosshair p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-[#A7A6A3]/22 pb-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-[#A7A6A3]">Practice Telemetry</span>
                <span className="text-[#F2F0EC]">[TX-01 / 02]</span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    Primary Markets
                  </dt>
                  <dd className="mt-1 font-medium text-[#F2F0EC]">
                    Houston &amp; Austin
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    Core Focus
                  </dt>
                  <dd className="mt-1 font-medium text-[#F2F0EC]">
                    Luxury Remodeling
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    Leadership
                  </dt>
                  <dd className="mt-1 font-medium text-[#F2F0EC]">
                    Sibling Principals
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    Portfolio Visuals
                  </dt>
                  <dd className="mt-1 font-medium text-[#F2F0EC]">
                    BLACKSTEEL Photography
                  </dd>
                </div>
              </dl>

              <a
                href="#studio-introduction"
                className="group mt-5 flex items-center justify-between border-t border-[#A7A6A3]/22 pt-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D8D5CF] transition-colors hover:text-[#F2F0EC]"
              >
                <span>Scroll to Unfold Stage</span>
                <ArrowDown
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </HeroReveal>
        </div>

        {/* 3D Perspective ContainerScroll Architectural Showcase Stage */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <ContainerScrollStage>
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[21/10]">
              <Image
                src={'/images/kitchen/1.jpg'}
                alt="Luxury kitchen remodel with custom millwork, a stone island, and integrated appliances"
                fill
                priority
                quality={88}
                sizes="(min-width: 1280px) 1344px, 100vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191B]/85 via-[#17191B]/12 to-[#17191B]/35"
              />

              {/* Top Stage Bar */}
              <div className="absolute inset-x-4 top-4 z-10 flex flex-wrap items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
                <span className="glass-photo px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                  Kitchen Remodel · 01.A
                </span>
              </div>

              {/* Bottom Stage Caption */}
              <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col justify-between gap-4 sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-end">
                <div className="glass-obsidian max-w-xl p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                    Memorial / Westlake Kitchen Standard
                  </p>
                  <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.02em] text-[#F2F0EC] sm:text-xl">
                    Custom cabinetry, bookmatched stone islands, and precision
                    appliance integration executed under direct principal
                    control.
                  </p>
                </div>

                <div className="glass-photo hidden shrink-0 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:block">
                  29.76° N ↔ 30.27° N
                </div>
              </div>
            </div>
          </ContainerScrollStage>
        </div>
      </Container>
    </section>
  );
}
