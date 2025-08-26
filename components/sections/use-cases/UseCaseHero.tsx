'use client';
import Container from '@/components/ui/Container';
import { useCases } from '@/lib/data/use-cases';

export function UseCaseHero() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-6xl">
            Solutions for Every Digital Professional
          </h1>
          <p className="mt-6 text-lg leading-8 text-[color:var(--md-sys-color-on-surface-variant)]">
            Whether you&apos;re a freelancer, agency, or remote team,
            DigiServicesApp adapts to your unique needs. Discover how our
            AI-powered platform can transform your workflow.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#use-cases"
              className="rounded-md bg-[color:var(--md-sys-color-primary)] px-3.5 py-2.5 text-sm font-semibold text-[color:var(--md-sys-color-on-primary)] shadow-sm hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--md-sys-color-primary)]"
            >
              Explore Use Cases
            </a>
            <a
              href="/how-it-works"
              className="text-sm font-semibold leading-6 text-[color:var(--md-sys-color-on-surface)]"
            >
              Learn how it works <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
