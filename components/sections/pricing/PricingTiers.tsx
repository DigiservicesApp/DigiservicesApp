'use client';
import { useState } from 'react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Switch from '@/components/ui/Switch';
import { pricingTiers, PricingTier as IPricingTier } from '@/lib/data/pricing';
import { RiCheckLine } from 'react-icons/ri';

function PricingCard({
  tier,
  isAnnual,
}: {
  tier: IPricingTier;
  isAnnual: boolean;
}) {
  const price = isAnnual ? tier.price.annual : tier.price.monthly;
  const savings = isAnnual
    ? Math.round((1 - tier.price.annual / (tier.price.monthly * 12)) * 100)
    : 0;

  return (
    <Card
      className={`flex flex-col ${
        tier.popularChoice ? 'border-2 border-primary' : ''
      }`}
    >
      {tier.popularChoice && (
        <div className="rounded-t-lg bg-[color:var(--md-sys-color-primary)] px-4 py-1 text-center text-sm font-medium text-[color:var(--md-sys-color-on-primary)]">
          Popular Choice
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div>
          <h3 className="text-xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
            {tier.name}
          </h3>
          <p className="mt-2 text-base text-[color:var(--md-sys-color-on-surface-variant)]">
            {tier.description}
          </p>
        </div>
        <div className="mt-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-[color:var(--md-sys-color-on-surface)]">
              ${price}
            </span>
            <span className="ml-2 text-[color:var(--md-sys-color-on-surface-variant)]">
              /{isAnnual ? 'year' : 'month'}
            </span>
          </div>
          {isAnnual && savings > 0 && (
            <p className="mt-1 text-sm text-[color:var(--md-sys-color-primary)]">
              Save {savings}% with annual billing
            </p>
          )}
        </div>
        <ul className="mt-6 space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <RiCheckLine className="h-5 w-5 shrink-0 text-[color:var(--md-sys-color-primary)]" />
              <span className="text-[color:var(--md-sys-color-on-surface-variant)]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href={tier.cta.href}
            className={`block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${
              tier.popularChoice
                ? 'bg-[color:var(--md-sys-color-primary)] text-[color:var(--md-sys-color-on-primary)] hover:opacity-90'
                : 'border border-[color:var(--md-sys-color-outline)] text-[color:var(--md-sys-color-on-surface)] hover:bg-[color:color-mix(in srgb,var(--md-sys-color-surface)96%,var(--md-sys-color-on-surface)4%)]'
            }`}
          >
            {tier.cta.text}
          </a>
        </div>
      </div>
    </Card>
  );
}

export function PricingTiers() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <Container>
        <div className="mb-12 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <span
              className={`text-sm ${
                !isAnnual
                  ? 'font-semibold text-[color:var(--md-sys-color-on-surface)]'
                  : 'text-[color:var(--md-sys-color-on-surface-variant)]'
              }`}
            >
              Monthly billing
            </span>
            <Switch
              checked={isAnnual}
              onChange={(e) => setIsAnnual(e.target.checked)}
              label="Billing period"
              className="sr-only"
            />
            <span
              className={`text-sm ${
                isAnnual
                  ? 'font-semibold text-[color:var(--md-sys-color-on-surface)]'
                  : 'text-[color:var(--md-sys-color-on-surface-variant)]'
              }`}
            >
              Annual billing
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} />
          ))}
        </div>
      </Container>
    </section>
  );
}
