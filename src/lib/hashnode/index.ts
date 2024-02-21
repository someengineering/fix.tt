import { encodeXML } from 'entities';
import { Feed } from 'feed';
import { GraphQLClient } from 'graphql-request';
import { flatten, uniq } from 'lodash';
import 'server-only';

import { siteConfig } from '@/constants/config';
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
  PostsBySeriesDocument,
  PostsBySeriesQuery,
  PostsBySeriesQueryVariables,
  PostsByTagDocument,
  PostsByTagQuery,
  PostsByTagQueryVariables,
  PostsDocument,
  PostSlugsDocument,
  PostSlugsQuery,
  PostSlugsQueryVariables,
  PostsQuery,
  PostsQueryVariables,
  PublicationDocument,
  PublicationQuery,
  PublicationQueryVariables,
  SeriesDocument,
  SeriesQuery,
  SeriesQueryVariables,
  SeriesSlugsDocument,
  SeriesSlugsQuery,
  SeriesSlugsQueryVariables,
  StaticPageDocument,
  StaticPageQuery,
  StaticPageQueryVariables,
  StaticPageSlugsDocument,
  StaticPageSlugsQuery,
  StaticPageSlugsQueryVariables,
  SubscribeToNewsletterDocument,
  SubscribeToNewsletterMutation,
  SubscribeToNewsletterMutationVariables,
  TagDocument,
  TagQuery,
  TagQueryVariables,
  TagSlugsDocument,
  TagSlugsQuery,
  TagSlugsQueryVariables,
} from '@/generated/hashnode/graphql';
import { getUserLink } from '@/utils/hashnode';
import { openGraph } from '@/utils/og';

