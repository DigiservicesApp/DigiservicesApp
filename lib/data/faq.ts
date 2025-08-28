export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Features' | 'Pricing' | 'Support';
};

export const faqItems: FAQItem[] = [
  {
    id: 'what-is',
    question: 'What is DigiServicesApp?',
    answer:
      'DigiServicesApp is an AI-powered project management platform that helps teams streamline their workflows, automate repetitive tasks, and improve collaboration through intelligent features and integrations.',
    category: 'General',
  },
  {
    id: 'how-different',
    question:
      'How is DigiServicesApp different from other project management tools?',
    answer:
      "DigiServicesApp stands out through its AI-driven insights, automated workflow suggestions, and predictive analytics. Our platform learns from your team's patterns to provide personalized recommendations and automate routine tasks.",
    category: 'General',
  },
  {
    id: 'key-features',
    question: 'What are the key features of DigiServicesApp?',
    answer:
      'Our key features include AI-powered task automation, smart project templates, real-time collaboration tools, integrated chat with context awareness, customizable workflows, detailed analytics, and seamless third-party integrations.',
    category: 'Features',
  },
  {
    id: 'ai-capabilities',
    question: 'What can the AI in DigiServicesApp do?',
    answer:
      "Our AI helps with task prioritization, deadline predictions, resource allocation optimization, identifying potential project bottlenecks, generating reports, and providing actionable insights based on your team's performance data.",
    category: 'Features',
  },
  {
    id: 'pricing-model',
    question: 'How does your pricing work?',
    answer:
      'We offer flexible, scalable pricing plans based on team size and feature needs. All plans include core features, with premium features available in higher tiers. We also offer custom enterprise solutions for larger organizations.',
    category: 'Pricing',
  },
  {
    id: 'free-trial',
    question: 'Is there a free trial?',
    answer:
      'Yes! We offer a 14-day free trial with full access to all features, allowing you to experience the full potential of DigiServicesApp before making a decision.',
    category: 'Pricing',
  },
  {
    id: 'get-started',
    question: 'How quickly can we get started?',
    answer:
      'You can start using DigiServicesApp immediately after signing up. Our intuitive onboarding process and AI-guided setup help you configure your workspace and invite team members in minutes.',
    category: 'Support',
  },
  {
    id: 'support-available',
    question: 'What kind of support is available?',
    answer:
      'We provide 24/7 customer support through chat, email, and phone. Our knowledge base includes comprehensive documentation, video tutorials, and best practices. Enterprise customers also get dedicated support managers.',
    category: 'Support',
  },
];
