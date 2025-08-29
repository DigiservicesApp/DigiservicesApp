'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-linear-to-b from-primary/5 to-transparent">
      <Container className="relative">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-5xl xl:text-6xl dark:text-[color:var(--md-sys-color-on-surface)]">
                Manage Your Projects{' '}
                <span className="text-[color:var(--md-sys-color-primary)]">
                  Smarter with AI.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-lg leading-relaxed text-[color:var(--md-sys-color-on-surface-variant)] dark:text-[color:var(--md-sys-color-on-surface-variant)]"
            >
              DigiServicesApp streamlines freelance workflows from planning to
              delivery, powered by AI. Boost productivity, meet deadlines, and
              deliver exceptional results with our intelligent project
              management solution.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-4 mt-8 lg:flex-row lg:justify-start"
            >
              <Link href="/dashboard" passHref>
                <Button size="lg" variant="filled">
                  Start Managing
                </Button>
              </Link>
              {/* <Link href="/how-it-works" passHref>
                <Button size="lg" variant="outlined">
                  See How It Works
                </Button>
              </Link> */}
              <Link href="/contact" passHref>
                <Button size="lg" variant="text" className="text-primary">
                  Request Demo
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-4"
          >
            <div className="relative">
              <ImageWithFallback
                src="/images/home/hero.webp"
                alt="DigiServices Dashboard Preview"
                width={720}
                height={480}
                className="rounded-xl shadow-2xl bg-[color:var(--md-sys-color-surface)]"
                fallbackSrc="/dashboard-fallback.png"
              />

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 2,
                }}
                className="absolute -right-8 -top-8"
              >
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">
                        ✓
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-[color:var(--md-sys-color-on-surface)]">
                        AI Suggestion
                      </p>
                      <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                        Task optimization ready
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-8 left-8 right-8"
            >
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">85%</p>
                  <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    Time Saved
                  </p>
                </Card>

                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">2.5x</p>
                  <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    Productivity
                  </p>
                </Card>

                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    Satisfaction
                  </p>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
