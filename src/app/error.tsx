"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ActionLink } from "@/components/ui/ActionLink";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep error handling quiet in production; wire to Sentry/observability later.
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="flex min-h-[82svh] items-center bg-[#F2F0EC] py-36 text-[#17191B] dark:bg-[#17191B] dark:text-[#F2F0EC]">
      <Container size="narrow">
        <div className="glass-surface space-y-6 p-8 sm:p-12">
          <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
            Unexpected Error
          </p>
          <h1 className="display-statement">Something interrupted this view.</h1>
          <p className="max-w-[52ch] text-base leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
            Please try reloading the section below, or return to the homepage.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={reset}
              className="border border-[#17191B] bg-[#17191B] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-[#F2F0EC] transition-colors hover:bg-[#34383C] dark:border-[#F2F0EC] dark:bg-[#F2F0EC] dark:text-[#17191B] dark:hover:bg-[#D8D5CF] cursor-pointer"
            >
              Try Again
            </button>
            <ActionLink href="/" variant="secondary">
              Return Home
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
