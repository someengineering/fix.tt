import { gql, request } from 'graphql-request';
import { type NextRequest, NextResponse } from 'next/server';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import { HashnodePostsResponse } from '@/interfaces/hashnode';

export async function GET(req: NextRequest) {
  const variables = {
    host: HASHNODE_HOST,
    after: req.nextUrl.searchParams.get('after'),
  };

  const query = gql`
    query Publication($host: String!, $after: String) {
      publication(host: $host) {
        posts(first: 10, after: $after) {
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

  return NextResponse.json(data, { status: 200 });
}
