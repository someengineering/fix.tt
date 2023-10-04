'use client';

import useSWRInfinite from 'swr/infinite';

import BlogPostListItem from '@/components/blog/BlogPostList/BlogPostListItem';

import { HashnodePostEdge } from '@/interfaces/hashnode';

const getKey = (pageIndex: number, previousPageData: HashnodePostEdge[]) => {
  const endpoint = '/api/blog/posts';

  // reached the end
  if (previousPageData && previousPageData.length === 0) {
    return null;
  }

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) {
    return endpoint;
  }

  // add the cursor to the API endpoint
  return `${endpoint}?after=${
    previousPageData[previousPageData.length - 1].cursor
  }`;
};

export default function BlogPostList() {
  const { data, error, size, setSize } =
    useSWRInfinite<HashnodePostEdge[]>(getKey);

  if (!data && !error) {
    return null;
  }

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {data?.map((page) =>
        page
          .map((edge) => edge.node)
          .map((post) => (
            <BlogPostListItem post={post} key={`post-${post.slug}`} />
          )),
      )}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
}
