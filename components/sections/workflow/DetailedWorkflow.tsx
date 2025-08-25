import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { workflowSteps } from '@/lib/data/workflow-details';

const DetailedWorkflow = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <Container>
        <div className="space-y-32">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col gap-16 lg:flex-row ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                    <span className="text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  {step.description}
                </p>

                {/* Steps */}
                <div className="grid gap-4 mb-8">
                  {step.steps.map((subStep, subIndex) => (
                    <div
                      key={subStep.title}
                      className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {String.fromCharCode(97 + subIndex)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {subStep.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {subStep.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <ul className="grid gap-2">
                    {step.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                      >
                        <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                          <span className="text-sm text-green-600">✓</span>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Media */}
              <div className="flex-1 space-y-6">
                <ImageWithFallback
                  src={step.screenshot}
                  alt={step.title}
                  width={540}
                  height={400}
                  className="rounded-lg shadow-2xl"
                />
                {step.video && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <video
                      src={step.video}
                      controls
                      className="absolute inset-0 w-full h-full object-cover"
                      poster={step.screenshot}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DetailedWorkflow;
