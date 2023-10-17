'use client';

import { redirect } from 'next/navigation';
import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import useSWRInfinite from 'swr/infinite';

import BlogPostListItem from '@/components/blog/BlogPostList/BlogPostListItem';

import { HashnodePostEdge } from '@/interfaces/hashnode';

export default function BlogPostList({
  fallbackData,
  tag,
}: {
  fallbackData: HashnodePostEdge[];
  tag?: string;
}) {
  const [hasNextPage, setHasNextPage] = useState(true);

  const getKey = (pageIndex: number, previousPageData: HashnodePostEdge[]) => {
    const endpoint = '/api/blog/posts';

    // reached the end
    if (previousPageData && previousPageData.length === 0) {
      setHasNextPage(false);
      return null;
    }

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `${endpoint}${tag ? `?tag=${tag}` : ''}`;
    }

    // add the cursor to the API endpoint
    return `${endpoint}?${tag ? `tag=${tag}&` : ''}after=${
      previousPageData[previousPageData.length - 1].cursor
    }`;
  };

  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<HashnodePostEdge[]>(getKey, {
      fallbackData: [fallbackData],
    });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading || isValidating,
    hasNextPage,
    onLoadMore: () => setSize(size + 1),
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!data && !error) {
    redirect('/');
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
      <div ref={sentryRef} />
    </div>
  );
}
