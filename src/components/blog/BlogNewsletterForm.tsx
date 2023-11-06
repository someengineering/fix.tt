'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/common/buttons/Button';
import PrimaryLink from '@/components/common/links/PrimaryLink';

const validationSchema = z.object({
  email: z
    .string({ required_error: 'Please provide a valid email address' })
    .email({ message: 'Please provide a valid email address' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function BlogNewsletterForm() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [captchaEnabled, setCaptchaEnabled] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: {
      touchedFields,
      errors,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
    },
  } = useForm<ValidationSchema>({
    mode: 'onTouched',
    resolver: zodResolver(validationSchema),
  });

  const [email] = watch(['email']);

  if (email && !captchaEnabled) {
    setCaptchaEnabled(true);
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-primary-950 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto mb-10 max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Subscribe to our newsletter to get notified of new articles and
          updates.
        </h2>
        {isSubmitted ? (
          <p className="text-center text-base font-semibold text-gray-300">
            {isSubmitSuccessful
              ? 'Thanks for signing up! Please check your inbox to confirm your subscription.'
              : errors.root?.serverError
              ? errors.root.serverError.message
              : 'Something went wrong. Please try again later.'}
          </p>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  const captcha =
                    (await captchaRef.current?.executeAsync()) ?? '';

                  const response = await fetch('/api/blog/newsletter-signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, captcha }),
                  });

                  if (!response.ok) {
                    throw new Error(await response.text());
                  }
                } catch (e) {
                  if (e instanceof Error) {
                    setError('root.serverError', {
                      type: e.name,
                      message: e.message,
                    });
                  }
                }
              })}
              className="mx-auto flex max-w-md gap-x-4"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                required
                {...register('email', { required: true })}
                className={`min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  !touchedFields.email || !errors.email
                    ? 'ring-gray-400 focus:ring-primary-600'
                    : 'ring-amaranth-600 focus:ring-amaranth-600'
                }`}
              />
              <Button
                variant="tangerine"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Subscribe
              </Button>
              {captchaEnabled ? (
                <ReCAPTCHA
                  ref={captchaRef}
                  size="invisible"
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
                />
              ) : null}
            </form>
            <p className="mt-4 text-center text-sm leading-6 text-gray-300">
              We care about your data. Read our{' '}
              <PrimaryLink variant="light" href="#">
                privacy&nbsp;policy
              </PrimaryLink>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
