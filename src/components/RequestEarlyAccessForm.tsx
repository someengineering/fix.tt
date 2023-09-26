'use client';

import { Disclosure } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { LuCheck, LuX } from 'react-icons/lu';
import { z } from 'zod';

import Button from '@/components/common/buttons/Button';

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
    <div className="mt-10" id="request-early-access">
      {isSubmitted ? (
        <div className="mx-auto max-w-md rounded-md bg-white px-4 pb-4 pt-5 text-center shadow-xl ring-1 ring-black ring-opacity-5 transition-all sm:w-full sm:max-w-sm sm:p-6">
          {isSubmitSuccessful ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-jade-50">
                <LuCheck className="h-6 w-6 text-jade-600" aria-hidden="true" />
              </div>
              <p className="mt-3 text-base font-semibold leading-6 text-gray-900 sm:mt-5">
                Thanks for signing up! We&rsquo;ll be in touch soon.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amaranth-50">
                <LuX className="h-6 w-6 text-amaranth-600" aria-hidden="true" />
              </div>
              <p className="mt-3 text-base font-semibold leading-6 text-gray-900 sm:mt-5">
                Something went wrong. Please try again later.
              </p>
            </>
          )}
        </div>
      ) : (
        <>
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
            className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-x-4 gap-y-4"
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
              className={`min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                !touchedFields.email || !errors.email
                  ? 'ring-gray-400 focus:ring-cornflower-blue-400'
                  : 'ring-amaranth-600 focus:ring-amaranth-600'
              }`}
            />
            <Button
              variant="tangerine"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Request early access
            </Button>
            {captchaEnabled ? (
              <ReCAPTCHA
                ref={captchaRef}
                size="invisible"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA!}
              />
            ) : null}
          </form>
          <Disclosure as="dl" className="mt-6">
            <Disclosure.Button
              as="dt"
              className="cursor-pointer text-base font-semibold leading-7 text-gray-400 underline transition hover:text-gray-500 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              Why request early access?
            </Disclosure.Button>
            <Disclosure.Panel
              as="dd"
              unmount={false}
              className="mx-auto max-w-prose space-y-2 pt-2 text-base leading-7 text-gray-600"
            >
              <p>
                We have a limited number of spaces in a private beta where we
                work with you to tailor an early-access version of Fix to your
                organization&rsquo;s specific needs.
              </p>
              <p>
                Submit your email address above if you&rsquo;d like to
                participate&mdash;we&rsquo;re adding new users every week on a
                rolling basis.
              </p>
            </Disclosure.Panel>
          </Disclosure>
        </>
      )}
    </div>
  );
}
