import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from 'react-icons/ri';

const steps = [
  {
    icon: RiNumber1,
    title: 'Create Projects',
    description:
      'Set up your project, add tasks, and invite team members or clients.',
    image: '/workflow/create-project.png',
  },
  {
    icon: RiNumber2,
    title: 'AI Prioritization',
    description:
      'Let AI analyze and prioritize tasks based on deadlines and dependencies.',
    image: '/workflow/ai-priority.png',
  },
  {
    icon: RiNumber3,
    title: 'Track Progress',
    description:
      'Monitor project progress through interactive dashboards and real-time updates.',
    image: '/workflow/track-progress.png',
  },
  {
    icon: RiNumber4,
    title: 'Optimize Workflow',
    description:
      'Receive AI-powered suggestions to improve efficiency and meet deadlines.',
    image: '/workflow/optimize.png',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            How DigiServicesApp Works
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400">
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
                  showLoadingState
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
