"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";

export function HeroSection() {
  const heroMedia = getMediaAsset("residence-pavilion");

  return (
    <section
      aria-label="BLACKSTEEL Hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#17191B] text-[#F2F0EC]"
    >
      {/* Full-bleed architectural photography with subtle settle zoom */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt}
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Directional architectural vignette for guaranteed WCAG AA legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#17191B]/72 via-[#17191B]/28 to-[#17191B]/92"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#17191B]/75 via-[#17191B]/25 to-transparent"
      />

      {/* Main Content Anchored to Lower Architectural Baseline */}
      <Container className="relative z-10 pb-12 pt-36 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="glass-photo inline-flex items-center gap-3 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#F2F0EC]">
                <span className="tabular-nums text-[#A7A6A3]">01</span>
                <span aria-hidden="true" className="h-px w-4 bg-[#F2F0EC]/35" />
                <span>Houston &amp; Austin, Texas</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8D5CF]/80">
                Architectural Remodeling &amp; Custom Construction
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="display-hero text-[#F2F0EC]"
              >
                Built Beyond
                <br />
                <span className="italic font-normal text-[#F2F0EC]/92">
                  Ordinary.
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[52ch] text-base leading-[1.7] font-light text-[#D8D5CF] sm:text-lg"
            >
              Luxury residential remodeling, bespoke millwork, and architectural
              construction executed with structural rigor and quiet restraint by
              a family-owned Texas practice.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3.5 pt-1 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 border border-[#F2F0EC] bg-[#F2F0EC] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#17191B] transition-colors duration-300 hover:bg-[#D8D5CF]"
              >
                <span>Start Your Project</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/projects"
                className="group glass-photo inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#F2F0EC] transition-all duration-300 hover:border-[#F2F0EC]/50 hover:bg-[#17191B]/72"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* Smoked-Glass Architectural Metadata & Scroll Dock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:flex lg:justify-end"
          >
            <div className="glass-obsidian w-full max-w-sm p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-[#A7A6A3]/22 pb-3.5">
                <span className="eyebrow-label text-[#A7A6A3]">
                  Studio Focus
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#F2F0EC]/80">
                  Demo Photography
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    Markets
                  </dt>
                  <dd className="mt-1 font-medium text-[#F2F0EC]">
                    Houston &amp; Austin
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-[#A7A6A3]">
                    Practice
                  </dt>
                  <dd className="mt-1 font-medium text-[#F2F0EC]">
                    Sibling-Owned
                  </dd>
                </div>
              </dl>

              <a
                href="#studio-introduction"
                className="group mt-5 flex items-center justify-between border-t border-[#A7A6A3]/22 pt-3.5 text-[11px] uppercase tracking-[0.2em] text-[#D8D5CF] transition-colors hover:text-[#F2F0EC]"
              >
                <span>Scroll to Explore</span>
                <ArrowDown
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
