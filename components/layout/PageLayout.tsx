import { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import Container from '@/components/ui/Container';

interface PageLayoutProps {
  children: ReactNode;
  breadcrumb: {
    label: string;
    href: string;
  }[];
}

const PageLayout = ({ children, breadcrumb }: PageLayoutProps) => {
  return (
    <>
      <div className="border-b border-[color:var(--md-sys-color-outline)] bg-[color:var(--md-sys-color-surface)]">
        <Container>
          <div className="py-4">
            <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              {breadcrumb.map((b) => (
                <BreadcrumbItem key={b.href} href={b.href}>
                  {b.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </div>
        </Container>
      </div>
      {children}
    </>
  );
};

export default PageLayout;
