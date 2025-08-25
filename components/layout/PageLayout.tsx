import { ReactNode } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
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
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Container>
          <div className="py-4">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, ...breadcrumb]} />
          </div>
        </Container>
      </div>
      {children}
    </>
  );
};

export default PageLayout;
