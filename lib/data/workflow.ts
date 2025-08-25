import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from 'react-icons/ri';
import { WorkflowStep } from './types';

export const workflowSteps: WorkflowStep[] = [
  {
    icon: RiNumber1,
    title: 'Create Projects',
    description:
      'Set up your project, add tasks, and invite team members or clients.',
    image: '/workflow/create-project.png',
  },
  {
    icon: RiNumber2,
    title: 'AI Prioritization',
    description:
      'Let AI analyze and prioritize tasks based on deadlines and dependencies.',
    image: '/workflow/ai-priority.png',
  },
  {
    icon: RiNumber3,
    title: 'Track Progress',
    description:
      'Monitor project progress through interactive dashboards and real-time updates.',
    image: '/workflow/track-progress.png',
  },
  {
    icon: RiNumber4,
    title: 'Optimize Workflow',
    description:
      'Receive AI-powered suggestions to improve efficiency and meet deadlines.',
    image: '/workflow/optimize.png',
  },
];
