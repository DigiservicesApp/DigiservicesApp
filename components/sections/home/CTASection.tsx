import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { RiArrowRightLine } from 'react-icons/ri';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/90 to-primary">
      <Container>
        <div className="px-6 py-16 text-center rounded-3xl bg-white/10 backdrop-blur-sm">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Ready to Transform Your Freelance Business?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg text-white/90"
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
            <Button
              size="lg"
              variant="primary"
              className="min-w-[200px] bg-white text-primary hover:bg-white/90"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="min-w-[200px] text-white border border-white hover:bg-white/10"
            >
              Schedule Demo
              <RiArrowRightLine className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
