import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <Container className="relative">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl dark:text-white"
            >
              Manage Freelance Projects{' '}
              <span className="text-primary">Smarter with AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              DigiServicesApp streamlines freelance workflows from planning to
              delivery, powered by AI. Boost productivity, meet deadlines, and
              deliver exceptional results with our intelligent project
              management solution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-4 mt-8 lg:flex-row lg:justify-start"
            >
              <Button size="lg" variant="primary">
                Start Managing
              </Button>
              <Button size="lg" variant="secondary">
                See How It Works
              </Button>
              <Button size="lg" variant="ghost" className="text-primary">
                Request Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-4"
          >
            <div className="relative">
              <ImageWithFallback
                src="/dashboard-preview.png"
                alt="DigiServices Dashboard Preview"
                width={720}
                height={480}
                className="rounded-xl shadow-2xl"
                fallbackSrc="/dashboard-fallback.png"
                showLoadingState
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
                <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">
                        ✓
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-slate-900 dark:text-white">
                        AI Suggestion
                      </p>
                      <p className="text-slate-500 dark:text-slate-400">
                        Task optimization ready
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-8 left-8 right-8"
            >
              <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-lg dark:bg-slate-800">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">85%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Time Saved
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">2.5x</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Productivity
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Satisfaction
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
