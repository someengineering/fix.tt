'use client';

import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { getPosts, getPostsByTag } from '@/lib/hashnode';

import BlogPostListItem from '@/components/blog/BlogPostList/BlogPostListItem';

import {
  PageInfo as HashnodePageInfo,
  PostFragment as HashnodePost,
} from '@/generated/hashnode/graphql';

export default function BlogPostList({
  initialPosts,
  initialPageInfo,
  tagSlug,
}: {
  initialPosts: HashnodePost[];
  initialPageInfo: HashnodePageInfo;
  tagSlug?: string;
}) {
  const [posts, setPosts] = useState<HashnodePost[]>(initialPosts);
  const [pageInfo, setPageInfo] = useState<HashnodePageInfo>(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!pageInfo.hasNextPage,
    onLoadMore: async () => {
      setIsLoading(true);

      const data = tagSlug
        ? await getPostsByTag({
            tagSlug,
            after: pageInfo.endCursor ?? undefined,
          })
        : await getPosts({
            after: pageInfo.endCursor ?? undefined,
          });

      if (!data) {
        setError(true);
        return;
      }

      setPosts([...posts, ...data.edges.map((edge) => edge.node)]);
      setPageInfo(data.pageInfo);

      setIsLoading(false);
    },
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {posts.map((post) => (
        <BlogPostListItem post={post} key={`post-${post.slug}`} />
      ))}
      <div ref={sentryRef} />
    </div>
  );
}
