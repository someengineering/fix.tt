'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { LuCheck, LuX } from 'react-icons/lu';
import { z } from 'zod';

import Button from '@/components/buttons/Button';

const validationSchema = z.object({
  email: z
    .string({ required_error: 'Please provide a valid email address' })
    .email({ message: 'Please provide a valid email address' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export function RequestEarlyAccessForm() {
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
    <div
      className="mx-auto max-w-7xl sm:px-6 lg:px-8"
      id="request-early-access"
    >
      <div className="relative isolate overflow-hidden bg-primary-950 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Request early access.
        </h2>
        <div className="mx-auto max-w-prose text-center text-lg leading-8 text-gray-300">
          <p className="mt-6">
            We have a limited number of spaces in a private beta where we work
            with you to tailor an early-access version of Fix to your
            organization&rsquo;s specific needs.
          </p>
          <p className="mt-6">
            Leave your email below if you'd like to participate in this private
            beta program&mdash;we&rsquo;re adding new users every week on a
            rolling basis.
          </p>
        </div>
        {isSubmitted ? (
          <div className="mx-auto mt-10 max-w-md rounded-xl bg-white px-4 pb-4 pt-5 text-center shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6">
            {isSubmitSuccessful ? (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-jade-50">
                  <LuCheck
                    className="h-6 w-6 text-jade-600"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-base font-semibold leading-6 text-gray-900 sm:mt-5">
                  Thanks for signing up! We&rsquo;ll be in touch soon.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amaranth-50">
                  <LuX
                    className="h-6 w-6 text-amaranth-600"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-base font-semibold leading-6 text-gray-900 sm:mt-5">
                  Something went wrong. Please try again later.
                </p>
              </>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                const captcha = await captchaRef.current?.executeAsync();

                await axios.post(
                  '/api/request-early-access',
                  { ...data, captcha },
                  {
                    headers: { 'Content-type': 'multipart/form-data' },
                  },
                );
              } catch (e) {
                if (e instanceof Error) {
                  setError('root.serverError', {
                    type: e.name,
                    message: e.message,
                  });
                }
              }
            })}
            className="mx-auto mt-10 flex max-w-md gap-x-4"
          >
            <label htmlFor="email" className="sr-only">
              Company email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Company email"
              required
              {...register('email', { required: true })}
              className={`min-w-0 flex-auto rounded-xl border-0 bg-primary-950 px-3.5 py-2 text-base text-white placeholder-white/75 shadow-sm ring-1 ring-inset focus:bg-white/5 focus:ring-1 focus:ring-inset ${
                !touchedFields.email || !errors.email
                  ? 'ring-white/50 focus:ring-white'
                  : 'ring-amaranth-600/75 focus:ring-amaranth-600'
              }`}
            />
            <Button
              variant="tangerine"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Submit
            </Button>
            {captchaEnabled ? (
              <ReCAPTCHA
                ref={captchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
              />
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
