import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/home/CTASection';
import MaterialTestimonials from '@/components/sections/home/TestimonialsSection';
import { companyInfo } from '@/lib/data/site-config';

export const metadata: Metadata = {
  title: 'About Us - DigiServicesApp',
  description: 'Learn more about DigiServicesApp, our mission, and our team.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="py-20 sm:py-28">
        <Container>
          <div className="prose prose-lg max-w-3xl">
            <h1>About DigiServicesApp</h1>
            <p>
              {companyInfo.name} is on a mission to streamline digital project
              delivery through AI-assisted workflows, intelligent task
              automation, and collaborative tools built for freelance and small
              agency teams.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[color:var(--md-sys-color-surface-variant)]">
        <Container>
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--md-sys-color-on-surface)]">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl">
              <h3 className="font-semibold">Founders</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                A small team of designers and engineers building tools that make
                freelance work more predictable and profitable.
              </p>
            </div>
            <div className="p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl">
              <h3 className="font-semibold">Engineering</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Engineers focused on reliable, scalable product experiences and
                integrations.
              </p>
            </div>
            <div className="p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl">
              <h3 className="font-semibold">Support</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Customer-first support to help you onboard and scale with the
                product.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <MaterialTestimonials />

      <CTASection />
    </main>
  );
}
