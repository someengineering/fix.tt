import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { assertPersonRecord, createListEntry } from '@/lib/attio';
import { validateCaptcha } from '@/lib/google/recaptcha';

import {
  ATTIO_EARLY_ACCESS_LIST,
  ATTIO_EARLY_ACCESS_STATUS,
} from '@/constants/attio';

export async function POST(req: NextRequest) {
  const schema = zfd.formData({
    email: zfd.text(z.string().email()),
    captcha: zfd.text(),
  });

  const { email, captcha } = schema.parse(await req.json());

  const captchaResult = await validateCaptcha(captcha);

  if (!captchaResult.isValid) {
    return new Response('Invalid captcha', { status: 400 });
  }

  try {
    const personResult = await assertPersonRecord(email);

    await createListEntry({
      list_id: ATTIO_EARLY_ACCESS_LIST!,
      entry_values: {
        status: [{ status: ATTIO_EARLY_ACCESS_STATUS! }],
      },
      parent_object: 'people',
      parent_record_id: personResult.record_id,
    });

    return new Response(null, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }

    return new Response(null, { status: 500 });
  }
}
