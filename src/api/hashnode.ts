import { gql, request } from 'graphql-request';
import { flatten, uniq } from 'lodash';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import {
  HashnodePostResponse,
  HashnodePostsResponse,
  HashnodeTagResponse,
} from '@/interfaces/hashnode';

export const getHashnodeTagSlugs = async () => {
  const variables = {
    host: HASHNODE_HOST,
    first: 20,
  };

  const query = gql`
    query Publication($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              tags {
                slug
              }
            }
          }
        }
      }
    }
  `;

  const data = await request<HashnodePostsResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return uniq(
    flatten(data.publication.posts.edges.map((edge) => edge.node.tags ?? [])),
  ).map((tag) => tag.slug);
};

export const getHashnodePostSlugs = async () => {
  const variables = {
    host: HASHNODE_HOST,
    first: 20,
  };

  const query = gql`
    query Publication($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `;

  const data = await request<HashnodePostsResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.publication.posts.edges.map((edge) => edge.node.slug);
};

export const getHashnodePosts = async ({
  first,
  after,
  tag,
  withHtmlContent,
}: {
  first?: number;
  after?: string;
  tag?: string;
  withHtmlContent?: boolean;
}) => {
  const variables = {
    host: HASHNODE_HOST,
    first: first && first > 0 ? (first > 20 ? 20 : first) : 5,
    after,
    filter: tag ? { tagSlugs: [tag] } : undefined,
  };

  const query = gql`
    query Publication(
      $host: String!
      $first: Int!
      $after: String
      $filter: PublicationPostConnectionFilter
    ) {
      publication(host: $host) {
        posts(first: $first, after: $after, filter: $filter) {
          edges {
            node {
              title
              subtitle
              brief
              slug
              tags {
                name
                slug
              }
              coverImage {
                url
              }
              author {
                name
                profilePicture
                socialMediaLinks {
                  linkedin
                }
              }${
                withHtmlContent
                  ? `
              content {
                html
              }`
                  : ''
              }
              readTimeInMinutes
              publishedAt
            }
            cursor
          }
        }
      }
    }
  `;

  const data = await request<HashnodePostsResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.publication.posts.edges;
};

export const getHashnodePost = async (slug: string) => {
  const variables = {
    host: HASHNODE_HOST,
    slug,
  };

  const query = `
    query Publication($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          subtitle
          brief
          slug
          tags {
            name
            slug
          }
          coverImage {
            url
          }
          author {
            name
            profilePicture
            socialMediaLinks {
              linkedin
            }
          }
          content {
            markdown
          }
          readTimeInMinutes
          publishedAt
        }
      }
    }
  `;

  const data = await request<HashnodePostResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.publication.post;
};

export const getHashnodeTagName = async (slug: string) => {
  const variables = {
    host: HASHNODE_HOST,
    slug,
  };

  const query = `
    query Tag($slug: String!) {
      tag(slug: $slug) {
        name
      }
    }
  `;

  const data = await request<HashnodeTagResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return data.tag?.name;
};
