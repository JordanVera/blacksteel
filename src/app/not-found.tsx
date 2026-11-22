import { Container } from "@/components/layout/Container";
import { ActionLink } from "@/components/ui/ActionLink";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[82svh] items-center bg-[#F2F0EC] py-36 text-[#17191B] dark:bg-[#17191B] dark:text-[#F2F0EC]">
      <Container size="narrow">
        <div className="glass-surface space-y-6 p-8 sm:p-12">
          <p className="eyebrow-label text-[#5C5B58] dark:text-[#A7A6A3]">
            404 · Page Not Found
          </p>
          <h1 className="display-statement">
            This blueprint does not exist.
          </h1>
          <p className="max-w-[50ch] text-base leading-[1.72] text-[#34383C] dark:text-[#D8D5CF]">
            The page you requested may have been moved or renamed. Return to the
            studio homepage or explore our architectural capabilities.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ActionLink href="/" variant="primary">
              Return Home
            </ActionLink>
            <ActionLink href="/projects" variant="secondary">
              Selected Work
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
