'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';
import { PRIMARY_NAV } from '@/content/site';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Container } from '@/components/layout/Container';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { cn } from '@/lib/utils';

const HEADER_SETTLE_RANGE = 112;
const HEADER_EASE_MS = 80;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const headerRef = useRef<HTMLElement>(null);
  const overHeroRef = useRef(isHome);
  const [overHero, setOverHero] = useState(isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const targetProgress = () => {
      if (!isHome) return 1;
      if (motionQuery.matches) return window.scrollY > 48 ? 1 : 0;
      return Math.min(1, Math.max(0, window.scrollY / HEADER_SETTLE_RANGE));
    };

    let current = targetProgress();
    let target = current;
    let frame = 0;
    let last = 0;

    const write = (value: number) => {
      header.style.setProperty('--header-p', value.toFixed(4));
      const nextOverHero = isHome && value < 0.38;
      if (overHeroRef.current !== nextOverHero) {
        overHeroRef.current = nextOverHero;
        setOverHero(nextOverHero);
      }
    };

    const tick = (now: number) => {
      const dt = last === 0 ? 16 : Math.min(34, now - last);
      last = now;
      const delta = target - current;

      if (Math.abs(delta) < 0.0025) {
        current = target;
        frame = 0;
        write(current);
        return;
      }

      current += delta * (1 - Math.exp(-dt / HEADER_EASE_MS));
      write(current);
      frame = window.requestAnimationFrame(tick);
    };

    const sync = () => {
      target = targetProgress();

      if (motionQuery.matches) {
        current = target;
        if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
        write(current);
        return;
      }

      if (!frame) {
        last = 0;
        frame = window.requestAnimationFrame(tick);
      }
    };

    write(current);
    window.addEventListener('scroll', sync, { passive: true });
    motionQuery.addEventListener('change', sync);

    return () => {
      window.removeEventListener('scroll', sync);
      motionQuery.removeEventListener('change', sync);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'site-header fixed inset-x-0 top-0 z-40',
          isHome && 'site-header-home',
        )}
      >
        <div aria-hidden="true" className="site-header-scrim" />
        <div aria-hidden="true" className="site-header-plate">
          <div className="site-header-plate-fill" />
        </div>

        <Container className="relative z-10 flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="BLACKSTEEL Construction & Remodeling — Home"
            className="relative inline-flex items-center focus-visible:outline-offset-4"
          >
            <span className="site-header-logo" aria-hidden="true">
              <span className="site-header-logo-white">
                <BrandLogo
                  surface="dark"
                  priority
                  linked={false}
                  className="h-full w-full"
                />
              </span>
              <span className="site-header-logo-black" aria-hidden="true">
                <BrandLogo
                  surface="light"
                  priority
                  linked={false}
                  className="h-full w-full"
                />
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-9 lg:flex"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity duration-200',
                    isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100',
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-px bg-current"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle
              surface={overHero ? 'dark' : 'auto'}
              className="hidden duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inline-flex"
            />

            <Link
              href="/contact"
              className={cn(
                'group hidden items-center gap-2 border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:inline-flex',
                overHero
                  ? 'glass-photo text-[#F2F0EC] hover:border-[#F2F0EC]/50 hover:bg-[#17191B]/75'
                  : 'border-[#17191B]/25 bg-[#17191B] text-[#F2F0EC] hover:bg-[#34383C] dark:border-[#F2F0EC]/25 dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF]',
              )}
            >
              <span>Start a Project</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className={cn(
                'inline-flex h-10 w-10 cursor-pointer items-center justify-center border transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden',
                overHero
                  ? 'glass-photo text-[#F2F0EC] hover:border-[#F2F0EC]/55'
                  : 'border-[#17191B]/20 text-[#17191B] hover:border-[#17191B] dark:border-[#A7A6A3]/30 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]',
              )}
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
