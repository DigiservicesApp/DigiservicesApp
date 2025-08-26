import { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { blogPosts } from '@/lib/data/blog-posts';
import { formatDate } from '@/lib/utils/date';
import { TableOfContents } from '@/components/sections/blog/TableOfContents';
import { ShareButtons } from '@/components/sections/blog/ShareButtons';
import { RelatedPosts } from '@/components/sections/blog/RelatedPosts';
import { generateTableOfContents, getRelatedPosts } from '@/lib/utils/blog';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - DigiServicesApp Blog`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = blogPosts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    return (
      <Container>
        <div className="py-16 sm:py-20">
          <h1 className="text-3xl font-bold text-center text-[color:var(--md-sys-color-on-surface)]">
            Post Not Found
          </h1>
        </div>
      </Container>
    );
  }

  const toc = generateTableOfContents(post.content);
  const relatedPosts = getRelatedPosts(post, blogPosts);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[60vh] w-full">
        <Image src={post.image} alt="" fill className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.35))',
          }}
        >
          <Container className="h-full">
            <div className="flex h-full flex-col justify-end pb-16">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[color:var(--md-sys-color-primary-container)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--md-sys-color-on-primary-container)]">
                  {post.category}
                </span>
                <span className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  {post.readingTime}
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-bold text-[color:var(--md-sys-color-on-surface)] sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-[color:var(--md-sys-color-on-surface-variant)]">
                {post.description}
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
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
                  <div>
                    <p className="font-medium text-[color:var(--md-sys-color-on-surface)]">
                      {post.author.name}
                    </p>
                    <div className="flex space-x-1 text-[color:var(--md-sys-color-on-surface-variant)]">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  </div>
                </div>
                <ShareButtons url={currentUrl} title={post.title} />
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Content */}
      <Container className="py-16">
        <div className="relative mx-auto max-w-3xl xl:flex xl:gap-8">
          <div className="prose prose-lg">{post.content}</div>
          {toc.length > 0 && <TableOfContents items={toc} />}
        </div>

        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      </Container>
    </article>
  );
}
