import axios from 'axios';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export async function POST(request: Request) {
  const schema = zfd.formData({
    email: zfd.text(z.string().email()),
    captcha: zfd.text(z.string().optional()),
  });

  const { email, captcha } = schema.parse(await request.formData());

  const { data: captchaResponse } = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    {
      params: { secret: process.env.RECAPTCHA_SECRET!, response: captcha },
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
      auth: { username: process.env.ATTIO_API_KEY!, password: '' },
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return new Response();
}
