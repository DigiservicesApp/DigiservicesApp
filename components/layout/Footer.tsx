import Link from 'next/link';
import Container from '@/components/ui/Container';
import {
  footerSections,
  socialLinks,
  companyInfo,
} from '@/lib/data/site-config';

export default function Footer() {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container>
        <div className="py-12 xl:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8">
              <div>
                <Link href="/" className="text-white text-2xl font-bold">
                  {companyInfo.name}
                </Link>
                <p className="mt-4 text-base text-gray-300">
                  {companyInfo.tagline}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {companyInfo.description}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-white">Contact Us</p>
                  <ul className="mt-2 space-y-2">
                    <li>
                      <a
                        href={`mailto:${companyInfo.contact.email}`}
                        className="text-sm text-gray-300 hover:text-white"
                      >
                        {companyInfo.contact.email}
                      </a>
                    </li>
                    <li className="text-sm text-gray-300">
                      {companyInfo.contact.phone}
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Address</p>
                  <address className="mt-2 not-italic text-sm text-gray-300">
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
                <p className="text-sm font-medium text-white">Follow Us</p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 transition-colors"
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
                          <path d={item.icon as string} />
                        </svg>
                      ) : (
                        item.icon && (
                          // @ts-ignore - icon is a React component when not custom SVG
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        )
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
                    <h3 className="text-sm font-semibold leading-6 text-white">
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
                              className="text-sm leading-6 text-gray-300 hover:text-white"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-sm leading-6 text-gray-300 hover:text-white"
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
                    <h3 className="text-sm font-semibold leading-6 text-white">
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
                              className="text-sm leading-6 text-gray-300 hover:text-white"
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-sm leading-6 text-gray-300 hover:text-white"
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

          <div className="mt-12 border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs leading-5 text-gray-400">
                &copy; {new Date().getFullYear()} {companyInfo.name}. All rights
                reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-xs text-gray-400 hover:text-white">
                  Sitemap
                </a>
                <a href="#" className="text-xs text-gray-400 hover:text-white">
                  Accessibility
                </a>
                <a href="#" className="text-xs text-gray-400 hover:text-white">
                  Do Not Sell My Personal Information
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
