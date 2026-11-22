import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href: string;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "glass"
    | "underline"
    | "contrast-primary"
    | "contrast-underline";
  className?: string;
  showArrow?: boolean;
}

export function ActionLink({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center justify-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300",
        variant === "primary" &&
          "border border-[#17191B] bg-[#17191B] px-7 py-4 text-[#F2F0EC] hover:bg-[#34383C] hover:border-[#34383C] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF] dark:hover:border-[#D8D5CF]",
        variant === "secondary" &&
          "border border-[#17191B]/30 px-7 py-4 text-[#17191B] hover:border-[#17191B] hover:bg-[#17191B]/5 dark:border-[#F2F0EC]/30 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC] dark:hover:bg-[#F2F0EC]/8",
        variant === "glass" &&
          "glass-photo px-7 py-4 text-[#F2F0EC] hover:bg-[#17191B]/78 hover:border-[#F2F0EC]/45",
        variant === "underline" &&
          "border-b border-[#17191B]/35 pb-1.5 text-[#17191B] hover:border-[#17191B] dark:border-[#F2F0EC]/35 dark:text-[#F2F0EC] dark:hover:border-[#F2F0EC]",
        variant === "contrast-primary" &&
          "border border-[#17191B] bg-[#17191B] px-7 py-4 text-[#F2F0EC] hover:bg-[#34383C] hover:border-[#34383C]",
        variant === "contrast-underline" &&
          "border-b border-[#17191B]/35 pb-1.5 text-[#17191B] hover:border-[#17191B]",
        className
      )}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  );
}
