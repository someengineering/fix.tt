import { encodeXML } from 'entities';
import { Feed } from 'feed';

import { getFeedPosts } from '@/lib/hashnode';

import { siteConfig } from '@/constants/config';
import { UserFragment as HashnodeUser } from '@/generated/hashnode/graphql';
import { openGraph } from '@/utils/og';

export const getUserLink = (user: HashnodeUser): string | undefined => {
  const socialMediaLinks = user.socialMediaLinks;

  return socialMediaLinks?.linkedin ?? undefined;
};

export const sanitizeMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\s+align="\w+"/g, '')
    .replace(/]\(https?:\/\/(www\.)?fix\.tt\/?/g, '](/')
    .replace(/]\(https?:\/\/blog\.fix\.tt\/?/g, '](/blog/');
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

  const posts = await getFeedPosts();

  posts
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
