import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "statement" | "section";
  tone?: "default" | "contrast" | "light";
  align?: "left" | "center";
  className?: string;
}

export function EditorialHeading({
  index,
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  size = "section",
  tone = "default",
  align = "left",
  className,
}: EditorialHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 eyebrow-label",
          tone === "default" && "text-[#5C5B58] dark:text-[#A7A6A3]",
          tone === "contrast" && "text-[#A7A6A3] dark:text-[#5C5B58]",
          tone === "light" && "text-[#A7A6A3]"
        )}
      >
        {index ? (
          <>
            <span className="tabular-nums font-medium">{index}</span>
            <span
              aria-hidden="true"
              className={cn(
                "inline-block h-px w-6",
                tone === "default" && "bg-[#17191B]/30 dark:bg-[#A7A6A3]/45",
                tone === "contrast" && "bg-[#A7A6A3]/45 dark:bg-[#17191B]/30",
                tone === "light" && "bg-[#F2F0EC]/35"
              )}
            />
          </>
        ) : null}
        <span>{eyebrow}</span>
      </div>

      <Tag
        className={cn(
          size === "hero" && "display-hero",
          size === "statement" && "display-statement",
          size === "section" && "display-section",
          tone === "default" && "text-[#17191B] dark:text-[#F2F0EC]",
          tone === "contrast" && "text-[#F2F0EC] dark:text-[#17191B]",
          tone === "light" && "text-[#F2F0EC]"
        )}
      >
        {title}
      </Tag>

      {description ? (
        <p
          className={cn(
            "max-w-[58ch] text-base sm:text-[17px] leading-[1.68] font-light",
            tone === "default" && "text-[#34383C] dark:text-[#D8D5CF]",
            tone === "contrast" && "text-[#D8D5CF] dark:text-[#34383C]",
            tone === "light" && "text-[#D8D5CF]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
