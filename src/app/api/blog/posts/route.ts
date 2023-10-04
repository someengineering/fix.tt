import { gql, request } from 'graphql-request';
import { type NextRequest, NextResponse } from 'next/server';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import { HashnodePostsResponse } from '@/interfaces/hashnode';

export const revalidate = 600; // revalidate at most every 10 minutes

export async function GET(req: NextRequest) {
  const variables = {
    host: HASHNODE_HOST,
    first: parseInt(req.nextUrl.searchParams.get('first') ?? '5'),
    after: req.nextUrl.searchParams.get('after'),
  };

  const query = gql`
    query Publication($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              title
              brief
              slug
              coverImage {
                url
              }
              author {
                name
                tagline
                profilePicture
                socialMediaLinks {
                  website
                  linkedin
                }
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

  return NextResponse.json(data.publication.posts.edges, {
    status: 200,
  });
}
