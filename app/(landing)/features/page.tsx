import FeatureHero from '@/components/sections/features/FeatureHero';
import DetailedFeatures from '@/components/sections/features/DetailedFeatures';
import CTASection from '@/components/sections/home/CTASection';
import PageLayout from '@/components/layout/PageLayout';

export default function FeaturesPage() {
  return (
    <PageLayout
      breadcrumb={[{ label: 'Platform Features', href: '/features' }]}
    >
      <main className="flex flex-col min-h-screen">
        <FeatureHero />
        <DetailedFeatures />
        <CTASection />
      </main>
    </PageLayout>
  );
}
