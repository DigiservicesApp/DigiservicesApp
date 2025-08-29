'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from 'react-icons/ri';

const steps = [
  {
    icon: RiNumber1,
    title: 'Create Projects',
    description:
      'Set up your project, add tasks, and invite team members or clients.',
    image: '/images/how/4.webp',
  },
  {
    icon: RiNumber2,
    title: 'AI Prioritization',
    description:
      'Let AI analyze and prioritize tasks based on deadlines and dependencies.',
    image: '/images/how/5.webp',
  },
  {
    icon: RiNumber3,
    title: 'Track Progress',
    description:
      'Monitor project progress through interactive dashboards and real-time updates.',
    image: '/images/how/6.webp',
  },
  {
    icon: RiNumber4,
    title: 'Optimize Workflow',
    description:
      'Receive AI-powered suggestions to improve efficiency and meet deadlines.',
    image: '/images/how/7.webp',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-[color:var(--md-sys-color-surface)]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-4xl">
            How DigiServicesApp Works
          </h2>
          <p className="mt-4 text-lg text-[color:var(--md-sys-color-on-surface-variant)]">
            Get started in minutes and let AI handle the complexity of project
            management
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col items-center gap-8 lg:flex-row ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))]">
                    <step.icon className="w-6 h-6 text-[color:var(--md-sys-color-primary)]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-lg text-[color:var(--md-sys-color-on-surface-variant)]">
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div className="flex-1">
                <ImageWithFallback
                  src={step.image}
                  alt={step.title}
                  width={540}
                  height={360}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
