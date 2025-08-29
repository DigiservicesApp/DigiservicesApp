import { IconType } from 'react-icons';
import {
  RiAddCircleLine,
  RiBrainLine,
  RiDashboardLine,
  RiTeamLine,
  RiPieChartLine,
} from 'react-icons/ri';

export interface WorkflowStepDetails {
  title: string;
  description: string;
  icon: IconType;
  steps: {
    title: string;
    description: string;
  }[];
  features: string[];
  video?: string;
  screenshot: string;
}

export const workflowSteps: WorkflowStepDetails[] = [
  {
    title: 'Create Projects and Add Tasks',
    description:
      'Get started quickly by setting up your project and breaking it down into manageable tasks.',
    icon: RiAddCircleLine,
    steps: [
      {
        title: 'Create a New Project',
        description:
          'Set up your project with title, timeline, and key objectives',
      },
      {
        title: 'Add Project Details',
        description: 'Define budget, resources, and project requirements',
      },
      {
        title: 'Break Down Tasks',
        description:
          'Create and organize tasks with descriptions and deadlines',
      },
      {
        title: 'Invite Team Members',
        description: 'Add collaborators and assign roles and permissions',
      },
    ],
    features: [
      'Intuitive project creation wizard',
      'Task templates for common project types',
      'Bulk task import from CSV',
      'Team role management',
      'Project timeline visualization',
    ],
    screenshot: '/images/how/20.webp',
    video: '/videos/project-setup-demo.mp4',
  },
  {
    title: 'AI Assigns Priorities',
    description:
      'Let our AI analyze your tasks and automatically suggest optimal priorities and deadlines.',
    icon: RiBrainLine,
    steps: [
      {
        title: 'AI Analysis',
        description: 'AI examines task dependencies and project requirements',
      },
      {
        title: 'Priority Assignment',
        description:
          'Tasks are automatically prioritized based on impact and urgency',
      },
      {
        title: 'Deadline Suggestions',
        description: 'AI suggests realistic deadlines based on team capacity',
      },
      {
        title: 'Resource Optimization',
        description: 'Workload is balanced across team members',
      },
    ],
    features: [
      'Machine learning priority algorithms',
      'Smart deadline suggestions',
      'Workload balancing',
      'Dependency detection',
      'Priority adjustment recommendations',
    ],
    screenshot: '/images/how/21.webp',
  },
  {
    title: 'Track Progress via Dashboard',
    description:
      'Monitor project progress, team performance, and upcoming deadlines in real-time.',
    icon: RiDashboardLine,
    steps: [
      {
        title: 'View Project Overview',
        description: "Get a bird's eye view of all project activities",
      },
      {
        title: 'Monitor Tasks',
        description: 'Track task status and completion rates',
      },
      {
        title: 'Check Timeline',
        description: 'View project timeline and milestone progress',
      },
      {
        title: 'Review Analytics',
        description: 'Analyze performance metrics and trends',
      },
    ],
    features: [
      'Customizable dashboards',
      'Real-time progress tracking',
      'Interactive Gantt charts',
      'Performance metrics',
      'Status notifications',
    ],
    screenshot: '/images/how/22.webp',
  },
  {
    title: 'Communicate with Clients',
    description:
      'Keep clients informed and collaborate effectively through our integrated communication tools.',
    icon: RiTeamLine,
    steps: [
      {
        title: 'Share Updates',
        description: 'Keep clients informed with automated progress updates',
      },
      {
        title: 'Collect Feedback',
        description: 'Gather and track client feedback on deliverables',
      },
      {
        title: 'Manage Files',
        description: 'Share and organize project files and documents',
      },
      {
        title: 'Schedule Meetings',
        description: 'Coordinate meetings and track action items',
      },
    ],
    features: [
      'Client portal access',
      'File sharing system',
      'Meeting scheduler',
      'Feedback tracking',
      'Automated notifications',
    ],
    screenshot: '/images/how/23.webp',
  },
  {
    title: 'View AI-Generated Reports',
    description:
      'Get insights and optimization suggestions through AI-powered performance reports.',
    icon: RiPieChartLine,
    steps: [
      {
        title: 'Generate Reports',
        description: 'Create comprehensive project and performance reports',
      },
      {
        title: 'Review Insights',
        description: 'Analyze AI-generated insights and recommendations',
      },
      {
        title: 'Track Metrics',
        description: 'Monitor KPIs and performance trends',
      },
      {
        title: 'Export Data',
        description: 'Export reports in various formats for stakeholders',
      },
    ],
    features: [
      'Automated report generation',
      'Custom report templates',
      'AI-powered insights',
      'Performance forecasting',
      'Data visualization',
    ],
    screenshot: '/images/how/24.webp',
  },
];
