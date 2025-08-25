import { Metadata } from 'next';
import { PricingHero } from '@/components/sections/pricing/PricingHero';
import { PricingTiers } from '@/components/sections/pricing/PricingTiers';
import { PricingFAQ } from '@/components/sections/pricing/PricingFAQ';

export const metadata: Metadata = {
  title: 'Pricing - DigiServicesApp',
  description:
    "Choose the perfect plan for your needs. Whether you're a freelancer or enterprise, we have you covered.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <PricingFAQ />
    </>
  );
}
