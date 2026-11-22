"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectCategory, ProjectRecord } from "@/types/domain";
import { getMediaAsset } from "@/content/media";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/utils";

interface PortfolioGridClientProps {
  projects: ProjectRecord[];
}

export function PortfolioGridClient({ projects }: PortfolioGridClientProps) {
  const [selectedCity, setSelectedCity] = useState<"All" | "Houston" | "Austin">(
    "All"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique] as ("All" | ProjectCategory)[];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const cityMatch = selectedCity === "All" || project.city === selectedCity;
      const catMatch =
        selectedCategory === "All" || project.category === selectedCategory;
      return cityMatch && catMatch;
    });
  }, [projects, selectedCity, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* Minimal Architectural Filter Bar */}
      <div className="flex flex-col justify-between gap-6 border-y border-[#17191B]/14 py-6 dark:border-[#A7A6A3]/22 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by discipline">
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors cursor-pointer",
                  active
                    ? "border-[#17191B] bg-[#17191B] text-[#F2F0EC] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B]"
                    : "border-[#17191B]/18 text-[#34383C] hover:border-[#17191B] dark:border-[#A7A6A3]/25 dark:text-[#D8D5CF] dark:hover:border-[#F2F0EC]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Filter by Texas market">
          {(["All", "Houston", "Austin"] as const).map((city) => {
            const active = selectedCity === city;
            return (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={cn(
                  "px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors cursor-pointer",
                  active
                    ? "border-b border-[#17191B] text-[#17191B] dark:border-[#F2F0EC] dark:text-[#F2F0EC]"
                    : "text-[#5C5B58] hover:text-[#17191B] dark:text-[#A7A6A3] dark:hover:text-[#F2F0EC]"
                )}
              >
                {city === "All" ? "All Markets" : city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="glass-surface p-12 text-center">
          <p className="font-serif text-2xl">
            No demonstration studies match that exact filter combination.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCity("All");
              setSelectedCategory("All");
            }}
            className="mt-5 border-b border-current pb-1 text-xs uppercase tracking-[0.18em] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-14">
          {filtered.map((project, idx) => {
            const media = getMediaAsset(project.coverImageId);
            return (
              <article
                key={project.slug}
                className={cn("group", idx % 2 === 1 && "md:mt-14")}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block focus-visible:outline-offset-4"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20">
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-4 top-4 right-4 flex items-center justify-between gap-2">
                      <span className="glass-photo px-2.5 py-1 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                        {project.index}
                      </span>
                      {project.isDemonstration ? (
                        <DemoBadge label="Demonstration Study" />
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4 border-t border-[#17191B]/14 pt-5 dark:border-[#A7A6A3]/22">
                    <div className="space-y-1.5">
                      <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                        {project.category} · {project.neighborhood},{" "}
                        {project.city}
                      </p>
                      <h2 className="font-serif text-3xl tracking-[-0.015em] transition-opacity group-hover:opacity-75">
                        {project.name}
                      </h2>
                      <p className="max-w-[48ch] pt-1 text-sm leading-[1.68] text-[#34383C] dark:text-[#D8D5CF]">
                        {project.shortDescription}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#17191B]/20 transition-all duration-300 group-hover:border-[#17191B] group-hover:bg-[#17191B] group-hover:text-[#F2F0EC] dark:border-[#A7A6A3]/30 dark:group-hover:border-[#F2F0EC] dark:group-hover:bg-[#F2F0EC] dark:group-hover:text-[#17191B]"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
