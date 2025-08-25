import WorkflowHero from '@/components/sections/workflow/WorkflowHero';
import DetailedWorkflow from '@/components/sections/workflow/DetailedWorkflow';
import CTASection from '@/components/sections/home/CTASection';
import PageLayout from '@/components/layout/PageLayout';

export default function HowItWorksPage() {
  return (
    <PageLayout breadcrumb={[{ label: 'How It Works', href: '/how-it-works' }]}>
      <main className="flex flex-col min-h-screen">
        <WorkflowHero />
        <DetailedWorkflow />
        <CTASection />
      </main>
    </PageLayout>
  );
}
