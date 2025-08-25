import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import { RiStarFill } from 'react-icons/ri';

import { testimonials } from '@/lib/data/testimonials';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <Container>
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            Trusted by Freelancers Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-6 text-lg text-slate-600 dark:text-slate-400"
          >
            See how DigiServicesApp is helping freelancers streamline their work
            and boost productivity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.author}
                      size="lg"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.author}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <RiStarFill key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>

                  <p className="flex-1 text-slate-600 dark:text-slate-400">
                    {testimonial.content}
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

export default TestimonialsSection;
