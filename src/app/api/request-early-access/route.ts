import axios from 'axios';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { ATTIO_API_KEY } from '@/constants/attio';
import { RECAPTCHA_SECRET } from '@/constants/google';

export async function POST(req: NextRequest) {
  const schema = zfd.formData({
    email: zfd.text(z.string().email()),
    captcha: zfd.text(z.string().optional()),
  });

  const { email, captcha } = schema.parse(await req.formData());

  const { data: captchaResponse } = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    {
      params: { secret: RECAPTCHA_SECRET!, response: captcha },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (!captchaResponse.success) {
    return new Response('Invalid captcha', { status: 500 });
  }

  await axios.put(
    'https://api.attio.com/v1/people',
    { email_addresses: [email] },
    {
      auth: { username: ATTIO_API_KEY!, password: '' },
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return new Response();
}
