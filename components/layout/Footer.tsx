import React from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Logo from './Logo';
import {
  footerSections,
  socialLinks,
  companyInfo,
} from '@/lib/data/site-config';

export default function Footer() {
  return (
    <footer
      className="bg-[color:var(--md-sys-color-surface)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="py-12 xl:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <div>
                {/* Logo + company name */}
                <Logo />
                <p className="mt-4 text-base text-[color:var(--md-sys-color-on-surface-variant)]">
                  {companyInfo.tagline}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--md-sys-color-on-surface-variant)]">
                  {companyInfo.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                    Contact Us
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href={`mailto:${companyInfo.contact.email}`}
                        className="text-sm text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)]"
                      >
                        {companyInfo.contact.email}
                      </a>
                    </li>
                    <li className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                      {companyInfo.contact.phone}
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                    Address
                  </p>
                  <address className="mt-2 not-italic text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                    {companyInfo.address.street}
                    <br />
                    {companyInfo.address.city}, {companyInfo.address.state}{' '}
                    {companyInfo.address.zip}
                    <br />
                    {companyInfo.address.country}
                  </address>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[color:var(--md-sys-color-on-surface)]">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)] transition-colors"
                      title={item.name}
                    >
                      <span className="sr-only">{item.name}</span>
                      {item.isCustomSvg ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                          aria-hidden="true"
                        >
                          {item.svg}
                        </svg>
                      ) : (
                        item.icon &&
                        // Render icon either as a React component or skip if not valid
                        (typeof item.icon === 'function'
                          ? React.createElement(item.icon as any, {
                              className: 'h-6 w-6',
                              'aria-hidden': 'true',
                            })
                          : null)
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {footerSections.slice(0, 2).map((section) => (
                  <div key={section.title} className="mt-10 first:mt-0 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-[color:var(--md-sys-color-on-surface)]">
                      {section.title}
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {section.links.map((item) => (
                        <li key={item.name}>
                          {item.isExternal ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm leading-6 text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)]"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-sm leading-6 text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)]"
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {footerSections.slice(2).map((section) => (
                  <div key={section.title} className="mt-10 first:mt-0 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-[color:var(--md-sys-color-on-surface)]">
                      {section.title}
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {section.links.map((item) => (
                        <li key={item.name}>
                          {item.isExternal ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm leading-6 text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)]"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-sm leading-6 text-[color:var(--md-sys-color-on-surface-variant)] hover:text-[color:var(--md-sys-color-on-surface)]"
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-[color:var(--md-sys-color-outline)] pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs leading-5 text-[color:var(--md-sys-color-on-surface-variant)]">
                &copy; {new Date().getFullYear()}
                <Link
                  href="/"
                  className="ml-1 hover:text-[color:var(--md-sys-color-on-surface-variant)]"
                >
                  {companyInfo.name}
                </Link>
                . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
