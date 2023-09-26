import { request } from 'graphql-request';
import { type NextRequest, NextResponse } from 'next/server';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import { HashnodePostResponse } from '@/interfaces/hashnode';

export async function GET(req: NextRequest) {
  const variables = {
    host: HASHNODE_HOST,
    slug: req.nextUrl.searchParams.get('slug'),
  };

  const query = `
    query Publication($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
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
          }
          content {
            markdown
          }
          readTimeInMinutes
        }
      }
    }
  `;

  const data = await request<HashnodePostResponse>(
    HASHNODE_ENDPOINT,
    query,
    variables,
  );

  return NextResponse.json(data, { status: 200 });
}
