import { StaticImageData } from 'next/image';
import { IconType } from 'react-icons';

export interface Testimonial {
  author: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export interface Benefit {
  icon: IconType;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'orange';
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface WorkflowStep {
  icon: IconType;
  title: string;
  description: string;
  image: string;
}
