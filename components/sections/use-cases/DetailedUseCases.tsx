import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { useCases, UseCase } from '@/lib/data/use-cases';

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="flex-1 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))]">
            {React.createElement(useCase.icon as any, {
              className: 'h-6 w-6 text-[color:var(--md-sys-color-primary)]',
              'aria-hidden': 'true',
            })}
          </div>
          <h3 className="text-xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
            {useCase.title}
          </h3>
        </div>
        <p className="mt-4 text-[color:var(--md-sys-color-on-surface-variant)]">
          {useCase.description}
        </p>

        <div className="mt-6 space-y-4">
          <h4 className="font-semibold text-[color:var(--md-sys-color-on-surface)]">
            Key Benefits
          </h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCase.benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  {<benefit.icon className="h-4 w-4 text-primary" />}
                </div>
                <div>
                  <h5 className="font-medium text-[color:var(--md-sys-color-on-surface)]">
                    {benefit.title}
                  </h5>
                  <p className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold text-[color:var(--md-sys-color-on-surface)]">
            Key Metrics
          </h4>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {useCase.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {useCase.testimonial && (
          <div className="mt-8 rounded-lg bg-[color:var(--md-sys-color-surface-variant)] p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src={useCase.testimonial.image}
                  alt={useCase.testimonial.author}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-[color:var(--md-sys-color-on-surface-variant)] italic">
                  &quot;{useCase.testimonial.quote}&quot;
                </p>
                <div className="mt-2">
                  <p className="font-medium text-[color:var(--md-sys-color-on-surface)]">
                    {useCase.testimonial.author}
                  </p>
                  <p className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    {useCase.testimonial.role}, {useCase.testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export function DetailedUseCases() {
  return (
    <section id="use-cases" className="py-16 sm:py-20">
      <Container>
        <div className="space-y-16">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.type} useCase={useCase} />
          ))}
        </div>
      </Container>
    </section>
  );
}
