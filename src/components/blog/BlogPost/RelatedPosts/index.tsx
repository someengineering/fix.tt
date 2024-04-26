import { getPostsBySeries } from '@/lib/hashnode';

import Item from '@/components/blog/BlogPost/RelatedPosts/Item';

export default async function RelatedPosts({
  excludedPostSlug,
  seriesSlug,
}: {
  excludedPostSlug?: string;
  seriesSlug: string;
}) {
  const posts = await getPostsBySeries({
    first: excludedPostSlug ? 4 : 3,
    seriesSlug,
  });

  if (!posts) {
    return null;
  }

  posts.edges = posts?.edges.filter(
    (edge) => edge.node.slug !== excludedPostSlug,
  );

  if (!posts.edges.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold sm:text-4xl">Related posts</h2>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-x-8 gap-y-16 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {posts.edges
            .map((edge) => edge.node)
            .map((post, index) => (
              <Item post={post} key={`post-${post.slug}`} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
