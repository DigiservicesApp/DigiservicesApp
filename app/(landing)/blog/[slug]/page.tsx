import { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { blogPosts } from '@/lib/data/blog-posts';
import { formatDate } from '@/lib/utils/date';
import { TableOfContents } from '@/components/sections/blog/TableOfContents';
import { ShareButtons } from '@/components/sections/blog/ShareButtons';
import { RelatedPosts } from '@/components/sections/blog/RelatedPosts';
import { generateTableOfContents, getRelatedPosts } from '@/lib/utils/blog';
import { marked } from 'marked';
import { mangle } from 'marked-mangle';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import PageLayout from '@/components/layout/PageLayout';

type Props = {
  // Next.js PageProps may provide params as a plain object or a promise — allow both
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - DigiServicesApp Blog`,
    description: post.seoDescription || post.description,
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.description,
      images: post.ogImage ? [{ url: post.ogImage }] : [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seoDescription || post.description,
    },
    keywords: post.tags,
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
  function stripIcon(p: (typeof blogPosts)[number]) {
    const { icon: _icon, ...rest } = p;
    return rest as Omit<typeof p, 'icon'>;
  }

  const relatedPosts = getRelatedPosts(post, blogPosts).map(stripIcon);
  const currentUrl = '';

  marked.use(mangle());
  marked.use(gfmHeadingId());

  const htmlContent = marked.parse(post.content);

  return (
    <PageLayout
      breadcrumb={[
        { label: 'Blog', href: '/blog' },
        { label: post.title, href: `/blog/${post.slug}` },
      ]}
    >
      <article>
        {/* Hero */}
        <div className="relative h-[60vh] w-full">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            priority
          />
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
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
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
            <div
              className="prose prose-lg"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            {toc.length > 0 && <TableOfContents items={toc} />}
          </div>

          {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </Container>
      </article>
    </PageLayout>
  );
}
