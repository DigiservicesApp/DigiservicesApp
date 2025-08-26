import {
  RiRocketLine,
  RiBrainLine,
  RiTimeLine,
  RiBarChartLine,
  RiRobot2Line,
  RiTeamLine,
} from 'react-icons/ri';
import { Feature, Benefit } from './types';

export const features: Feature[] = [
  {
    icon: RiRocketLine,
    title: 'AI-Powered Workflow',
    description:
      'Smart task prioritization and resource allocation powered by advanced AI algorithms.',
  },
  {
    icon: RiBrainLine,
    title: 'Intelligent Insights',
    description:
      'Data-driven recommendations to optimize your project timeline and budget.',
  },
  {
    icon: RiTimeLine,
    title: 'Time Tracking',
    description:
      'Automated time tracking with AI categorization of tasks and activities.',
  },
  {
    icon: RiBarChartLine,
    title: 'Performance Analytics',
    description:
      'Detailed insights into project performance, team productivity, and profitability.',
  },
];

export const benefits: Benefit[] = [
  {
    icon: RiRobot2Line,
    title: 'AI-Powered Task Management',
    description:
      'Smart algorithms automatically prioritize tasks and suggest optimal deadlines based on your work patterns.',
    color: 'blue',
  },
  {
    icon: RiTimeLine,
    title: 'Real-time Progress Tracking',
    description:
      'Monitor project milestones, deadlines, and team performance with interactive dashboards and alerts.',
    color: 'green',
  },
  {
    icon: RiBarChartLine,
    title: 'Performance Analytics',
    description:
      'Get AI-generated insights on productivity, resource allocation, and project profitability.',
    color: 'blue',
  },
  {
    icon: RiTeamLine,
    title: 'Seamless Collaboration',
    description:
      'Connect with clients and team members through integrated communication tools and file sharing.',
    color: 'orange',
  },
];
