'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const FeatureHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-[color-mix(in_srgb,var(--md-sys-color-primary)_5%,transparent)]">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-5xl xl:text-6xl"
          >
            Transform Your Freelance Business with AI-Powered Features
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg text-[color:var(--md-sys-color-on-surface-variant)]"
          >
            Discover how our advanced features streamline your workflow,
            automate tedious tasks, and help you deliver outstanding results to
            your clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Button size="lg" variant="primary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="secondary">
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureHero;
