'use client';

import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Env } from '@/libs/Env.mjs';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(60),
  lastName: z.string().min(1, 'Last name is required').max(60),
  email: z.string().email('Enter a valid email').max(120),
  message: z.string().min(10, 'Message is too short').max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const inputBase =
  'w-full border border-yankees-blue/20 bg-transparent px-4 py-3 font-mono text-sm text-yankees-blue placeholder:text-yankees-blue/40 focus:border-primary focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-white/40 disabled:opacity-60';

const labelBase =
  'flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-yankees-blue/60 dark:text-white/60';

const errorText =
  'font-mono text-[11px] normal-case tracking-normal text-primary';

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
    <section className="w-full border-t border-yankees-blue/15 py-12 dark:border-white/10">
      <div className="mb-8 flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-yankees-blue/60 dark:text-white/60">
          &#x2F;&#x2F; contact
        </p>
        <p className="font-mono text-xs text-yankees-blue/40 dark:text-white/40">
          response &lt; 24h
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="flex flex-col gap-y-4 xl:col-span-1">
          <h2 className="font-mono text-2xl uppercase tracking-[0.1em] text-yankees-blue dark:text-white">
            Work with me.
          </h2>
          <div className="h-px w-12 bg-primary" />
          <p className="text-sm leading-relaxed text-yankees-blue/70 dark:text-white/70">
            Open to full-stack engineer roles and freelance collaborations. Drop
            a message via the form, or reach out via the social links above.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-y-5 xl:col-span-2"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                disabled={isSending}
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
                disabled={isSending}
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
              disabled={isSending}
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
              rows={6}
              disabled={isSending}
              className={`${inputBase} resize-y`}
              {...register('message')}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-x-2 border border-yankees-blue bg-yankees-blue px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-primary hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-white dark:bg-white dark:text-yankees-blue dark:hover:border-primary dark:hover:bg-primary dark:hover:text-white"
            >
              {isSending ? 'Sending…' : 'Send message →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AboutSendMessage;
