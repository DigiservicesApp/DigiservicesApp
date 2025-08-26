'use client';
import Container from '@/components/ui/Container';

export function PricingHero() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-[color:var(--md-sys-color-on-surface-variant)]">
            Choose the perfect plan that fits your needs. All plans include core
            AI features and scale with your growth.
          </p>
        </div>
      </Container>
    </section>
  );
}
