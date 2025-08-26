import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { blogPosts } from '@/lib/data/blog-posts';
import { formatDate } from '@/lib/utils/date';

export const metadata: Metadata = {
  title: 'Blog - DigiServicesApp',
  description: 'Latest insights on AI, productivity, and project management.',
};

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="shrink-0">
        <div className="relative h-48 w-full">
          <Image src={post.image} alt="" fill className="object-cover" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-[color:var(--md-sys-color-surface)] p-6">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[color:color-mix(in srgb,var(--md-sys-color-primary)12%,var(--md-sys-color-surface))] px-2.5 py-0.5 text-xs font-medium text-[color:var(--md-sys-color-primary)]">
              {post.category}
            </span>
            <span className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
              {post.readingTime}
            </span>
          </div>
          <Link href={`/blog/${post.slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-[color:var(--md-sys-color-on-surface)] group-hover:text-[color:var(--md-sys-color-primary)]">
              {post.title}
            </p>
            <p className="mt-3 text-base text-[color:var(--md-sys-color-on-surface-variant)] line-clamp-2">
              {post.description}
            </p>
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <div className="shrink-0">
              <div className="relative h-10 w-10">
                <Image
                  className="rounded-full"
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                />
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium text-[color:var(--md-sys-color-on-surface)]">
                {post.author.name}
              </p>
              <div className="flex space-x-1 text-[color:var(--md-sys-color-on-surface-variant)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-[color:var(--md-sys-color-surface)] py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[color:var(--md-sys-color-on-surface)] sm:text-4xl">
            Latest Insights
          </h1>
          <p className="mt-2 text-lg leading-8 text-[color:var(--md-sys-color-on-surface-variant)]">
            Expert perspectives on AI, productivity, and project management.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
