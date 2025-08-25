import { IconType } from 'react-icons';
import {
  RiUserLine,
  RiTeamLine,
  RiGlobalLine,
  RiPieChartLine,
  RiBrainLine,
  RiTimeLine,
  RiBarChartLine,
  RiMessage2Line,
} from 'react-icons/ri';

export interface UseCase {
  title: string;
  type: 'freelancer' | 'agency' | 'remote';
  description: string;
  icon: IconType;
  benefits: {
    title: string;
    description: string;
    icon: IconType;
  }[];
  features: string[];
  metrics: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    image: string;
  };
}

export const useCases: UseCase[] = [
  {
    title: 'Freelance Professionals',
    type: 'freelancer',
    description:
      'Perfect for independent professionals managing multiple clients and projects simultaneously.',
    icon: RiUserLine,
    benefits: [
      {
        title: 'Smart Task Management',
        description:
          'AI prioritizes your tasks across multiple projects for optimal time management',
        icon: RiBrainLine,
      },
      {
        title: 'Time Tracking',
        description:
          'Automatic time tracking and billing for accurate client invoicing',
        icon: RiTimeLine,
      },
      {
        title: 'Performance Analytics',
        description:
          'Track your productivity and identify areas for improvement',
        icon: RiBarChartLine,
      },
    ],
    features: [
      'Automated task prioritization',
      'Client communication portal',
      'Integrated time tracking',
      'Invoice generation',
      'Deadline management',
      'File organization',
    ],
    metrics: [
      { value: '40%', label: 'Less Time on Admin' },
      { value: '2x', label: 'More Clients Managed' },
      { value: '95%', label: 'On-time Delivery' },
    ],
    testimonial: {
      quote:
        'DigiServicesApp has transformed how I manage my freelance business. I can handle more clients while actually working less hours.',
      author: 'Sarah Chen',
      role: 'UI/UX Designer',
      company: 'Freelance',
      image: '/testimonials/sarah-chen.jpg',
    },
  },
  {
    title: 'Digital Agencies',
    type: 'agency',
    description:
      'Streamline team workflows and client deliverables with AI-powered project management.',
    icon: RiTeamLine,
    benefits: [
      {
        title: 'Team Collaboration',
        description:
          'Centralized platform for team communication and file sharing',
        icon: RiMessage2Line,
      },
      {
        title: 'Resource Management',
        description:
          'AI-optimized resource allocation across projects and teams',
        icon: RiPieChartLine,
      },
      {
        title: 'Client Management',
        description: 'Professional client portals and automated reporting',
        icon: RiGlobalLine,
      },
    ],
    features: [
      'Team task assignment',
      'Resource allocation',
      'Client portals',
      'Automated reporting',
      'Project templates',
      'Performance tracking',
    ],
    metrics: [
      { value: '60%', label: 'Faster Project Setup' },
      { value: '35%', label: 'Improved Profitability' },
      { value: '90%', label: 'Client Satisfaction' },
    ],
    testimonial: {
      quote:
        "The AI-powered resource allocation has helped us optimize our team's workload and deliver projects more efficiently.",
      author: 'Michael Roberts',
      role: 'Creative Director',
      company: 'Digital Spark Agency',
      image: '/testimonials/michael-roberts.jpg',
    },
  },
  {
    title: 'Remote Teams',
    type: 'remote',
    description:
      'Keep distributed teams synchronized and productive with real-time collaboration tools.',
    icon: RiGlobalLine,
    benefits: [
      {
        title: 'Real-time Collaboration',
        description:
          'Seamless communication and file sharing across time zones',
        icon: RiMessage2Line,
      },
      {
        title: 'Progress Tracking',
        description:
          'Visual dashboards for monitoring team progress and deadlines',
        icon: RiBarChartLine,
      },
      {
        title: 'Smart Scheduling',
        description:
          'AI-powered meeting scheduling across different time zones',
        icon: RiTimeLine,
      },
    ],
    features: [
      'Virtual team rooms',
      'Time zone management',
      'Video conferencing',
      'Document collaboration',
      'Task dependencies',
      'Progress reporting',
    ],
    metrics: [
      { value: '50%', label: 'Better Communication' },
      { value: '30%', label: 'Fewer Meetings' },
      { value: '100%', label: 'Project Visibility' },
    ],
    testimonial: {
      quote:
        "Managing a team across three continents became so much easier with DigiServicesApp's smart scheduling and collaboration tools.",
      author: 'Emily Thompson',
      role: 'Project Manager',
      company: 'TechFlow Global',
      image: '/testimonials/emily-thompson.jpg',
    },
  },
];
