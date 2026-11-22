import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { MediaAsset } from "@/types/domain";
import { Container } from "@/components/layout/Container";
import { DemoBadge } from "@/components/ui/DemoBadge";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  media?: MediaAsset;
  showDemoBadge?: boolean;
}

export function PageHero({
  index,
  eyebrow,
  title,
  description,
  breadcrumbs,
  media,
  showDemoBadge = false,
}: PageHeroProps) {
  if (media) {
    return (
      <section className="relative flex min-h-[62svh] w-full flex-col justify-end overflow-hidden bg-[#17191B] pb-14 pt-36 text-[#F2F0EC] sm:pb-20 sm:pt-44">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#17191B]/78 via-[#17191B]/45 to-[#17191B]/94"
        />

        <Container className="relative z-10">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#D8D5CF]"
            >
              {breadcrumbs.map((crumb, idx) => (
                <span key={crumb.label} className="inline-flex items-center gap-2">
                  {idx > 0 ? (
                    <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-[#F2F0EC]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#F2F0EC]">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <span className="glass-photo inline-flex items-center gap-3 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
              {index ? (
                <>
                  <span className="tabular-nums text-[#A7A6A3]">[{index}]</span>
                  <span aria-hidden="true" className="h-px w-4 bg-[#F2F0EC]/35" />
                </>
              ) : null}
              <span>{eyebrow}</span>
            </span>
            {showDemoBadge || media.isDemonstration ? (
              <DemoBadge label="Demonstration Visual" />
            ) : null}
          </div>

          <h1 className="display-hero mt-6 max-w-4xl text-[#F2F0EC]">{title}</h1>

          {description ? (
            <p className="mt-6 max-w-[60ch] text-base leading-[1.72] font-light text-[#D8D5CF] sm:text-lg">
              {description}
            </p>
          ) : null}
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-[#17191B]/12 bg-[#F2F0EC] bg-arch-grid pb-16 pt-36 text-[#17191B] sm:pb-20 sm:pt-44 dark:border-[#A7A6A3]/20 dark:bg-[#17191B] dark:text-[#F2F0EC]">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#5C5B58] dark:text-[#A7A6A3]"
          >
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.label} className="inline-flex items-center gap-2">
                {idx > 0 ? (
                  <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />
                ) : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-[#17191B] dark:hover:text-[#F2F0EC]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#17191B] dark:text-[#F2F0EC]">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-3 eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
          {index ? (
            <>
              <span className="tabular-nums">{index}</span>
              <span
                aria-hidden="true"
                className="h-px w-6 bg-[#17191B]/30 dark:bg-[#A7A6A3]/45"
              />
            </>
          ) : null}
          <span>{eyebrow}</span>
        </div>

        <h1 className="display-hero mt-6 max-w-4xl">{title}</h1>

        {description ? (
          <p className="mt-6 max-w-[60ch] text-base leading-[1.72] text-[#34383C] dark:text-[#D8D5CF] sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
