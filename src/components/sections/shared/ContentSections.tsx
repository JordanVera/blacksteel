import type { ContentSection } from "@/types/domain";
import { cn } from "@/lib/utils";

interface ContentSectionsProps {
  sections: readonly ContentSection[];
  className?: string;
}

export function ContentSections({ sections, className }: ContentSectionsProps) {
  return (
    <div className={cn("space-y-14", className)}>
      {sections.map((section) => (
        <section key={section.heading} className="space-y-5">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] text-[#17191B] dark:text-[#F2F0EC] sm:text-3xl">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-[64ch] text-base leading-[1.8] text-[#34383C] dark:text-[#D8D5CF] sm:text-[17px]"
            >
              {paragraph}
            </p>
          ))}
          {section.list && section.list.length > 0 ? (
            <ul className="max-w-[64ch] space-y-3 text-[15px] leading-[1.7] text-[#34383C] dark:text-[#D8D5CF]">
              {section.list.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-3 shrink-0 bg-current opacity-50"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
