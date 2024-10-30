import { addPerson as addPersonToAttio } from '@/lib/attio';
import { validateCaptcha } from '@/lib/google/recaptcha';
import { subscribeToNewsletter } from '@/lib/hashnode';
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

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
    await addPersonToAttio(email);
  } catch {
    // do nothing
  }

  try {
    await subscribeToNewsletter(email);

    return new Response(null, { status: 201 });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(
        `${e.message.substring(0, e.message.indexOf(':'))}.`,
        {
          status: 500,
        },
      );
    }

    return new Response(null, { status: 500 });
  }
}
