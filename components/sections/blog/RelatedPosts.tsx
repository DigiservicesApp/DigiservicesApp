import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/date';
import { blogPosts } from '@/lib/data/blog-posts';

export function RelatedPosts({ posts }: { posts: typeof blogPosts }) {
  return (
    <section className="mt-16 border-t pt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <div className="shrink-0">
              <div className="relative h-48 w-full">
                <Image src={post.image} alt="" fill className="object-cover" />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.readingTime}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`} className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900 group-hover:text-primary">
                    {post.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500 line-clamp-2">
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
                    <p className="font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    <div className="flex space-x-1 text-gray-500">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
