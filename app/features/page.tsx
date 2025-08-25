import FeatureHero from '@/components/sections/features/FeatureHero';
import DetailedFeatures from '@/components/sections/features/DetailedFeatures';
import CTASection from '@/components/sections/home/CTASection';

export default function FeaturesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <FeatureHero />
      <DetailedFeatures />
      <CTASection />
    </main>
  );
}
