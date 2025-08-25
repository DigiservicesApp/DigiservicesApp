export type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function generateTableOfContents(content: string): TOCItem[] {
  const headings = content.match(/#{2,4}\s+.+/g) || [];
  return headings.map((heading) => {
    const level = (heading.match(/^#+/)?.[0] || '').length - 1;
    const text = heading.replace(/^#+\s+/, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, text, level };
  });
}

export function getRelatedPosts(
  currentPost: { id: string; category: string },
  allPosts: any[],
  count = 3
) {
  return allPosts
    .filter(
      (post) =>
        post.id !== currentPost.id && post.category === currentPost.category
    )
    .slice(0, count);
}

export function generateShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };
}
