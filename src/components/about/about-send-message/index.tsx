'use client';

import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { email } from '@/data/profile';
import { Env } from '@/libs/Env.mjs';

import SectionTitle from '../section-title';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(60),
  lastName: z.string().min(1, 'Last name is required').max(60),
  email: z.string().email('Enter a valid email').max(120),
  message: z.string().min(10, 'Message is too short').max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const inputBase =
  'w-full rounded-xl bg-fg/[0.04] px-4 py-3 text-[0.95rem] text-fg placeholder:text-muted/70 transition-[background-color,box-shadow] duration-200 hover:bg-fg/[0.06] focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-accent/60';

const labelBase = 'flex items-baseline justify-between text-sm text-muted';

const errorText = 'text-xs text-accent';

const AboutSendMessage = () => {
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSending(true);
    try {
      await emailjs.send(
        Env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        Env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          message: data.message,
        },
        { publicKey: Env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      toast.success("Message sent. I'll get back to you soon.");
      reset();
    } catch (err) {
      const emailJsError = err as { status?: number; text?: string };
      const detail =
        emailJsError?.text ??
        (err instanceof Error ? err.message : 'Unknown error');
      const status = emailJsError?.status ? ` (${emailJsError.status})` : '';
      // eslint-disable-next-line no-console
      console.error('EmailJS send failed:', err);
      toast.error(`Failed to send${status}: ${detail}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-24 pt-24">
      <SectionTitle>Say hello</SectionTitle>
      <p className="mb-10 leading-relaxed text-muted">
        Have a role, a project, or a question about something I wrote? Send a
        note and I&apos;ll usually reply within a day.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-y-5"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="firstName" className={labelBase}>
              <span>First name</span>
              {errors.firstName && (
                <span className={errorText}>{errors.firstName.message}</span>
              )}
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              disabled={isSending}
              aria-invalid={!!errors.firstName}
              className={inputBase}
              {...register('firstName')}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="lastName" className={labelBase}>
              <span>Last name</span>
              {errors.lastName && (
                <span className={errorText}>{errors.lastName.message}</span>
              )}
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              disabled={isSending}
              aria-invalid={!!errors.lastName}
              className={inputBase}
              {...register('lastName')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className={labelBase}>
            <span>Email</span>
            {errors.email && (
              <span className={errorText}>{errors.email.message}</span>
            )}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isSending}
            aria-invalid={!!errors.email}
            className={inputBase}
            {...register('email')}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="message" className={labelBase}>
            <span>Message</span>
            {errors.message && (
              <span className={errorText}>{errors.message.message}</span>
            )}
          </label>
          <textarea
            id="message"
            rows={5}
            disabled={isSending}
            aria-invalid={!!errors.message}
            className={`${inputBase} resize-y`}
            {...register('message')}
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <button
            type="submit"
            disabled={isSending}
            className="group inline-flex items-center gap-x-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? 'Sending…' : 'Send message'}
            {!isSending && (
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            )}
          </button>
          <span className="text-sm text-muted">
            or email{' '}
            <a href={`mailto:${email}`} className="link-underline text-fg">
              {email}
            </a>
          </span>
        </div>
      </form>

      <footer className="mt-32 text-sm leading-relaxed text-muted">
        Designed and built by Tri Pham. Set in Geist and Instrument Serif,
        running on Next.js and Vercel.
      </footer>
    </section>
  );
};

export default AboutSendMessage;
