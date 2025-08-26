'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

const stats = [
  {
    value: '10K+',
    label: 'Active Users',
    description: 'Freelancers and agencies trust DigiServicesApp',
  },
  {
    value: '95%',
    label: 'Time Saved',
    description: 'Average reduction in project management time',
  },
  {
    value: '2.5x',
    label: 'Productivity',
    description: 'Increase in project delivery efficiency',
  },
  {
    value: '24/7',
    label: 'AI Support',
    description: 'Continuous optimization and assistance',
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-[color:var(--md-sys-color-surface-variant)]">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))]">
                <span className="text-2xl font-bold text-[color:var(--md-sys-color-primary)]">
                  {stat.value}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
                {stat.label}
              </h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
