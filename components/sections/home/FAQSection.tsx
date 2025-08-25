'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import Container from '@/components/ui/Container';
import { faqItems, FAQItem } from '@/lib/data/faq';

function FAQGroup({
  category,
  items,
}: {
  category: FAQItem['category'];
  items: FAQItem[];
}) {
  const categoryTitles = {
    general: 'General Questions',
    features: 'Features & Capabilities',
    pricing: 'Pricing & Plans',
    support: 'Support & Getting Started',
  };

  return (
    <div className="mt-10 first:mt-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {categoryTitles[category]}
      </h3>
      <dl className="space-y-4">
        {items.map((item) => (
          <FAQ key={item.id} item={item} />
        ))}
      </dl>
    </div>
  );
}

function FAQ({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-start justify-between text-left"
        >
          <span className="text-base font-semibold leading-7 text-gray-900">
            {item.question}
          </span>
          <span className="ml-6 flex h-7 items-center">
            {isOpen ? (
              <RiSubtractLine className="h-6 w-6 text-primary" />
            ) : (
              <RiAddLine className="h-6 w-6 text-primary" />
            )}
          </span>
        </button>
      </dt>
      <AnimatePresence>
        {isOpen && (
          <motion.dd
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-base leading-7 text-gray-600">
              {item.answer}
            </p>
          </motion.dd>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const groupedFAQs = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<FAQItem['category'], FAQItem[]>);

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Find answers to common questions about DigiServicesApp's features,
            pricing, and support.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          {Object.entries(groupedFAQs).map(([category, items]) => (
            <FAQGroup
              key={category}
              category={category as FAQItem['category']}
              items={items}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
