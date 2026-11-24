"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { PRIMARY_NAV, SITE_CONFIG } from "@/content/site";
import { BUSINESS_PROFILE } from "@/content/business";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F2F0EC]/92 text-[#17191B] backdrop-blur-2xl dark:bg-[#17191B]/92 dark:text-[#F2F0EC]"
        >
          <div className="flex items-center justify-between border-b border-[#17191B]/12 px-6 py-5 dark:border-[#A7A6A3]/20">
            <BrandLogo
              surface="auto"
              className="h-9 w-auto"
              onClick={onClose}
            />

            <div className="flex items-center gap-3">
              <ThemeToggle showLabel />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center border border-[#17191B]/20 text-[#17191B] transition-colors hover:border-[#17191B] dark:border-[#A7A6A3]/30 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile navigation" className="px-6 py-10">
            <ul className="flex flex-col divide-y divide-[#17191B]/10 dark:divide-[#A7A6A3]/18">
              {[...PRIMARY_NAV, { label: "Contact", href: "/contact" }].map(
                (item, index) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 + index * 0.04,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between py-5"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono tabular-nums text-[11px] tracking-[0.2em] text-[#5C5B58] dark:text-[#A7A6A3]">
                          [0{index + 1}]
                        </span>
                        <span
                          className={`font-display text-3xl font-semibold tracking-[-0.03em] transition-opacity sm:text-4xl ${
                            isActive
                              ? "opacity-100 underline decoration-[#17191B]/35 underline-offset-8 dark:decoration-[#F2F0EC]/40"
                              : "opacity-85 group-hover:opacity-100"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                        <ArrowUpRight
                          className="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.li>
                  );
                }
              )}
            </ul>
          </nav>

          <div className="border-t border-[#17191B]/12 px-6 py-6 dark:border-[#A7A6A3]/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
                  {SITE_CONFIG.markets}
                </p>
                {BUSINESS_PROFILE.email ? (
                  <a
                    href={`mailto:${BUSINESS_PROFILE.email}`}
                    className="block text-xs text-[#34383C] underline-offset-4 hover:underline dark:text-[#D8D5CF]"
                  >
                    {BUSINESS_PROFILE.email}
                  </a>
                ) : (
                  <p className="text-xs text-[#34383C] dark:text-[#D8D5CF]">
                    {SITE_CONFIG.contactPlaceholders.emailLabel}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.18em]">
                <Link
                  href="/locations/houston"
                  onClick={onClose}
                  className="underline-offset-4 hover:underline"
                >
                  Houston
                </Link>
                <span className="opacity-35">/</span>
                <Link
                  href="/locations/austin"
                  onClick={onClose}
                  className="underline-offset-4 hover:underline"
                >
                  Austin
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
