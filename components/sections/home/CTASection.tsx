'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RiArrowRightLine } from 'react-icons/ri';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-[color:var(--md-sys-color-surface-variant)]">
      <Container>
        <div className="px-6 py-16 text-center rounded-3xl bg-[color:color-mix(in srgb,var(--md-sys-color-on-surface)8%,transparent)] backdrop-blur-sm">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-4xl"
          >
            Ready to Transform Your Freelance Business?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg text-[color:var(--md-sys-color-on-surface-variant)]"
          >
            Join thousands of freelancers who are already using DigiServicesApp
            to streamline their work and boost productivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4 mt-10 sm:flex-row sm:justify-center"
          >
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="filled"
                className="min-w-[200px] bg-[color:var(--md-sys-color-primary)] text-[color:var(--md-sys-color-on-primary)] hover:opacity-90"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                size="lg"
                variant="text"
                className="min-w-[200px] text-[color:var(--md-sys-color-on-primary)] border border-[color:var(--md-sys-color-on-primary)] hover:bg-[color:color-mix(in srgb,var(--md-sys-color-on-primary)10%,transparent)]"
              >
                Schedule Demo
                <RiArrowRightLine className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
