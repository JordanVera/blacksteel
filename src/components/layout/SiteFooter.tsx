import Link from 'next/link';
import { FOOTER_COLUMNS, SITE_CONFIG } from '@/content/site';
import { BUSINESS_PROFILE, telephoneHref } from '@/content/business';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Container } from '@/components/layout/Container';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#A7A6A3]/20 bg-[#17191B] bg-arch-grid-dark text-[#F2F0EC]">
      <Container className="py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="space-y-6">
              <BrandLogo
                surface="dark"
                className="h-12 w-auto sm:h-14"
                linkClassName="inline-block"
              />
              <p className="max-w-md text-sm leading-[1.7] text-[#D8D5CF]">
                A family-owned construction and remodeling practice led by two
                siblings, crafting architectural residential interiors, custom
                millwork, and complex renovations across Houston and Austin.
              </p>
            </div>

            <div className="space-y-2 border-l border-[#A7A6A3]/30 pl-4 font-mono text-[11px] text-[#A7A6A3]">
              <p className="uppercase tracking-[0.18em] text-[#F2F0EC]/85">
                {SITE_CONFIG.contactPlaceholders.marketsLabel}
              </p>
              {BUSINESS_PROFILE.telephone ? (
                <a
                  href={telephoneHref(BUSINESS_PROFILE.telephone)}
                  className="block transition-colors hover:text-[#F2F0EC]"
                >
                  {BUSINESS_PROFILE.telephone}
                </a>
              ) : (
                <p>{SITE_CONFIG.contactPlaceholders.phoneLabel}</p>
              )}
              {BUSINESS_PROFILE.email ? (
                <a
                  href={`mailto:${BUSINESS_PROFILE.email}`}
                  className="block transition-colors hover:text-[#F2F0EC]"
                >
                  {BUSINESS_PROFILE.email}
                </a>
              ) : (
                <p>{SITE_CONFIG.contactPlaceholders.emailLabel}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div className="space-y-4">
              <h2 className="eyebrow-label text-[#A7A6A3]">Practice</h2>
              <ul className="space-y-3 text-sm text-[#D8D5CF]">
                {FOOTER_COLUMNS.practice.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#F2F0EC]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="eyebrow-label text-[#A7A6A3]">Expertise</h2>
              <ul className="space-y-3 text-sm text-[#D8D5CF]">
                {FOOTER_COLUMNS.expertise.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#F2F0EC]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="eyebrow-label text-[#A7A6A3]">Markets & Legal</h2>
              <ul className="space-y-3 text-sm text-[#D8D5CF]">
                {FOOTER_COLUMNS.markets.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#F2F0EC]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <ThemeToggle surface="dark" showLabel />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#A7A6A3]/18 pt-8 text-xs text-[#A7A6A3] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_CONFIG.companyName}. All rights reserved.
          </p>
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#A7A6A3]/80">
            Strength · Precision · Restraint · Craftsmanship
          </p>
        </div>
      </Container>
    </footer>
  );
}
