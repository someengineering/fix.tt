'use client';

import useSWRInfinite from 'swr/infinite';

import UnstyledLink from '@/components/common/links/UnstyledLink';
import NextImage from '@/components/common/NextImage';

import { HashnodePostEdge } from '@/interfaces/hashnode';
import { getUserLink } from '@/utils/hashnode';

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
  const { data, size, setSize } = useSWRInfinite<HashnodePostEdge[]>(getKey);

  if (!data) {
    return null;
  }

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {data.map((page) =>
        page
          .map((edge) => edge.node)
          .map((post) => {
            const authorLink = post.author
              ? getUserLink(post.author)
              : undefined;

            return (
              <article
                key={`post-${post.slug}`}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  {post.coverImage ? (
                    <NextImage
                      src={post.coverImage.url}
                      alt=""
                      className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-gray-50"
                      classNames={{ image: 'object-cover' }}
                      layout="fill"
                    />
                  ) : (
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover" />
                  )}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-sm">
                    <time dateTime={post.publishedAt} className="text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {post.tags?.map((tag) => (
                      <UnstyledLink
                        href={`/blog/tags/${tag.slug}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        key={`tag-${tag.slug}`}
                      >
                        {tag.name}
                      </UnstyledLink>
                    ))}
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <UnstyledLink href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </UnstyledLink>
                    </h3>
                    <p className="mt-5 text-base leading-6 text-gray-600">
                      {post.brief}
                    </p>
                  </div>
                  <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                      <NextImage
                        src={post.author.profilePicture}
                        alt=""
                        className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-50"
                        classNames={{ image: 'w-full h-full object-cover' }}
                        width={40}
                        height={40}
                      />
                      <div className="text-base leading-6">
                        <p className="font-semibold text-gray-900">
                          {authorLink ? (
                            <UnstyledLink href={authorLink}>
                              <span className="absolute inset-0" />
                              {post.author.name}
                            </UnstyledLink>
                          ) : (
                            <>{post.author.name}</>
                          )}
                        </p>
                        <p className="text-gray-600">{post.author.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          }),
      )}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
}
