import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getMediaAsset } from '@/content/media';
import { Container } from '@/components/layout/Container';
import { ArchitecturalRule } from '@/components/motion/ArchitecturalRule';
import { RevealMask } from '@/components/motion/RevealMask';

const CONSULTATION_PROTOCOL = [
  {
    step: '01',
    title: 'Principal Review',
    detail: 'Every inquiry is reviewed directly by our sibling founders.',
  },
  {
    step: '02',
    title: 'Scope Alignment',
    detail: 'Architectural intent, design status, and schedule clarity.',
  },
  {
    step: '03',
    title: 'Site Walkthrough',
    detail: 'On-site feasibility evaluation in Houston or Austin.',
  },
] as const;

const MARKET_CORRIDORS = [
  {
    city: 'Houston',
    region: 'Gulf Coast',
    coords: '29.7604° N',
    href: '/locations/houston',
  },
  {
    city: 'Austin',
    region: 'Hill Country',
    coords: '30.2672° N',
    href: '/locations/austin',
  },
] as const;

export function FinalConversionSection() {
  const folioMedia = getMediaAsset('residence-pavilion');

  return (
    <section
      id="start-project"
      aria-label="Start a project with BLACKSTEEL"
      className="relative overflow-hidden border-t border-[#A7A6A3]/20 bg-[#17191B] py-20 text-[#F2F0EC] sm:py-28 lg:py-32"
    >
      <Container className="relative z-10">
        {/* Top Architectural Index Bar */}
        <RevealMask className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 eyebrow-label text-[#A7A6A3]">
            <span className="tabular-nums text-[#F2F0EC]">[08]</span>
            <span aria-hidden="true" className="h-px w-6 bg-[#A7A6A3]/45" />
            <span>Private Commissions</span>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
            Houston &amp; Austin, Texas · By Appointment Only
          </p>
        </RevealMask>

        <ArchitecturalRule tone="light" className="my-7 lg:my-10" />

        {/* Asymmetric 12-Column Architectural Commission Folio */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          {/* Left Column: Monumental Typographic Statement, Actions & Protocol */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="space-y-7">
              <RevealMask delay={0.05}>
                <h2 className="font-display text-[clamp(2.5rem,5vw,4.65rem)] font-semibold leading-[1.02] tracking-[-0.036em] text-[#F2F0EC]">
                  Let&apos;s Build Something
                  <span className="mt-1 block text-[#A7A6A3]">
                    Unmistakable.
                  </span>
                </h2>
              </RevealMask>

              <RevealMask delay={0.1}>
                <p className="max-w-[52ch] text-base leading-[1.75] text-[#D8D5CF] sm:text-[17px]">
                  Whether you are planning a whole-home architectural remodel, a
                  custom kitchen or bath, a structural addition, or a complex
                  reconstruction in Houston or Austin, our sibling principals
                  welcome a private conversation.
                </p>
              </RevealMask>

              {/* Sculptural Milled-Plate CTA Row */}
              <RevealMask
                delay={0.15}
                className="flex flex-col gap-3.5 pt-2 sm:flex-row sm:items-stretch"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-stretch justify-between border border-[#F2F0EC] bg-[#F2F0EC] text-[#17191B] transition-colors duration-300 hover:border-[#D8D5CF] hover:bg-[#D8D5CF]"
                >
                  <span className="flex items-center px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em]">
                    Start Your Project
                  </span>
                  <span className="flex items-center justify-center border-l border-[#17191B]/15 px-4 transition-colors duration-300 group-hover:border-[#17191B]/25">
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>

                <Link
                  href="/process"
                  className="group inline-flex items-center justify-between gap-3 border border-[#F2F0EC]/22 px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#F2F0EC] transition-colors duration-300 hover:border-[#F2F0EC]/65 hover:bg-[#F2F0EC]/[0.05]"
                >
                  <span>Review Methodology</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-[#A7A6A3] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F2F0EC]"
                    aria-hidden="true"
                  />
                </Link>
              </RevealMask>
            </div>

            {/* Bottom Consultation Protocol Ledger */}
            <RevealMask
              delay={0.2}
              className="mt-14 border-t border-[#A7A6A3]/20 pt-8 lg:mt-16"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                  Consultation Protocol
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]/75">
                  Direct Principal Access
                </p>
              </div>

              <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-7">
                {CONSULTATION_PROTOCOL.map((item) => (
                  <li
                    key={item.step}
                    className="space-y-2 border-l border-[#A7A6A3]/22 pl-4"
                  >
                    <span className="block font-mono text-[10px] tabular-nums tracking-[0.2em] text-[#A7A6A3]">
                      [{item.step}]
                    </span>
                    <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-[#F2F0EC]">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-[1.68] text-[#A7A6A3]">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </RevealMask>
          </div>

          {/* Right Column: Composed Architectural Folio Plate */}
          <RevealMask delay={0.14} className="lg:col-span-5">
            <div className="arch-crosshair flex h-full flex-col border border-[#F2F0EC]/15 bg-[#1D2023]">
              {/* Architectural Study Frame */}
              <div className="group relative min-h-[300px] flex-1 overflow-hidden bg-[#17191B] sm:min-h-[360px]">
                <Image
                  src={folioMedia.src}
                  alt={folioMedia.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#17191B]/50 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#17191B]/95 via-[#17191B]/45 to-transparent"
                />

                {/* Top Corner Architectural Stamps */}
                <div className="absolute inset-x-4 top-4">
                  <span className="border border-[#F2F0EC]/16 bg-[#17191B]/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F0EC] backdrop-blur-sm">
                    Folio · 08
                  </span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                    Material &amp; Structural Standard
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold leading-[1.2] tracking-[-0.02em] text-[#F2F0EC]">
                    Blackened steel, architectural concrete, and custom
                    millwork.
                  </p>
                </div>
              </div>

              {/* Lower Corridor Dossier Strip */}
              <div className="border-t border-[#F2F0EC]/14 bg-[#17191B] p-5 sm:p-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#A7A6A3]">
                  <span>Active Corridors</span>
                  <span className="text-[#F2F0EC]/80">Limited Roster</span>
                </div>

                <div className="mt-4 grid grid-cols-2 divide-x divide-[#F2F0EC]/14 border border-[#F2F0EC]/14">
                  {MARKET_CORRIDORS.map((market) => (
                    <Link
                      key={market.city}
                      href={market.href}
                      className="group flex flex-col justify-between gap-3 p-4 transition-colors duration-300 hover:bg-[#F2F0EC]/[0.05]"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg font-semibold tracking-[-0.02em] text-[#F2F0EC]">
                          {market.city}
                        </span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-[#A7A6A3] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#F2F0EC]"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[#D8D5CF]">
                          {market.region}
                        </span>
                        <span className="block font-mono text-[10px] tabular-nums tracking-[0.12em] text-[#A7A6A3]">
                          {market.coords}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </RevealMask>
        </div>
      </Container>
    </section>
  );
}
