import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div>
      <Container className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white bg-[color:var(--md-sys-color-primary)] rounded-lg hover:bg-[color:var(--md-sys-color-primary-hover)] transition-colors"
        >
          Return Home
        </Link>
      </Container>
    </div>
  );
}
