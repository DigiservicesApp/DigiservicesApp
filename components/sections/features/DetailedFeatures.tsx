'use client';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { platformFeatures } from '@/lib/data/platform-features';

const DetailedFeatures = () => {
  return (
    <section className="py-20 bg-[color:var(--md-sys-color-surface)]">
      <Container>
        <div className="space-y-32">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                  <div className="p-3 rounded-lg bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))]">
                    <feature.icon className="w-6 h-6 text-[color:var(--md-sys-color-primary)]" />
                  </div>
                  <h2 className="text-3xl font-bold text-[color:var(--md-sys-color-on-surface)]">
                    {feature.title}
                  </h2>
                </div>

                <p className="text-lg text-[color:var(--md-sys-color-on-surface-variant)] mb-8">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[color:var(--md-sys-color-on-surface)] mb-4">
                    Key Benefits
                  </h3>
                  <ul className="grid gap-3">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 text-[color:var(--md-sys-color-on-surface-variant)]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] flex items-center justify-center">
                          <span className="text-sm text-[color:var(--md-sys-color-primary)]">
                            ✓
                          </span>
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Capabilities */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {feature.capabilities.map((capability) => (
                    <Card key={capability.title} className="p-6">
                      <h4 className="text-lg font-semibold text-[color:var(--md-sys-color-on-surface)] mb-4">
                        {capability.title}
                      </h4>
                      <ul className="space-y-2">
                        {capability.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-[color:var(--md-sys-color-on-surface-variant)] flex items-start gap-2"
                          >
                            <span className="text-[color:var(--md-sys-color-primary)] mt-1">
                              •
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Screenshot */}
              {feature.screenshot && (
                <div className="flex-1">
                  <ImageWithFallback
                    src={feature.screenshot}
                    alt={feature.title}
                    width={540}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DetailedFeatures;
