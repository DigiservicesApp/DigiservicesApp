import Container from '@/components/ui/Container';
import { useCases } from '@/lib/data/use-cases';

export function UseCaseHero() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Solutions for Every Digital Professional
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether you&apos;re a freelancer, agency, or remote team,
            DigiServicesApp adapts to your unique needs. Discover how our
            AI-powered platform can transform your workflow.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#use-cases"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Explore Use Cases
            </a>
            <a
              href="/how-it-works"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn how it works <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
