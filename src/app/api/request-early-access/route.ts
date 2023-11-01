import { track } from '@vercel/analytics/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { ATTIO_API_KEY } from '@/constants/attio';
import { RECAPTCHA_SECRET } from '@/constants/google';

export async function POST(req: NextRequest) {
  try {
    const schema = zfd.formData({
      email: zfd.text(z.string().email()),
      captcha: zfd.text(),
    });

    const { email, captcha } = schema.parse(await req.json());

    const captchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET!,
          response: captcha,
        }),
      },
    );

    if (!captchaResponse.ok) {
      return new Response('Invalid captcha', { status: 400 });
    }

    const personResponse = await fetch(
      'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ATTIO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { values: { email_addresses: [{ email_address: email }] } },
        }),
      },
    );

    if (!personResponse.ok) {
      throw new Error('Failed to assert Attio person record');
    }

    const listResponse = await fetch(
      'https://api.attio.com/v2/lists/fix_early_access/entries',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ATTIO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            entry_values: {
              status: [{ status: '60179743-3e4f-417e-8aa9-73623cd93715' }],
            },
            parent_object: 'people',
            parent_record_id: (await personResponse.json()).data.id.record_id,
          },
        }),
      },
    );

    if (!listResponse.ok) {
      throw new Error('Failed to create Attio list entry');
    }
  } catch (e) {
    if (e instanceof Error) {
      await track('Early access request', {
        status: e.message,
      });
      return new Response(e.message, {
        status: 500,
      });
    }
  }

  await track('Early access request', {
    status: 'Submitted sucessfully',
  });
  return new Response(null, { status: 201 });
}
