import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolioRepository } from "@/features/portfolio/repository";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { RevealMask } from "@/components/motion/RevealMask";

export function SelectedWorkSection() {
  const featuredProjects = portfolioRepository.getFeaturedProjects();
  const [leadProject, ...secondaryProjects] = featuredProjects;

  return (
    <SectionShell id="selected-work" surface="canvas" spacing="spacious">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <RevealMask className="max-w-2xl">
            <EditorialHeading
              index="03"
              eyebrow="Selected Work"
              size="section"
              title="Architectural studies in custom remodeling and spatial craft."
              description="Our portfolio architecture is ready for commissioned BLACKSTEEL photography. The studies below demonstrate how our Houston and Austin work is presented with clarity and restraint."
            />
          </RevealMask>

          <RevealMask delay={0.12} className="flex flex-col items-start gap-3 lg:items-end">
            <DemoBadge
              label="Demonstration Portfolio Content"
              variant="surface"
            />
            <ActionLink href="/projects" variant="underline">
              View All Studies
            </ActionLink>
          </RevealMask>
        </div>

        <ArchitecturalRule className="my-12 lg:my-16" />

        {/* Lead Full-Span Architectural Feature */}
        {leadProject ? (
          <RevealMask>
            <article className="group">
              <Link
                href={`/projects/${leadProject.slug}`}
                className="block focus-visible:outline-offset-4"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20 lg:aspect-[21/10]">
                  <Image
                    src={getMediaAsset(leadProject.coverImageId).src}
                    alt={getMediaAsset(leadProject.coverImageId).alt}
                    fill
                    sizes="(min-width: 1280px) 1344px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191B]/82 via-[#17191B]/15 to-[#17191B]/25"
                  />

                  <div className="absolute left-5 top-5 right-5 flex items-center justify-between gap-4">
                    <span className="glass-photo px-3 py-1 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                      {leadProject.index} · {leadProject.category}
                    </span>
                    {leadProject.isDemonstration ? (
                      <DemoBadge label="Demonstration Study" />
                    ) : null}
                  </div>

                  <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
                    <div className="glass-obsidian flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-end sm:p-7">
                      <div className="space-y-2">
                        <p className="eyebrow-label text-[#A7A6A3]">
                          {leadProject.neighborhood} · {leadProject.city},{" "}
                          {leadProject.state}
                        </p>
                        <h3 className="font-serif text-3xl tracking-[-0.015em] text-[#F2F0EC] sm:text-4xl">
                          {leadProject.name}
                        </h3>
                        <p className="max-w-[58ch] text-sm leading-[1.65] text-[#D8D5CF]">
                          {leadProject.shortDescription}
                        </p>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-2 border border-[#F2F0EC]/25 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors group-hover:border-[#F2F0EC] group-hover:bg-[#F2F0EC] group-hover:text-[#17191B]">
                        <span>Examine Study</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </RevealMask>
        ) : null}

        {/* Asymmetric Secondary Pairing */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {secondaryProjects.map((project, idx) => {
            const media = getMediaAsset(project.coverImageId);
            const isFirstSecondary = idx === 0;

            return (
              <RevealMask
                key={project.slug}
                delay={0.1 + idx * 0.1}
                className={
                  isFirstSecondary ? "lg:col-span-7" : "lg:col-span-5 lg:mt-16"
                }
              >
                <article className="group h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-full flex-col focus-visible:outline-offset-4"
                  >
                    <div
                      className={`relative w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20 ${
                        isFirstSecondary
                          ? "aspect-[16/11]"
                          : "aspect-[4/5]"
                      }`}
                    >
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes={
                          isFirstSecondary
                            ? "(min-width: 1024px) 54vw, 100vw"
                            : "(min-width: 1024px) 38vw, 100vw"
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17191B]/55 via-transparent to-[#17191B]/25"
                      />

                      <div className="absolute left-4 top-4 right-4 flex items-center justify-between gap-2">
                        <span className="glass-photo px-2.5 py-1 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                          {project.index}
                        </span>
                        {project.isDemonstration ? (
                          <DemoBadge label="Demo" />
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4 border-t border-[#17191B]/14 pt-5 dark:border-[#A7A6A3]/22">
                      <div className="space-y-1.5">
                        <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                          {project.category} · {project.city}, {project.state}
                        </p>
                        <h3 className="font-serif text-2xl tracking-[-0.015em] text-[#17191B] transition-opacity group-hover:opacity-75 dark:text-[#F2F0EC] sm:text-3xl">
                          {project.name}
                        </h3>
                        <p className="max-w-[46ch] pt-1 text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                          {project.shortDescription}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#17191B]/20 text-[#17191B] transition-all duration-300 group-hover:border-[#17191B] group-hover:bg-[#17191B] group-hover:text-[#F2F0EC] dark:border-[#A7A6A3]/30 dark:text-[#F2F0EC] dark:group-hover:border-[#F2F0EC] dark:group-hover:bg-[#F2F0EC] dark:group-hover:text-[#17191B]"
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              </RevealMask>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
