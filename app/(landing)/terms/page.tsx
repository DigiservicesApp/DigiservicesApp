import { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Terms of Service - DigiServicesApp',
  description:
    'Our terms of service outline the rules and guidelines for using DigiServicesApp.',
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="prose prose-lg max-w-none">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: August 25, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using DigiServicesApp (&quot;the Service&quot;),
            you accept and agree to be bound by these Terms of Service. If you
            do not agree to these terms, you must not use our service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            DigiServicesApp provides AI-powered project management and workflow
            optimization tools for freelancers and teams. We reserve the right
            to modify, suspend, or discontinue any aspect of the Service at any
            time.
          </p>

          <h2>3. User Accounts</h2>
          <h3>3.1 Registration</h3>
          <p>
            To use our Service, you must create an account. You agree to provide
            accurate, current, and complete information and to update this
            information to maintain its accuracy.
          </p>

          <h3>3.2 Account Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You must notify us immediately of any unauthorized use of
            your account.
          </p>

          <h2>4. Subscription and Payments</h2>
          <h3>4.1 Pricing</h3>
          <p>
            You agree to pay all fees according to the pricing terms for your
            selected subscription plan. We reserve the right to modify pricing
            with notice to you.
          </p>

          <h3>4.2 Billing</h3>
          <p>
            Subscription fees are billed in advance on a monthly or annual
            basis. You authorize us to charge your payment method for all fees
            incurred.
          </p>

          <h2>5. User Content</h2>
          <p>
            You retain ownership of any content you upload to the Service. By
            uploading content, you grant us a worldwide, non-exclusive license
            to use, store, and process that content for the purpose of providing
            the Service.
          </p>

          <h2>6. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit harmful code or content</li>
            <li>Interfere with the operation of the Service</li>
            <li>Engage in unauthorized access or use</li>
          </ul>

          <h2>7. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by DigiServicesApp and are protected by international
            copyright, trademark, and other intellectual property laws.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DigiServicesApp shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of the Service.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice, for any breach of these Terms of
            Service.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify you of any changes by posting the new terms on this page and
            updating the &quot;Last updated&quot; date.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with
            the laws of [Jurisdiction], without regard to its conflict of law
            provisions.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <p>
            Email: legal@digiservicesapp.com
            <br />
            Address: 123 Tech Street, Digital City, DC 12345
          </p>
        </div>
      </Container>
    </div>
  );
}
