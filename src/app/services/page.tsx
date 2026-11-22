import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { getAllServices } from "@/features/services/catalog";
import { getMediaAsset } from "@/content/media";
import { Container } from "@/components/layout/Container";
import { SectionShell } from "@/components/layout/SectionShell";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FinalConversionSection } from "@/components/sections/home/FinalConversionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Services & Expertise",
  description:
    "Explore BLACKSTEEL's core disciplines across luxury residential remodeling, bespoke kitchens and bathrooms, custom construction, general contracting, and property restoration in Houston and Austin.",
  path: "/services",
});

export default function ServicesOverviewPage() {
  const services = getAllServices();

  return (
    <>
      <PageHero
        index="EXPERTISE"
        eyebrow="Capabilities"
        title="Architectural remodeling and construction, led with precision."
        description="From whole-home renovations and custom cabinetry to structural additions, general contracting, and architectural reconstruction across Houston and Austin."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
      />

      <SectionShell surface="canvas" spacing="spacious">
        <Container>
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const media = getMediaAsset(service.imageId);
              const reverse = index % 2 === 1;

              return (
                <article
                  key={service.slug}
                  className="grid grid-cols-1 items-center gap-10 border-b border-[#17191B]/14 pb-16 last:border-b-0 last:pb-0 dark:border-[#A7A6A3]/22 lg:grid-cols-12 lg:gap-14 lg:pb-24"
                >
                  <div
                    className={`lg:col-span-6 ${
                      reverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative block aspect-[16/10] w-full overflow-hidden border border-[#17191B]/12 bg-[#17191B] dark:border-[#A7A6A3]/20"
                    >
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="absolute left-4 top-4 glass-photo px-3 py-1 text-[10px] font-medium tabular-nums uppercase tracking-[0.2em]">
                        {service.index} · {service.eyebrow}
                      </span>
                    </Link>
                  </div>

                  <div
                    className={`space-y-5 lg:col-span-6 ${
                      reverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                      {service.eyebrow}
                    </p>
                    <h2 className="font-serif text-4xl tracking-[-0.015em] sm:text-5xl">
                      {service.title}
                    </h2>
                    <p className="max-w-[54ch] text-base leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
                      {service.editorialIntro}
                    </p>
                    <ul className="space-y-2 border-l border-[#17191B]/18 pl-4 text-sm text-[#34383C] dark:border-[#A7A6A3]/25 dark:text-[#D8D5CF]">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="pt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="group inline-flex items-center gap-2 border-b border-[#17191B]/40 pb-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#17191B] dark:border-[#F2F0EC]/40 dark:hover:border-[#F2F0EC]"
                      >
                        <span>Explore {service.shortTitle}</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </SectionShell>

      <FinalConversionSection />
    </>
  );
}
