import { IconType } from 'react-icons';
import {
  RiCustomerService2Line,
  RiDashboardLine,
  RiFileTextLine,
  RiGroupLine,
  RiRobot2Line,
  RiTimeLine,
  RiToolsLine,
} from 'react-icons/ri';

export interface PricingFeature {
  title: string;
  description: string;
  icon: IconType;
}

export interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  highlightedFeatures: PricingFeature[];
  cta: {
    text: string;
    href: string;
  };
  popularChoice?: boolean;
}

export const pricingFeatures: PricingFeature[] = [
  {
    title: 'AI Task Management',
    description:
      'Smart task prioritization and automated workflow optimization',
    icon: RiRobot2Line,
  },
  {
    title: 'Time Tracking',
    description: 'Accurate time tracking and productivity analytics',
    icon: RiTimeLine,
  },
  {
    title: 'Project Templates',
    description: 'Pre-built templates for common project types',
    icon: RiFileTextLine,
  },
  {
    title: 'Team Collaboration',
    description: 'Real-time communication and file sharing',
    icon: RiGroupLine,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive project and performance metrics',
    icon: RiDashboardLine,
  },
  {
    title: 'Integration Tools',
    description: 'Connect with your favorite tools and services',
    icon: RiToolsLine,
  },
  {
    title: '24/7 Support',
    description: 'Priority support with rapid response times',
    icon: RiCustomerService2Line,
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for freelancers and solo professionals',
    price: {
      monthly: 15,
      annual: 150,
    },
    features: [
      'Up to 10 active projects',
      'Basic AI task management',
      'Time tracking',
      'File storage (5GB)',
      'Email support',
    ],
    highlightedFeatures: [
      pricingFeatures[0],
      pricingFeatures[1],
      pricingFeatures[2],
    ],
    cta: {
      text: 'Start with Starter',
      href: '/register?plan=starter',
    },
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses and small teams',
    price: {
      monthly: 39,
      annual: 390,
    },
    features: [
      'Up to 50 active projects',
      'Advanced AI workflows',
      'Team collaboration tools',
      'File storage (25GB)',
      'Project templates',
      'Priority support',
    ],
    highlightedFeatures: [
      pricingFeatures[0],
      pricingFeatures[3],
      pricingFeatures[4],
    ],
    cta: {
      text: 'Choose Professional',
      href: '/register?plan=professional',
    },
    popularChoice: true,
  },
  {
    name: 'Enterprise',
    description: 'For large teams and organizations',
    price: {
      monthly: 99,
      annual: 990,
    },
    features: [
      'Unlimited active projects',
      'Custom AI model training',
      'Advanced analytics',
      'Unlimited storage',
      'Custom integrations',
      'Dedicated support',
      'API access',
      'SSO & advanced security',
    ],
    highlightedFeatures: [
      pricingFeatures[4],
      pricingFeatures[5],
      pricingFeatures[6],
    ],
    cta: {
      text: 'Contact Sales',
      href: '/contact?topic=enterprise',
    },
  },
];
