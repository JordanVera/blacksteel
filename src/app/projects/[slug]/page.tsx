import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { getMediaAsset } from "@/content/media";
import { portfolioRepository } from "@/features/portfolio/repository";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ArchitecturalRule } from "@/components/motion/ArchitecturalRule";
import { ArchitecturalCompare } from "@/components/aceternity/ArchitecturalCompare";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";
import { DemoBadge } from "@/components/ui/DemoBadge";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioRepository.getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioRepository.getProjectBySlug(slug);
  if (!project) {
    return buildPageMetadata({
      title: "Project Not Found",
      description: "The requested project study could not be found.",
      path: `/projects/${slug}`,
    });
  }

  const cover = getMediaAsset(project.coverImageId);
  return buildPageMetadata({
    title: `${project.category} in ${project.neighborhood}, ${project.city}`,
    description: project.shortDescription,
    path: `/projects/${project.slug}`,
    ogImage: cover.src,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = portfolioRepository.getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const coverMedia = getMediaAsset(project.coverImageId);
  const allProjects = portfolioRepository.getAllProjects();
  const currentIdx = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    allProjects[(currentIdx + 1) % allProjects.length] ?? allProjects[0];

  return (
    <>
      <PageHero
        index={project.index}
        eyebrow={`${project.category} · ${project.neighborhood}, ${project.city}`}
        title={project.name}
        description={project.shortDescription}
        media={coverMedia}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/projects" },
          { label: project.name },
        ]}
      />

      {/* Project Dossier & Narrative */}
      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-7">
              {project.isDemonstration ? (
                <DemoBadge
                  variant="surface"
                  label="Demonstration Study · Representative Imagery"
                />
              ) : null}
              <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                Architectural Narrative
              </p>
              <p className="max-w-[60ch] text-lg font-light leading-[1.7] text-[#17191B] dark:text-[#F2F0EC]">
                {project.name} is a {project.category.toLowerCase()} by
                BLACKSTEEL Construction &amp; Remodeling in{" "}
                {project.neighborhood}, {project.city}, Texas
                {project.completionDate
                  ? `, completed in ${project.completionDate}.`
                  : "."}
              </p>
              {project.fullNarrative.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[60ch] text-base leading-[1.8] text-[#34383C] dark:text-[#D8D5CF] sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="space-y-8 lg:col-span-5">
              <div className="glass-surface p-7 sm:p-8 space-y-6">
                <dl className="grid grid-cols-2 gap-6 border-b border-[#17191B]/12 pb-6 text-sm dark:border-[#A7A6A3]/20">
                  <div>
                    <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                      Market
                    </dt>
                    <dd className="mt-1.5 font-medium">
                      {project.city}, {project.state}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                      Area
                    </dt>
                    <dd className="mt-1.5 font-medium">
                      {project.neighborhood}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                      Discipline
                    </dt>
                    <dd className="mt-1.5 font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                      Status
                    </dt>
                    <dd className="mt-1.5 font-medium">
                      {project.completionDate ?? "Completed"}
                    </dd>
                  </div>
                </dl>

                <div className="space-y-3">
                  <h2 className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Scope of Work
                  </h2>
                  <ul className="space-y-2 text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                    {project.scopeOfWork.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-3 shrink-0 bg-current opacity-50"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 border-t border-[#17191B]/12 pt-6 dark:border-[#A7A6A3]/20">
                  <h2 className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Materials &amp; Finishes
                  </h2>
                  <ul className="space-y-2 text-sm leading-[1.65] text-[#34383C] dark:text-[#D8D5CF]">
                    {project.materialsAndFinishes.map((mat) => (
                      <li key={mat} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-3 shrink-0 bg-current opacity-50"
                        />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* Optional Before/After Spatial Comparison */}
          {project.beforeAfterImages ? (
            <div className="mt-20 space-y-6 border-t border-[#17191B]/14 pt-16 dark:border-[#A7A6A3]/22">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Transformation Study
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    Before &amp; After Spatial Progression
                  </h2>
                </div>
                <p className="max-w-md text-xs leading-[1.6] text-[#5C5B58] dark:text-[#A7A6A3]">
                  {project.beforeAfterImages.caption}
                </p>
              </div>
              <ArchitecturalCompare
                beforeSrc={
                  getMediaAsset(project.beforeAfterImages.beforeImageId).src
                }
                beforeAlt={
                  getMediaAsset(project.beforeAfterImages.beforeImageId).alt
                }
                beforeLabel="Architectural Volume"
                afterSrc={
                  getMediaAsset(project.beforeAfterImages.afterImageId).src
                }
                afterAlt={
                  getMediaAsset(project.beforeAfterImages.afterImageId).alt
                }
                afterLabel="Finished Interior"
              />
            </div>
          ) : null}

          {/* Editorial Gallery */}
          <div className="mt-20 space-y-8 border-t border-[#17191B]/14 pt-16 dark:border-[#A7A6A3]/22">
            <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
              Architectural Gallery
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {project.galleryImageIds.map((imageId, index) => {
                const img = getMediaAsset(imageId);
                return (
                  <figure
                    key={`${imageId}-${index}`}
                    className={
                      index === 0 ? "md:col-span-2 space-y-3" : "space-y-3"
                    }
                  >
                    <div
                      className={`relative w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20 ${
                        index === 0 ? "aspect-[21/10]" : "aspect-[16/11]"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={
                          index === 0
                            ? "100vw"
                            : "(min-width: 768px) 48vw, 100vw"
                        }
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="flex items-center justify-between text-xs text-[#5C5B58] dark:text-[#A7A6A3]">
                      <span className="tabular-nums uppercase tracking-[0.18em]">
                        Plate 0{index + 1}
                      </span>
                      <span>{img.attribution}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          {/* Next Study Navigation */}
          {nextProject && nextProject.slug !== project.slug ? (
            <div className="mt-20">
              <ArchitecturalRule className="mb-10" />
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
              >
                <div className="space-y-2">
                  <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                    Next Architectural Study
                  </p>
                  <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] transition-opacity group-hover:opacity-75 sm:text-4xl">
                    {nextProject.name}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em]">
                  <span>View Study</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </div>
          ) : null}
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
