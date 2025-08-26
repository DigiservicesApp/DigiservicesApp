'use client';
import Container from '@/components/ui/Container';
import { Accordion } from '@/components/ui/Accordion';
import { faqItems, FAQItem } from '@/lib/data/faq';

export default function FAQSection() {
  const groupedFAQs = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<FAQItem['category'], FAQItem[]>);

  return (
    <section className="py-24 sm:py-32 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--md-sys-color-on-surface-variant)]">
            Find answers to common questions about DigiServicesApp&apos;s
            features, pricing, and support.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-8">
          {Object.entries(groupedFAQs).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-[var(--md-sys-color-on-surface)] mb-4">
                {category}
              </h3>
              <Accordion
                items={items.map((item) => ({
                  value: String(item.id),
                  trigger: item.question,
                  children: (
                    <p className="mt-2 text-[var(--md-sys-color-on-surface-variant)]">
                      {item.answer}
                    </p>
                  ),
                }))}
                type="single"
                collapsible
                variant="bordered"
                defaultValue={String(items[0]?.id ?? '')}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
