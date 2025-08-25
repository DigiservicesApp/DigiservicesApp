import WorkflowHero from '@/components/sections/workflow/WorkflowHero';
import DetailedWorkflow from '@/components/sections/workflow/DetailedWorkflow';
import CTASection from '@/components/sections/home/CTASection';

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <WorkflowHero />
      <DetailedWorkflow />
      <CTASection />
    </main>
  );
}
