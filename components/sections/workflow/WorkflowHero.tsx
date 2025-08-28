'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const WorkflowHero = () => {
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
            Streamline Your Workflow with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg text-[color:var(--md-sys-color-on-surface-variant)]"
          >
            See how DigiServicesApp helps you manage projects efficiently, from
            initial setup to final delivery, all powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link href="/dashboard" passHref>
              <Button size="lg" variant="filled">
                Try It Free
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button size="lg" variant="outlined" className="gap-2">
                Schedule a Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WorkflowHero;