const gqlClient = new GraphQLClient(HASHNODE_ENDPOINT, {
  next: { revalidate: isLocal ? 0 : 300, tags: ['hashnode'] },
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
  const data = await gqlClient.request<TagSlugsQuery, TagSlugsQueryVariables>(
    TagSlugsDocument,
    {
      host: HASHNODE_HOST,
      first: 20,
    },
  );

  let slugs: string[] = [];

  if (data.publication) {
    slugs = flatten(
      data.publication.posts.edges.map((edge) => edge.node.tags ?? []),
    ).map((tag) => tag.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        TagSlugsQuery,
        TagSlugsQueryVariables
      >(TagSlugsDocument, {
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

export const getAllSeriesSlugs = async () => {
  const data = await gqlClient.request<
    SeriesSlugsQuery,
    SeriesSlugsQueryVariables
  >(SeriesSlugsDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  let slugs: string[] = [];

  if (data.publication?.seriesList) {
    slugs = data.publication.seriesList.edges
      .filter((edge) => edge.node.posts.totalDocuments)
      .map((edge) => edge.node.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        SeriesSlugsQuery,
        SeriesSlugsQueryVariables
      >(SeriesSlugsDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.publication.seriesList.edges.map((edge) => edge.node.slug),
      ];

      if (
        data.publication.seriesList.pageInfo.hasNextPage &&
        data.publication.seriesList.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.seriesList.pageInfo.endCursor);
      }
    };

    if (
      data.publication.seriesList.pageInfo.hasNextPage &&
      data.publication.seriesList.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.seriesList.pageInfo.endCursor);
    }
  }

  return slugs;
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

export const getPostsBySeries = async ({
  seriesSlug,
  first,
  after,
}: {
  seriesSlug: string;
  first?: number;
  after?: string;
}) => {
  const data = await gqlClient.request<
    PostsBySeriesQuery,
    PostsBySeriesQueryVariables
  >(PostsBySeriesDocument, {
    host: HASHNODE_HOST,
    seriesSlug,
    first: first && first > 0 ? (first > 20 ? 20 : first) : 5,
    after,
  });

  return data.publication?.series?.posts;
};

export const getFeed = async (): Promise<Feed> => {
  const feed = new Feed({
    title: siteConfig.blogTitle,
    description: siteConfig.blogDescription,
    id: `${siteConfig.url}/blog`,
    link: `${siteConfig.url}/blog`,
    language: 'en',
    image: `${siteConfig.url}/android-chrome-192x192.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: siteConfig.copyright,
    feedLinks: {
      rss2: `${siteConfig.url}/blog/rss.xml`,
      atom: `${siteConfig.url}/blog/atom.xml`,
      json: `${siteConfig.url}/blog/feed.json`,
    },
  });

  const data = await gqlClient.request<FeedPostsQuery, FeedPostsQueryVariables>(
    FeedPostsDocument,
    {
      host: HASHNODE_HOST,
    },
  );

  data.publication?.posts.edges
    .map((edge) => edge.node)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `${siteConfig.url}/blog/${post.slug}`,
        link: `${siteConfig.url}/blog/${post.slug}`,
        date: new Date(post.updatedAt ? post.updatedAt : post.publishedAt),
        description: post.subtitle ?? post.brief,
        content: post.content?.html,
        image: encodeXML(
          openGraph({
            title: post.title,
            description: post.subtitle ?? undefined,
          }),
        ),
        author: post.author
          ? [
              {
                name: post.author.name,
                link: getUserLink(post.author),
              },
            ]
          : undefined,
      });
    });

  return feed;
};

export const getPost = async (postSlug: string) => {
  const data = await gqlClient.request<PostQuery, PostQueryVariables>(
    PostDocument,
    {
      host: HASHNODE_HOST,
      postSlug,
    },
  );

  return data.publication?.post;
};

const tagNameMapping: Record<string, string> = {
  cspm: 'CSPM',
};

export const getTagName = async (tagSlug: string) => {
  const data = await gqlClient.request<TagQuery, TagQueryVariables>(
    TagDocument,
    {
      tagSlug,
    },
  );

  if (data.tag?.name && data.tag.name in tagNameMapping) {
    return tagNameMapping[data.tag.name];
  }

  return data.tag?.name;
};

export const getSeries = async (seriesSlug: string) => {
  const data = await gqlClient.request<SeriesQuery, SeriesQueryVariables>(
    SeriesDocument,
    {
      host: HASHNODE_HOST,
      seriesSlug,
    },
  );

  return data.publication?.series;
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

export const getAllStaticPageSlugs = async () => {
  const data = await gqlClient.request<
    StaticPageSlugsQuery,
    StaticPageSlugsQueryVariables
  >(StaticPageSlugsDocument, {
    host: HASHNODE_HOST,
    first: 20,
  });

  let slugs: string[] = [];

  if (data.publication) {
    slugs = data.publication.staticPages.edges.map((edge) => edge.node.slug);

    const fetchMore = async (after?: string) => {
      const data = await gqlClient.request<
        StaticPageSlugsQuery,
        StaticPageSlugsQueryVariables
      >(StaticPageSlugsDocument, {
        host: HASHNODE_HOST,
        first: 20,
        after,
      });

      if (!data.publication) {
        return;
      }

      slugs = [
        ...slugs,
        ...data.publication.staticPages.edges.map((edge) => edge.node.slug),
      ];

      if (
        data.publication.staticPages.pageInfo.hasNextPage &&
        data.publication.staticPages.pageInfo.endCursor
      ) {
        await fetchMore(data.publication.staticPages.pageInfo.endCursor);
      }
    };

    if (
      data.publication.staticPages.pageInfo.hasNextPage &&
      data.publication.staticPages.pageInfo.endCursor
    ) {
      await fetchMore(data.publication.staticPages.pageInfo.endCursor);
    }
  }

  return slugs;
};

export const getStaticPage = async (pageSlug: string) => {
  const data = await gqlClient.request<
    StaticPageQuery,
    StaticPageQueryVariables
  >(StaticPageDocument, {
    host: HASHNODE_HOST,
    pageSlug,
  });

  return data.publication?.staticPage;
};

export const subscribeToNewsletter = async (email: string) => {
  const publicationId = await getPublicationId();

  if (!publicationId) {
    throw new Error('Failed to retrieve publication ID');
  }

  await gqlClient.request<
    SubscribeToNewsletterMutation,
    SubscribeToNewsletterMutationVariables
  >(SubscribeToNewsletterDocument, {
    input: { publicationId, email },
  });
};
