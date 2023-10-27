'use server';

import { GraphQLClient } from 'graphql-request';
import { flatten, uniq } from 'lodash';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import {
  DraftDocument,
  DraftQuery,
  DraftQueryVariables,
  FeedPostsDocument,
  FeedPostsQuery,
  FeedPostsQueryVariables,
  PostDocument,
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
  next: { tags: ['hashnode'] },
});

export const getHashnodePublicationId = async () => {
  const data = await gqlClient.request<
    PublicationQuery,
    PublicationQueryVariables
  >(PublicationDocument, {
    host: HASHNODE_HOST,
  });

  return data.publication?.id;
};

export const getHashnodeTagSlugs = async () => {
  const data = await gqlClient.request<
    PostTagSlugsQuery,
    PostTagSlugsQueryVariables
  >(PostTagSlugsDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  return uniq(
    flatten(data.publication?.posts.edges.map((edge) => edge.node.tags ?? [])),
  ).map((tag) => tag.slug);
};

export const getHashnodePostSlugs = async () => {
  const data = await gqlClient.request<PostSlugsQuery, PostSlugsQueryVariables>(
    PostSlugsDocument,
    {
      host: HASHNODE_HOST,
      first: 20,
    },
  );

  return data.publication?.posts.edges.map((edge) => edge.node.slug) ?? [];
};

export const getHashnodePosts = async ({
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

  return data.publication?.posts.edges ?? [];
};

export const getHashnodePostsByTag = async ({
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

  return data.publication?.posts.edges ?? [];
};

export const getHashnodeFeedPosts = async ({
  first,
  after,
}: {
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<FeedPostsQuery, FeedPostsQueryVariables>(
    FeedPostsDocument,
    {
      host: HASHNODE_HOST,
      first: first && first > 0 ? (first > 20 ? 20 : first) : 5,
      after,
    },
  );

  return data.publication?.posts.edges ?? [];
};

export const getHashnodePost = async (slug: string) => {
  const data = await gqlClient.request<PostQuery, PostQueryVariables>(
    PostDocument,
    {
      host: HASHNODE_HOST,
      slug,
    },
  );

  return data.publication?.post;
};

export const getHashnodeTagName = async (slug: string) => {
  const data = await gqlClient.request<TagQuery, TagQueryVariables>(
    TagDocument,
    {
      slug,
    },
  );

  return data.tag?.name;
};

export const getHashnodeDraft = async (id: string) => {
  const data = await gqlClient.request<DraftQuery, DraftQueryVariables>(
    DraftDocument,
    {
      id,
    },
  );

  return data.draft;
};
