import Item from '@/components/blog/BlogPost/RelatedPosts/Item';
import { getPostsBySeries } from '@/lib/hashnode';

export default async function RelatedPosts({
  seriesSlug,
  excludePostSlug,
}: {
  seriesSlug: string;
  excludePostSlug?: string;
}) {
  const posts = await getPostsBySeries({
    first: excludePostSlug ? 4 : 3,
    seriesSlug,
  });

  if (!posts) {
    return null;
  }

  posts.edges = posts?.edges.filter(
    (edge) => edge.node.slug !== excludePostSlug,
  );

  if (!posts.edges.length) {
    return null;
  }

  return (
    <section
      className="mx-auto mt-16 max-w-7xl px-6 pt-16 sm:mt-24 sm:pt-24 lg:px-8"
      id="related-posts"
    >
      <h2 className="text-3xl font-extrabold sm:text-4xl">Related posts</h2>
      <div className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-x-8 gap-y-16 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {posts.edges
          .map((edge) => edge.node)
          .map((post, index) => (
            <Item post={post} key={`post-${post.slug}`} index={index} />
          ))}
      </div>
    </section>
  );
}
