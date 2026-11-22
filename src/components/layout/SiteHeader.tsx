"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { PRIMARY_NAV } from "@/content/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isOverlayHeroRoute = pathname === "/";
  const useHeroTransparentState = isOverlayHeroRoute && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 56);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          useHeroTransparentState
            ? "border-b border-transparent bg-gradient-to-b from-[#17191B]/72 via-[#17191B]/28 to-transparent py-5 text-[#F2F0EC]"
            : "glass-surface border-x-0 border-t-0 py-3.5 text-[#17191B] dark:text-[#F2F0EC]"
        )}
      >
        <Container className="flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="BLACKSTEEL Construction & Remodeling — Home"
            className="relative inline-flex items-center focus-visible:outline-offset-4"
          >
            <BrandLogo
              surface={useHeroTransparentState ? "dark" : "auto"}
              priority
              className={cn(
                "w-auto transition-all duration-300",
                useHeroTransparentState ? "h-10 sm:h-11" : "h-8 sm:h-9"
              )}
            />
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
                    "relative py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
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
              surface={useHeroTransparentState ? "dark" : "auto"}
              className="hidden sm:inline-flex"
            />

            <Link
              href="/contact"
              className={cn(
                "group hidden items-center gap-2 border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 md:inline-flex",
                useHeroTransparentState
                  ? "glass-photo text-[#F2F0EC] hover:border-[#F2F0EC]/50 hover:bg-[#17191B]/75"
                  : "border-[#17191B]/25 bg-[#17191B] text-[#F2F0EC] hover:bg-[#34383C] dark:border-[#F2F0EC]/25 dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF]"
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
                "inline-flex h-10 w-10 items-center justify-center border transition-colors lg:hidden cursor-pointer",
                useHeroTransparentState
                  ? "glass-photo text-[#F2F0EC] hover:border-[#F2F0EC]/55"
                  : "border-[#17191B]/20 text-[#17191B] hover:border-[#17191B] dark:border-[#A7A6A3]/30 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]"
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
