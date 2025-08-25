import { Metadata } from 'next';
import { UseCaseHero } from '@/components/sections/use-cases/UseCaseHero';
import { DetailedUseCases } from '@/components/sections/use-cases/DetailedUseCases';

export const metadata: Metadata = {
  title: 'Use Cases - DigiServicesApp',
  description:
    'Discover how DigiServicesApp helps freelancers, agencies, and remote teams streamline their operations with AI-powered tools.',
};

export default function UseCasesPage() {
  return (
    <>
      <UseCaseHero />
      <DetailedUseCases />
    </>
  );
}
