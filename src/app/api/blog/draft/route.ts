import request from 'graphql-request';
import { type NextRequest, NextResponse } from 'next/server';

import { HASHNODE_ENDPOINT, HASHNODE_HOST } from '@/constants/hashnode';
import { HashnodeDraftResponse } from '@/interfaces/hashnode';

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const variables = {
      host: HASHNODE_HOST,
      id: req.nextUrl.searchParams.get('id') ?? '',
    };

    const query = `
      query Draft($id: ObjectId!) {
        draft(id: $id) {
          id
          title
          tags {
            name
            slug
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
          dateUpdated
        }
      }
    `;

    const data = await request<HashnodeDraftResponse>(
      HASHNODE_ENDPOINT,
      query,
      variables,
    );

    return NextResponse.json(data.draft, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 404 });
  }
}
