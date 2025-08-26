import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/home/CTASection';
import MaterialTestimonials from '@/components/sections/home/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Community - DigiServicesApp',
  description:
    'Join the DigiServicesApp community to discuss features and share tips.',
};

export default function CommunityPage() {
  return (
    <main>
      <section className="py-20 sm:py-28">
        <Container>
          <div className="prose prose-lg max-w-3xl">
            <h1>Community</h1>
            <p>
              Be part of our growing community — from product discussions and
              feature requests to tutorials and user meetups. Connect with other
              DigiServicesApp users and contributors.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[color:var(--md-sys-color-surface-variant)]">
        <Container>
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--md-sys-color-on-surface)]">
            Ways to Participate
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl">
              <h3 className="font-semibold mb-2">Discussions</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Join forum threads, ask questions, and help other users.
              </p>
            </div>
            <div className="p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl">
              <h3 className="font-semibold mb-2">Events</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Attend virtual events, webinars, and community meetups.
              </p>
            </div>
            <div className="p-6 bg-[color:var(--md-sys-color-surface)] rounded-xl">
              <h3 className="font-semibold mb-2">Contribute</h3>
              <p className="text-[color:var(--md-sys-color-on-surface-variant)]">
                Contribute to docs, submit issues, or propose feature ideas on
                GitHub.
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
