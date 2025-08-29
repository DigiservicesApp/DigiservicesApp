import { IconType } from 'react-icons';
import {
  RiAtLine,
  RiTimeLine,
  RiMessageLine,
  RiBrainLine,
  RiPieChartLine,
  RiWindowLine,
} from 'react-icons/ri';

export interface DetailedFeature {
  title: string;
  description: string;
  icon: IconType;
  benefits: string[];
  capabilities: {
    title: string;
    items: string[];
  }[];
  screenshot?: string;
}

export const platformFeatures: DetailedFeature[] = [
  {
    title: 'AI Task Management',
    description:
      'Intelligent task prioritization and management powered by advanced AI algorithms.',
    icon: RiAtLine,
    benefits: [
      'Save time with automated task prioritization',
      'Reduce decision fatigue with AI-powered suggestions',
      'Never miss deadlines with smart scheduling',
      'Optimize resource allocation automatically',
    ],
    capabilities: [
      {
        title: 'Smart Prioritization',
        items: [
          'Machine learning-based task importance assessment',
          'Deadline and dependency analysis',
          'Resource availability optimization',
          'Workload balancing',
        ],
      },
      {
        title: 'Automated Scheduling',
        items: [
          'AI-powered deadline suggestions',
          'Team capacity consideration',
          'Project dependency management',
          'Real-time schedule adjustments',
        ],
      },
    ],
    screenshot: '/images/feature/19.webp',
  },
  {
    title: 'Project Timeline & Milestones',
    description:
      'Track project progress and milestones in real-time with interactive timelines.',
    icon: RiTimeLine,
    benefits: [
      'Visualize project timelines at a glance',
      'Track milestone progress in real-time',
      'Identify potential bottlenecks early',
      'Adjust timelines dynamically',
    ],
    capabilities: [
      {
        title: 'Timeline Management',
        items: [
          'Interactive Gantt charts',
          'Milestone tracking',
          'Critical path analysis',
          'Resource timeline view',
        ],
      },
      {
        title: 'Progress Tracking',
        items: [
          'Real-time status updates',
          'Automated progress calculations',
          'Timeline comparisons',
          'Milestone notifications',
        ],
      },
    ],
    screenshot: '/images/feature/20.webp',
  },
  {
    title: 'Client Communication Panel',
    description:
      'Centralized communication hub for client interactions and file sharing.',
    icon: RiMessageLine,
    benefits: [
      'Keep all client communications in one place',
      'Share files and updates seamlessly',
      'Maintain clear communication records',
      'Improve client collaboration',
    ],
    capabilities: [
      {
        title: 'Communication Tools',
        items: [
          'Real-time messaging',
          'File sharing and version control',
          'Client feedback system',
          'Automated update notifications',
        ],
      },
      {
        title: 'Collaboration Features',
        items: [
          'Shared project calendars',
          'Document collaboration',
          'Approval workflows',
          'Client portal access',
        ],
      },
    ],
    screenshot: '/images/feature/21.webp',
  },
  {
    title: 'AI Workflow Optimization',
    description:
      'Continuous workflow improvements powered by machine learning algorithms.',
    icon: RiBrainLine,
    benefits: [
      'Optimize project workflows automatically',
      'Identify efficiency opportunities',
      'Reduce manual task management',
      'Improve project outcomes',
    ],
    capabilities: [
      {
        title: 'AI Analysis',
        items: [
          'Pattern recognition in workflows',
          'Bottleneck identification',
          'Resource utilization analysis',
          'Performance prediction',
        ],
      },
      {
        title: 'Optimization Features',
        items: [
          'Automated workflow suggestions',
          'Resource reallocation recommendations',
          'Process improvement insights',
          'Efficiency metrics tracking',
        ],
      },
    ],
    screenshot: '/images/feature/22.webp',
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Comprehensive analytics and reporting tools for data-driven decisions.',
    icon: RiPieChartLine,
    benefits: [
      'Make data-driven project decisions',
      'Track key performance indicators',
      'Identify trends and patterns',
      'Generate professional reports',
    ],
    capabilities: [
      {
        title: 'Analytics Tools',
        items: [
          'Custom dashboard creation',
          'Real-time data visualization',
          'Performance metrics tracking',
          'Trend analysis',
        ],
      },
      {
        title: 'Reporting Features',
        items: [
          'Automated report generation',
          'Custom report templates',
          'Export capabilities',
          'Scheduled reporting',
        ],
      },
    ],
    screenshot: '/images/feature/23.webp',
  },
  {
    title: 'Multi-Device Dashboard',
    description:
      'Seamless access to your projects across all devices and platforms.',
    icon: RiWindowLine,
    benefits: [
      'Access projects anywhere, anytime',
      'Consistent experience across devices',
      'Real-time synchronization',
      'Offline capabilities',
    ],
    capabilities: [
      {
        title: 'Cross-Platform Features',
        items: [
          'Responsive design',
          'Native mobile apps',
          'Offline mode',
          'Cross-device sync',
        ],
      },
      {
        title: 'Accessibility',
        items: [
          'Touch-optimized interface',
          'Keyboard navigation',
          'Screen reader support',
          'High contrast mode',
        ],
      },
    ],
    screenshot: '/images/feature/24.webp',
  },
];
