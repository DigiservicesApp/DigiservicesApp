import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import FeaturesSection from '@/components/sections/home/FeaturesSection';
import CTASection from '@/components/sections/home/CTASection';
import FAQSection from '@/components/sections/home/FAQSection';

export const metadata: Metadata = {
  title: 'Documentation - DigiServicesApp',
  description: 'Developer and user documentation for DigiServicesApp.',
};

export default function DocsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="prose prose-lg max-w-3xl">
            <h1>Documentation</h1>
            <p>
              Comprehensive guides, API references, and tutorials to help you
              get the most out of DigiServicesApp. Browse quick-start guides,
              integration examples, and developer docs.
            </p>
          </div>
        </Container>
      </section>

      {/* Key Features */}
      <FeaturesSection />

      {/* Getting Started + FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[color:var(--md-sys-color-on-surface)]">
              Getting Started
            </h2>
            <div className="prose prose-lg text-[color:var(--md-sys-color-on-surface-variant)]">
              <p>
                Need a quick start? Check out the installation guide, follow the
                onboarding tutorial, and explore common integrations.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <FAQSection />

      <CTASection />
    </main>
  );
}
