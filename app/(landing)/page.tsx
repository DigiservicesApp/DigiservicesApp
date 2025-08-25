import HeroSection from '@/components/sections/home/HeroSection';
import StatsSection from '@/components/sections/home/StatsSection';
import BenefitsSection from '@/components/sections/home/BenefitsSection';
import FeaturesSection from '@/components/sections/home/FeaturesSection';
import HowItWorksSection from '@/components/sections/home/HowItWorksSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import CTASection from '@/components/sections/home/CTASection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
