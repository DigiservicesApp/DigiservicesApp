import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { companyInfo } from '@/lib/data/site-config';

export const metadata: Metadata = {
  title: `Cookie Policy - ${companyInfo.name}`,
  description:
    'This cookie policy explains how DigiServicesApp uses cookies and similar technologies on our website.',
};

export default function CookiePolicyPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="prose prose-lg max-w-none">
          <h1>Cookie Policy</h1>
          <p className="lead">Last updated: August 28, 2025</p>

          <h2>1. Introduction</h2>
          <p>
            This Cookie Policy explains how {companyInfo.name} (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) uses cookies and similar
            technologies when you visit our website. By using our website, you
            consent to the use of cookies as described in this policy.
          </p>

          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you
            visit a website. They help us remember your preferences, enhance
            your experience, and analyze site usage.
          </p>

          <h2>3. Types of Cookies We Use</h2>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Necessary for the website to
              function and cannot be switched off in our systems.
            </li>
            <li>
              <strong>Performance Cookies:</strong> Collect information about
              how visitors use our website, such as which pages are visited most
              often.
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Allow the website to
              remember choices you make and provide enhanced features.
            </li>
            <li>
              <strong>Targeting/Advertising Cookies:</strong> Used to deliver
              relevant ads and track ad campaign performance.
            </li>
          </ul>

          <h2>4. Third-Party Cookies</h2>
          <p>
            We may allow third-party service providers to place cookies on your
            device for analytics, advertising, and other purposes. These
            providers have their own privacy and cookie policies.
          </p>

          <h2>5. How to Control Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings.
            Most browsers allow you to refuse or delete cookies. However,
            disabling cookies may affect the functionality of our website.
          </p>

          <h2>6. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will
            be posted on this page with an updated &quot;Last updated&quot;
            date.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact
            us at:
          </p>
          <div className="contact-details space-y-4">
            <div>
              <p className="font-semibold">Address:</p>
              <p>
                {companyInfo.name}
                <br />
                {companyInfo.address.street}
                <br />
                {companyInfo.address.city}, {companyInfo.address.state}{' '}
                {companyInfo.address.zip}
                <br />
                {companyInfo.address.country}
              </p>
            </div>
            <div>
              <p className="font-semibold">Contact Information:</p>
              <p>
                Support Email: {companyInfo.contact.support}
                <br />
                General Inquiries: {companyInfo.contact.email}
                <br />
                Phone: {companyInfo.contact.phone}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
