import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { RiPlayCircleLine } from 'react-icons/ri';

const WorkflowHero = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl dark:text-white"
          >
            Streamline Your Workflow with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-400"
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
            <Button size="lg" variant="primary">
              Try It Free
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <RiPlayCircleLine className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WorkflowHero;
