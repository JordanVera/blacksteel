"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  surface?: "auto" | "dark";
  showLabel?: boolean;
}

export function ThemeToggle({
  className,
  surface = "auto",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group inline-flex items-center gap-2 border px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 cursor-pointer",
        surface === "dark"
          ? "border-[#F2F0EC]/22 bg-[#17191B]/45 text-[#F2F0EC] backdrop-blur-md hover:border-[#F2F0EC]/50 hover:bg-[#17191B]/65"
          : "border-[#17191B]/18 bg-[#F2F0EC]/55 text-[#17191B] backdrop-blur-md hover:border-[#17191B]/45 dark:border-[#A7A6A3]/25 dark:bg-[#17191B]/55 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]/50",
        className
      )}
    >
      <Sun
        className="hidden h-3.5 w-3.5 dark:block transition-transform duration-300 group-hover:rotate-12"
        aria-hidden="true"
      />
      <Moon
        className="block h-3.5 w-3.5 dark:hidden transition-transform duration-300 group-hover:-rotate-12"
        aria-hidden="true"
      />
      {showLabel ? (
        <>
          <span className="hidden dark:inline">Light</span>
          <span className="inline dark:hidden">Dark</span>
        </>
      ) : null}
    </button>
  );
}
