'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import {
  RiRobot2Line,
  RiTimeLine,
  RiBarChartBoxLine,
  RiTeamLine,
} from 'react-icons/ri';

const benefits = [
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
    icon: RiBarChartBoxLine,
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

const colorVariants: Record<string, string> = {
  blue: 'bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] text-[color:var(--md-sys-color-primary)]',
  green:
    'bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] text-[color:var(--md-sys-color-primary)]',
  orange:
    'bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] text-[color:var(--md-sys-color-primary)]',
};

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-[color:var(--md-sys-color-surface-variant)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-4xl">
            Why Choose DigiServicesApp?
          </h2>
          <p className="mt-4 text-lg text-[color:var(--md-sys-color-on-surface-variant)]">
            Experience the power of AI-driven project management designed
            specifically for freelancers and agencies.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl shadow-sm"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg ${
                  colorVariants[benefit.color]
                }`}
              >
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
                {benefit.title}
              </h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BenefitsSection;
