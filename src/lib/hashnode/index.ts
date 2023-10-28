import { GraphQLClient } from 'graphql-request';
import { flatten, uniq } from 'lodash';

import { isLocal } from '@/constants/env';
import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import {
  DraftDocument,
  DraftQuery,
  DraftQueryVariables,
  FeedPostsDocument,
  FeedPostsQuery,
  FeedPostsQueryVariables,
  PostDocument,
  PostFragment,
  PostQuery,
  PostQueryVariables,
  PostsByTagDocument,
  PostsByTagQuery,
  PostsByTagQueryVariables,
  PostsDocument,
  PostSlugsDocument,
  PostSlugsQuery,
  PostSlugsQueryVariables,
  PostsQuery,
  PostsQueryVariables,
  PostTagSlugsDocument,
  PostTagSlugsQuery,
  PostTagSlugsQueryVariables,
  PublicationDocument,
  PublicationQuery,
  PublicationQueryVariables,
  TagDocument,
  TagQuery,
  TagQueryVariables,
} from '@/generated/hashnode/graphql';

const gqlClient = new GraphQLClient(HASHNODE_ENDPOINT, {
  next: { revalidate: isLocal ? 0 : 3600, tags: ['hashnode'] },
});

export const getPublicationId = async () => {
  const data = await gqlClient.request<
    PublicationQuery,
    PublicationQueryVariables
  >(PublicationDocument, {
    host: HASHNODE_HOST,
  });

  return data.publication?.id;
};

export const getAllTagSlugs = async () => {
  const data = await gqlClient.request<
    PostTagSlugsQuery,
    PostTagSlugsQueryVariables
  >(PostTagSlugsDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  let slugs: string[] = [];

  if (data.publication) {
    slugs = flatten(
      data.publication.posts.edges.map((edge) => edge.node.tags ?? []),
    ).map((tag) => tag.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        PostTagSlugsQuery,
        PostTagSlugsQueryVariables
      >(PostTagSlugsDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...flatten(
          data.publication.posts.edges.map((edge) => edge.node.tags ?? []),
        ).map((tag) => tag.slug),
      ];

      if (
        data.publication.posts.pageInfo.hasNextPage &&
        data.publication.posts.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.posts.pageInfo.endCursor);
      }
    };

    if (
      data.publication.posts.pageInfo.hasNextPage &&
      data.publication.posts.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.posts.pageInfo.endCursor);
    }
  }

  return uniq(slugs);
};

export const getAllPostSlugs = async () => {
  const data = await gqlClient.request<PostSlugsQuery, PostSlugsQueryVariables>(
    PostSlugsDocument,
    {
      host: HASHNODE_HOST,
      first: 20,
    },
  );

  let slugs: string[] = [];

  if (data.publication) {
    slugs = data.publication.posts.edges.map((edge) => edge.node.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        PostSlugsQuery,
        PostSlugsQueryVariables
      >(PostSlugsDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.publication.posts.edges.map((edge) => edge.node.slug),
      ];

      if (
        data.publication.posts.pageInfo.hasNextPage &&
        data.publication.posts.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.posts.pageInfo.endCursor);
      }
    };

    if (
      data.publication.posts.pageInfo.hasNextPage &&
      data.publication.posts.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.posts.pageInfo.endCursor);
    }
  }

  return slugs;
};

export const getPosts = async ({
  first,
  after,
}: {
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    {
      host: HASHNODE_HOST,
      first: first && first > 0 ? (first > 20 ? 20 : first) : 5,
      after,
    },
  );

  return data.publication?.posts;
};

export const getAllPosts = async () => {
  const data = await gqlClient.request<PostsQuery, PostsQueryVariables>(
    PostsDocument,
    {
      host: HASHNODE_HOST,
      first: 20,
    },
  );

  let posts: PostFragment[] = [];

  if (data.publication) {
    posts = data.publication.posts.edges.map((edge) => edge.node);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<PostsQuery, PostsQueryVariables>(
        PostsDocument,
        {
          host: HASHNODE_HOST,
          first: 20,
          after,
        },
      );

      if (!data.publication) {
        return;
      }

      posts = [
        ...posts,
        ...data.publication.posts.edges.map((edge) => edge.node),
      ];

      if (
        data.publication.posts.pageInfo.hasNextPage &&
        data.publication.posts.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.posts.pageInfo.endCursor);
      }
    };

    if (
      data.publication.posts.pageInfo.hasNextPage &&
      data.publication.posts.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.posts.pageInfo.endCursor);
    }
  }

  return posts;
};

export const getPostsByTag = async ({
  tagSlug,
  first,
  after,
}: {
  tagSlug: string;
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<
    PostsByTagQuery,
    PostsByTagQueryVariables
  >(PostsByTagDocument, {
    host: HASHNODE_HOST,
    tagSlug,
    first: first && first > 0 ? (first > 20 ? 20 : first) : 5,
    after,
  });

  return data.publication?.posts;
};

export const getFeedPosts = async () => {
  const data = await gqlClient.request<FeedPostsQuery, FeedPostsQueryVariables>(
    FeedPostsDocument,
    {
      host: HASHNODE_HOST,
    },
  );

  return data.publication?.posts.edges ?? [];
};

export const getPost = async (slug: string) => {
  const data = await gqlClient.request<PostQuery, PostQueryVariables>(
    PostDocument,
    {
      host: HASHNODE_HOST,
      slug,
    },
  );

  return data.publication?.post;
};

const tagNameMapping: Record<string, string> = {
  cspm: 'CSPM',
};

export const getTagName = async (slug: string) => {
  const data = await gqlClient.request<TagQuery, TagQueryVariables>(
    TagDocument,
    {
      slug,
    },
  );

  if (data.tag?.name && data.tag.name in tagNameMapping) {
    return tagNameMapping[data.tag.name];
  }

  return data.tag?.name;
};

export const getDraft = async (id: string) => {
  const gqlClient = new GraphQLClient(HASHNODE_ENDPOINT, {
    next: { revalidate: 0 },
  });

  const data = await gqlClient.request<DraftQuery, DraftQueryVariables>(
    DraftDocument,
    {
      id,
    },
  );

  return data.draft;
};
