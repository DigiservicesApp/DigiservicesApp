'use client';
import Container from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';

const faqs = [
  {
    question: 'What&apos;s included in the free trial?',
    answer:
      'Our 14-day free trial includes all features from the Professional plan, allowing you to fully experience the power of our AI-driven platform. You can create projects, use AI task management, and collaborate with your team without any limitations during the trial period.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you&apos;ll be charged the prorated difference for the remainder of your billing period. When downgrading, your new rate will take effect at the next billing cycle.',
  },
  {
    question: 'How does the AI task management work?',
    answer:
      'Our AI system analyzes your work patterns, project deadlines, and team availability to automatically prioritize tasks and suggest optimal workflows. It learns from your preferences and improves its recommendations over time, helping you work more efficiently.',
  },
  {
    question: 'Is there a limit on the number of team members?',
    answer:
      'The Starter plan supports up to 2 team members, Professional up to 10 team members, and Enterprise has no limit. Each team member gets their own login credentials and can be assigned different roles and permissions.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'All plans include email support. Professional plans get priority support with faster response times, while Enterprise plans include 24/7 dedicated support with a guaranteed response time of 1 hour or less.',
  },
  {
    question: 'Do you offer custom features for Enterprise?',
    answer:
      'Yes, our Enterprise plan can be customized to your specific needs. This includes custom AI model training, specific integrations, enhanced security features, and dedicated support. Contact our sales team to discuss your requirements.',
  },
];

export function PricingFAQ() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <Accordion
              items={faqs.map((faq, idx) => ({
                value: `faq-${idx}`,
                trigger: faq.question,
                children: faq.answer,
              }))}
              type="single"
              defaultValue="faq-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
