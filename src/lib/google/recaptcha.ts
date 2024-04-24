import 'server-only';

import { RECAPTCHA_SECRET } from '@/constants/google';

type ValidateCaptchaResult =
  | { isValid: true }
  | { isValid: false; reason: string };

export async function validateCaptcha(
  captcha: string,
): Promise<ValidateCaptchaResult> {
  const captchaResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET!,
        response: captcha,
      }),
    },
  ).then((res) => res.json());

  if (captchaResponse.success) {
    return { isValid: true };
  }

  return { isValid: false, reason: captchaResponse['error-codes'].join(', ') };
}
