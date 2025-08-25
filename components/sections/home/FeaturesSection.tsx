'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import {
  RiRocketLine,
  RiBrainLine,
  RiTimeLine,
  RiBarChartLine,
} from 'react-icons/ri';

import { features } from '@/lib/data/features';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <Container>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            AI-Powered Features for Modern Freelancers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg text-slate-600 dark:text-slate-400"
          >
            Experience the future of freelance project management with our
            cutting-edge AI features designed to boost your productivity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-start">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
